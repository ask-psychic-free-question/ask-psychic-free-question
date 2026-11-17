/* Ілюстрації 22 старших арканів і рубашка карти: оригінальний inline SVG, без зовнішніх файлів. */
window.YNT_ART = (() => {
  'use strict';
  const G = '#e6c78c', C = '#f8fbfe', B = '#8fb3d6', M = '#3d6a9c', D = '#183e62', N = '#24497a', R = '#d9a5a0';
  const f = v => Math.round(v * 10) / 10;
  const circ = (x, y, r, fill, st) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill || 'none'}"${st ? ` stroke="${st}" stroke-width="1.4"` : ''}/>`;
  const path = (d, fill, st, w) => `<path d="${d}" fill="${fill || 'none'}"${st ? ` stroke="${st}" stroke-width="${w || 1.5}"` : ''} stroke-linejoin="round" stroke-linecap="round"/>`;
  const line = (x1, y1, x2, y2, st, w) => path(`M${x1} ${y1}L${x2} ${y2}`, 'none', st || G, w || 1.5);
  const rect = (x, y, w, h, fill, st) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill || 'none'}"${st ? ` stroke="${st}" stroke-width="1.4"` : ''}/>`;
  const star = (x, y, r, fill, n, st) => {
    n = n || 5;
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const a = Math.PI * i / n - Math.PI / 2, rr = i % 2 ? r * 0.42 : r;
      pts.push(f(x + rr * Math.cos(a)) + ',' + f(y + rr * Math.sin(a)));
    }
    return `<polygon points="${pts.join(' ')}" fill="${fill || G}"${st ? ` stroke="${st}" stroke-width="1.3"` : ''}/>`;
  };
  const rays = (x, y, r1, r2, n, st, w) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = Math.PI * 2 * i / n;
      s += line(f(x + r1 * Math.cos(a)), f(y + r1 * Math.sin(a)), f(x + r2 * Math.cos(a)), f(y + r2 * Math.sin(a)), st || G, w || 1.6);
    }
    return s;
  };
  const sun = (x, y, r) => circ(x, y, r, G) + rays(x, y, r + 3, r + 10, 12);
  const moon = (x, y, r, bg) => circ(x, y, r, C) + circ(x + r * 0.45, y - r * 0.1, r * 0.85, bg || M);
  const hill = (d, fill) => path(d, fill || D);
  const fig = (x, y, s, robe) => circ(x, y, 7 * s, C) + path(`M${x - 5 * s} ${y + 8 * s}L${x + 5 * s} ${y + 8 * s}L${x + 16 * s} ${y + 60 * s}L${x - 16 * s} ${y + 60 * s}Z`, robe || G);
  const inf = (x, y, w) => path(`M${x} ${y}c${-w * .3} ${-w * .35} ${-w} ${-w * .35} ${-w} 0s${w * .7} ${w * .35} ${w} 0s${w * .7} ${-w * .35} ${w} 0s${-w * .7} ${w * .35} ${-w} 0`, 'none', G, 2);
  const pillar = (x, y, h, w) => { w = w || 10; return rect(x, y, w, h, C) + rect(x - 3, y, w + 6, 4, G) + rect(x - 3, y + h - 4, w + 6, 4, G); };
  const cup = (x, y, s) => path(`M${x - 6 * s} ${y}h${12 * s}c0 ${9 * s} ${-3 * s} ${11 * s} ${-6 * s} ${11 * s}s${-6 * s} ${-2 * s} ${-6 * s} ${-11 * s}zM${x} ${y + 11 * s}v${6 * s}m${-5 * s} 0h${10 * s}`, G, G, 1.3);

  const scenes = [
    // 0 Дурень: скеля, сонце, собака
    () => sun(150, 82, 15) + hill('M16 250V200L60 160L100 215L140 150L184 205V250Z', M) + path('M16 250V190L68 188L74 250Z', C) + fig(100, 120, .9, C) + line(112, 150, 130, 112, G, 2) + circ(131, 124, 5, B) + path('M60 190l6-8 9 2 3 7z', G) + circ(66, 180, 3, G) + line(100, 178, 94, 205, C, 3) + path('M92 106h8', 'none', G, 1.5),
    // 1 Маг: нескінченність, жезл, стіл
    () => inf(100, 70, 16) + circ(100, 98, 8, C) + path('M92 108h16l12 90h-40z', C) + path('M84 130l16 8 16-8', 'none', G, 2) + line(112, 118, 144, 70, G, 3) + circ(145, 68, 3, C) + line(84, 118, 62, 150, C, 3) + rect(36, 205, 128, 8, G) + rect(44, 213, 112, 6, M) + cup(54, 188, .8) + circ(84, 196, 7, 'none', G) + star(84, 196, 6, G) + line(116, 175, 116, 203, C, 2.5) + line(110, 182, 122, 182, G, 2.5) + line(146, 178, 146, 204, G, 3) + circ(146, 176, 2.5, C) + path('M20 235q20-12 40 0q20 12 40 0q20-12 40 0q20 12 40 0', 'none', R, 2),
    // 2 Верховна жриця: стовпи, місяць, сувій
    () => pillar(34, 64, 168, 18) + pillar(148, 64, 168, 18) + path('M60 66h80v170h-80z', B) + star(100, 96, 4, C, 5) + circ(100, 112, 8, C) + path('M90 124h20l14 90h-48z', M) + path('M84 140q16-14 32 0', 'none', G, 2) + moon(100, 82, 10, B) + circ(100, 230, 11, C) + circ(105, 228, 9.5, M) + path('M95 168h15l-4 22h-11z', C, G, 1) + path('M60 66q10 40 0 80M140 66q-10 40 0 80', 'none', M, 2),
    // 3 Імператриця: корона із зірок, пшениця, серце
    () => [...Array(12).keys()].map(i => star(f(100 + 20 * Math.cos(i * Math.PI / 6)), f(78 + 12 * Math.sin(i * Math.PI / 6)), 3.4, G, 5)).join('') + circ(100, 102, 8, C) + path('M92 112h16l22 100h-60z', G) + path('M88 150q12 10 24 0', 'none', C, 2) + path('M100 158c-8-8-10-18 0-18s8 10 0 18z', R) + hill('M16 250V212Q60 196 100 214T184 208V250Z', M) + [30, 44, 58, 142, 156, 170].map(x => line(x, 232, x, 190, G, 1.5) + path(`M${x} 190l-4-6M${x} 194l4-6M${x} 199l-4-6`, 'none', G, 1.5)).join('') + circ(100, 176, 12, 'none', C) + line(100, 188, 100, 198, C, 1.5) + line(95, 194, 105, 194, C, 1.5) + circ(150, 108, 5, 'none', G) + line(150, 113, 150, 124, G, 1.5),
    // 4 Імператор: трон, барани, скіпетр
    () => hill('M16 190L52 150L90 190L130 140L184 190V250H16Z', M) + rect(66, 96, 68, 130, B) + rect(60, 90, 80, 8, G) + circ(66, 108, 7, G) + circ(134, 108, 7, G) + path('M60 108q-16-10-6-22M140 108q16-10 6-22', 'none', G, 2) + circ(100, 112, 8, C) + path('M82 124h36l6 80h-48z', D, G, 1.5) + path('M84 128h32l2 14h-36z', C) + line(138, 112, 138, 210, G, 3) + circ(138, 104, 4, 'none', G) + circ(70, 158, 6, G) + rect(66, 226, 68, 6, G),
    // 5 Ієрофант: стовпи, потрійна корона, ключі, прохачі
    () => pillar(36, 62, 170, 16) + pillar(148, 62, 170, 16) + path('M52 62h96v90H52z', B) + path('M92 84l8-18 8 18z', G) + path('M90 90l10-14 10 14z', C) + circ(100, 98, 8, C) + path('M90 108h20l14 70h-48z', G) + path('M86 124h28M100 124v50', 'none', C, 1.6) + line(130, 84, 130, 190, C, 2.5) + line(122, 94, 138, 94, C, 2) + line(124, 102, 136, 102, C, 2) + line(126, 110, 134, 110, C, 2) + path('M60 232l8-26 8 26zM124 232l8-26 8 26z', R) + circ(68, 202, 5, C) + circ(132, 202, 5, C) + path('M82 215l36 18M118 215l-36 18', 'none', G, 2.4) + circ(82, 214, 4, 'none', G) + circ(118, 214, 4, 'none', G),
    // 6 Закохані: янгол, пара, дерево
    () => sun(100, 70, 10) + path('M60 100q20-30 40-10q20-20 40 10q-20 10-40 6q-20 4-40-6z', C) + circ(100, 98, 8, C) + path('M92 108h16l6 34h-28z', G) + path('M16 250V200L54 170L80 205L120 165L184 210V250Z', M) + circ(56, 162, 6, C) + path('M50 170h12l6 52h-24z', R) + circ(144, 162, 6, C) + path('M138 170h12l6 52h-24z', B) + path('M20 232q20-8 36 0M144 232q16-8 36 0', 'none', G, 2) + path('M170 120v100', 'none', G, 3) + path('M154 140q16-30 32 0q-14 12-32 0z', M) + circ(170, 146, 3, R) + line(54, 188, 70, 182, C, 1.5) + line(146, 188, 130, 182, C, 1.5),
    // 7 Колісниця: балдахін із зірками, сфінкси
    () => rect(54, 62, 92, 10, G) + [66, 82, 100, 118, 134].map(x => star(x, 82, 4, C, 5)).join('') + path('M54 72v22M146 72v22', 'none', G, 2) + circ(100, 112, 8, C) + path('M82 122h36l4 54h-44z', B) + path('M82 126h36', 'none', G, 3) + rect(62, 176, 76, 44, G) + circ(100, 196, 10, 'none', N) + path('M92 196h16', 'none', N, 2) + rect(62, 220, 76, 6, M) + circ(58, 238, 12, 'none', C) + circ(142, 238, 12, 'none', C) + rays(58, 238, 3, 12, 8, C) + rays(142, 238, 3, 12, 8, C) + path('M36 214q-6-22 14-22l12 8-6 18z', C) + path('M164 214q6-22-14-22l-12 8 6 18z', D, C, 1.2) + circ(46, 200, 4, C) + circ(154, 200, 4, D) + line(112, 120, 124, 90, G, 2) + path('M16 160h168', 'none', M, 2),
    // 8 Сила: лев, жінка, нескінченність
    () => hill('M16 250V204L50 172L84 204L130 164L184 210V250Z', M) + inf(100, 66, 15) + path('M20 244q40 8 80 0t80 0', 'none', G, 1.5) + `<ellipse cx="118" cy="226" rx="44" ry="15" fill="${G}"/>` + path('M160 222q16-4 14-22q-2-6-8-4', 'none', G, 3) + circ(172, 196, 4, G) + path('M84 236v8M104 238v8M138 238v8', 'none', G, 4) + circ(88, 198, 22, M, G) + rays(88, 198, 22, 30, 16, G) + circ(88, 200, 14, G) + path('M76 192l4-8 6 6M100 192l-4-8-6 6', G) + circ(83, 198, 1.8, N) + circ(95, 198, 1.8, N) + path('M84 205h8l-4 4z', N) + path('M82 211q6 4 12 0', 'none', N, 1.4) + circ(80, 98, 8, C) + path('M72 94q8-12 16 0', 'none', G, 2) + path('M72 108h16l16 76q-26 14-52 0z', C) + path('M76 112q-6 26 8 76', 'none', B, 1.4) + path('M72 114Q60 150 76 186M88 114Q102 150 92 188', 'none', C, 4) + circ(77, 190, 3, C) + circ(95, 190, 3, C),
    // 9 Відлюдник: плащ, ліхтар, гора
    () => hill('M16 250V190L70 150L100 190L150 120L184 170V250Z', M) + path('M150 120l-12 20h24z', C) + star(70, 70, 3, C, 4) + star(150, 76, 3, C, 4) + circ(100, 92, 9, C) + path('M90 100q10-16 20 0l20 120h-60z', B) + path('M86 218h28', 'none', G, 2) + line(128, 120, 128, 232, G, 2.5) + circ(72, 142, 12, 'none', G) + path('M60 134h24v18h-24z', G) + star(72, 143, 6, C, 6) + line(72, 120, 72, 134, G, 1.6) + line(86, 138, 100, 130, G, 1.6) + path('M20 244h160', 'none', C, 2),
    // 10 Колесо Фортуни
    () => circ(100, 156, 56, 'none', G) + circ(100, 156, 40, 'none', C) + circ(100, 156, 9, G) + rays(100, 156, 9, 56, 8, G) + [0, 1, 2, 3].map(i => star(f(100 + 48 * Math.cos(i * Math.PI / 2 + .4)), f(156 + 48 * Math.sin(i * Math.PI / 2 + .4)), 5, C, 4)).join('') + path('M100 94q-14-14-6-26l12 4q10 8 0 22z', B) + path('M56 218q-12 18 10 26', 'none', R, 2.5) + star(34, 188, 4, G, 4) + star(166, 188, 4, G, 4) + star(34, 108, 4, G, 4) + star(166, 108, 4, G, 4) + circ(100, 74, 6, C),
    // 11 Справедливість: терези, меч
    () => pillar(30, 62, 170, 12) + pillar(158, 62, 170, 12) + path('M54 66h92v170H54z', M) + circ(100, 96, 8, C) + path('M88 106h24l12 100h-48z', R) + rect(86, 90, 28, 5, G) + line(150, 94, 150, 214, C, 3) + path('M144 104l6-14 6 14z', G) + line(60, 124, 140, 124, G, 2) + path('M60 124l-10 28h20z', G) + path('M140 124l-10 28h20z', G) + line(100, 118, 100, 130, G, 2) + rect(66, 226, 68, 6, G),
    // 12 Повішений: Т-рама, перевернутий чоловік, німб
    () => path('M92 240Q96 150 94 78L106 78Q104 150 108 240z', B, M, 1.2) + path('M24 80Q100 62 176 80', 'none', B, 12) + path('M30 74Q100 58 170 74', 'none', M, 3) + path('M98 150Q70 130 58 112M100 120Q128 104 138 96', 'none', B, 4) + [[30, 70], [52, 62], [74, 66], [128, 62], [150, 60], [170, 68], [58, 108], [138, 92], [40, 80], [162, 80]].map(q => circ(q[0], q[1], 7, M)).join('') + [[22, 84], [178, 84], [92, 66], [112, 68], [48, 96], [150, 76]].map(q => circ(q[0], q[1], 5, B)).join('') + '<g transform="translate(40 0)">' + path('M100 72v10', 'none', G, 2.4) + path('M96 82h8l-1 8h-6z', G) + path('M100 88v38', 'none', C, 6) + path('M100 126L84 108', 'none', C, 6) + path('M92 126h16l-2 52h-12z', B) + path('M92 132l-14 24M108 132l14 24', 'none', B, 5) + circ(100, 192, 10, C) + circ(100, 192, 17, 'none', G) + rays(100, 192, 19, 26, 12, G) + '</g>' + path('M16 244h168', 'none', C, 2),
    // 13 Смерть: сонце між вежами, прапор, коса
    () => hill('M16 238Q100 214 184 238V250H16Z', M) + path('M16 238h168', 'none', C, 1.5) + circ(72, 180, 16, G) + rays(72, 180, 19, 27, 12, G) + hill('M16 238Q100 214 184 238V250H16Z', M) + path('M26 238V150l-6-12h24l-6 12v88zM156 238V150l-6-12h24l-6 12v88z', C) + path('M32 160v8M162 160v8', 'none', N, 3) + `<ellipse cx="96" cy="206" rx="32" ry="14" fill="${C}"/>` + path('M120 200q8-18 14-26l14 4-2 10-10 6q-4 12-8 26z', C) + path('M146 178l6 2M134 174q4-8 10-6', 'none', C, 2) + circ(142, 180, 1.4, N) + path('M70 216v22M84 220v20M106 220v20M120 216v22', 'none', C, 4) + path('M66 200q-12 4-14 22', 'none', C, 3.5) + path('M126 176q-6 4-8 14', 'none', B, 2) + path('M82 192l8-44h14l6 44z', D, C, 1.4) + circ(97, 138, 8, D, C) + path('M93 140h8M95 144h4', 'none', C, 1.4) + path('M97 130q-2-8 6-10', 'none', R, 2.4) + path('M90 160l12 10', 'none', C, 1.4) + line(106, 160, 128, 84, G, 2.6) + path('M128 86h34l-4 14 4 14h-34z', D, C, 1.5) + circ(142, 100, 5, C) + circ(142, 100, 2.4, D) + path('M137 98q-2-6 4-6M147 94q6 0 4 6M147 106q2 6-4 6', 'none', C, 1.3),
    // 14 Поміркованість: янгол, дві чаші, струмінь
    () => circ(100, 92, 9, C) + circ(100, 92, 14, 'none', G) + path('M90 102h20l10 80h-40z', B) + path('M92 106q-34-22-50 6q20-2 46 12zM108 106q34-22 50 6q-20-2-46 12z', C) + path('M72 160l14-18M128 160l-14-18', 'none', C, 4) + cup(64, 164, .8) + cup(138, 188, .8) + path('M72 172Q100 150 130 190', 'none', B, 2) + hill('M16 250V230Q60 216 100 232T184 226V250Z', M) + path('M76 224q24-28 48 0', 'none', G, 2) + star(100, 66, 5, G, 5) + hill('M120 200L150 160L180 200', D),
    // 15 Диявол: рогата постать, перевернута пентаграма, прикуті
    () => circ(100, 100, 12, C) + path('M92 92l-12-22M108 92l12-22', 'none', G, 3) + path('M80 118q20-12 40 0l10 60h-60z', D, G, 1.5) + path('M70 124q-30-10-40 10q20 4 34 8zM130 124q30-10 40 10q-20 4-34 8z', B) + circ(100, 160, 16, 'none', G) + `<g transform="rotate(180 100 160)">${star(100, 160, 14, 'none', 5, G)}</g>` + rect(70, 196, 60, 26, M) + circ(56, 214, 5, C) + path('M52 222h8l4 26h-16z', R) + circ(144, 214, 5, C) + path('M140 222h8l4 26h-16z', R) + path('M70 208q-6 6-10 6M130 208q6 6 10 6', 'none', G, 1.8) + circ(92, 98, 1.8, N) + circ(108, 98, 1.8, N),
    // 16 Вежа: блискавка, падіння
    () => rect(74, 120, 52, 100, B) + path('M68 120h64l-8-24h-48z', C) + path('M82 150h10v14h-10zM108 150h10v14h-10z', G) + path('M148 54l-22 44 14-4-20 48 36-52-16 4z', G) + path('M110 76l8-22 10 14-6 6z', G) + star(40, 70, 3, G, 4) + star(170, 124, 3, G, 4) + circ(50, 160, 6, C) + path('M46 168l-6 18M54 168l8 14', 'none', C, 2.5) + circ(150, 190, 6, R) + path('M146 198l-8 14M154 198l8 14', 'none', R, 2.5) + path('M20 244h160', 'none', M, 3) + path('M78 218q-12-10 0-24q12-10 6 12zM122 218q12-10 0-24q-12-10-6 12z', G),
    // 17 Зірка: велика зірка, жінка з глечиками
    () => star(100, 90, 26, G, 8) + [[52, 70], [152, 66], [44, 120], [160, 112], [70, 62], [134, 60], [100, 130]].map(p => star(p[0], p[1], 6, C, 5)).join('') + circ(100, 160, 8, C) + path('M92 170l-16 28 14 4zM108 170l16 28-14 4z', G) + path('M92 170h16l6 36h-28z', B) + cup(58, 192, .8) + cup(142, 192, .8) + path('M66 202q20 20 34 28M134 202q-20 20-34 28', 'none', B, 2.4) + hill('M16 250V240q40-10 84 0t84 0V250Z', M) + path('M30 244q70 10 140 0', 'none', C, 1.5),
    // 18 Місяць: диск, вежі, пес/вовк, рак
    () => circ(100, 100, 34, M) + circ(100, 100, 26, G) + circ(112, 96, 21, M) + circ(96, 100, 3, N) + rays(100, 100, 40, 48, 16, G) + path('M36 220V150h22v70zM142 220V150h22v70z', C) + path('M34 150h26l-4-10h-18zM140 150h26l-4-10h-18z', G) + path('M100 250Q70 220 104 200T98 164', 'none', G, 3) + path('M72 232l6-14 8 4-4 10zM130 224l-4-14 8 2z', C) + circ(150, 236, 6, R) + path('M20 248q40-10 80 0t80 0', 'none', B, 2),
    // 19 Сонце: промені, дитина на коні, соняшники
    () => sun(100, 94, 28) + circ(94, 90, 2, N) + circ(106, 90, 2, N) + path('M92 102q8 6 16 0', 'none', N, 1.8) + rect(24, 150, 152, 70, M) + path('M24 150h152', 'none', G, 2) + [32, 62, 138, 168].map(x => line(x, 178, x, 150, C, 2) + circ(x, 146, 7, G) + circ(x, 146, 3, N)).join('') + path('M70 220q-4-30 20-40l36 8q10 20 0 32z', C) + path('M126 188q12-8 16 6', 'none', C, 4) + circ(100, 158, 6, R) + path('M96 164h8l2 14h-12z', G) + path('M100 160l16-14', 'none', G, 2) + path('M116 146l12 4-6 8z', R) + line(84, 220, 84, 244, C, 3) + line(116, 220, 116, 244, C, 3) + hill('M16 250V240H184V250Z', D),
    // 20 Суд: янгол, сурма, постаті з піднятими руками
    () => path('M24 92q22-18 44-6q16-16 40-2q22-10 40 8q8 8-6 12H30q-14-2-6-12z', C) + circ(100, 86, 8, G) + path('M92 94h16l8 36h-32z', B) + path('M96 110L48 96M104 110l48-14', 'none', C, 4) + path('M138 96l22-8 10 24z', G) + line(126, 100, 140, 96, G, 2) + path('M70 150l-8 20M130 150l8 20M100 140v20', 'none', G, 1.6) + path('M26 250V226h148v24z', M) + [48, 100, 152].map((x, i) => { const o = i === 1 ? 4 : 0; return circ(x, 194 + o, 6, C) + path(`M${x - 8} ${202 + o}l-8-14M${x + 8} ${202 + o}l8-14`, 'none', C, 2.4) + path(`M${x - 8} ${202 + o}h16l2 30h-20z`, C); }).join('') + path('M16 200L48 170L70 196L110 160L184 210', 'none', B, 1.6),
    // 21 Світ: лавровий вінок, танцівниця, чотири символи
    () => `<ellipse cx="100" cy="150" rx="52" ry="76" fill="none" stroke="${G}" stroke-width="3"/>` + [...Array(14).keys()].map(i => { const a = Math.PI * 2 * i / 14, x = f(100 + 52 * Math.cos(a)), y = f(150 + 76 * Math.sin(a)); return `<ellipse cx="${x}" cy="${y}" rx="4" ry="8" fill="${G}" transform="rotate(${f(a * 57.3 + 90)} ${x} ${y})"/>`; }).join('') + circ(100, 112, 7, C) + path('M94 120l6 6 6-6 6 8-12 40-12-40z', B) + path('M92 124q16 8 32-10', 'none', C, 3) + path('M96 168l-12 26M106 168l16 20', 'none', C, 4) + line(86, 118, 70, 104, G, 2) + line(124, 118, 140, 130, G, 2) + circ(34, 76, 6, 'none', C) + star(166, 76, 6, C, 4) + circ(34, 232, 6, R) + path('M160 226q6-12 12 0v12h-12z', G),
  ];
  const roman = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const face = (i, name, reversed) => `<svg class="ynt-face${reversed ? ' is-reversed' : ''}" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(name)}${reversed ? ', reversed' : ''}">` +
    `<rect width="200" height="300" rx="12" fill="${N}"/><rect x="5" y="5" width="190" height="290" rx="8" fill="none" stroke="${G}" stroke-width="1.6"/><rect x="10" y="10" width="180" height="280" rx="5" fill="none" stroke="${G}" stroke-width=".6" opacity=".5"/>` +
    `<text x="100" y="35" text-anchor="middle" fill="${G}" font-family="Georgia,serif" font-size="17" letter-spacing="3">${roman[i]}</text>` +
    `<line x1="64" y1="43" x2="136" y2="43" stroke="${G}" stroke-width=".8" opacity=".7"/>` +
    `<rect x="16" y="50" width="168" height="204" rx="4" fill="${D}" opacity=".55"/><g>${scenes[i]()}</g>` +
    `<rect x="16" y="50" width="168" height="204" rx="4" fill="none" stroke="${G}" stroke-width=".8" opacity=".6"/>` +
    `<text x="100" y="280" text-anchor="middle" fill="${C}" font-family="Georgia,serif" font-size="14.5" letter-spacing=".6">${esc(name)}</text></svg>`;
  const backSymbol = `<symbol id="ynt-back-art" viewBox="0 0 200 300"><rect width="200" height="300" rx="12" fill="${N}"/>` +
    `<rect x="6" y="6" width="188" height="288" rx="8" fill="none" stroke="${G}" stroke-width="1.6"/><rect x="12" y="12" width="176" height="276" rx="5" fill="none" stroke="${G}" stroke-width=".6" opacity=".55"/>` +
    `<g opacity=".7"><circle cx="100" cy="150" r="62" fill="none" stroke="${G}" stroke-width=".8"/><circle cx="100" cy="150" r="48" fill="none" stroke="${G}" stroke-width=".8"/>${rays(100, 150, 34, 62, 24, G, .6)}</g>` +
    `<ellipse cx="100" cy="150" rx="26" ry="64" fill="none" stroke="${G}" stroke-width=".8" opacity=".6" transform="rotate(35 100 150)"/><ellipse cx="100" cy="150" rx="26" ry="64" fill="none" stroke="${G}" stroke-width=".8" opacity=".6" transform="rotate(-35 100 150)"/>` +
    `<circle cx="100" cy="150" r="22" fill="${D}" stroke="${G}" stroke-width="1.2"/>${star(100, 150, 15, G, 8)}<circle cx="100" cy="150" r="3.5" fill="${N}"/>` +
    `${star(100, 40, 8, G, 4)}${star(100, 260, 8, G, 4)}${star(30, 150, 5, G, 4)}${star(170, 150, 5, G, 4)}${star(28, 30, 4, G, 4)}${star(172, 30, 4, G, 4)}${star(28, 270, 4, G, 4)}${star(172, 270, 4, G, 4)}</symbol>`;
  return { face, backSymbol };
})();
