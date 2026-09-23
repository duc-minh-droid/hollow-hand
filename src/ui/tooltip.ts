// One tooltip for the whole game. Any element with data-tip (and optional data-tip-title) gets one.
// Hovered cards get a side panel explaining their keywords.
import { KEYWORDS } from '../game/keywords.ts';
import { keywordsIn, type CardLike } from './cardView.ts';
import { h } from './dom.ts';

let tip: HTMLElement;
let panel: HTMLElement | null = null;

export function initTooltips() {
  tip = h('div', { id: 'tip' });
  document.body.append(tip);
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[data-tip]');
    if (!t) return hide();
    tip.innerHTML = `${t.dataset.tipTitle ? `<h4>${t.dataset.tipTitle}</h4>` : ''}<p>${t.dataset.tip}</p>`;
    tip.classList.add('on');
    place(t);
  });
  document.addEventListener('pointerdown', hide);
}

function place(t: HTMLElement) {
  const r = t.getBoundingClientRect();
  const tr = tip.getBoundingClientRect();
  let x = r.left + r.width / 2 - tr.width / 2;
  let y = r.bottom + 10;
  if (y + tr.height > innerHeight - 8) y = r.top - tr.height - 10;
  x = Math.max(8, Math.min(innerWidth - tr.width - 8, x));
  tip.style.left = `${x}px`;
  tip.style.top = `${y}px`;
}

function hide() {
  tip?.classList.remove('on');
}

export function showKeywords(card: CardLike, anchor: HTMLElement) {
  hideKeywords();
  const kws = keywordsIn(card);
  if (!kws.length) return;
  panel = h('div', { class: 'kw-panel' });
  for (const k of kws) panel.append(h('div', { html: `<b>${k}</b>${KEYWORDS[k]}` }));
  document.body.append(panel);
  const r = anchor.getBoundingClientRect();
  const right = r.right + 12 + 220 < innerWidth;
  panel.style.left = `${right ? r.right + 12 : r.left - 232}px`;
  panel.style.top = `${Math.max(8, Math.min(r.top, innerHeight - panel.offsetHeight - 8))}px`;
}

export function hideKeywords() {
  panel?.remove();
  panel = null;
}
