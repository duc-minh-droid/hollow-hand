// Shared chrome: top bar, settings popover, pile/deck viewers, deck picker.
import type { RunState } from '../game/run.ts';
import { getTrinket } from '../game/trinkets.ts';
import { trinketFor } from '../art/registry.ts';
import { icon } from '../art/icons.ts';
import { onJevStatus } from '../jev/jevClient.ts';
import { cardEl, addTilt, type CardLike } from './cardView.ts';
import { h } from './dom.ts';
import { settings, updateSettings } from './settings.ts';
import { sfx } from '../fx/audio.ts';

export function trinketEl(id: string) {
  const t = getTrinket(id);
  return h('div', { class: 'trinket', 'data-trinket': id, 'data-tip-title': t.name, 'data-tip': t.text, html: `<svg viewBox="0 0 64 64">${trinketFor(id)}</svg>` });
}

export function topBar(run: RunState | null, extra?: { floor?: string; onDeck?: () => void }) {
  const hp = h('div', { class: 'stat hp', html: `${icon('heart')}<span></span>` });
  const teeth = h('div', { class: 'stat teeth', 'data-tip-title': 'Teeth', 'data-tip': 'The currency of the house. Spend them at the Pawnbroker.', html: `${icon('tooth')}<span></span>` });
  const trinkets = h('div', { class: 'trinkets' });
  const tag = h('div', { class: 'jev-tag' });
  const deckBtn = extra?.onDeck ? h('button', { class: 'icon-btn', 'data-tip': 'View your deck', onclick: extra.onDeck, html: icon('deck') }) : null;
  const gear = h('button', { class: 'icon-btn', 'data-tip': 'Settings', html: icon('gear'), onclick: (e: Event) => settingsPopover(e.currentTarget as HTMLElement) });
  const bar = h('div', { class: 'topbar' }, run ? hp : null, run ? teeth : null, trinkets, h('div', { class: 'spacer' }), extra?.floor ? h('div', { class: 'floor' }, extra.floor) : null, tag, deckBtn, gear);

  const off = onJevStatus((st) => {
    tag.className = `jev-tag ${st}`;
    tag.innerHTML = `${icon(st === 'awake' ? 'eye' : 'eyeClosed')}<span>Jev: ${st === 'awake' ? 'awake' : st === 'dreaming' ? 'dreaming' : '…'}</span>`;
    tag.dataset.tipTitle = st === 'awake' ? 'Jev is awake' : 'Jev is dreaming';
    tag.dataset.tip = st === 'awake'
      ? "Jev's choices are made by TypeSafe's Jev model, reading the table and your habits every turn."
      : 'No TypeSafe key found (or unreachable). Jev plays on instinct: a local heuristic that still studies your habits.';
  });

  const update = () => {
    if (!run) return;
    hp.querySelector('span')!.textContent = `${run.hp}/${run.maxHp}`;
    teeth.querySelector('span')!.textContent = String(run.teeth);
    trinkets.replaceChildren(...run.trinkets.map(trinketEl));
  };
  update();
  return { el: bar, update, destroy: off };
}

function settingsPopover(anchor: HTMLElement) {
  document.querySelector('.settings-pop')?.remove();
  const r = anchor.getBoundingClientRect();
  const juice = h('input', { type: 'range', min: '0', max: '100', value: String(Math.round(settings.juice * 100)) }) as HTMLInputElement;
  const vol = h('input', { type: 'range', min: '0', max: '100', value: String(Math.round(settings.volume * 100)) }) as HTMLInputElement;
  const mute = h('input', { type: 'checkbox', ...(settings.muted ? { checked: true } : {}) }) as HTMLInputElement;
  juice.oninput = () => updateSettings({ juice: +juice.value / 100 });
  vol.oninput = () => updateSettings({ volume: +vol.value / 100 });
  mute.onchange = () => updateSettings({ muted: mute.checked });
  const pop = h('div', { class: 'settings-pop', style: { top: `${r.bottom + 8}px`, right: `${innerWidth - r.right}px` } },
    h('label', {}, h('span', {}, 'Juice'), juice),
    h('label', {}, h('span', {}, 'Volume'), vol),
    h('label', { class: 'row' }, mute, h('span', {}, 'Mute')),
    h('p', { class: 'hint' }, 'Juice scales shake, particles and hit-stop.'),
  );
  document.body.append(pop);
  const close = (e: Event) => {
    if (!pop.contains(e.target as Node) && e.target !== anchor) {
      pop.remove();
      document.removeEventListener('pointerdown', close);
    }
  };
  setTimeout(() => document.addEventListener('pointerdown', close));
}

export function cardsModal(title: string, sub: string, cards: CardLike[], onPick?: (c: CardLike, i: number) => void, preview?: (c: CardLike) => CardLike) {
  const grid = h('div', { class: 'grid' });
  const modal = h('div', { class: 'modal' }, h('h2', {}, title), h('div', { class: 'sub' }, sub), grid);
  const close = () => {
    modal.remove();
    removeEventListener('keydown', onKey);
  };
  const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
  addEventListener('keydown', onKey);
  cards.forEach((c, i) => {
    const slot = h('div', { class: 'pick-slot' });
    const normal = cardEl(c);
    addTilt(normal);
    slot.append(normal);
    if (preview) {
      const after = cardEl(preview(c));
      addTilt(after);
      slot.addEventListener('pointerenter', () => slot.replaceChildren(after));
      slot.addEventListener('pointerleave', () => slot.replaceChildren(normal));
    }
    if (onPick) {
      slot.addEventListener('click', () => {
        sfx.click();
        close();
        onPick(c, i);
      });
    }
    grid.append(slot);
  });
  if (!cards.length) grid.append(h('p', { class: 'sc', style: { color: 'var(--shadow)' } }, 'Empty.'));
  modal.append(h('button', { class: 'ink-btn close', onclick: close }, onPick ? 'Never mind' : 'Close'));
  document.body.append(modal);
  return close;
}
