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
  const input = [
    request(0, 'prompts/list'),
    request(1, 'initialize', {protocolVersion:'2025-06-18'}),
    JSON.stringify({jsonrpc:'2.0', method:'notifications/initialized'}),
    request(2, 'prompts/list'),
    ...masters.catalogue.map((p,i) => request(i+3,'prompts/get',{name:p.id})),
    '{',
    request('unknown', 'prompts/get', {name:'missing'}),
    request('ping', 'ping')
  ].join('\n')+'\n';
  const child=spawnSync(process.execPath, [file('mcp.cjs')], {input,encoding:'utf8'});
  assert.equal(child.status,0,child.stderr);
  const results=child.stdout.trimEnd().split('\n').map(s=>JSON.parse(s));
  assert.equal(results[0].error.code,-32002);
  assert.equal(results[1].result.protocolVersion,'2025-06-18');
  const listed=results[2].result.prompts.map(p=>p.name);
  assert.deepEqual(listed,masters.catalogue.map(p=>p.id));
  assert.equal(new Set(listed).size,40);
  masters.catalogue.forEach((p,i)=>{
    const script=masters.render(p);
    assert.ok(script.length>1600);
    assert.ok(script.includes(p.question) && script.includes(p.askBack) && script.includes(p.artifact));
    assert.deepEqual(results[i+3].result.messages,[{role:'user',content:{type:'text',text:script}}]);
  });
  assert.equal(results.at(-3).error.code,-32700);
  assert.equal(results.at(-2).error.code,-32602);
  assert.deepEqual(results.at(-1).result,{});
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
  const X={get:masters.find,body:masters.render,btn:()=>'',intro:()=>'',link:()=>''};
  const DDL={exchange:X,escape:String,data:{mask:String}};
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
  const field=nodes.get('textarea');
  field.value='Open the hearing.';field.oninput();
  nodes.get('form').onsubmit({preventDefault(){}});
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
  const fields=Object.fromEntries(['kind','title','text','question','script'].map(k=>[k,{value:''}]));
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
  const root={querySelector:element},location={},DDL={masters,escape:String};
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
