// The card frame. Parchment, woodcut double border, wax-seal cost, arched art window,
// ribbon title, ruled rules panel. Everything scales with the card via container units.
import { getCard, tollOf } from '../game/cards.ts';
import type { Suit } from '../game/types.ts';
import { artFor } from '../art/registry.ts';
import { ICON, cardBack } from '../art/icons.ts';
import { BLOOD, BLOOD_D, GOLD, INK, VERD } from '../art/palette.ts';
import { KEYWORDS } from '../game/keywords.ts';
import { h } from './dom.ts';

export interface CardLike {
  id: string;
  up?: boolean;
  rev?: boolean;
  uid?: number;
}

export interface CardOpts {
  width?: number;
  costOverride?: number;
  faceDown?: boolean;
  extraClass?: string;
}

const corner = (suit: Suit, color: string) => {
  const g = ICON[suit === 'curse' ? 'curse' : suit];
  const at = (x: number, y: number, r: number) =>
    `<g transform="translate(${x} ${y}) rotate(${r}) scale(.62) translate(-12 -12)" style="color:${color}">${g}</g>`;
  return at(23, 23, 0) + at(227, 23, 90) + at(23, 377, -90) + at(227, 377, 180);
};

function frameSvg(suit: Suit, rarity: string, jev: boolean) {
  const line = jev ? BLOOD : INK;
  const accent = rarity === 'rare' ? 'url(#hh-gold)' : rarity === 'uncommon' ? VERD : jev ? GOLD : INK;
  const accentW = rarity === 'rare' ? 3.2 : rarity === 'uncommon' ? 2 : 1;
  return `<svg class="c-frame" viewBox="0 0 250 400" preserveAspectRatio="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="247" height="397" rx="11" fill="none" stroke="${line}" stroke-width="3"/>
    <rect x="9" y="9" width="232" height="382" rx="6" fill="none" stroke="${accent}" stroke-width="${accentW}"/>
    <rect x="13.5" y="13.5" width="223" height="373" rx="4" fill="none" stroke="${line}" stroke-width=".8" stroke-dasharray="${jev ? '0' : '3 2'}"/>
    ${corner(suit, jev ? GOLD : line)}
    <path d="M60 392h130" stroke="${line}" stroke-width="1"/>
  </svg>`;
}

const ribbon = (jev: boolean) => `<svg class="c-ribbon-svg" viewBox="0 0 240 44" preserveAspectRatio="none" aria-hidden="true">
  <path d="M2 10l18 4v22L2 40l8-15z" fill="${jev ? BLOOD_D : '#b9a57c'}" stroke="${INK}" stroke-width="1.5"/>
  <path d="M238 10l-18 4v22l18 4-8-15z" fill="${jev ? BLOOD_D : '#b9a57c'}" stroke="${INK}" stroke-width="1.5"/>
  <path d="M16 6q104 -8 208 0v30q-104 -8 -208 0z" fill="${jev ? '#2a1411' : '#efe4cb'}" stroke="${INK}" stroke-width="1.8"/>
  <path d="M20 31q100 -7 200 0" fill="none" stroke="${jev ? GOLD : '#8c7a60'}" stroke-width=".7" opacity=".7"/>
</svg>`;

const seal = (jev: boolean, toll: boolean) => `<svg class="c-seal-svg" viewBox="0 0 60 60" aria-hidden="true">
  <path d="M30 3c6 0 8 4 13 5s10 2 11 8-1 8 1 13 3 10-2 14-6 3-9 8-9 7-14 6-8-3-13-4-10-2-11-8 1-8-1-13-3-10 2-14 6-3 9-8 8-7 14-7z"
    fill="${toll ? '#3b0b09' : jev ? '#1c0f0d' : BLOOD}" stroke="${INK}" stroke-width="2"/>
  <circle cx="30" cy="30" r="17" fill="none" stroke="${jev ? GOLD : '#c24a3c'}" stroke-width="1.4" opacity=".75"/>
  <path d="M16 20q6-6 14-7" fill="none" stroke="#fff" stroke-width="2" opacity=".18" stroke-linecap="round"/>
</svg>`;

const textLen = (t: string) => t.replace(/<[^>]+>/g, '').length;

/** Wrap keyword words in the rules text so they get tooltips and ink styling. */
function decorate(text: string) {
  return text.replace(/<i>([^<]+)<\/i>/g, (_, w: string) => {
    const key = w.replace(/\s+\d+$/, '');
    return KEYWORDS[key] ? `<i class="kw" data-kw="${key}">${w}</i>` : `<i>${w}</i>`;
  }).replace(/\b(Bleed|Hex|Frail|Thorns|Fury|Omen|Dread|Veil|Ward)\b(?![^<]*>)/g, '<span class="kw" data-kw="$1">$1</span>');
}

export function keywordsIn(c: CardLike): string[] {
  const def = getCard(c.id);
  const text = c.rev ? def.revText(!!c.up) : def.text(!!c.up);
  const out = new Set<string>();
  for (const k of Object.keys(KEYWORDS)) if (new RegExp(`\\b${k}\\b`).test(text)) out.add(k);
  if (c.rev) out.add('Reversed');
  return [...out];
}

export function cardEl(c: CardLike, opts: CardOpts = {}): HTMLElement {
  const def = getCard(c.id);
  const jev = def.rarity === 'jev';
  const rev = !!c.rev;
  const cls = ['card', `suit-${def.suit}`, `rar-${def.rarity}`, jev && 'jev', rev && 'rev', c.up && 'up', opts.faceDown && 'face-down', opts.extraClass]
    .filter(Boolean)
    .join(' ');
  const el = h('div', { class: cls, 'data-id': c.id, 'data-uid': c.uid ?? '' });
  if (opts.width) el.style.setProperty('--cw', `${opts.width}px`);

  const toll = tollOf(def, rev);
  const cost = opts.costOverride ?? def.cost;
  const text = rev ? def.revText(!!c.up) : def.text(!!c.up);
  const name = def.name + (c.up ? '+' : '');

  const face = h('div', { class: 'c-face' });
  face.innerHTML = `
    <div class="c-paper"></div>
    ${frameSvg(def.suit, def.rarity, jev)}
    <div class="c-num">${rev ? '<span class="c-revmark">⸸</span>' : ''}${def.numeral}</div>
    <div class="c-art"><svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${artFor(c.id)}</svg></div>
    <div class="c-ribbon">${ribbon(jev)}<span style="--nl:${Math.max(9, name.length)}">${name}</span></div>
    <div class="c-text ${textLen(text) > 88 ? 'longer' : textLen(text) > 60 ? 'long' : ''}"><div class="c-text-inner">${decorate(text)}</div></div>
    ${def.unplayable ? '' : `<div class="c-seal ${toll ? 'toll' : ''}">${seal(jev, !!toll)}<span>${toll ? toll : cost}</span>${toll ? '<em>HP</em>' : ''}</div>`}
    <div class="c-suit">${`<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[def.suit === 'curse' ? 'curse' : def.suit]}</svg>`}</div>
    <div class="c-glare"></div>`;

  const back = h('div', { class: 'c-back', html: cardBack() });
  const inner = h('div', { class: 'card-inner' }, face, back);
  el.append(inner);
  return el;
}

/** Live 3D tilt + foil glare that follows the pointer. */
export function addTilt(el: HTMLElement, strength = 14) {
  const inner = el.querySelector<HTMLElement>('.card-inner')!;
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    inner.style.setProperty('--rx', `${(0.5 - y) * strength}deg`);
    inner.style.setProperty('--ry', `${(x - 0.5) * strength}deg`);
    inner.style.setProperty('--mx', `${x * 100}%`);
    inner.style.setProperty('--my', `${y * 100}%`);
  };
  const leave = () => {
    inner.style.setProperty('--rx', '0deg');
    inner.style.setProperty('--ry', '0deg');
  };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
}
