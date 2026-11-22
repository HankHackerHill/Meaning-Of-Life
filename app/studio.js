(() => {
  "use strict";

  const DDL = window.DDL = window.DDL || {};
  const byId = id => document.getElementById(id);
  const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  DDL.escape = escape;

  const paths = {
    studio:'<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>',
    feather:'<path d="M4 21l11-11M5 17c0-5 2-10 8-13 3-2 6-2 8-2-1 8-5 15-13 16H5z"/><path d="M11 13h5"/>',
    message:'<path d="M20 14a3 3 0 0 1-3 3H9l-5 4V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z"/><path d="M8 8h8M8 12h5"/>',
    journal:'<path d="M6 3h13v18H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 14h13M8 3v14"/>',
    book:'<path d="M3 5q5-2 9 1 4-3 9-1v14q-5-2-9 1-4-3-9-1zM12 6v14"/>',
    chart:'<path d="M3 3v17h18M7 15l4-5 3 2 6-8"/>',
    flask:'<path d="M9 3h6m-5 0v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-9V3M7 15h10"/>',
    shield:'<path d="M12 2l8 3v6c0 5-4 8-8 11-4-3-8-6-8-11V5z"/><path d="M8 12l3 3 5-6"/>',
    panel:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
    help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1.4 1-1.5 1.3-1.5 2.5m0 2.7v.1"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
    play:'<path d="m8 5 11 7-11 7z" fill="currentColor" stroke="none"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m16.5 7.5-3 6-6 3 3-6z"/>',
    layers:'<path d="m3 8 9-5 9 5-9 5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',chevron:'<path d="m8 5 7 7-7 7"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    x:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    spark:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>'
  };
  DDL.icon = (name, size=19) => '<svg aria-hidden="true" focusable="false" width="'+Number(size)+'" height="'+Number(size)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+(paths[name] || paths.compass)+'</svg>';

  const journeys = [
    {name:"Quick reflection",minutes:5,tone:"clay",image:"ripple",desc:"One question to bring a thought into focus.",question:"Which moment today deserves a second look?",lens:"Socratic"},
    {name:"Perspective shift",minutes:20,tone:"sage",image:"orbit",desc:"Examine a familiar belief through a different lens.",question:"What belief might look different from another point of view?",lens:"Skeptic"},
    {name:"Deep inquiry",minutes:45,tone:"lilac",image:"wave",desc:"Follow a difficult question through evidence and alternatives.",question:"Which assumption sits beneath a decision that matters to you?",lens:"Scientist"}
  ];
  const prompts = [
    ["Meaning & purpose","What gives a life its meaning?","Can a life be meaningful even when no one remembers it? Think of a moment whose value did not depend on recognition."],
    ["Human behavior","When does a habit become part of who you are?","Choose a routine you repeat. What would changing it reveal about the person you believe yourself to be?"],
    ["Mind & machine","What would count as being understood by a machine?","Think of a reply that felt insightful. What observable signs could distinguish understanding from a convincing imitation?"],
    ["Beliefs & evidence","What would change your mind?","Choose one belief you hold confidently. What specific observation would lower your confidence in it?"],
    ["Meaning & purpose","Whose definition of success are you using?","Recall a moment you called a success. Whose criteria did you use, and would you choose the same ones today?"],
    ["Human behavior","Can two honest witnesses remember different truths?","Think of a disagreement about a shared event. Which parts were directly observed and which were inferred?"],
    ["Mind & machine","When is agreement a reason to doubt an answer?","Recall an answer that agreed with you immediately. What could you ask to test whether another explanation fits?"],
    ["Beliefs & evidence","What is hidden inside the word ‘obvious’?","Name something you regard as obvious. What experience or context would another person need to see it that way?"],
    ["Meaning & purpose","What makes a promise matter to your future self?","Think of a commitment that outlasted the feeling that inspired it. What sustained it?"],
    ["Human behavior","What does changing your mind look like from the inside?","Recall a time your view shifted gradually. Which observation first made the old explanation less satisfying?"],
    ["Mind & machine","Can an answer be useful for the wrong reason?","Imagine a system that gives helpful advice with a faulty explanation. Which part could you test independently?"],
    ["Beliefs & evidence","Which explanation have you ruled out too quickly?","Pick one recent decision. What alternative did you dismiss, and how could you give it a fair test?"]
  ];
  const names={frontiers:"Frontier casebook",studio:"Journey studio",prompts:"Prompt library",dialogue:"Dialogue",journal:"Session journal",insights:"Practice insights",evidence:"Evidence archive",experiments:"Experiments",privacy:"Privacy & support"};
  const navGroups=[["Workspace",[["studio","studio"],["prompts","feather"],["journal","journal"]]],["Research tools",[["frontiers","compass"],["evidence","book"],["insights","chart"],["experiments","flask"]]]];
  let selectedJourney=null, setupTrigger=null, currentView="", toastTimer, dayTimer;

  function notice(message) {
    const el=byId("toast"); el.textContent=message; el.hidden=false;
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>{el.hidden=true;},4200);
  }
  DDL.notify=notice;
  function closeRail() {
    document.body.classList.remove("menu-open"); byId("scrim").hidden=true;
    byId("mobile-nav").setAttribute("aria-expanded","false");
  }
  function dateText() {
    byId("top-date").innerHTML=DDL.icon("calendar",15)+"<time>"+escape(new Date().toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric"}))+"</time>";
  }
  function refreshNav() {
    const nav=byId("navigation");
    nav.innerHTML=navGroups.map(([label,items])=>'<section><p class="nav-label">'+label+'</p>'+items.map(([view,icon])=>navLink(view,icon)).join("")+'</section>').join("")+
      (DDL.dialogue?.hasActive()?'<section><p class="nav-label">In progress</p>'+navLink("dialogue","message")+'</section>':"");
    const state=DDL.data?.vaultState?.();
    byId("privacy-mode").textContent=state==="unlocked"?"Vault unlocked":state==="locked"?"Vault locked":"Session memory";
  }
  function navLink(view,icon) {
    return '<a href="#'+view+'" class="nav-link'+(currentView===view?' active':'')+'" '+(currentView===view?'aria-current="page"':'')+'>'+DDL.icon(icon)+'<span>'+names[view]+'</span></a>';
  }
  function renderPage(shouldFocus=true) {
    const root=byId("workspace");
    const [requested, item]=location.hash.slice(1).split("/");
    let view=Object.hasOwn(names,requested)?requested:"studio";
    if(view==="dialogue"&&!DDL.dialogue?.hasActive()&&currentView!=="dialogue") view="studio";
    if(currentView==="dialogue"&&view!=="dialogue") DDL.dialogue?.pauseForNavigation();
    currentView=view; closeRail(); byId("crumb-view").textContent=names[view];
    document.title=names[view]+" · DeepDialogue Lab"; refreshNav();
    root.replaceChildren(); root.dataset.view=view;
    if(view==="studio") studio(root);
    else if(view==="prompts") library(root);
    else if(view==="frontiers") DDL.frontiers.render(root,item,setup);
    else if(view==="dialogue") DDL.dialogue.render(root);
    else DDL.data.render(view,root);
    window.scrollTo(0,0);
    if(shouldFocus) root.focus({preventScroll:true});
  }
  DDL.navigate=view=>{
    if(!Object.hasOwn(names,view)) return;
    if(location.hash==="#"+view) renderPage();
    else location.hash=view;
  };
  DDL.refreshNav=refreshNav;

  // The local calendar sets the daily prompt consistently across a visitor's time zone.
  function dailyPrompt() {
    const now=new Date();
    const day=Math.floor(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())/86400000);
    const base=Math.floor(Date.UTC(2026,10,22)/86400000);
    return prompts[((day-base)%prompts.length+prompts.length)%prompts.length];
  }
  function studio(root) {
    const daily=dailyPrompt(), sessions=DDL.data.sessions()||[];
    root.innerHTML='<div class="page-intro"><div><div class="overline"><i></i> Personal workspace</div><h1>Journey studio</h1><p>Explore a question, challenge a belief, or find a different perspective.</p></div></div>'+
      (DDL.dialogue.hasActive()?'<div class="resume-strip">'+DDL.icon("message")+'<span>You have a journey in progress.</span><button data-go="dialogue">Resume dialogue</button></div>':'')+
      '<article class="hero"><div class="hero-art" aria-hidden="true"></div><div class="hero-content"><div class="hero-label">'+DDL.icon("sun",16)+' Daily inquiry</div><h2>'+escape(daily[1])+'</h2><div class="hero-bottom"><button class="hero-button" data-daily>'+DDL.icon("play",15)+' Explore this question</button><span>'+DDL.icon("clock",15)+' 20 min</span></div></div></article>'+
      '<section class="choose-section" aria-labelledby="choose-title"><div class="section-heading"><div><div class="overline"><i></i> Guided practice</div><h2 id="choose-title">Choose a journey</h2></div><a class="text-link" href="#prompts">Browse prompts '+DDL.icon("chevron",15)+'</a></div>'+
      '<div class="journey-grid">'+journeys.map((j,i)=>'<button class="journey-card '+j.tone+'" data-journey="'+i+'"><span class="card-visual"><img src="./app/'+j.image+'.svg" alt=""><span class="time-chip">'+DDL.icon("clock",13)+j.minutes+' min</span></span><span class="card-copy"><strong>'+j.name+'</strong><span>'+j.desc+'</span></span></button>').join("")+'</div></section>'+
      '<section class="practice-section" aria-labelledby="practice-title"><div class="section-heading"><div><div class="overline"><i></i> Session journal</div><h2 id="practice-title">Recent reflections</h2></div><a class="text-link" href="#journal">Open journal '+DDL.icon("chevron",15)+'</a></div>'+
      (sessions.length?'<div class="recent-list">'+sessions.slice(0,3).map(s=>'<a href="#journal">'+DDL.icon("journal")+'<b>'+escape(s.title)+'</b><small>'+escape(new Date(s.date).toLocaleDateString())+'</small>'+DDL.icon("chevron",14)+'</a>').join("")+'</div>':
      '<div class="journal-empty">'+DDL.icon("journal",23)+'<span><strong>'+ (DDL.data.vaultState?.()==="locked"?"Your journal is locked":"Your journal starts here")+'</strong><small>'+ (DDL.data.vaultState?.()==="locked"?"Unlock your vault in Privacy to review saved journeys.":"Completed journeys appear here for review.")+'</small></span></div>')+'</section>';
    root.querySelector("[data-daily]").onclick=()=>setup({title:daily[1],question:daily[2],minutes:20,lens:"Socratic"});
    root.querySelectorAll("[data-journey]").forEach(btn=>btn.onclick=()=>setup({title:journeys[+btn.dataset.journey].name,...journeys[+btn.dataset.journey]}));
  }
  function library(root) {
    root.innerHTML='<div class="page-intro"><div><div class="overline"><i></i> Guided practice</div><h1>Prompt library</h1><p>Start with a question from the collection, or write one of your own.</p></div></div><div class="library-tools"><label class="search-box">'+DDL.icon("search")+'<input type="search" placeholder="Search prompts" aria-label="Search prompts"></label><button class="solid" id="custom-prompt">Write a question</button></div><div class="filters" role="group" aria-label="Prompt topic"></div><div class="prompt-list"></div>';
    let selected="All topics";
    const filters=root.querySelector(".filters"), container=root.querySelector(".prompt-list"), field=root.querySelector("input");
    function update() {
      filters.innerHTML=["All topics",...new Set(prompts.map(p=>p[0]))].map(c=>'<button class="filter" aria-pressed="'+(c===selected)+'" data-filter="'+escape(c)+'">'+escape(c)+'</button>').join("");
      const matches=prompts.map((p,i)=>({p,i})).filter(({p})=>(selected==="All topics"||p[0]===selected)&&p.join(" ").toLowerCase().includes(field.value.toLowerCase().trim()));
      container.innerHTML=matches.length?matches.map(({p,i})=>'<button class="prompt-item" data-prompt="'+i+'"><span class="prompt-kicker">'+escape(p[0])+'</span><strong>'+escape(p[1])+'</strong><span>'+escape(p[2])+'</span></button>').join(""):'<p class="no-results" role="status">No prompts match. Try a different topic or search term.</p>';
    }
    filters.onclick=e=>{const button=e.target.closest("[data-filter]");if(button){selected=button.dataset.filter;update();Array.from(filters.children).find(x=>x.dataset.filter===selected)?.focus();}};
    container.onclick=e=>{const button=e.target.closest("[data-prompt]");if(button){const p=prompts[+button.dataset.prompt];setup({title:p[1],question:p[2],minutes:20,lens:"Socratic"});}};
    field.oninput=update; byId("custom-prompt").onclick=()=>setup({title:"Personal inquiry",question:"",minutes:20,lens:"Socratic"}); update();
  }
  function setup(journey) {
    if(DDL.dialogue.hasActive()){DDL.navigate("dialogue");notice("Resume or finish your current journey before starting another.");return;}
    const dialog=byId("setup"); selectedJourney={...journey}; setupTrigger=document.activeElement;
    dialog.innerHTML='<form id="setup-form"><div class="setup-head"><span class="overline"><i></i> Session setup</span><button type="button" class="icon-button" aria-label="Close session setup" data-close>'+DDL.icon("x",18)+'</button></div><h2 id="setup-title">'+escape(journey.title)+'</h2><label class="field-label" for="start-question">Opening question</label><textarea id="start-question" maxlength="500" placeholder="What would you like to examine?" required>'+escape(journey.question)+'</textarea><fieldset><legend>Time to explore</legend><div class="duration-options">'+[5,20,45].map(n=>'<label><input type="radio" name="minutes" value="'+n+'" '+(journey.minutes===n?"checked":"")+'><span>'+n+' min</span></label>').join("")+'</div></fieldset><label class="field-label" for="start-lens">Starting perspective</label><select id="start-lens">'+["Socratic","Skeptic","Scientist","Supportive"].map(l=>'<option '+(l===journey.lens?"selected":"")+'>'+l+'</option>').join("")+'</select><p class="setup-note">'+DDL.icon("shield",17)+'<span>Starts with guided prompts on this device. You choose whether to connect a model during the session. Avoid identifying details.</span></p><button type="submit" class="solid full">'+DDL.icon("play",16)+' Begin journey</button></form>';
    dialog.querySelector("[data-close]").onclick=()=>dialog.close();
    dialog.onclick=e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}};
    dialog.onclose=()=>{if(setupTrigger?.isConnected)setupTrigger.focus();};
    byId("setup-form").onsubmit=e=>{
      e.preventDefault();const input=byId("start-question");const question=DDL.data.mask(input.value.trim());
      if(!question){input.setCustomValidity("Enter a question to start.");input.reportValidity();return;}
      const exp=DDL.data.experimentCondition?.()||{}, lens=byId("start-lens").value;
      const options={caseId:selectedJourney.caseId,title:selectedJourney.title,question,minutes:Number(new FormData(e.target).get("minutes")),lens:exp.condition&&exp.condition!=="standard"?(exp.lens||lens):lens,condition:exp.condition||"standard"};
      dialog.close();DDL.dialogue.start(options);
    };
    byId("start-question").oninput=e=>e.target.setCustomValidity(""); dialog.showModal();
  }
  document.addEventListener("DOMContentLoaded",()=>{
    byId("crumb-icon").innerHTML=DDL.icon("panel",16);byId("help-icon").innerHTML=DDL.icon("help",18);byId("mobile-nav").innerHTML=DDL.icon("menu");
    dateText(); dayTimer=setInterval(dateText,60000);
    byId("mobile-nav").onclick=()=>{const open=document.body.classList.toggle("menu-open");byId("scrim").hidden=!open;byId("mobile-nav").setAttribute("aria-expanded",String(open));if(open)byId("rail").querySelector(".nav-link")?.focus();};
    byId("scrim").onclick=closeRail;
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&document.body.classList.contains("menu-open")){closeRail();byId("mobile-nav").focus();}});
    document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)DDL.navigate(b.dataset.go);if(e.target.closest(".nav-link,.brand"))closeRail();});
    window.addEventListener("ddl:data-changed",refreshNav);
    window.addEventListener("hashchange",()=>renderPage()); renderPage(false);
  });
})();
