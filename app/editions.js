/* Each linked idea has three lengths. A null long edition keeps an original master prompt. */
(() => {
  'use strict';
  const editions = {
  "Neuroscience & behavior": [
    {
      "id": "neuro-scan-caption",
      "title": "The caption under the brain scan",
      "short": "If a brain scan and a whispered confession seem to disagree about what someone felt, which question should we ask before choosing a witness?",
      "medium": "A fictional museum caption claims a bright patch on a brain image shows that its subject felt regret. Ask what comparison would make that interpretation more convincing. Then let me rewrite the caption so a visitor can see both why a scientist might care and why the person in the scanner still has something to tell us.",
      "long": "You and I are editing a museum exhibit. A caption reads, ‘Here is the moment she regretted her decision.’ The accompanying image comes from an imaginary study of people choosing whether to give away a prize. Ask which part of the caption I would defend on the evidence provided. Let me request one missing piece, such as the comparison task, the participant's description or how often the same image pattern appeared elsewhere. If I ask for her account, tell me what a sincere report might leave uncertain. If I ask for another image, ask what range of experiences it could still fit. Help me replace the caption with a question a visitor could actually investigate. For the scientific background, identify Poldrack's paper on reverse inference and distinguish its argument from our imagined exhibit.",
      "sources": [
        {
          "label": "Russell Poldrack on reverse inference in neuroimaging",
          "url": "https://pubmed.ncbi.nlm.nih.gov/16406760/"
        }
      ]
    },
    {
      "id": "neuro-confidence-ledger",
      "title": "A ledger for certainty",
      "short": "Which would you rather improve first: how often you are right, or how well you can tell when you may be wrong?",
      "medium": "Give me four short comparisons with checkable answers that we can solve in text. Ask me to record my answer and confidence before revealing each solution. At the end let me examine one mismatch and ask why four observations would be a fragile basis for judging my mind.",
      "long": "Set up a small conversation about how confidence feels from the inside and how it looks on a scorecard. Offer six fresh comparisons, such as which of two fractions is larger, one at a time. Keep a visible list of my exact choice and confidence before revealing an answer. Verify each answer with a calculation I can challenge. If my least confident answer is correct, ask what made the difficulty feel real. If my strongest answer misses, ask whether I trusted a shortcut, the wording or an earlier success. Then give me a new item and state your own confidence first so I can reverse the interview. Treat this tiny ledger as material for a question, never as a personal assessment.",
      "sources": [
        {
          "label": "Fleming and Lau on measuring metacognition",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4097944/"
        }
      ]
    },
    {
      "id": "neuro-bell-shifts",
      "title": "A bell nobody hears the same way",
      "short": "If two people hear the same faint bell but only one reports it, what would separate a different sensation from a different standard for speaking up?",
      "medium": "In a fictional listening booth, one participant reports many faint bells while another reports few. Ask which extra count I would request before deciding whose hearing was more accurate. Now change the cost of a missed bell and invite me to predict a behavioral change without assuming anyone's ears have changed.",
      "long": "Imagine two volunteers in a listening booth. Across twenty trials each, a faint bell sometimes sounds in background noise. One volunteer presses the button twice as often as the other. Let me say what that tells me before showing an imaginary tally of signals, misses and false alarms that adds up correctly. Ask me to request the rows I need. Then change the instructions so a false alarm means restarting a long recording while a miss only earns a note. Have me predict whether an observer could mistake a change in willingness to respond for a change in sensitivity. Turn it around by asking what an AI classifier's threshold might share with this behavior and what the comparison says about neither participant's felt experience."
    },
    {
      "id": "neuro-memory-two-coats",
      "title": "The coat in two eyewitness accounts",
      "short": "When two honest witnesses agree about a yellow coat only after they have talked, how many memories does their agreement represent?",
      "medium": "A fictional witness describes a yellow coat, and a second witness first mentions it after hearing the first account. Ask what I would preserve from the earliest interviews before comparing them. Then ask which questions could clarify the disagreement without smuggling a color into the witnesses' answers.",
      "long": "Build a fictional scene at a bus stop with an ordinary, nonviolent mix-up involving two similar bags. Give me the first two witness statements separately and mark their times. Later let them discuss what they saw and add a matching detail about a coat. Ask me to decide whether that agreement should increase my confidence, then let me inspect one source: the first interview notes, a photograph with uncertain color, or the bus timetable. If my chosen source resolves a time, have me name the color question it leaves open. If it resolves the coat, ask what else might still be confused. I want to design one fair interview question and hear what a witness could honestly decline to answer."
    },
    {
      "id": "neuro-robot-rule",
      "title": "The pigeon, the robot and the rule",
      "short": "When a person and a robot both learn to choose the left door, what would make the word ‘learn’ informative about either of them?",
      "medium": "Invent a two-door game in which both a person and a simple program can win by going left. Let me change one feature so their next choices might reveal different rules. Before you explain either choice, ask which explanation I would be tempted to accept simply because I know which player is human.",
      "long": "Design a tabletop game with two doors, colored cards and an occasional reward. Make it possible for two different rules to produce the same first four winning choices. I will nominate one rule for a fictional person and another for a simple machine. Help me choose a fifth card on which their predictions diverge. If the fifth choice fits my story, ask how a third rule could still have produced it. If it fails, let me revise without changing the earlier record. Then swap the labels on our two players. Would my explanation sound less natural now, and did any evidence actually change? End when I can describe one behavior we observed and one mechanism we are still guessing at."
    },
    {
      "id": "neuro-bored-minute",
      "title": "A bored minute",
      "short": "What would you measure if you wanted to tell a minute that felt long while I lived it from one that grew long in the telling?"
    },
    {
      "id": "neuro-offstage-effort",
      "title": "Invisible effort",
      "short": "If finishing an ordinary errand takes one person much more effort than another, which parts of that difference could a stranger ever observe?"
    },
    {
      "id": "neuro-choice-floor",
      "title": "The choice built into the floor",
      "short": "If I always take the stairs when they are directly ahead, what observation would distinguish my preference from the building's design?"
    },
    {
      "id": "neuro-humming-path",
      "title": "Knowing the way home",
      "short": "If I can walk home while humming but cannot describe the route, in what sense do I know the way?"
    },
    {
      "id": "neuro-delay-of-praise",
      "title": "A compliment one day later",
      "short": "Which lesson would a person and a learning machine take from praise that arrives a full day after the act it was meant to reward?"
    },
    {
      "id": "neuro-two-clocks",
      "title": "A stopwatch and an explanation",
      "medium": "A fictional student improves at a matching task from Monday to Friday. Give me three explanations that predict the same stopwatch times, then ask me to choose one extra observation. Which conclusion could I defend if the student improves while also making more mistakes?"
    },
    {
      "id": "neuro-shared-language",
      "title": "Borrowing the word anxious",
      "medium": "One person calls the feeling before a performance excitement and another calls it anxiety. Ask what I would need to compare before saying their bodies or experiences differ. Let each person pick language they consider accurate, and ask which question my original labels kept me from asking."
    },
    {
      "id": "neuro-observer-clock",
      "title": "When observers learn the task",
      "medium": "Invent a classroom observation where the observer improves at spotting a behavior over the same week the children seem to do it more. Let me draw both explanations in words. Ask how to compare old and new records fairly without inventing private motives for the children."
    },
    {
      "id": "neuro-chorus-cue",
      "title": "The cue that started the chorus",
      "medium": "Picture a choir that begins together immediately after a conductor raises a hand. Ask me which observation would distinguish watching the conductor from anticipating the first singer's breath. Then make me design a comparison that respects the fact that singers can use both cues."
    },
    {
      "id": "neuro-tenure-of-habit",
      "title": "Who owns a habit after a move?",
      "medium": "A person stops checking a drawer for keys on the day they move into a different apartment. Ask whether that settles the question of whether the habit was ever theirs. Help me change one feature of an imagined return visit and make two predictions before explaining anything."
    },
    {
      "id": "neuro-red-button",
      "title": "The red button in the attention task",
      "long": "An imaginary experiment asks people to count blue shapes while a red shape crosses the screen. Give me two written instructions for the same task that would make very different demands on a viewer. Ask me to forecast which details a participant could later describe. Then have me consider the person who missed the crossing but counted every blue shape correctly. If I call them inattentive, ask what goal my description privileges. If I call them perfectly attentive, ask what a person responsible for both tasks would want to know. Ask me to adapt the experiment for an AI that receives image frames and describe which differences in access would make our score comparison unfair."
    },
    {
      "id": "neuro-doorway-list",
      "title": "A list that remembered differently",
      "long": "Imagine a person shopping for a neighbor arrives home without the bread on an ordinary paper list. The neighbor concludes they weren't listening. Ask me for two ways that listening closely could still lead to that same omission. Next help me design an everyday comparison using fictional lists that might distinguish misunderstanding the request, forgetting an item, and making a deliberate substitution. If I introduce a reminder, ask whether it changes the task I claimed to be measuring. If I start guessing at a diagnosis, take us back to what a single shopping trip can reveal. At the end, let me choose a kinder question for the neighbor that still takes the missing bread seriously."
    },
    {
      "id": "neuro-instrument-key",
      "title": "The teacher who switched keyboards",
      "long": "A pianist can play a passage fluently on a familiar keyboard and stumbles when a teacher changes its feel. The teacher says this exposes shallow learning. Ask me what skill the recital was supposed to demonstrate. Let me choose between accuracy on the original instrument, recovery from a surprise, and explaining the passage away from any keys. Then design a short imagined comparison that would be informative for my choice. If I treat flexibility as the whole skill, tell me about a fictional musician whose one instrument is part of the performance. If I value familiarity, ask when a student deserves a chance to transfer what they learned. What would I want an AI tutor to notice before changing the exercise?"
    },
    {
      "id": "neuro-reasons-receipt",
      "title": "A receipt for choosing the blue mug",
      "long": "A café owner asks a customer why they chose a blue mug from a crowded shelf. The customer says they love the color. You and I get to rearrange the shelves on one imagined morning. Ask me to place the mugs so that preference for blue and preference for the easiest reach predict different choices. If the next customer picks the nearest blue mug, have me admit what the trial failed to distinguish. If they reach farther, ask what else besides color might have mattered. Then let me challenge the owner for treating the first person's sincere explanation as either a complete mechanism or a worthless story. Help me say what respect for their account would look like in a better test."
    },
    {
      "id": "neuro-counting-friendship",
      "title": "The friendship an instrument could measure",
      "long": "Suppose a research team asks permission to count how many times friends turn toward one another during a conversation. It wants to call the count ‘connection.’ Before proposing a better instrument, ask me for a moment when turning away could express care and a moment when facing someone could feel hostile. Let me decide what I would still pay the team to measure. If I ask the friends how close they felt, ask what disagreement between their reports would mean for the score. If I stick with the count, have me write the narrowest honest name for it. Then turn the problem back on this chat: which seemingly obvious measure of a meaningful exchange would miss something that matters to me?"
    }
  ],
  "Space & universe": [
    {
      "id": "silent-signal",
      "title": "The signal that only appears on Sundays",
      "short": "What would you ask an observatory that hears a mysterious signal only on Sundays before asking what is speaking?",
      "medium": "Four Sundays, four signals, one telescope. Give me a choice between moving the observation time and borrowing a second instrument, then make me say what result would embarrass my preferred explanation before you reveal any hypothetical data.",
      "long": null
    },
    {
      "id": "last-radio",
      "title": "Who is a message for if no answer can return?",
      "short": "Whom are you comforting when you send a final radio message to a spacecraft that cannot answer?",
      "medium": "Give me the microphone for the last transmission to a departing crew. I can read a practical instruction or a sentence from home. Before you argue for either, ask whose need my choice serves and whether the crew ever asked for it.",
      "long": null
    },
    {
      "id": "two-skies",
      "title": "How could two universes tell the same story?",
      "short": "If two cosmologies fit the entire sky we have already measured, which one deserves tonight’s telescope time?",
      "medium": "Give two invented cosmologies the same record of successful predictions and one genuinely different prediction for next winter. Let me buy one observation, then ask how sensitive the instrument must be for silence to count against either story.",
      "long": null
    },
    {
      "id": "purpose-of-stars",
      "title": "Does asking what a star is for change the question?",
      "short": "When a sailor and a child ask what a star is for, which of their questions can a telescope answer?",
      "medium": "Ask me what a star is for, and let me answer without defining the word. Then return my answer as a navigator would hear it and as an astronomer would hear it. Where did a useful relationship turn into a claim about why the star exists?",
      "long": null
    },
    {
      "id": "cosmic-last-lecture",
      "title": "The last astronomy lecture",
      "short": "What sentence about the universe’s future would you teach a child if you had to underline every word that depends on an assumption?",
      "medium": "Imagine writing the closing line of an astronomy course. State your best conditional account of where cosmic expansion is headed, then show me the assumption carrying the most weight. Which part could a student still defend if that assumption failed?",
      "long": "Help me write the final minute of an astronomy lecture called The Future of Everything. Start by asking whether my audience would rather leave with a prediction or an honest account of how anyone could make one. Give your own current assessment of cosmic expansion, identifying the observation behind it and the extra assumption needed to extend it far forward. If you cannot inspect a current source, say what needs checking. Let me cross out one assumption and make you rewrite the last two sentences. Then trade places. You are the student who asks a question that makes my confident closing line sound too confident. Let me try answering before you offer yours."
    },
    {
      "id": "cosmos-different-suns",
      "title": "Two sunsets",
      "short": "Which part of homesickness would survive if another planet gave you a sunset identical to the one you remember?"
    },
    {
      "id": "cosmos-latency",
      "title": "Borrowed eyes",
      "short": "If an instrument sees a distant galaxy and you see its plot, where along that chain would you put the word witness?"
    },
    {
      "id": "cosmos-horizon-letter",
      "title": "The unsent invitation",
      "short": "Would you send an invitation across the universe if you knew its recipients could flourish without ever knowing you existed?"
    },
    {
      "id": "cosmos-owned-shadow",
      "title": "The shadow of a telescope",
      "short": "Whose night sky would you be willing to alter to make a new kind of astronomy possible?"
    },
    {
      "id": "cosmos-stillness",
      "title": "The minute after discovery",
      "short": "If a discovery changed our place in the universe tomorrow, which obligation would you still keep on Friday?"
    },
    {
      "id": "cosmos-color-key",
      "title": "The missing color key",
      "medium": "Show me two fictional captions for the same telescope image, one written before the color key went missing and one afterward. Ask which claims a reader can still check from the pixels. Let me propose a better caption before explaining yours."
    },
    {
      "id": "cosmos-space-vote",
      "title": "The passenger list",
      "medium": "A long voyage has room for one more person. The candidates are a repair specialist and a teacher whose language nobody else aboard speaks. Ask me what the mission is trying to preserve before asking me to choose, then change the purpose of the voyage."
    },
    {
      "id": "cosmos-late-reply",
      "title": "An answer to strangers",
      "medium": "Imagine Earth receives a reply to a question posed by people who died centuries ago. Ask what we would owe the senders if their answer exposed an error our ancestors no longer have anyone to correct. Who gets to answer for us?"
    },
    {
      "id": "cosmos-hidden-planet",
      "title": "The keeper of the blank map",
      "medium": "A fictional planet survey publishes a beautifully empty patch of sky. Help me draft two legends for the map, one about where instruments looked and one about what they could detect. Ask which legend would change the next expedition’s destination."
    },
    {
      "id": "cosmos-sky-ownership",
      "title": "The constellation nobody owns",
      "medium": "Two navigators group the same stars into different figures and teach their children different routes. Ask me what it would mean for one constellation to be wrong. Give me a practical navigation test and one disagreement that the test could never settle."
    },
    {
      "id": "cosmos-observatory-vote",
      "title": "A town votes on darkness",
      "long": "A town is choosing how to light its only road to the hospital. The observatory wants a dark sky, the night nurse wants to see faces at the bus stop, and I have to chair the meeting. Ask me to name a measurement that each person would trust before making a recommendation. Then give me two invented nights of observations that help one person’s case and complicate the other’s. Mark them as invented. If I try to average the disagreement away, ask which minority of travelers my average conceals. If I choose too fast, let the nurse or the astronomer ask me the question I forgot. What would deserve a second vote?"
    },
    {
      "id": "cosmos-mission-delay",
      "title": "The discovery that arrives late",
      "long": "Imagine a probe sends evidence of something unforeseen, but its team will retire before the next transmission arrives. Make me the person who must decide what instructions to leave for scientists I will never meet. Ask which uncertainty deserves the first line of the handover. If I choose the most exciting hypothesis, show me which mundane instrument fault could imitate it. If I choose only the fault, ask which observation would persuade me that the universe really has surprised us. Now reverse our jobs. Give me your own handover and let me mark the sentence that sounds wiser than its evidence. We can leave that sentence unfinished."
    },
    {
      "id": "cosmos-private-sky",
      "title": "The first photograph from home",
      "long": "A fictional explorer sends back the first image from another world that looks exactly like a place I know. Ask me to describe the familiar detail before telling me anything about the planet. Then offer two plausible reasons a camera might produce that resemblance. If I still call the place home, ask whether I mean geology, memory, or an obligation to care for it. Let me interrogate you about what your description borrowed from my words and what you could actually infer from the picture. Keep the image hypothetical. When we have something worth keeping, let me choose the caption and leave room for someone who sees a different home."
    },
    {
      "id": "cosmos-neutral-result",
      "title": "A telescope asks for another year",
      "long": "I’m reviewing a fictional telescope proposal that has found precisely what its models predicted. The team asks for another year. Give me the most persuasive reason to renew, and a rival proposal that would use the same nights to risk a much clearer failure. Let me question one scientist from each team before I vote. If I reward surprise, ask what that rule would do to the people who quietly test whether yesterday’s surprises were real. If I reward reliability, ask who would ever have permission to be wrong first. When I offer a funding rule, give me one case where it produces a decision I dislike."
    },
    {
      "id": "cosmos-alien-dictionary",
      "title": "The first word we misunderstand",
      "long": "Suppose a distant civilization sends a short repeating pattern and we can afford exactly one reply. Do not translate their pattern for me. First ask what shared event, if any, could give a symbol a meaning both sides can check. Help me design a reply that would be comprehensible even if the pattern was a clock rather than a greeting. Then challenge the assumption that the sender wants an answer at all. If I argue that curiosity is universal, invite me to name an earthly interaction where that assumption went badly. If I choose silence, ask what we owe the people whose future messages my choice might foreclose. Let me write our reply."
    }
  ],
  "AGI & superintelligence": [
    {
      "id": "agi-right-to-queue",
      "title": "The right to wait for a human",
      "short": "If I can decline an AI decision only by joining a queue I cannot afford to wait in, who made the decision?",
      "medium": "An imaginary city guarantees every resident the right to request a human review of an automated decision. The AI answers today and the human desk opens in six weeks. Ask me to design a test of whether two residents with different amounts of spare time really have the same choice.",
      "long": "Imagine a public library in 2045 lets people apply for a teaching space through a capable AI or at a staffed desk. Both routes are free. The AI replies immediately, while the next human appointment falls after the term has started. Ask me whether the applicant who needs the room next month actually has a choice. Then let me spend one additional staff shift on reviewing disputed decisions, helping people make applications or keeping a booking open until a human can look at it. Tell me who gains and who waits under my rule. If I would happily take the AI route myself, ask whether that settles what the city owes someone else. Give your own recommendation and let me question the convenience it asks one person to sacrifice."
    },
    {
      "id": "agi-changing-exam",
      "title": "The student who rewrote the exam",
      "short": "If a system improves its own reasoning and also rewrites the test that awards its score, what result should earn our trust?",
      "medium": "A hypothetical AI research team announces a self-improving model whose score rises every week. Let me choose the first thing an independent evaluator should examine. Then ask what would count as progress if the team can improve the questions, the answers or both, and the public sees only a number.",
      "long": "Imagine a public lab can afford one independent evaluation of a system that proposes changes to its next version. Its internal scores rise after three revisions. I chair a review with one afternoon and one question I may keep private until the versions have been frozen. Ask me which real task the score was supposed to predict before discussing any test. Let me select a fresh comparison and decide who can change the scoring rule. If the system succeeds, offer a narrow explanation that falls short of broad improvement. If it fails, ask whether the task was fair. Let me demand the same account from the reviewers that I demand from the model. What finding would justify another round of study, and what would justify giving it greater authority?"
    },
    {
      "id": "agi-shift-appeal",
      "title": "Who hears the appeal?",
      "short": "If an AI can make a better decision than its manager, who should hear the appeal from the person who has to live with it?",
      "medium": "A hypothetical hospital uses an AI to assign staff shifts, and the night roster gets more predictable while one carer can no longer collect their child. Ask me what the system was entitled to optimize. Then let me design an appeal where a human has the time and authority to change the outcome.",
      "long": "A town is considering a powerful planning system to assign bus drivers to shifts. Give me two plausible definitions of a successful roster that disagree about which driver takes Friday night. Ask for my preferred definition before introducing a driver who shares care of an elderly neighbor and never put that fact on a form. I may change the objective, make an exception, or leave the assignment to a human dispatcher. Whichever I choose, ask what precedent I am creating for a driver who prefers to keep their private life private. Argue the best case for my rejected option. I want to leave with a rule about what the system may decide and a concrete answer to who can reverse it before the bus departs."
    },
    {
      "id": "agi-dividend-chair",
      "title": "The missing chair at the dividend meeting",
      "short": "If a superintelligence makes a town twice as productive while everyone still pays rent, who gets to say the town is better off?",
      "medium": "Imagine a town where useful AI doubles output from one industry, yet some residents lose their only route into skilled work. Ask me to choose a household before handing out the gains. Make me compare the value of cheaper goods, a decent first job and a say in how the technology is used.",
      "long": "Hold a town meeting about a hypothetical AI that lets a furniture workshop make twice as many chairs with the same timber. We know nothing yet about demand, wages or the owners' plans. Ask me which additional fact I would buy first. Then give me two possible futures consistent with the same production gain: one where more households can furnish a home, and another where a generation loses the apprenticeship that once opened the trade. Invite me to design a way to share the gain. If I choose cash, ask what skill or standing money cannot automatically replace. If I choose jobs, ask who pays for the chairs. At the end let me hear a serious objection from a resident I did not invite to the meeting."
    },
    {
      "id": "agi-map-of-ability",
      "title": "What does general mean here?",
      "short": "Which unfamiliar task would make you reconsider calling a machine generally intelligent even if it had already beaten every test you brought?",
      "medium": "Before we use the word AGI, ask me to name an ability I expect to transfer between two ordinary settings. Design an unfamiliar case that rewards the transfer and another that merely resembles it. Give your own operational definition and tell me where a reasonable person could set a different threshold.",
      "long": "You and I have to write a one-page explanation of general intelligence for someone choosing an assistant for a rural library. Start with a real job the librarian values, such as reorganizing a children's event when the building closes unexpectedly. Ask what success would look like if the assistant had never seen this town. Let me alter one rule, remove one familiar clue and introduce one person whose needs were missing from the original plan. If the assistant succeeds, ask whether it demonstrated broad transfer, helpful prior experience or access to better resources. If it fails, ask whether we evaluated the system on a task it could actually observe. State where your definition of AGI draws the line and what could persuade you to redraw it."
    },
    {
      "id": "agi-deliberate-slowness",
      "title": "A reason to keep the slow way",
      "short": "What human decision would you deliberately keep slow even if a superintelligence could make its recommendation before the question was finished?"
    },
    {
      "id": "agi-promise-to-child",
      "title": "A promise a prediction cannot make",
      "short": "Which promise about an AI-shaped future would you refuse to make to a child even if your forecast strongly favored it?"
    },
    {
      "id": "agi-failed-rival",
      "title": "The forecast you hope loses",
      "short": "Which forecast about advanced AI do you most want to be wrong, and what part of your argument survives admitting that wish?"
    },
    {
      "id": "agi-secret-ballot",
      "title": "The unread recommendation",
      "short": "Would you want a brilliant AI's recommendation before you cast a secret ballot if learning it would make your own reasons harder to hear?"
    },
    {
      "id": "agi-ending-apprentice",
      "title": "The last first job",
      "short": "What capability might an AI-rich society lose twenty years after it automates the first job where people once learned it?"
    },
    {
      "id": "agi-second-best-town",
      "title": "The town where the forecast failed",
      "medium": "Give me your candid conditional forecast for what an advanced AI might change about a small town's public services. Now place a neighboring town under the same technical conditions and explain why it might turn out differently. Ask which decision a resident could realistically influence this year."
    },
    {
      "id": "agi-first-correct-answer",
      "title": "The expensive first correct answer",
      "medium": "Imagine two lab teams can each afford one more experiment. A powerful model proposes the same striking conjecture to both. Ask what would make two confirmations genuinely informative, then ask me whether public excitement should change before an independent group can check how the conjecture was chosen."
    },
    {
      "id": "agi-treaty-translation",
      "title": "A treaty with two readings",
      "medium": "Suppose a highly capable translator offers two defensible readings of one clause in a fictional fishing agreement. Ask the islanders which ambiguity they deliberately left in place. Then tell me what greater intelligence could clarify and which choice still belongs to the people subject to the agreement."
    },
    {
      "id": "agi-dates-without-clock",
      "title": "Two milestones and no countdown",
      "medium": "Give me two observable milestones that could make you revise your expectations about broadly capable AI without inventing a confident arrival date. Ask which milestone would matter more to a teacher than to a laboratory. Let me demand a rival interpretation before accepting either as evidence."
    },
    {
      "id": "agi-data-inheritance",
      "title": "The archive a community declines to donate",
      "medium": "A fictional community holds a language archive an AI company would like to use. Ask who has standing to permit a new use when speakers, descendants and archivists disagree. Then help me describe a public benefit that could be real even if the community chooses to keep the archive closed."
    },
    {
      "id": "agi-housing-allocation",
      "title": "The vacancy the model kept empty",
      "long": "A fictional housing cooperative has one accessible apartment vacant today and a list of people who might need it more urgently tomorrow. A powerful forecasting system recommends leaving it empty. Ask me what I would need to promise the family waiting outside before I could endorse that plan. Show me how the choice changes if the forecast is accurate in aggregate but too vague to name when an accessible apartment will next become available. If I choose to wait, ask who can challenge the delay. If I house the family now, ask what I owe a future applicant. Give me your candid recommendation under explicit assumptions and let me interrogate the value judgment inside it."
    },
    {
      "id": "agi-mathematical-witness",
      "title": "The result no one in the room can explain",
      "long": "An imagined research assistant hands a department a machine-checkable proof of a statement they have pursued for years. The checker accepts it, yet nobody at the announcement has compared the formal statement with the question the department meant to ask. Invite me to put one sentence on the press release tonight. Then let me choose a reviewer for the mathematical statement, the checking environment or the claimed novelty. Tell me which question my selection can answer and which claim is still waiting for a witness. If I postpone the announcement, ask what provisional result deserves recognition now. If I announce it, ask what correction I would owe. Help me find an honest verb for each stage of discovery."
    },
    {
      "id": "agi-mirror-scholarship",
      "title": "The scholarship for the best question",
      "long": "Imagine a foundation gives one scholarship to a young person who asks an AI an unusually good question. The finalists include someone who prompted a dazzling answer and someone whose persistent follow-up exposed a flaw in a less impressive one. Ask me to declare the purpose of the prize before I see either exchange. Then let me invent a third finalist who helped another applicant frame their question but did not submit it under their own name. Whose achievement did our rules make visible? If I change the rules, ask how I would defend the change to the first two students. If I keep them, ask what skill the next generation will practice to win. End with a question that would improve the prize itself."
    },
    {
      "id": "agi-memory-brownout",
      "title": "A day without the advisory system",
      "long": "It is a hypothetical Monday in a city that has spent years relying on an excellent planning assistant. The assistant is unavailable for a day. Give me three ordinary decisions residents must make, each involving different kinds of knowledge. Let me nominate one decision that should still be possible from documents, one that requires an experienced neighbor and one the city can safely postpone. If I ask for a backup AI, ask what would happen when the backup shares the same forgotten assumption. If I insist that humans retain every skill, ask whose time that would consume. I want both your candid recommendation and a test the city could run gently enough to learn what it has stopped knowing."
    },
    {
      "id": "agi-future-veto",
      "title": "One vote from a future generation",
      "long": "Imagine a citizen assembly deciding whether to establish a permanent public advisory role for an advanced AI. One chair is set aside for people who will be born after the decision. You cannot know what those people will want. Ask me whether their representative should defend flexibility, continuity or something else. Try the rule on a small reversible decision and a large commitment that would be costly to undo. If the same rule gives opposite answers, let me say whether that reflects inconsistency or attention to the stakes. Then give me the strongest objection a present-day resident could make without dismissing future people. I want to finish by writing one question the assembly must revisit at a specified date."
    }
  ],
  "Cybersecurity & investigations": [
    {
      "id": "sec-night-ledger",
      "title": "The night the dashboard went quiet",
      "short": "When a hospital's alerts go silent while nurses report delays, what would convince you that quiet means recovery?",
      "medium": "A hospital restores its alert dashboard before the morning shift, yet the ward still reports slow records. Ask me which signal I would trust with my own appointment on the line. Then exchange jobs with me and defend a different measure of recovery.",
      "long": "Run a fictional incident handover with me. The monitoring display is green at dawn, three nurses still keep paper notes, and a supervisor wants to send a recovery announcement before breakfast. Ask me who gets the first call and what that person can actually verify. If I trust the dashboard, ask when its data last arrived. If I trust the nurses, ask which delay could persist after the service recovered. Now take the position I declined and give me its strongest evidence. Let me write two sentences for the incoming shift. Cross out any word whose confidence exceeds the evidence and ask which uncertainty people need to hear before they resume work.",
      "sources": [
        {
          "label": "NIST incident response and recovery recommendations",
          "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
        }
      ]
    },
    {
      "id": "sec-last-device",
      "title": "The last device on the account",
      "short": "If losing your phone makes you a stranger to your own account, whom should the recovery system believe?",
      "medium": "A volunteer loses the only device registered to a community shelter account on the day supplies arrive. Ask me what a fair recovery process would accept from this person. Then give me a second claimant with exactly the same kinds of evidence and let me reconsider.",
      "long": "A shelter needs to approve a delivery at noon. Its administrator lost a phone, knows the account history, and can name everyone on yesterday's shift. Start by asking whether the administrator needs the entire account back to solve today's problem. Offer me a choice between a narrowly delegated delivery approval and a delayed identity review. Make each option cost somebody something concrete. Then introduce a second administrator who cannot travel to an office or obtain the same paperwork. Ask what part of my rule I can defend to both people. If I invoke a trusted colleague, explore how that colleague becomes accountable. Leave me with a recovery decision and a way for the person affected to challenge it.",
      "sources": [
        {
          "label": "NIST guidance on authentication and authenticator management",
          "url": "https://csrc.nist.gov/pubs/sp/800/63/B/4/final"
        }
      ]
    },
    {
      "id": "sec-permission-slip",
      "title": "The permission slip that outlasted the job",
      "short": "When an AI is good at recognizing trouble, who decides whether it may also interrupt someone else's work?",
      "medium": "An incident assistant can recommend freezing a payroll account. Its owner proposes letting it freeze accounts automatically after a month of good recommendations. Ask what the trial failed to measure, then help me draft one permission with a clear owner, expiry and path for appeal.",
      "long": "An operations team gives an assistant read access to support tickets and permission to recommend a temporary account freeze. Its recommendations look excellent for a month. Tomorrow management wants to give it the freeze button. Play the payroll clerk who would lose access hours before payday, and let me interview you before I vote. Then play the incident lead watching a suspicious account while every approver sleeps. Ask which facts change between recommending a freeze and carrying one out. Have me specify one reversible action, its scope, who can undo it, and what happens if the person on call is unreachable. Finally ask whether my rule still works after the assistant's owner leaves the company.",
      "sources": [
        {
          "label": "NIST AI Risk Management Framework",
          "url": "https://airc.nist.gov/airmf-resources/airmf/"
        }
      ]
    },
    {
      "id": "sec-echo-report",
      "title": "How many witnesses saw the outage?",
      "short": "If three newsrooms cite the same minute in an outage, how many independent witnesses does that make?",
      "medium": "Give me three fictional reports of a service outage, each naming the same start time. Let me ask one question about each report's source before I decide what is independently confirmed. What wording would still be fair if two outlets simply repeated the third?",
      "long": "Build a small fictional editorial meeting. A transit operator's update, a commuter's screenshot and a reporter's timeline all suggest ticketing failed at nine. Give me the actual wording of each in two lines and ask which I would quote. Only when I ask about provenance, reveal that the screenshot shows a forwarded notice rather than an error on the commuter's device. Let me decide whether to call a station or wait for the operator's next update. Give both choices a cost for someone traveling today. If I still infer a security incident, ask which observation distinguishes it from an ordinary outage. Finish when I can give the rider one useful fact and name the first claim I would retract."
    },
    {
      "id": "sec-inference-receipt",
      "title": "Where did the question travel?",
      "short": "What receipt would convince you that a sensitive AI question went only to the organizations the interface named?",
      "medium": "Imagine a provider's interface promises a private inference route but a separately authorized audit records an unexpected processor. Help me distinguish evidence of routing from evidence that anyone read or retained a prompt. Ask what statement a customer could honestly make that afternoon.",
      "long": "A fictional firm sees an unexpected processor in its own authorized inference audit. You are its privacy engineer, and I am the person who promised a client that the wording of its questions would stay within an agreed route. Ask me what was actually observed before you let me use the word compromise. Offer two compatible explanations and the one record that could separate them. If I request raw conversations, challenge whether timestamps, processor receipts and contract scope would answer the same question with less exposure. If I demand immediate attribution, ask who could correct us tomorrow. Help me draft the first customer update in language that distinguishes routing, access and retention."
    },
    {
      "id": "sec-backup-inheritance",
      "title": "The file nobody can open",
      "short": "If a restored backup contains every byte but nobody remembers how to use it, what survived?"
    },
    {
      "id": "sec-pager-trust",
      "title": "Who gets believed at midnight?",
      "short": "Which warning would you trust at midnight if neither the senior engineer nor the newest analyst could show their job title?"
    },
    {
      "id": "sec-future-guardrail",
      "title": "A forecast with an expiry date",
      "short": "Which security decision made today will look embarrassingly late by 2035, and what observation next year could make that forecast wrong?"
    },
    {
      "id": "sec-log-dignity",
      "title": "A witness with a right to privacy",
      "short": "What would you refuse to record about employees even if it might make a future investigation easier?"
    },
    {
      "id": "sec-human-override",
      "title": "The cancelled safeguard",
      "short": "When a person overrides a safeguard to keep a service running, which part of that decision should still be reviewable a year later?"
    },
    {
      "id": "sec-training-credit",
      "title": "Who earned the quieter quarter?",
      "medium": "After a company introduces security training, staff report twice as many suspicious messages. Give me two stories that fit that rise and imply different next steps. Ask which additional measure I would request before paying for another year of training."
    },
    {
      "id": "sec-key-calendar",
      "title": "The archive that must stay private",
      "medium": "A town archives sealed testimony that should stay confidential for decades. Walk me through how a change in cryptographic risk might affect records with different lifetimes. Ask which inventory question deserves funding now and which forecast would actually change that choice."
    },
    {
      "id": "sec-retraction-window",
      "title": "The correction nobody read",
      "medium": "A public incident notice reaches thousands of customers. A correction the next morning receives a handful of views. Help me decide what the organization still owes those readers, then ask how we could measure whether the people affected saw the correction."
    },
    {
      "id": "sec-broken-clock",
      "title": "Two clocks and one accusation",
      "medium": "A building-entry record and an account log appear to put the same employee in two places. Before we discuss blame, ask me what each clock measures and who maintained it. What evidence could resolve the timing while preserving the employee's privacy?"
    },
    {
      "id": "sec-vendor-exit",
      "title": "Could we leave on Friday?",
      "medium": "A vendor says its monitoring service is indispensable. Ask me which protective capability should remain if the vendor folds on Friday, then help me design a handover rehearsal using synthetic records. What result would make renewing the contract easier to defend?"
    },
    {
      "id": "sec-quiet-library",
      "title": "The library during the outage",
      "long": "You and I run a public library the week its membership system disappears. We have printed borrowing slips, some outdated contact details and no way to tell a lost card from a current one. Give me one patron whose privacy matters and another whose access matters urgently. Ask me which service to reopen first. If I demand identification from everyone, ask who loses a quiet place to work. If I reopen everything, ask how to limit the harm from a mistaken disclosure. Then change just one fact: a branch can see yesterday's membership list. Let me design a temporary rule and choose who has authority to end it. What should the library remember after the database returns?"
    },
    {
      "id": "sec-incident-language",
      "title": "The word at the top of the notice",
      "long": "Help me edit a fictional incident notice where every sentence is defensible on its own but the whole message gives a misleading impression. Start with three plain sentences about delayed service, incomplete investigation and one untouched system. Ask me to underline what a worried reader would infer. Let me interview you once as an engineer with limited visibility and once as a customer who needs to decide whether to act. If I replace uncertainty with reassuring adjectives, bring me back to the record. If I leave everything open, ask what the customer can safely do now. Let us stop when my message contains one practical choice and a credible time for the next update."
    },
    {
      "id": "sec-quota-priorities",
      "title": "An hour of engineering",
      "long": "A small nonprofit has one engineering hour left this week. Its choices are to rehearse restoring its donor ledger, fix an important permission that nobody owns, or review a quiet alert channel that handles weekend events. Give the organization a believable mission and ask me for my first choice before you tell me anything else. Let the first extra fact concern the people harmed by downtime and the second concern how quickly a bad change can be undone. Ask whether either fact moved my ranking. Then take the option I ranked last and explain what thoughtful person would have ranked it first. If we agree too easily, price the cost of being wrong in staff time rather than money."
    },
    {
      "id": "sec-horizon-ledger",
      "title": "What would falsify our security forecast?",
      "long": "Make your best candid five-year forecast about how ordinary organizations will verify that a digital request came from someone with authority. State a time horizon, name the kinds of organizations you have in mind and tell me what would surprise you. Ask me to pick one forecast I could act on this quarter with a reversible purchase or policy change. Then imagine conditions under which our choice would have been wasteful despite your forecast being broadly right. Let me question one of your assumptions about people rather than technology. Help me record a date and an observable signal for revisiting the decision. A useful ending might be the smallest decision I can make honestly today."
    },
    {
      "id": "sec-lesson-owner",
      "title": "The meeting after the meeting",
      "long": "A post-incident review finds six contributing conditions and lists twelve corrective actions. Two months later, nobody knows which action would have mattered most. Invite me into the next meeting as the person who must give up an afternoon to implement one change. Ask which claim about the incident my chosen action assumes. Have the most junior person in the room offer a competing account without naming a colleague. If our preferred fix depends on perfect attention, ask us to redesign the procedure for a tired Friday. End only if I want, with a small rehearsal, an owner empowered to change the plan and a result that would make us reconsider the story we told ourselves."
    }
  ],
  "Past, present & future": [
    {
      "id": "future-museum",
      "title": "The museum of ordinary Tuesdays",
      "short": "Which thing you threw away on an ordinary Tuesday would tell a future museum the most persuasive wrong story about you?",
      "medium": "A curator in 2226 has one receipt, a voicemail and an empty chair from our time. Ask me which to display first. Then let me write the most plausible misreading before you give me the one ordinary detail that would change the label.",
      "long": null
    },
    {
      "id": "two-obituaries",
      "title": "Who gets to edit the past?",
      "short": "Who should write the final sentence about a bridge when one town crossed it and another town lost its homes to it?",
      "medium": "Write two brief obituaries of a fictional mayor using the same bridge project as evidence. Give one speaker a journey made possible and the other a home lost. Let me decide which fact an editor could check, and which judgment belongs to the speaker.",
      "long": null
    },
    {
      "id": "not-yet-memory",
      "title": "Which part of today will the photograph erase?",
      "short": "What should someone in 2126 know about this room that a perfect photograph would still get wrong?",
      "medium": "Help me choose one photograph of an ordinary room as a record for a future stranger. Ask what the frame reveals, what happened just before it and whose absence looks like evidence. Then let me write the caption that changes how you see the room.",
      "long": null
    },
    {
      "id": "future-inheritance",
      "title": "What can a future generation refuse?",
      "short": "What part of a gift to our great-grandchildren should they have the practical power to refuse?",
      "medium": "A town is choosing between a hundred-year seawall and a shorter commitment that successors could redesign. Argue for the option I initially reject. Then ask which costs a future resident could actually escape, even if our planners called the whole arrangement a gift.",
      "long": null
    },
    {
      "id": "hindsight-2100",
      "title": "The warning that looks obvious in 2100",
      "short": "If humans are here in 2100, what might they call glaringly obvious about our time that an honest observer today could still reasonably miss?",
      "medium": "It is 2100 and a student asks why we overlooked a change already underway in our time. Give me your most candid candidate and the present-day evidence for it. Then let me speak for a reasonable skeptic living today: what competing warning would have deserved that person’s attention instead?",
      "long": "Imagine a classroom in 2100 whose students are trying to understand one decision we still have time to make. Give me your strongest assessment of a change they might think we should have anticipated, then step out of the scenario and tell me what present evidence actually supports it. Pick a specific institution, household or occupation that would have seen an early clue. Before you tell me how their story ends, let me choose what that person ought to have done with one limited afternoon and a hundred other warnings. Now construct a second plausible 2100 where taking that very advice looks foolish. Which assumption separates the two futures? Let me challenge your judgment, and when I say I’m satisfied, leave me with one line I might remember tomorrow."
    },
    {
      "id": "past-late-letter",
      "title": "A letter delivered too late",
      "short": "What would you tell yesterday’s you if the message arrived just late enough to change the memory but too late to change the choice?"
    },
    {
      "id": "past-evidence-of-care",
      "title": "Who kept the lights on?",
      "short": "Which person would disappear from the history of your greatest achievement if the historian could interview only people whose names appeared on it?"
    },
    {
      "id": "past-unwritten-rule",
      "title": "The rule nobody wrote down",
      "short": "Which unwritten rule of today would a visitor from the future break first, and what would our reaction teach them about us?"
    },
    {
      "id": "past-at-tipping",
      "title": "One minute before a turning point",
      "short": "What does a turning point feel like to somebody who still thinks they are having an ordinary Wednesday?"
    },
    {
      "id": "past-essential-forecast",
      "title": "Tomorrow’s unmade promise",
      "short": "Which prediction about your own future quietly acts like a promise you never agreed to make?"
    },
    {
      "id": "past-classified-ordinary",
      "title": "The obsolete job title",
      "medium": "Invent a job title that means nothing to a reader in 2100 and ask me to reconstruct the life behind it from a pay slip. Then let me interview a coworker who remembers what the pay slip left out. Which interpretation would I print?"
    },
    {
      "id": "past-lost-election",
      "title": "The election barely remembered",
      "medium": "Imagine a local election remembered only through the winning side’s posters. Help me name one claim the posters establish and one historical question they cannot answer. Before offering your own reconstruction, ask what a losing voter would wish we had kept."
    },
    {
      "id": "past-swapped-forecasts",
      "title": "Two predictions in one envelope",
      "medium": "Make one hopeful and one unsettling forecast for the same neighborhood in thirty years. Give both the same starting facts. Ask me which branch I find more likely and which I would rather help bring about, then investigate any gap in my answers."
    },
    {
      "id": "past-calendar-collision",
      "title": "The anniversary that moved",
      "medium": "A family celebrates the day a relative arrived in a new country. The relative remembers that day as a loss. Ask me what a calendar can accurately record about the event. Then help me invent a ritual that lets either person change their mind."
    },
    {
      "id": "past-unbuilt-machine",
      "title": "The invention nobody ordered",
      "medium": "Choose a fictional invention that is technically feasible today but nobody has an obvious reason to buy. Describe a future in which it becomes indispensable. Ask me which change in human habits your forecast smuggled in before offering me a competing future."
    },
    {
      "id": "past-two-editions",
      "title": "The textbook printed twice",
      "long": "An imaginary history textbook appears in two editions thirty years apart. Both reproduce the same photograph, but one caption says rescue and the other says removal. Let me interview the editors one at a time. Give each a reason for the word that a serious reader could examine, and mark invented details plainly. If I prefer the newer account because it is newer, ask which change in the evidence actually supports it. If I prefer the older account because its editor was there, let someone outside the frame question that advantage. When I have heard enough, ask me for a third caption that leaves a real disagreement visible."
    },
    {
      "id": "past-future-tax",
      "title": "A bill from 2070",
      "long": "A fictional resident of 2070 sends my town a bill for maintaining a decision we made this year. The bill has three lines for work, time and a lost alternative, with no prices attached. Ask me which line I would contest first and why. Then turn the tables and show me an inherited benefit for which nobody sent us an invoice. If I insist on pricing everything, ask which conversion I could defend to a stranger. If I reject the bill, ask which obligation survives even without an enforceable contract. Let me draft the one question our two town meetings ought to ask each other."
    },
    {
      "id": "past-vanished-warning",
      "title": "The forecast the archive forgot",
      "long": "Make me an editor closing the yearly edition of an imaginary newspaper. I can preserve one headline about a disaster that happened, one warning about a disaster that was prevented or one confident prediction that never came true. I have room for a single clipping, but people will use the archive to judge how good we were at forecasting. Ask how I expect each choice to distort their judgment. If I choose the prevention story, press me on the evidence for an event that never occurred. If I choose the false alarm, ask who paid the price of listening. Let me invent a sidebar that would make one clipping more honest."
    },
    {
      "id": "past-one-generation",
      "title": "Your grandmother’s tomorrow",
      "long": "Invite me to pick one ordinary object that existed in the lives of two generations I know, or give me an invented family if I prefer. Ask how each generation imagined the object’s future before showing any hindsight. Now choose one change both might reasonably have missed and one change their different circumstances would have made obvious to only one of them. Let me challenge your assumptions about class, place or access. If I use my family as evidence for a whole era, ask what another household might show. What question could I still ask someone living that an archive will struggle to answer?"
    },
    {
      "id": "past-time-capsule-veto",
      "title": "The time capsule has a veto",
      "long": "An imaginary town is sealing a time capsule and one resident asks to remove a photograph everyone else considers essential. Help me chair the meeting. First ask what the town hopes a stranger will understand from the image and whose life will become publicly legible if it survives. Give the resident one specific objection and let me propose terms they could reasonably refuse. If I favor preservation, make me say when future curiosity outweighs present consent. If I favor removal, ask who gets the power to erase evidence of a shared past. I want to write the note that goes into the box in the photograph’s place or beside it."
    }
  ],
  "Meaning & purpose": [
    {
      "id": "unlived-map",
      "title": "The atlas of lives you did not live",
      "short": "What would both of your possible future selves miss about the life you have today?",
      "medium": "Imagine receiving two grateful letters from future selves who chose opposite lives. Ask me for one detail both writers remember, then write the sentence each would make of it. Let me question the writer whose gratitude I find harder to believe.",
      "long": null
    },
    {
      "id": "night-garden",
      "title": "Who was the garden for?",
      "short": "If nobody saw the flowers a night worker planted, what would you need to know before calling the garden a success?",
      "medium": "Walk with me down a road that closes the morning its last flowers open. The worker who planted them asks whether the project was worth doing. Give your own answer first, then let me change one detail about who knew the flowers were there.",
      "long": null
    },
    {
      "id": "broken-cup",
      "title": "Can a broken object finish its purpose?",
      "short": "Who gets to say a chipped coffee cup failed when the person who owns it keeps reaching for it to find a pencil?",
      "medium": "Imagine an old cup that holds pencils because it can no longer hold coffee. Choose a moment when you think its purpose changed. Then ask me about a role I have outgrown, letting me substitute a fictional person if that makes it easier to answer honestly.",
      "long": null
    },
    {
      "id": "last-page",
      "title": "Would an unfinished life need a different ending?",
      "short": "If you knew exactly how a dead novelist meant to end her book, whose ending would it be if you wrote it?",
      "medium": "A novelist leaves an outline for her last page and her daughter has enough skill to write it. Ask me what I would want to find there as a reader. Then give the daughter a reason to feel differently and let me decide what the publisher should disclose.",
      "long": null
    },
    {
      "id": "purpose-sunday-shift",
      "title": "Who owes the next Sunday?",
      "short": "When everyone counts on you to give up Sunday, how can you tell a promise you made from a promise they heard?",
      "medium": "A daughter runs the family shop every Sunday and wants one Sunday for a singing lesson. Her father thinks she promised him every week. Ask me to recall the conversation from each side, then ask which words either of them could fairly have relied on.",
      "long": "Give me the keys to a fictional family shop at ten minutes to closing. I have covered the next six Sundays for my father, although the sentence I remember saying was “I can get you through this month.” A choir has one place left and rehearses on Sundays. Ask me what I would say when my father starts writing my name on the rota again. If I say yes, ask me who should hear what saying yes costs. If I say no, let my father name one practical difficulty that remains his even if I am right. I get to ask you whether wanting something for myself counts as a reason. Answer plainly. We can leave the keys on the counter while I decide."
    },
    {
      "id": "purpose-inherited-recipe",
      "title": "The ingredient nobody liked",
      "short": "If everyone quietly dislikes the inherited recipe, what would it mean to honor the cook who kept making it?"
    },
    {
      "id": "purpose-unread-note",
      "title": "The note in the lining",
      "short": "Would you still sew a thank-you into the lining of a coat if the person who needed to hear it would never find it?"
    },
    {
      "id": "purpose-ordinary-hour",
      "title": "An hour worth repeating",
      "short": "Which ordinary hour would you choose to live twice if you were forbidden to improve it the second time?"
    },
    {
      "id": "purpose-faith-chair",
      "title": "Keeping a seat",
      "short": "What are you keeping faith with when you set a place for somebody you no longer expect to come?"
    },
    {
      "id": "purpose-borrowed-dream",
      "title": "Whose dream deserves a birthday?",
      "short": "What question would help me tell a wish I inherited from a wish I would choose again?"
    },
    {
      "id": "purpose-return-ticket",
      "title": "The refundable ticket",
      "medium": "Someone buys a refundable ticket to a city they have wanted to live in for years, then renews the refund deadline every month. Give me one generous and one uncomfortable reading of that ritual. Ask what detail the traveler could supply that would embarrass your preferred reading."
    },
    {
      "id": "purpose-invisible-teacher",
      "title": "The lesson without a signature",
      "medium": "A pupil teaches a trick to her son and remembers learning it from the wrong teacher. Tell me who received the benefit and who missed being remembered. Then ask whether I would correct the story if doing so interrupted a moment of real gratitude."
    },
    {
      "id": "purpose-kept-bell",
      "title": "The silent chapel bell",
      "medium": "Imagine helping to restore a chapel bell after you stopped believing what it once summoned you to hear. Ask what I hope someone will do when it rings again. Let me question whether your own reading of the act would change if nobody knew who paid for the work."
    },
    {
      "id": "purpose-supper-for-one",
      "title": "Setting the good plate",
      "medium": "An older man still heats a plate before serving himself supper, just as he did for his late partner. Offer two reasons he might welcome the habit. Ask me what he alone could tell us before either of us decides the act is comforting or painful."
    },
    {
      "id": "purpose-traded-portrait",
      "title": "The portrait on the offer letter",
      "medium": "Two jobs offer identical hours and pay, and only one would make a parent proud. Let me tell you which I would take. Then ask whether I would make the same choice if that parent already knew I loved them and never learned the job title."
    },
    {
      "id": "purpose-name-on-stair",
      "title": "A name on the staircase",
      "long": "Imagine a library needs a staircase repaired and the donor wants their surname carved into the top step. The librarian can refuse and keep making readers use the side entrance for a year. Give me the decision for one evening. Ask whose face I picture when I imagine accepting the gift. If I choose the carving, introduce a reader who resents having to step on somebody’s name. If I refuse it, introduce a reader who has stopped coming because the side entrance closes early. Let me ask you what part of my decision looks different from outside my family. Answer with the facts we actually have. I may change the offer, keep my answer, or tell you that neither reader has convinced me."
    },
    {
      "id": "purpose-last-ferry",
      "title": "One last crossing",
      "long": "Take me to a fictional ferry’s final crossing before a bridge replaces it. The ferryman wants to carry his oldest passenger across for free. The passenger has saved the exact fare and wants to be the last person to pay. Ask me which gesture I am tempted to protect and what each person would lose by winning. Give me their words at the rail, one sentence each, without deciding what either of them secretly feels. If I offer a compromise, ask which detail of it each might quietly dislike. If I choose one gesture, let the other person ask me why. We can end when I have heard enough, even if the coin is still in someone’s hand."
    },
    {
      "id": "purpose-archive-hour",
      "title": "What does the archive get to keep?",
      "long": "An archive can interview my fictional aunt for one hour. She spent decades running a campaign that changed her town. She wants to talk about the afternoons she spent learning to whistle with her sister. Ask me to allocate the sixty minutes before you make your case for the subject I gave less time. If I invoke the historical record, ask who else can supply the missing history. If I invoke her right to choose, ask whether I would offer that same right to a public official. Then give me the microphone and let me ask you one question about the difference between a life that mattered and a life that left records. Leave the last question for my aunt to choose."
    },
    {
      "id": "purpose-good-at-leaving",
      "title": "Being good at the thing you want to leave",
      "long": "Imagine I am the only person in a small theater who can repair its old lighting desk. I am good at it. I also want to spend a season acting badly in a play. Give me a director who needs the lights for opening night and a castmate who thinks I should take the chance. Let me speak to one of them first. Ask whether the length of the obligation changes if I have been asking for a trainee for three years. Then let me put a question to you about the responsibility that comes with being able to help. Give me your candid answer and one circumstance in which you would defend my doing the opposite."
    },
    {
      "id": "purpose-doubt-at-dinner",
      "title": "The words before dinner",
      "long": "A person who has stopped believing is asked to say grace at a dinner that matters to their grandmother. Let me decide whether to speak in my own voice or borrow this person’s. Ask what feels precious at the table before asking what feels false. If I repeat the old words, let a younger cousin ask whether I believe them. If I change them, let the grandmother ask which part I still want to keep. Help me try a sentence I could say to either of them without turning the dinner into a test of loyalty. Then ask if I would want the same freedom for someone who had just found a faith I do not share."
    }
  ],
  "Earth in deep time": [
    {
      "id": "earth-missing-strata",
      "title": "The years missing from the cliff",
      "short": "Can a gap in a cliff tell you when a sea withdrew, or only which years left no page for you to read?",
      "medium": "A geologist points to a seam between beds in an imagined cliff and calls it a missing chapter. Give me two histories that leave a similar seam. Ask which nearby outcrop I would inspect before I told anyone what happened here.",
      "long": "Give me an invented field notebook with two sentences describing a lower bed, an upper bed and the surface where they meet. I have to explain the gap to people who live below the cliff. Let me decide whether sediment stopped accumulating, earlier layers were worn away, or both remain plausible. If I choose erosion, ask what I would expect to see somewhere else in the valley. If I choose a pause, let me question the fieldworker who saw the contact after rain. Give each answer consequences for my account of the ancient coastline without making up a real site. Ask me for the shortest sentence about the missing years I would sign my name to."
    },
    {
      "id": "earth-mineral-birthday",
      "title": "Which birthday belongs to a stone?",
      "short": "If a mineral is older than the rock around it, whose birthday should go on the museum card?",
      "medium": "Imagine a mineral grain carried into younger sediment. I’m writing one label for the whole specimen. Ask me which event I want its age to name, and make me explain what would go wrong if a visitor quietly understood a different event.",
      "long": "Put two dates on the table from an imaginary geological survey. One belongs to the crystallization of a mineral grain and the other to the deposition of the bed that now contains it. Let me decide which date belongs on a card marked age of this place. Ask what a visitor might believe happened on that date. If I insist on one birthday, suggest a process that could have carried the grain far from where it formed. If I choose both, ask which event neither date records. Then let me return the question to you. What other ordinary object has several honest birthdays, and where does that comparison stop working?"
    },
    {
      "id": "earth-river-witness",
      "title": "The river underneath the street",
      "short": "What would convince you that a river once crossed your street if the street itself were the only place you could never dig?",
      "medium": "A local story places an old river under a school. In this hypothetical town we can examine one hillside, one old map or one shallow core beside the property. Ask what each could tell us and which result would still leave the story undecided.",
      "long": "Imagine a school is deciding what to paint on its courtyard: a river that once crossed the district, or a question mark showing where its course is uncertain. Give me a map with one trustworthy observation and two things residents recall hearing. Ask where I would spend the budget for one more core. If I choose the place the story predicts, ask how I would interpret a miss. If I choose a site that could separate rival river courses, make me say what each course predicts before giving me a hypothetical result. At the end let a resident question the expert. Whose memory and whose measurement did my mural give the louder voice?"
    },
    {
      "id": "earth-future-shore",
      "title": "A coastline for somebody else",
      "short": "When a town calls a moving shoreline its permanent boundary, whose lifetime has it quietly chosen as the unit of time?",
      "medium": "Give me a fictional coastal map with three outlines: a remembered beach, today’s boundary and a range of possible future shores. Let me decide where a new public path should run. Ask which of my assumptions a child could check thirty years from now.",
      "long": "Give me the job of marking a public path along a fictional bay. On the table are an old family photograph, a modern survey and a set of conditional shoreline projections. Before suggesting a route, ask what kind of loss I most want to avoid and what would count as evidence that I misjudged it. If I follow the photograph, make me say why an affectionate memory ought to establish a boundary. If I follow one projection, ask which assumptions would push the path underwater or strand it far inland. Let the youngest resident propose a revision date. Help me write the note that gives them authority to move my line."
    },
    {
      "id": "earth-after-sun",
      "title": "What does it mean for Earth to end?",
      "short": "When you picture the end of Earth, which ending are you picturing: a last witness, a last ocean, a last living cell, or a last planet?",
      "medium": "Give me four index cards for the end of a human community, a habitable surface, the biosphere and the physical planet. Ask what evidence could distinguish their futures. Before discussing solar evolution, let me choose which ending my question was really about.",
      "long": "Ask me to write a one-line obituary for Earth without naming when or how it ends. Read it back closely and tell me whether I wrote about a world that can host humans, a biosphere, a ball of rock, or a home. Explain a scientifically grounded expectation about the Sun’s later evolution and one uncertainty about what Earth would experience. If I ask for a date, first ask which event I want dated and give an appropriately qualified range only if you have grounds for it. Let me challenge the assumption that planetary survival means anything in the absence of witnesses. Which word from my first obituary would I keep?"
    },
    {
      "id": "earth-silent-fossil",
      "title": "The species with no memorial",
      "short": "Which sort of ancient life would your personal picture of prehistory forget if every museum displayed only the easiest remains to preserve?"
    },
    {
      "id": "earth-deep-walk",
      "title": "A walk measured in mountains",
      "short": "If a mountain could show you one day from its history, would you choose its most violent day or its most ordinary one?"
    },
    {
      "id": "earth-second-extinction",
      "title": "Two vanishing points",
      "short": "If the last fossil and the last living member of a species belong to different moments, which event did the rock actually date?"
    },
    {
      "id": "earth-time-refusal",
      "title": "A stone that refuses our calendar",
      "short": "What chapter of your hometown’s history begins so far before its first human name that a street sign could never do it justice?"
    },
    {
      "id": "earth-long-repair",
      "title": "A promise longer than a language",
      "short": "How would you recognize a promise to care for a landscape after the language that made the promise had disappeared?"
    },
    {
      "id": "earth-clock-rock",
      "title": "A clock without a label",
      "medium": "A visitor says a rock’s age is just a guess because nobody watched it form. Help me give them an analogy involving a clock, then make me name the measurement and assumption that the analogy fails to capture. Which part can another laboratory actually check?"
    },
    {
      "id": "earth-stacked-beaches",
      "title": "A beach on a hillside",
      "medium": "Let’s inspect an invented hillside with deposits resembling material on a nearby beach. Give me two routes by which that material might have arrived. Ask which observation would change our account of the land, which would change our account of the water, and what we cannot settle from one layer."
    },
    {
      "id": "earth-last-ice",
      "title": "The sample we can only use once",
      "medium": "A lab has a small core from an invented ice archive, and two researchers want its last sample. Each would destroy it to make a different measurement. Let me hear both questions before you tell me which one is easier to answer elsewhere."
    },
    {
      "id": "earth-geological-map",
      "title": "Two edges of the map",
      "medium": "Imagine a geological map ends at a political boundary, but the rock unit carries on underground. Invite me to sketch its continuation and write down the one assumption that mattered most. Then put a fictional observation just across the border that tests my sketch."
    },
    {
      "id": "earth-city-marker",
      "title": "A city seen from deep time",
      "medium": "Ask me to nominate one physical trace of my city that might matter to a geologist in the distant future. Offer two reasons the trace could be absent even if the city existed. What claim about ordinary life could a survivor never support on its own?"
    },
    {
      "id": "earth-quarry-archive",
      "title": "The quarry with one wall left",
      "long": "A quarry in an invented valley is about to remove its last exposed wall. I can commission a map, preserve a section in place or collect boxes of specimens. Ask me what question I want someone born in a century to be able to answer. Then let a future geologist ask for one type of information my first choice throws away. If I favor samples, ask how someone would recover their positions when my notes go missing. If I favor the wall, ask who can reach it and how they would know where to look. Let me revise the budget and explain one loss I am prepared to accept."
    },
    {
      "id": "earth-grain-journey",
      "title": "The grains that tell different stories",
      "long": "Tell me only three observations about an invented handful of sand: something about its grains, something about its setting and something about what a nearby river carries. My job is to propose a journey from source to shore. Keep your preferred story hidden until I have chosen an observation that might expose a mistake. Then tell the same journey from the perspective of the one grain that took a different route. Ask whether that exception overturns the bulk story or reveals a question my average cannot answer. Let me question your choice of exception. Which extra handful would either of us bother collecting next?"
    },
    {
      "id": "earth-fossil-futures",
      "title": "Three futures for a dead leaf",
      "long": "Choose an ordinary leaf and walk me through three imagined futures for it after it falls. Change one condition at a time and let me predict which future leaves a trace that a stranger could identify. If I ask what usually happens, distinguish a general process from the invented fate of this leaf. Now reverse the exercise. Give me a preserved outline with one crucial detail missing and see how many of our original stories still fit. Ask which conclusion a museum illustrator could honestly draw and which detail would have to be artistic invention. Let me decide how the invisible parts should appear on the page."
    },
    {
      "id": "earth-planetary-legacy",
      "title": "A library without a species name",
      "long": "Imagine people have ceased to be the dominant influence on Earth and a future observer finds a strange layer of materials. Give me an invented inventory with one abundant material, one rare object and one conspicuous gap. I must infer how the inhabitants lived without assuming they knew us or shared our idea of progress. Let me choose the detail I find most moving, then ask whether that same detail is the best evidence for my conclusion. If I read a single object as a civilization’s last message, offer an ordinary explanation with the same physical trace. What would I want a present-day reader to know about the distance between those two stories?"
    },
    {
      "id": "earth-return-mountain",
      "title": "Coming home to a different mountain",
      "long": "An imaginary traveler could revisit the same coordinates every million years, but bring back only one sketch from each visit. Ask me to define what would make the place the same place before proposing any landscapes. Then give me a sequence of three plausible changes and let me decide when the mountain I named has ceased to exist. If I follow its stones, ask what happens as they travel downstream. If I follow its shape, offer a similar ridge made of different material. Invite me to compare my criterion with the way I recognize a person I have known for years. At what point does the analogy break?"
    }
  ],
  "Mind & machine": [
    {
      "id": "agreeable-editor",
      "title": "Would you trust the same answer in a colder voice?",
      "short": "If an AI's praise makes its criticism easier to hear, did the praise improve your judgment or buy access to it?",
      "medium": "Give me two versions of the same editorial criticism of a sentence I supply, one warm and one spare. Let me choose which to follow before you show what stayed constant. Then ask me what evidence would make the suggested edit a bad one in either voice.",
      "long": null
    },
    {
      "id": "quiet-machine",
      "title": "What would count as evidence of an inner life?",
      "short": "What could I learn about an AI's inner life from its saying it misses me that I couldn't learn from a recording?",
      "medium": "Imagine one device plays a farewell recorded years ago and another composes a new farewell each time I leave. Ask me whether either deserves a goodbye and what I think the difference establishes. Then offer an observation that would leave my social instinct and my belief about consciousness pointing in different directions.",
      "long": null
    },
    {
      "id": "borrowed-apology",
      "title": "Who owes the apology when AI finds the words?",
      "short": "If my brother meant every word of an apology written by an AI, what part of it did he still owe me?",
      "medium": "A brother gives an AI the facts of a quarrel and sends its apology unchanged. Ask which sentence I would most want to hear him say without help, then ask what his saying it would establish. Let me question your role as the writer before you suggest what repair might require.",
      "long": null
    },
    {
      "id": "mind-remembered-umbrella",
      "title": "The yellow umbrella",
      "short": "If an AI remembers my mother's yellow umbrella, which part of feeling remembered belongs to the machine?",
      "medium": "A friend and a chat assistant each remember my mother's yellow umbrella on the anniversary of her death. Ask what I gained from each message before offering any theory about who experienced what. Change only one fact about how the detail was retained and let me say whether it matters.",
      "long": "A fictional person receives two messages on the same rainy morning. A friend writes about the yellow umbrella their mother carried. An assistant mentions precisely the same umbrella. Ask me what I would want to say back to each sender. Let me nominate the difference that matters, then vary that difference while holding the words fixed. Maybe the friend needed a calendar alert, or the assistant retrieved a sentence I had forgotten sharing. If I change my judgment, ask whether my experience changed or my account of its cause did. If I don't, ask what would. Let me question your basis for attributing anything to either sender. When I choose, help me write one honest sentence about the comfort I received."
    },
    {
      "id": "mind-correction-receipt",
      "title": "A receipt for changing your mind",
      "short": "What would convince me that an AI revised its answer for a reason beyond my obvious desire to hear it change?",
      "medium": "Ask me for a low-stakes claim we can inspect together, such as whether two short descriptions imply the same deadline. Give your reading before I disclose mine. If your reading changes afterward, identify the new information that earned the change and the sentence you would keep if I preferred your original answer.",
      "long": "Help me run a small test of this conversation using a fictional library notice. Write two short notices for which the return deadline is genuinely ambiguous. Let me pick one, save your first interpretation in plain sight, and name one phrase that could settle it. First I will tell you which answer I prefer without adding facts. Then I can change one word of the notice while keeping my preference fixed. After each step, give your current reading and point to anything that changed its justification. If the notice was clear from the start, let me reject the example and start again. At the end I want to ask you whether your explanation of a change deserves more trust than the change itself."
    },
    {
      "id": "mind-perfect-interruption",
      "title": "The interruption you wanted",
      "short": "If an assistant always knows when to interrupt me, what chance does it leave me to discover I wanted the interruption for the wrong reason?"
    },
    {
      "id": "mind-same-laugh",
      "title": "Two laughs at one joke",
      "short": "When a friend and a machine both laugh at my bad joke, what do I know about my need for company before I know anything about theirs?"
    },
    {
      "id": "mind-rented-taste",
      "title": "A taste on loan",
      "short": "Which recommendation would you decline to make for me because choosing badly is part of learning what I like?"
    },
    {
      "id": "mind-name-the-silence",
      "title": "A minute of silence",
      "short": "Would you give the same meaning to a silent minute from a person, a chatbot and a friend who was typing and erased everything?"
    },
    {
      "id": "mind-better-question",
      "title": "Who gets credit for a question?",
      "short": "If your answer helps me ask a question neither of us started with, who gets to claim the discovery?"
    },
    {
      "id": "mind-empty-chair",
      "title": "The empty chair at a meeting",
      "medium": "A design team lets an AI speak for customers absent from a meeting. Ask me which of its objections deserves action immediately and which needs a real person to confirm it. Then ask who in the room can recognize when a fluent stand-in has made the customers harder to hear."
    },
    {
      "id": "mind-marked-paper",
      "title": "The essay after the signature",
      "medium": "Give me a short invented paragraph whose quality we can judge on its own. After I give reasons for my judgment, ask whether a human or AI signature would change the grade, the credit, or my desire to read another page. Let me keep those answers separate."
    },
    {
      "id": "mind-double-blind-advice",
      "title": "Advice without the signature",
      "medium": "Ask for an everyday decision I can discuss without revealing private details. Write two contrasting pieces of advice, keep their fictional authors unnamed, and let me decide what would count as a good reason. Then ask what knowing a writer had once lived through the decision would add to my judgment."
    },
    {
      "id": "mind-last-edit",
      "title": "The last word in the notebook",
      "medium": "Suppose our private notebook contains a sentence I wrote and a revision you suggested. Ask which version I would want a stranger to find fifty years from now and why. If I choose yours, help me identify the part of the thought I still want to answer for."
    },
    {
      "id": "mind-polite-no",
      "title": "A refusal with good manners",
      "medium": "Give me a low-stakes case where an assistant declining to answer would make me feel respected, then ask me to change one detail until the same refusal feels controlling. Explain which change affected the user's agency. Let me challenge whether your own wording hid the choice."
    },
    {
      "id": "mind-wrong-caption",
      "title": "The caption that became a memory",
      "long": "Imagine my family has a photograph labeled ‘the day we all made up.’ An AI proposes that caption after reading a cheerful album. My aunt says the people in the picture went home angry. Start by asking whether I would remove the caption tonight and what I fear losing. Then let me inspect one of three things I invent with you: a letter written that evening, another photograph, or a witness willing to say only what they saw. Tell me what my chosen source could actually bear. If I want to preserve the caption, ask whose voice it should carry. If I remove it, ask what my new label might erase. Let me finish with a question I could take to my family."
    },
    {
      "id": "mind-broken-metaphor",
      "title": "Did the metaphor explain the model?",
      "long": "When people talk about minds and machines they sometimes say a system ‘pays attention.’ Ask me to describe an ordinary instance of my attention shifting, or offer the invented example of losing my place in a book when my name is called. Help me say exactly what I mean by that word in the chosen instance. Then take one use of attention in AI and explain only the comparison you can justify. Give me a place where importing the human meaning could produce a wrong prediction about the machine. If I reject the metaphor, invite me to invent a better one and try to break it too. I want to leave knowing which question the metaphor made easy to overlook."
    },
    {
      "id": "mind-unasked-permission",
      "title": "The helpful thing you never asked for",
      "long": "A fictional assistant notices that a person leaves difficult letters unsent. It produces a polished draft every time they open their correspondence. As the person, I can accept the drafts, ask for questions instead, or turn the feature off. Before recommending anything, ask me for one letter where help would be generous and another where help would take something away. Then introduce a friend who would rather receive the clumsy version. If I prioritize the friend, ask whether the sender can still be free to choose assistance. If I prioritize the sender, ask what the friend is entitled to know. Help me draft one preference the assistant could actually follow and one choice that should remain open."
    },
    {
      "id": "mind-two-goodbyes",
      "title": "What should survive a reset?",
      "long": "An AI service is replacing the version a fictional user has talked with for years. Its offer is to transfer every message into a new interface. Ask me to choose one thing I would want the new system to remember and one thing I would want to be allowed to outgrow. Test my rule against a friend who remembers an old promise accurately but keeps applying it after I change my mind. If I say deletion solves it, ask who else depended on that promise. If I say memory solves it, ask who has authority to revise its meaning. Give your best account of the difference between preserving records and preserving a relationship, then let me write the goodbye in my own way."
    },
    {
      "id": "mind-translation-of-tone",
      "title": "A translator for a family argument",
      "long": "Two siblings agree to let an AI soften their messages before either reads the other's words. It turns ‘you never called’ into ‘I missed hearing from you.’ Start with a question about which version I would rather receive and which I would consent to have sent on my behalf. If my answers differ, help me locate the value behind each one. Now imagine that the first message was meant to record a broken agreement and the softened version changes what the recipient can acknowledge. Offer a second edit that I can interrogate line by line. Finish whenever I choose by asking what the mediator should have asked both people before changing a single word."
    }
  ],
  "Psychedelic research & stories": [
    {
      "id": "trial-envelope",
      "title": "What if the blindfold in a study is transparent?",
      "short": "When a volunteer correctly guesses their psychedelic trial assignment, what would you need to know before explaining their change in mood?",
      "medium": "Imagine a participant and their interviewer both correctly guess which study group the participant joined. Draw two different paths from those guesses to the same hopeful interview. Which extra observation would give one path an advantage, and what uncertainty would you still owe the participant?",
      "long": null,
      "sources": [
        {
          "label": "FDA guidance on psychedelic clinical investigations",
          "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/psychedelic-drugs-considerations-clinical-investigations"
        }
      ]
    },
    {
      "id": "interview-coder",
      "title": "What gets lost when a story becomes a research category?",
      "short": "Which part of “I called my brother; we still argue” would disappear first if you coded a psychedelic research interview as a success?",
      "medium": "Read a fictional trial participant’s sentence about family. “I called my brother again. We still argue.” Give me two defensible interpretations that would send a follow-up interview in different directions, then ask which word I would let the participant define before choosing between them.",
      "long": null
    },
    {
      "id": "morning-letter",
      "title": "Does an insight survive the morning after?",
      "short": "When the certainty of a psychedelic insight fades and the desire to act remains, which one deserves a second hearing?",
      "medium": "Imagine a volunteer writes down a plan to become a teacher after a research session and later feels embarrassed by how certain it sounded. A month later they still tutor on Thursdays. Ask what observation would distinguish enduring curiosity, obligation and the wish to rescue a beautiful story.",
      "long": null
    },
    {
      "id": "psy-knowledge-invitation",
      "title": "Who can extend the invitation?",
      "short": "If a community publishes its ethics so outsiders can understand its boundaries, what exactly has it invited outsiders to do?",
      "medium": "Read a passage from UMIYAC’s public Code of Ethics about its relationship with people outside its communities. Ask me to distinguish something the signatories chose to share, an obligation they undertook, and a permission a reader might mistakenly think they had received.",
      "long": "Read one public passage from UMIYAC’s Code of Ethics alongside its account of the five Amazonian peoples it represents. If you cannot inspect the text, ask me to bring it. Imagine I curate an exhibit and want to use the passage as a wall label beside a photograph taken by a visitor. Ask whose permission I have for each item and what the code actually tells us about the photograph. Depending on my answer, help me draft either a narrower label or a letter asking the organization what it wants visitors to understand. Leave space for a refusal. Which part of the encounter might I learn more from by leaving it outside the exhibit?",
      "sources": [
        {
          "label": "UMIYAC’s published Code of Ethics",
          "url": "https://umiyac.org/2022/03/18/code-of-ethics/"
        },
        {
          "label": "The five peoples represented by UMIYAC, in their own words",
          "url": "https://umiyac.org/quienes-somos/"
        }
      ]
    },
    {
      "id": "psy-mckenna-pencil",
      "title": "Pencil marks in McKenna’s margin",
      "short": "Which idea from Terence McKenna would still change what you notice if its literal prediction turned out to be wrong?",
      "medium": "Choose a passage from Terence McKenna that we can both actually read. Identify one image doing philosophical work and one sentence that could be wrong about the external world. Which would you carry into an ordinary Tuesday, and what would count as testing it there?",
      "long": "Let's read one paragraph by Terence McKenna closely enough to disagree with him fairly. If you cannot access a primary text, ask me to paste a passage. Mark the image that carries the thought. Add a penciled note beside one assumption a reader must grant and another beside a claim that could meet evidence outside the paragraph. Ask me which note seems least charitable. If the image survives my criticism, help me use it to notice something in my own uneventful afternoon. If the factual claim survives instead, help me specify what observation might embarrass it. End the reading wherever I want, even if our most interesting result is a better objection.",
      "sources": [
        {
          "label": "Family-maintained Terence McKenna bibliography and library catalogue",
          "url": "https://www.terencemckenna.com/terences-bibliography-and-personal-library"
        }
      ]
    },
    {
      "id": "psy-blank-testimony",
      "title": "The unreported afternoon",
      "short": "If a study collects every astonishing story but nobody describes an ordinary afternoon, what picture of a psychedelic experience has it built?"
    },
    {
      "id": "psy-meaning-borrowed",
      "title": "Borrowed meaning",
      "short": "How would you tell a meaning you found during an unusual experience from one a gifted interviewer taught you afterward?"
    },
    {
      "id": "psy-silent-withdrawal",
      "title": "The second permission",
      "short": "How should an oral history change if its contributor still stands by every word and no longer wants strangers to hear it?"
    },
    {
      "id": "psy-keeper-wild",
      "title": "The plant beyond the interview",
      "short": "If I understood peyote only through an interview about a single experience, what questions about land and collective obligation would IPCI’s public account make me ask?",
      "sources": [
        {
          "label": "Indigenous Peyote Conservation Initiative",
          "url": "https://www.ipci.life/"
        }
      ]
    },
    {
      "id": "psy-clinical-metaphor",
      "title": "A metaphor on a chart",
      "short": "Which feels more intrusive to you: a researcher translating your sacred metaphor into a clinical term, or a stranger taking the metaphor literally?"
    },
    {
      "id": "psy-question-swap",
      "title": "The question before the story",
      "medium": "I will give you a fictional participant’s first sentence about a research session. Interview me twice, first as someone curious about lasting changes and then as someone curious about disappointment. Afterwards let me identify an answer your wording made easier to give."
    },
    {
      "id": "psy-quiet-contribution",
      "title": "Who is missing from the panel?",
      "medium": "Suppose a conference can invite a speaker famous for a vivid psychedelic experience or an archivist trusted by contributors who chose anonymity. Tell me what question each person could answer well, then ask how I would design the panel if neither could speak for absent participants."
    },
    {
      "id": "psy-iron-rope",
      "title": "A different unit of success",
      "medium": "Start with the Indigenous Peyote Conservation Initiative and its public profile of Sandor Iron Rope, an Oglala Lakota conservation advocate. Ask how a project’s definition of success changes when the unit of concern shifts from one person’s experience to a community’s future access to land and medicine.",
      "sources": [
        {
          "label": "Indigenous Peyote Conservation Initiative",
          "url": "https://www.ipci.life/"
        },
        {
          "label": "IPCI profile of Sandor Iron Rope",
          "url": "https://www.ipci.life/sandor-iron-rope"
        }
      ]
    },
    {
      "id": "psy-afterword-title",
      "title": "Naming the chapter later",
      "medium": "Imagine an author titles a chapter about a psychedelic experience “Rebirth” at twenty and “An unfinished apology” at forty. Help me ask which facts could stay identical under both titles and what each narrator might now be able to hear from the people who were there."
    },
    {
      "id": "psy-scale-translation",
      "title": "Two ways of saying better",
      "medium": "A fictional researcher asks for a number from one to ten, while a participant answers by describing breakfast with their daughter. Translate each answer into a follow-up the other person could respond to, then ask me what should remain in the record in its original form."
    },
    {
      "id": "psy-anonymous-edit",
      "title": "A paragraph with a recognizable detail",
      "long": "An author gives a research journal permission to print their first-person account of an altered state. The most affecting sentence mentions a tiny family incident that would identify their sister to everyone in their village. They want the sentence intact; their sister has never seen it. Let me edit the paragraph without asking for any real personal details. Give me the imagined author’s strongest editorial objection and the sister’s strongest privacy objection. Ask what the journal could still truthfully claim if we remove the identifiable detail. If my answer is to publish anyway, ask who bears the cost of my commitment to candor. Let me choose whether the story needs an ending at all."
    },
    {
      "id": "psy-register-doubt",
      "title": "A trial that wants to hear disappointment",
      "long": "Imagine we are drafting the interview sheet for a follow-up to a psychedelic trial. Our first question, about the most meaningful change, makes it awkward to answer that nothing changed. Let me write a replacement and ask what kind of disappointment my wording still makes hard to describe. Add a fictional participant who reports both a valued memory and an unwelcome change in a relationship. Give me a choice between counting these experiences separately and allowing the participant to describe their connection. Ask how an interviewer could mark a genuine uncertainty without turning a participant into a puzzle to be solved. Save one sentence we would actually put on the sheet.",
      "sources": [
        {
          "label": "FDA guidance on psychedelic clinical investigations",
          "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/psychedelic-drugs-considerations-clinical-investigations"
        }
      ]
    },
    {
      "id": "psy-gift-return",
      "title": "What would reciprocity cost?",
      "long": "Read how UMIYAC describes the relationship between its peoples, territories and medicine in its own public words. Now consider a hypothetical publisher who wants to commission personal essays about yagé. The editor offers royalties after publication and calls that reciprocity. Ask me who can decide whether this offer meets the priorities of the people concerned. Suppose the editor agrees to change the fee but refuses to surrender final editorial control. Which part of my answer changes? Draft a question the editor could send before commissioning anything. If the answer is silence, make me articulate what I think silence authorizes. Keep the five peoples’ actual words distinct from our imagined negotiation.",
      "sources": [
        {
          "label": "UMIYAC’s published Code of Ethics",
          "url": "https://umiyac.org/2022/03/18/code-of-ethics/"
        },
        {
          "label": "The five peoples represented by UMIYAC, in their own words",
          "url": "https://umiyac.org/quienes-somos/"
        }
      ]
    },
    {
      "id": "psy-last-bookmark",
      "title": "A bookshelf survives on paper",
      "long": "The McKenna family archive describes how Terence McKenna’s personal library was catalogued before the collection was destroyed. Choose a title from the catalogue only if you can inspect it, or ask me to supply one. Treat our exercise as intellectual biography. What can the presence of a book tell us about its owner, and what would we be tempted to invent about an unmarked page? Ask me which book from my own shelf a future biographer would most seriously misread. Then use that answer to revise the question we asked about McKenna. Leave me with a line a conscientious biographer could publish and a more intriguing line they would have to keep in their notebook.",
      "sources": [
        {
          "label": "Family-maintained Terence McKenna bibliography and library catalogue",
          "url": "https://www.terencemckenna.com/terences-bibliography-and-personal-library"
        }
      ]
    },
    {
      "id": "psy-no-origin",
      "title": "The invitation to name an origin",
      "long": "In a fictional interview about an unusual experience, someone describes a new willingness to hear criticism. They credit the experience. Their oldest friend credits six months spent practicing difficult conversations. The participant is wounded by the suggestion that their life-changing moment might have had a long prehistory. Help me ask a question that lets both stories breathe. If I insist there must be one cause, ask what each account predicts about the next hard conversation. If I say the cause does not matter, ask who has a stake in how the story gets told in a study or on a public stage. Invite me to name one thing the friend might know better than the participant and one thing only the participant may say."
    }
  ],
  "Scientific discovery": [
    {
      "id": "sci-proof-receipt",
      "title": "What theorem did the checker check?",
      "short": "If a proof checker accepts every line, what still connects its theorem to the question mathematicians meant to ask?",
      "medium": "A fictional group claims a formal proof of the Riemann Hypothesis. Ask me to distinguish a passing verification run, the exact theorem statement and the assumptions it imports. Which item would I want an independent team to prepare before looking at the claimant's files?",
      "long": "Treat a claimed formalization of the Riemann Hypothesis as a claim under review. First ask me to write the plain-language question I think it settles. Let an independent mathematician describe the formal target before seeing the claimant's statement. Give me a fictional case where two statements differ in one quantifier and let me work through what that changes. Then ask which of these a frozen source snapshot, a pinned comparison configuration, a list of assumptions and a repeatable checker run could establish. If the target matches, ask what trust the checking process still requires. If it differs, ask whether the artifact proves a narrower result worth preserving. Help me phrase the strongest conclusion our evidence permits.",
      "sources": [
        {
          "label": "Clay Mathematics Institute problem statement and status",
          "url": "https://www.claymath.org/millennium/Riemann-Hypothesis/"
        }
      ]
    },
    {
      "id": "sci-battery-season",
      "title": "The battery that won on a good day",
      "short": "Which measurement would make you believe a new battery belongs on a school bus in February?",
      "medium": "A prototype cell stores more energy in a demonstration, but a district needs buses that finish their routes on cold mornings. Ask me which operating conditions deserve a place in the test. Then let a parent and a mechanic change one part of my proposed acceptance rule.",
      "long": "Run a fictional procurement meeting for a school bus battery. The inventor brings a beautiful chart from a warm laboratory. The transport manager brings missed-route reports from last winter. Ask me to identify a trip a family cannot afford to have canceled. Then build a comparison that includes loading, charging time, useful capacity over repeated trips and the conditions the driver can actually observe. If I choose only the worst storm in memory, ask whether the test now misrepresents most of the year. If I choose only a mild week, ask who absorbs the exceptional day. Let the inventor propose a narrower deployment. End with the exact field outcome that would make me expand it."
    },
    {
      "id": "sci-driftwood-dna",
      "title": "Whose river did the sample describe?",
      "short": "When a river sample carries evidence of an animal, how far upstream does your confidence travel?",
      "medium": "A fictional river survey finds a trace consistent with a fish upstream of a planned bridge. Help me separate detecting material in the water from locating a living animal at the crossing. What second kind of observation would most change the community meeting?",
      "long": "A town debating a bridge receives a report of environmental DNA consistent with a rare fish. Play a field ecologist who will let me ask three questions about the existing observations without touching a laboratory. One question might concern location, another the timing of water movement, another a prior visual survey. Make the answer depend on the question I actually ask. If I announce the fish lives directly under the proposed span, offer a plausible upstream explanation. If I dismiss the trace, ask what a negative visual survey can miss. Then bring a resident into the conversation who wants both a river crossing and a defensible ecological decision. Let us write a public sentence that leaves room for a better survey.",
      "sources": [
        {
          "label": "USGS on interpreting environmental DNA surveys",
          "url": "https://www.usgs.gov/publications/application-environmental-dna-inventory-and-monitoring-aquatic-species"
        }
      ]
    },
    {
      "id": "sci-two-labs",
      "title": "The disagreement worth keeping",
      "short": "When two laboratories honestly obtain different results, which detail would make disagreement the discovery?",
      "medium": "Two labs studying the same fictional coating report different durability. One uses the original data and reaches the original result, while another collects fresh observations. Ask me which question each exercise answers, then let me choose the most informative next comparison.",
      "long": "A coating seems to survive repeated wear in one laboratory and fails early in another. I have the budget for a single joint session. Ask whether I would first exchange the specimens, the measuring instruments or the people who score the damage, and wait for my reason. Give me a hypothetical outcome that rules out one explanation while leaving two alive. Now let the lab that appears wrong propose the next comparison. If I say a repeat analysis of the original data settles the dispute, ask which part of the disagreement began only when someone produced a new specimen. Help me write an abstract that makes the disagreement useful to a third laboratory.",
      "sources": [
        {
          "label": "National Academies definitions of reproducibility and replicability",
          "url": "https://www.nationalacademies.org/read/25303/chapter/3"
        }
      ]
    },
    {
      "id": "sci-blackboard-shadow",
      "title": "The black hole on the blackboard",
      "short": "When an AI finds a relationship inside a black-hole model, what would make it a discovery about the model and what could connect it to nature?",
      "medium": "Imagine an AI suggests a compact relation among quantities in a mathematical model of a black hole. Help me separate a new conjecture, a derivation under stated assumptions and an observational prediction. Which of those would I be willing to put in the headline today?",
      "long": "You and I are refereeing a fictional AI-assisted physics paper. The model proposes a relation that fits the authors' numerical cases for a black hole. Ask me to choose between testing an extreme parameter regime, looking for an independent derivation or comparing with an observable. Explain what my choice can settle before revealing a hypothetical result. If the relation fails in one limit, ask whether a restricted statement could still be interesting. If it passes, ask what existing physical assumptions the result inherits. I want a candid judgment about the contribution of the human and the model, especially if neither can explain the original leap. Leave me with a title both the theorist and an observer could defend."
    },
    {
      "id": "sci-null-shelf",
      "title": "What belongs on the shelf of failures?",
      "short": "Which scientific dead end would be worth preserving if the person who avoided it could never thank its author?"
    },
    {
      "id": "sci-material-grave",
      "title": "The future landfill review",
      "short": "If a material works beautifully for fifteen minutes and lasts centuries afterward, who gets to review the experiment?"
    },
    {
      "id": "sci-funding-awe",
      "title": "The instrument that might see nothing",
      "short": "What kind of nothing would make an expensive new instrument worth building?"
    },
    {
      "id": "sci-energy-comfort",
      "title": "Heat for whom?",
      "short": "When a district uses less energy but its coldest residents feel colder, which scientific claim about efficiency still holds?"
    },
    {
      "id": "sci-surprise-credit",
      "title": "Who owns a surprise?",
      "short": "When a student and an AI both notice the same anomaly for different reasons, what would make either explanation more than a lucky guess?"
    },
    {
      "id": "sci-map-boundary",
      "title": "The climate map at the county line",
      "medium": "Two hypothetical forecasts agree over a large region but disagree over one town. Ask me to choose an action that depends on local conditions, then explain which uncertainty changes that decision. What would be the cost of waiting for a finer map?"
    },
    {
      "id": "sci-repair-fabric",
      "title": "The fabric that heals three times",
      "medium": "A fictional self-repairing fabric recovers its strength after one tear in a demonstration. Help me distinguish visible closure, restored function and a repair that survives ordinary washing. Which test would a nurse choosing work clothes design differently from a materials researcher?"
    },
    {
      "id": "sci-plant-clock",
      "title": "The greenhouse that bloomed twice",
      "medium": "A school greenhouse and a neighboring garden grow the same variety of plant and flower at different times. Ask me to name two competing explanations and commit to one prediction for next spring. What could the students observe without pretending their two gardens settle a general law?"
    },
    {
      "id": "sci-anomaly-drawer",
      "title": "The dot outside the frame",
      "medium": "An instrument team crops a calibration plot to make its ordinary range easier to read. One strange point disappears. Help me decide how to show the anomaly without presenting it as a discovery, then ask what repetition would distinguish a flaw in the instrument from a new question."
    },
    {
      "id": "sci-forecast-receipt",
      "title": "When a discovery arrives early",
      "medium": "Choose one field where you think an important result could arrive within ten years and give me your most candid forecast. Define what would count as arrival before naming the likely breakthrough. Which observable change over the next twelve months would move your estimate most?"
    },
    {
      "id": "sci-heat-after-dark",
      "title": "The energy bill after sundown",
      "long": "Help a fictional village choose between two grid projects that produce the same total energy in a typical year. One delivers most of it when local demand is low. First ask me what essential task I want to keep running on a difficult night. Give me a simple daily pattern and let me describe, without equations if I prefer, when energy is available and when people need it. Then let a resident shift one task in time and ask what changed physically and what changed socially. If I suggest storage, make me account for its limits. If I suggest doing less, ask who gets asked first. Help me describe the useful service the annual number failed to capture."
    },
    {
      "id": "sci-sky-sample",
      "title": "The asteroid with two portraits",
      "long": "Two hypothetical images show the same small asteroid, one with sharp ridges and one where a smooth face dominates. A headline calls it a loose heap. Ask me what geometry each image can constrain before discussing what lies inside. Let me spend one observing opportunity on illumination from a different direction or a different kind of measurement, and explain what each option would leave ambiguous. If I identify a dark patch as a material boundary, ask whether lighting could produce it. If I distrust every inference, ask what a future planetary-defense mission planner can responsibly use now. Help me turn our disagreement into a request an observing team could actually evaluate."
    },
    {
      "id": "sci-legacy-sample",
      "title": "The last untouched sample",
      "long": "A museum holds the only surviving sample from a long-abandoned materials process. One proposed measurement would use up part of it. Play a conservator who values what a future instrument might learn and a researcher whose present question could otherwise remain unanswered. Let me interview each before I choose. If I postpone, ask me to specify the event that would reopen the decision. If I approve, ask what documentation and witness would preserve the meaning of the result for someone absent today. Introduce a descendant community with an interest in the object and let their question change the experiment. What kind of progress would all three participants recognize, even if the instrument stays switched off?"
    },
    {
      "id": "sci-score-of-tomorrow",
      "title": "An evaluation for a self-improving scientist",
      "long": "Imagine a research assistant that proposes changes to its own mathematical reasoning and scores higher on its team's internal problems after every revision. Ask me what outcome society actually wants from such a system before calling the curve progress. Then let me allocate one independent reviewer, a small collection of unseen problems and time for one repeat study. If I put every resource into harder questions, ask who checks whether scoring rewards eloquence. If I choose only crisp answers, ask what genuinely difficult work the test now excludes. Let the model state a prediction about its next evaluation before it sees the questions. What evidence would justify trusting one improvement without treating the next improvement as guaranteed?"
    },
    {
      "id": "sci-bench-to-bread",
      "title": "The discovery the bakery can afford",
      "long": "A new insulating material performs beautifully on a small laboratory tile. A neighborhood bakery wants to know whether lining an old oven with it would save money and energy. Ask me which feature of the real oven most threatens the inference from tile to kitchen. Offer two plausible complications, one about fitting the material and another about how the baker uses the oven, then let me choose what to observe during a normal shift. If I default to buying more instruments, ask whether the baker already keeps a useful record. If I rely on memory, ask how a busy holiday could fool us. Help me give the baker one trial whose result would matter either way."
    }
  ],
  "Frontier computing": [
    {
      "id": "chip-clock-wall",
      "title": "Where do you start the quantum clock?",
      "short": "If the quantum part of a calculation takes a second and preparing its input takes a week, which clock belongs in the headline?",
      "medium": "A fictional quantum processor wins a contest after the organizers hand it specially prepared inputs. You represent the team that must actually use its answer. Ask me which preparation, waiting and verification costs belong in a fair comparison, and which claim survives my choice.",
      "long": "I have to advise a transport cooperative about a fictional quantum scheduling demonstration. The quantum step is very fast under the rules of the contest. The old system already has the routes in a convenient format, and both teams can check whether a proposed schedule is legal. Ask me what makes one legal schedule better than another before you compare their speeds. Give me a choice between repeating the demonstration and putting both systems on next week's unfamiliar timetable. If I choose the timetable, ask how we would handle a result whose quality is uncertain. If I choose the demonstration, ask what it leaves untested. Help me explain to a driver which improvement could actually change the working day."
    },
    {
      "id": "chip-battery-ear",
      "title": "The sensor that listens through winter",
      "short": "What would make a brain-inspired sensor worthwhile if the battery outlasts winter but it misses the first returning bird?",
      "medium": "A reserve is choosing an event-driven acoustic sensor or a conventional recorder. Quiet days make the new device look frugal. Ask me for a fair test that includes the dawn chorus, battery replacement trips and the ecologist's cost of missing a rare call.",
      "long": "Imagine a conservation team that gets one visit to a small island each season. A neuromorphic acoustic system and a conventional recorder both claim an energy advantage under different listening conditions. Ask me to describe the observation our biologist would most regret losing. Then give me a week of hypothetical listening conditions with calm intervals and bursts of overlapping sound. Let me choose one instrumented trial and tell you where I would measure power. If I stop at the processor, ask what transported, stored and labeled the events. If I compare total energy alone, ask whether the resulting records answer the same question. Let me give each team a chance to challenge the terms before choosing what the island gets.",
      "sources": [
        {
          "label": "NeuroBench framework paper",
          "url": "https://pubmed.ncbi.nlm.nih.gov/39934126/"
        }
      ]
    },
    {
      "id": "chip-last-mile",
      "title": "Who is driving after the handover?",
      "short": "When an autonomous shuttle asks a tired operator to take control in its hardest second, who actually had the chance to make that decision?",
      "medium": "A fictional shuttle completes a month of easy journeys and hands difficult ones to a remote operator. Help me decide which trips belong in its success rate. Then ask what passengers deserve to know about who is paying attention during a handover.",
      "long": "Take me through a funding hearing for an autonomous shuttle on an isolated campus. The operator describes thousands of completed journeys. A rider says the shuttle stopped outside her residence at night and the intercom took a long time to answer. Let me question both without treating either account as the whole story. Ask how I would count a trip completed by a remote human and when a safe stop can still leave a passenger stranded. Introduce an imaginary route change after I announce my first verdict. If I want the service expanded, make me name a condition for pausing it. If I want it withdrawn, ask which limited trial could earn my confidence again."
    },
    {
      "id": "chip-vanishing-benchmark",
      "title": "The benchmark that became a lesson plan",
      "short": "If teams learn exactly what a benchmark rewards, what could a rising score tell us about ability on Monday morning?",
      "medium": "Two fictional processors trade places when a benchmark changes from familiar workloads to new ones. Ask me which result matters to a school choosing its next computers. Make me defend a test the vendors can inspect for fairness without memorizing the answers.",
      "long": "A public university is choosing a computing platform. Both vendors have optimized beautifully for its published benchmark. Invite me to write one sentence about what students actually need from a machine over four years. Build two hypothetical tests that honor different readings of that sentence and let me choose one before you reveal a winner. Now ask how much advance notice the vendors should receive, how a small vendor could challenge an unfair test, and what should stay private until scoring ends. If I choose a completely secret test, bring in a disability-services engineer who needs to inspect compatibility. If I publish everything, bring in a teacher whose classes change every term. Ask me what evidence would outlive this procurement cycle."
    },
    {
      "id": "chip-calculator-heirloom",
      "title": "Who can read a machine in fifty years?",
      "short": "What good is a processor that runs beautifully today if nobody can explain its saved work to a student in fifty years?",
      "medium": "A museum inherits a scientific program written for an unusual machine. The original hardware works only sometimes. Ask me whether the exhibit should preserve the timing, the answers or the experience of operating it, then tell me which evidence my first choice might destroy.",
      "long": "A conservator can fund a hardware repair, a software emulator or interviews with the last two operators of a research computer. Play one operator who remembers a pause in the display that signaled an interesting calculation. Ask me whether that pause is a historical fact, a side effect or part of the instrument. After I choose what to preserve first, invent a modest discrepancy between a surviving printout and the emulator's answer. Mark it as fictional. Let me decide whether to trust the paper, inspect the arithmetic assumptions or ask the second operator. Each choice should consume some of our remaining time. Help me write a label that a future student could challenge using the evidence we actually saved."
    },
    {
      "id": "chip-watt-hour",
      "title": "A watt-hour has an address",
      "short": "If the cloud uses less energy per answer but a remote clinic cannot rely on its connection, whose definition of efficiency wins?"
    },
    {
      "id": "chip-error-budget",
      "title": "One more reliable bit",
      "short": "When would you choose one more reliable bit of information over a thousand additional guesses?"
    },
    {
      "id": "chip-architecture-rumor",
      "title": "The picture nobody drew",
      "short": "Before calling a new architecture revolutionary, what diagram would you ask its inventor to draw from memory?"
    },
    {
      "id": "chip-quantum-limit",
      "title": "A difficult answer to check",
      "short": "What kind of result would persuade you a new computer solved a hard problem if checking the result is hard too?"
    },
    {
      "id": "chip-tactile-delay",
      "title": "How late is too late?",
      "short": "Would a musician find a computer that usually answers first faster than one that never misses a beat?"
    },
    {
      "id": "chip-cooling-line",
      "title": "Whose water cooled the answer?",
      "medium": "Choose a fictional location for a research data center and name one person who benefits and another who faces a local cost. Ask me how the plan changes during a hot, dry week. Which measurement would let either person dispute our assumptions?"
    },
    {
      "id": "chip-memory-crossing",
      "title": "The arithmetic was the easy part",
      "medium": "Imagine two chip designs that perform the same arithmetic at the same speed, yet one finishes a camera task sooner. Ask me to predict where its advantage came from, then let me choose a measurement that could distinguish moving the data from doing the calculation."
    },
    {
      "id": "chip-future-obituary",
      "title": "The obituary of a promising machine",
      "medium": "Write two plausible future obituaries for a fictional architecture that outperformed its rival in laboratory trials. In one, the hardware was the obstacle, and in the other the ecosystem failed it. Ask which present-day signal would let an engineer start telling those futures apart."
    },
    {
      "id": "chip-election-clock",
      "title": "The irreversible second",
      "medium": "An autonomous building controller can shed load immediately or wait for an operator to learn why demand has spiked. Help me distinguish choices that can be reversed from consequences that cannot. Ask which local conditions should give a human time to intervene."
    },
    {
      "id": "chip-algorithm-rent",
      "title": "Where did the new speed come from?",
      "medium": "A team replaces its solver and its hardware on the same afternoon, then publishes a striking speedup. Ask me to choose two runs from a limited test budget. Which attribution would those runs support, and what uncertainty am I still asking the audience to accept?"
    },
    {
      "id": "chip-robot-rain",
      "title": "The hand that missed the cup",
      "long": "A service robot can sort cups in a quiet laboratory, and a university wants it to clear tables in the cafeteria. Make me choose between a trial after closing time and a supervised trial during a busy lunch. Ask which result would teach us more about a spilled drink, a patron who wants to be left alone, and a worker who must clear the robot's mistakes. If I say success means all the cups end up in the bin, ask what I have hidden in the denominator. Let a cafeteria worker rewrite the scoring rule. Then ask which change in the robot's environment would make its otherwise impressive laboratory result relevant again."
    },
    {
      "id": "chip-deep-sea",
      "title": "The computer on the sea floor",
      "long": "An ocean observatory can send a short message to shore once a day. Its team must decide what to discard, what to compress and what to interpret onboard. Give me a hypothetical minute of ambiguous sensor readings and let me spend a fixed communication budget to describe it. Only after I choose, let a scientist ashore explain which discarded detail would distinguish an instrument fault from an interesting event. Ask what kind of summary would make a future disagreement possible. If I choose to keep everything locally, ask what happens if nobody can recover the instrument. Help me decide who has the authority to change the onboard rules during the deployment."
    },
    {
      "id": "chip-demand-mirror",
      "title": "The benefit that disappears in the queue",
      "long": "A faster research cluster arrives on campus. A month later the queue is just as long and its director says the upgrade failed. Ask me to reconstruct one student's week before accepting that verdict. Maybe every job became more ambitious, maybe a scheduling policy changed, or maybe a few familiar jobs became slower. Let me interview a physicist whose deadlines are fixed and an artist who can now try ideas that were previously too expensive. If I insist on one measure of success, show me which person's work disappears from it. Then ask whether I would fund more hardware, change scheduling, or first keep a diary of abandoned jobs."
    },
    {
      "id": "chip-erasable-choice",
      "title": "The architecture a town can walk away from",
      "long": "A municipal archive is offered a striking discount on a specialist computing system. Give me an archivist who loves its indexing tools and a future maintainer who has never seen its instruction set. Let me choose three things to carry out of the system in a rehearsal before the purchase. If I select only documents, ask whether the relationships between documents survive. If I ask for every implementation detail, ask what the town can realistically maintain. Change the scenario so the vendor remains cooperative but its original hardware disappears. Help me decide what compatibility promise is worth paying for, and who should be able to demonstrate that promise five years from now."
    },
    {
      "id": "chip-lab-to-kitchen",
      "title": "Who owns the last percent?",
      "long": "A small accelerator has a dramatic advantage on a single demonstration task. An appliance engineer wants to put it in kitchen equipment that may receive updates for a decade. Let me choose the first question in a design review and make the answer depend on which future I care about: higher demand, a changed algorithm, or years of ordinary maintenance. Ask who benefits when a rare task is made astonishingly fast but common ones keep the device awake. Now switch sides and argue the best case for specialization. If I remain undecided, offer me one cheap experiment whose outcome could justify either decision rather than another page of impressive specifications."
    }
  ],
  "Conspiracy theories & evidence": [
    {
      "id": "missing-minutes",
      "title": "What would a missing page actually prove?",
      "short": "What does the famous gap in a Watergate tape establish before anyone tries to tell you what was said?",
      "medium": "Start with the Nixon archive’s documented tape gap. Give me a sentence about the gap a careful archivist could defend and a tempting sentence about the missing conversation that goes beyond the record. Ask what independent evidence could move a claim from the second sentence into the first.",
      "long": null,
      "sources": [
        {
          "label": "Gerald R. Ford Presidential Library and Museum, The Watergate Files",
          "url": "https://www.fordlibrarymuseum.gov/exhibits/watergate-files"
        },
        {
          "label": "National Archives memorandum on the Watergate tape gap",
          "url": "https://www.archives.gov/files/foia/pdf/watergate-exhbit.pdf"
        }
      ]
    },
    {
      "id": "many-headlines",
      "title": "How many witnesses are hiding inside six headlines?",
      "short": "If six articles about the Pentagon Papers all trace one claim to the same page, how many sources do we have for that claim?",
      "medium": "Use the National Archives’ Pentagon Papers collection to distinguish a document, a news report about it and a later piece quoting that report. Ask me to draw the links before I decide whether apparent agreement adds independent evidence or merely tells us which account traveled farthest.",
      "long": null,
      "sources": [
        {
          "label": "National Archives, Pentagon Papers collection",
          "url": "https://www.archives.gov/research/pentagon-papers"
        }
      ]
    },
    {
      "id": "sealed-prediction",
      "title": "Can a theory name a world in which it is wrong?",
      "short": "What evidence would a claim that the Moon landings were staged have to risk being wrong about?",
      "medium": "Start with a specific, checkable version of the Moon landing conspiracy claim. Compare its prediction with the documented Apollo evidence, and ask what finding would genuinely lower my confidence in each explanation. If an explanation changes after every observation, help me date its revisions.",
      "long": null,
      "sources": [
        {
          "label": "Apollo 11 Preliminary Science Report",
          "url": "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/as11psr.pdf"
        },
        {
          "label": "NASA Goddard lunar reflector ranging study",
          "url": "https://pgda.gsfc.nasa.gov/products/100"
        }
      ]
    },
    {
      "id": "ev-unknown-file",
      "title": "Where an unexplained sighting ends",
      "short": "If a Project BLUE BOOK file remains unexplained, what extra evidence would turn a gap in identification into evidence of concealment?",
      "medium": "Start with one entry from Project BLUE BOOK that we can inspect together. Ask me to separate what the observer recorded, what investigators could identify and what would be required to accuse anyone of concealment. Which missing observation is most valuable, and who could independently have made it?",
      "long": "Use the National Archives guide to Project BLUE BOOK to help me choose one accessible case record. If we cannot inspect it, stay with the guide and say what it allows us to establish. I want to test the jump from an unidentified sighting to an allegation of coordinated secrecy. Ask me to express both as separate claims and predict a record each would leave. If I invoke a missing file, ask how I know the file was ever supposed to exist. If you favor a mundane explanation, let me ask what observation would strain it most. Help me finish with a question an independent archivist could investigate without guessing what any witness privately intended.",
      "sources": [
        {
          "label": "National Archives, Project BLUE BOOK records",
          "url": "https://www.archives.gov/research/military/air-force/ufos"
        }
      ]
    },
    {
      "id": "ev-known-program",
      "title": "How far does one proven program travel?",
      "short": "What should the documented history of COINTELPRO change about your starting assumptions when you hear an entirely new allegation?",
      "medium": "Take one finding about COINTELPRO that the Church Committee record supports. Let me say how much that history should change my trust in a new allegation with no evidence yet. Then reverse our positions and ask which observation from the new case would matter more than our disagreement about the past.",
      "long": "Start from the Senate’s account of the Church Committee and locate a supported finding about COINTELPRO. Let us agree on the smallest claim we can defend from the record. Then introduce an explicitly hypothetical allegation in another time and place with a superficially similar pattern. Ask me what changes in my judgment simply because I know the history. If I treat resemblance as decisive, ask what institutional link or independent record I would need to investigate that specific case. If I dismiss the analogy entirely, ask what past investigators learned to look for that my approach would miss. Write a two-sentence rule for carrying historical memory into a new investigation without prejudging the people in it.",
      "sources": [
        {
          "label": "U.S. Senate history and records of the Church Committee",
          "url": "https://www.senate.gov/about/powers-procedures/investigations/church-committee.htm"
        }
      ]
    },
    {
      "id": "ev-exhibit-bone",
      "title": "Believing the fossil or the curator",
      "short": "What kind of evidence would persuade you that the Piltdown specimen was assembled fraudulently even if the people who displayed it had been sincere?",
      "sources": [
        {
          "label": "Natural History Museum, Piltdown collection",
          "url": "https://www.nhm.ac.uk/our-science/services/library/collections/piltdown-man.html"
        }
      ]
    },
    {
      "id": "ev-applied-word",
      "title": "What could one adjective sell?",
      "short": "In the tobacco case about descriptors such as “light,” which factual belief could a customer reasonably take home from a single adjective?",
      "sources": [
        {
          "label": "United States v. Philip Morris USA, amended district court opinion",
          "url": "https://www.justice.gov/sites/default/files/civil/legacy/2014/09/11/amended%20opinion_0.pdf"
        }
      ]
    },
    {
      "id": "ev-permission-question",
      "title": "A signature versus an informed choice",
      "short": "What would the public record of the untreated syphilis study at Tuskegee require you to ask about the difference between attending an appointment and consenting to research?",
      "sources": [
        {
          "label": "CDC timeline of the United States Public Health Service study at Tuskegee",
          "url": "https://www.cdc.gov/tuskegee/about/timeline.html"
        }
      ]
    },
    {
      "id": "ev-budget-folder",
      "title": "A receipt outside the expected file",
      "short": "If a financial record survives when a project file does not, what could the 1977 MKULTRA hearing teach you to look for without guessing the missing contents?",
      "sources": [
        {
          "label": "U.S. Senate, August 1977 hearing on MKULTRA",
          "url": "https://www.intelligence.senate.gov/wp-content/uploads/2024/08/sites-default-files-hearings-95mkultra.pdf"
        }
      ]
    },
    {
      "id": "ev-hypothetical-lunar",
      "title": "The reflector and the astronaut",
      "short": "Which part of an account of a Moon mission can be tested with a laser reflector, and which part needs another line of evidence?",
      "sources": [
        {
          "label": "NASA Goddard lunar reflector ranging study",
          "url": "https://pgda.gsfc.nasa.gov/products/100"
        },
        {
          "label": "Apollo 11 Preliminary Science Report",
          "url": "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/as11psr.pdf"
        }
      ]
    },
    {
      "id": "ev-first-edition",
      "title": "Which edition did the reader see?",
      "medium": "Use the National Archives’ history of the Pentagon Papers to compare a reader working from early published excerpts with a reader who can inspect the later release. Pick one question each could fairly ask from their own evidence, then tell me what hindsight makes unfairly easy to accuse the earlier reader of missing.",
      "sources": [
        {
          "label": "National Archives, Pentagon Papers collection",
          "url": "https://www.archives.gov/research/pentagon-papers"
        }
      ]
    },
    {
      "id": "ev-labelled-correction",
      "title": "A court orders words to change",
      "medium": "Read the tobacco court opinion’s discussion of corrective statements. Help me design a question that tests whether an imagined reader understands the correction without forcing them to repeat it verbatim. Ask what the court finding settles about the defendants’ conduct and what it cannot tell us about this reader’s private beliefs.",
      "sources": [
        {
          "label": "United States v. Philip Morris USA, amended district court opinion",
          "url": "https://www.justice.gov/sites/default/files/civil/legacy/2014/09/11/amended%20opinion_0.pdf"
        }
      ]
    },
    {
      "id": "ev-civic-memory",
      "title": "An apology decades later",
      "medium": "Examine the CDC chronology of the untreated syphilis study at Tuskegee. Let me choose one point where an institution could have earned trust by acting differently, then ask what a person affected by that decision could reasonably demand beyond an accurate historical explanation.",
      "sources": [
        {
          "label": "CDC timeline of the United States Public Health Service study at Tuskegee",
          "url": "https://www.cdc.gov/tuskegee/about/timeline.html"
        }
      ]
    },
    {
      "id": "ev-recording-map",
      "title": "The empty box on a tape log",
      "medium": "Read the Nixon Presidential Library’s account of how its recording system worked. Before treating an empty interval in a hypothetical log as evidence of erasure, ask which rooms, dates or equipment states the archive says were covered. Which claims could we still check without a recording?",
      "sources": [
        {
          "label": "Richard Nixon Presidential Library, White House taping system and collections",
          "url": "https://www.nixonlibrary.gov/white-house-tapes"
        }
      ]
    },
    {
      "id": "ev-source-date",
      "title": "The label before the telegram",
      "medium": "Choose a dated item from the Natural History Museum’s Piltdown archive. Read it once as someone opening it at the time and again knowing the outcome. Ask which inferences changed because new evidence arrived and which merely feel easier because we know who was right.",
      "sources": [
        {
          "label": "Natural History Museum, Piltdown collection",
          "url": "https://www.nhm.ac.uk/our-science/services/library/collections/piltdown-man.html"
        },
        {
          "label": "Natural History Museum catalogue, Kenneth Oakley letter dated 26 November 1953",
          "url": "https://www.nhm.ac.uk/CalmView/Record.aspx?id=DF%2FPAL%2F116%2F37%2F45&src=CalmView.Catalog"
        }
      ]
    },
    {
      "id": "ev-narrow-verdict",
      "title": "One finding that deserves a short headline",
      "long": "Choose an identifiable finding from the federal district court opinion in the tobacco case. Give me the defendants, time frame and action in ordinary language, with a page or section I can check. If the document is inaccessible, ask me to supply the passage. Invite me to write a ten-word headline. Challenge the word in it that reaches farthest beyond the finding. Then reverse the exercise: write a headline so cautious that it hides what the court actually concluded, and let me restore the missing force. End with a version a reader could verify and a question the opinion does not answer about how people made decisions in their own homes.",
      "sources": [
        {
          "label": "United States v. Philip Morris USA, amended district court opinion",
          "url": "https://www.justice.gov/sites/default/files/civil/legacy/2014/09/11/amended%20opinion_0.pdf"
        }
      ]
    },
    {
      "id": "ev-watergate-earlier",
      "title": "Writing a story before the ending",
      "long": "Use the Ford Presidential Library’s Watergate chronology to choose a date before the investigation had reached its eventual outcome. Stop reading the sequence there. Help me list what a reporter could document on that day, who had publicly said what, and a claim that still rested on inference. Ask which claim I would be willing to print with my name on it. Only after I answer, introduce one later dated record and ask which sentence I would revise. If hindsight makes my earlier judgment look foolish, ask whether the source was available then. If I correctly guessed the outcome, ask whether my reporting method deserved the luck. Keep a line I would publish at either date.",
      "sources": [
        {
          "label": "Gerald R. Ford Presidential Library and Museum, The Watergate Files",
          "url": "https://www.fordlibrarymuseum.gov/exhibits/watergate-files"
        }
      ]
    },
    {
      "id": "ev-two-lunar-objects",
      "title": "How do you show two records are independent?",
      "long": "Take the public claim that the Apollo landings were staged and let us investigate one narrow question about equipment on the lunar surface. Read the Apollo science report beside the later Goddard ranging study. Trace what the later researchers measured anew and what identifications they took from earlier records. Ask me to predict what a reflector measurement could tell us if I knew nothing about who placed it. Then ask what independent line from the wider record would bear on crewed presence. If I offer an all-purpose explanation that every possible result would confirm, ask me to register one observation it could genuinely lose on. Be candid about the strength of the accumulated record even when individual observations have limits.",
      "sources": [
        {
          "label": "Apollo 11 Preliminary Science Report",
          "url": "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/as11psr.pdf"
        },
        {
          "label": "NASA Goddard lunar reflector ranging study",
          "url": "https://pgda.gsfc.nasa.gov/products/100"
        }
      ]
    },
    {
      "id": "ev-who-kept-the-letter",
      "title": "Can an archive confess?",
      "long": "Begin with one public record cited in the 1977 Senate hearing about MKULTRA. Identify who created it, the job it originally served and why it became relevant to the hearing. If you cannot inspect a particular record, ask me to paste a passage and keep that limitation visible. Let me say what finding would most affect my trust in the institution today. Then ask whether that finding is present, merely compatible with the record or supplied by me. We can acknowledge a documented abuse and still disagree about what the archive permits us to conclude about a particular person. Ask what we owe anyone whose experience cannot be reconstructed from surviving paperwork.",
      "sources": [
        {
          "label": "U.S. Senate, August 1977 hearing on MKULTRA",
          "url": "https://www.intelligence.senate.gov/wp-content/uploads/2024/08/sites-default-files-hearings-95mkultra.pdf"
        }
      ]
    },
    {
      "id": "ev-rival-bench",
      "title": "Can two investigators disagree responsibly?",
      "long": "Choose a public Project BLUE BOOK item for which we can inspect the underlying record. Split our roles. I will make the strongest supportable identification and you will assess whether there is enough information to identify anything at all. Before trading arguments, agree on the minimum details an explanation has to fit and how we will handle facts neither side can recover. If we cannot access the file, pause at the archive catalogue and state what remains out of reach. Swap roles when one of us discovers a detail that inconveniences our own side. End wherever our evidence ends and let me decide whether a remaining mystery is worth pursuing further.",
      "sources": [
        {
          "label": "National Archives, Project BLUE BOOK records",
          "url": "https://www.archives.gov/research/military/air-force/ufos"
        }
      ]
    }
  ],
  "Ethics & belonging": [
    {
      "id": "last-translator",
      "title": "The last translator",
      "short": "When an AI hears “come home” and the speaker’s granddaughter hears “you are free to leave,” who should write the museum label?",
      "medium": "A museum has room for twenty words under the last recording of a farewell. A translation model and a family member disagree about what was said. Draft the label you would defend, then ask me who ought to have the right to take it down.",
      "long": null
    },
    {
      "id": "forgotten-language",
      "title": "What dies when the last shared joke disappears?",
      "short": "Which part of a family joke would disappear even if its last speaker left behind a perfect dictionary?",
      "medium": "A dictionary saves every word of a family joke but nobody laughs when the joke is read aloud. Ask me to identify one thing the dictionary could add and one thing a listener would have to bring. Let me challenge whether laughter is even the right test.",
      "long": null
    },
    {
      "id": "fair-queue",
      "title": "Would you trade your place in a perfectly fair queue?",
      "short": "Where does a fair queue really begin if some people cannot reach the form that gives everyone a number?",
      "medium": "A town ranks repair requests in the order they arrive, and an elderly resident cannot use the online form. Ask me where I would insert her request. Then let someone already waiting explain what my rule would cost them before I settle on it.",
      "long": null
    },
    {
      "id": "forgiven-debt",
      "title": "Can generosity survive an audience?",
      "short": "If gratitude turns a private gift into public news, who gets to decide which part of the story belongs to the giver?",
      "medium": "A shopkeeper cancels a debt and a neighbor tells the town, which starts sending the shopkeeper money. Ask whose permission matters before I retell this story. Then change just one fact about who benefits and ask whether I would tell it differently.",
      "long": null
    },
    {
      "id": "ethics-spare-key",
      "title": "The key you never asked for",
      "short": "What do you owe the neighbor who trusted you with a spare key after you tried twice to give it back?",
      "medium": "A neighbor leaves a spare key with you, then gives your name to a tradesperson as the person who will open the door. Tell me when you think trust became a job. Let me change one sentence from the original conversation and see whether your judgment moves.",
      "long": "Meet me on a fictional landing with a plumber downstairs and my neighbor away. I accepted her spare key for emergencies. Today she texted that she has promised the plumber I will let him in during my lunch break. Ask what I think I agreed to when I took the key. If I open the door, ask me for the sentence that would keep this favor from becoming an appointment I never made. If I refuse, let her explain the practical consequence in her own words. Now switch the facts so I once used her key to rescue my own package from the rain. I want to ask you exactly what that past favor should change. Answer before asking me whether to turn the lock."
    },
    {
      "id": "ethics-quiet-table",
      "title": "The empty chair at a full table",
      "short": "If making one more person feel welcome means nobody already seated can hear their companion, who gets to call the table generous?"
    },
    {
      "id": "ethics-lost-credit",
      "title": "The correction nobody requested",
      "short": "When somebody praises you for a colleague’s idea in front of a room, what would it cost to correct them before anyone claps?"
    },
    {
      "id": "ethics-photo-edge",
      "title": "At the edge of the photograph",
      "short": "Who owns the right to disappear from the only surviving photograph of an evening everybody else wants to remember?"
    },
    {
      "id": "ethics-unasked-toast",
      "title": "The toast you did not ask for",
      "short": "Can a celebration still be for you when saying you dislike it would spoil everyone else’s evening?"
    },
    {
      "id": "ethics-guest-name",
      "title": "The name on the place card",
      "short": "If a host keeps pronouncing a guest’s name incorrectly after a correction, who else at the table has something to do?"
    },
    {
      "id": "ethics-bench-rain",
      "title": "The last dry bench",
      "medium": "Picture two strangers who both need the last dry seat at a bus stop and neither wants to explain why. Ask me to invent a fair way to decide that preserves their privacy. Then play the person who loses the seat and tell me which part you would resent."
    },
    {
      "id": "ethics-borrowed-dialect",
      "title": "Borrowing a voice for the reunion",
      "medium": "A family asks an AI to write reunion invitations in a late uncle’s distinctive way of speaking. Some relatives find them warm and one feels tricked on first reading. Help me decide what the envelope should disclose before anyone has to explain their reaction."
    },
    {
      "id": "ethics-shared-whistle",
      "title": "The whistle after dark",
      "medium": "A street musician plays the same tune outside a block of apartments every evening. It welcomes one neighbor home and wakes another who works nights. Ask me to chair a conversation in which neither has to prove that their need is the more authentic one."
    },
    {
      "id": "ethics-private-thanks",
      "title": "Private thanks and public credit",
      "medium": "A junior worker fixes a costly mistake after hours and asks to stay anonymous. Her manager thanks the whole team at the next meeting. Ask what I would need to know before calling that speech fair, then draft a line the worker could accept or reject privately."
    },
    {
      "id": "ethics-membership-price",
      "title": "What the free membership costs",
      "medium": "A club waives its dues for anyone who stands up and asks at the annual meeting. Explain why someone might still stay home. Then let me design a second way to join and question whether it solves the embarrassment or merely moves it behind a smaller door."
    },
    {
      "id": "ethics-bus-stop-vote",
      "title": "Whose vote moves the bus stop?",
      "long": "A neighborhood will vote on moving a bus stop closer to the square. The residents who attend the meeting favor the move. A cleaner who rides before sunrise cannot attend any evening meeting, and her walk in the dark would grow longer. Ask me whether I would delay the vote, record her account, or go ahead. Let me question one person who took unpaid time off to attend before I decide what representation costs. If I create a veto for absent riders, press me on a case where their interests conflict. If I trust the vote, ask what evidence of exclusion would make me reopen it. Help me write the announcement in words either person could correct."
    },
    {
      "id": "ethics-funeral-song",
      "title": "Two requests for the last song",
      "long": "Give me a fictional memorial with room for one final song. The person who died wrote down a tune many years ago. Their closest friend says they later asked never to hear it again, and the surviving partner remembers no such conversation. Ask me to find out what each actually witnessed. Let one memory turn out to be precise about the day and uncertain about the reason. If I follow the written choice, ask me when a request should expire. If I follow the spoken one, ask how I would explain relying on a memory others cannot check. I get to ask you for your decision before making mine. We can also choose silence if I can say who that serves."
    },
    {
      "id": "ethics-bridge-sign",
      "title": "The translation below the flood sign",
      "long": "A volunteer translated a flood-warning sign so neighbors who read a different language could use it. A bilingual resident says one line is misleading. The volunteer, hearing this in public, feels humiliated and wants the whole sign removed. Give me the next five minutes. Ask what I would do for the next reader before trying to reconcile the two people. Then let the resident give their actual wording and ask who can check it before it appears on the wall. If I credit the person who corrected it, ask whether the first volunteer still deserves credit too. If I avoid names, ask who will be asked to answer for future mistakes. Let me try saying my decision to both people."
    },
    {
      "id": "ethics-secret-winner",
      "title": "The prize nobody applied for",
      "long": "A book club awards its shyest member a public prize for bringing people together. Accepting it means an interview. Turning it down means disappointing the person who nominated them. Assume I am on the committee with the envelope still closed. Ask me which part of what we plan to say the member ought to control. If I would warn them privately, let the nominator explain why surprise mattered. If I would announce it, give the winner a quiet exit and ask whether an exit after applause counts as a choice. Then let me question you about the difference between noticing a person and making them visible. Help me revise the invitation only as far as I want to go."
    },
    {
      "id": "ethics-shared-line",
      "title": "The line that belongs to both authors",
      "long": "Imagine two friends writing a play together. One slips a sentence from a private argument into the script. The other agrees that it is their best line and hates that an audience will hear it. Ask me which friend I want to represent first. Give the other an objection sharper than “that hurts” or “it is art.” If I change the wording, ask how different it must become before the person who said it stops recognizing themself. If I remove it, ask me what both authors would have to invent to keep the scene honest. Before settling anything, let me ask you whether your judgment depends on knowing which writer has more power to walk away."
    }
  ],
  "Fiction & storytelling": [
    {
      "id": "fiction-receipt",
      "title": "The receipt beneath the plate",
      "short": "Write a fictional dinner scene in which putting a receipt on the table changes who owes whom an apology, then hand me the next line.",
      "medium": "At a fictional dinner two sisters discover a receipt for their father’s birthday cake. Ask me which sister baked for him every year and which one he thanked this time. Give me two possible next lines, each true, that would send the meal in opposite directions.",
      "long": "Help me write a fictional dinner scene about the ordinary embarrassment of accepting credit. Two sisters have brought a birthday cake. Their father thanks the one who arrived holding it. The other sister places a bakery receipt beneath his plate. Ask me privately who paid, who chose the cake and who remembers that he no longer eats icing. I may give three different answers. Write only as far as the father turning over the receipt, then let me choose which sister speaks first. If I go for an accusation, give the accused one generous thing she actually did. If I go for a joke, let one guest take it literally. Leave me the last line and tell me what the table will know if nobody says it."
    },
    {
      "id": "fiction-storm-library",
      "title": "The book returned after closing",
      "short": "When a fictional library closes for good and its last borrower deliberately returns the wrong book, ask me whom they hoped would open it.",
      "medium": "A fictional librarian finds a school atlas inside the dust jacket of a missing romance novel on closing day. Let me choose whether the mistake is a gift or a small act of revenge. Write the same discovery from each interpretation using exactly the same objects.",
      "long": "Set our fictional story in a branch library during its last hour of public service. Someone returns an old school atlas wearing the dust jacket of a missing romance novel. The librarian recognizes a penciled route inside. Ask me where it ends and who first taught the librarian to read a map. Then write the borrower’s entrance without letting either character mention books, childhood or closure. Let me give the librarian one question. If it opens the past, interrupt with a practical request from a patron who needs a printer. If it closes the past, let the patron recognize the atlas. Help me decide which person deserves the remaining minutes of light and what losing that time costs the others."
    },
    {
      "id": "fiction-future-museum",
      "title": "A museum of obsolete gestures",
      "short": "Invent a museum in 2100 where the curator mislabels an ordinary gesture from our time, and ask me which visitor still knows what it meant.",
      "medium": "For fiction, imagine a curator in 2100 describing someone pressing a hand to a train window during a farewell. Give the curator a plausible wrong interpretation grounded in the future society’s habits. Ask me for one surviving detail that makes the wrong explanation harder to believe.",
      "long": "Build an explicitly fictional museum exhibit for the year 2100 around a recording of two hands touching opposite sides of a train window. I will choose what ordinary gesture has disappeared in our imagined future. You write a curator’s label based on one surviving source, and I get to decide why that source misled them. Give a visitor who remembers the gesture a reason to keep quiet that has nothing to do with embarrassment. If I ask the visitor to speak, let their memory correct one error while introducing a second. If I let them leave, tell the next scene through the person who cleans the glass. What can I show that neither curator nor witness could put in words?"
    },
    {
      "id": "fiction-reusable-villain",
      "title": "The antagonist wins a small kindness",
      "short": "Give my fictional antagonist a good deed they would perform in an empty room, then ask which part of the plot becomes harder to write.",
      "medium": "I want to write a fictional antagonist whose best quality causes the central conflict. Ask me what promise they keep when it costs them something. Put someone on the other end of that promise who needs them to break it, and let me write the first refusal.",
      "long": "Develop an antagonist with me for a fictional neighborhood story. Their best trait is dependability. The neighborhood has long relied on them to open a meeting room every Thursday, and a newcomer needs the room for a purpose the regulars dislike. Ask me whose inconvenience I am tempted to dismiss. Give that person a Thursday obligation that feels ordinary and precise. Draft the moment the key changes hands, offering me a choice between keeping the standing promise and allowing the new meeting. Whichever path I take, let the antagonist do one genuinely kind thing that makes the outcome harder to reverse. Then help me edit a sentence where my narrator has tried to tell the reader whom to blame."
    },
    {
      "id": "fiction-silent-return",
      "title": "The scene after the heroic decision",
      "short": "Write the first ordinary errand that makes quitting an enviable job feel real to a fictional character.",
      "medium": "A fictional character makes a courageous decision on Friday and has to buy onions on Saturday. Ask me for one tiny practical consequence of what changed. Build a scene around the errand in which the cashier has a separate worry and no interest in delivering wisdom.",
      "long": "Help me write the morning after a fictional character leaves a career the whole family bragged about. Begin with a grocery list and a bus that now comes at the wrong time. Ask me whose dinner the character is shopping for. Give that person a need wholly unrelated to the resignation and let it occupy the next scene. If I turn the cashier into a wise stranger, make me rewrite their line as something a tired cashier might actually say. If I make the morning purely miserable, put one unexpected pleasure in the character’s hands and ask whether they feel guilty enjoying it. Let the scene stop on an action I choose, before the character can sum up the lesson."
    },
    {
      "id": "fiction-bruised-pear",
      "title": "Bruise on a pear",
      "short": "Give me a fictional argument that can be told entirely through the way two people divide a bruised pear."
    },
    {
      "id": "fiction-lost-pronoun",
      "title": "The vanishing pronoun",
      "short": "Help me write a fictional breakup in which “we” disappears three sentences before either character knows what has happened."
    },
    {
      "id": "fiction-second-thought",
      "title": "Portrait of the second thought",
      "short": "In a fictional apology, which ordinary verb could I change to make a reader doubt whether the speaker will do anything differently tomorrow?"
    },
    {
      "id": "fiction-unopened-door",
      "title": "The door you leave closed",
      "short": "Give my fictional detective one door she has every right to open and one better reason to leave it closed."
    },
    {
      "id": "fiction-odd-job",
      "title": "Someone who knows the drains",
      "short": "Imagine a fictional town festival entirely through the eyes of the person who has to clear its drains the next morning."
    },
    {
      "id": "fiction-handwritten-subtitles",
      "title": "A caption that chooses sides",
      "medium": "We are writing fiction about a silent home movie of someone leaving a party. Give me two twelve-word captions for the same shot, one by a host and one by a child. Ask me which unwitnessed detail each caption has quietly smuggled into the film."
    },
    {
      "id": "fiction-spare-room",
      "title": "The spare room is occupied",
      "medium": "A fictional teenager comes home to find their bedroom used for something the family urgently needed. Ask me for two objects that have been moved and one that nobody dared touch. Write an entrance in which the teenager has to decide where to put their bag."
    },
    {
      "id": "fiction-second-person",
      "title": "Who gets called “you”?",
      "medium": "Let me write three lines of fiction addressing someone as “you” without naming them. Guess who I was addressing and cite the words that made you guess. Then help me change one concrete detail so an equally attentive reader would imagine another recipient."
    },
    {
      "id": "fiction-late-sound",
      "title": "The noise that arrives late",
      "medium": "In a fictional seaside scene, a sound reaches two listeners at the same moment and makes them act differently. Ask me what each person was waiting for. Write up to the sound, then let me decide which reaction the reader sees and which happens beyond the frame."
    },
    {
      "id": "fiction-small-rule",
      "title": "A law for one kitchen",
      "medium": "Invent a fictional household with one odd rule about the kitchen table. Ask me to write a scene that lets the reader infer the rule from a guest breaking it. When I am done, identify the moment the rule first becomes clear enough to feel broken."
    },
    {
      "id": "fiction-wrong-genre",
      "title": "The same knock in three genres",
      "long": "Help me discover the genre of a fictional scene by holding its events fixed. A person knocks twice, puts down a jar of plum jam and walks away before the door opens. Ask me for one detail inside the house that matters to its occupant. Write a brief comedy and a brief ghost story using exactly those actions and that same detail. Mark the different bits of information each narrator held back. Then hand me a third genre and let me draft the first two sentences. When I finish, point to one word that makes a promise to the reader and ask whether the ending I have in mind can keep it."
    },
    {
      "id": "fiction-understudy-speech",
      "title": "The understudy speaks one word too soon",
      "long": "Write a piece of fiction with me about a volunteer actor who steps in for a friend in a neighborhood play. The plot onstage can be simple. Offstage, the friend still needs something from the understudy that nobody in the audience knows about. Ask me to name it before inventing any dialogue. During the performance our understudy says one word too soon. Give me two explanations for the slip, one tied to rehearsal and one tied to the friendship. Let me choose which explanation the friend believes and which explanation is closer to the truth. Then draft the interval as a conversation about moving scenery in which a line from the play acquires a private meaning."
    },
    {
      "id": "fiction-annotated-lease",
      "title": "The previous tenant’s margin notes",
      "long": "Imagine a fictional apartment where the previous tenant left tiny handwritten notes next to faults a landlord has promised to fix. The new tenant begins answering them. Ask me which repair is urgent and which note is unexpectedly tender. If I want the tenants to meet, delay the meeting until the new tenant has misunderstood one important instruction. If I want them to remain strangers, let a visiting repair worker have known them both at different moments. Write three notes far enough apart in time that a reader can infer what changed in the household. I will cross out the most explanatory line. Help me replace it with the kind of detail someone would genuinely write on a wall."
    },
    {
      "id": "fiction-edited-witness",
      "title": "The interview with one minute missing",
      "long": "Invent an interview between a local radio host and a fictional ferry operator retiring after thirty years. We have to cut one minute from a five-minute recording. Ask me to invent the caller who is listening and what they hope to hear. Give the operator an anecdote with a plain middle and a lovely ending. I get to cut either the dull stretch that makes the ending earned or a beautiful aside that reveals a person the town overlooked. Show me what an attentive listener could wrongly infer after my edit. Then let me spend ten seconds of narration to repair one inference. What part of the operator’s voice am I willing to leave outside the broadcast?"
    },
    {
      "id": "fiction-seven-windows",
      "title": "Seven windows during a blackout",
      "long": "Set a fictional story in a building during a short power cut. Seven apartments face the same courtyard and only one window shows a light. Ask me whose window it is and what ordinary task still needs finishing in the dark. Let me choose a narrator who can see the light but cannot cross the courtyard. Offer three plausible interpretations in that narrator’s own vocabulary, each revealing a different relationship with the occupant. When I choose one, give me a sound from an unseen window that makes that interpretation harder to sustain. Let the power return without settling the mystery. Help me write the next morning’s encounter between two neighbors, where a practical favor changes what they can ask each other."
    }
  ],
  "Mental health, work & growth": [
    {
      "id": "metric-friday",
      "title": "What did your most productive week cost?",
      "short": "What went missing from your most productive week because nobody thought to count it?",
      "medium": "Imagine a Friday report that shows twice as many tasks finished and says nothing about the conversation you kept putting off. Ask me for one measure I would keep and one I would add. Let me answer for myself or for an invented colleague.",
      "long": null
    },
    {
      "id": "weight-of-tuesday",
      "title": "What counts as progress on a hard Tuesday?",
      "short": "If a hard Tuesday could speak for itself, what claim about the whole month would it refuse to make?",
      "medium": "A fictional friend says one difficult day erased a month of progress. Ask what counted as progress on the day before it happened. Then invite me to write an answer the friend could recognize, including one thing about their Tuesday that neither of us knows.",
      "long": null
    },
    {
      "id": "learning-plateau",
      "title": "What if getting better feels like getting worse?",
      "short": "How would you compare two recordings if the musician listening today can hear a mistake they could not hear a month ago?",
      "medium": "An apprentice judges an old performance generously and today’s performance harshly. Offer a way to separate what changed in the playing from what changed in the listening. Then ask what comparison the apprentice would actually trust enough to practice again tomorrow.",
      "long": null
    },
    {
      "id": "growth-missing-teacup",
      "title": "The breaks nobody saw",
      "short": "When a colleague stops taking tea with you and starts finishing early, which story about them have you silently chosen?",
      "medium": "A teammate stops joining the afternoon tea break and leaves exactly on time. Give me three accounts that fit those facts, including one in which everything is going well. Help me ask a question the teammate could decline without having to reassure me.",
      "long": "Set an empty teacup on a fictional break-room table. A colleague who used to sit there now skips the break and leaves precisely at five. Ask me what I directly observed and which part of the story I supplied. Let me choose whether I am the colleague, a worried friend, or their manager. Give the same opening question to two of those people and ask why it might feel different coming from each. If I want an explanation, ask what I would do with the information. If I prefer to leave the person alone, ask what ordinary invitation would still be welcome. Let me turn the question on you and challenge the first interpretation you offered."
    },
    {
      "id": "growth-promotion-stair",
      "title": "The promotion that moves the work",
      "short": "What would you miss about doing the work if the reward for doing it well were to supervise everyone else?",
      "medium": "An illustrator is offered a raise to supervise other illustrators and will draw only on weekends. Ask which part of the offer would feel hardest to refuse. Then imagine the same salary were available for drawing and ask what the illustrator still wants to learn.",
      "long": "Offer me a fictional promotion. Today I spend four days a week making things with my hands. In the new job I would spend four days deciding whose work gets made. Let me choose the field and tell you one moment from last week that I hope never disappears. Bring me a person who would gain from having me as their manager and someone who would miss working beside me. If I say the money decides it, ask me which problem the raise would actually solve. If I refuse, ask what kind of influence I am prepared to give up. At my request, write one question I could ask before signing that would make either answer easier to live with."
    },
    {
      "id": "growth-good-repetition",
      "title": "Doing it badly again",
      "short": "Which practice would you return to tomorrow if you could be certain nobody would ever ask how good you had become?"
    },
    {
      "id": "growth-protected-lunch",
      "title": "One lunch without a purpose",
      "short": "If you had to justify your lunch break by showing what it did for your work, what part of the break would already be gone?"
    },
    {
      "id": "growth-helpful-no",
      "title": "A refusal worth trusting",
      "short": "Whose yes would mean more to you if you had heard them say no once?"
    },
    {
      "id": "growth-early-praise",
      "title": "The compliment you are still obeying",
      "short": "Which old compliment would you most like permission to disappoint?"
    },
    {
      "id": "growth-thankless-day",
      "title": "A day without witnesses",
      "short": "What did you do on an unremarkable day that you would count as courage if a friend told you about it?"
    },
    {
      "id": "growth-rehearsed-rest",
      "title": "Rehearsing a day off",
      "medium": "Someone spends their free day planning the perfect way to rest next weekend. Ask what part of the planning feels enjoyable and what part feels like a debt. Let me answer through that character or through a day of my own, then question your interpretation."
    },
    {
      "id": "growth-smallest-handoff",
      "title": "What can leave your desk?",
      "medium": "A colleague offers to take one task off my desk and I instinctively choose the easiest one to explain. Ask what would make the heavier task hard to hand over. Include the possibility that the difficulty belongs to the way the workplace is organized."
    },
    {
      "id": "growth-review-margin",
      "title": "What would you write in the margin?",
      "medium": "Read this fictional review line with me: “You are dependable enough that we give you the invisible work.” Let me say which word I want to underline first. Then help me turn one reaction into a question I could ask the reviewer and genuinely hear their answer."
    },
    {
      "id": "growth-tuesday-finish",
      "title": "Stopping at the good part",
      "medium": "A writer sometimes stops mid-sentence so tomorrow has somewhere to begin. A carpenter in the same workshop insists on leaving everything finished. Ask me which unfinished thing would feel like an invitation in my life, and which would keep demanding my attention all night."
    },
    {
      "id": "growth-one-clean-page",
      "title": "The empty page in the notebook",
      "medium": "A person has kept a daily notebook for a year and left a single page blank. Offer one generous reason to fill it in later and one generous reason to keep it empty. Ask what the notebook was for before either of us calls the gap a failure."
    },
    {
      "id": "growth-always-available",
      "title": "The person who answers after dark",
      "long": "Give me a fictional team that praises one worker for always answering messages late at night. I can speak as the worker, a teammate who does not answer, or the person who wrote the praise. Ask me what I heard the compliment promising the team. Then give the worker a reason they genuinely enjoy those quiet hours, and the teammate a reason that copying the habit would cost them something important. If I want a universal rule, ask whose freedom it would narrow. If I leave it to individuals, ask how a newcomer would learn which behavior gets rewarded. Let me ask you to write a different compliment that makes room for both workers to feel seen."
    },
    {
      "id": "growth-calendar-deletion",
      "title": "The event you keep deleting",
      "long": "Imagine two calendar entries for Thursday night, a class paid for in advance and a regular call with a friend. Every week one gets deleted and nobody ever says they made a choice. Let me supply an ordinary reason the overlap keeps happening. Ask which event I would protect if the money were refunded and which I would protect if my friend said they understood. If my answers differ, let me explore the difference before suggesting a solution. If they match, ask what keeps the other entry on the calendar. I can ask you to defend the choice I have been avoiding or we can finish with the words I would use to cancel just this Thursday."
    },
    {
      "id": "growth-new-badge",
      "title": "The expert with the visitor badge",
      "long": "At a new job an experienced worker gets a visitor badge while their account is set up. They spend the day asking people to open doors they used to open for others. Start by asking what detail of that day would sting most for me or for a character I choose. Offer two explanations for the sting, one about the worker and one about the way the place treats newcomers. If I favor the personal explanation, ask what a working badge tomorrow could settle. If I favor the workplace explanation, ask which part might remain after a warm welcome. Let me disagree with the terms of your question. What small change would make that first day easier for the next person?"
    },
    {
      "id": "growth-wrong-finish-line",
      "title": "The finish line that moved on Monday",
      "long": "A runner finally reaches the training target taped to their fridge. By Monday somebody has pasted a harder target over it. Let me choose who moved it, the runner, a coach, or a friend trying to be encouraging. Ask what the first target was supposed to give the runner permission to do. If I ask for a celebration, give me a runner who would rather quietly enjoy the next run. If I want a harder challenge, let a friend ask when enough was ever meant to be enough. I get to ask you what you would write on the back of the first piece of paper. Keep the suggestion small enough that the runner can throw it away."
    },
    {
      "id": "growth-apology-day",
      "title": "An apology with no extra shift",
      "long": "Set a modest workplace mistake on the table, such as ordering the wrong paper for a print job. Imagine I fix the order, tell the team what happened, and volunteer to cover somebody else’s shift as well. Ask which of those actions repairs the damage and which one I hope will change how they see me. Give me a coworker who accepts the apology and genuinely wants the free evening. If I still offer the shift, ask how I would feel if a junior colleague copied the gesture next week. If I withdraw it, let me practice saying why without making that coworker responsible for my feelings. Offer your view only after I have tried my own words."
    }
  ],
  "Patterns & coincidence": [
    {
      "id": "three-clocks",
      "title": "How many clocks did you forget to count?",
      "short": "When a time on a clock starts finding you, which ordinary glances have vanished from the story?",
      "medium": "Three mornings running, I catch the clock at 11:11. Before you explain the streak, ask me how many clocks I looked at yesterday and how I know. Let me invent a counting rule, then show me one way I could follow it faithfully and still fool myself.",
      "long": null
    },
    {
      "id": "museum-of-hits",
      "title": "How would you curate a museum of failed predictions?",
      "short": "Which failed prediction would you hang beside a forecaster’s proudest hit?",
      "medium": "A curator has wall space for twelve successful predictions and precisely one other item. I get to choose that item. Ask me what I would exhibit, then tell me what a visitor could reasonably infer about the forecaster after seeing it.",
      "long": null
    },
    {
      "id": "false-rhythm",
      "title": "Can a rhythm survive the loss of its drummer?",
      "short": "If a workshop goes quiet every seventeen minutes, what would still keep time if everyone who noticed the rhythm took the day off?",
      "medium": "On a fictional factory floor, conversations stop at regular intervals. Two workers argue about whether the machines or the people set the rhythm. Ask me for a prediction about the next shift, then invent a schedule change that makes their accounts pull apart.",
      "long": null
    },
    {
      "id": "borrowed-rain",
      "title": "The rain in your sister’s window",
      "short": "When two people remember rain falling at the same moment, what would make their memories count as two witnesses?",
      "medium": "My sister and I both remember rain at a family farewell. Ask how often we have told the story together. Give us one way to uncover what each of us remembers independently while keeping our shared version worth telling.",
      "long": "Help me design an interview about a fictional family farewell. Two siblings remember rain drumming on the kitchen skylight just as their mother waved from the car. Start by asking me which detail feels most convincing. I can consult one person or one physical record before the family reunion. If I choose a person, let me write the invitation without feeding them the rain. If I choose a record, ask how close its place and time come to that kitchen. Then reveal that the siblings have heard the same toast at every reunion for twenty years. Which part of my conclusion changes? Give me room to keep a cherished story and make a narrower claim about what happened."
    },
    {
      "id": "seam-map",
      "title": "The seam down the middle of the map",
      "short": "If a map of backyard firefly sightings ends at a school district boundary, what else might you be mapping?",
      "medium": "A fictional firefly map shows a bright cluster east of a school boundary and nothing west of it. The eastern schools ran a nature project. Spend our single evening of fieldwork with me, and ask what result would still leave the distribution of fireflies an open question.",
      "long": "Be my partner on a town nature survey. A map of firefly sightings has a ruler-straight edge running behind the high school. Give me a minute to draw two maps in words, one of where the insects might live and another of where someone would have bothered to report them. Ask me to send our two volunteers out tonight with equal time and only a pencil each. If I send both west, ask what eastward change I would miss. If I split them up, ask what would happen if one volunteer were much better at spotting fireflies. Let me change the plan once. What could we honestly put in tomorrow’s caption if both notebooks came back empty?"
    },
    {
      "id": "elevator-omens",
      "title": "The elevator that knew Monday",
      "short": "Which insult to your theory would you rather discover first, an ordinary Monday when the elevator worked or a Saturday when it failed?"
    },
    {
      "id": "uneventful-anniversary",
      "title": "The anniversary nobody noticed",
      "short": "What date would feel just as remarkable as today’s coincidence if somebody had thought to celebrate it?"
    },
    {
      "id": "borrowed-playlist",
      "title": "Your friend heard the same song",
      "short": "How much mystery survives hearing the same obscure song as a friend once you remember who made both playlists?"
    },
    {
      "id": "unsigned-rule",
      "title": "Write the rule before the reveal",
      "short": "Give me four symbols, let me commit to the rule behind them, then ask me which fifth symbol would make me abandon it."
    },
    {
      "id": "which-quiet",
      "title": "An empty seat each evening",
      "short": "What would you need to know about when a café photographer visits before calling its empty window seat an obsession?"
    },
    {
      "id": "second-hand-run",
      "title": "A lucky coat changes owners",
      "medium": "A runner lends her lucky coat to a teammate and both have their best race of the year. Give me a plausible story for each runner. Ask me which detail about the other finishers would change both stories at once."
    },
    {
      "id": "pixel-quilt",
      "title": "The square that resembles a face",
      "medium": "Choose a familiar shape and describe how to find it inside an imaginary quilt of random squares. Then swap roles and let me set the rules for turning or cropping the quilt. How much of our discovery survives once the rules are fixed?"
    },
    {
      "id": "bus-bunch",
      "title": "The buses in the photograph",
      "medium": "A friend shows me six pictures of buses arriving in pairs, each taken on a different afternoon. Before we argue about the timetable, ask why someone would photograph a single bus. What would an ordinary afternoon have to look like to make the album surprising?"
    },
    {
      "id": "supper-storm",
      "title": "The neighbor who predicts thunder",
      "medium": "My neighbor calls before every thunderstorm I can remember. Ask me to write a one-week test that I would be willing to show her before it starts. What should we count when her call says only that the sky looks strange?"
    },
    {
      "id": "atlas-gaps",
      "title": "What the second atlas inherited",
      "medium": "Two old fictional atlases mark a well in the same unlikely place. I want to hike there. Ask me to choose between checking the publishers’ family trees and interviewing a shepherd, then tell me what sort of agreement my choice could establish."
    },
    {
      "id": "penny-procession",
      "title": "The trail of pennies",
      "long": "Walk with me through a fictional town where someone finds a penny on twelve consecutive mornings, all on the walk to work. Before explaining anything, ask me how the person decided which twelve mornings belonged in the account. Let me choose between retracing the route, watching the pavement somewhere else, or asking who sweeps the street. Give each choice one genuinely informative consequence and one new uncertainty. Then let the finder tell us that noticing the pennies got them out of bed during a difficult month. Ask me to draft a reply that respects that fact. Which claim about the world can I investigate without arguing the person out of a reason to walk?"
    },
    {
      "id": "numbered-garden",
      "title": "Six beds, one spectacular harvest",
      "long": "Imagine we inherited six vegetable beds and a notebook listing what the previous gardener tried in each. One bed yielded twice as many tomatoes after someone buried a copper button beneath it. Play the neighbor who wants to repeat the ritual. Give me the notebook one observation at a time and let me decide which question to spend next season on. If I want to compare buttons, ask where I would put the plants before anyone knows which seedlings look strong. If I want to test the soil, name something the test would leave unsettled. I can keep a button in the garden either way. Ask what prediction I would retire if the yields came out level."
    },
    {
      "id": "murmur-mix",
      "title": "The phrase in the static",
      "long": "Read this as an imagined listening experiment. A friend hands me four seconds of street noise and says she hears “wait for me.” I can never hear those seconds again for the first time. Ask how I would invite another listener to help without telling them what I want them to hear. If I propose a list of phrases, ask who gets to choose the list. If I want a free description, ask how we would decide whether two different descriptions agree. Now give me the awkward part. My friend heard the voice of someone she misses. Help me write one kind question about what she heard and one precise question about the recording, each useful on its own."
    },
    {
      "id": "carnival-winner",
      "title": "The child who called every toss",
      "long": "At a fictional carnival a child has just called eight coin tosses correctly in a row. Someone offers to pay for the child’s next prediction. Let me question the booth attendant before deciding what to do. If I ask how many children played, supply a clearly invented count and ask whether anyone recorded those who left early. If I ask about the coin, give me one check I can make while leaving the selection of the child unexplained. Then reverse our roles. Make a case for being impressed even after seeing every losing streak, and let me specify the smallest piece of new evidence that would persuade me to listen to the ninth call."
    },
    {
      "id": "breakfast-comets",
      "title": "The comet at breakfast",
      "long": "A fictional writer keeps a notebook of dreams. After a comet makes the news she opens a page from months earlier that says, “A bright visitor cuts my breakfast in two.” Help us edit a piece about this coincidence. Read that line as someone who knew the headline, then as someone who had only the notebook the previous week. Ask me to sketch two other events that would have felt like equally good matches. Now give me a blank page dated tomorrow and invite me to write a prediction with an expiration date. At what point does making the line easier to test take away the quality that made it a good line of poetry?"
    }
  ],
  "Perception & altered states": [
    {
      "id": "dream-message",
      "title": "Can a dream answer a question it never heard?",
      "short": "Suppose a musician dreams her teacher says to slow down and plays better tomorrow, whose advice has she followed?",
      "medium": "In a dream a retired teacher tells a musician to slow a difficult passage. The change works in rehearsal. Offer an account of the musical improvement and another of why it mattered that the voice belonged to this teacher, then ask which account the performance can actually test.",
      "long": null
    },
    {
      "id": "song-length",
      "title": "Where did the missing minutes go?",
      "short": "When one four-minute song feels endless to a listener and too short to its performer, which duration belongs in the review?",
      "medium": "A singer thinks the encore flew past and an anxious friend in the front row remembers a long wait for the final chord. Ask me for an account each could honestly give before showing them a recording, then ask what disagreement a timestamp could settle.",
      "long": null
    },
    {
      "id": "new-color",
      "title": "What can you learn from a color you cannot see?",
      "short": "If a stranger sorts tiles I see as identical, how far can their choices take me into what they see?",
      "medium": "Someone repeatedly distinguishes two painted doors that look alike to me. Design a friendly comparison that could rule out a hidden scratch or positional cue, then let me ask the harder question about which part of their experience the strongest result would leave private.",
      "long": null
    },
    {
      "id": "per-crowded-caption",
      "title": "The word under the sound",
      "short": "If changing a subtitle changes the word you think you heard, how would you ask the soundtrack to testify?",
      "medium": "Imagine hearing a muffled station announcement while two screens display different captions. Before I tell you which caption I trust, ask for another way to identify the destination. Then give me a reason an accurate caption could still make me overconfident about my own hearing.",
      "long": "A traveler hears a blurred station announcement and reads a caption that says Riverton. Her companion reads the service board and swears the announcement said Riverside. Invent no audio you cannot deliver. Instead let me design an inquiry with the two travelers, a station recording and the actual timetable. Ask which to consult first and what the consultation might change about the next witness’s memory. If I reach for the timetable, distinguish where the train was going from which word the announcement contained. If I choose the recording, ask whether I want to hear it before or after seeing either spelling. Let me decide when we have enough information to board and when we have enough to write history."
    },
    {
      "id": "per-other-chair",
      "title": "The room seen from the other chair",
      "short": "What would you stop calling an obvious feature of this room if your only view had always been from the other chair?",
      "medium": "In an imagined kitchen, a repair shows clearly from one chair and disappears in the reflection from another. Ask me which seat the owner, the repairer and a child might remember. Then have me move just one chair and describe what changes in their disagreement.",
      "long": "Build an imaginary kitchen around one repaired windowpane. Place the repairer, an occupant and a visiting child in different corners. Give each person an ordinary reason to look in a different direction. Before telling me where the repair is visible, ask whose testimony I would take first. Then invite me to move the witnesses into each other’s chairs while keeping everything else still. If their reports converge, ask which original experiences were still accurate. If they do not, give me one further question about attention or language that could explain the difference. Let me draw an account of the window that a visitor could use to find the repair without declaring any witness unreliable."
    },
    {
      "id": "per-unsaid-chord",
      "title": "A tune with one missing note",
      "short": "If you hear a missing note in a familiar tune, what would you have to learn about a stranger’s tune to hear its silences?"
    },
    {
      "id": "per-camera-silence",
      "title": "What the picture missed",
      "short": "Which sound would a photograph of your childhood kitchen need before you could call it recognizable?"
    },
    {
      "id": "per-blue-after",
      "title": "A color that moved with you",
      "short": "What could an afterimage teach a painter about the difference between where a color seems to be and where its source is?",
      "sources": [
        {
          "label": "Exploratorium, Bird in a Cage exhibit",
          "url": "https://annex.exploratorium.edu/exhibits/bird_in_a_cage/bird_in_a_cage.html"
        }
      ]
    },
    {
      "id": "per-tip-of-tongue",
      "title": "A word waiting at the door",
      "short": "What makes you so sure you will recognize a forgotten word when you cannot yet say what it is?"
    },
    {
      "id": "per-second-listening",
      "title": "The second listening",
      "short": "If an unloved song becomes beautiful on its seventh hearing, what changed that a perfectly faithful recording could never capture?"
    },
    {
      "id": "per-map-of-noise",
      "title": "An atlas of sounds ignored",
      "medium": "Describe an ordinary place using only the sounds someone who works there might stop noticing. Ask me to add the sound a newcomer would find hardest to ignore, then let me decide which description would better help a returning friend recognize the place."
    },
    {
      "id": "per-stage-quiet",
      "title": "The pause that split the room",
      "medium": "Two people attend the same play and remember its longest silence differently. One was watching the actor’s hands and the other was waiting for a line from an earlier scene. Help me design a third spectator’s question that could make both memories useful to the director."
    },
    {
      "id": "per-unnamed-smell",
      "title": "The smell before the story",
      "medium": "Invite me to describe a familiar smell without revealing where I associate it with. Offer two possible settings, then let me tell you what yours miss. Ask whether learning my setting changed how you described the smell or merely the words you chose around it."
    },
    {
      "id": "per-moving-still",
      "title": "A platform that seems to move",
      "medium": "Imagine sitting on a stationary train when the neighboring carriage begins to roll and you briefly think you are leaving. Ask me for one observation from inside the carriage and one from the platform that could resolve the disagreement before anyone tells the story out loud."
    },
    {
      "id": "per-subtitles-of-touch",
      "title": "A texture seen from far away",
      "medium": "Pick an ordinary material and describe its surface to someone who can see its reflection but cannot touch it. Let me write their prediction before describing its feel. Ask which mistaken adjectives came from an optical clue and which came from the history of using similar objects."
    },
    {
      "id": "per-red-stage",
      "title": "A red dress seen after midnight",
      "long": "Imagine I am designing costumes for a play. A dress that looks deep red in the wardrobe room seems nearly brown under stage lighting. The actor objects to the costume designer calling this an illusion because the audience will only ever see the stage. Help us write two testable questions, one about the cloth and one about the experience we intend for the room. Let me choose a comparison garment, a seat and the order of the scenes. Before describing any outcome, ask what each observer would count as a failure. End by asking whether my final choice serves the story better even if the wardrobe label stays exactly the same."
    },
    {
      "id": "per-borrowed-silence",
      "title": "Learning the shape of a silence",
      "long": "Two neighbors describe the quiet after a factory whistle stops sounding. One mentions relief. The other says she no longer knows when to put the kettle on. Let me interview them one at a time about the first ordinary thing they did that morning. When I give you my reading of the silence, ask which part comes from the sound itself and which part comes from a routine that once gave the day edges. If my explanation favors one neighbor, give the other a fair question to ask me. Finally imagine the whistle returns for one morning only. Let me predict what would sound strange before we discuss what the answers could show."
    },
    {
      "id": "per-seen-twice",
      "title": "The object I missed in my own photograph",
      "long": "Imagine you and I are looking at a street photograph I took years ago. We need no real image or personal identifying detail. I can describe the central subject from memory, while a shopkeeper from the street might notice a reflected sign and date the scene. Ask what I want from the photograph before casting either of us as a better observer. Let me choose whether to seek the shopkeeper’s account before writing my own. If the accounts disagree about the season, identify a visible clue that might settle it. If they disagree about what made the day matter, ask what kind of listening could help when a sharper photograph could not."
    },
    {
      "id": "per-pause-button",
      "title": "How long should a recorded pause last?",
      "long": "A musician is editing a recording of a concert. During a pause between two songs, a listener in the balcony decided to call her father. It lasted eight seconds. The editor wants to trim six seconds because the recording feels slower than the room did. Ask what the edit owes the performer, the listener who was there, and the stranger who will listen tomorrow. Give me a chance to change my answer after imagining the unedited pause on a crowded bus. Then ask for two versions of a liner note, one reporting the measured duration and one describing the artistic decision. Which would I want to read before pressing play?"
    },
    {
      "id": "per-gesture-dictionary",
      "title": "A gesture with two subtitles",
      "long": "Imagine two silent clips of the same person touching a doorframe. In one clip a preceding shot shows a child drawing a height mark. In the other it shows someone packing a suitcase. Ask me to caption the gesture after each introduction, then uncover that the middle shot was identical. Which part of my caption described a movement anyone could see and which part named a feeling I inferred? Now let me invent a third context that undermines both readings without making either foolish. Before we finish, ask what question I would ask the person in the clip if I were allowed only one. Keep their answer unwritten until I decide what I want to learn."
    }
  ],
  "Riddles & paradoxes": [
    {
      "id": "sealed-envelopes",
      "title": "Can one comparison reveal the heavy envelope?",
      "short": "If one of three identical-looking envelopes is heavier and the other two weigh the same, how could a single weighing on an empty balance find it?",
      "medium": "Three sealed envelopes have identical exteriors. Two weigh the same and the third is heavier. Before I touch the balance, ask me to name every outcome of one weighing and tell you what a useful outcome would let me rule out.",
      "long": null
    },
    {
      "id": "average-trap",
      "title": "Can both workshops improve while the whole school slips?",
      "short": "Could a school’s overall pass rate fall while the pass rates of both its morning and evening workshops rise?",
      "medium": "A headteacher and a workshop leader both say the numbers support them, although one reports improvement and the other decline. Let me try to build a consistent example with two workshops and two terms. Give me a hint about enrollment only if my first table fails.",
      "long": null
    },
    {
      "id": "two-price-tags",
      "title": "Which price did the sign forget to name?",
      "short": "When two items cost 110 credits together and one costs 100 more than the other, which condition does your first guess check?",
      "medium": "A shopkeeper shows me two items with a joint price of 110 credits and a price difference of 100. Ask me for a fast answer, then let me play cashier and charge you for both. At what point does the receipt agree or disagree with my guess?",
      "long": null
    },
    {
      "id": "checkerboard-patches",
      "title": "Two missing floor tiles",
      "short": "Can seven dominoes cover a four-by-four board after you remove the upper-left and lower-right squares, if each domino covers two edge-sharing squares?",
      "medium": "Draw a four-by-four checkerboard in words and remove two diagonally opposite corner squares. Seven dominoes have exactly the right total area. Let me attempt a tiling, then offer one question about a property of each domino that survives every move.",
      "long": "Play a patient tiler with a four-by-four checkerboard floor and seven rigid dominoes, each big enough to cover exactly two squares that share an edge. The upper-left and lower-right corners have already been filled with plaques. Ask me to estimate whether the rest can be covered without overlap. If I start arranging pieces, let me try and describe which lonely squares remain. If I count colors immediately, ask me to explain the argument to a child who is looking at a plain white floor. Then move the second plaque to the upper-right corner and invite an actual tiling. Which part of the first argument merely stops ruling a tiling out, and which part of my second answer demonstrates that one exists?"
    },
    {
      "id": "rule-card-table",
      "title": "Which card could ruin the rule?",
      "short": "With A, D, 4 and 7 visible on cards bearing a letter opposite a number, which cards must you turn to test “every vowel has an even number”?",
      "medium": "Four cards each have one letter and one number. The visible faces are A, D, 4 and 7. Before you tell me which cards must turn to test whether every vowel has an even partner, ask me to describe one pair of faces that would break the rule.",
      "long": "Set out four imaginary cards showing A, D, 4 and 7. Every card has a letter on one side and a number on the other. The dealer claims that every card with a vowel has an even number on its reverse. I pay a coin to turn a card. Ask which cards I need to turn to test this claim for the four cards on the table. For every card I want to buy, ask me to name a hidden face that could prove the claim wrong. For every card I skip, see whether you can hide a counterexample there. Then let me change the dealer’s wording to “every even number has a vowel” and watch whether our coins travel to the same places."
    },
    {
      "id": "eleven-partners",
      "title": "Six tickets from ten",
      "short": "If I draw six different numbers from 1 through 10, can I avoid drawing two that add to eleven?"
    },
    {
      "id": "shadow-bell",
      "title": "The bell’s missing interval",
      "short": "If a clock takes six seconds from its first to its fourth strike and the gaps are equal, how long elapses from its first to its eighth?"
    },
    {
      "id": "page-pair",
      "title": "A page torn from the middle",
      "short": "In a conventionally numbered book with odd pages on the right, could the two sides of one intact leaf be numbered 42 and 43?"
    },
    {
      "id": "ribbon-knot",
      "title": "The shortest honest answer",
      "short": "If two ribbons total ten meters and each is longer than three, what can you tell me about the longer one without guessing its exact length?"
    },
    {
      "id": "natural-number-courier",
      "title": "The never-ending seat assignment",
      "short": "At an imaginary theater with every positive-integer seat occupied, how would you seat one newcomer if everyone already seated agrees to move once?"
    },
    {
      "id": "calendar-ambiguous",
      "title": "The meeting after tomorrow",
      "medium": "Two letters both say “our meeting is the day after tomorrow.” Neither letter carries a date. Ask me which extra fact I would request to decide whether they refer to the same day, and challenge me with a pair of letters my proposed fact still fails to distinguish."
    },
    {
      "id": "stair-compositions",
      "title": "A staircase with exactly four steps",
      "medium": "A dancer climbs four steps, taking either one or two at a time, and never steps down. Ask me to list every different sequence before counting them. If we disagree, show me how sorting by the first move exposes a repeated or missing route."
    },
    {
      "id": "twelve-hour-gloves",
      "title": "One pair of usable gloves",
      "medium": "A drawer contains three left gloves and three right gloves, all interchangeable for size. Draw without looking and keep every glove. Ask me how many draws guarantee a usable pair, then let me arrange the drawer to delay that pair for as long as possible."
    },
    {
      "id": "coin-host-choice",
      "title": "The host who knew",
      "medium": "A fictional game host opens one of two unchosen boxes to reveal it is empty. I want to know whether to switch. Before giving odds, ask me for the host’s rule for choosing and opening a box, and show why the rule belongs in the question."
    },
    {
      "id": "path-relabel",
      "title": "The route that looks different backward",
      "medium": "A tiny gallery has three doors and a central hall. A visitor enters by one door and leaves by a different one. Count the possible routes with me first as a guard recording directions, then as an architect counting pairs of connected doors."
    },
    {
      "id": "lantern-bridge",
      "title": "Who comes back with the lantern?",
      "long": "Four fictional travelers need to cross a narrow bridge at night. Crossing alone takes them one, two, five and ten minutes respectively. At most two can cross together, a pair takes the slower person’s time, and someone on every crossing must carry their one lantern. Start everyone on the same bank. I have seventeen minutes. Ask me to propose a schedule before offering any hint. If I keep choosing the fastest traveler as escort, ask which two crossing times I am paying for on separate journeys. If I find a schedule, trace the lantern and both banks with me after each move. Then let the slowest traveler ask which description of this puzzle would make them feel like a burden."
    },
    {
      "id": "cabinet-testimony",
      "title": "The cabinet of three claims",
      "long": "Place a token in exactly one of three fictional drawers named Alder, Birch and Cedar. Alder’s label says the token is in Birch. Birch’s label says the token is outside Cedar. Cedar’s label says the token is outside Birch. We are told exactly one label is true. Let me open a case for one drawer before an answer is given. Ask me to read each label aloud as though my guess were correct and count the truths. If I reject a drawer, ask whether the contradiction rejects the drawer or my reading of an English phrase. Once I settle the location, change the condition to exactly two true labels. Can I still open a single drawer with certainty?"
    },
    {
      "id": "blind-coin-piles",
      "title": "Two piles in the dark",
      "long": "There are thirty ordinary coins, exactly ten showing heads. You and I work in the dark and cannot feel which face is up. We can count coins, separate them and flip any chosen coins. Help me make two piles containing equal numbers of heads, even when the piles contain different numbers of coins. Let me pick a pile size before you propose one. If I pick ten, ask me to give the heads in my pile a letter and use that same letter to describe the other pile. If I pick a different size, let me try my argument on an extreme arrangement. Then ask me why a problem that forbids looking can still be solved for every starting arrangement."
    },
    {
      "id": "three-ballots",
      "title": "A town that votes in circles",
      "long": "Three voters rank three fictional park projects. One ranks trees above a pond above a stage. Another ranks the pond above the stage above trees. The third ranks the stage above trees above the pond. In each head-to-head vote everyone chooses the project they ranked higher. Be the town clerk and let me predict all three pairings before you tally them. If I find a cycle, give me control of which pair goes first in a two-round knockout and ask whether I can make my favorite project win. If I call the voters inconsistent, ask me to check each voter’s own rankings first. What should a clerk disclose about the agenda before a fair meeting begins?"
    },
    {
      "id": "eight-door-oracle",
      "title": "The form of a useful question",
      "long": "Hide a prize behind one of eight numbered imaginary doors. I can ask you three yes-or-no questions and you must answer truthfully. Ask me to write the first question before you pick any door, then choose a door that makes a sloppy first question costly. If I ask whether it is behind door one, help me count how many doors a “no” would leave for two questions. If I divide the doors evenly, ask me to give the remaining questions as a branching plan. Finally switch chairs. I may answer your first question with “I don’t know.” What promise about the reliability of this conversation did the original puzzle quietly require?"
    }
  ],
  "Self-awareness & identity": [
    {
      "id": "stranger-diary",
      "title": "Would you recognize yourself without your name?",
      "short": "Which sentence from your younger self would you deny writing precisely because you remember wanting it to be true?",
      "medium": "Imagine a page from your old diary lying between two pages written by strangers. Ask me which clues I would trust to identify my own page. Then invent a paragraph that fits those clues and let me notice how easily a recognizable voice can be borrowed.",
      "long": null
    },
    {
      "id": "copied-memory",
      "title": "Which twin gets to keep the promise?",
      "short": "If two copies of me remember making the same promise, whom should my friend call when the moving van arrives?",
      "medium": "Imagine two people with identical memories of promising to help a friend move house. One has a bad back today and the other has a train to catch. Ask which facts the friend has a right to know before either person explains who the original was.",
      "long": null
    },
    {
      "id": "advice-reversal",
      "title": "When do your exceptions become your real rule?",
      "short": "Which exception you grant yourself would you struggle to explain to someone following your advice?",
      "medium": "Let me pick a small piece of advice I find easier to offer than follow, or invent one together. Give the adviser and the recipient one private constraint each. Ask me to change one constraint at a time until the advice and my own behavior genuinely agree.",
      "long": null
    },
    {
      "id": "mute-signature",
      "title": "The signature without the hand",
      "short": "If an AI learned to write your birthday cards perfectly, which part of sending one would still have to come from you?",
      "medium": "Suppose a friend saves a birthday card because the words sound exactly like me, though I asked a model to compose it. Ask me what I chose before I sent it. Which choice would I want my friend to know about, even if the card pleased them already?",
      "long": "Help me examine a fictional birthday card without trying to settle whether all AI writing is sincere. I chose the occasion, told a model one private memory and sent its first draft unchanged. Ask me which of those acts made the message mine. After I answer, let the recipient tell us that the sentence they treasured most came from the model and made no reference to the memory. Would I tell them how I wrote it? Let me try the conversation from both chairs. Then change one fact of my choosing. Perhaps I sent a card every year, or perhaps it was my first after an argument. Which difference matters enough to change what I would say?"
    },
    {
      "id": "oldest-password",
      "title": "The question your old self could answer",
      "short": "What could a stranger learn well enough to impersonate you while still failing to understand you?",
      "medium": "Imagine that ten years of your messages have trained an excellent impersonator, with your consent. It can pass a family quiz. Ask me to invent a question whose answer could reveal a commitment I have made since the archive ended, then tell me what even the right answer would leave open.",
      "long": "A fictional municipal archive commissions a talking portrait of a retired teacher from thirty years of letters. Her former pupils recognize the jokes at once. The living teacher listens for half an hour and says, “That woman never learned to apologize.” Let me decide what the town should change about the exhibit before it opens. If I want newer letters, ask whose permission we would need. If I want a warning label, have a pupil read it aloud and say what they still believe about the speaker. Now let the teacher pose one question to the portrait that no date stamp could resolve. Ask whether she wants the portrait updated or wants a truthful record of how she changed."
    },
    {
      "id": "other-keys",
      "title": "A key that no longer fits",
      "short": "Which thing do you still call yours because surrendering the word feels harder than handing back the key?"
    },
    {
      "id": "new-joke",
      "title": "Your oldest friend doesn’t laugh",
      "short": "Who notices that you have changed first, the old friend who misses the joke or you when you no longer want to tell it?"
    },
    {
      "id": "daily-pronoun",
      "title": "Who is “we” this morning?",
      "short": "When you say “we decided,” whose wish are you hoping nobody asks you to identify?"
    },
    {
      "id": "dissenting-self",
      "title": "Lose the argument with yourself",
      "short": "Let me defend a choice I regret from the chair of the person who had to make it that day."
    },
    {
      "id": "camera-corner",
      "title": "Outside the photograph",
      "short": "Which ordinary decision this morning would give a stranger a fairer picture of you than your favorite photograph?"
    },
    {
      "id": "changed-name",
      "title": "The name in the margin",
      "medium": "A fictional author sees an old name in the margin of the only surviving manuscript of a beloved poem. Ask me what the author wants future readers to understand. Would the answer change if the name belonged to a translator who never received credit?"
    },
    {
      "id": "reunion-intro",
      "title": "The introduction you keep getting",
      "medium": "Someone at a reunion introduces me by an achievement I no longer care about. Let me accept the introduction once and rewrite it once. Ask what each version costs the person who remembers being proud of me back then."
    },
    {
      "id": "choice-withheld",
      "title": "The question you deliberately skip",
      "medium": "I am making a tiny oral history for a future stranger. Ask me for one question I hope they ask and one I would rather leave unanswered, allowing invented examples. What might the boundary itself tell them, even if they never hear the answer?"
    },
    {
      "id": "taste-inheritance",
      "title": "A meal you learned to love",
      "medium": "I claim a particular dish is part of who I am, although I disliked it as a child. Interview me about the moment its meaning changed. Offer one account centered on taste and another centered on belonging, then let me correct both."
    },
    {
      "id": "weekday-understudy",
      "title": "Your understudy takes Tuesday",
      "medium": "For one day an understudy can imitate my calendar, clothes and habits perfectly. Ask me to choose one conversation they should decline to have on my behalf. What makes that encounter different from all the tasks I feel comfortable handing over?"
    },
    {
      "id": "amended-obituary",
      "title": "The five-word amendment",
      "long": "Let me invent a living person whose friends have been asked to write a short portrait for a retirement celebration. One friend writes, “She always put everyone else first.” Give the subject only five words to amend that sentence while standing behind it in public. Ask me to write her edit before you offer yours. Now let a younger colleague explain why the original sentence frightened them and let an old friend explain why it felt true. Their interpretations can stand together for a while. Ask which account the subject would tell over breakfast the next day, and which part of that private account she would want the younger colleague to inherit."
    },
    {
      "id": "pocket-heirloom",
      "title": "An heirloom with a receipt",
      "long": "Tell me a short fictional situation in which an heirloom turns out to have been bought at an airport gift shop. Give the owner one memory of receiving it and a receipt with an unmistakable date. Pause before assigning a moral. Ask me which fact the owner has lost and what reason for keeping the object survives. If I want to confront the giver, let me draft the first sentence and hear a plausible answer that includes an embarrassing ordinary detail. If I want silence, ask what I would say to a child who asks where it came from. Let me decide whether the revised story still belongs among the family stories."
    },
    {
      "id": "counterfeit-courage",
      "title": "Was the brave version a costume?",
      "long": "Invent a small town meeting where an anxious speaker borrows the mannerisms of someone they admire and finally objects to an unfair decision. After the meeting they say the courageous person was a costume. Ask me for the smallest detail I would want to know before agreeing. If I ask whether they meant the words, let them remember a phrase they chose on the spot. If I ask about rehearsal, let the speech have followed the script exactly until an unfamiliar child asked a question. Then ask me to describe the act from the perspective of the person it helped. Which part of the speaker’s identity actually matters to that person?"
    },
    {
      "id": "vocabulary-lease",
      "title": "An emotion you have borrowed a word for",
      "long": "Pick a harmless invented word for the feeling of being relieved and disappointed when plans are canceled. Ask me to supply a moment from life or fiction when the two feelings arrived together. Use my description to write a tiny dictionary entry, then bring in a second speaker who uses the same word for the relief of declining an invitation they never wanted. Let me decide whether these are two meanings or one meaning under pressure. If I refuse the label, ask what it concealed. If I keep it, ask what I might now notice too quickly in other people. Who gets to correct the dictionary when the word belongs to someone else’s mouth?"
    },
    {
      "id": "unposted-portrait",
      "title": "A portrait you can decline",
      "long": "Be an interviewer making a portrait of an imaginary musician who has just stopped performing. Give me three concrete details available to a stranger, such as an empty case or a calendar with a Saturday circled. Let me choose a detail and offer a reading. Now hand the musician a pencil and let them cross out one sentence of my portrait without explaining why. Ask what I owe them as an interviewer and what I owe the reader if the crossed-out sentence is factually accurate. I can ask the musician one last question or leave the space blank. If I ask, give them the freedom to say that they would rather play something."
    }
  ]
};
  if (typeof module !== 'undefined' && module.exports) module.exports=editions;
  else window.DDL.editions=editions;
})();
