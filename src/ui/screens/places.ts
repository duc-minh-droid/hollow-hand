// Non-combat nodes: story events, the Pawnbroker, the quiet candle.
import { getEvent, type EventDef } from '../../game/events.ts';
import { getCard } from '../../game/cards.ts';
import { nodeById, rollShop } from '../../game/run.ts';
import { getTrinket } from '../../game/trinkets.ts';
import { getMutation } from '../../jev/mutations.ts';
import { artFor } from '../../art/registry.ts';
import { sfx } from '../../fx/audio.ts';
import { burst } from '../../fx/particles.ts';
import { flash, shake } from '../../fx/juice.ts';
import { app, go, persist } from '../app.ts';
import { addTilt, cardEl } from '../cardView.ts';
import { anim, center, h, wait } from '../dom.ts';
import { cardsModal, topBar, trinketEl } from '../hud.ts';
import { typeInto, typeLines } from '../typewriter.ts';
import { completeNode } from './map.ts';
import { icon, candleSvg } from '../../art/icons.ts';

const EVENT_ART: Record<EventDef['art'], string> = {
  mirror: 'mirror', child: 'reading', pawn: 'j_ledger', candle: 'tallow', corpse: 'castlots', chair: 'j_sleight',
};

export function mountEvent(root: HTMLElement, args: { nodeId: string }) {
  const run = app.run!;
  const ev = getEvent(nodeById(run, args.nodeId).event!);
  const bar = topBar(run);
  const art = h('div', { class: 'event-art', html: `<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">${artFor(EVENT_ART[ev.art])}</svg>` });
  const body = h('div', { class: 'event-body' });
  const choices = h('div', { class: 'event-choices' });
  const result = h('div', { class: 'event-result' });
  root.append(bar.el, h('div', { class: 'event page' }, art, h('div', { class: 'event-text' }, h('h2', {}, ev.title), body, choices, result)));

  (async () => {
    await typeLines(body, ev.body, 300);
    for (const ch of ev.choices) {
      const ok = ch.can ? ch.can(run) : true;
      const btn = h('button', { class: `choice ${ok ? '' : 'locked'}`, disabled: !ok }, h('span', { class: 'label' }, ch.label), h('span', { class: 'hint' }, ch.hint));
      btn.addEventListener('click', () => choose(ch, btn));
      choices.append(btn);
      btn.animate([{ opacity: 0, transform: 'translateX(-20px)' }, { opacity: 1, transform: 'none' }], { duration: 300, fill: 'backwards' });
      await wait(90);
    }
  })();

  let chosen = false;
  async function choose(ch: EventDef['choices'][number], btn: HTMLElement) {
    if (chosen) return;
    chosen = true;
    sfx.page();
    for (const b of choices.children) if (b !== btn) (b as HTMLElement).classList.add('faded');
    btn.classList.add('picked');
    const hpBefore = run.hp;
    const out = ch.resolve(run);
    if (out.roll) {
      const d = h('div', { class: 'dice inline' }, '?');
      result.append(d);
      sfx.dice();
      for (let i = 0; i < 12; i++) {
        d.textContent = String(1 + Math.floor(Math.random() * out.roll.faces));
        d.style.transform = `rotate(${i * 60}deg)`;
        await wait(45);
      }
      d.textContent = String(out.roll.result);
      d.style.transform = 'scale(1.2)';
      const c = center(d);
      burst(out.roll.result >= 4 ? 'gold' : 'blood', c.x, c.y, { n: 24, speed: 5 });
      await wait(300);
    }
    const p = h('p', { class: 'tw' });
    result.append(p);
    await typeInto(p, out.text, 22);
    if (run.hp < hpBefore) {
      flash('#8a1c17', 0.3);
      shake(0.3);
      sfx.hit(true);
    }
    if (out.gainCard) {
      const el = cardEl({ id: out.gainCard });
      addTilt(el);
      result.append(el);
      sfx.whoosh();
      void anim(el, [{ transform: 'translateY(30px) rotate(-8deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 400 });
    }
    if (out.gainTrinket) {
      result.append(h('div', { class: 'spoil-trinket' }, trinketEl(out.gainTrinket), h('div', {}, h('b', {}, getTrinket(out.gainTrinket).name), h('p', {}, getTrinket(out.gainTrinket).text))));
      sfx.coin();
    }
    bar.update();
    completeNode(args.nodeId);
    result.append(h('button', { class: 'seal-btn', onclick: () => go('map') }, 'Onward'));
  }
  return () => bar.destroy();
}

export function mountShop(root: HTMLElement, args: { nodeId: string }) {
  const run = app.run!;
  const stock = rollShop(run);
  completeNode(args.nodeId);
  const bar = topBar(run, { onDeck: () => cardsModal('Your deck', `${run.deck.length} cards`, run.deck) });
  const say = h('div', { class: 'shop-say' });
  const cards = h('div', { class: 'shop-cards' });
  const trinkets = h('div', { class: 'shop-trinkets' });
  const services = h('div', { class: 'shop-services' });
  root.append(bar.el, h('div', { class: 'shop' },
    h('h2', {}, 'The Pawnbroker'), say,
    h('div', { class: 'counter' }, cards, h('div', { class: 'shop-side' }, trinkets, services)),
    h('button', { class: 'seal-btn dark', onclick: () => go('map') }, 'Leave')));
  void typeInto(say, '"Teeth, only. No names, no promises. Well — no promises."', 24);

  const price = (n: number) => h('div', { class: 'price' }, h('span', { html: icon('tooth') }), String(n));
  const buy = (cost: number, el: HTMLElement, apply: () => void) => {
    if (run.teeth < cost) {
      sfx.error();
      el.animate([{ translate: '0' }, { translate: '-6px' }, { translate: '6px' }, { translate: '0' }], { duration: 220 });
      return false;
    }
    run.teeth -= cost;
    apply();
    sfx.coin();
    const c = center(el);
    burst('bone', c.x, c.y, { n: 20, speed: 4 });
    el.classList.add('sold');
    bar.update();
    persist();
    refresh();
    return true;
  };

  stock.cards.forEach((it) => {
    const el = cardEl({ id: it.id });
    addTilt(el);
    const slot = h('div', { class: 'shop-item' }, el, price(it.price));
    slot.addEventListener('click', () => !it.sold && buy(it.price, slot, () => ((it.sold = true), run.deck.push({ id: it.id, up: false }))));
    cards.append(slot);
  });
  stock.trinkets.forEach((it) => {
    const t = getTrinket(it.id);
    const slot = h('div', { class: 'shop-trinket' }, trinketEl(it.id), h('div', {}, h('b', {}, t.name), h('p', {}, t.text)), price(it.price));
    slot.addEventListener('click', () => !it.sold && buy(it.price, slot, () => ((it.sold = true), run.trinkets.push(it.id))));
    trinkets.append(slot);
  });
  const remove = h('button', { class: 'shop-service' });
  remove.addEventListener('click', () => {
    if (run.teeth < run.removeCost) return void buy(run.removeCost, remove, () => {});
    cardsModal('Pawn a card', `Remove one card from your deck for ${run.removeCost} teeth`, run.deck, (_c, i) => {
      buy(run.removeCost, remove, () => {
        run.deck.splice(i, 1);
        run.removeCost += 25;
      });
      remove.classList.remove('sold');
    });
  });
  services.append(remove);
  const refresh = () => {
    remove.innerHTML = `<b>Pawn a card</b><p>Remove a card from your deck.</p>`;
    remove.append(price(run.removeCost));
  };
  refresh();
  return () => bar.destroy();
}

export function mountRest(root: HTMLElement, args: { nodeId: string }) {
  const run = app.run!;
  completeNode(args.nodeId);
  const bar = topBar(run);
  const heal = Math.round(run.maxHp * 0.3);
  const options = h('div', { class: 'rest-options' });
  const say = h('p', { class: 'rest-say tw' });
  root.append(bar.el, h('div', { class: 'rest' }, h('div', { class: 'rest-candle', html: candleSvg(true) }), h('h2', {}, 'A quiet candle'), say, options));
  void typeInto(say, 'For a moment, nothing is watching you. You could almost sleep.', 26);

  const opt = (title: string, text: string, enabled: boolean, fn: () => void) => {
    const b = h('button', { class: `rest-opt ${enabled ? '' : 'locked'}`, disabled: !enabled }, h('b', {}, title), h('p', {}, text));
    b.addEventListener('click', fn);
    options.append(b);
  };
  const finish = (msg: string) => {
    options.replaceChildren(h('p', { class: 'tw' }, msg), h('button', { class: 'seal-btn', onclick: () => go('map') }, 'Onward'));
    bar.update();
    persist();
  };
  opt('Rest', `Heal ${heal} HP.`, run.hp < run.maxHp, () => {
    run.hp = Math.min(run.maxHp, run.hp + heal);
    sfx.buff();
    const c = center(options);
    burst('gold', c.x, c.y, { n: 40, speed: 4, gravity: -0.05 });
    finish('You close your eyes. The wax keeps time for you.');
  });
  const carvable = run.deck.map((c, i) => ({ c, i })).filter(({ c }) => !c.up && getCard(c.id).rarity !== 'curse');
  opt('Carve', 'Upgrade a card with a knife and patience.', carvable.length > 0, () => {
    cardsModal('Carve a card', 'Hover to see it carved', carvable.map(({ c }) => c), (_c, k) => {
      run.deck[carvable[k].i].up = true;
      sfx.quill();
      finish(`You carve ${getCard(carvable[k].c.id).name} deeper. It remembers the shape.`);
    }, (c) => ({ ...c, up: true }));
  });
  const m = run.jev.mutations[run.jev.mutations.length - 1];
  opt('Snuff a rule', m ? `Burn "${getMutation(m).name}" out of Jev's ledger. Lose 6 max HP.` : "Jev's ledger is empty.", !!m && run.maxHp > 20, () => {
    run.jev.mutations.pop();
    run.maxHp -= 6;
    run.hp = Math.min(run.hp, run.maxHp);
    sfx.snuff();
    flash('#000', 0.6, 600);
    finish(`The candle gutters. Somewhere, a page in Jev's ledger curls and blackens: "${getMutation(m!).name}".`);
  });
  return () => bar.destroy();
}
