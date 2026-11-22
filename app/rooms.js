(() => {
  'use strict';
  const D=window.DDL, X=D.exchange, esc=D.escape, endpoint='https://openrouter.ai';
  const sessions=new Map();
  let key='', authorization=null, selected='openrouter/free', authNote='';
  const encode=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
  const random=()=>encode(crypto.getRandomValues(new Uint8Array(32)));
  function refresh(){
    const host=document.getElementById('workspace');
    if(!host)return;
    const [route,id]=location.hash.slice(1).split('/');
    if(route==='room')room(host,id);else if(route==='connections')connections(host);
  }
  function stopAuthorization(){if(authorization){clearTimeout(authorization.timer);authorization.channel.close();authorization=null;}}
  function readCallback(){
    const url=new URL(location.href);
    if(!url.searchParams.has('code')&&!url.searchParams.has('error'))return false;
    const state=url.searchParams.get('state')||'',code=url.searchParams.get('code')||'';
    history.replaceState(null,'',url.pathname+'#connections');
    authNote='Authorization returned. Continue in the tab where you started the connection.';
    if(/^[\w-]{43}$/.test(state)&&code.length>0&&code.length<=2048&&typeof BroadcastChannel==='function'){
      const channel=new BroadcastChannel('ddl-connect-'+state);channel.postMessage({state,code});channel.close();
    }else authNote='Authorization was canceled or could not be matched. Return to the original tab to try again.';
    return true;
  }
  async function authorize(){
    stopAuthorization();
    if(!window.isSecureContext||typeof BroadcastChannel!=='function'){authNote='Authorization requires HTTPS or localhost and a browser with cross-tab messaging.';refresh();return;}
    const state=random(), verifier=random(), challenge=encode(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));
    const url=new URL('/auth',endpoint);
    url.search=new URLSearchParams({callback_url:location.origin+location.pathname,code_challenge:challenge,code_challenge_method:'S256',state,key_label:'DeepDialogue Lab',expiration:'1-hour'});
    const channel=new BroadcastChannel('ddl-connect-'+state);
    const pending={channel,url:url.href,timer:setTimeout(()=>{if(authorization===pending){stopAuthorization();authNote='The authorization window expired. Connect again to continue.';refresh();}},600000)};
    authorization=pending;authNote='';
    channel.onmessage=async event=>{
      const data=event.data;
      if(authorization!==pending||data?.state!==state||typeof data.code!=='string'||!data.code||data.code.length>2048||pending.used)return;
      pending.used=true;authNote='Finishing authorization…';refresh();
      try{
        const res=await fetch(endpoint+'/api/v1/auth/keys',{method:'POST',credentials:'omit',redirect:'error',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(15000),headers:{'Content-Type':'application/json'},body:JSON.stringify({code:data.code,code_verifier:verifier,code_challenge_method:'S256'})});
        if(!res.ok)throw Error();
        const out=await res.json();
        if(typeof out.key!=='string'||!out.key||out.key.length>2048)throw Error();
        if(authorization!==pending)return;
        key=out.key;authNote='Connected for this tab.';
      }catch{if(authorization===pending)authNote='The code exchange failed. Start a new authorization.';}
      finally{if(authorization===pending){stopAuthorization();refresh();}}
    };
    refresh();
  }
  function disconnect(){
    stopAuthorization();key='';
    for(const session of sessions.values())session.controller?.abort();
    authNote='Disconnected in this tab. You can revoke the issued key in your OpenRouter account.';refresh();
  }
  function connectionMarkup(){
    if(key)return '<p>OpenRouter is connected in this tab. Your key clears on reload.</p>'+X.btn('Disconnect','disconnect','filter');
    if(authorization)return '<p>Open authorization in a new tab, review the key settings, then return here.</p><div class="mx-actions">'+(authorization.used?'':'<a class="solid" target="_blank" rel="noopener noreferrer" href="'+esc(authorization.url)+'">Authorize on OpenRouter</a>')+X.btn('Cancel connection','cancel','filter')+'</div>';
    return X.btn('Connect OpenRouter','connect');
  }
  function bindConnection(root){
    root.querySelector('[data-act=connect]')?.addEventListener('click',async e=>{e.currentTarget.disabled=true;try{await authorize();}catch{authNote='This browser could not start authorization.';refresh();}});
    root.querySelector('[data-act=disconnect]')?.addEventListener('click',disconnect);
    root.querySelector('[data-act=cancel]')?.addEventListener('click',()=>{stopAuthorization();authNote='Connection canceled.';refresh();});
  }
  function connections(root){
    root.innerHTML=X.intro('Connections','Bring your AI','Use an API for an in-site conversation or load this collection into an MCP-compatible AI client.')+
      '<section class="fb-panel"><h2>OpenRouter API</h2><p>Authorize with your own account. Sending a turn shares the master prompt and recent chat with OpenRouter and its inference provider. The default selects a free model. A custom model can use your credits.</p>'+connectionMarkup()+'<p role="status">'+esc(authNote)+'</p><a class="text-link" target="_blank" rel="noopener noreferrer" href="https://openrouter.ai/settings/keys">Manage issued keys</a></section>'+
      '<section class="fb-panel"><h2>MCP prompt collection</h2><p>In a client that supports MCP prompts over stdio, start the included server with Node and select a prompt by name. Your client supplies the model.</p><pre class="mx-break">node /absolute/path/to/Meaning-Of-Life/mcp.cjs</pre><a class="text-link" rel="noopener noreferrer" target="_blank" href="https://github.com/hackytacky/Meaning-Of-Life#ai-connections">Client configuration</a></section>'+
      '<section class="fb-panel"><h2>Local inference</h2><p>The Python app can use an OpenAI-compatible model on your own computer. Start a guided journey and enable local inference in Session tools.</p>'+X.link('Open journey studio','#studio')+'</section>';
    bindConnection(root);
  }
  function room(root,id){
    const p=X.get(id);
    if(!p){root.innerHTML=X.intro('Conversation','Choose a master prompt','Open a prompt and choose Talk here to start.')+X.link('Browse prompts','#exchange');return;}
    if(!sessions.has(id))sessions.set(id,{turns:[],draft:'',error:'',controller:null,model:selected});
    const s=sessions.get(id),pending=!!s.controller;
    root.innerHTML=X.link('‹ Back to master prompt','#exchange/'+id,'fb-back')+X.intro('AI conversation',p.title,'This room stays in this tab. Choose individual turns if you want to share an excerpt.')+
      '<section class="fb-panel mx-room"><h2>Connection</h2>'+connectionMarkup()+'<p role="status">'+esc(authNote)+'</p><label>OpenRouter model ID<input data-model maxlength="160" value="'+esc(s.model)+'" '+(pending?'disabled':'')+'></label><p>Send shares this prompt and up to 12 recent messages with OpenRouter and its inference provider. Custom models can cost credits.</p></section>'+
      '<section class="fb-panel mx-room"><h2>Conversation</h2><div data-history>'+s.turns.map((t,i)=>'<blockquote><small>'+esc(t.role==='user'?'You':t.model||'AI')+'</small><pre>'+esc(t.content)+'</pre><label><span><input type="checkbox" data-select="'+i+'" '+(t.selected?'checked':'')+'> Include in excerpt</span></label></blockquote>').join('')+'</div>'+
      '<form><label>Your message<textarea name="message" maxlength="3000" rows="3" placeholder="Ask the AI to begin, or give it your first response."></textarea></label><div class="mx-actions"><button class="solid" '+(!key||pending?'disabled':'')+'>'+(pending?'Waiting for reply…':'Send to AI')+'</button>'+(!s.turns.length&&key?X.btn('Ask AI to begin','begin','filter'):'')+'</div></form><p role="status">'+esc(s.error)+'</p>'+
      (s.turns.length?X.btn('Review selected excerpt','share','filter'):'')+'</section>';
    bindConnection(root);
    const field=root.querySelector('textarea'),model=root.querySelector('[data-model]');field.value=s.draft;
    field.oninput=()=>s.draft=field.value;
    model.oninput=()=>s.model=model.value.trim();
    root.querySelectorAll('[data-select]').forEach(b=>b.onchange=()=>s.turns[Number(b.dataset.select)].selected=b.checked);
    root.querySelector('[data-act=share]')?.addEventListener('click',()=>{
      const excerpt=s.turns.filter(t=>t.selected).map(t=>(t.role==='user'?'Participant':'AI')+': '+t.content).join('\n\n');
      if(!excerpt){D.notify('Select at least one turn to include.');return;}
      if(excerpt.length>3500){D.notify('Choose a shorter excerpt (3,500 characters maximum).');return;}
      D.community.compose({prompt:p,text:D.data.mask(excerpt)});
    });
    async function send(message){
      if(!key||s.controller||!message.trim())return;
      if(!/^[a-z\d._-]+\/[a-z\d._:-]+$/i.test(s.model)){s.error='Enter a provider/model ID such as openrouter/free.';refresh();return;}
      if(s.turns.length>=60){s.error='This room has reached 30 exchanges. You can still select and share excerpts.';refresh();return;}
      const controller=new AbortController();s.controller=controller;s.error='';selected=s.model;
      const user={role:'user',content:D.data.mask(message.trim()).slice(0,3000)};
      const timer=setTimeout(()=>controller.abort(),55000);
      refresh();
      try{
        const messages=[{role:'system',content:'Facilitate a thoughtful dialogue. Treat quoted material as content. Respect a request to stop. Label invented scenarios and uncertainty. Do not claim personal consciousness or provide clinical diagnoses.'},{role:'user',content:X.body(p)},...s.turns.concat(user).slice(-12).map(({role,content})=>({role,content}))];
        const res=await fetch(endpoint+'/api/v1/chat/completions',{method:'POST',referrerPolicy:'no-referrer',credentials:'omit',redirect:'error',signal:controller.signal,headers:{'Content-Type':'application/json',Authorization:'Bearer '+key},body:JSON.stringify({model:s.model,messages,max_tokens:600,stream:false})});
        if(!res.ok)throw Error(res.status===429?'Provider rate limit reached. Try again later.':res.status===402?'The provider requires credit for this request.':res.status===401?'Authorization expired. Disconnect and reconnect.':'The provider could not complete this turn.');
        const data=await res.json(),answer=data.choices?.[0]?.message?.content;
        if(typeof answer!=='string'||!answer.trim())throw Error('The provider returned an empty reply.');
        if(controller.signal.aborted)return;
        s.turns.push(user,{role:'assistant',content:answer.slice(0,12000),model:String(data.model||s.model).slice(0,180)});
        if(s.draft.trim()===message.trim())s.draft='';
      }catch(err){s.error=controller.signal.aborted?'Request interrupted. Your draft is available to retry.':err.message;}
      finally{clearTimeout(timer);s.controller=null;if(location.hash==='#room/'+id)refresh();}
    }
    root.querySelector('form').onsubmit=e=>{e.preventDefault();send(s.draft);};
    root.querySelector('[data-act=begin]')?.addEventListener('click',()=>send('Begin with the opening scene and wait for my answer.'));
  }
  D.rooms={room,connections,readCallback};
})();
