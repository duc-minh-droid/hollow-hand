// Ink-bleed typewriter: letters arrive blurred and dark, then settle.
import { h, wait } from './dom.ts';
import { sfx } from '../fx/audio.ts';

export async function typeInto(el: HTMLElement, text: string, speed = 26, signal?: { skip: boolean }) {
  const line = h('span', { class: 'tw-line' });
  el.append(line);
  for (const ch of text) {
    if (signal?.skip) {
      line.append(document.createTextNode(ch));
      continue;
    }
    const s = h('span', { class: 'tw-ch' }, ch);
    line.append(s);
    if (ch !== ' ' && Math.random() < 0.18) sfx.quill();
    await wait(ch === '.' || ch === ',' ? speed * 6 : speed);
  }
  return line;
}

export async function typeLines(el: HTMLElement, lines: string[], gap = 380) {
  const signal = { skip: false };
  const skip = () => (signal.skip = true);
  addEventListener('pointerdown', skip, { once: true });
  for (const l of lines) {
    const p = h('p', { class: 'tw' });
    el.append(p);
    await typeInto(p, l, 24, signal);
    if (!signal.skip) await wait(gap);
  }
  removeEventListener('pointerdown', skip);
}
