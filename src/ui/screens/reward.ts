// Spoils: teeth, maybe a trinket, and three cards dealt face-down.
import { getCard } from '../../game/cards.ts';
import { rollCardChoices, rollTrinket, teethReward } from '../../game/run.ts';
import { getTrinket } from '../../game/trinkets.ts';
import { sfx } from '../../fx/audio.ts';
import { burst } from '../../fx/particles.ts';
import { flash, shake } from '../../fx/juice.ts';
import { app, go, persist } from '../app.ts';
import { addTilt, cardEl } from '../cardView.ts';
import { anim, center, countTo, h, wait } from '../dom.ts';
import { topBar, trinketEl } from '../hud.ts';
import { showKeywords, hideKeywords } from '../tooltip.ts';

export function mountReward(root: HTMLElement, args: { nodeId: string; elite: boolean }) {
  const run = app.run!;
  const bar = topBar(run);
  const teeth = teethReward(run, args.elite);
  const trinket = args.elite ? rollTrinket(run) : undefined;
  const choices = rollCardChoices(run, 3, args.elite);
  const before = run.teeth;
  run.teeth += teeth;
  if (trinket) run.trinkets.push(trinket);
  persist();

  const teethNum = h('span', {}, String(before));
  const row = h('div', { class: 'reward-cards' });
  const skip = h('button', { class: 'ink-btn', onclick: () => done() }, 'Leave them on the table');
  root.append(bar.el, h('div', { class: 'reward' },
    h('h2', {}, 'The table yields'),
    h('div', { class: 'spoils sc' }, h('span', { html: '+' }), teethNum, ' teeth'),
    trinket ? h('div', { class: 'spoil-trinket' }, trinketEl(trinket), h('div', {}, h('b', {}, getTrinket(trinket).name), h('p', {}, getTrinket(trinket).text))) : null,
    h('p', { class: 'hint sc' }, 'Take one card into your deck'),
    row, skip));

  (async () => {
    await wait(300);
    sfx.coin();
    countTo(teethNum, 0, teeth, 700);
    const c = center(teethNum);
    burst('bone', c.x, c.y, { n: 20, speed: 4 });
    bar.update();
    await wait(400);
    for (const id of choices) {
      const slot = h('div', { class: 'reward-slot' });
      const el = cardEl({ id }, { faceDown: true });
      slot.append(el);
      row.append(slot);
      sfx.draw();
      await anim(slot, [{ transform: 'translateY(-60vh) rotate(-40deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.9,.3,1.1)' });
    }
    await wait(250);
    for (const slot of row.children) {
      const el = slot.firstElementChild as HTMLElement;
      const def = getCard(el.dataset.id!);
      el.classList.remove('face-down');
      sfx.page();
      if (def.rarity === 'rare') {
        await wait(200);
        const p = center(el);
        burst('gold', p.x, p.y, { n: 60, speed: 8 });
        flash('#ecc978', 0.3);
        shake(0.3);
        sfx.crit();
      } else if (def.rarity === 'uncommon') {
        const p = center(el);
        burst('spark', p.x, p.y, { n: 18, speed: 4 });
      }
      await wait(260);
      addTilt(el);
      el.addEventListener('pointerenter', () => showKeywords({ id: def.id }, el));
      el.addEventListener('pointerleave', hideKeywords);
      el.addEventListener('click', () => take(def.id, slot as HTMLElement));
    }
  })();

  let taken = false;
  function take(id: string, slot: HTMLElement) {
    if (taken) return;
    taken = true;
    hideKeywords();
    run.deck.push({ id, up: false });
    sfx.whoosh();
    const p = center(slot);
    burst('ink', p.x, p.y, { n: 30, speed: 5 });
    for (const other of row.children) if (other !== slot) (other as HTMLElement).animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(40px)' }], { duration: 300, fill: 'forwards' });
    slot.animate([{ transform: 'none' }, { transform: 'translateY(60vh) scale(.4) rotate(20deg)', opacity: 0 }], { duration: 520, delay: 200, easing: 'cubic-bezier(.6,0,.8,.3)', fill: 'forwards' });
    setTimeout(done, 750);
  }

  function done() {
    hideKeywords();
    persist();
    go('evolve', { nodeId: args.nodeId });
  }
  return () => bar.destroy();
}
