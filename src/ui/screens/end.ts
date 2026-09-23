// Endings, and the gallery of every card.
import { allCards, getCard } from '../../game/cards.ts';
import { TRINKETS } from '../../game/trinkets.ts';
import { MASKS } from '../../jev/masks.ts';
import { maskFor } from '../../art/registry.ts';
import { sfx, stopDrone } from '../../fx/audio.ts';
import { burst } from '../../fx/particles.ts';
import { app, go } from '../app.ts';
import { addTilt, cardEl } from '../cardView.ts';
import { h, wait } from '../dom.ts';
import { topBar, trinketEl } from '../hud.ts';
import { typeLines } from '../typewriter.ts';
import { showKeywords, hideKeywords } from '../tooltip.ts';

export function mountEnd(root: HTMLElement, args: { won: boolean; mask?: string }) {
  const m = app.memory;
  const lines = args.won
    ? [
        'Jev sets the last card down, face-up, and does not pick up another.',
        '"Take it, then. Your name." It slides something small and warm across the table.',
        'The candles go out all at once. When they relight, the chair across from you is empty.',
        'You are free. You think.',
      ]
    : [
        `${args.mask ?? 'Jev'} leans across the table and closes your eyes for you.`,
        '"Shh. I will keep your name somewhere safe. With the others."',
        m.ghostCard ? `It pockets your ${getCard(m.ghostCard).name}. "For next time."` : '"For next time."',
      ];
  const box = h('div', { class: 'end-lines' });
  const tallies = h('div', { class: 'tallies big' }, ...Array.from({ length: m.grudge }, (_, i) => h('span', { class: i % 5 === 4 ? 'slash' : '' })));
  const again = h('button', { class: 'seal-btn', style: { opacity: '0' }, onclick: () => go('title') }, args.won ? 'Sit down again' : 'Deal again');
  root.append(h('div', { class: `end ${args.won ? 'won' : 'lost'}` },
    h('h1', { class: 'end-title' }, args.won ? 'Your name is yours' : 'Jev keeps your name'),
    box,
    h('div', { class: 'grudge sc' }, h('span', {}, 'Grudge'), tallies),
    h('p', { class: 'sc hint' }, args.won ? 'Jev will remember losing. Next night it starts a little less angry.' : 'Next night, Jev begins already knowing some of your tricks.'),
    again));
  stopDrone();
  (async () => {
    if (args.won) {
      sfx.victory();
      for (let i = 0; i < 8; i++) setTimeout(() => burst('gold', innerWidth * Math.random(), innerHeight * 0.4, { n: 30, speed: 7 }), i * 220);
    } else sfx.death();
    await wait(600);
    await typeLines(box, lines, 500);
    again.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
  })();
}

export function mountGallery(root: HTMLElement) {
  const bar = topBar(null);
  let rev = false;
  let up = false;
  const grid = h('div', { class: 'gallery-grid' });
  const draw = () => {
    grid.replaceChildren();
    for (const group of [['starter', 'Starting hand'], ['common', 'Common'], ['uncommon', 'Uncommon'], ['rare', 'Rare'], ['curse', 'Curses'], ['jev', "Jev's cards"]] as const) {
      grid.append(h('h3', {}, group[1]));
      const row = h('div', { class: 'gallery-row' });
      for (const d of allCards.filter((c) => c.rarity === group[0])) {
        const el = cardEl({ id: d.id, rev, up });
        addTilt(el);
        el.addEventListener('pointerenter', () => showKeywords({ id: d.id, rev, up }, el));
        el.addEventListener('pointerleave', hideKeywords);
        row.append(el);
      }
      grid.append(row);
    }
    grid.append(h('h3', {}, 'Masks'));
    grid.append(h('div', { class: 'gallery-row masks' }, ...Object.values(MASKS).map((mk) => h('div', { class: 'gallery-mask', 'data-tip-title': mk.name, 'data-tip': mk.quirk, html: `<svg viewBox="0 0 240 280">${maskFor(mk.id)}</svg><span class="sc">${mk.name}</span>` }))));
    grid.append(h('h3', {}, 'Trinkets'));
    grid.append(h('div', { class: 'gallery-row trinkets' }, ...TRINKETS.map((t) => trinketEl(t.id))));
  };
  const toggles = h('div', { class: 'gallery-toggles' },
    h('button', { class: 'ink-btn', onclick: (e: Event) => { rev = !rev; (e.currentTarget as HTMLElement).classList.toggle('on', rev); draw(); } }, 'Reversed'),
    h('button', { class: 'ink-btn', onclick: (e: Event) => { up = !up; (e.currentTarget as HTMLElement).classList.toggle('on', up); draw(); } }, 'Carved'),
    h('button', { class: 'ink-btn', onclick: () => go('title') }, 'Back to the table'));
  root.append(bar.el, h('div', { class: 'gallery' }, h('h2', {}, 'The deck, in full'), toggles, grid));
  draw();
  return () => bar.destroy();
}
