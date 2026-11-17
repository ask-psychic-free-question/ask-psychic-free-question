/* Символічний розклад Yes/No: 1, 3 або 5 карт. Дані — yes-no-tarot-data.js, малюнки — yes-no-tarot-art.js. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const deck = $('ynt-deck');
  const cards = window.YNT_DATA;
  const art = window.YNT_ART;
  if (!deck || !cards || !art) return;

  const FAN = 10; // скільки карт показано у віялі
  const SPREADS = {
    one:    { count: 1, labels: ['Your card'], weights: [1], note: '' },
    ppf:    { count: 3, labels: ['Past', 'Present', 'Future'], weights: [0.7, 1, 1.3], note: 'The Future card carries the most weight, the Past the least.' },
    soa:    { count: 3, labels: ['Situation', 'Obstacle', 'Advice'], weights: [1, 0.7, 1.3], note: 'The Advice card carries the most weight, the Obstacle the least.' },
    five:   { count: 5, labels: ['Situation', 'Obstacle', 'Hidden influence', 'Advice', 'Direction'], weights: [1, 0.8, 0.8, 1.2, 1.4], note: 'The Direction and Advice cards carry the most weight.' }
  };
  const WORD = { yes: 'Yes', no: 'No', maybe: 'Maybe' };
  const SCORE = { yes: 1, no: -1, maybe: 0 };
  const ORDINAL = ['', 'one', 'two', 'three', 'four', 'five'];
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Відкидання залишку усуває упередження операції modulo.
  const random = max => {
    const values = new Uint32Array(1);
    const limit = Math.floor(4294967296 / max) * max;
    do { window.crypto.getRandomValues(values); } while (values[0] >= limit);
    return values[0] % max;
  };

  let spreadKey = 'one';
  let order = [];          // перетасована колода (індекси карт, без повторів)
  let chosen = [];         // позиції у віялі, які вибрав користувач
  let picks = [];
  let revealed = false;

  const shuffle = () => {
    order = cards.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = random(i + 1);
      [order[i], order[j]] = [order[j], order[i]];
    }
  };

  // Спільний SVG-символ рубашки вставляється один раз.
  const sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sprite.setAttribute('width', '0');
  sprite.setAttribute('height', '0');
  sprite.setAttribute('aria-hidden', 'true');
  sprite.style.position = 'absolute';
  sprite.innerHTML = art.backSymbol;
  document.body.appendChild(sprite);
  const backSvg = () => '<svg class="ynt-back-svg" viewBox="0 0 200 300" aria-hidden="true" focusable="false"><use href="#ynt-back-art"/></svg>';

  const buildFan = () => {
    deck.textContent = '';
    picks = [];
    const mid = (FAN - 1) / 2;
    for (let i = 0; i < FAN; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ynt-pick';
      b.style.setProperty('--ynt-rotation', ((i - mid) * 3.4).toFixed(1) + 'deg');
      b.style.setProperty('--ynt-offset', (Math.pow(i - mid, 2) * 0.95).toFixed(1) + 'px');
      b.innerHTML = '<span class="ynt-back">' + backSvg() + '</span><span class="ynt-check" aria-hidden="true">✓</span>';
      b.addEventListener('click', () => toggle(i));
      deck.appendChild(b);
      picks.push(b);
    }
    refresh();
  };

  const status = $('ynt-status');
  const revealBtn = $('ynt-reveal');
  const clearBtn = $('ynt-clear');

  const refresh = () => {
    const need = SPREADS[spreadKey].count;
    const done = chosen.length === need;
    picks.forEach((b, i) => {
      const pos = chosen.indexOf(i);
      const on = pos > -1;
      b.classList.toggle('is-chosen', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.disabled = !on && done && need > 1;
      b.querySelector('.ynt-check').textContent = on && need > 1 ? String(pos + 1) : '✓';
      b.setAttribute('aria-label', 'Card ' + (i + 1) + ' of ' + FAN + ', face down' + (on ? ', chosen as number ' + (pos + 1) : '') + (need === 1 ? '' : (on ? '. Press to deselect.' : '')));
    });
    if (need === 1) {
      status.textContent = '';
      revealBtn.hidden = true;
      clearBtn.hidden = true;
      return;
    }
    revealBtn.hidden = false;
    clearBtn.hidden = false;
    revealBtn.disabled = !done;
    clearBtn.disabled = chosen.length === 0;
    status.textContent = done
      ? need + ' of ' + need + ' chosen. Press Reveal to turn your cards.'
      : chosen.length + ' of ' + need + ' chosen. Pick ' + (need - chosen.length) + ' more.';
  };

  const toggle = i => {
    if (revealed) return;
    const need = SPREADS[spreadKey].count;
    const at = chosen.indexOf(i);
    if (need === 1) { chosen = [i]; refresh(); show(); return; }
    if (at > -1) chosen.splice(at, 1);
    else if (chosen.length < need) chosen.push(i);
    refresh();
  };

  const setSpread = key => {
    spreadKey = key;
    chosen = [];
    document.querySelectorAll('.ynt-spread-btn').forEach(btn => btn.setAttribute('aria-pressed', btn.dataset.spread === key ? 'true' : 'false'));
    const need = SPREADS[key].count;
    $('ynt-spread-help').textContent = need === 1
      ? 'Think of a question you can answer with yes or no, then select any card.'
      : 'Think of your question, then choose ' + ORDINAL[need] + ' cards. Select a chosen card again to put it back.';
    deck.setAttribute('aria-label', 'Choose ' + ORDINAL[need] + ' tarot card' + (need > 1 ? 's' : ''));
    $('ynt-kicker-spread').textContent = 'The Major Arcana · ' + (need === 1 ? 'One-card reading' : need + '-card spread');
    $('ynt-deck-note').textContent = 'Choose from ' + FAN + ' cards. Scroll the spread on smaller screens. All 22 Major Arcana are in the deck.';
    refresh();
  };

  const leanOf = (s) => s >= 0.6 ? ['Yes', 'yes'] : s >= 0.2 ? ['Leaning yes', 'yes'] : s > -0.2 ? ['Maybe', 'maybe'] : s > -0.6 ? ['Leaning no', 'no'] : ['No', 'no'];

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  const detail = (c, label, open) => {
    const d = el('details', 'ynt-detail');
    if (open) d.open = true;
    const s = el('summary');
    s.appendChild(el('span', 'ynt-detail-pos', label));
    s.appendChild(el('span', 'ynt-detail-name', c.name + ' · ' + (c.reversed ? 'Reversed' : 'Upright')));
    s.appendChild(el('span', 'ynt-chip ynt-chip-' + c.lean, WORD[c.lean]));
    d.appendChild(s);
    const body = el('div', 'ynt-detail-body');
    body.appendChild(el('p', 'ynt-keywords', 'Keywords: ' + c.o.kw.join(' · ')));
    c.o.text.split('\n\n').forEach(t => body.appendChild(el('p', '', t)));
    const grid = el('div', 'ynt-aspects');
    [['Love & relationships', c.o.love], ['Career & money', c.o.career], ['Personal growth', c.o.growth]].forEach(a => {
      const box = el('div', 'ynt-aspect');
      box.appendChild(el('h4', '', a[0]));
      box.appendChild(el('p', '', a[1]));
      grid.appendChild(box);
    });
    body.appendChild(grid);
    const q = el('p', 'ynt-question');
    q.appendChild(el('strong', '', 'Reflect: '));
    q.appendChild(document.createTextNode(c.o.q));
    body.appendChild(q);
    d.appendChild(body);
    return d;
  };

  const show = () => {
    if (revealed) return;
    revealed = true;
    const sp = SPREADS[spreadKey];
    const drawn = chosen.map((fanIndex, k) => {
      const data = cards[order[fanIndex]];
      const reversed = random(2) === 1;
      const o = reversed ? data.rev : data.up;
      return { id: order[fanIndex], name: data.n, reversed, o, lean: o.lean, label: sp.labels[k] };
    });
    // Підсумок: зважена сума нахилів кожної карти.
    let sum = 0, wsum = 0;
    const counts = { yes: 0, no: 0, maybe: 0 };
    drawn.forEach((c, k) => { sum += SCORE[c.lean] * sp.weights[k]; wsum += sp.weights[k]; counts[c.lean]++; });
    const score = sum / wsum;
    const [headline, tone] = leanOf(score);

    const row = $('ynt-spread-row');
    row.textContent = '';
    row.dataset.count = String(sp.count);
    drawn.forEach(c => {
      const fig = el('figure', 'ynt-slot');
      if (sp.count > 1) fig.appendChild(el('figcaption', 'ynt-slot-label', c.label));
      const flip = el('div', 'ynt-flip');
      const inner = el('div', 'ynt-flip-inner');
      const front = el('div', 'ynt-flip-face ynt-flip-front');
      front.innerHTML = backSvg();
      const back = el('div', 'ynt-flip-face ynt-flip-rear');
      back.innerHTML = art.face(c.id, c.name, c.reversed);
      inner.appendChild(front);
      inner.appendChild(back);
      flip.appendChild(inner);
      fig.appendChild(flip);
      fig.appendChild(el('span', 'ynt-slot-orient', c.reversed ? 'Reversed' : 'Upright'));
      row.appendChild(fig);
    });

    $('ynt-lean').textContent = headline;
    $('ynt-lean').dataset.tone = tone;

    let summary;
    if (sp.count === 1) {
      const c = drawn[0];
      summary = c.name + (c.reversed ? ' reversed' : ' upright') + ' leans ' + WORD[c.lean].toLowerCase() + '. ' + c.o.text.split('\n\n')[0];
    } else {
      const parts = [];
      if (counts.yes) parts.push(counts.yes + ' lean yes');
      if (counts.maybe) parts.push(counts.maybe + ' ' + (counts.maybe === 1 ? 'leans' : 'lean') + ' maybe');
      if (counts.no) parts.push(counts.no + ' lean no');
      summary = 'Of your ' + sp.count + ' cards, ' + parts.join(', ') + '. ' + sp.note + ' Weighing them together gives a symbolic answer of ' + headline.toLowerCase() + '. ' +
        (counts.yes && counts.no ? 'The cards pull in different directions, so treat the answer as conditional and read each card below.' : 'Read each card below to see what shapes the overall picture.');
    }
    $('ynt-meaning').textContent = summary;
    $('ynt-context').textContent = headline + ' is a symbolic lean, not a decision or forecast. Compare it with what you know about your question.';
    $('ynt-prompt').textContent = tone === 'yes' ? 'Name one small, reversible step you can try, and one sign that would tell you to pause.' : tone === 'no' ? 'What would need to change before this choice feels safe and aligned with your values?' : 'Which missing fact or conversation would make your next step clearer?';

    const list = $('ynt-details');
    list.textContent = '';
    list.appendChild(el('h3', 'ynt-details-title', sp.count === 1 ? 'What your card means' : 'Your cards, one by one'));
    drawn.forEach(c => list.appendChild(detail(c, sp.count === 1 ? 'Meaning' : c.label, sp.count === 1)));

    $('ynt-selection').hidden = true;
    $('ynt-result').hidden = false;
    // Фокус — на заголовку відповіді; прокрутка не стрибає, якщо рух зменшено.
    $('ynt-lean').focus({ preventScroll: false });
    const flips = row.querySelectorAll('.ynt-flip');
    if (reduced) flips.forEach(f => f.classList.add('is-flipped'));
    else flips.forEach((f, k) => setTimeout(() => f.classList.add('is-flipped'), 350 + k * 450));
  };

  document.querySelectorAll('.ynt-spread-btn').forEach(btn => btn.addEventListener('click', () => { if (!revealed) setSpread(btn.dataset.spread); }));
  revealBtn.addEventListener('click', () => { if (chosen.length === SPREADS[spreadKey].count) show(); });
  clearBtn.addEventListener('click', () => { chosen = []; refresh(); });
  $('ynt-again').addEventListener('click', () => {
    $('ynt-result').hidden = true;
    revealed = false;
    chosen = [];
    shuffle();
    buildFan();
    $('ynt-selection').hidden = false;
    picks[0].focus();
  });

  shuffle();
  setSpread('one');
  buildFan();
  deck.hidden = false;
  $('ynt-controls').hidden = false;
  $('ynt-deck-note').hidden = false;
})();
