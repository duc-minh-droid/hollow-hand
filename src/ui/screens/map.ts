// The night's map: a tarot spread of nodes on parchment. The ink path follows your choices.
import { nodeById, reachable, type MapNode } from '../../game/run.ts';
import { NODE_ICON } from '../../art/icons.ts';
import { getMutation } from '../../jev/mutations.ts';
import { getCard } from '../../game/cards.ts';
import { MASKS } from '../../jev/masks.ts';
import { getEvent } from '../../game/events.ts';
import { sfx } from '../../fx/audio.ts';
import { burst } from '../../fx/particles.ts';
import { app, go, persist } from '../app.ts';
import { cardsModal, topBar } from '../hud.ts';
import { cardEl } from '../cardView.ts';
import { center, h } from '../dom.ts';

const LABEL: Record<string, string> = { fight: 'A hand', elite: 'A cruel hand', event: 'Something stirs', shop: 'The Pawnbroker', rest: 'A quiet candle', boss: 'Jev, unmasked' };

export function mountMap(root: HTMLElement) {
  const run = app.run!;
  persist();
  const bar = topBar(run, { floor: 'the night', onDeck: () => cardsModal('Your deck', `${run.deck.length} cards`, run.deck) });
  const W = 1000;
  const H = 1400;
  const next = new Set(reachable(run).map((n) => n.id));
  const px = (n: MapNode) => ({ x: 90 + n.x * (W - 180), y: 90 + n.y * (H - 180) });

  let paths = '';
  for (const n of run.nodes) {
    for (const id of n.next) {
      const m = nodeById(run, id);
      const a = px(n);
      const b = px(m);
      const walked = run.visited.includes(n.id) && (run.visited.includes(m.id) || run.at === n.id && next.has(m.id));
      const taken = run.visited.includes(n.id) && run.visited.includes(m.id);
      const mx = (a.x + b.x) / 2 + (n.col - m.col) * 30;
      const my = (a.y + b.y) / 2;
      paths += `<path class="${taken ? 'taken' : walked ? 'open' : ''}" d="M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}"/>`;
    }
  }
  const svg = `<svg viewBox="0 0 ${W} ${H}" class="map-paths" preserveAspectRatio="xMidYMid meet">
    <g fill="none" stroke="#3b2a1c" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round">${paths}</g>
  </svg>`;
  const sheet = h('div', { class: 'map-sheet', html: svg });
  for (const n of run.nodes) {
    const p = px(n);
    const state = run.visited.includes(n.id) ? 'done' : next.has(n.id) ? 'next' : 'far';
    const tip = n.type === 'fight' || n.type === 'elite' || n.type === 'boss' ? `${MASKS[n.mask!].name} — ${MASKS[n.mask!].quirk}` : n.type === 'event' ? getEvent(n.event!).title : LABEL[n.type];
    const el = h('button', {
      class: `node node-${n.type} ${state} ${run.at === n.id ? 'here' : ''}`,
      style: { left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` },
      'data-tip-title': LABEL[n.type], 'data-tip': tip,
      html: `<svg viewBox="0 0 40 40">${NODE_ICON[n.type]}</svg>`,
      onclick: () => enter(n, el),
    });
    sheet.append(el);
  }

  // Jev's ledger: what it has learned about you so far.
  const ledger = h('div', { class: 'map-ledger' },
    h('h3', {}, "Jev's ledger"),
    h('p', { class: 'hint' }, 'Rules Jev has written to beat you.'),
    ...(run.jev.mutations.length ? run.jev.mutations.map((id) => h('div', { class: 'rule', 'data-tip-title': getMutation(id).name, 'data-tip': getMutation(id).text, html: `<span class="dot"></span>${getMutation(id).name}` })) : [h('div', { class: 'empty sc' }, 'blank, for now')]),
    h('h4', {}, 'Tricks it stole'),
    ...(run.jev.stolen.length ? [h('div', { class: 'stolen' }, ...run.jev.stolen.map((id) => { const c = cardEl({ id }, { width: 74 }); c.dataset.tip = getCard(id).name; return c; }))] : [h('div', { class: 'empty sc' }, 'none')]),
  );

  const legend = h('div', { class: 'map-legend sc' },
    ...(['fight', 'elite', 'event', 'shop', 'rest', 'boss'] as const).map((k) => h('span', { html: `<svg viewBox="0 0 40 40">${NODE_ICON[k]}</svg>${LABEL[k]}` })));
  const scroller = h('div', { class: 'map-scroll' }, h('h2', { class: 'map-title' }, 'The Night'), h('p', { class: 'map-sub sc' }, 'choose your next hand'), sheet, legend);
  root.append(bar.el, scroller, ledger);
  // Start near where you are.
  requestAnimationFrame(() => {
    const target = sheet.querySelector('.node.next') as HTMLElement | null;
    if (target) scroller.scrollTop = target.offsetTop - scroller.clientHeight * 0.6;
  });

  let leaving = false;
  function enter(n: MapNode, el: HTMLElement) {
    if (!next.has(n.id) || leaving) {
      sfx.error();
      return;
    }
    leaving = true;
    sfx.page();
    const c = center(el);
    burst('ink', c.x, c.y, { n: 40, speed: 6, stain: true });
    el.classList.add('chosen');
    setTimeout(() => {
      if (n.type === 'fight' || n.type === 'elite' || n.type === 'boss') go('combat', { nodeId: n.id });
      else go(n.type, { nodeId: n.id });
    }, 350);
  }
  return () => bar.destroy();
}

export function completeNode(nodeId: string) {
  const run = app.run!;
  run.at = nodeId;
  if (!run.visited.includes(nodeId)) run.visited.push(nodeId);
  persist();
}

