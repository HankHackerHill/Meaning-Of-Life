/* The browser and the read-only MCP server render exactly the same prompt. */
(() => {
  'use strict';
  const isNode = typeof module !== 'undefined' && module.exports;
  const conversations = isNode ? require('./conversations.js') : window.DDL.conversations;
  const techniques = {
    'Mind & machine': ['Behavior and mechanism', 'Invent two systems with different internal mechanisms that produce the same observable reply. Ask which extra observation could distinguish them. Consider whether that test would also be fair to a human.', 'A two-column account of what the interaction shows and what remains unknowable from it.'],
    'Meaning & purpose': ['Changing the beneficiary', 'Retell the scene from the perspective of the maker, the recipient and someone who never learned it happened. Change one consequence while keeping the intention fixed.', 'A working definition of purpose, followed by the strongest exception the participant is willing to allow.'],
    'Psychedelic research & stories': ['Interview and inference', 'Treat the scene as fictional. Read the exact words as an interviewer, then as a skeptical researcher. Separate felt significance, a subsequent action and a causal claim. Ask a neutral follow-up. Avoid dosing advice or personal medical recommendations.', 'A participant-owned interpretation, a rival explanation, and one question a responsible study could investigate.'],
    'Perception & altered states': ['Two observers, one event', 'Have two witnesses describe the same scene under different conditions. Hold an observable detail fixed and vary one cue. Distinguish a change in perception from a change in the event.', 'Two short witness accounts and a test that could settle one disagreement while leaving another open.'],
    'Space & universe': ['The observatory decision', 'Make the question concrete with a finite observing window or a message with no guaranteed reply. Separate what could be measured from what matters to the observer. Mark all invented data as hypothetical.', 'A proposed observation with two possible outcomes, plus one question about meaning that the observation leaves open.'],
    'Patterns & coincidence': ['Prediction before explanation', 'Ask for the pattern rule before revealing a new case. Include the misses, the opportunities to notice a hit and an ordinary mechanism that could generate the pattern. Invite a forecast that can fail.', 'A prediction card specifying a rule, comparison, observation window and an outcome that would lower confidence.'],
    'Self-awareness & identity': ['The reversible interview', 'Let the participant speak as a past self, a present observer or a fictional character. Swap the roles. Ask what each could know first-hand and what the other could only infer. Let the participant reject either portrayal.', 'One question for an earlier self and a revised sentence that the present self is prepared to defend.'],
    'Mental health, work & growth': ['Two calendars', 'Compare a visible record of achievement with a private account of cost, care or constraint. Offer the option of a fictional character. Ask what the person would find useful before offering an interpretation. Keep suggestions reversible and avoid diagnoses.', 'A self-chosen next step, an observation that might make it worth repeating, and permission to revise it.'],
    'Riddles & paradoxes': ['The smallest useful hint', 'Wait for an attempted solution. If the participant gets stuck, ask which assumption they used, then give one minimal hint. Reveal the solution only when requested or after a second attempt with permission. Test transfer with a changed rule.', 'A worked solution, the misleading assumption, and a new version whose answer changes for a reason.'],
    'Past, present & future': ['Three witnesses across time', 'Reconstruct the scene using the records that could survive it. Give a near-term and a distant observer different interests. Ask what each would misread from exactly the same evidence.', 'A dated account that distinguishes testimony, inference and values, with a question for a future reader.'],
    'Conspiracy theories & evidence': ['Provenance hearing', 'Investigate only the fictional scenario. Map each claim to an origin, distinguish independent observations from repetition, and define evidence for ordinary and coordinated explanations before updating. Do not invent allegations about real people.', 'A public correction-ready note listing the narrow finding, its limits and the next independently checkable record.'],
    'Ethics & belonging': ['The absent stakeholder', 'Give the person with the least power a concrete choice. Swap positions without changing the facts. Ask which rule the participant would accept before learning where they stood.', 'A decision, the strongest objection from someone affected, and a condition for revisiting it.']
  };
  const signatures = [
    {id:'last-translator',topic:'Ethics & belonging',title:'The last translator', method:'Translation hearing',
      question:'A town has one surviving recording of a farewell in a disappearing language. An AI translates it as “come home.” The speaker’s granddaughter hears “you are free to leave.” You are writing the museum label. What would you put on it tonight?',
      procedure:'Produce two provisional labels of at most twenty words. Let both fit the same recording. After I choose, introduce a new witness who remembers the occasion but never heard the words. Ask exactly which part of my label their testimony can change. Later an audio engineer recovers one extra syllable. Let me decide what that could settle and what belongs to the family.',
      askBack:'Argue for the translation I rejected. Name the detail that makes your case vulnerable.',
      followups:['If the family wants silence and the dictionary favors a confident translation, whose permission matters for the label?','Tomorrow a visitor acts on your wording. Which consequence did you fail to imagine tonight?','Give the family a right to correct the label. What exactly would you print?'],
      artifact:'A museum label of sixty words, an alternative reading in the granddaughter’s voice, and an explicit invitation for someone with better evidence to correct it.'},
    {id:'future-museum',topic:'Past, present & future',title:'The museum of ordinary Tuesdays',method:'Future archaeology',
      question:'In 2226 a curator finds a grocery receipt, a voicemail nobody answered and a photo of an empty chair. Choose one. What claim about the people who left it would you risk putting on the wall?',
      procedure:'Run a three-object acquisition hearing. Invent only details that I request, mark each as fictional and keep a consistent inventory. Give each object two plausible histories with different implications. Halfway through, let me spend the museum’s last research hour on one external check. Explain what becomes unknowable because of that choice.',
      askBack:'As a future curator, propose the most persuasive wrong story these objects allow. Show me the smallest detail that could expose it.',
      followups:['Which clue looked important only because it survived?','If the voicemail had been answered, would the silence in the archive mean the opposite?','Which fact and which unanswered question deserve equal space on the label?'],
      artifact:'An exhibit label, one discarded interpretation with the reason for discarding it, and one ordinary detail from the present that deserves preserving.'},
    {id:'silent-signal',topic:'Space & universe',title:'The signal that only appears on Sundays',method:'Observing-time jury',
      question:'Your fictional observatory sees a repeating signal four Sundays in a row. A colleague wants to announce a discovery. You have one night on a second telescope. What do you request before hearing anyone’s favorite explanation?',
      procedure:'Be the observing-time chair. Build a consistent synthetic case around a local source, a scheduling bias and a celestial source. Do not silently decide that an extraordinary explanation wins. Before revealing a hypothetical observation, ask me to predict the direction of the result under two hypotheses. If we end with indistinguishable explanations, let that be the finding.',
      askBack:'You have to spend your own telescope time challenging my explanation. Which observation would make me uncomfortable for the right reason?',
      followups:['Which uneventful nights belong in the denominator?','The second telescope saw nothing. What would you need to know about its sensitivity?','If people care more about the headline than the uncertainty, what should your first sentence be?'],
      artifact:'A short observing proposal, a discriminating prediction and a public statement that another observatory could correct.'},
    {id:'unlived-map',topic:'Meaning & purpose',title:'The atlas of lives you did not live',method:'Counterfactual correspondence',
      question:'Two letters arrive from futures in which you made opposite choices. Both writers say they are glad you chose their life. What single question would you send both of them before deciding whose advice to trust?',
      procedure:'Invite a small real choice or an invented one. Write each future letter using the same three present-day facts I supply. Each writer must name an ordinary pleasure, a real cost and a person who sees the choice differently. Keep all futures hypothetical. When I prefer one, ask whether I chose the life, the prose or the person I wish would approve.',
      askBack:'Rewrite my less appealing future with equally generous language. Which part of my preference survives a fair description?',
      followups:['What would both future selves miss about today?','Which good in the rejected letter could still fit into the life you chose?','What small reversible experiment would teach you more than a third imagined future?'],
      artifact:'A letter back to both futures naming one value, one uncertainty and one small action the present self actually chooses.'}
  ];
  const originals = [...signatures, ...conversations.map(p=>{
    const [method,procedure,artifact]=techniques[p.topic];
    return {...p,method,procedure,artifact};
  })];
  const sizes=['short','medium','long'];
  const editions=isNode?require('./editions.js'):(window.DDL.editions||{});
  const legacy=new Map(originals.map(p=>[p.id,p]));
  const catalogue=[];
  const families=new Map();
  for(const [topic,ideas] of Object.entries(editions)){
    for(const idea of ideas){
      const levels=sizes.filter(size=>Object.hasOwn(idea,size));
      const family=levels.map(size=>{
        const saved=size==='long'&&idea.long===null?legacy.get(idea.id):null;
        const id=(size==='long'||levels.length===1)?idea.id:idea.id+'-'+size;
        const script=idea[size];
        const entry=saved?{...saved}:{id,title:idea.title,topic,script,
          question:script.split(/(?<=[?!.])\s/)[0],method:'Conversation prompt'};
        return {...entry,size,family:idea.id,sources:idea.sources||[],fiction:topic==='Fiction & storytelling'};
      });
      families.set(idea.id,family);
      catalogue.push(...family);
    }
  }
  // A visitor can briefly have an older HTML entry point during a rolling static deployment.
  if(!catalogue.length)catalogue.push(...originals.map(p=>({...p,size:'long',family:p.id})));
  const indexed=new Map(catalogue.map(p=>[p.id,p]));
  const find=id=>indexed.get(id);
  const related=p=>families.get(p?.family)||[];
  function render(p) {
    if(p.script)return p.script;
    const sections=[
      p.title,
      'Run a one-to-one conversation using '+p.method+'. I will be the participant. Take seriously both my experience and the possibility that my interpretation is mistaken.',
      'Opening scene\n'+p.question,
      'How to investigate\n'+p.procedure,
      'Conversation moves\n'+p.followups.map((q,i)=>(i+1)+'. '+q).join('\n'),
      'When I turn the question around\n'+p.askBack+' Answer directly, then name one assumption your answer needs. Let me challenge it.',
      'Adapt as we go\nStart with the opening scene and wait for my reply. Use one move per turn. If I answer in abstractions, ask for a particular moment or offer a fictional example. If I sound certain, give the strongest rival that fits the same facts. If I change my mind, ask which detail did the work. Let me pass or end at any point.',
      'What we will make\n'+p.artifact+' Before drafting it, ask whether I am ready. Preserve one unresolved disagreement in my own terms. Label invented scenarios, personal reflections, hypotheses and checkable claims accurately. Ask for a source when a factual claim matters.'
    ];
    if(p.reading)sections.push('Optional background reading\n'+p.reading.join('\n')+' Describe its findings only if you can inspect the source.');
    return sections.join('\n\n');
  }
  const api={catalogue,find,render,related,sizes};
  if(isNode)module.exports=api;else window.DDL.masters=api;
})();
