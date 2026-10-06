/* Original modern reflections; factual hexagram order follows the King Wen sequence. */
(() => {
  'use strict';
  const kingWen = [2,24,7,19,15,36,46,11,16,51,40,54,62,55,32,34,8,3,29,60,39,63,48,5,45,17,47,58,31,49,28,43,23,27,4,41,52,22,18,26,35,21,64,38,56,30,50,14,20,42,59,61,53,37,57,9,12,25,6,10,33,13,44,1];
  const entries = [
    ['Creative Heaven','Energy wants a direction. Choose one worthwhile aim and turn enthusiasm into a clear first step. Strong initiative becomes useful when it leaves room for feedback.','Where can you act with purpose without forcing the outcome?'],
    ['Receptive Earth','Support can be an active choice. Listen closely to what the situation needs, then provide something steady and practical. You do not have to lead every part of the process.','What would careful listening change about your next step?'],
    ['Difficulty at the Beginning','An untidy start does not settle the value of an idea. Separate the essential task from the complications, and find help for what you cannot yet manage.','What is the smallest workable beginning?'],
    ['Youthful Folly','Uncertainty invites learning. Ask a sincere question, try the answer in practice, and admit where you lack experience. Repeating a question is less useful than examining what you have learned.','What information would make this choice clearer?'],
    ['Waiting','Preparation makes patience meaningful. Tend to what is within reach while the larger situation develops. Decide what evidence would tell you that the time to act has arrived.','What can you prepare during this pause?'],
    ['Conflict','A disagreement may reveal competing needs. State your concern plainly and look for a fair boundary before defending every detail. A workable agreement can matter more than winning.','Which part of this dispute actually needs resolution?'],
    ['The Army','Shared effort needs structure. Clarify roles, resources, and responsibility so that determination does not become pressure. Good coordination protects the people doing the work.','Who is responsible for the next concrete step?'],
    ['Holding Together','Belonging grows through dependable choices. Consider which relationships offer mutual care and shared purpose. Join with others because the connection fits your values.','Where is trust being earned through action?'],
    ['Small Taming','A small adjustment may do more than a dramatic push. Gather resources, refine your approach, and avoid promising more than the present conditions allow.','Which modest improvement is available today?'],
    ['Treading','Proceed with awareness of consequences. You can speak honestly while respecting boundaries and differences in power. Careful conduct makes a difficult passage easier to navigate.','What boundary deserves attention before you move?'],
    ['Peace','Cooperation has room to grow. Let useful ideas and support move in both directions, and maintain the habits that make that exchange possible.','How can you keep a promising connection reciprocal?'],
    ['Standstill','When exchange has stalled, pushing harder may drain you. Protect your priorities, notice what remains open, and distinguish a temporary delay from a persistent mismatch.','What deserves your energy while progress is limited?'],
    ['Fellowship','Common ground can widen your options. Seek people who share the purpose while welcoming differences in experience. Clear expectations help connection become cooperation.','What shared aim could bring people together?'],
    ['Great Possession','Having resources creates choices and responsibilities. Use what you have in ways that support lasting value, and notice whose contribution made it possible.','What would generous, responsible use of your resources look like?'],
    ['Modesty','An accurate view of yourself is more useful than either self-inflation or self-erasure. Acknowledge your strengths, your limits, and the work still needed.','Where can you be both confident and teachable?'],
    ['Enthusiasm','Inspiration can gather people around a purpose. Give that energy a practical rhythm so that excitement has somewhere to go after the first moment passes.','What routine could sustain this motivation?'],
    ['Following','Adaptation works best when it is chosen consciously. Learn from a useful example without surrendering your judgment. Notice whether the direction still fits your values.','What are you following, and why?'],
    ['Work on the Decayed','An old pattern may need repair. Look beyond the visible problem to the habits or assumptions that keep recreating it. Begin with one repair you can maintain.','What underlying cause needs attention?'],
    ['Approach','An opening invites considerate engagement. Move closer with curiosity and realistic expectations, allowing the other person or situation space to respond.','How can you approach without assuming agreement?'],
    ['Contemplation','Step back before deciding. Observe patterns, including your own part in them, and ask what someone with a different viewpoint would notice.','What changes when you look at the whole situation?'],
    ['Biting Through','A specific obstacle calls for a clear response. Identify the blocked point, check the facts, and address it directly without turning frustration into punishment.','What exact problem can you resolve?'],
    ['Grace','Presentation can help understanding when it serves substance. Bring care to your words and surroundings while keeping the underlying message honest.','Does the form make the truth easier to see?'],
    ['Splitting Apart','Something may be losing its support. Reduce unnecessary strain and protect what is essential before trying to restore everything at once.','What can you safely release?'],
    ['Return','A useful direction can begin again with a small choice. Notice what brings you back to steadiness, and make restarting easier than repeating self-criticism.','What simple habit would help you return to yourself?'],
    ['Innocence','Meet the moment without manufacturing a hidden story. Respond to what you can actually observe, and let honest intentions be supported by careful actions.','What is clear before assumptions enter?'],
    ['Great Taming','Capacity grows through discipline. Hold some energy in reserve, learn from experience, and strengthen the skills that a larger commitment would require.','What should you develop before taking on more?'],
    ['Nourishment','What you take in shapes what you give out. Examine the information, routines, and relationships feeding your attention, as well as the effect of your own words.','What truly replenishes you?'],
    ['Great Preponderance','The load may be larger than the present structure can carry. Rebalance responsibilities, seek support, and avoid treating endurance as the only solution.','Where can you reduce strain before it becomes a crisis?'],
    ['Abysmal Water','Repeated uncertainty calls for a reliable method. Keep your footing through small consistent actions, and use practical support when fear narrows your view.','What dependable step helps you navigate uncertainty?'],
    ['Clinging Fire','Clarity depends on what you attach your attention to. Seek sound information and nourishing connections, then let understanding guide the next decision.','What helps you see this situation more clearly?'],
    ['Influence','A response cannot be demanded into sincerity. Notice the subtle effect of your presence, listen to the other side, and allow interest to remain mutual.','How can you invite a response without pressure?'],
    ['Duration','Consistency does not require rigidity. Preserve the purpose of a commitment while adjusting the habits that support it as circumstances change.','Which steady practice is worth continuing?'],
    ['Retreat','Distance can protect perspective. Choose a deliberate boundary, conserve energy, and define the conditions under which renewed engagement would make sense.','What would a constructive step back protect?'],
    ['Great Power','Strength benefits from restraint. Before using influence, consider the effect on others and whether the action serves the purpose you claim for it.','How can you use strength responsibly?'],
    ['Progress','Visible movement can grow from repeated useful contributions. Accept encouragement while staying attentive to the details that made the progress possible.','What practical contribution can you build on?'],
    ['Darkening of the Light','An unsupportive setting may call for discretion. Protect your confidence and values without exposing every part of yourself to unnecessary criticism.','Where can you keep your inner clarity safe?'],
    ['The Family','Every close group develops habits and expectations. Clear roles, kind communication, and ordinary acts of care can improve the atmosphere more than declarations alone.','Which shared expectation needs a conversation?'],
    ['Opposition','Differences need not erase all connection. Identify what truly conflicts and what can still be shared, allowing each person to retain their perspective.','Where is cooperation possible despite disagreement?'],
    ['Obstruction','A blocked route invites a different approach. Pause to assess the terrain, seek useful advice, and consider whether a detour would serve the same purpose.','What alternative route have you overlooked?'],
    ['Deliverance','When pressure eases, use the opening to resolve what remains. Release unnecessary resentment and avoid recreating the conditions that made the problem heavy.','What unfinished task would make relief more lasting?'],
    ['Decrease','Reducing something can create room for what matters. Choose a proportionate simplification, making sure that essential care is not the first thing sacrificed.','What can become simpler without becoming poorer?'],
    ['Increase','An opportunity to grow works best when benefits circulate. Invest in a useful skill or relationship, and share support where it can have a concrete effect.','What would you strengthen with this opportunity?'],
    ['Breakthrough','A truth may need to be spoken clearly. Ground the message in facts, choose a constructive setting, and pair honesty with a realistic next step.','What needs a plain, calm statement?'],
    ['Coming to Meet','An unexpected encounter can be interesting without being a commitment. Notice its appeal, check its fit, and keep your boundaries visible as you learn more.','What deserves curiosity, and what deserves caution?'],
    ['Gathering Together','Collective effort needs a shared focus. Make room for participation and clarify why people are gathering so that connection has a useful centre.','What purpose makes this gathering meaningful?'],
    ['Pushing Upward','Gradual growth can be built through patient effort. Choose the next attainable level, seek guidance, and let accumulated practice carry more weight than urgency.','What is the next manageable step upward?'],
    ['Oppression','Limited options can obscure the resources you still have. Reduce avoidable demands, preserve dignity, and seek practical help without treating hardship as personal failure.','Which source of support is still available?'],
    ['The Well','A lasting resource needs care and access. Consider what consistently nourishes your community or daily life, and whether the way you use it needs maintenance.','What reliable source needs tending?'],
    ['Revolution','Meaningful change needs a reason people can understand. Test whether the old arrangement has truly stopped serving its purpose, then plan the transition with care.','What evidence supports changing the pattern?'],
    ['The Cauldron','Transformation depends on how ingredients are brought together. Use your skills and resources thoughtfully, creating conditions where something useful can develop.','What combination could turn potential into nourishment?'],
    ['Arousing Thunder','A sudden disruption can shake attention awake. Let the first reaction settle, check what has actually changed, and return to a steady practical response.','What remains reliable after the surprise?'],
    ['Keeping Still Mountain','A purposeful pause can interrupt a reactive cycle. Rest attention in the present task, and distinguish a needed stillness from avoiding a decision indefinitely.','What becomes clearer when you stop pushing?'],
    ['Development','Some changes need stages to become stable. Respect the pace of trust and learning, using small milestones to notice real growth.','What next stage is ready without being rushed?'],
    ['The Marrying Maiden','A situation may give you less influence than you expected. Be honest about the terms, preserve your agency, and avoid accepting an unequal role merely to belong.','Are the expectations fair and freely chosen?'],
    ['Abundance','A full moment can bring both opportunity and complexity. Appreciate what is available, keep priorities visible, and avoid assuming this intensity will last unchanged.','What deserves attention while resources are plentiful?'],
    ['The Wanderer','In unfamiliar surroundings, learn before assuming. Travel lightly in your expectations, respect local boundaries, and keep a dependable source of support.','What would help you navigate this unfamiliar setting?'],
    ['Gentle Wind','Patient influence often comes through repeated small actions. Communicate consistently and kindly, checking whether your persistence remains welcome.','What gentle action can you repeat with care?'],
    ['Joyous Lake','Joy grows through open, respectful exchange. Share what is good while making room for honest differences, so that harmony does not depend on silence.','What conversation could bring genuine ease?'],
    ['Dispersion','Tension may soften when people reconnect with a wider purpose. Loosen a rigid assumption, invite dialogue, and preserve enough structure for the next step.','What could help a divided situation reconnect?'],
    ['Limitation','A useful boundary makes resources last. Choose limits that are clear and proportionate, and revisit rules that create needless hardship.','Which limit would support freedom over time?'],
    ['Inner Truth','Trust begins with alignment between intention, words, and action. Speak from what you actually know and listen without deciding another person’s feelings for them.','Where could greater honesty improve trust?'],
    ['Small Preponderance','Details deserve attention before a large leap. Make a careful adjustment, check the practical conditions, and let modest progress be enough for now.','Which small detail could change the result?'],
    ['After Completion','Finishing creates a new responsibility: maintaining what works. Check the vulnerable details, allow a period of settling, and avoid treating success as permanent.','What needs care after the milestone?'],
    ['Before Completion','An unfinished situation asks for patience at the final crossing. Check readiness, keep your sequence clear, and avoid mistaking proximity for completion.','What final condition must be met before you proceed?']
  ];
  const positionPrompts = ['At the foundation, examine the assumption you are starting from.', 'In daily practice, notice which habit reinforces the pattern.', 'At the threshold, check the risks before moving into a larger commitment.', 'In relationship with others, make room for feedback and support.', 'Where you hold influence, choose a responsible and proportionate response.', 'At the outer limit, consider what has run its course and what can be released.'];
  function numberFor(lines, changed = false) {
    const bits = lines.reduce((value, line, i) => value + ((changed ? (line === 6 || line === 7) : (line === 7 || line === 9)) ? 2 ** i : 0), 0);
    return kingWen[bits];
  }
  function coin() { const byte = new Uint8Array(1); window.crypto.getRandomValues(byte); return (byte[0] & 1) ? 3 : 2; }
  const form = document.getElementById('iching-form');
  if (!form) return;
  const question = document.getElementById('iching-question');
  const casting = document.getElementById('iching-casting');
  const lineBox = document.getElementById('iching-lines');
  const coins = document.getElementById('iching-coins');
  const castButton = document.getElementById('iching-cast');
  const progress = document.getElementById('iching-progress');
  const result = document.getElementById('iching-result');
  let lines = [];
  const append = (parent, tag, text, className) => { const element = document.createElement(tag); element.textContent = text; if (className) element.className = className; parent.append(element); return element; };
  function describe(parent, number, heading) {
    const entry = entries[number - 1];
    append(parent, 'p', String.fromCodePoint(0x4dc0 + number - 1), 'iching-symbol').setAttribute('aria-hidden','true');
    append(parent, heading, `${number}. ${entry[0]}`);
    append(parent, 'p', entry[1]);
    append(parent, 'p', entry[2], 'iching-next');
  }
  function finish() {
    result.replaceChildren();
    const title = append(result, 'h2', 'Your I Ching reflection'); title.id = 'iching-result-title';
    append(result, 'p', question.value.trim(), 'iching-question-echo');
    append(result, 'p', 'Present pattern', 'iching-eyebrow');
    describe(result, numberFor(lines), 'h3');
    const changing = lines.map((line, i) => (line === 6 || line === 9) ? i : -1).filter(i => i >= 0);
    append(result, 'h3', changing.length ? 'Changing lines' : 'No changing lines');
    if (changing.length) {
      append(result, 'p', 'Read these original position prompts alongside the present pattern. They are not translations of the traditional line texts.');
      const list = append(result, 'ul', '');
      changing.forEach(i => append(list, 'li', `Line ${i + 1}: ${lines[i] === 6 ? 'Yin changes to yang: consider where more initiative could help.' : 'Yang changes to yin: consider where receptiveness or rest could help.'} ${positionPrompts[i]}`));
      append(result, 'p', 'Pattern after change', 'iching-eyebrow');
      describe(result, numberFor(lines, true), 'h3');
      append(result, 'p', 'The second pattern is a perspective on possible change, not a guaranteed future. Compare both reflections with what you know about your situation.');
    } else append(result, 'p', 'All six lines are stable in this cast. Stay with the present pattern and its question rather than seeking a second hexagram.');
    append(result, 'p', 'Take one useful idea, test it against real evidence, and choose a small next step. This is an automatic symbolic reflection, not a human psychic answer.');
    result.hidden = false;
    castButton.hidden = true;
    result.focus();
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!question.value.trim()) { question.setCustomValidity('Write a question to begin.'); question.reportValidity(); return; }
    if (!window.crypto || !window.crypto.getRandomValues) { question.setCustomValidity('This browser cannot securely cast coins. Please use a current browser.'); question.reportValidity(); return; }
    form.hidden = true; casting.hidden = false; castButton.focus();
  });
  question.addEventListener('input', () => question.setCustomValidity(''));
  castButton.addEventListener('click', () => {
    if (lines.length >= 6) return;
    const toss = [coin(), coin(), coin()];
    const value = toss.reduce((a,b) => a+b, 0);
    lines.push(value); coins.replaceChildren();
    toss.forEach(face => append(coins, 'span', face === 3 ? 'H' : 'T', 'iching-coin'));
    const row = append(lineBox, 'div', '', 'iching-line-row');
    const visual = append(row, 'div', '', `iching-line${value === 6 || value === 9 ? ' is-changing' : ''}`);
    visual.setAttribute('aria-hidden', 'true');
    append(visual, 'span', ''); if (value % 2 === 0) append(visual, 'span', '');
    const type = value % 2 === 0 ? 'yin' : 'yang';
    const change = value === 6 || value === 9 ? ', changing' : ', stable';
    append(row, 'span', `Line ${lines.length}: ${value} · ${type}${change}`, 'iching-line-label');
    progress.textContent = `Line ${lines.length} cast: ${toss.map(face => face === 3 ? 'heads' : 'tails').join(', ')}. Total ${value}, ${type}${change}.${lines.length < 6 ? ` Ready for line ${lines.length + 1} of 6.` : ' Your reflection is ready.'}`;
    castButton.textContent = `Cast line ${lines.length + 1}`;
    if (lines.length === 6) finish();
  });
  document.getElementById('iching-reset').addEventListener('click', () => {
    lines = []; lineBox.replaceChildren(); coins.replaceChildren(); result.replaceChildren(); result.hidden = true;
    casting.hidden = true; form.hidden = false; castButton.hidden = false; castButton.textContent = 'Cast line 1';
    progress.textContent = 'Ready for line 1 of 6.'; question.focus();
  });
})();
