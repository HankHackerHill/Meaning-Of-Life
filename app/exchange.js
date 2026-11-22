(() => {
  'use strict';
  const D=window.DDL, M=D.masters, esc=D.escape;
  const drafts=new Map();
  let serial=0;
  const searches=new Map();
  function get(id){return M.find(id)||drafts.get(id);}
  function saveDraft(title,text,base,parent){
    const draft={id:'draft-'+(++serial),title,body:text,base,parent,topic:'Workshop',method:'Community remix'};
    drafts.set(draft.id,draft);return draft;
  }
  const body=p=>p.body||M.render(p);
  const btn=(label,action,kind='solid')=>'<button type="button" class="'+kind+'" data-act="'+action+'">'+esc(label)+'</button>';
  const link=(label,href,kind='text-link')=>'<a class="'+kind+'" href="'+esc(href)+'">'+esc(label)+'</a>';
  const intro=(label,title,description)=>'<div class="page-intro"><div><div class="overline"><i></i>'+esc(label)+'</div><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></div></div>';
  const examples={
    'last-translator':[
      ['Participant','I’d print both translations in the same size. Nobody gets the last word.'],
      ['AI','The granddaughter asks you to take her translation down. She told you what she heard in a private conversation. What happens to your two equal labels?'],
      ['Participant','I confused giving her equal space with getting her permission. I’d ask whether she wants her words, her disagreement, or neither on the wall.'],
      ['AI','She permits “the family disputes this translation.” Draft a label a visitor could read without assuming the whole family agrees.']
    ],
    'quiet-machine':[
      ['Participant','If it remembered the afternoon my dog died without my reminding it, I’d start to believe it cared.'],
      ['AI','Imagine two systems recall that afternoon word for word. One retrieves a diary entry. You know nothing about the other. Would you thank them differently?'],
      ['Participant','I would thank both. The memory made me feel less alone. That tells me something about my afternoon, but less about theirs than I thought.'],
      ['AI','What obligation, if any, would you give either system on the strength of that uncertainty? Now ask me what evidence would change my answer.']
    ],
    'silent-signal':[
      ['Participant','I’d book the second telescope next Sunday. If it sees the signal too, I’d call a press conference.'],
      ['AI','Suppose both telescopes run the same Sunday calibration. What would two detections establish?'],
      ['Participant','That two instruments did something together. I’d ask the second team to change its schedule before I told them when our signal appears.'],
      ['AI','They can move the calibration or change the patch of sky, but their shift is too short for both. Which comparison earns the night?']
    ]
  };
  function writingExamples(){
    return '<section class="fb-panel"><h2>Dialogue studies for writers</h2><p>These three scripted scenes illustrate how a character can change their mind.</p>'+
      Object.keys(examples).map(id=>example(id)).join('')+'</section>';
  }
  function example(id){
    if(!Object.hasOwn(examples,id))return '';
    return '<details class="fb-panel mx-room"><summary>'+esc(M.find(id).title)+' · fictional dialogue</summary>'+
      examples[id].map(([role,text])=>'<blockquote><small>'+esc(role)+'</small><p>'+esc(text)+'</p></blockquote>').join('')+'</details>';
  }
  async function copy(text,root){
    try{await navigator.clipboard.writeText(text);D.notify('Master prompt copied. Paste it into your AI to begin.');}
    catch{const box=root.querySelector('[data-copy-text]');box.closest('details')?.setAttribute('open','');box.focus();box.select();D.notify('Prompt selected. Use your device’s Copy command.');}
  }
  const nameOf=size=>size?size[0].toUpperCase()+size.slice(1):'';
  const route=p=>'#'+(p.fiction?'fiction':'exchange')+'/'+p.id;
  const choices={
    stance:['Stance',{'Candid assessment':'Give your best-supported assessment, including evidence against it. In a forecast, give the time horizon, your uncertainty and a sign that would change your mind.','Skeptical':'Test my strongest claim against an alternative that could actually explain the same evidence.','Collaborative':'Develop my idea with me, and name a condition that would make us abandon it.'}],
    voice:['Voice',{'Plainspoken friend':'Use the plain speech of a thoughtful friend.','Scientist':'Speak as a scientist explaining the limits of an inference.','Philosopher':'Use a concrete counterexample to examine a philosophical claim.','Interviewer':'Listen closely and follow up on my actual words.','Storyteller':'Use clearly marked imagined scenes when they help me explore an idea.','Mix voices':'Change voice when useful and tell me when you change perspective.'}],
    challenge:['Challenge',{'Intellectual':'Make me defend a prediction or distinguish competing explanations.','Emotional':'Invite me to explore a value or a cost I may find difficult. Let me pass.','Both':'Test my reasoning and invite me to name what a change of mind would cost me. Let me pass.'}],
    opening:['First move',{'AI answers first':'Commit to your own provisional answer before asking for mine.','Ask me first':'Ask me one opening question and wait before giving your view.'}],
    perspective:['Perspective',{'My experience':'Let me choose how much of my own experience to share.','Third person':'Offer a clearly identified hypothetical character facing a recognizable human problem.'}],
    ending:['Ending',{'One memorable line':'When I say I am satisfied, close with one specific line worth thinking about and leave it there.'}]
  };
  const preferences={};
  let includeSources=false;
  function configured(p){
    const instructions=Object.entries(choices).map(([key,[,options]])=>options[preferences[key]]).filter(Boolean);
    if(includeSources&&p.sources?.length)instructions.push('Source material\n'+p.sources.map(s=>s.label+' — '+s.url).join('\n'));
    return [body(p),...instructions].join('\n\n');
  }
  function settings(){
    return '<details class="fb-panel mx-prefs"><summary>Choose how your AI responds</summary><div class="mx-pref-grid">'+
      Object.entries(choices).map(([key,[label,options]])=>'<label>'+label+'<select data-setting="'+key+'"><option value="">As written</option>'+
        Object.keys(options).map(value=>'<option '+(preferences[key]===value?'selected':'')+'>'+esc(value)+'</option>').join('')+'</select></label>').join('')+
      '</div><label><input type="checkbox" data-include-sources '+(includeSources?'checked':'')+'> Include available source links in the prompt</label><p>Choices apply to copied prompts and live rooms in this tab.</p></details>';
  }
  function bindSettings(root,onChange){
    const sources=root.querySelector('[data-include-sources]');
    if(sources)sources.onchange=()=>{includeSources=sources.checked;onChange?.();};
    root.querySelectorAll('[data-setting]').forEach(field=>field.onchange=()=>{
      preferences[field.dataset.setting]=field.value;onChange?.();
    });
  }
  function card(p){
    return '<a class="mx-card" href="'+route(p)+'"><small>'+esc(p.topic)+' · '+nameOf(p.size)+'</small><strong>'+esc(p.title)+'</strong>'+
      '<span class="mx-excerpt">'+esc(p.question)+'</span></a>';
  }
  function home(root,fiction=false){
    const scope=fiction?'fiction':'exchange', collection=M.catalogue.filter(p=>Boolean(p.fiction)===fiction);
    if(!searches.has(scope))searches.set(scope,{term:'',topic:'',size:'',limit:24});
    const groups=new Map();
    for(const p of collection){if(!groups.has(p.topic))groups.set(p.topic,[]);groups.get(p.topic).push(p);}
    const pools=[...groups.values()];
    const browse=[];
    for(let i=0;i<Math.max(0,...pools.map(group=>group.length));i++){for(const group of pools)if(group[i])browse.push(group[i]);}
    const state=searches.get(scope), topics=[...new Set(collection.map(p=>p.topic))].sort();
    const feature=M.find('hindsight-2100-short')||M.find('last-translator');
    root.innerHTML=intro(fiction?'Writing studio':'DeepDialogue Lab',fiction?'Fiction & storytelling':'Master prompt library',
      fiction?'Develop an invented scene, a character’s choice or a story that can surprise its author.':'Find a question, choose its length, and take it to your AI.')+
      (fiction?'':'<article class="hero mx-hero"><div class="hero-art" aria-hidden="true"></div><div class="hero-content"><div class="hero-label">Featured conversation</div><h2>What will seem obvious in 2100?</h2><p>Give a future historian one piece of evidence you can see today.</p>'+link('Try the short prompt',route(feature),'hero-button')+'</div></article>')+
      '<div class="mx-heading"><h2>Explore the collection</h2>'+link('Build a master prompt','#workshop')+'</div>'+
      '<div class="mx-filters"><label class="search-box">'+D.icon('search')+'<input type="search" aria-label="Search master prompts" placeholder="Search master prompts" value="'+esc(state.term)+'"></label>'+
      (fiction?'':'<select aria-label="Filter by topic" data-topic><option value="">All topics</option>'+topics.map(t=>'<option '+(t===state.topic?'selected':'')+'>'+esc(t)+'</option>').join('')+'</select>')+
      '<select aria-label="Filter by length" data-size><option value="">Any length</option>'+M.sizes.map(size=>'<option value="'+size+'" '+(state.size===size?'selected':'')+'>'+nameOf(size)+'</option>').join('')+'</select></div>'+
      '<p class="fb-count" role="status"></p><div class="mx-grid"></div><div class="mx-actions" data-more></div>';
    if(fiction)root.insertAdjacentHTML('beforeend',writingExamples());
    const update=()=>{
      const term=state.term.trim().toLowerCase();
      const matches=browse.filter(p=>(!state.topic||p.topic===state.topic)&&(!state.size||p.size===state.size)&&
        (!term||[p.title,p.topic,p.method,M.render(p)].join(' ').toLowerCase().includes(term)));
      const visible=matches.slice(0,state.limit);
      root.querySelector('.fb-count').textContent=matches.length+' prompt'+(matches.length===1?'':'s')+(visible.length<matches.length?' · Showing '+visible.length:'');
      root.querySelector('.mx-grid').innerHTML=visible.map(card).join('')||'<p>No prompts match these filters.</p>';
      const more=root.querySelector('[data-more]');
      more.innerHTML=visible.length<matches.length?btn('Show more prompts','more','filter'):'';
      if(more.firstElementChild)more.firstElementChild.onclick=()=>{state.limit+=24;update();};
    };
    for(const [selector,key] of [['input','term'],['[data-topic]','topic'],['[data-size]','size']]){
      const input=root.querySelector(selector);
      if(input)input[key==='term'?'oninput':'onchange']=()=>{state[key]=input.value;state.limit=24;update();};
    }
    update();
  }
  function detail(root,id){
    const p=get(id);
    if(!p){root.innerHTML=intro('Collection','Prompt unavailable','A workshop draft lives in the tab where it was created.')+link('Browse master prompts','#exchange');return;}
    const source=M.find(p.base||id),family=M.related(p), isDraft=Boolean(p.body);
    const plain=body(p);
    const related=family.length>1?'<nav aria-label="Other lengths" class="mx-actions">'+family.map(q=>q.id===p.id?'<strong aria-current="page">'+nameOf(q.size)+'</strong>':link(nameOf(q.size),route(q),'filter')).join('')+'</nav>':'';
    const references=(p.sources||[]).filter(s=>/^https:\/\//.test(s.url)).map(s=>'<a class="text-link" target="_blank" rel="noopener noreferrer" href="'+esc(s.url)+'">'+esc(s.label)+'</a>');
    root.innerHTML=link(p.fiction?'‹ Fiction & storytelling':'‹ Master prompt library',p.fiction?'#fiction':'#exchange','fb-back')+intro(p.topic,p.title,p.size?nameOf(p.size)+' prompt · '+plain.trim().split(/\s+/).length+' words':p.method)+related+
      '<div class="mx-actions">'+btn('Copy master prompt','copy')+link('Talk here','#room/'+p.id,'filter')+link('Remix this prompt','#workshop/'+p.id,'filter')+'</div>'+
      settings()+'<section class="fb-panel"><h2>Complete master prompt</h2><textarea readonly aria-label="Complete master prompt" class="mx-text mx-'+(p.size||'long')+'" data-copy-text></textarea></section>'+
      (references.length?'<section class="fb-panel"><h2>Source material</h2><div class="mx-actions">'+references.join('')+'</div></section>':'')+
      (p.family==='hindsight-2100'?'<p>Inspired by a community recollection of a SeggySaid conversation. This is an original prompt.</p>':'')+
      (p.artifact?'<div class="fb-panel"><h2>What you will make</h2><p>'+esc(p.artifact)+'</p></div>':'')+
      (family.length>1?'<details class="fb-panel mx-room"><summary>Continue from an answer in another AI</summary><label>Your earlier answer<textarea data-earlier maxlength="8000" rows="3"></textarea></label>'+btn('Copy continuation','continue','filter')+'<textarea aria-label="Continuation for manual copying" data-manual hidden readonly></textarea></details>':'')+
      '<div class="mx-heading"><h2>Take it further</h2>'+btn(isDraft?'Share this prompt':'Share a conversation','share','filter')+'</div><div class="mx-actions">'+
      (p.parent?link('Read community thread #'+p.parent,'#community/'+p.parent,'filter'):'')+
      (source?link('Conversations about this prompt','#community/prompt-'+source.id):link('Read community conversations','#community'))+'</div>';
    const box=root.querySelector('[data-copy-text]');
    const sync=()=>box.value=configured(p);
    sync();bindSettings(root,sync);
    root.querySelector('[data-act=copy]').onclick=()=>copy(configured(p),root);
    if(family.length>1)root.querySelector('[data-act=continue]').onclick=async()=>{
      const answer=root.querySelector('[data-earlier]').value.trim();
      if(!answer){D.notify('Enter the answer you want to carry forward.');return;}
      const next=configured(p)+'\n\nContinue from my earlier answer below. Ask the next relevant question without restarting.\n\n'+answer;
      try{await navigator.clipboard.writeText(next);D.notify('Continuation copied.');}
      catch{const t=root.querySelector('[data-manual]');t.hidden=false;t.value=next;t.focus();t.select();}
    };
    root.querySelector('[data-act=share]').onclick=()=>D.community.compose({prompt:p,kind:isDraft?(p.base||p.parent?'Prompt remix':'Original prompt'):'Conversation'});
  }
  function workshop(root,id){
    const p=get(id), raw=Boolean(p?.body||p?.script), methods=[...new Map(M.catalogue.filter(x=>x.procedure).map(x=>[x.method,x])).values()];
    const formField=(label,name,limit,rows=0,required=true)=>'<label>'+esc(label)+(rows?'<textarea name="'+name+'" rows="'+rows+'"':'<input name="'+name+'"')+' maxlength="'+limit+'" '+(required?'required':'')+'>'+(rows?'</textarea>':'')+'</label>';
    root.innerHTML=intro('Prompt workshop',p?'Remix a master prompt':'Build a master prompt','Give the conversation a specific scene, a competing interpretation and something worth making together.')+
      '<form class="fb-panel mx-form">'+formField('Prompt title','title',100)+
      (raw?formField('Edit the full conversation script','script',11000,14):
        formField('Opening scene and first question','opening',650,3)+'<label>Conversation method<select name="method">'+methods.map(x=>'<option>'+esc(x.method)+'</option>').join('')+'</select></label>'+
        formField('How should the AI investigate?','procedure',1300,4)+formField('Follow-up moves, one per line','moves',1800,4)+formField('What can the human ask back?','reverse',500,2))+
      formField('A change that puts the first answer under pressure (optional)','twist',450,2,false)+formField('What should you make together?','result',500,2,!raw)+
      '<button class="solid">Preview master prompt</button></form>';
    const form=root.querySelector('form'), f=form.elements;
    f.title.value=p?(p.title+' · remix').slice(0,100):'';
    if(raw){f.script.value=body(p);}
    else{
      const source=p||M.find('quiet-machine');
      f.opening.value=p?.question||'';f.method.value=source.method;f.procedure.value=source.procedure;
      f.moves.value=(p?.followups||['What would the person who disagrees with me notice first?','Change one detail. Which part of my answer survives?','What would help us decide between the two readings?']).join('\n');
      f.reverse.value=p?.askBack||'Make the strongest case against my interpretation. Which part of your own case could be wrong?';
      f.result.value=p?.artifact||'A brief account of the first judgment, the strongest objection and one question another person could investigate.';
      f.method.onchange=()=>{f.procedure.value=methods.find(x=>x.method===f.method.value).procedure;};
    }
    form.onsubmit=e=>{
      e.preventDefault();const title=f.title.value.trim(),twist=f.twist.value.trim(),artifact=f.result.value.trim();
      let text;
      if(raw)text=[f.script.value.trim(),twist&&'Change the premise\n'+twist,artifact&&'Closing artifact\n'+artifact].filter(Boolean).join('\n\n');
      else{
        const moves=f.moves.value.split('\n').map(x=>x.trim()).filter(Boolean);
        if(!title||!moves.length||![f.opening,f.procedure,f.reverse,f.result].every(x=>x.value.trim())){D.notify('Complete the scene, method, follow-ups and closing artifact.');return;}
        text=M.render({title,method:f.method.value,question:f.opening.value.trim(),procedure:[f.procedure.value.trim(),twist].filter(Boolean).join(' '),followups:moves,askBack:f.reverse.value.trim(),artifact});
      }
      if(!title||!text||text.length>11000){D.notify('Enter a title and keep the complete script under 11,000 characters.');return;}
      const draft=saveDraft(title,text,p?.base||(p&&M.find(p.id)?p.id:''),p?.parent);
      if(!raw){draft.question=f.opening.value.trim();draft.method=f.method.value;draft.artifact=artifact;}
      location.hash='exchange/'+draft.id;
    };
  }
  D.exchange={home,detail,workshop,get,body,saveDraft,intro,link,btn,copy,settings,bindSettings,configured,route};
})();
