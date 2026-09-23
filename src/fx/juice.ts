// Screen-level juice: shake, hit-stop, flashes, zoom punches, chromatic split, floating numbers.
import { settings } from '../ui/settings.ts';
import { h, wait } from '../ui/dom.ts';

let stage: HTMLElement;
let overlay: HTMLElement;
let trauma = 0;
let shaking = false;

export function initJuice(stageEl: HTMLElement, overlayEl: HTMLElement) {
  stage = stageEl;
  overlay = overlayEl;
}

/** Trauma-based shake: intensity adds up, decays smoothly, felt quadratically. */
export function shake(amount: number) {
  if (!stage || settings.juice <= 0) return;
  trauma = Math.min(1, trauma + amount * settings.juice);
  if (shaking) return;
  shaking = true;
  const seed = Math.random() * 1000;
  const loop = (t: number) => {
    trauma = Math.max(0, trauma - 0.028);
    const k = trauma * trauma;
    const x = Math.sin(seed + t * 0.071) * 22 * k;
    const y = Math.cos(seed + t * 0.089) * 16 * k;
    const r = Math.sin(seed + t * 0.053) * 2.2 * k;
    stage.style.setProperty('--shake', `translate(${x}px, ${y}px) rotate(${r}deg)`);
    if (trauma > 0) requestAnimationFrame(loop);
    else {
      shaking = false;
      stage.style.setProperty('--shake', 'none');
    }
  };
  requestAnimationFrame(loop);
}

/** Freeze every CSS animation for a beat so heavy hits land. */
export async function hitstop(ms: number) {
  if (!stage || settings.juice <= 0.05) return;
  stage.classList.add('hitstop');
  await wait(ms * settings.juice);
  stage.classList.remove('hitstop');
}

export function flash(color: string, alpha = 0.35, ms = 260) {
  if (!overlay) return;
  const el = h('div', { class: 'flash', style: { background: color } });
  overlay.append(el);
  el.animate([{ opacity: alpha * (0.4 + 0.6 * settings.juice) }, { opacity: 0 }], { duration: ms, easing: 'ease-out' }).finished.then(() => el.remove());
}

export function zoomPunch(scale = 1.04, ms = 260) {
  if (!stage || settings.juice <= 0) return;
  const s = 1 + (scale - 1) * settings.juice;
  stage.animate([{ scale: '1' }, { scale: String(s) }, { scale: '1' }], { duration: ms, easing: 'cubic-bezier(.2,.9,.3,1)' });
}

export function chroma(ms = 220) {
  if (!stage || settings.juice <= 0.2) return;
  stage.classList.add('chroma');
  setTimeout(() => stage.classList.remove('chroma'), ms);
}

export type FloatKind = 'dmg' | 'crit' | 'heal' | 'ward' | 'bleed' | 'status' | 'info' | 'candle';

export function floatText(x: number, y: number, text: string, kind: FloatKind = 'dmg') {
  if (!overlay) return;
  const el = h('div', { class: `float float-${kind}` }, text);
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  overlay.append(el);
  const dx = (Math.random() - 0.5) * 70;
  const rot = (Math.random() - 0.5) * 24;
  const big = kind === 'crit';
  el.animate(
    [
      { transform: `translate(-50%, -50%) scale(${big ? 2.6 : 1.8}) rotate(${rot}deg)`, opacity: 0 },
      { transform: `translate(-50%, -80%) scale(1) rotate(${rot / 2}deg)`, opacity: 1, offset: 0.15 },
      { transform: `translate(calc(-50% + ${dx * 0.6}px), -140%) scale(1) rotate(${rot / 3}deg)`, opacity: 1, offset: 0.6 },
      { transform: `translate(calc(-50% + ${dx}px), -40%) scale(.85) rotate(${rot}deg)`, opacity: 0 },
    ],
    { duration: big ? 1400 : 1050, easing: 'cubic-bezier(.2,.7,.4,1)' },
  ).finished.then(() => el.remove());
}

/** A full-screen ink blot that swallows one screen and spits out the next. */
export async function inkWipe(mid: () => void | Promise<void>) {
  if (!overlay) return mid();
  const el = h('div', { class: 'ink-wipe' });
  overlay.append(el);
  await el.animate([{ clipPath: 'circle(0% at 50% 55%)' }, { clipPath: 'circle(150% at 50% 55%)' }], { duration: 420, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' }).finished;
  await mid();
  await el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, easing: 'ease-out', fill: 'forwards' }).finished;
  el.remove();
}
