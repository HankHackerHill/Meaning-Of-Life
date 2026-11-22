(() => {
  'use strict';
  const D=window.DDL, M=D.masters, esc=D.escape;
  const drafts=new Map();
  let serial=0, term='', topic='';
  function get(id){return M.find(id)||drafts.get(id);}
  function saveDraft(title,text,base,parent){
    const draft={id:'draft-'+(++serial),title,body:text,base,parent,topic:'Workshop',method:'Community remix'};
    drafts.set(draft.id,draft);return draft;
  }
  const body=p=>p.body||M.render(p);
  const btn=(label,action,kind='solid')=>'<button type="button" class="'+kind+'" data-act="'+action+'">'+esc(label)+'</button>';
  const link=(label,href,kind='text-link')=>'<a class="'+kind+'" href="'+esc(href)+'">'+esc(label)+'</a>';
  const intro=(label,title,description)=>'<div class="page-intro"><div><div class="overline"><i></i>'+esc(label)+'</div><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></div></div>';
  async function copy(text,root){
    try{await navigator.clipboard.writeText(text);D.notify('Master prompt copied. Paste it into your AI to begin.');}
    catch{const box=root.querySelector('[data-copy-text]');box.closest('details')?.setAttribute('open','');box.focus();box.select();D.notify('Prompt selected. Use your device’s Copy command.');}
  }
  function card(p){return '<a class="mx-card" href="#exchange/'+p.id+'"><small>'+esc(p.topic)+'</small><strong>'+esc(p.title)+'</strong><span>'+esc(p.method)+' '+D.icon('arrow',15)+'</span></a>';}
  function home(root){
    const featured=M.catalogue[0], topics=[...new Set(M.catalogue.map(p=>p.topic))].sort();
    root.innerHTML=intro('DeepDialogue Lab','Master prompt library','Copy a complete prompt into your AI, or open it here and take the other side of the conversation.')+
      '<article class="hero mx-hero"><div class="hero-art" aria-hidden="true"></div><div class="hero-content"><div class="hero-label">Featured master prompt</div><h2>'+esc(featured.title)+'</h2><p>One farewell. Two translations. Which one goes on the museum wall?</p>'+link('Explore the prompt','#exchange/'+featured.id,'hero-button')+'</div></article>'+
      '<div class="mx-heading"><h2>Explore the collection</h2>'+link('Build a master prompt','#workshop')+'</div>'+
      '<div class="mx-filters"><label class="search-box">'+D.icon('search')+'<input type="search" aria-label="Search master prompts" placeholder="Search master prompts" value="'+esc(term)+'"></label><select aria-label="Filter by topic"><option value="">All topics</option>'+topics.map(t=>'<option '+(t===topic?'selected':'')+'>'+esc(t)+'</option>').join('')+'</select></div><p class="fb-count" role="status"></p><div class="mx-grid"></div>';
    function update(){
      const items=M.catalogue.filter(p=>(!topic||p.topic===topic)&&[p.title,p.topic,p.method,p.question].join(' ').toLowerCase().includes(term.trim().toLowerCase()));
      root.querySelector('.fb-count').textContent=items.length+' master prompt'+(items.length===1?'':'s');
      root.querySelector('.mx-grid').innerHTML=items.map(card).join('')||'<p>No matches. Try a broader topic.</p>';
    }
    root.querySelector('input').oninput=e=>{term=e.target.value;update();};
    root.querySelector('select').onchange=e=>{topic=e.target.value;update();};update();
  }
  function detail(root,id){
    const p=get(id);
    if(!p){root.innerHTML=intro('Collection','Prompt unavailable','A workshop draft lives in the tab where it was created.')+link('Browse master prompts','#exchange');return;}
    root.innerHTML=link('‹ Master prompt library','#exchange','fb-back')+intro(p.topic,p.title,p.method)+
      '<article class="fb-proposition"><small>Opening scene</small><p>'+esc(p.question||p.body.split('\n').find(Boolean))+'</p></article>'+
      '<div class="mx-actions">'+btn('Copy master prompt','copy')+link('Talk here','#room/'+p.id,'filter')+link('Remix this prompt','#workshop/'+p.id,'filter')+'</div>'+
      (p.artifact?'<div class="fb-panel"><h2>What you will make</h2><p>'+esc(p.artifact)+'</p></div>':'')+
      '<details class="fb-panel" open><summary>Complete master prompt</summary><textarea readonly aria-label="Complete master prompt" class="mx-text" data-copy-text></textarea></details>'+
      '<div class="mx-heading"><h2>Take it further</h2>'+btn('Share a conversation','share','filter')+'</div>'+link('Read community conversations','#community');
    root.querySelector('[data-copy-text]').value=body(p);
    root.querySelector('[data-act=copy]').onclick=()=>copy(body(p),root);
    root.querySelector('[data-act=share]').onclick=()=>D.community.compose({prompt:p,kind:p.body?'Prompt remix':'Conversation'});
  }
  function workshop(root,id){
    const p=get(id), raw=Boolean(p?.body), methods=[...new Map(M.catalogue.map(x=>[x.method,x])).values()];
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
    if(raw){f.script.value=p.body;}
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
  D.exchange={home,detail,workshop,get,body,saveDraft,intro,link,btn,copy};
})();
