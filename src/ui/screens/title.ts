// Title: the table in the dark, Jev's greeting, and a seat waiting for you.
import { randomSeed } from '../../core/rng.ts';
import { loadRun } from '../../core/store.ts';
import { newRun, type RunState } from '../../game/run.ts';
import { greeting } from '../../jev/dialogue.ts';
import { maskFor } from '../../art/registry.ts';
import { sfx, startDrone, unlockAudio } from '../../fx/audio.ts';
import { burst } from '../../fx/particles.ts';
import { app, go, persist } from '../app.ts';
import { h, wait } from '../dom.ts';
import { typeLines } from '../typewriter.ts';
import { topBar } from '../hud.ts';

export function mountTitle(root: HTMLElement) {
  const saved = loadRun<RunState>();
  const m = app.memory;
  const bar = topBar(null);
  const tallies = h('div', { class: 'tallies', 'data-tip-title': 'Grudge', 'data-tip': 'How much Jev remembers you. Higher grudge: Jev starts adapted, hits harder, and knows your tricks.' },
    ...Array.from({ length: m.grudge }, (_, i) => h('span', { class: i % 5 === 4 ? 'slash' : '' })));
  const lines = h('div', { class: 'greeting' });
  const title = h('h1', { class: 'game-title', html: `<span>Hollow</span><span>Hand</span>` });
  const sub = h('div', { class: 'subtitle sc' }, 'a night at Jev’s table');
  const buttons = h('div', { class: 'title-buttons' });
  const mask = h('div', { class: 'title-mask', html: `<svg viewBox="0 0 240 280"><g class="mask-body">${maskFor(m.lastDeath ? 'jev' : 'fool')}</g></svg>` });
  const stats = m.runs ? h('div', { class: 'title-stats sc' }, `nights: ${m.runs} · won: ${m.wins} · fallen: ${m.deaths}`) : null;

  const start = h('button', { class: 'seal-btn', onclick: () => begin() }, saved ? 'A new hand' : 'Take a seat');
  const cont = saved ? h('button', { class: 'seal-btn gold', onclick: () => resume() }, 'Continue the night') : null;
  const gallery = h('button', { class: 'ink-btn', onclick: () => go('gallery') }, 'The deck, in full');
  buttons.append(...[cont, start, gallery].filter(Boolean) as HTMLElement[]);

  root.append(bar.el, mask, h('div', { class: 'title-col' }, title, sub, lines, buttons, tallies, stats));

  let seated = false;
  (async () => {
    await wait(500);
    await typeLines(lines, greeting(m).slice(0, 3));
  })();

  const embers = setInterval(() => burst('ember', innerWidth * (0.3 + Math.random() * 0.4), innerHeight + 10, { n: 2, speed: 3, life: 140, gravity: -0.03, angle: -Math.PI / 2, spread: 0.5 }), 260);

  function begin() {
    if (seated) return;
    seated = true;
    unlockAudio();
    startDrone();
    sfx.bell();
    app.run = newRun(randomSeed(), app.memory);
    persist();
    go('intro');
  }
  function resume() {
    if (seated || !saved) return;
    seated = true;
    unlockAudio();
    startDrone();
    app.run = saved;
    go('map');
  }
  return () => {
    clearInterval(embers);
    bar.destroy();
  };
}

export function mountIntro(root: HTMLElement) {
  const m = app.memory;
  const box = h('div', { class: 'intro' });
  const next = h('button', { class: 'seal-btn', style: { opacity: '0' }, onclick: () => go('map') }, 'Pick up the cards');
  root.append(h('div', { class: 'intro-col' }, box, next));
  const lines = m.runs === 0
    ? [
        'You do not remember arriving. The candles do.',
        'A long table. A deck with too many cards. Across from you, something in a paper mask, shuffling with hands that do not stop.',
        '"I am Jev," it says. "I deal. You play. Every hand I watch you. Every hand I learn."',
        '"Win the night and you keep your name. Lose, and I keep it for you."',
      ]
    : [...greeting(m), '"Shall we?"'];
  (async () => {
    await typeLines(box, lines, 500);
    next.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 500, fill: 'forwards' });
  })();
}
