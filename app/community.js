(() => {
  'use strict';
  const D=window.DDL, X=D.exchange, esc=D.escape;
  const repo='hackytacky/Meaning-Of-Life', web='https://github.com/'+repo, api='https://api.github.com';
  const kinds=['Conversation','Original prompt','Prompt remix','Discovery question','Build together','I built something from this','Personal experience','Model comparison'];
  const sharesPrompt=kind=>kind==='Original prompt'||kind==='Prompt remix';
  const prefix='[DeepDialogue] ', marker='DeepDialogue community · v1';
  let draft=null;
  function format(d){
    const parts=[marker,'Kind: '+d.kind];
    if(d.base)parts.push('Prompt: '+d.base);
    if(d.parent)parts.push('Based on thread: #'+d.parent);
    if(d.model)parts.push('Model (contributor supplied): '+d.model.replace(/[\r\n]+/g,' '));
    parts.push('','## Contribution','',d.text);
    if(d.question)parts.push('','## Question for others','',d.question);
    if(d.changes)parts.push('','## What changed, why, and what I wanted to learn','',d.changes);
    if(d.script)parts.push('','## Master prompt','',d.script);
    return parts.join('\n');
  }
  function compose({prompt,parent,text='',kind='Conversation',model=''}={}){
    const base=prompt?.base||(D.masters.find(prompt?.id)?prompt.id:'');
    const suggested=prompt?X.body(prompt):'';
    draft={kind,base,model,changes:'',parent:parent||prompt?.parent||'',title:sharesPrompt(kind)&&prompt?prompt.title:'',text,question:'',script:sharesPrompt(kind)?suggested:'',suggested};
    location.hash='community/new';
  }
  function composePage(root){
    if(!draft)draft={model:'',changes:'',kind:'Conversation',base:'',parent:'',title:'',text:'',question:'',script:'',suggested:''};
    root.innerHTML=X.intro('Community','Share a contribution','Choose the excerpt or idea you want other people to read. The next step previews your exact public draft.')+
      '<form class="fb-panel mx-form"><label>Contribution type<select name="kind">'+kinds.map(k=>'<option>'+k+'</option>').join('')+'</select></label><label>Title<input name="title" required maxlength="100"></label><label>Conversation excerpt, observation or idea<textarea name="text" required maxlength="48000" rows="6"></textarea></label><label>What would you like others to challenge or build? (optional)<textarea name="question" maxlength="450" rows="2"></textarea></label><label>AI or model used (optional)<input name="model" maxlength="140"></label><label>What changed, why, and what did you want to learn? (optional)<textarea name="changes" maxlength="1800" rows="3"></textarea></label><label>Master prompt to share (optional)<textarea name="script" maxlength="11000" rows="4"></textarea></label><p>Posts and replies are public under your GitHub account. Include other people’s words only with their permission.</p><button class="solid">Preview public post</button></form><div data-preview></div>';
    const form=root.querySelector('form'),preview=root.querySelector('[data-preview]'), fields=['kind','title','text','question','model','changes','script'];
    fields.forEach(k=>form.elements[k].value=draft[k]);
    form.oninput=()=>{fields.forEach(k=>draft[k]=form.elements[k].value);preview.replaceChildren();};
    form.elements.kind.onchange=()=>{if(sharesPrompt(form.elements.kind.value)&&!form.elements.script.value)form.elements.script.value=draft.suggested;form.oninput();};
    form.onsubmit=e=>{
      e.preventDefault();form.oninput();
      const d={...draft};
      for(const k of fields)d[k]=D.data.mask(d[k].trim());
      if(!d.title||!d.text||(sharesPrompt(d.kind)&&!d.script)){D.notify('Include a title and a contribution. Original prompts and remixes also need the full script.');return;}
      const content=format(d), title=prefix+d.title, dest=new URL(web+'/issues/new');
      if(content.length>64000){D.notify('Make the combined post shorter than 64,000 characters for GitHub.');return;}
      dest.searchParams.set('title',title);dest.searchParams.set('body',content);
      const large=dest.href.length>6500;
      preview.innerHTML='<section class="fb-panel mx-community"><h2>Public post preview</h2><h3>'+esc(title)+'</h3><pre>'+esc(content)+'</pre><p>'+ (large?'Copy the post text, then paste it into the GitHub editor.':'GitHub opens a draft containing this text. Choose Create on GitHub to publish it.')+'</p><div class="mx-actions"><button class="filter" data-copy>Copy post text</button><a class="solid" rel="noopener noreferrer" target="_blank" href="'+esc(large?web+'/issues/new?title='+encodeURIComponent(title):dest.href)+'">'+(large?'Open GitHub editor':'Review on GitHub')+'</a></div><textarea aria-label="Post text for manual copying" hidden readonly></textarea></section>';
      preview.querySelector('[data-copy]').onclick=async()=>{try{await navigator.clipboard.writeText(content);D.notify('Post text copied.');}catch{const t=preview.querySelector('textarea');t.hidden=false;t.value=content;t.focus();t.select();}};
      preview.scrollIntoView({block:'nearest'});
    };
  }
  async function read(path){
    const res=await fetch(api+path,{headers:{Accept:'application/vnd.github+json'},credentials:'omit',referrerPolicy:'no-referrer',redirect:'error',signal:AbortSignal.timeout(12000)});
    if(!res.ok)throw Error(res.status===403||res.status===429?'GitHub has temporarily limited public reads.':'GitHub could not load the requested thread.');
    return res.json();
  }
  const normalizeBody=body=>body.replace(/\r\n?/g,'\n');
  function isThread(v){return v&&v.user?.type!=='Bot'&&!v.pull_request&&v.state==='open'&&Number.isSafeInteger(v.number)&&v.number>0&&typeof v.title==='string'&&v.title.startsWith(prefix)&&typeof v.body==='string'&&normalizeBody(v.body).startsWith(marker+'\n');}
  function metadata(body){
    const header=normalizeBody(body).split('\n\n',1)[0];
    return {
      base:header.match(/^Prompt: ([a-z0-9-]+)$/m)?.[1],
      parent:header.match(/^Based on thread: #([1-9]\d{0,8})$/m)?.[1],
      kind:header.match(/^Kind: (.+)$/m)?.[1]
    };
  }
  function feed(root,prompt,builds=false){
    const filter=builds?'in:body "I built something from this"':prompt?'in:body "Prompt: '+prompt.id+'"':'in:title DeepDialogue';
    const query='is:issue is:open '+filter;
    root.innerHTML=(prompt?X.link('‹ '+prompt.title,'#exchange/'+prompt.id,'fb-back'):'')+
      X.intro('Community',prompt?'Conversations about '+prompt.title:builds?'I built something from this':'Conversation commons',prompt?'Read the conversations, remixes and questions that grew out of this prompt.':'Share the exchange that changed your mind, post a remix, or invite others to test an idea together.')+
      '<div class="mx-actions">'+X.btn(builds?'Share what you built':'Write a contribution','new')+(prompt||builds?X.link('All conversations','#community','filter'):X.link('I built something from this','#community/builds','filter'))+(prompt?X.link('Compare community responses','#community/compare-'+prompt.id,'filter'):'')+'<a class="filter" href="'+web+'/issues?q='+encodeURIComponent(query)+'" target="_blank" rel="noopener noreferrer">Open on GitHub</a></div>'+
      '<section class="fb-panel"><h2>Community threads</h2><div data-threads aria-live="polite">Reading public threads from GitHub…</div></section>';
    root.querySelector('[data-act=new]').onclick=()=>compose({prompt,kind:builds?'I built something from this':'Conversation'});
    const panel=root.querySelector('[data-threads]');
    async function load(page){
      panel.textContent='Reading public threads from GitHub…';
      try{
        const q='repo:'+repo+' '+query;
        const res=await read('/search/issues?q='+encodeURIComponent(q)+'&sort=updated&order=desc&per_page=20&page='+page);
        const rows=res.items.filter(v=>isThread(v)&&(!prompt||metadata(v.body).base===prompt.id)&&(!builds||metadata(v.body).kind==='I built something from this'));
        panel.innerHTML=rows.map(v=>{
          const info=metadata(v.body),source=D.masters.find(info.base);
          const labels=[kinds.includes(info.kind)?info.kind:'Contribution',source?.title,v.user?.login||'Contributor',Number(v.comments||0)+' replies'].filter(Boolean);
          const excerpt=normalizeBody(v.body).split('\n## Contribution\n\n')[1]?.split('\n## ')[0].trim()||'';
          const reactions=Number(v.reactions?.total_count||0);
          if(reactions)labels.push(reactions+' reactions');
          return '<a class="mx-issue" href="#community/'+v.number+'"><b>'+esc(v.title.slice(prefix.length))+'</b><p>'+esc(excerpt.slice(0,200))+(excerpt.length>200?'…':'')+'</p><small>'+esc(labels.join(' · '))+'</small></a>';
        }).join('')||'<p>No matching conversations on this page. Start one by sharing what changed your mind.</p>';
        if(page>1)panel.insertAdjacentHTML('beforeend',X.btn('Previous page','prev','filter'));
        if(page*20<Math.min(res.total_count,1000))panel.insertAdjacentHTML('beforeend',X.btn('Next page','next','filter'));
        panel.querySelector('[data-act=prev]')?.addEventListener('click',()=>load(page-1));
        panel.querySelector('[data-act=next]')?.addEventListener('click',()=>load(page+1));
      }catch(err){panel.textContent=err.message+' ';const b=document.createElement('button');b.className='filter';b.textContent='Retry';b.onclick=()=>load(page);panel.append(b);}
    }load(1);
  }
  function thread(root,id){
    root.innerHTML=X.link('‹ Conversation commons','#community','fb-back')+'<section class="fb-panel mx-community" data-thread aria-live="polite">Loading thread…</section>';
    const panel=root.querySelector('[data-thread]');
    (async()=>{
      try{
        if(!/^[1-9]\d{0,8}$/.test(id))throw Error('Unknown thread.');
        const path='/repos/'+repo+'/issues/'+id,v=await read(path);
        if(!isThread(v))throw Error('This contribution is closed or unavailable.');
        const body=normalizeBody(v.body);
        const {base,parent}=metadata(body);
        const script=body.split('\n## Master prompt\n\n').slice(1).join('\n## Master prompt\n\n').trim().slice(0,11000);
        panel.innerHTML='<h1>'+esc(v.title.slice(prefix.length))+'</h1><small>Public contribution by '+esc(v.user?.login||'Contributor')+'</small><pre>'+esc(body.slice(marker.length).trim())+'</pre><div class="mx-actions">'+
          (D.masters.find(base)?X.link('Read source prompt','#exchange/'+base,'filter'):'')+
          (parent&&parent!==id?X.link('Read parent thread #'+parent,'#community/'+parent,'filter'):'')+
          (script?X.btn('Open shared master prompt','open')+X.btn('Remix this version','fork','filter'):'')+
          '<a class="solid" rel="noopener noreferrer" target="_blank" href="'+web+'/issues/'+id+'#issuecomment-new">Reply on GitHub</a>'+X.btn('Build on this thread','build','filter')+X.btn('I built something from this','built','filter')+'</div><h2>Replies</h2><div data-replies></div>';
        const seed=()=>script?X.saveDraft(v.title.slice(prefix.length),script,D.masters.find(base)?.id,id):D.masters.find(base);
        panel.querySelector('[data-act=open]')?.addEventListener('click',()=>{location.hash='exchange/'+seed().id;});
        panel.querySelector('[data-act=fork]')?.addEventListener('click',()=>{location.hash='workshop/'+seed().id;});
        panel.querySelector('[data-act=build]').onclick=()=>compose({prompt:seed(),parent:id,kind:'Build together'});
        panel.querySelector('[data-act=built]').onclick=()=>compose({prompt:seed(),parent:id,kind:'I built something from this'});
        const replies=panel.querySelector('[data-replies]');
        if(!v.comments){replies.textContent='Be the first to reply.';return;}
        async function comments(page){
          try{
            const rows=await read(path+'/comments?per_page=20&page='+page);
            replies.querySelector('button')?.remove();
            for(const row of rows.filter(r=>r.user?.type!=='Bot')){const quote=document.createElement('blockquote');quote.textContent=(row.user?.login||'Contributor')+'\n'+String(row.body||'').slice(0,4000);quote.className="mx-break";replies.append(quote);}
            if(rows.length===20){const b=document.createElement('button');b.textContent='More replies';b.className='filter';b.onclick=()=>{b.disabled=true;comments(page+1);};replies.append(b);}
          }catch{replies.append(' Open this thread on GitHub to read the remaining replies.');}
        }comments(1);
      }catch(err){panel.textContent=err.message;}
    })();
  }
  function compare(root,prompt){
    root.innerHTML=X.link('‹ Conversations about this prompt','#community/prompt-'+prompt.id,'fb-back')+
      X.intro('Community comparison',prompt.title,'Write your own answer first, or go straight to the public responses.')+
      '<section class="fb-panel mx-room"><label>Your private first answer (optional)<textarea data-first rows="3" maxlength="48000"></textarea></label><div class="mx-actions">'+X.btn('See shared answers','reveal')+X.btn('Draft a contribution','draft','filter')+'</div></section><section class="fb-panel" data-comparison aria-live="polite"></section>';
    const panel=root.querySelector('[data-comparison]'), records=new Map();
    const reveal=root.querySelector('[data-act=reveal]');
    root.querySelector('[data-act=draft]').onclick=()=>compose({prompt,text:root.querySelector('[data-first]').value,kind:'Model comparison'});
    let page=1,left='',right='';
    function paint(more){
      const options=selected=>Array.from(records,([id,row])=>'<option value="'+id+'" '+(id===selected?'selected':'')+'>'+esc(row.user?.login||'Contributor')+' · '+esc(row.title.slice(prefix.length))+'</option>').join('');
      const column=(side,selected)=>{
        const row=records.get(selected);
        return '<section><label>Response '+side+'<select data-side="'+side+'"><option value="">Choose a response</option>'+options(selected)+'</select></label>'+
          (row?'<pre>'+esc(normalizeBody(row.body).split('\n## Master prompt\n')[0].slice(marker.length).trim())+'</pre>'+X.link('Open thread #'+row.number,'#community/'+row.number):'')+'</section>';
      };
      panel.innerHTML=(records.size?'<div class="mx-compare">'+column('A',left)+column('B',right)+'</div>':'<p>No public responses for this prompt on the pages loaded.</p>')+
        (records.size===1?'<p>One public response is available so far.</p>':'')+(more?X.btn('Load more responses','more','filter'):'');
      panel.querySelectorAll('[data-side]').forEach(s=>s.onchange=()=>{
        if(s.dataset.side==='A'){left=s.value;if(left&&left===right)right='';}
        else{right=s.value;if(right&&right===left)left='';}
        paint(more);
      });
      panel.querySelector('[data-act=more]')?.addEventListener('click',e=>{e.currentTarget.disabled=true;load();});
    }
    async function load(){
      reveal.disabled=true;
      try{
        const q='repo:'+repo+' is:issue is:open in:body "Prompt: '+prompt.id+'"';
        const res=await read('/search/issues?q='+encodeURIComponent(q)+'&sort=updated&order=desc&per_page=20&page='+page);
        for(const row of res.items)if(isThread(row)&&metadata(row.body).base===prompt.id)records.set(String(row.number),row);
        if(page===1){const ids=[...records.keys()];left=ids[0]||'';right=ids[1]||'';}
        const more=page*20<Math.min(res.total_count,1000);page++;paint(more);
      }catch(err){panel.textContent=err.message;reveal.disabled=false;reveal.textContent='Retry public responses';}
    }
    reveal.onclick=load;
  }
  function render(root,id){
    if(!id)return feed(root);
    if(id==='new')return composePage(root);
    if(id==='builds')return feed(root,null,true);
    if(id.startsWith('prompt-')||id.startsWith('compare-')){
      const comparing=id.startsWith('compare-'),prompt=D.masters.find(id.slice(comparing?8:7));
      if(prompt)return comparing?compare(root,prompt):feed(root,prompt);
      root.innerHTML=X.intro('Community','Prompt unavailable','Choose a prompt from the library to see its conversations.')+X.link('Browse prompts','#exchange');
      return;
    }
    thread(root,id);
  }
  D.community={compose,format,isThread,render};
})();
