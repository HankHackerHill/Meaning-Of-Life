(() => {
  'use strict';
  const D=window.DDL, X=D.exchange, esc=D.escape;
  const repo='hackytacky/Meaning-Of-Life', web='https://github.com/'+repo, api='https://api.github.com';
  const kinds=['Conversation','Prompt remix','Discovery question','Build together'];
  const prefix='[DeepDialogue] ', marker='DeepDialogue community · v1';
  let draft=null;
  function format(d){
    const parts=[marker,'Kind: '+d.kind];
    if(d.base)parts.push('Prompt: '+d.base);
    if(d.parent)parts.push('Based on thread: #'+d.parent);
    parts.push('','## Contribution','',d.text,'','## Question for others','',d.question);
    if(d.script)parts.push('','## Master prompt','',d.script);
    return parts.join('\n');
  }
  function compose({prompt,parent,text='',kind='Conversation'}={}){
    const base=prompt?.base||(D.masters.find(prompt?.id)?prompt.id:'');
    draft={kind,base,parent:parent||prompt?.parent||'',title:'',text,question:'',script:kind==='Prompt remix'&&prompt?X.body(prompt):'',suggested:prompt?X.body(prompt):''};
    location.hash='community/new';
  }
  function composePage(root){
    if(!draft)draft={kind:'Conversation',base:'',parent:'',title:'',text:'',question:'',script:'',suggested:''};
    root.innerHTML=X.intro('Community','Share a contribution','Choose the excerpt or idea you want other people to read. The next step previews your exact public draft.')+
      '<form class="fb-panel mx-form"><label>Contribution type<select name="kind">'+kinds.map(k=>'<option>'+k+'</option>').join('')+'</select></label><label>Title<input name="title" required maxlength="100"></label><label>Conversation excerpt, observation or idea<textarea name="text" required maxlength="3500" rows="6"></textarea></label><label>What would you like others to challenge or build?<textarea name="question" required maxlength="450" rows="2"></textarea></label><label>Master prompt to share (optional)<textarea name="script" maxlength="11000" rows="4"></textarea></label><p>Posts and replies are public under your GitHub account. Include other people’s words only with their permission.</p><button class="solid">Preview public post</button></form><div data-preview></div>';
    const form=root.querySelector('form'),preview=root.querySelector('[data-preview]'), fields=['kind','title','text','question','script'];
    fields.forEach(k=>form.elements[k].value=draft[k]);
    form.oninput=()=>{fields.forEach(k=>draft[k]=form.elements[k].value);preview.replaceChildren();};
    form.elements.kind.onchange=()=>{if(form.elements.kind.value==='Prompt remix'&&!form.elements.script.value)form.elements.script.value=draft.suggested;form.oninput();};
    form.onsubmit=e=>{
      e.preventDefault();form.oninput();
      const d={...draft};
      for(const k of fields)d[k]=D.data.mask(d[k].trim());
      if(!d.title||!d.text||!d.question||(d.kind==='Prompt remix'&&!d.script)){D.notify('Include a title, contribution, question and, for a remix, the prompt.');return;}
      const content=format(d), title=prefix+d.title, dest=new URL(web+'/issues/new');
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
  function isThread(v){return v&&!v.pull_request&&v.state==='open'&&Number.isSafeInteger(v.number)&&v.number>0&&typeof v.title==='string'&&v.title.startsWith(prefix)&&typeof v.body==='string'&&normalizeBody(v.body).startsWith(marker+'\n');}
  function feed(root){
    root.innerHTML=X.intro('Community','Conversation commons','Share the exchange that changed your mind, post a remix, or invite others to test an idea together.')+
      '<div class="mx-actions">'+X.btn('Write a contribution','new')+'<a class="filter" href="'+web+'/issues?q=is%3Aissue+is%3Aopen+DeepDialogue+in%3Atitle" target="_blank" rel="noopener noreferrer">Open on GitHub</a></div>'+
      '<section class="fb-panel"><h2>Community threads</h2><div data-threads aria-live="polite">Reading public threads from GitHub…</div></section>';
    root.querySelector('[data-act=new]').onclick=()=>compose();
    const panel=root.querySelector('[data-threads]');
    async function load(page){
      panel.textContent='Reading public threads from GitHub…';
      try{
        const q='repo:'+repo+' is:issue is:open in:title DeepDialogue';
        const res=await read('/search/issues?q='+encodeURIComponent(q)+'&sort=updated&order=desc&per_page=20&page='+page);
        const rows=res.items.filter(isThread);
        panel.innerHTML=rows.map(v=>'<a class="mx-issue" href="#community/'+v.number+'"><b>'+esc(v.title.slice(prefix.length))+'</b><small>'+esc(v.user?.login||'Contributor')+' · '+Number(v.comments||0)+' replies</small></a>').join('')||'<p>No community contributions on this page. Start a thread with a question someone can build on.</p>';
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
        const first=body.split('\n\n')[0],base=first.match(/^Prompt: ([a-z0-9-]+)$/m)?.[1];
        const script=body.split('\n## Master prompt\n\n').slice(1).join('\n## Master prompt\n\n').trim().slice(0,11000);
        panel.innerHTML='<h1>'+esc(v.title.slice(prefix.length))+'</h1><small>Public contribution by '+esc(v.user?.login||'Contributor')+'</small><pre>'+esc(body.slice(marker.length).trim())+'</pre><div class="mx-actions">'+
          (D.masters.find(base)?X.link('Read source prompt','#exchange/'+base,'filter'):'')+(script?X.btn('Remix this version','fork','filter'):'')+
          '<a class="solid" rel="noopener noreferrer" target="_blank" href="'+web+'/issues/'+id+'#issuecomment-new">Reply on GitHub</a>'+X.btn('Build on this thread','build','filter')+'</div><h2>Replies</h2><div data-replies></div>';
        const seed=()=>script?X.saveDraft(v.title.slice(prefix.length),script,base,id):D.masters.find(base);
        panel.querySelector('[data-act=fork]')?.addEventListener('click',()=>{location.hash='workshop/'+seed().id;});
        panel.querySelector('[data-act=build]').onclick=()=>compose({prompt:seed(),parent:id,kind:'Build together'});
        const replies=panel.querySelector('[data-replies]');
        if(!v.comments){replies.textContent='Be the first to reply.';return;}
        async function comments(page){
          try{
            const rows=await read(path+'/comments?per_page=20&page='+page);
            replies.querySelector('button')?.remove();
            for(const row of rows){const quote=document.createElement('blockquote');quote.textContent=(row.user?.login||'Contributor')+'\n'+String(row.body||'').slice(0,4000);quote.className="mx-break";replies.append(quote);}
            if(rows.length===20){const b=document.createElement('button');b.textContent='More replies';b.className='filter';b.onclick=()=>{b.disabled=true;comments(page+1);};replies.append(b);}
          }catch{replies.append(' Open this thread on GitHub to read the remaining replies.');}
        }comments(1);
      }catch(err){panel.textContent=err.message;}
    })();
  }
  D.community={compose,format,isThread,render(root,id){if(id==='new')composePage(root);else if(id)thread(root,id);else feed(root);}};
})();
