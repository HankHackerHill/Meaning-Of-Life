/* The vault stores one authenticated, encrypted document. Reflection data stays in
   this tab until its owner explicitly enables a vault on this browser origin. */
(function () {
  'use strict';
  const DDL = window.DDL = window.DDL || {};
  const VAULT = 'deepdialogue.vault.v1';
  const LOCK = 'deepdialogue.vault.write';
  const ITERATIONS = 600000;
  const AAD = new TextEncoder().encode('DeepDialogue Lab / vault / v1');
  const empty = () => ({ sessions: [], imports: [], research: [] });
  let stored = empty();
  let temporary = empty();
  let activeKey = null;
  let lastEnvelope = null;
  let experiment = false;
  let viewIdentity = null;
  let activeOperations = 0;
  let vaultEpoch = 0;

  const builtIns = [
    {
      id:'socrates-feasibility', title:'Socrates 2.0 and guided questioning',
      status:'Published feasibility study',url:'https://doi.org/10.2196/80461',
      note:'Held and colleagues studied a four-week Socratic dialogue tool with 61 adults. Participants described the format as usable and sometimes found the questions repetitive. The study motivates giving users control over pacing. Its design cannot establish treatment efficacy or validate this studio.'
    },
    {
      id:'reflective-journal',title:'Sharing the work of keeping a journal',
      status:'Published design evaluation',url:'https://doi.org/10.3390/sym18091409',
      note:'Rah, Jung and Lee asked four experts to evaluate a conversational journal over one week. Reviewers valued help organizing entries and identified fatigue from frequent questions. The evaluation measured expert perceptions and did not directly measure cognitive-load reduction.'
    },
    {
      id:'response-risk-signals',title:'What a flagged turn can tell us',
      status:'Research preprint',url:'https://arxiv.org/abs/2611.06806',
      note:'Akpinar and colleagues evaluated detectors for eight observable behaviors in AI replies and examined how flags cluster across conversations. Their work motivates logging specific events. A flagged reply cannot establish that a person experienced harm, and their detector results do not measure this app’s performance.'
    }
  ];
  const h = (tag, cls, value) => {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (value !== undefined) element.textContent = value;
    return element;
  };
  const node = (tag, cls, ...children) => {
    const element = h(tag, cls);
    element.append(...children);
    return element;
  };
  const button = (label, action, secondary = false) => {
    const el = h('button', secondary ? 'rec-btn secondary' : 'rec-btn', label);
    el.type = 'button';
    el.addEventListener('click', action);
    return el;
  };
  const notify = msg => DDL.notify ? DDL.notify(msg) : undefined;
  const hasCrypto = () => Boolean(window.isSecureContext && window.crypto?.subtle && navigator.locks?.request);
  const readEnvelope = () => localStorage.getItem(VAULT);
  function vaultState() {
    try {
      if (activeKey) return 'unlocked';
      if (readEnvelope()) return 'locked';
      return 'memory';
    } catch {
      return 'unavailable';
    }
  }
  function mask(input) {
    return String(input ?? '')
      .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[email]')
      .replace(/\b\d{3}[- ]\d{2}[- ]\d{4}\b/g, '[ID number]')
      .replace(/(?:\+?1[.\s-]?)?\(?\b\d{3}\)?[.\s-]?\d{3}[.\s-]?\d{4}\b/g, '[phone]');
  }
  function clean(input, limit = 4000) { return mask(input).slice(0, limit); }
  const unique = (items, id = 'id') => [...new Map(items.map(item => [item[id], item])).values()];
  const publicSources = Object.entries(DDL.casebook.references).map(([id,[title,url,status,note]]) => ({id:'case-'+id,title,url,status,note}));
  const sources = () => [...builtIns, ...publicSources, ...unique([...stored.imports, ...temporary.imports])].map(item => ({...item}));
  const sessions = () => unique([...stored.sessions, ...temporary.sessions])
    .sort((a, b) => b.date.localeCompare(a.date)).map(s => structuredClone(s));
  const randomId = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  };
  function sanitizeSession(input) {
    const date = new Date(input.date ?? Date.now());
    const short = value => clean(value, 180);
    const number = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
    return {
      id: /^[a-z0-9_-]{1,120}$/i.test(input.id || '') ? input.id : randomId(),
      title: short(input.title || 'Untitled journey'),
      date: Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString(),
      minutes: number(input.minutes), targetMinutes: number(input.targetMinutes),
      turns: (Array.isArray(input.turns) ? input.turns : []).slice(0, 500).map(t => ({
        role: short(t.role), text: clean(t.text, 12000), at: short(t.at || ''), tag: short(t.tag || ''),
        ...(t.lens ? {lens:short(t.lens)} : {}),
        sourceIds:(Array.isArray(t.sourceIds) ? t.sourceIds : t.sourceId ? [t.sourceId] : []).map(short)
      })),
      lenses: [...new Set((Array.isArray(input.lenses) ? input.lenses : []).map(short))],
      condition: ['perspective', 'baseline'].includes(input.condition) ? input.condition : 'standard',
      signals: (Array.isArray(input.signals) ? input.signals : []).slice(0, 2000).map(s => ({
        kind:short(typeof s === 'string' ? s : s?.kind ?? s?.type ?? s?.label ?? 'Safety signal'),
        at:short(s?.at ?? ''),turn:number(s?.turn)
      })),
      sourcesUsed:(Array.isArray(input.sourcesUsed) ? input.sourcesUsed : []).map(short),
      rating: input.rating ? Math.min(5, Math.round(number(input.rating))) : null,
      reflection: clean(input.reflection ?? '')
    };
  }
  function encode(bytes) {
    let raw = '';
    for (let i = 0; i < bytes.length; i += 8192) raw += String.fromCharCode(...bytes.subarray(i, i + 8192));
    return btoa(raw);
  }
  const decode = str => Uint8Array.from(atob(str), char => char.charCodeAt(0));
  async function derive(passphrase, salt) {
    const password = new TextEncoder().encode(passphrase);
    try {
      const material = await crypto.subtle.importKey('raw', password, 'PBKDF2', false, ['deriveKey']);
      return await crypto.subtle.deriveKey({name:'PBKDF2', salt, iterations:ITERATIONS, hash:'SHA-256'}, material,
        {name:'AES-GCM', length:256}, false, ['encrypt', 'decrypt']);
    } finally { password.fill(0); }
  }
  async function seal(data, key, salt) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const bytes = new TextEncoder().encode(JSON.stringify(data));
    try {
      const encrypted = await crypto.subtle.encrypt({name:'AES-GCM', iv, additionalData:AAD}, key, bytes);
      return JSON.stringify({v:1, salt, iv:encode(iv), encrypted:encode(new Uint8Array(encrypted))});
    } finally { bytes.fill(0); }
  }
  function parseEnvelope(raw) {
    const env = JSON.parse(raw);
    if (env?.v !== 1 || typeof env.salt !== 'string' || decode(env.salt).length !== 16 ||
        typeof env.iv !== 'string' || decode(env.iv).length !== 12 || typeof env.encrypted !== 'string') {
      throw new Error('Unsupported or damaged vault.');
    }
    return env;
  }
  function invalidateKey() {
    vaultEpoch++;
    activeKey = null;
    lastEnvelope = null;
    stored = empty();
  }
  function researchEvents() { return unique([...(stored.research || []), ...temporary.research]); }
  async function recordResearch(caseId, type, fields) {
    if (!DDL.casebook.cases.some(item => item.id === caseId)) throw new Error('Unknown case.');
    const event = {id: randomId(), caseId, type, at:new Date().toISOString()};
    if (type === 'watch') event.enabled = fields.enabled === true;
    else if (type === 'prior' || type === 'revision') {
      const confidence = Number(fields.confidence);
      if (!Number.isInteger(confidence) || confidence < 0 || confidence > 100 || !fields.note?.trim()) throw new Error('Enter a judgment and a probability from 0 to 100.');
      event.confidence = confidence;
      event.note = clean(fields.note.trim(), 900);
    } else throw new Error('Unknown record type.');
    temporary.research.push(event);
    const result = await persist();
    changed();
    return result;
  }
  function currentData() { return {sessions: sessions(), imports: unique([...stored.imports, ...temporary.imports]), research:researchEvents()}; }
  function clearSaved(snapshot) {
    for (const group of ['sessions', 'imports', 'research']) {
      const saved = new Set(snapshot[group].map(item => item.id));
      temporary[group] = temporary[group].filter(item => !saved.has(item.id));
    }
  }
  function changed() {
    window.dispatchEvent(new CustomEvent('ddl:data-changed'));
  }
  const transact = work => navigator.locks.request(LOCK, {mode: 'exclusive'}, work);
  function assertCurrent(expected, epoch) {
    if (epoch !== vaultEpoch || readEnvelope() !== expected) throw new Error('Vault changed in another tab. Unlock its current version.');
  }
  async function createVault(pass) {
    if (!hasCrypto()) throw new Error('Encrypted saving requires HTTPS or localhost and a browser supporting Web Locks.');
    if (pass.length < 12 || pass.length > 1024) throw new Error('Choose a passphrase between 12 and 1,024 characters.');
    const epoch = vaultEpoch;
    await transact(async () => {
      assertCurrent(null, epoch);
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const key = await derive(pass, salt);
      const snapshot = currentData();
      const raw = await seal(snapshot, key, encode(salt));
      assertCurrent(null, epoch);
      localStorage.setItem(VAULT, raw);
      lastEnvelope = raw;
      activeKey = key;
      stored = snapshot;
      clearSaved(snapshot);
    });
    changed();
  }
  async function unlockVault(pass) {
    if (!hasCrypto()) throw new Error('Use a secure browser origin with Web Crypto and Web Locks.');
    const epoch = vaultEpoch;
    await transact(async () => {
      const raw = readEnvelope();
      if (!raw) throw new Error('This browser has no saved vault.');
      const env = parseEnvelope(raw);
      const key = await derive(pass, decode(env.salt));
      let opened;
      try {
        const plain = new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM', iv:decode(env.iv), additionalData:AAD}, key, decode(env.encrypted)));
        try { opened = JSON.parse(new TextDecoder().decode(plain)); }
        finally { plain.fill(0); }
        if (!Array.isArray(opened?.sessions) || !Array.isArray(opened?.imports)) throw new Error();
      } catch { throw new Error('The passphrase did not unlock this vault, or its contents are damaged.'); }
      assertCurrent(raw, epoch);
      stored = opened; lastEnvelope = raw; activeKey = key;
    });
    changed();
  }
  async function persist() {
    if (!activeKey) return {persistent:false, reason:vaultState()};
    const epoch = vaultEpoch;
    try {
      await transact(async () => {
        if (!activeKey || epoch !== vaultEpoch) throw new Error('The vault was locked.');
        const expected = lastEnvelope;
        assertCurrent(expected, epoch);
        const snapshot = currentData();
        const env = parseEnvelope(expected);
        const raw = await seal(snapshot, activeKey, env.salt);
        assertCurrent(expected, epoch);
        localStorage.setItem(VAULT, raw);
        stored = snapshot; lastEnvelope = raw; clearSaved(snapshot);
      });
      return {persistent:true};
    } catch (err) {
      try { if (readEnvelope() !== lastEnvelope) invalidateKey(); } catch { invalidateKey(); }
      notify('Saving to the vault failed. Your new entries are still available in this tab.');
      return {persistent:false, reason:'write-failed'};
    } finally { changed(); }
  }
  async function saveSession(summary) {
    const item = sanitizeSession(summary);
    if (!sessions().some(existing => existing.id === item.id)) temporary.sessions.push(item);
    const outcome = await persist();
    changed();
    return outcome;
  }
  function experimentCondition() {
    if (!experiment) return {condition:'standard', lens:null};
    return crypto.getRandomValues(new Uint8Array(1))[0] % 2
      ? {condition:'perspective', lens:'Scientist'} : {condition:'baseline', lens:'Socratic'};
  }
  const dateLabel = s => new Date(s).toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'});
  const conditionName = v => ({baseline:'Baseline', perspective:'Perspective', standard:'Standard'})[v] || 'Standard';
  function counts(s) {
    const user = s.turns.filter(t => ['user','human'].includes(t.role.toLowerCase()));
    const flaggedTurns=[...new Set(s.signals.map(signal=>signal?.turn).filter(turn=>Number.isInteger(turn) && turn>0))].sort((a,b)=>a-b);
    let longest=0, run=0, previous=-1;
    for(const turn of flaggedTurns) {run=turn===previous+1?run+1:1; longest=Math.max(longest,run); previous=turn;}
    return {turns:user.length, questions:user.filter(t => t.text.includes('?')).length, signals:s.signals.length, lenses:s.lenses.length,longest};
  }
  function header(kicker, title, detail) {
    return node('header','rec-heading',h('p','rec-kicker',kicker),h('h1','',title),h('p','rec-intro',detail));
  }
  function box(heading, description, ...children) {
    return node('section','rec-box',h('h2','',heading),h('p','rec-copy',description),...children);
  }
  function field(caption, input) {
    return node('label','rec-field',h('span','',caption),input);
  }
  function keepView(view, root) {
    if (root.isConnected && viewIdentity?.id === view && viewIdentity.content === root) render(view, viewIdentity.root);
  }
  function stateCopy() {
    const state = vaultState();
    if (state === 'unlocked') return 'Encrypted vault unlocked';
    if (state === 'locked') return 'Encrypted vault locked · new entries stay in this tab';
    if (state === 'unavailable') return 'Storage unavailable · this tab only';
    return 'This tab only';
  }
  function journal(root) {
    root.append(header('Your notebook','Reflection journal','Revisit the questions you asked, the perspectives you tried, and the ideas you took away.'));
    const all = sessions();
    const top = node('div','rec-section-title',h('h2','', 'Completed journeys'),h('span','rec-pill',String(all.length)));
    root.append(top);
    if (!all.length) root.append(box('Your first page is open','Complete a journey to see its transcript and closing reflection here.',button('Open the studio',()=>DDL.navigate('studio'))));
    all.forEach(s => {
      const details = h('details','rec-entry');
      const summary = node('summary','',node('span','rec-stack',h('strong','',s.title),h('small','',dateLabel(s.date)+' · '+s.targetMinutes+' min journey · '+conditionName(s.condition))),h('span','rec-expand','Review'));
      const transcript = node('div','rec-detail',h('p','rec-copy',s.turns.length+' transcript turns · '+s.signals.length+' safety events'+(s.rating ? ' · Rating '+s.rating+'/5' : '')));
      const sourceNames=new Map(sources().map(source=>[source.id,source.title]));
      const chosen=new Set();
      s.turns.forEach((t,index) => {
        const item=node('article','rec-turn',h('small','', (['user','human'].includes(t.role.toLowerCase()) ? 'You' : t.role)+' · '+(t.tag || 'Dialogue')+(t.lens?' · '+t.lens:'')),h('p','',t.text));
        if(t.sourceIds?.length)item.append(h('small','','Referenced: '+t.sourceIds.map(id=>sourceNames.get(id) || 'Unavailable source').join(' · ')));
        const check=h('input');check.type='checkbox';check.addEventListener('change',()=>{if(check.checked)chosen.add(index);else chosen.delete(index);});
        item.append(node('label','rec-meta',check,h('span','',' Include in public draft')));
        transcript.append(item);
      });
      transcript.append(button('Review selected excerpt',()=>{
        const excerpt=s.turns.filter((_,i)=>chosen.has(i)).map(t=>(['user','human'].includes(t.role.toLowerCase())?'Participant':'Facilitator')+': '+t.text).join('\n\n');
        if(!excerpt || excerpt.length>3500){notify('Choose one or more turns totaling at most 3,500 characters.');return;}
        DDL.community.compose({text:mask(excerpt)});
      },true));
      if (s.reflection) transcript.append(h('h3','','Closing reflection'),h('p','rec-pre',s.reflection));
      if (s.signals.length) transcript.append(h('h3','','Safety events'),h('p','rec-pre',s.signals.map(s=>typeof s==='string'?s:s.kind+(s.turn?' (turn '+s.turn+')':'')).join(' · ')));
      details.append(summary,transcript); root.append(details);
    });
    root.append(node('aside','rec-foot',h('span','',stateCopy()),button('Privacy settings',()=>DDL.navigate('privacy'),true)));
  }
  function sourceCard(s) {
    const details = h('details','rec-entry');
    const summary = node('summary','',node('span','rec-stack',h('strong','',s.title),h('small','',s.status)),h('span','rec-expand','Read'));
    const body = node('div','rec-detail',h('p','rec-pre',s.note));
    if (s.url) {
      try {
        const url = new URL(s.url);
        if (url.protocol === 'https:') {
          const link = h('a','rec-link','Open original source ↗');
          link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
          body.append(link);
        }
      } catch { /* Imported excerpts may carry no public URL. */ }
    }
    if (s.origin) body.append(h('small','rec-meta','Imported from '+s.origin+' · '+dateLabel(s.date)));
    details.append(summary,body); return details;
  }
  function evidence(root) {
    root.append(header('Research library','Evidence shelf','Examine the source behind an idea. Imported observations stay attached to their provenance.'));
    const list = sources();
    root.append(node('div','rec-section-title',h('h2','','Sources and excerpts'),h('span','rec-pill',list.length)));
    list.forEach(s => root.append(sourceCard(s)));
    const form = h('form','rec-form');
    const origin = h('select'); ['Signal Lab','SeggySaid archive','Personal observation','Other source'].forEach(n => origin.append(h('option','',n)));
    const title = h('input'); title.required = true; title.maxLength = 120; title.placeholder = 'A short, identifiable title';
    const excerpt = h('textarea'); excerpt.required = true; excerpt.maxLength = 16000; excerpt.rows = 5; excerpt.placeholder = 'Paste a transcript excerpt or observation';
    const file = h('input'); file.type = 'file'; file.accept = '.txt,.md,text/plain,text/markdown';
    const fileMessage = h('span','rec-meta'); fileMessage.setAttribute('role','status');
    file.addEventListener('change',async () => {
      const item = file.files[0];
      if (!item) return;
      if (item.size > 64000) { file.value = ''; fileMessage.textContent = 'Choose a text file smaller than 64 KB.'; return; }
      try {
        const text = await item.text();
        if (text.length > 16000) { fileMessage.textContent='Paste an excerpt of 16,000 characters or fewer.'; return; }
        if (text.includes('\u0000')) { fileMessage.textContent='Choose a plain text or Markdown file.'; return; }
        excerpt.value = text; if (!title.value) title.value = item.name.slice(0,120);
        fileMessage.textContent='Loaded locally. Review the text before importing.';
      } catch { fileMessage.textContent='This file could not be read.'; }
    });
    const submit = h('button','rec-btn','Import excerpt'); submit.type='submit';
    form.append(node('div','rec-cols',field('Collection',origin),field('Source title',title)),field('Excerpt',excerpt),field('Or open a local text file',file),fileMessage,submit);
    form.addEventListener('submit',async e => {
      e.preventDefault();
      if (!title.value.trim() || !excerpt.value.trim()) { fileMessage.textContent='Add a title and a nonempty excerpt.'; return; }
      submit.disabled = true;
      temporary.imports.push({id:randomId(),title:clean(title.value.trim(),120),note:clean(excerpt.value.trim(),16000),url:'',status:'Unverified hypothesis',origin:origin.value,date:new Date().toISOString()});
      const outcome = await persist(); changed(); notify(outcome.persistent?'Excerpt saved in your encrypted vault.':'Excerpt added in this tab.');
      keepView('evidence',root);
    });
    root.append(box('Import source material','Excerpts are read-only after import and retain the label “Unverified hypothesis.” Review names and identifying details before saving.',form));
  }
  function metric(value, label) { return node('div','rec-stat',h('strong','',value),h('span','',label)); }
  function downloadMetrics(all) {
    const rows = [['date','condition','planned_minutes','elapsed_minutes','user_turns','question_turns','safety_events','longest_flagged_turn_run','distinct_lenses','rating']];
    all.forEach(s => {
      const c = counts(s);
      rows.push([s.date.slice(0,10),s.condition,s.targetMinutes,Math.round(s.minutes*100)/100,c.turns,c.questions,c.signals,c.longest,c.lenses,s.rating ?? '']);
    });
    const url = URL.createObjectURL(new Blob([rows.map(row => row.join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));
    const a = h('a'); a.href = url; a.download = 'deepdialogue-session-metrics.csv'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  }
  function table(headers, rows) {
    const wrap = h('div','rec-table-scroll');
    const t = h('table','rec-table');
    const thead = h('thead');
    thead.append(node('tr','',...headers.map(name => {const cell=h('th','',name); cell.scope='col'; return cell;})));
    const body = h('tbody');
    rows.forEach(row => body.append(node('tr','',...row.map(value => h('td','',value)))));
    t.append(thead,body); wrap.append(t); return wrap;
  }
  function insights(root) {
    const all=sessions(); const c=all.map(counts);
    const sum=k=>c.reduce((n,s)=>n+s[k],0);
    root.append(header('Practice log','Your insights','Follow observable patterns across completed journeys. These counts describe how you used the studio.'));
    root.append(node('div','rec-stats',metric(all.length,'Completed journeys'),metric(sum('turns'),'Your turns'),metric(sum('questions'),'Question turns'),metric(sum('signals'),'Safety events')));
    if (all.length) {
      const weeks = new Map();
      all.forEach(s=>{
        const d=new Date(s.date); d.setUTCHours(0,0,0,0); d.setUTCDate(d.getUTCDate()-((d.getUTCDay()+6)%7));
        const k=d.toISOString().slice(0,10); const w=weeks.get(k)||{total:0, questions:0, turns:0, signals:0};
        const v=counts(s); w.total++; w.questions+=v.questions; w.turns+=v.turns; w.signals+=v.signals; weeks.set(k,w);
      });
      root.append(box('Weekly activity','Weeks start Monday in UTC. Percentages use your authored turns as the denominator.',
        table(['Week of','Journeys','Question turns','Safety events'],[...weeks].sort(([a],[b])=>b.localeCompare(a)).map(([k,w])=>[k,w.total,w.questions+' / '+w.turns+(w.turns?' ('+Math.round(w.questions/w.turns*100)+'%)':''),w.signals]))));
      const types = new Map();
      for(const s of all)for(const signal of s.signals){const kind=signal.kind || 'Recorded event';types.set(kind,(types.get(kind)||0)+1);}
      if(types.size) root.append(box('Recorded interventions','The longest run of adjacent flagged turns in one journey was '+c.reduce((n,item)=>Math.max(n,item.longest),0)+'. Multiple events on the same turn count once toward a run.',table(['Event','Count'],[...types].sort((a,b)=>b[1]-a[1]))));
      root.append(box('Metrics export','The CSV contains dates, assignment, timing, numeric counts and optional ratings. Transcript text, source excerpts, journey titles and reflections are excluded.',button('Download metrics CSV',()=>downloadMetrics(all),true)));
    } else root.append(box('Begin a practice log','Weekly activity will appear after you finish a journey.',button('Open the studio',()=>DDL.navigate('studio'))));
    root.append(box('Reading the measures','A question turn is one of your messages containing a question mark. Safety events count recorded interventions or flags. Changes can reflect topic, journey length or writing style. These measures do not establish psychological traits or clinical outcomes.'));
  }
  function experiments(root) {
    root.append(header('Study bench','Perspective experiment','Explore how a change in dialogue style affects your own practice.'));
    const toggle=button(experiment?'Stop assigning conditions':'Enable random assignment',()=>{
      experiment=!experiment; keepView('experiments',root); notify(experiment?'Random assignment enabled for new journeys in this tab.':'Random assignment disabled.');
    });
    toggle.setAttribute('aria-pressed',String(experiment));
    root.append(box('One lens or several?','Opt in to a 50/50 random assignment for each new journey. Baseline keeps the Socratic lens. Perspective opens with a scientist’s lens and permits switching. This setting lasts for this tab.',node('div','rec-actions',h('span','rec-pill',experiment?'Assignment on':'Assignment off'),toggle)));
    const all=sessions();
    const rows=['baseline','perspective'].map(condition=>{
      const set=all.filter(s=>s.condition===condition);
      const rated=set.filter(s=>s.rating!==null && s.rating!==undefined);
      return [conditionName(condition),set.length,set.reduce((total,s)=>total+counts(s).questions,0),rated.length?(rated.reduce((total,s)=>total+s.rating,0)/rated.length).toFixed(1)+' / 5 ('+rated.length+' rated)':'—'];
    });
    root.append(box('Observed outcomes','Includes completed journeys assigned to this experiment. Self-selected dropout, small samples and different topics limit interpretation.',table(['Condition','Journeys','Question turns','Average rating'],rows)));
  }
  function privacy(root) {
    root.append(header('Workspace controls','Privacy & storage','Choose where this browser keeps your notebook and who can read it.'));
    const state=vaultState();
    const status=h('p','rec-status'); status.setAttribute('role','status');
    const controls=h('div','rec-form');
    const refresh=()=>keepView('privacy',root);
    function run(action, success, el) {
      return async () => {
        if (activeOperations) return;
        activeOperations++; if (el) el.disabled=true;
        try { await action(); notify(success); refresh(); }
        catch(err) { status.textContent=err?.message || 'The operation could not be completed.'; }
        finally { activeOperations--; if(el) el.disabled=false; }
      };
    }
    if (state==='unlocked') {
      const lock=button('Lock vault',()=>{
        if (activeOperations) return;
        if (DDL.dialogue?.hasActive() && !confirm('Lock this vault and discard the active, unfinished journey?')) return;
        invalidateKey(); DDL.dialogue?.reset?.(); changed(); refresh(); notify('Vault locked.');
      },true);
      controls.append(lock);
      if(temporary.sessions.length || temporary.imports.length || temporary.research.length) {
        const retry=button('Save tab entries to vault',()=>{});
        retry.addEventListener('click',run(async()=>{const r=await persist();if(!r.persistent)throw new Error('Entries remain in this tab.');},'Tab entries encrypted.',retry));
        controls.append(retry);
      }
    } else if(state==='memory' || state==='locked') {
      const creating=state==='memory';
      const form=h('form','rec-form');
      const pass=h('input'); pass.type='password'; pass.required=true; pass.maxLength=1024;
      pass.autocomplete=creating?'new-password':'current-password';
      if(creating) pass.minLength=12;
      form.append(field(creating?'Choose a passphrase (12+ characters)':'Vault passphrase',pass));
      let again;
      if(creating) { again=h('input'); again.type='password'; again.autocomplete='new-password'; again.required=true; form.append(field('Confirm passphrase',again)); }
      const pending=Boolean(temporary.sessions.length || temporary.imports.length || temporary.research.length);
      const submit=h('button','rec-btn',creating?'Create encrypted vault':pending?'Unlock and save tab entries':'Unlock vault'); submit.type='submit'; form.append(submit);
      form.addEventListener('submit', e=>{
        e.preventDefault();
        if(creating && pass.value!==again.value) { status.textContent='The passphrases differ. Enter them again.'; return; }
        const secret=pass.value; pass.value=''; if(again)again.value='';
        run(async()=>{
          if(creating) return createVault(secret);
          await unlockVault(secret);
          if(pending) {
            const result=await persist();
            if(!result.persistent) throw new Error('Vault unlocked. Tab entries could not be encrypted and remain in memory.');
          }
        },creating?'Vault created and tab entries encrypted.':'Vault unlocked.',submit)();
      });
      controls.append(form);
      if(creating) controls.prepend(h('p','rec-copy','Creating a vault includes the entries currently in this tab. The passphrase cannot be recovered.'));
      if(!hasCrypto()) {submit.disabled=true;status.textContent='Encrypted storage requires HTTPS or localhost in a browser supporting Web Crypto and Web Locks.';}
    }
    controls.append(status);
    const copy={memory:'Closing or reloading this tab clears your journal, casebook notes, watchlist and source imports.',unavailable:'Browser storage is unavailable. Entries remain in memory until the tab is reloaded or closed.',locked:'Enter your passphrase to recover saved entries. Entries created while locked stay in this tab until you choose to save them.',unlocked:'Journal entries, casebook notes, watchlist and source imports are encrypted with AES-256-GCM before saving on this browser origin. The passphrase derives a key with 600,000 PBKDF2-SHA-256 iterations.'};
    root.append(box(stateCopy(),copy[state],controls));
    root.append(box('How dialogue is handled','Guided mode generates prompts on your device. Model mode requires a configured local server and per-journey consent. Common email addresses, US phone numbers and formatted US Social Security numbers are masked. Names and other identifying details may remain. An unlocked browser, extensions, or device access can expose visible entries.'));
    const erase=button('Erase notebook data',()=>{
      if(activeOperations || !confirm('Permanently erase this browser’s saved vault, entries in this tab, and any unfinished journey? This cannot be undone.')) return;
      let expected,storageAccessible=true;
      try { expected=readEnvelope(); } catch { storageAccessible=false; }
      run(async()=>{
        if(storageAccessible && hasCrypto()) {
          await transact(()=>{
            if(readEnvelope()!==expected) throw new Error('The vault changed. Review its current state before erasing.');
            if(expected) localStorage.removeItem(VAULT);
          });
        } else if(expected) {
          throw new Error('Open the vault in a secure context with Web Locks to erase it safely.');
        }
        invalidateKey(); temporary=empty(); experiment=false; DDL.dialogue?.reset?.(); changed();
      },storageAccessible?'Notebook data erased from this browser.':'Tab data cleared. Browser storage could not be accessed.',erase)();
    },true);
    root.append(box('Erase this notebook','Deletes the saved vault on this browser origin, clears the current tab and closes its active journey. Previously exported files and data in other tabs’ memory are outside this action.',erase));
  }
  const views={journal,evidence,insights,experiments,privacy};
  function render(view,root) {
    viewIdentity={id:view,root};
    const content=h('div','records-view');
    root.replaceChildren(content);
    (views[view] || journal)(content);
    // Private renderers refresh the current inner container by looking up its host.
    viewIdentity.content=content;
  }
  window.addEventListener('storage',e=>{
    if(e.storageArea!==localStorage || (e.key!==VAULT && e.key!==null))return;
    invalidateKey(); changed();
    if(viewIdentity?.content.isConnected) render(viewIdentity.id,viewIdentity.root);
  });
  DDL.data={researchEvents,recordResearch,saveSession,sessions,mask,sources,render,experimentCondition,vaultState,isUnlocked:()=>Boolean(activeKey)};
})();
