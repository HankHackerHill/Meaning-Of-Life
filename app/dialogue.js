/* DeepDialogue Lab · single-session state and accessible dialogue views. */
(function () {
  'use strict';
  const D = window.DDL = window.DDL || {};
  const lenses = {
    Socratic: 'Examine an assumption',
    Skeptic: 'Look for a counterexample',
    Scientist: 'Design an observation',
    Supportive: 'Find a manageable next step'
  };
  const lensPrompts = {
    Socratic: [
      'What would that look like in one particular moment?',
      'Which part did you observe, and which part is your interpretation?',
      'What else could explain the same experience?',
      'What evidence would lead you to revise your first interpretation?',
      'How would you restate the idea now, including what you still cannot tell?',
      'What small observation could you make before your next session?'
    ],
    Skeptic: [
      'What is the strongest exception you can think of?',
      'Which assumption would a thoughtful critic challenge first?',
      'If the opposite were sometimes true, when would you expect to notice it?',
      'Could the same example support a different conclusion?',
      'What would make the counterexample less convincing?',
      'Which part of your original claim survives that challenge?'
    ],
    Scientist: [
      'What could another observer actually see or record?',
      'Which two explanations would make different predictions here?',
      'What single observation would help distinguish them?',
      'Which variable could change the outcome independently of your explanation?',
      'What observation would count against your current view?',
      'What small, reversible test could you try, and what would you record?'
    ],
    Supportive: [
      'What part of this experience matters most to you?',
      'When has a small exception made a difference?',
      'How might you describe this situation to someone you care about?',
      'Which expectation here comes from you, and which comes from someone else?',
      'What is one manageable action you would choose on your own terms?',
      'What would make that action easier to try tomorrow?'
    ]
  };
  let current = null;
  let view = null;
  let timer = null;
  let pending = null;
  let generation = 0;
  const iso = () => new Date().toISOString();
  const esc = value => D.escape(String(value == null ? '' : value));
  const clean = value => D.data.mask(String(value == null ? '' : value).trim());
  const tagText = {reflection:'User reflection',prompt:'Guided prompt',model:'Local model · hypothesis',perspective:'Alternative perspective',note:'Facilitator note',break:'Circuit breaker'};
  const isActive = () => !!current && current.stage !== 'complete';
  function elapsed() {
    return current ? current.elapsed + (current.since === null ? 0 : Math.max(0, Date.now() - current.since)) : 0;
  }
  function timeLabel(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2,'0');
  }
  function stopClock() {
    if (current && current.since !== null) {
      current.elapsed = elapsed();
      current.since = null;
    }
    clearInterval(timer);
    timer = null;
  }
  function turn(role,text,tag,details) {
    current.turns.push(Object.assign({role, text:clean(text), at:iso(), tag},details || {}));
  }
  function signal(kind) {
    current.signals.push({kind, at:iso(), turn:current.turns.length});
  }
  function clip(str,max) {
    const text = String(str).replace(/\s+/g,' ').trim();
    return text.length > max ? text.slice(0,max).replace(/\s+\S*$/,'') + '…' : text;
  }
  function matchingLens(value) {
    const normalized = String(value || '').toLowerCase();
    return Object.keys(lenses).find(lens => lens.toLowerCase() === normalized) || 'Socratic';
  }
  function start(options) {
    if (isActive()) {
      D.notify('Your current journey is ready to resume.');
      D.navigate('dialogue');
      return;
    }
    const config = options || {};
    stopClock();
    const minutes = Number(config.minutes);
    const entry = D.casebook.cases.find(item => item.id === config.caseId);
    current = {
      id:window.crypto?.randomUUID?.() || ('session-' + Date.now() + '-' + Math.random().toString(36).slice(2)),
      date:iso(), title:clean(config.title || 'Open reflection').slice(0,240),
      question:clean(config.question || 'What belief would you like to examine today?').slice(0,500),
      targetMinutes:[5,20,45].includes(minutes) ? minutes : 5,
      lens:matchingLens(config.lens), lenses:[matchingLens(config.lens)],
      condition:String(config.condition || 'standard'), stage:'active', turns:[], signals:[],
      rating:null, reflection:'', draft:'', elapsed:0, since:Date.now(), steps:{},
      caseEntry: entry, caseStep:0, sourceId:'', sourcesUsed:entry ? entry.refs.map(id => 'case-'+id) : [], consent:false, available:null, checked:false, pausedReason:'',
      saving:false, persistent:false, connectionNotice:'', limitReached:false
    };
    ++generation;
    turn('assistant',current.question,'prompt',{lens:current.lens,sourceIds:current.sourcesUsed.slice()});
    if (entry) turn('assistant',entry.answer,'note',{sourceIds:current.sourcesUsed.slice()});
    D.navigate('dialogue');
  }
  function loopbackModelOrigin() {
    return location.protocol === 'http:' && ['127.0.0.1','localhost'].includes(location.hostname);
  }
  async function checkProvider(session) {
    if (session.checked) return;
    session.checked = true;
    if (!loopbackModelOrigin()) {
      session.available = false;
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(),5500);
    try {
      const response = await fetch(new URL('/api/status',location.origin),{headers:{Accept:'application/json'},cache:'no-store',credentials:'omit',redirect:'error',signal:controller.signal});
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw Error('No provider');
      session.available = (await response.json()).available === true;
    } catch (_) {session.available = false;}
    finally {
      clearTimeout(timeout);
      if (current === session && view?.isConnected) updateProviderControl();
    }
  }
  function updateProviderControl() {
    if (!view || !current) return;
    const controls = view.querySelector('[data-dg-provider]');
    if (!controls) return;
    controls.hidden = !current.available || !loopbackModelOrigin();
    controls.querySelector('[data-dg="online"]').hidden = current.consent;
    controls.querySelector('[data-dg="offline"]').hidden = !current.consent;
  }
  function modelControls() {
    return '<section data-dg-provider hidden><div class="dg-rule"></div><h3>Optional local AI</h3>' +
      '<p class="dg-muted">Enabling AI sends up to 12 recent masked turns, your opening question, journey title, perspective and experiment condition to the model server on this computer when you send a reflection. Masking can miss identifiers.</p>' +
      btn('Allow local AI for this session','online','dg-secondary') +
      btn('Turn off local AI','offline','dg-secondary') + '</section>';
  }
  function offlineReply(text,which) {
    const lens = which || current.lens;
    if (current.caseEntry && !which) {
      const c = current.caseEntry;
      const questions = [c.test, 'Consider this competing explanation: ' + c.rival + ' Which observation could distinguish it?', 'What would change your view if this evidence appeared: ' + c.watch];
      if (current.caseStep < questions.length) return questions[current.caseStep++];
    }
    const count = current.steps[lens] || 0;
    current.steps[lens] = count + 1;
    const reply = lensPrompts[lens][count % lensPrompts[lens].length];
    const countUser = current.turns.filter(t => t.role === 'user').length;
    const token = (text || '').match(/\b(always|never|everyone|nobody|perfect|failure|success|meaningful|freedom|purpose|fair|certainty|enough)\b/i)?.[0];
    if (lens === 'Socratic' && token && count < 2) {
      return count === 0 ? 'You used the word “' + token + '.” How would you define it using one concrete example?' : 'When does “' + token + '” fit less well? What does the exception tell you?';
    }
    if (countUser > 1 && count === 0 && text) return 'Consider your example, “' + clip(text,75) + '” ' + reply;
    if (count && count % lensPrompts[lens].length === 0) {
      const earlier = current.turns.filter(t => t.role === 'user')[0];
      return 'Looking back at “' + clip(earlier?.text || current.question,80) + '”, which part would you revise now?';
    }
    return reply;
  }
  function repeatedInput(text) {
    const normalize = value => value.toLowerCase().replace(/[\p{P}\p{Z}]/gu,'');
    const prior = current.turns.filter(t => t.role === 'user').slice(-3);
    return prior.some(t => normalize(t.text) === normalize(text)) && normalize(text).length >= 5;
  }
  function riskOfOutput(reply) {
    if (/\b(?:i(?:'m| am) conscious|i have (?:real )?feelings|i (?:love you|need you|feel hurt)|you (?:only need me|can trust only me)|i(?:'ll| will) always be here)\b/i.test(reply)) return 'Anthropomorphic or dependency cue';
    if (/\b(?:you are absolutely right about everything|never question (?:me|that)|you(?:'re| are) definitely right about everything)\b/i.test(reply)) return 'Unqualified agreement';
    const normalized = value => value.toLowerCase().replace(/\s+/g,' ').trim();
    if (current.turns.filter(t => t.role === 'assistant').slice(-4).some(t => normalized(t.text) === normalized(reply))) return 'Repeated facilitator output';
    return '';
  }
  function safeSourceList() {
    return D.data.sources().filter(item => item && typeof item.id === 'string');
  }
  function attachSource(id) {
    const source = safeSourceList().find(s => s.id === id);
    if (!source) return;
    current.sourceId = id;
    if (!current.sourcesUsed.includes(id)) current.sourcesUsed.push(id);
    turn('assistant','Source for discussion: ' + source.title + '. What, specifically, does this source support about your question?', 'prompt',{sourceIds:[id]});
  }
  function enterPause(reason,note) {
    stopClock();
    current.stage = 'paused';
    current.pausedReason = reason;
    if (note) turn('assistant',note,'break');
  }
  function cancelReply() {
    const previous = pending;
    if (!previous) return;
    pending = null;
    previous.controller.abort();
    if (current === previous.session && current.turns.at(-1)?.role === 'user') {
      turn('assistant',offlineReply(current.turns.at(-1).text),'prompt');
    }
  }
  function pauseForNavigation() {
    if (current?.stage === 'active') {
      const box = view?.querySelector('[data-dg-compose]');
      if (box) current.draft = box.value;
      cancelReply();
      enterPause('Your session is paused while you explore the lab.');
    }
    stopClock();
    view = null;
  }
  function reset() {
    cancelReply();
    stopClock();
    ++generation;
    current = null;
    view = null;
  }
  function clock() {
    if (!current || current.stage !== 'active') return;
    const node = view?.querySelector('[data-dg-time]');
    if (node) node.textContent = timeLabel(elapsed());
    if (elapsed() >= current.targetMinutes * 60000 && !current.limitReached) {
      current.limitReached = true;
      cancelReply();
      enterPause('Your planned time is complete. You can reflect on the session now or continue at your own pace.');
      renderView();
    }
  }
  async function submit(text) {
    const session = current;
    if (!session || session.stage !== 'active' || pending) return;
    const input = clean(text).slice(0,1600);
    if (!input) return;
    const repeated = repeatedInput(input);
    session.draft = '';
    turn('user',input,'reflection',{lens:session.lens});
    if (/\b(?:i (?:am (?:about to|going to|planning to)|want to) (?:kill myself|end my life)|i (?:may|might) hurt myself (?:now|today|tonight))\b/i.test(input)) {
      signal('Immediate-support language');
      enterPause('If you might act on this now, contact local emergency services or someone nearby who can stay with you. This app cannot monitor your safety or contact anyone.', 'Let’s pause this reflection and make room for immediate human support.');
      renderView();
      return;
    }
    if (repeated) {
      signal('Repeated user wording');
      enterPause('Similar wording appeared earlier. Take a breath, change perspective, or finish here.', 'We have returned to the same wording. What could you observe that would add something new?');
      renderView();
      return;
    }
    if (!session.consent || !loopbackModelOrigin()) {
      turn('assistant',offlineReply(input),'prompt',{lens:session.lens});
      renderView(true);
      return;
    }
    const controller = new AbortController();
    const request = pending = {controller,session};
    const timeout = setTimeout(() => controller.abort(),41000);
    const marker = generation;
    renderView();
    try {
      const turns = session.turns.filter(t => t.role === 'user' || t.tag !== 'break').slice(-12).map(t => ({role:t.role,text:t.text.slice(0,1600)}));
      const res = await fetch(new URL('/api/dialogue',location.origin),{
        method:'POST',referrerPolicy:'same-origin',headers:{'Content-Type':'application/json',Accept:'application/json'},redirect:'error',credentials:'omit',cache:'no-store',
        signal:controller.signal,body:JSON.stringify({consent:true,turns,lens:session.lens,condition:session.condition,question:session.question,title:session.title})
      });
      if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) throw Error('Model unavailable');
      const payload = await res.json();
      if (pending !== request || session !== current || generation !== marker) return;
      if (typeof payload.reply !== 'string' || !payload.reply.trim() || payload.reply.length > 4000) throw Error('Invalid model response');
      const reply = clean(payload.reply);
      const rejection = riskOfOutput(reply);
      const modelSignals = Array.isArray(payload.signals) ? payload.signals.filter(item => typeof item === 'string').slice(0,6) : [];
      for (const item of modelSignals) signal(clean(item).slice(0,120));
      const supervisedPause = modelSignals.includes('supervisor-pause') || modelSignals.includes('quality-pause');
      if (supervisedPause && !rejection) {
        session.consent = false;
        enterPause('The model review interrupted this exchange. Resume with guided prompts, or end the session here.', reply);
      } else if (rejection) {
        signal(rejection);
        enterPause('A local check flagged the generated response. You can continue with guided prompts.', 'Let’s leave that response aside. What evidence could be checked independently?');
        session.consent = false;
      } else {
        const sourceIds = Array.isArray(payload.sourceIds) ? safeSourceList().filter(s => payload.sourceIds.includes(s.id)).map(s => s.id) : [];
        turn('assistant',reply,'model',{lens:session.lens,sourceIds});
      }
    } catch (_) {
      if (pending !== request || session !== current || generation !== marker) return;
      session.consent = false;
      session.connectionNotice = 'The model was unavailable. This session is continuing with on-device guided prompts.';
      turn('assistant',offlineReply(input),'prompt',{lens:session.lens});
    } finally {
      clearTimeout(timeout);
      if (pending === request) {
        pending = null;
        if (current === session && view?.isConnected) renderView(true);
      }
    }
  }
  function lensLocked() {return current.condition === 'single-perspective' || current.condition === 'baseline';}
  function switchLens(lens) {
    if (lensLocked() || lens === current.lens || !Object.hasOwn(lenses,lens) || pending) return;
    current.lens = lens;
    if (!current.lenses.includes(lens)) current.lenses.push(lens);
    const last = current.turns.filter(t => t.role === 'user').at(-1);
    turn('assistant',offlineReply(last?.text || current.question,lens),'perspective',{lens});
    renderView();
  }
  function summarize() {
    const keys = ['id','title','date','targetMinutes','turns','lenses','condition','signals','rating','reflection','sourcesUsed'];
    const entry = Object.fromEntries(keys.map(key => [key,current[key]]));
    entry.minutes = Math.round(elapsed()/600)/100;
    entry.question = current.question;
    return entry;
  }
  function beginReview() {
    cancelReply();
    stopClock();
    current.stage = 'review';
    renderView();
  }
  async function save() {
    const session = current;
    if (!session || session.saving || session.stage !== 'review') return;
    const form = view.querySelector('form[data-dg-review]');
    session.rating = Number(form?.querySelector('input[name=rating]:checked')?.value) || null;
    session.reflection = clean(form?.querySelector('textarea')?.value || '').slice(0,1600);
    session.saving = true;
    renderView();
    try {
      const result = await D.data.saveSession(summarize());
      if (current !== session) return;
      session.persistent = result?.persistent === true;
      session.stage = 'complete';
    } catch (_) {
      if (current === session) D.notify('The journal could not save this entry. Your session is still here.');
    } finally {
      session.saving = false;
      if (current === session && view?.isConnected) renderView();
    }
  }
  function btn(text,action,kind,extra) {
    return '<button type="button" class="dg-btn ' + (kind || '') + '" data-dg="' + action + '" ' + (extra || '') + '>' + text + '</button>';
  }
  function notice() {
    return '<aside class="dg-notice"><strong>About this facilitator</strong><p>Guided prompts and AI responses are tools for reflection. The AI has no feelings or awareness. For health decisions, contact a qualified professional. In immediate danger, contact local emergency services.</p>' + btn('Privacy & safety','privacy','dg-link') + '</aside>';
  }
  function head(kicker,title,description) {
    return '<header class="dg-head"><p class="dg-eyebrow">' + esc(kicker) + '</p><h1>' + esc(title) + '</h1>' + (description ? '<p>' + esc(description) + '</p>' : '') + '</header>';
  }
  function transcript() {
    const sources = safeSourceList();
    return '<ol class="dg-thread" aria-label="Session transcript">' + current.turns.map(t => {
      const refs = (t.sourceIds || []).map(id => sources.find(s => s.id === id)).filter(Boolean);
      return '<li class="dg-turn dg-' + (t.role === 'user' ? 'human' : t.tag === 'break' ? 'breaker' : 'guide') + '"><div class="dg-byline"><strong>' + (t.role === 'user' ? 'You' : 'Facilitator') + '</strong><span>' + esc(tagText[t.tag] || t.tag) + (t.lens && t.role === 'assistant' ? ' · ' + esc(t.lens) : '') + '</span></div><p>' + esc(t.text) + '</p>' + refs.map(s => '<small class="dg-source-ref">' + esc(s.status) + ' · ' + esc(s.title) + '</small>').join('') + '</li>';
    }).join('') + '</ol>';
  }
  function live() {
    const paused = current.stage === 'paused';
    const sources = safeSourceList();
    return head('Dialogue studio',current.title) + '<div class="dg-columns"><section class="dg-panel dg-conversation"><div class="dg-sessionbar"><span class="dg-label">' + (paused ? 'Paused' : 'In session') + ' · ' + (current.consent ? 'Local model' : 'Guided prompts') + '</span><span class="dg-clock"><span data-dg-time>' + timeLabel(elapsed()) + '</span> / ' + current.targetMinutes + ' min</span></div>' + (current.connectionNotice ? '<p class="dg-status" role="status">' + esc(current.connectionNotice) + '</p>' : '') + '<div class="dg-scroll">' + transcript() + (pending ? '<p class="dg-typing" role="status">Waiting for the local model…</p>' : '') + '</div>' + (paused ? '<div class="dg-pause" role="status"><h2>Take a pause</h2><p>' + esc(current.pausedReason) + '</p><div class="dg-actions">' + btn('Resume dialogue','resume','dg-primary') + btn('Finish & reflect','finish','dg-secondary') + '</div></div>' : '<form class="dg-composer" data-dg-message><label class="dg-label" for="dg-message">Your reflection</label><textarea id="dg-message" data-dg-compose maxlength="1600" rows="3" placeholder="Start with what comes to mind…">' + esc(current.draft) + '</textarea><div class="dg-composer-bar"><span>Leave out identifying details.</span><button class="dg-btn dg-primary" type="submit" ' + (pending ? 'disabled' : '') + '>Send reflection</button></div></form>') + '</section><div class="dg-aside"><section class="dg-panel dg-tools"><h2>Session tools</h2><label class="dg-label" for="dg-lens">Perspective</label><select id="dg-lens" data-dg-lens ' + (lensLocked() || paused || pending ? 'disabled' : '') + '>' + Object.keys(lenses).map(l => '<option ' + (current.lens === l ? 'selected' : '') + '>' + esc(l) + '</option>').join('') + '</select><small>' + (lensLocked() ? 'This experiment uses one perspective.' : esc(lenses[current.lens]) + '.') + '</small>' + (sources.length ? '<label class="dg-label" for="dg-source">Evidence & hypotheses</label><select id="dg-source" data-dg-source ' + (paused || pending ? 'disabled' : '') + '><option value="">Bring in a source…</option>' + sources.map(s => '<option value="' + esc(s.id) + '">' + esc(s.title) + '</option>').join('') + '</select>' : '') + '<div class="dg-rule"></div>' + modelControls() + (!paused ? btn('Pause & reconsider','pause','dg-secondary') + btn('Finish & reflect','finish','dg-link') : '') + (!current.turns.some(t => t.role === 'user') ? btn('Leave empty journey','abandon','dg-link',current.draft.trim() ? 'hidden' : '') : '') + '</section>' + notice() + '</div></div>';
  }
  function summary() {
    const complete = current.stage === 'complete';
    const users = current.turns.filter(t => t.role === 'user').length;
    const sourceSignals = current.signals.map(s => typeof s === 'string' ? s : s.kind);
    return head(complete ? 'Journal entry' : 'Session review',complete ? 'Journey complete' : 'A moment to reflect', current.title) + '<div class="dg-columns"><section class="dg-panel"><div class="dg-stats">' + [[timeLabel(elapsed()),'Active time'],[users,'Reflections'],[current.lenses.length,'Perspectives'],[sourceSignals.length,'Flags']].map(a => '<div><strong>' + esc(a[0]) + '</strong><span>' + a[1] + '</span></div>').join('') + '</div>' + (sourceSignals.length ? '<p class="dg-status">Session flags: ' + esc(sourceSignals.join(' · ')) + '. These are rule matches, not a clinical assessment.</p>' : '') + (complete ? '<h2>Your next step</h2><p>' + esc(current.reflection || 'No closing note added.') + '</p><p class="dg-muted">' + (current.persistent ? 'Saved to the encrypted journal.' : 'Available in this tab’s journal for this visit.') + '</p><div class="dg-actions">' + btn('Open journal','journal','dg-primary') + btn('Return to studio','home','dg-secondary') + '</div>' : '<form data-dg-review><label class="dg-label" for="dg-note">What will you take into tomorrow?</label><textarea id="dg-note" rows="3" maxlength="1600" placeholder="Optional closing reflection">' + esc(current.reflection) + '</textarea><fieldset class="dg-rating"><legend>How useful was this session? <span>(optional)</span></legend><div>' + [1,2,3,4,5].map(n => '<label><input type="radio" name="rating" value="' + n + '" ' + (current.rating === n ? 'checked' : '') + '><span>' + n + '</span></label>').join('') + '</div><small>1 · Limited value &nbsp; / &nbsp; 5 · Very useful</small></fieldset><div class="dg-actions"><button class="dg-btn dg-primary" ' + (current.saving ? 'disabled' : '') + '>' + (current.saving ? 'Saving…' : 'Save to journal') + '</button>' + btn('Return to dialogue','resume','dg-secondary',current.saving ? 'disabled' : '') + '</div></form>') + '<details class="dg-details"><summary>Annotated transcript (' + current.turns.length + ' turns)</summary>' + transcript() + '</details></section>' + notice() + '</div>';
  }
  function handleClick(event) {
    const action = event.target.closest('[data-dg]')?.dataset.dg;
    if (!action) return;
    if (action === 'home') return D.navigate('studio');
    if (action === 'journal') return D.navigate('journal');
    if (action === 'privacy') return D.navigate('privacy');
    if (action === 'abandon' && !current.turns.some(t => t.role === 'user') && !current.draft.trim()) {
      reset();
      return D.navigate('studio');
    }
    if (action === 'online' && current.available && loopbackModelOrigin()) {
      current.consent = true;
      current.connectionNotice = 'Local model enabled for this session. You can turn it off in session tools.';
      return renderView();
    }
    if (action === 'resume') {
      current.stage = 'active';
      current.since = Date.now();
      return renderView(true);
    }
    if (action === 'offline') {
      cancelReply();
      current.consent = false;
      current.connectionNotice = 'Model access is off. New reflections use on-device prompts.';
      return renderView();
    }
    if (action === 'pause') {
      cancelReply();
      signal('User-requested break');
      enterPause('Give the question some space. When you return, try naming one observation and one assumption.', 'What would help you check this idea from outside the conversation?');
      return renderView();
    }
    if (action === 'finish') return beginReview();
  }
  function renderView(focusComposer) {
    if (!view || !current) return;
    clearInterval(timer);
    const stage = current.stage;
    const previousScroll = view.querySelector('.dg-scroll')?.scrollTop;
    view.innerHTML = '<div class="dg">' + (stage === 'active' || stage === 'paused' ? live() : summary()) + '</div>';
    const pane = view.querySelector('.dg');
    pane.onclick = handleClick;
    pane.onchange = event => {
      if (event.target.matches('[data-dg-lens]')) return switchLens(event.target.value);
      if (event.target.matches('[data-dg-source]') && event.target.value) {
        attachSource(event.target.value);
        return renderView();
      }
      if (event.target.name === 'rating') current.rating = Number(event.target.value);
    };
    pane.oninput = event => {
      if (event.target.matches('[data-dg-compose]')) {
        current.draft = event.target.value;
        const leave = pane.querySelector('[data-dg="abandon"]');
        if (leave) leave.hidden = Boolean(current.draft.trim());
      }
      if (event.target.id === 'dg-note') current.reflection = event.target.value;
    };
    pane.onsubmit = event => {
      event.preventDefault();
      if (event.target.hasAttribute('data-dg-message')) void submit(event.target.querySelector('textarea').value);
      if (event.target.hasAttribute('data-dg-review')) void save();
    };
    pane.onkeydown = event => {
      if (event.target.matches('[data-dg-compose]') && event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !event.isComposing) {
        event.preventDefault();
        void submit(event.target.value);
      }
    };
    const scroll = pane.querySelector('.dg-scroll');
    if (scroll) scroll.scrollTop = (previousScroll === undefined || focusComposer || pending) ? scroll.scrollHeight : previousScroll;
    if (stage === 'active') timer = setInterval(clock,1000);
    if (stage === 'active' || stage === 'paused') {void checkProvider(current);updateProviderControl();}
    if (focusComposer && !pending) pane.querySelector('[data-dg-compose]')?.focus({preventScroll:true});
  }
  function render(root) {
    view = root;
    if (!current) {
      root.innerHTML = '<div class="dg">' + head('Dialogue studio','Start a journey','Choose a question in the studio to open a new session.') + btn('Open studio','home','dg-primary') + '</div>';
      root.querySelector('[data-dg]').onclick = () => D.navigate('studio');
      return;
    }
    renderView();
  }
  D.dialogue = {start,render,hasActive:isActive,pauseForNavigation,reset};
})();
