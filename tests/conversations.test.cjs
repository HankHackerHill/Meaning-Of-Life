'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const file = name => fs.readFileSync(path.join(__dirname,'..',name),'utf8');

function runtime(fetch) {
  const nodes = new Map();
  function node(selector) {
    if (!nodes.has(selector)) nodes.set(selector,{
      querySelector:node, focus(){}, value:'', isConnected:true
    });
    return nodes.get(selector);
  }
  const context = {location:fetch?new URL('http://127.0.0.1:8765'):new URL('https://example.invalid'),
    clearInterval(){},setInterval(){},setTimeout,clearTimeout,AbortController,URL,fetch,
    DDL:{escape:String, data:{mask:String,sources:()=>[]},navigate(){},notify(){}}};
  context.window=context;
  vm.createContext(context);
  for(const name of ['conversations','casebook','dialogue'])vm.runInContext(file('app/'+name+'.js'),context);
  const app=context.DDL, root=node('root');
  return {app, root, node, start(prompt){app.dialogue.start({...prompt,lens:'Socratic'});app.dialogue.render(root);},
    reply(text){node('.dg').onsubmit({preventDefault(){},target:{hasAttribute:k=>k==='data-dg-message',querySelector:()=>({value:text})}});}};
}

test('the standalone deck includes every conversation, reverse question, follow-up and reading',()=>{
  const {app}=runtime(), deck=file('CONVERSATIONS.md'), rows=app.conversations;
  assert.equal(rows.length,36);assert.equal(new Set(rows.map(p=>p.id)).size,36);
  assert.equal(new Set(rows.map(p=>p.topic)).size,12);
  const questions=new Set();
  for(const p of rows){
    assert.equal(p.followups.length,3);assert.ok(deck.includes('### '+p.title));
    for(const text of [p.question,p.askBack,...p.followups]){
      assert.ok(text.length>12 && text.length<=500,p.id);assert.ok(deck.includes(text),p.id);questions.add(text);
    }
    if(p.reading)assert.ok(deck.includes(p.reading[1]));
  }
  assert.equal(questions.size,180);
});

test('each guided conversation renders its reverse question and reveals three follow-ups in order',()=>{
  const {app,root,start,reply}=runtime();
  for(const p of app.conversations){
    start(p);assert.ok(root.innerHTML.includes(p.question)&&root.innerHTML.includes(p.askBack));
    assert.ok(!root.innerHTML.includes(p.followups[2]));
    for(const [i,q] of p.followups.entries()){
      assert.ok(!root.innerHTML.includes(q));
      reply(['One explanation seems plausible.','Here is a different reading.','The counterexample changes my answer.'][i]);
      assert.ok(root.innerHTML.includes(q),p.id);
    }
    app.dialogue.reset();
  }
});

test('a local-model reversal leaves the next guided question available, including after provider failure',async()=>{
  const calls=[];
  async function fetch(url,options){
    const ok=data=>({ok:true,headers:{get:()=>'application/json'},json:async()=>data});
    if(url.pathname==='/api/status')return ok({available:true});
    calls.push(JSON.parse(options.body));
    if(calls.length===3)throw Error('Synthetic service interruption');
    return ok({reply:'Which detail supports interpretation '+calls.length+'?',signals:[]});
  }
  const {app,root,node,start,reply}=runtime(fetch);
  const p=app.conversations[0];start(p);
  const tick=()=>new Promise(resolve=>setImmediate(resolve));
  await tick();
  node('.dg').onclick({target:{closest:()=>({dataset:{dg:'online'}})}});
  reply('I value the criticism itself.');await tick();assert.equal(calls[0].nextQuestion,p.followups[0]);
  reply(p.askBack);await tick();assert.equal(calls[1].nextQuestion,undefined);
  reply('Perhaps the editor saw something I missed.');await tick();
  assert.equal(calls[2].nextQuestion,p.followups[1]);assert.ok(root.innerHTML.includes('did not return a reply'));
  assert.ok(!root.innerHTML.includes(p.followups[1]));
  node('.dg').onclick({target:{closest:()=>({dataset:{dg:'resume'}})}});
  reply('I would want a specific counterexample.');assert.ok(root.innerHTML.includes(p.followups[1]));
  app.dialogue.reset();
});
