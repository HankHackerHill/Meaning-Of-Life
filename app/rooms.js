(() => {
  'use strict';
  const D=window.DDL, X=D.exchange, esc=D.escape, endpoint='https://openrouter.ai';
  const sessions=new Map();
  let key='', authorization=null, selected='openrouter/free', authNote='';
  const encode=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
  const random=()=>encode(crypto.getRandomValues(new Uint8Array(32)));
  const isLocal=()=>location.protocol==='http:'&&['localhost','127.0.0.1'].includes(location.hostname);
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
    if(key)return '<p>An OpenRouter key is available in this tab. It clears on reload.</p>'+X.btn('Disconnect','disconnect','filter');
    if(authorization)return '<p>Open authorization in a new tab, review the key settings, then return here.</p><div class="mx-actions">'+(authorization.used?'':'<a class="solid" target="_blank" rel="noopener noreferrer" href="'+esc(authorization.url)+'">Authorize on OpenRouter</a>')+X.btn('Cancel connection','cancel','filter')+'</div>';
    return X.btn('Connect OpenRouter','connect')+(window.isSecureContext?
      '<details class="mx-key"><summary>Use an existing OpenRouter API key</summary><label>OpenRouter API key<input type="password" data-api-key autocomplete="off" spellcheck="false" maxlength="512"></label><p>The key stays in this tab and is sent only to OpenRouter when you send a message.</p>'+X.btn('Use key in this tab','use-key','filter')+'</details>':'');
  }
  function bindConnection(root){
    root.querySelector('[data-act=connect]')?.addEventListener('click',async e=>{e.currentTarget.disabled=true;try{await authorize();}catch{authNote='This browser could not start authorization.';refresh();}});
    root.querySelector('[data-act=use-key]')?.addEventListener('click',()=>{
      const field=root.querySelector('[data-api-key]'), value=field.value.trim();
      if(!window.isSecureContext||!/^sk-or-[A-Za-z0-9_-]{12,505}$/.test(value)){D.notify('Enter an OpenRouter key beginning with sk-or-.');return;}
      field.value='';stopAuthorization();key=value;authNote='Key ready. OpenRouter checks it when you send a turn.';refresh();
    });
    root.querySelector('[data-act=disconnect]')?.addEventListener('click',disconnect);
    root.querySelector('[data-act=cancel]')?.addEventListener('click',()=>{stopAuthorization();authNote='Connection canceled.';refresh();});
  }
  function connections(root){
    root.innerHTML=X.intro('Connections','Bring your AI','Connect your own model for an in-site conversation or load this collection into an MCP-compatible AI client.')+
      '<section class="fb-panel"><h2>OpenRouter API</h2><p>Authorize with your own account. Sending a turn shares the master prompt and recent chat with OpenRouter and its inference provider. The default selects a free model. A custom model can use your credits.</p>'+connectionMarkup()+'<p role="status">'+esc(authNote)+'</p><a class="text-link" target="_blank" rel="noopener noreferrer" href="https://openrouter.ai/settings/keys">Manage issued keys</a></section>'+
      '<section class="fb-panel"><h2>MCP prompt collection</h2><p>In a client that supports MCP prompts over stdio, start the included server with Node and select a prompt by name. Your client supplies the model.</p><pre class="mx-break">node /absolute/path/to/Meaning-Of-Life/mcp.cjs</pre><a class="text-link" rel="noopener noreferrer" target="_blank" href="https://github.com/hackytacky/Meaning-Of-Life#ai-connections">Client configuration</a></section>'+
      '<section class="fb-panel"><h2>Local inference</h2><p>The Python app can use an OpenAI-compatible model on your own computer. In the locally served app, open any master prompt, choose Talk here, and select Local model. Your model can also power guided journeys.</p>'+X.link('Browse master prompts','#exchange')+'</section>';
    bindConnection(root);
  }
  function room(root,id){
    if(!X.get(id)){root.innerHTML=X.intro('Conversation','Choose a master prompt','Open a prompt and choose Talk here to start.')+X.link('Browse prompts','#exchange');return;}
    if(!sessions.has(id))sessions.set(id,{promptId:id,turns:[],draft:'',error:'',controller:null,model:selected,provider:'OpenRouter'});
    const s=sessions.get(id),p=X.get(s.promptId),family=D.masters.related(p),pending=!!s.controller;
    const local=s.provider==='Local model'&&isLocal(),ready=local||Boolean(key);
    const sizeSelect=family.length>1?'<label>Prompt length in this room<select data-room-size '+(pending?'disabled':'')+'>'+family.map(item=>'<option value="'+esc(item.id)+'" '+(item.id===p.id?'selected':'')+'>'+esc(item.size)+'</option>').join('')+'</select></label><p>Changing length keeps this conversation and takes effect on your next send.</p>':'';
    root.innerHTML=X.link('‹ Back to master prompt',X.route(p),'fb-back')+X.intro('Live AI conversation',p.title,'Your chosen model writes each reply. Select individual turns to share an excerpt.')+
      '<section class="fb-panel mx-room"><h2>Connection</h2>'+
      (isLocal()?'<label>Inference provider<select data-provider '+(pending?'disabled':'')+'><option>OpenRouter</option><option '+(local?'selected':'')+'>Local model</option></select></label>':'')+
      (local?'<p>Sending uses the model configured on your computer with DDL_MODEL.</p>':connectionMarkup()+'<p role="status">'+esc(authNote)+'</p><label>OpenRouter model ID<input data-model maxlength="160" value="'+esc(s.model)+'" '+(pending?'disabled':'')+'></label><p>Send shares this prompt and up to 12 recent messages with OpenRouter and its inference provider. Custom models can cost credits.</p>')+sizeSelect+'</section>'+X.settings()+
      '<section class="fb-panel mx-room"><h2>Conversation</h2><div data-history>'+s.turns.map((t,i)=>'<blockquote><small>'+esc(t.role==='user'?'You':t.model||'AI')+'</small><pre>'+esc(t.content)+'</pre><label><span><input type="checkbox" data-select="'+i+'" '+(t.selected?'checked':'')+'> Include in excerpt</span></label></blockquote>').join('')+'</div>'+
      '<form data-message-form><label>Your message<textarea name="message" maxlength="3000" rows="3" placeholder="Give your answer, ask a question, or ask the AI to begin."></textarea></label><div class="mx-actions"><button class="solid" '+(!ready||pending?'disabled':'')+'>'+(pending?'Waiting for reply…':'Send to AI')+'</button>'+(!s.turns.length&&ready&&!pending?X.btn('Ask AI to begin','begin','filter'):'')+'</div></form><p role="status">'+esc(s.error)+'</p>'+
      (s.turns.length?X.btn('Review selected excerpt','share','filter'):'')+'</section>';
    bindConnection(root);X.bindSettings(root);
    const field=root.querySelector('textarea[name=message]'),model=root.querySelector('[data-model]');field.value=s.draft;
    field.oninput=()=>s.draft=field.value;
    if(model)model.oninput=()=>s.model=model.value.trim();
    const provider=root.querySelector('[data-provider]'),size=root.querySelector('[data-room-size]');
    if(provider)provider.onchange=()=>{s.provider=provider.value;s.error='';refresh();};
    if(size)size.onchange=()=>{if(family.some(item=>item.id===size.value)){s.promptId=size.value;refresh();}};
    root.querySelectorAll('[data-select]').forEach(b=>b.onchange=()=>s.turns[Number(b.dataset.select)].selected=b.checked);
    root.querySelector('[data-act=share]')?.addEventListener('click',()=>{
      const excerpt=s.turns.filter(t=>t.selected).map(t=>(t.role==='user'?'Participant':'AI')+': '+t.content).join('\n\n');
      if(!excerpt){D.notify('Select at least one turn to include.');return;}
      if(excerpt.length>48000){D.notify('Choose up to 48,000 characters for one public post.');return;}
      const models=[...new Set(s.turns.filter(t=>t.selected&&t.role==='assistant').map(t=>t.model))];
      D.community.compose({prompt:p,text:D.data.mask(excerpt),model:models.join(', ').slice(0,140)});
    });
    async function send(message){
      if(!ready||s.controller||!message.trim())return;
      if(!local&&!/^[a-z\d._-]+\/[a-z\d._:-]+$/i.test(s.model)){s.error='Enter a provider/model ID such as openrouter/free.';refresh();return;}
      const controller=new AbortController();s.controller=controller;s.error='';selected=s.model;
      const user={role:'user',content:D.data.mask(message.trim()).slice(0,3000)};
      const timer=setTimeout(()=>controller.abort(),55000);
      refresh();
      try{
        const recent=s.turns.concat(user).slice(-12).map(({role,content})=>({role,content}));
        const prompt=X.configured(p);
        const messages=[{role:'system',content:'Facilitate a voluntary dialogue. Mark uncertainty, invented scenarios and forecasts. Respect the participant’s choice to stop. Do not claim personal consciousness or give clinical diagnoses.'},{role:'user',content:prompt},...recent];
        const payload=local?{consent:true,prompt,turns:recent.map(t=>({...t,content:t.content.slice(0,3000)}))}:{model:s.model,messages,max_tokens:600,stream:false};
        const headers={'Content-Type':'application/json'};
        if(!local)headers.Authorization='Bearer '+key;
        const res=await fetch(local?'/api/conversation':endpoint+'/api/v1/chat/completions',{method:'POST',referrerPolicy:'no-referrer',credentials:'omit',redirect:'error',signal:controller.signal,headers,body:JSON.stringify(payload)});
        if(!res.ok)throw Error(local?'The local model could not complete this turn. Check DDL_MODEL and your model server.':res.status===429?'Provider rate limit reached. Try again later.':res.status===402?'The provider requires credit for this request.':res.status===401?'Authorization expired. Disconnect and reconnect.':'The provider could not complete this turn.');
        const data=await res.json(),answer=local?data.reply:data.choices?.[0]?.message?.content;
        if(typeof answer!=='string'||!answer.trim())throw Error('The provider returned an empty reply.');
        if(controller.signal.aborted)return;
        s.turns.push(user,{role:'assistant',content:answer.slice(0,12000),model:String(data.model||s.model).slice(0,180)});
        if(s.draft.trim()===message.trim())s.draft='';
      }catch(err){s.error=controller.signal.aborted?'Request interrupted. Your draft is available to retry.':err.message;}
      finally{clearTimeout(timer);s.controller=null;if(location.hash==='#room/'+id)refresh();}
    }
    root.querySelector('[data-message-form]').onsubmit=e=>{e.preventDefault();send(s.draft);};
    root.querySelector('[data-act=begin]')?.addEventListener('click',()=>send('Start our conversation using this prompt and my selected preferences.'));
  }
  D.rooms={room,connections,readCallback};
})();
