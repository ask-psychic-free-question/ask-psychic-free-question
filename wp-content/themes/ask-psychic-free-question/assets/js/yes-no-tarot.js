/* Оригінальні трактування для символічного розкладу у браузері. */
(() => {
  'use strict';
  const cards = [
    ['The Fool','✧','yes','A new beginning has room to breathe. Curiosity may help you take a small first step.','A fresh start may be tempting you to skip a useful check. Slow down before you leap.'],
    ['The Magician','✦','yes','You have more tools and influence than you may realize. Use one skill deliberately.','Your resources may be scattered. Choose one workable method before committing.'],
    ['The High Priestess','☾','maybe','There is more to learn beneath the obvious answer. Give your intuition time to meet evidence.','Uncertainty may be masking a fact you can ask about. Seek clarity before deciding.'],
    ['The Empress','❀','yes','This choice may grow through care, patience, and steady attention.','Care can become overextension. Check whether this choice also nourishes you.'],
    ['The Emperor','♜','yes','Clear boundaries and a sound plan make this path more workable.','A rigid plan could miss what has changed. Revisit the rules before moving ahead.'],
    ['The Hierophant','◇','maybe','Trusted guidance or an established process may help you see the next step.','An inherited rule may no longer fit. Ask whose expectations you are following.'],
    ['The Lovers','♡','yes','The stronger choice may align with your values and an honest conversation.','Attraction alone may not settle this. Name the values in tension.'],
    ['The Chariot','↟','yes','Momentum is possible when you choose a direction and keep your hands on the reins.','Pushing harder may pull you off course. Regain balance before accelerating.'],
    ['Strength','♌','yes','Quiet courage and patience can carry this further than force.','You may be running low on energy. Rest or ask for support before deciding.'],
    ['The Hermit','✶','maybe','A little solitude may reveal what you already know. Give yourself space to think.','Withdrawal may be hiding a conversation you need. Reconnect with a trusted person.'],
    ['Wheel of Fortune','◉','maybe','Conditions are moving. Stay flexible and watch for a practical opening.','A turn of events may feel beyond your control. Focus on what you can influence.'],
    ['Justice','⚖','maybe','Look at the facts, responsibilities, and likely effects on everyone involved.','An imbalance needs attention. Check assumptions and seek fair terms.'],
    ['The Hanged Man','⌛','maybe','A pause or different viewpoint could change the answer.','Waiting without purpose may be draining you. Set a point to reassess.'],
    ['Death','◒','no','An old form may need to end before the next one can begin.','Resistance to change can make a necessary ending harder. Release one outdated expectation.'],
    ['Temperance','⚗','yes','A measured middle path may work better than an all-or-nothing move.','Too much compromise may blur what matters. Rebalance your needs.'],
    ['The Devil','⛓','no','Check for pressure, fear, or a pattern that limits your freedom.','A familiar bind can loosen when you name it. Look for one safe choice you control.'],
    ['The Tower','⚡','no','The current structure may be too shaky for a confident yes. Make room for truth.','A disruption may expose what needs rebuilding. Avoid rushing to restore the old pattern.'],
    ['The Star','✳','yes','Hope can be useful when paired with one realistic step toward repair.','You may need to renew your energy before leaning on hope alone.'],
    ['The Moon','☽','maybe','Some details are still unclear. Check what is known before acting on a fear.','Confusion may be easing, but do not mistake partial clarity for certainty.'],
    ['The Sun','☀','yes','Clarity and openness support a wholehearted next step.','A bright possibility still needs practical care. Check the details.'],
    ['Judgement','♫','yes','A clear-eyed review may show that you are ready to answer a call.','Old self-criticism may distort the decision. Separate learning from blame.'],
    ['The World','◎','yes','A cycle may be ready to complete. Recognize what you have learned.','One loose end may deserve attention before you close this chapter.']
  ];
  const $ = id => document.getElementById(id);
  const deck = $('ynt-deck');
  if (!deck) return;
  const picks = Array.from(deck.querySelectorAll('.ynt-pick'));
  let drawn = false;
  let shuffled = [];
  // Відкидання залишку усуває упередження операції modulo.
  const random = max => {
    const values = new Uint32Array(1);
    const limit = Math.floor(4294967296 / max) * max;
    do { window.crypto.getRandomValues(values); } while (values[0] >= limit);
    return values[0] % max;
  };
  const shuffle = () => {
    shuffled = cards.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = random(i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  };
  const reveal = index => {
    if (drawn) return;
    drawn = true;
    const card = shuffled[index];
    const reversed = random(2) === 1;
    const lean = reversed ? ({yes:'Maybe',no:'Maybe',maybe:'No'})[card[2]] : ({yes:'Yes',no:'No',maybe:'Maybe'})[card[2]];
    $('ynt-symbol').textContent = card[1];
    $('ynt-card-name').textContent = card[0];
    $('ynt-orientation').textContent = reversed ? 'Reversed' : 'Upright';
    $('ynt-lean').textContent = lean;
    $('ynt-meaning').textContent = reversed ? card[4] : card[3];
    $('ynt-context').textContent = `${lean} is a symbolic lean, not a decision or forecast. Compare it with what you know about your question.`;
    $('ynt-prompt').textContent = lean === 'Yes' ? 'Name one small, reversible step you can try, and one sign that would tell you to pause.' : lean === 'No' ? 'What would need to change before this choice feels safe and aligned with your values?' : 'Which missing fact or conversation would make your next step clearer?';
    $('ynt-selection').hidden = true;
    $('ynt-result').hidden = false;
    $('ynt-lean').focus();
  };
  picks.forEach((pick, index) => pick.addEventListener('click', () => reveal(index)));
  shuffle();
  deck.hidden = false;
  $('ynt-deck-note').hidden = false;
  $('ynt-again').addEventListener('click', () => {
    $('ynt-result').hidden = true;
    drawn = false;
    shuffle();
    $('ynt-selection').hidden = false;
    picks[0].focus();
  });
})();
