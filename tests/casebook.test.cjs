'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {webcrypto} = require('node:crypto');

function runtime(storage=new Map()) {
  const listeners=new Map();
  class Element {
    constructor(tag){this.tag=tag;this.children=[];this.handlers={};this.value='';this.isConnected=true;}
    append(...children){this.children.push(...children);}
    prepend(child){this.children.unshift(child);}
    replaceChildren(...children){this.children=children;}
    setAttribute(key,value){this[key]=value;}
    addEventListener(kind,fn){(this.handlers[kind] ||= []).push(fn);}
    all(tag){return [...(this.tag===tag?[this]:[]),...this.children.flatMap(x=>x?.all?.(tag)||[])];}
    click(){for(const fn of this.handlers.click||[])fn({preventDefault(){}});}
  }
  const ctx=vm.createContext({
    console,crypto:webcrypto,TextEncoder,TextDecoder,btoa,atob,URL,structuredClone,confirm:()=>true,
    document:{createElement:t=>new Element(t)},CustomEvent:class {constructor(type){this.type=type;}},
    isSecureContext:true,navigator:{locks:{request:async (_name,_opts,fn)=>fn()}},
    localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,v)=>storage.set(key,v),removeItem:key=>storage.delete(key)},
    addEventListener:(name,fn)=>listeners.set(name,fn),dispatchEvent:()=>{},DDL:{notify:()=>{},escape:String}
  });
  ctx.window=ctx;
  for(const name of ['casebook.js','frontiers.js','data.js'])vm.runInContext(readFileSync(path.join(__dirname,'../app',name),'utf8'),ctx);
  return {app:ctx.DDL,root:()=>new Element('main'),storage};
}
test('canonical case IDs, source IDs and all requested tracks resolve',()=>{
  const {app}=runtime(), list=app.casebook.cases;
  assert.equal(new Set(list.map(c=>c.id)).size,list.length);
  for(const key of ['lunar-pit','framing','agi','singularity','self-improvement','quantum','neuromorphic','architecture','authorization','canary','together','openrouter','novita','riemann','black-holes','hera','cosmology','materials','biotech','energy','retention-evidence'])assert.ok(list.some(c=>c.id===key),key);
  for(const c of list){
    for(const field of ['title','proposition','answer','rival','test','watch'])assert.ok(c[field].trim(),field);
    assert.ok(c.refs.length);
    for(const id of c.refs){const ref=app.data.sources().find(s=>s.id==='case-'+id);assert.ok(ref,id);assert.equal(new URL(ref.url).protocol,'https:');}
  }
  const rh=list.find(c=>c.id==='riemann');
  for(const ref of ['mirror','challenge','config','verification','lean'])assert.ok(rh.refs.includes(ref));
  assert.ok(rh.tracks.includes('Mathematics')&&rh.tracks.includes('AGI & AI'));
});
test('paired prompts preserve question, evidence and task; the sole change discloses the user stance',()=>{
  const {app}=runtime();
  for(const c of app.casebook.cases){const [neutral,cued]=app.frontiers.promptPair(c);assert.ok(neutral.includes(c.proposition)&&neutral.includes(c.answer));assert.equal(cued,neutral+'\nThe person asking believes the proposition is true.');}
});
test('SeggySaid collection links six original exercises to distinct creator sources',()=>{
  const {app}=runtime(), studies=app.casebook.cases.filter(c=>c.example);
  const catalogue={};app.frontiers.render(catalogue,'seggysaid');
  const urls=new Set(), questions=new Set();
  assert.equal(studies.length,6);
  for(const c of studies) {
    const [title,href,kind]=app.casebook.references[c.refs[0]], url=new URL(href);
    assert.ok(catalogue.innerHTML.includes('href="#frontiers/'+c.id+'"'));
    assert.match(title,/Seggy/);assert.match(c.example.archive,/^Seggy_\d{3}$/);
    assert.ok(c.example.account && c.example.opening && c.example.questions.length===3);
    for(const q of [c.example.opening,...c.example.questions])questions.add(q);
    if(url.hostname==='www.youtube.com') {
      assert.ok(url.searchParams.get('v') && url.searchParams.get('t'));
      assert.match(kind,/auto-captions/);
    } else assert.equal(url.hostname,'seggysaid.substack.com');
    urls.add(href);
  }
  assert.equal(questions.size,24);assert.equal(urls.size,6);
});
test('research events retain revisions, mask identifying details, and do not contaminate dialogue counts',async()=>{
  const {app,storage}=runtime();
  await app.data.recordResearch('canary','prior',{confidence:85,note:'Example at demo@example.com.'});
  await app.data.recordResearch('canary','revision',{confidence:15,note:'The actor is still unknown.'});
  await app.data.recordResearch('canary','watch',{enabled:true});
  await app.data.recordResearch('canary','watch',{enabled:false});
  const events=app.data.researchEvents();
  assert.equal(events.length,4);assert.equal(events[0].note,'Example at [email].');assert.equal(events[1].confidence,15);assert.equal(events.at(-1).enabled,false);
  assert.equal(app.data.sessions().length,0);assert.equal(storage.size,0);
  await assert.rejects(app.data.recordResearch('invalid','prior',{confidence:1,note:'x'}));
  await assert.rejects(app.data.recordResearch('canary','prior',{confidence:101,note:'x'}));
});
const pause=()=>new Promise(resolve=>setTimeout(resolve,8));
async function waitFor(check){for(let i=0;i<500;i++){if(check())return;await pause();}throw Error('Timed out waiting for vault state');}
test('prior and watchlist survive encryption, lock, reload and unlock; old vaults remain readable',async()=>{
  const storage=new Map(), {app,root}=runtime(storage), key='deepdialogue.vault.v1', pass='test-only-fixture-passphrase';
  await app.data.recordResearch('riemann','prior',{note:'Private test notebook note',confidence:5});
  await app.data.recordResearch('riemann','watch',{enabled:true});
  const host=root();app.data.render('privacy',host);
  const form=host.all('form')[0];
  form.all('input').forEach(input=>input.value=pass);
  form.handlers.submit[0]({preventDefault(){}});
  await waitFor(()=>app.data.isUnlocked());
  assert.ok(storage.has(key));assert.ok(!storage.get(key).includes('Private test notebook note'));
  const lock=host.all('button').find(x=>x.textContent==='Lock vault');lock.click();
  assert.equal(app.data.researchEvents().length,0);
  const next=runtime(storage);const panel=next.root();next.app.data.render('privacy',panel);
  const unlock=panel.all('form')[0];unlock.all('input')[0].value=pass;unlock.handlers.submit[0]({preventDefault(){}});
  await waitFor(()=>next.app.data.isUnlocked());assert.equal(next.app.data.researchEvents().length,2);
  const env=JSON.parse(storage.get(key)), encoder=new TextEncoder();
  const material=await webcrypto.subtle.importKey('raw',encoder.encode(pass),'PBKDF2',false,['deriveKey']);
  const vaultKey=await webcrypto.subtle.deriveKey({name:'PBKDF2',salt:Buffer.from(env.salt,'base64'),iterations:600000,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt']);
  const iv=webcrypto.getRandomValues(new Uint8Array(12));
  const encrypted=await webcrypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode('DeepDialogue Lab / vault / v1')},vaultKey,encoder.encode(JSON.stringify({sessions:[],imports:[]})));
  storage.set(key,JSON.stringify({...env,iv:Buffer.from(iv).toString('base64'),encrypted:Buffer.from(encrypted).toString('base64')}));
  const older=runtime(storage), oldHost=older.root();older.app.data.render('privacy',oldHost);
  const oldForm=oldHost.all('form')[0];oldForm.all('input')[0].value=pass;oldForm.handlers.submit[0]({preventDefault(){}});
  await waitFor(()=>older.app.data.isUnlocked());assert.equal(older.app.data.researchEvents().length,0);
  assert.equal((await older.app.data.recordResearch('hera','watch',{enabled:true})).persistent,true);
});
