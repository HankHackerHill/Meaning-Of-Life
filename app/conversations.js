/* Original DeepDialogue conversations. Each row opens with the participant and then unfolds one turn at a time. */
(() => {
  'use strict';
  const entries = [];
  function topic(name, rows) {
    for (const [id, title, question, askBack, ...followups] of rows) {
      entries.push({id, topic:name, title, question, askBack, followups});
    }
  }
  topic('Mind & machine', [
    ['agreeable-editor','Would you trust the same answer in a colder voice?',
      'An AI editor calls your essay brave, then suggests cutting its last paragraph. A second editor suggests the identical cut without the compliment. Which one gets your trust? Decide before explaining.',
      'Give me the strongest criticism of my essay that still holds if I tell you I dislike blunt feedback. Which part would you need to read first?',
      'Here is a rival reading: the warmer editor made criticism easier to hear. What detail would distinguish that from flattery?',
      'Suppose you tell each editor that the ending is your favorite. What change in its reasoning would make you trust it less?',
      'Write one instruction you would give your next AI critic. How will you recognize an objection worth keeping?'],
    ['quiet-machine','What would count as evidence of an inner life?',
      'Imagine two machines that say they miss a former user. One plays a recording. The other composes a different answer each time. How much does that difference change what you believe about either machine?',
      'What could an observer infer from your behavior alone? Give me two mechanisms that would look identical in this conversation.',
      'Invent a third machine that passes your first test through a simpler mechanism. What did your test actually measure?',
      'A person can be conscious and unable to describe an experience. Which part of your test would be unfair if applied to them?',
      'Which uncertainty belongs in the scientific conclusion, and which decision about how to treat these machines could you make anyway?'],
    ['borrowed-apology','Who owes the apology when AI finds the words?',
      'A brother sends a precise, moving apology drafted by AI. He means every word but could never have written it alone. If you were his sister, what would you want to know before replying?',
      'Draft the one question the sister could ask that you, as a writing assistant, could never answer on her brother’s behalf.',
      'Now imagine he wrote it himself and has sent the same apology three times. Which part of your judgment changes?',
      'Pick one question the sister could ask that the draft cannot answer for him. Why that question?',
      'What action a month later would matter more to you than learning who wrote the sentences?']
  ]);
  topic('Meaning & purpose', [
    ['night-garden','Who was the garden for?',
      'A night-shift worker tends flowers along a road scheduled to close. Nobody sees the final bloom. Did the work succeed? Give the worker an answer you would be willing to say aloud.',
      'Make the gardener’s best case using a different definition of success from mine. Where do our definitions lead to different choices?',
      'Consider three beneficiaries: the worker, a pollinating insect and a stranger who might have passed. Which one did your first answer assume?',
      'Suppose tending the flowers meant missing a promise to a friend. Where does your account of purpose have to change?',
      'Name something small you would still do without an audience. What is enough for it to count?'],
    ['broken-cup','Can a broken object finish its purpose?',
      'A chipped cup served coffee for thirty years. Its owner now uses it to hold pencils. Has the cup failed, found a new purpose, or exposed a mistake in the question?',
      'Defend the maker’s view of the cup. Then tell me one fact about its owner that would make you revise that defense.',
      'Imagine the maker calls it ruined and the owner calls it indispensable. Which facts do they actually disagree about?',
      'Would your answer change if the object were a wedding ring reused as scrap metal? Identify the difference that matters.',
      'What role in your own life might have outlasted the purpose someone originally chose for it? You can also answer for a fictional character.'],
    ['last-page','Would an unfinished life need a different ending?',
      'A novelist dies with one page left unwritten. Her daughter can finish the book exactly as planned or publish the blank page. Which ending would you choose, and whose wish carries the most weight?',
      'Write a two-line exchange between the daughter and an impatient reader. Let each notice something the other missed.',
      'Suppose the missing page was an ordinary breakfast scene. Does the value of finishing depend on how grand the ending is?',
      'Imagine the daughter discovers a note saying the author kept changing her mind. What should an honest edition preserve?',
      'Choose one unfinished thing you value. What has it already given someone, even if it never reaches an ending?']
  ]);
  topic('Psychedelic research & stories', [
    ['trial-envelope','What if the blindfold in a study is transparent?',
      'In a fictional psychedelic trial, volunteers guess which group they joined before rating their experience. The groups give different ratings. What would you ask the researchers before deciding what caused that difference?',
      'Describe two imaginary trials with the same average rating change but different causes. What extra measurement would separate them?',
      'Two explanations fit: an effect of the intervention and an effect of expecting change. Could both operate in the same person?',
      'What would recording expectations before assignment, treatment guesses afterward and outcomes over time let you compare? What uncertainty survives?',
      'Write one sentence about the fictional results that a participant and a skeptical trial designer could both sign.'],
    ['interview-coder','What gets lost when a story becomes a research category?',
      'In this fictional interview, someone describing a psychedelic study says, “I started phoning my brother again. We still argue.” If you were coding the interview, what theme would you assign, and which words resist that label?',
      'Code the speaker’s words twice using two plausible labels. Show me the exact words each label overlooks.',
      'One reader hears reconnection. Another hears an unfinished conflict. Highlight the words that support each reading.',
      'What follow-up could the interviewer ask without steering the speaker toward either interpretation?',
      'Imagine a report quotes only the first sentence. Rewrite its conclusion so the second sentence still matters.'],
    ['morning-letter','Does an insight survive the morning after?',
      'In a fictional story, a person leaves a psychedelic research session certain they should quit their job and become a teacher. A week later the certainty fades, but they still enjoy tutoring. Which part of the story deserves further attention?',
      'Offer two explanations of why tutoring still mattered a week later. Ask me for one new detail before you choose between them.',
      'Try two readings of the experience: it revealed a longstanding value, or it made a new idea feel unusually important. What detail would help distinguish them?',
      'The person volunteers for one afternoon and dislikes it. How much should that change either reading?',
      'Write a short letter from the person a month later that respects the experience and leaves room to revise its meaning.']
  ]);
  topic('Perception & altered states', [
    ['dream-message','Can a dream answer a question it never heard?',
      'In a story, a musician dreams that her late teacher says to slow down. The next morning she plays a difficult passage beautifully. Which part of that story needs explaining first?',
      'Tell the musician’s story twice, once as a tribute and once as a puzzle about memory. Which facts did both versions have to keep?',
      'Imagine the same advice came from a sticky note she forgot writing. What changes about its usefulness? What changes about its origin?',
      'She remembers the beautiful performance vividly and has forgotten several disappointing mornings. What record would make the comparison fairer?',
      'What meaning could she keep from the dream even if she never learns why those words appeared?'],
    ['song-length','Where did the missing minutes go?',
      'A song lasts four minutes. To the performer it feels over almost instantly. To a nervous listener it feels endless. Which clock would you use to tell the story of the room?',
      'Describe the same four minutes from both seats using only observable details. Where did you have to guess?',
      'Describe the same minute from each seat without using time words. Which details seem to stretch or shrink it?',
      'Now the listener knows when the song will end. What would you predict changes, and how would you ask without suggesting an answer?',
      'Think of an ordinary experience you rush through. What one detail might you notice if you gave it the performer’s attention?'],
    ['new-color','What can you learn from a color you cannot see?',
      'A visitor can tell apart two painted doors that look identical to everyone in your town. What would convince you the visitor detects a difference? What would you still want to know?',
      'Design a test for the visitor that somebody could pass without ever sharing what the colors feel like. What does passing establish?',
      'The visitor sorts the doors correctly in silence. Now swap their handles and move them. Which cue are you controlling?',
      'Imagine every test succeeds. Can the visitor tell you what the difference feels like, or only teach you to predict their choices?',
      'Where in ordinary conversation do you mistake an inability to share a feeling for an inability to know anything about it?']
  ]);
  topic('Space & universe', [
    ['last-radio','Who is a message for if no answer can return?',
      'Imagine a spacecraft crossing its last communication window. You can transmit one final line. Nobody aboard can reply. What belongs in that line, and what makes sending it worthwhile?',
      'Write the final transmission from the crew’s perspective. What would they want to receive that the sender might never think to say?',
      'Try writing the line for three audiences: the crew, their descendants and the person left at the transmitter. Which words survive?',
      'Suppose the ship’s receiver may already be broken. At what chance of reception, if any, would you choose silence?',
      'Which conversation in everyday life has the same shape? What would you say differently while a reply is still possible?'],
    ['two-skies','How could two universes tell the same story?',
      'In a thought experiment, two cosmologies predict everything your observatory has measured. One is simpler. The other predicts an unfamiliar signal next winter. Which would you use to plan your telescope time?',
      'You have one night of telescope time. What observation buys the most information if your favorite theory is wrong?',
      'If telescope time goes to the riskier theory, has it earned more belief or merely a better opportunity to fail?',
      'A weak signal arrives alongside an instrument upgrade. Name a comparison that could tell the two stories apart.',
      'What would an honest headline say before an independent observatory checks the result?'],
    ['purpose-of-stars','Does asking what a star is for change the question?',
      'An astronomer, a sailor and a child each answer “What is that star for?” What do you think each person heard in the question?',
      'Answer the child, the sailor and the astronomer separately. Point to one word whose meaning changes across your answers.',
      'Imagine the star existed before any observer. Which answers still make sense under that condition?',
      'Now give the sailor a cloudy sky and an accurate compass. Has the star lost a purpose, or has the sailor’s need changed?',
      'Ask a question about the purpose of the universe in two versions: one an observation might answer and one that asks what you value.']
  ]);
  topic('Patterns & coincidence', [
    ['three-clocks','How many clocks did you forget to count?',
      'A fictional commuter notices 11:11 three mornings in a row and wonders about the pattern. Before offering an explanation, what else would you want them to record?',
      'Design a clock diary that could embarrass both of us if our favorite explanation is wrong. What should go in before the first observation?',
      'Would 12:12, a birthday or three identical digits also have caught their eye? Decide which patterns count before the next week begins.',
      'Could a regular break schedule explain the result even if every recorded time is accurate? Design a comparison that preserves the schedule.',
      'What result would surprise both the coincidence explanation and the routine explanation?'],
    ['museum-of-hits','How would you curate a museum of failed predictions?',
      'An exhibition displays twelve forecasts that came true. Which single additional exhibit would most change your estimate of the forecaster’s skill?',
      'Give me a forecast that sounds unusually specific but could match many outcomes. Help me rewrite it so it can clearly fail.',
      'The curator offers either the twelve original texts or a list of every forecast, including misses. Which do you request first and why?',
      'Suppose one forecast was precise and the others could fit dozens of events. How would you score them before knowing the outcomes?',
      'Choose one prediction of your own. Write down what a miss would look like while you can still be wrong.'],
    ['false-rhythm','Can a rhythm survive the loss of its drummer?',
      'In a story, a factory floor goes quiet every 17 minutes. One worker blames a machine timer. Another thinks everyone follows the loudest worker. What single observation would help you choose?',
      'Predict what each explanation says about the next quiet spell. What event would make your predictions diverge?',
      'The quiet also happens on days that worker is absent. What versions of each explanation still survive?',
      'A manager proposes moving one break by two minutes. Predict what would happen under each explanation before seeing the result.',
      'Where else do people infer an organizer from a pattern that individuals might create by following each other?']
  ]);
  topic('Self-awareness & identity', [
    ['stranger-diary','Would you recognize yourself without your name?',
      'Imagine reading three anonymous diary entries, one of them yours from ten years ago. Which detail would make you recognize yourself? Which detail would make you resist the match?',
      'Write a question my younger self might ask me back. Treat anything you infer about my past as a guess.',
      'A close friend picks a different entry for you. What might they know about your actions that your memory leaves out?',
      'Suppose your old entry endorses a belief you now reject. What connects its author to you besides a name?',
      'Write one question you would ask that earlier self before offering any advice.'],
    ['copied-memory','Which twin gets to keep the promise?',
      'In a thought experiment, two copies of a person wake with the same memories of promising to help a friend move. Only one needs to show up. Who owes the friend a call?',
      'Argue the case for the friend who expected help. Which version of personal identity would matter least to that friend?',
      'Argue first from the friend’s perspective, then from the perspective of the copy who wants a different life.',
      'If one copy goes and the other apologizes sincerely, has the original promise been kept? Which definition of identity did your answer use?',
      'What does the puzzle reveal about a real promise you have changed your mind about? A fictional example works too.'],
    ['advice-reversal','When do your exceptions become your real rule?',
      'Imagine you tell a friend that asking for help shows good judgment. Later you hide your own unfinished work. What belief would make both actions sensible to you at the time?',
      'Tell me the most charitable interpretation of the double standard. Then ask for a detail that could overturn it.',
      'Maybe you fear being measured, or maybe you know something about this particular setting. What detail would distinguish the two?',
      'Trade places with the friend and keep the facts fixed. Which piece of advice changes sides?',
      'Name one small situation where you could test the rule you actually want to live by.']
  ]);
  topic('Mental health, work & growth', [
    ['metric-friday','What did your most productive week cost?',
      'Imagine a week when your task count doubled and the one conversation you cared about never happened. By which measure was it a good week?',
      'Play the teammate who saw the calendar but never saw the checklist. What question would you ask before calling the week productive?',
      'Consider two explanations: the deadline protected important work, or the checklist gave you a way to avoid an awkward conversation. What points toward each?',
      'If a teammate had the same calendar, what constraint might you notice for them that you overlook for yourself?',
      'Choose one change small enough to reverse next week. What would tell you it gave something back?'],
    ['weight-of-tuesday','What counts as progress on a hard Tuesday?',
      'A fictional friend says a hard day erased a month of progress. Before replying, what would you ask about what “progress” meant to them yesterday?',
      'Offer two replies to the friend. In one, ask what would help. In the other, offer something specific they can decline.',
      'One possible reply offers encouragement. Another offers company and lets the day remain difficult. What might each reply miss?',
      'Suppose the most helpful thing was canceling a commitment. What would make that a thoughtful boundary in this situation?',
      'Give the friend two sentences they could actually hear on a hard day. Leave them room to tell you that you guessed wrong.'],
    ['learning-plateau','What if getting better feels like getting worse?',
      'An apprentice now hears flaws in her music that she never noticed before. She thinks she has regressed. Which recording would you ask her to listen to first?',
      'As the apprentice’s teacher, choose one piece of feedback you would deliberately hold back today. What would you listen for first?',
      'Her teacher can compare two performances blind, or ask her to mark errors in a third recording. What different ability does each exercise measure?',
      'Both tests improve, yet playing feels less joyful. Which meaning of growth has the test left out?',
      'Choose a skill where your eye may have improved before your hand. What evidence would let you be fair to both?']
  ]);
  topic('Riddles & paradoxes', [
    ['sealed-envelopes','Can one comparison reveal the heavy envelope?',
      'Three sealed envelopes look identical. Two weigh the same and one is heavier. You may compare two sides of a balance once. How can you identify the heavy envelope every time? Commit to a move before reading on.',
      'Give me one hint about the possible outcomes without naming which envelopes to weigh. Let me try again before giving the solution.',
      'How many distinct outcomes does a balance allow? How many possible locations must your move distinguish?',
      'Test your proposed move against all three possible locations. Is there any outcome that leaves two candidates?',
      'One solution weighs A against B. The heavier side identifies the envelope. A balance identifies C. If the odd envelope could instead be lighter, which inference breaks?'],
    ['average-trap','Can both workshops improve while the whole school slips?',
      'A school reports that the pass rate rose in both its morning and evening workshops, yet the combined rate fell. Can all three statements be true? Tell a story before using numbers.',
      'Invent a small example with groups of different sizes. Hide the totals until I predict which way the combined rate moves.',
      'Suppose learners switched from the easier workshop to the harder one. What happens to the influence of each rate?',
      'Try these counts. Last term the workshops passed 72 of 80 and 4 of 20. This term they passed 19 of 20 and 20 of 80. What happened to each rate and to the total?',
      'The workshop rates rose from 90% to 95% and 20% to 25%. The total fell from 76% to 39%. Which question should a parent ask before judging the teaching?'],
    ['two-price-tags','Which price did the sign forget to name?',
      'Two objects together cost 110 credits. One costs 100 credits more than the other. What is the lower price? Notice the first answer that comes to mind before checking it.',
      'Give me a way to check my proposed prices without telling me the answer. Ask which of the two conditions I checked first.',
      'Build the pair of prices implied by your answer. Do they satisfy both the total and the difference?',
      'Imagine explaining the puzzle to someone using two piles of counters. Which counters have to be shared evenly?',
      'Removing the 100-credit difference leaves ten credits to split. The prices are five and 105. Where else does checking only one condition let an attractive answer slip through?']
  ]);
  topic('Past, present & future', [
    ['two-obituaries','Who gets to edit the past?',
      'Two towns write obituaries for the same mayor. One remembers a bridge. The other remembers the homes removed to build it. If you have room for one paragraph in a history book, what goes in it?',
      'Write a question a resident of each town might ask the historian. Make both questions answerable by evidence.',
      'Name one record that could establish what happened and one interview question that could recover what it meant to someone.',
      'One former resident remembers the year incorrectly. How much does that affect what you believe about their experience?',
      'Write the first sentence of the paragraph so both towns would recognize the event, even if neither agrees with your conclusion.'],
    ['not-yet-memory','Which part of today will the photograph erase?',
      'Imagine taking a picture of this ordinary room so that somebody in 2126 can understand your life. What belongs in the frame, and what will the photograph systematically miss?',
      'You are cataloging my photograph in 2126. Offer two incompatible captions that would both fit the visible details. Ask what the frame omits.',
      'A historian mistakes the most visible object for the most important one. What short caption could correct the error?',
      'Choose one sound, obligation or unspoken rule that shapes this room. How would you preserve it without staging the picture?',
      'Turn back to the room as it is now. What did imagining a future reader let you notice for the first time?'],
    ['future-inheritance','What can a future generation refuse?',
      'A town can fund a seawall that lasts a century or a shorter-lived system its grandchildren can redesign. What do people alive today owe people who cannot vote yet?',
      'Represent one future resident who disagrees with me. Which assumption about their world are you least entitled to make?',
      'Speak for a future resident who thanks the builders for permanence. Then speak for one who resents inheriting their choice.',
      'Which present-day measurement would change your answer? Which part depends on a value that no measurement can settle?',
      'Write a note to a future resident explaining what you chose, what you feared, and which decision you tried to leave in their hands.']
  ]);
  topic('Conspiracy theories & evidence', [
    ['missing-minutes','What would a missing page actually prove?',
      'In a fictional town archive, minutes are missing for the meeting before a contract award. One resident suspects coordination. Another suspects a filing error. What observation would each explanation predict elsewhere in the archive?',
      'Design a fair comparison sample from this fictional archive before you know which other pages are missing.',
      'Before opening more folders, choose comparison meetings and write down what would lower your confidence in each explanation.',
      'Suppose the gap occurs in every meeting scanned by one machine. Which claims have weakened, and what question remains open?',
      'Write a public update a resident could correct with new evidence. Keep the strongest claim no broader than the records.'],
    ['many-headlines','How many witnesses are hiding inside six headlines?',
      'Six fictional outlets repeat the same allegation about a museum auction. The sixth calls them “multiple independent reports.” What would you count as independent evidence?',
      'Draw the source chain in words. Where could a genuinely independent witness enter, and which part of the allegation could they check?',
      'Trace an imaginary chain in which five stories quote the first. Which details could still come from genuinely distinct observations?',
      'One reporter publishes a dated catalog and another interviews somebody who only read the catalog. How many independent routes support the claim about the date?',
      'Write the sentence you would publish if the date checks out but the alleged coordination remains unresolved.'],
    ['sealed-prediction','Can a theory name a world in which it is wrong?',
      'A fictional club predicts a local festival will be canceled by a secret committee. When it goes ahead, the club says its warning forced the committee to retreat. What could have counted against the theory before the festival?',
      'Give the club’s claim its strongest testable form. What result would lower your confidence even if believers could explain it away?',
      'Give the strongest ordinary alternative and the strongest coordination hypothesis. Name one possible observation that favors each.',
      'What extra assumption did the explanation acquire after the prediction failed? When could a new assumption be justified?',
      'Draft a prediction for next year with an outcome, a deadline and a rule for updating either way. What uncertainty can honestly stay open?']
  ]);
  topic('Ethics & belonging', [
    ['forgotten-language','What dies when the last shared joke disappears?',
      'Imagine a language survives in a perfect dictionary, but nobody speaks it at breakfast anymore. What, if anything, has been lost?',
      'Translate a made-up family joke literally. Then tell me what you would need to know to decide whether it was kind or cruel.',
      'A machine can translate every sentence and explain every pun. Which parts of your answer survive that change?',
      'Two young speakers invent a joke their grandparents dislike. Is that damage, continuity or something else?',
      'Think of a phrase shared by a family, team or neighborhood. What would a visitor need to do to understand when to use it?'],
    ['fair-queue','Would you trade your place in a perfectly fair queue?',
      'A repair crew fixes homes in the order requests arrive. One resident cannot use the online form. Is the queue fair? Identify exactly where your answer begins.',
      'Take the perspective of the last person in line. Which exception could they endorse before knowing who will benefit?',
      'Offer a rule that accounts for urgency. Now imagine the person making urgency claims has more time to document them. What new problem appears?',
      'Which exception would you accept even if it moved you to the back of the queue?',
      'Design one small change and one public measure that could reveal whether the change helped the people it was meant for.'],
    ['forgiven-debt','Can generosity survive an audience?',
      'A shopkeeper quietly forgives a debt. A neighbor posts the story and donations flood in. Does learning about the donations change how you judge the original act?',
      'Retell the same act of generosity in the debtor’s voice. Mark the feelings you had to imagine rather than observe.',
      'Imagine the shopkeeper knew the neighbor was filming. Which possible motive becomes more likely, and which motives could coexist?',
      'Now tell the story from the debtor’s point of view. What did praise for the shopkeeper make easy to overlook?',
      'How would you retell the story if the debtor had a say in every detail that appeared?']
  ]);
  const readings = {
    'trial-envelope': ['FDA guidance on designing psychedelic clinical investigations', 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/psychedelic-drugs-considerations-clinical-investigations'],
    'interview-coder': ['Watts and colleagues on how participants described connectedness and acceptance', 'https://doi.org/10.1177/0022167817709585']
  };
  for (const entry of entries) entry.reading = readings[entry.id];
  window.DDL.conversations = entries;
})();
