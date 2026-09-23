// Between hands, Jev studies you and writes a new rule. This is the adaptation made visible.
import { evolve, type Evolution } from '../../jev/evolve.ts';
import { describe } from '../../jev/profile.ts';
import { getCard } from '../../game/cards.ts';
import { nodeById } from '../../game/run.ts';
import { maskFor } from '../../art/registry.ts';
import { sfx } from '../../fx/audio.ts';
import { burst } from '../../fx/particles.ts';
import { flash, shake } from '../../fx/juice.ts';
import { app, go, persist } from '../app.ts';
import { cardEl } from '../cardView.ts';
import { anim, center, h, wait } from '../dom.ts';
import { typeInto } from '../typewriter.ts';

export function mountEvolve(root: HTMLElement, args: { nodeId: string }) {
  const run = app.run!;
  const face = nodeById(run, args.nodeId).mask ?? 'jev';
  const mask = h('div', { class: 'evolve-mask thinking crack2', html: `<svg viewBox="0 0 240 280"><g class="mask-body">${maskFor(face)}</g></svg>` });
  const words = h('div', { class: 'evolve-words' });
  const page = h('div', { class: 'ledger-page' });
  const steal = h('div', { class: 'evolve-steal' });
  const cont = h('button', { class: 'seal-btn', style: { opacity: '0', pointerEvents: 'none' }, onclick: () => go('map') }, 'Return to the night');
  const habits = h('div', { class: 'habit-sheet' });
  root.append(h('div', { class: 'evolve' }, mask, words, h('div', { class: 'evolve-row' }, habits, page, steal), cont));

  const d = describe(run.profile);
  habits.append(
    h('h4', { class: 'sc' }, 'What Jev saw'),
    ...([
      ['attack cards', d.share_of_attack_cards], ['ward cards', d.share_of_ward_cards], ['bleed cards', d.share_of_bleed_cards],
      ['hex cards', d.share_of_hex_cards], ['reversed', d.reversed_card_rate], ['cards / turn', String(d.cards_per_turn)],
      ['damage / turn', String(d.avg_damage_per_turn)], ['biggest turn', String(d.biggest_turn_damage)], ['favourite', d.favorite_card],
    ] as [string, string][]).map(([k, v]) => h('div', { class: 'habit' }, h('span', {}, k), h('b', {}, v))),
  );

  (async () => {
    sfx.thinking();
    const p = typeInto(words, 'Jev turns your cards over in its fingers, one by one…', 32);
    const evo: Evolution = await evolve(run.rng, run.profile, run.jev.mutations, run.jev.stolen);
    await p;
    await wait(500);
    words.replaceChildren();
    mask.classList.add('talking');
    await typeInto(words, `“${evo.read}”`, 30);
    mask.classList.remove('talking', 'thinking');
    await wait(400);

    if (evo.mutation) {
      run.jev.mutations.push(evo.mutation.id);
      page.append(h('div', { class: 'page-head sc' }, 'Ledger — new rule'));
      const nameEl = h('div', { class: 'rule-name' });
      page.append(nameEl);
      page.animate([{ transform: 'rotate(-8deg) translateY(40px)', opacity: 0 }, { transform: 'rotate(-2deg)', opacity: 1 }], { duration: 500, fill: 'forwards', easing: 'cubic-bezier(.2,.9,.3,1.2)' });
      await wait(300);
      sfx.quill();
      await typeInto(nameEl, evo.mutation.name, 70);
      const text = h('p', {}, evo.mutation.text);
      page.append(text);
      const why = h('p', { class: 'why sc' }, `punishes: ${evo.mutation.counters} · ${evo.source === 'jev' ? 'chosen by Jev' : 'chosen on instinct'}`);
      page.append(why);
      sfx.bell();
      const c = center(page);
      burst('ink', c.x, c.y, { n: 50, speed: 7, stain: true });
      shake(0.35);
      flash('#8a1c17', 0.25);
      mask.classList.add('talking');
      await typeInto(words, ` “${evo.mutation.line}”`, 28);
      mask.classList.remove('talking');
    }
    await wait(500);

    if (evo.stolen && !run.jev.stolen.includes(evo.stolen)) {
      run.jev.stolen.push(evo.stolen);
      steal.append(h('div', { class: 'page-head sc' }, 'It pockets a copy of'));
      const el = cardEl({ id: evo.stolen });
      steal.append(el);
      sfx.whoosh();
      await anim(el, [{ transform: 'translateY(30px) scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 400 });
      await wait(500);
      const inner = el.querySelector('.card-inner') as HTMLElement;
      sfx.curse();
      await anim(inner, [{ filter: 'none' }, { filter: 'invert(1) hue-rotate(180deg) brightness(.6) sepia(.6)' }], { duration: 700 });
      const c = center(el);
      burst('violet', c.x, c.y, { n: 30, speed: 4 });
      steal.append(h('p', { class: 'sc hint' }, `"I've seen that trick." Your ${getCard(evo.stolen).name} now lives in Jev's deck too.`));
    }
    persist();
    await wait(400);
    cont.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
    cont.style.pointerEvents = 'auto';
  })();
}
