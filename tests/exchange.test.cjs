'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {resolve} = require('node:path');
const {spawnSync} = require('node:child_process');
const {webcrypto, createHash} = require('node:crypto');
const vm = require('node:vm');
const masters = require('../app/masters.js');
const file = name => resolve(__dirname, '..', name);

test('stdio client gets all published master prompts verbatim and recovers from invalid input', () => {
  const request = (id, method, params={}) => JSON.stringify({jsonrpc:'2.0', id, method, params});
  const pages=Math.ceil(masters.catalogue.length/60);
  const input=[
    request(0,'prompts/list'),request(1,'initialize',{protocolVersion:'2025-06-18'}),
    JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'}),
    ...Array.from({length:pages},(_,i)=>request('page-'+i,'prompts/list',i?{cursor:String(60*i)}:{})),
    ...masters.catalogue.map(p=>request(p.id,'prompts/get',{name:p.id})),
    request('bad-cursor','prompts/list',{cursor:'-1'}),
    request('continue','prompts/get',{name:'hindsight-2100',arguments:{prior_answer:'My prediction was about trust.'}}),
    '{',request('unknown','prompts/get',{name:'missing'}),request('ping','ping')
  ].join('\n')+'\n';
  const child=spawnSync(process.execPath,[file('mcp.cjs')],{input,encoding:'utf8',maxBuffer:5*1024*1024});
  assert.equal(child.status,0,child.stderr);
  const results=child.stdout.trimEnd().split('\n').map(s=>JSON.parse(s));
  const byId=new Map(results.map(r=>[r.id,r]));
  assert.equal(byId.get(0).error.code,-32002);
  assert.equal(byId.get(1).result.protocolVersion,'2025-06-18');
  const listed=[];
  for(let i=0;i<pages;i++){
    const page=byId.get('page-'+i).result;
    assert.equal(page.nextCursor,i+1<pages?String((i+1)*60):undefined);
    listed.push(...page.prompts.map(p=>p.name));
  }
  assert.deepEqual(listed,masters.catalogue.map(p=>p.id));
  assert.equal(new Set(listed).size,570);
  for(const p of masters.catalogue){
    assert.deepEqual(byId.get(p.id).result.messages,[{role:'user',content:{type:'text',text:masters.render(p)}}]);
  }
  assert.equal(byId.get('bad-cursor').error.code,-32602);
  assert.match(byId.get('continue').result.messages[0].content.text,/My prediction was about trust/);
  assert.equal(results.at(-3).error.code,-32700);
  assert.equal(results.at(-2).error.code,-32602);
  assert.deepEqual(results.at(-1).result,{});
});

test('each category has five linked families and five independent originals at each length',()=>{
  const topics=new Map(),scripts=new Set();
  for(const p of masters.catalogue){
    const text=masters.render(p),n=text.trim().split(/\s+/).length;
    assert.ok(!scripts.has(text),p.id);scripts.add(text);
    assert.ok(p.size==='short'?n<=35:p.size==='medium'?n>=35&&n<=85:n>=95,p.id+' '+n);
    if(!topics.has(p.topic))topics.set(p.topic,[]);
    topics.get(p.topic).push(p);
    if(p.sources.length)assert.ok(p.sources.every(s=>s.label&&new URL(s.url).protocol==='https:'));
  }
  assert.equal(topics.size,19);
  assert.equal(masters.catalogue.filter(p=>p.fiction).length,30);
  for(const rows of topics.values()){
    for(const size of masters.sizes)assert.equal(rows.filter(p=>p.size===size).length,10);
    const families=[...new Set(rows.map(p=>p.family))];
    assert.equal(families.length,20);
    assert.equal(families.filter(id=>rows.filter(p=>p.family===id).length===3).length,5);
  }
  for(const p of require('../app/conversations.js'))assert.equal(masters.find(p.id).size,'long');
});

test('community posts carry lineage and only matching open issues appear in the commons',()=>{
  const DDL={exchange:{},escape:String};
  vm.runInNewContext(readFileSync(file('app/community.js'),'utf8'),{window:{DDL}});
  const body=DDL.community.format({kind:'Prompt remix',base:'last-translator',parent:19,text:'A revised hearing.',question:'Who gets the final word?',script:'Begin the hearing.'});
  assert.match(body,/Based on thread: #19/);
  assert.match(body,/## Master prompt\n\nBegin the hearing/);
  const issue={number:26,state:'open',title:'[DeepDialogue] One meaning',body};
  assert.ok(DDL.community.isThread(issue));
  assert.ok(DDL.community.isThread({...issue,body:body.replaceAll('\n','\r\n')}));
  for(const change of [{state:'closed'},{title:'unrelated'},{pull_request:{}},{body:'unrelated'},{number:-1}]){
    assert.ok(!DDL.community.isThread({...issue,...change}));
  }
});

test('tab authorization validates state and PKCE; model receives a turn only after Send',async()=>{
  const calls=[], channels=[], nodes=new Map(), location=new URL('https://example.org/lab/#connections');
  const root={
    innerHTML:'',
    querySelector(name){
      if(!nodes.has(name))nodes.set(name,{value:'',addEventListener(type,fn){this[type]=fn;}});
      return nodes.get(name);
    },
    querySelectorAll(){return [];}
  };
  const X={get:masters.find,body:masters.render,configured:masters.render,route:p=>'#exchange/'+p.id,settings:()=>'',bindSettings(){},btn:()=>'',intro:()=>'',link:()=>''};
  const DDL={exchange:X,masters,escape:String,data:{mask:String}};
  class Channel{constructor(name){this.name=name;channels.push(this);}close(){this.closed=true;}}
  const env={
    window:{DDL,isSecureContext:true},document:{getElementById:()=>root},location,
    crypto:webcrypto,btoa,URL,URLSearchParams,TextEncoder,BroadcastChannel:Channel,
    AbortSignal,AbortController,setTimeout:()=>1,clearTimeout:()=>{},
    fetch:async(url,options)=>{
      calls.push({url,options});
      return {ok:true,json:async()=>url.endsWith('keys')?{key:'dummy-test-key'}:{choices:[{message:{content:'Which voice would you preserve?'}}]}};
    }
  };
  vm.runInNewContext(readFileSync(file('app/rooms.js'),'utf8'),env);
  DDL.rooms.connections(root);
  await nodes.get('[data-act=connect]').click({currentTarget:{}});
  const authURL=new URL(root.innerHTML.match(/href="(https:\/\/openrouter.ai\/auth[^"]+)"/)[1]);
  const state=authURL.searchParams.get('state'), channel=channels[0];
  assert.equal(channel.name,'ddl-connect-'+state);
  assert.equal(authURL.searchParams.get('callback_url'),'https://example.org/lab/');
  await channel.onmessage({data:{state:'wrong',code:'test-code'}});
  assert.equal(calls.length,0);
  await channel.onmessage({data:{state,code:'test-code'}});
  const exchange=JSON.parse(calls[0].options.body);
  assert.equal(createHash('sha256').update(exchange.code_verifier).digest('base64url'),authURL.searchParams.get('code_challenge'));
  assert.ok(channel.closed);
  assert.doesNotMatch(root.innerHTML,/dummy-test-key/);
  location.hash='room/last-translator';
  DDL.rooms.room(root,'last-translator');
  assert.equal(calls.length,1);
  const field=nodes.get('textarea[name=message]');
  field.value='Open the hearing.';field.oninput();
  nodes.get('[data-message-form]').onsubmit({preventDefault(){}});
  await new Promise(setImmediate);
  assert.equal(calls.length,2);
  const chat=calls[1];
  assert.equal(chat.url,'https://openrouter.ai/api/v1/chat/completions');
  const payload=JSON.parse(chat.options.body);
  assert.equal(payload.messages[1].content,masters.render(masters.find('last-translator')));
  assert.equal(payload.messages[2].content,'Open the hearing.');
  assert.match(root.innerHTML,/Which voice would you preserve/);
  nodes.get('[data-act=disconnect]').click();
  assert.match(root.innerHTML,/Disconnected in this tab/);
});

test('a prompt feed matches only source metadata and keeps the source in the next contribution',async()=>{
  const nodes=new Map();
  function element(selector){
    if(!nodes.has(selector))nodes.set(selector,{querySelector:element,insertAdjacentHTML(){},addEventListener(){}});
    return nodes.get(selector);
  }
  const root={querySelector:element}, calls=[];
  const X={intro:(_,title)=>title,link:(label,href)=>label+' '+href,btn:String,body:masters.render};
  const DDL={exchange:X,masters,escape:String};
  const env={window:{DDL},location:{},AbortSignal,fetch:async url=>{
    calls.push(new URL(url));
    function issue(number,base,excerpt){
      return {number,state:'open',title:'[DeepDialogue] Member '+number,body:DDL.community.format({kind:'Conversation',base,text:excerpt,question:'What next?'})};
    }
    return {ok:true,json:async()=>({total_count:2,items:[
      issue(5,'last-translator','A different reading'),
      issue(6,'quiet-machine','Quoted from a different thread:\nPrompt: last-translator')
    ]})};
  }};
  vm.runInNewContext(readFileSync(file('app/community.js'),'utf8'),env);
  DDL.community.render(root,'prompt-last-translator');
  await new Promise(setImmediate);
  assert.match(calls[0].searchParams.get('q'),/in:body "Prompt: last-translator"/);
  assert.match(element('[data-threads]').innerHTML,/Member 5/);
  assert.doesNotMatch(element('[data-threads]').innerHTML,/Member 6/);
  element('[data-act=new]').onclick();
  assert.equal(env.location.hash,'community/new');
  const fields=Object.fromEntries(['kind','title','text','question','model','changes','script'].map(k=>[k,{value:''}]));
  const preview={replaceChildren(){},querySelector:()=>({}),scrollIntoView(){}};
  const form={elements:fields};
  const composer={querySelector:key=>key==='form'?form:preview};
  DDL.data={mask:String};env.URL=URL;
  DDL.community.render(composer,'new');
  fields.title.value='Museum';fields.text.value='Two readings';fields.question.value='Who chooses?';
  form.onsubmit({preventDefault(){}});
  assert.match(preview.innerHTML,/Prompt: last-translator/);
  DDL.community.render(root,'prompt-missing');
  assert.match(root.innerHTML,/Prompt unavailable/);
  assert.equal(calls.length,1);
});

test('a published original can be opened, copied and remixed with the source issue intact',async()=>{
  const nodes=new Map();
  function element(selector){
    if(!nodes.has(selector))nodes.set(selector,{querySelector:element,addEventListener(t,listener){this[t]=listener;}});
    return nodes.get(selector);
  }
  const root={querySelector:element,querySelectorAll:()=>[]},location={},DDL={masters,escape:String};
  const env={window:{DDL},location,AbortSignal,fetch:async()=>({ok:true,json:async()=>({
    number:34,state:'open',title:'[DeepDialogue] A museum of sound',comments:0,user:{login:'reader'},
    body:DDL.community.format({kind:'Original prompt',parent:17,text:'An archive',question:'What survives?',script:'Listen to the room.'}).replaceAll('\n','\r\n')
  })})};
  for(const name of ['exchange','community'])vm.runInNewContext(readFileSync(file('app/'+name+'.js'),'utf8'),env);
  DDL.community.render(root,'34');
  await new Promise(setImmediate);
  assert.match(element('[data-thread]').innerHTML,/#community\/17/);
  element('[data-act=open]').click();
  const draft=DDL.exchange.get(location.hash.split('/')[1]);
  assert.equal(draft.parent,'34');
  assert.equal(DDL.exchange.body(draft),'Listen to the room.');
  DDL.exchange.detail(root,draft.id);
  assert.equal(element('[data-copy-text]').value,'Listen to the room.');
  assert.match(root.innerHTML,/#community\/34/);
  element('[data-act=fork]').click();
  assert.match(location.hash,/^workshop\/draft-/);
});

test('a live room changes editions without sending, then forwards the chosen text and prior turn',async()=>{
  const elements=new Map(),calls=[],location=new URL('http://127.0.0.1:8765/#room/hindsight-2100-short');
  function element(key){
    if(!elements.has(key))elements.set(key,{value:'',addEventListener(name,fn){this[name]=fn;}});
    return elements.get(key);
  }
  const root={querySelector:element,querySelectorAll:()=>[]};
  const DDL={masters,escape:String,data:{mask:String},notify(){}};
  const env={window:{DDL,isSecureContext:true},document:{getElementById:()=>root},location,
    AbortController,AbortSignal,setTimeout:()=>1,clearTimeout(){},fetch:async(url,options)=>{
      calls.push({url,options,body:JSON.parse(options.body)});
      return {ok:true,json:async()=>({reply:'Which signal would change your forecast?',model:'test-model'})};
    }};
  for(const script of ['exchange','rooms'])vm.runInNewContext(readFileSync(file('app/'+script+'.js'),'utf8'),env);
  DDL.rooms.room(root,'hindsight-2100-short');
  const provider=element('[data-provider]');
  provider.value='Local model';provider.onchange();
  async function send(text){
    const msg=element('textarea[name=message]');msg.value=text;msg.oninput();
    element('[data-message-form]').onsubmit({preventDefault(){}});
    await new Promise(setImmediate);
  }
  await send('I would examine the records.');
  const select=element('[data-room-size]');select.value='hindsight-2100';select.onchange();
  assert.equal(calls.length,1);
  await send('Question my forecast.');
  assert.equal(calls[1].url,'/api/conversation');
  assert.equal(calls[1].options.headers.Authorization,undefined);
  assert.equal(calls[1].body.prompt,masters.render(masters.find('hindsight-2100')));
  assert.deepEqual(calls[1].body.turns.map(t=>t.content),['I would examine the records.','Which signal would change your forecast?','Question my forecast.']);
});

test('OpenRouter manual key is used only on an explicit model send',async()=>{
  const nodes=new Map(),requests=[],location=new URL('https://example.org/#room/hindsight-2100-short');
  const element=key=>{
    if(!nodes.has(key))nodes.set(key,{value:'',addEventListener(event,fn){this[event]=fn;}});
    return nodes.get(key);
  };
  const root={querySelector:element,querySelectorAll:()=>[]};
  const DDL={masters,escape:String,data:{mask:String},notify(){}};
  const env={window:{DDL,isSecureContext:true},document:{getElementById:()=>root},location,AbortController,
    setTimeout:()=>1,clearTimeout(){},fetch:async(url,options)=>{requests.push([url,options]);return {ok:false,status:401};}};
  for(const script of ['exchange','rooms'])vm.runInNewContext(readFileSync(file('app/'+script+'.js'),'utf8'),env);
  DDL.rooms.room(root,'hindsight-2100-short');
  const key=element('[data-api-key]');key.value='sk-or-synthetic-for-testing';
  element('[data-act=use-key]').click();
  assert.equal(requests.length,0);assert.equal(key.value,'');assert.doesNotMatch(root.innerHTML,/synthetic-for-testing/);
  await element('[data-act=begin]').click();
  assert.equal(requests.length,1);
  assert.equal(requests[0][0],'https://openrouter.ai/api/v1/chat/completions');
  assert.equal(requests[0][1].headers.Authorization,'Bearer sk-or-synthetic-for-testing');
  assert.match(root.innerHTML,/Authorization expired/);
});
