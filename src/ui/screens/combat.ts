// The duel. Engine resolves instantly; this screen replays every FxEvent as animation + juice.
import {
  canPlay, costOf, createCombat, drainFx, endJevTurn, endPlayerTurn, peek, peekCost, playCard,
} from '../../game/combat.ts';
import { getCard, intentOf } from '../../game/cards.ts';
import type { CardInst, CombatState, FxEvent, Side, StatusId } from '../../game/types.ts';
import { STATUS_INFO } from '../../game/keywords.ts';
import { combatSetup, nodeById } from '../../game/run.ts';
import { getMutation } from '../../jev/mutations.ts';
import { MASKS } from '../../jev/masks.ts';
import { decideTurn } from '../../jev/brain.ts';
import { react, taunt } from '../../jev/dialogue.ts';
import { absorb, absorbHits, favorite, type Profile } from '../../jev/profile.ts';
import { TRINKETS } from '../../game/trinkets.ts';
import { maskFor } from '../../art/registry.ts';
import { ICON, candleSvg, icon } from '../../art/icons.ts';
import { burst, fadeStains } from '../../fx/particles.ts';
import { chroma, flash, floatText, hitstop, shake, zoomPunch } from '../../fx/juice.ts';
import { sfx, setMuffled, startDrone } from '../../fx/audio.ts';
import { app, go, persist } from '../app.ts';
import { cardEl } from '../cardView.ts';
import { hideKeywords } from '../tooltip.ts';
import { Hand } from '../hand.ts';
import { cardsModal, topBar } from '../hud.ts';
import { anim, center, h, wait } from '../dom.ts';
import { settings } from '../settings.ts';
import { clearRun } from '../../core/store.ts';

const INTENT_ICON = { strike: 'strike', guard: 'guard', curse: 'curseIntent', trick: 'trick' } as const;
const INTENT_TIP = {
  strike: 'Jev means to hurt you.',
  guard: 'Jev means to protect itself.',
  curse: 'Jev means to afflict you.',
  trick: 'Something unusual. Could be anything.',
};

export function mountCombat(root: HTMLElement, args: { nodeId: string }) {
  const run = app.run!;
  const node = nodeById(run, args.nodeId);
  const mask = MASKS[node.mask!];
  const s: CombatState = createCombat(combatSetup(run, node));
  let alive = true;
  // A function, not a comparison, so TypeScript doesn't narrow phase across awaits.
  const over = () => s.phase === 'over';
  let busy = false;
  const said = new Set<string>();
  let heartbeat = 0;
  startDrone();

  // ─────────── DOM ───────────
  const bar = topBar(run, { floor: `${mask.name} · ${mask.numeral}`, onDeck: () => cardsModal('Your deck', `${run.deck.length} cards`, run.deck) });
  const maskWrap = h('div', { class: 'mask-wrap', html: `<svg viewBox="0 0 240 280"><g class="mask-body">${maskFor(mask.id)}</g></svg>` });
  const jevBar = barEl();
  const jevStatuses = h('div', { class: 'statuses' });
  const plate = h('div', { class: 'plate' }, h('div', { class: 'name', html: `${mask.name}<small>${mask.numeral}</small>` }), jevBar.el, jevStatuses);
  plate.dataset.tipTitle = mask.name;
  plate.dataset.tip = mask.quirk;
  const jevHand = h('div', { class: 'jev-hand' });
  const ledger = h('div', { class: 'ledger' });
  const whisper = h('div', { class: 'whisper' }, 'Jev is reading you');
  const jevZone = h('div', { class: 'jev-zone' }, ledger, maskWrap, plate, jevHand, whisper);

  const rune = h('div', { class: 'table-rune', html: `<svg viewBox="0 0 200 200"><g fill="none" stroke="#e3d3b0" stroke-width=".8"><circle cx="100" cy="100" r="96"/><circle cx="100" cy="100" r="70"/><path d="M100 4L183 148H17z"/><path d="M100 196L17 52h166z"/></g></svg>` });
  const playZone = h('div', { class: 'play-zone' });

  const candlesEl = h('div', { class: 'candles' });
  const pBar = barEl();
  const pStatuses = h('div', { class: 'statuses' });
  const sigils = h('div', { class: 'sigils' });
  const hud = h('div', { class: 'player-hud' }, candlesEl, h('div', { class: 'label' }, 'You'), pBar.el, pStatuses, sigils);

  const drawPile = h('div', { class: 'pile draw', 'data-tip': 'Draw pile (order hidden)', onclick: () => cardsModal('Draw pile', 'Shown in no particular order', [...s.player.draw].sort((a, b) => a.id.localeCompare(b.id))) });
  const discardPile = h('div', { class: 'pile discard', 'data-tip': 'Discard pile', onclick: () => cardsModal('Discard pile', `${s.player.discard.length} cards`, s.player.discard) });
  const ashPile = h('div', { class: 'pile ash', 'data-tip': 'Burned to Ash this fight', onclick: () => cardsModal('Ash', 'Gone until the fight ends', s.player.ash) });
  const piles = h('div', { class: 'piles' }, ashPile, discardPile);
  const endBtn = h('button', { class: 'seal-btn end-turn', onclick: () => endTurn() }, 'End Turn', h('span', { class: 'key' }, 'E'));
  const vignette = h('div', { class: 'low-hp-vignette' });

  root.append(bar.el, rune, jevZone, playZone, hud, drawPile, piles, endBtn, vignette);

  const hand = new Hand(root, {
    canPlay: (uid) => (busy ? { ok: false, why: '…' } : canPlay(s, 'player', uid)),
    costOf: (uid) => {
      const c = s.player.hand.find((x) => x.uid === uid);
      return c ? costOf(s, 'player', c) : 0;
    },
    onPlay: (uid, el) => void playerPlay(uid, el),
    onReject: (_uid, why, el) => {
      sfx.error();
      el.animate([{ translate: '0 0' }, { translate: '-8px 0' }, { translate: '8px 0' }, { translate: '0 0' }], { duration: 260 });
      const c = center(el);
      floatText(c.x, c.y - 80, why, 'info');
    },
  });

  // Displayed values lag the engine so bars move in time with the animation.
  const shown = {
    player: { hp: s.player.hp, ward: 0, st: { ...s.player.st } as Record<string, number>, candles: s.player.candles },
    jev: { hp: s.jev.hp, ward: 0, st: { ...s.jev.st } as Record<string, number>, candles: s.jev.candles },
  };

  function barEl() {
    const el = h('div', { class: 'bar', html: `<div class="track"></div><div class="ghost"></div><div class="fill"></div><div class="num"></div><div class="wardb"><svg viewBox="0 0 24 24">${ICON.shield}</svg><span></span></div>` });
    return {
      el,
      set(hp: number, max: number, ward: number) {
        el.style.setProperty('--p', String(Math.max(0, hp) / max));
        el.querySelector('.num')!.textContent = `${Math.max(0, hp)} / ${max}`;
        el.querySelector('.wardb')!.classList.toggle('on', ward > 0);
        el.querySelector('.wardb span')!.textContent = String(ward);
        el.classList.toggle('warded', ward > 0);
      },
    };
  }

  function statusRow(el: HTMLElement, st: Record<string, number>, bumped?: StatusId) {
    el.replaceChildren(
      ...Object.entries(st)
        .filter(([, n]) => n > 0)
        .map(([id, n]) => {
          const info = STATUS_INFO[id as StatusId];
          return h('div', {
            class: `status ${info.good ? 'good' : 'bad'} ${bumped === id ? 'bump' : ''}`,
            'data-tip-title': `${info.name} ${n}`, 'data-tip': info.text,
            html: `${icon(id)}<b>${n}</b>`,
          });
        }),
    );
  }

  function renderCandles() {
    const n = shown.player.candles;
    const max = Math.max(s.player.maxCandles, n);
    candlesEl.innerHTML = Array.from({ length: max }, (_, i) => candleSvg(i < n).replace('class="candle', `class="candle${i >= s.player.maxCandles ? ' extra' : ''}`)).join('') +
      `<span class="candle-count">${n}<small>/${s.player.maxCandles}</small></span>`;
    candlesEl.dataset.tipTitle = 'Candles';
    candlesEl.dataset.tip = 'Candles pay for cards. They relight at the start of each turn.';
  }

  function renderPiles() {
    drawPile.innerHTML = '';
    const back = cardEl({ id: 'strike' }, { faceDown: true });
    drawPile.append(back, h('div', { class: 'n' }, String(s.player.draw.length)), h('div', { class: 'lbl' }, 'draw'));
    const top = s.player.discard[s.player.discard.length - 1];
    discardPile.innerHTML = '';
    discardPile.append(top ? cardEl(top) : h('div', { class: 'discard-empty' }), h('div', { class: 'n' }, String(s.player.discard.length)), h('div', { class: 'lbl' }, 'discard'));
    ashPile.innerHTML = `<div class="urn">${icon('urn')}</div><div class="n">${s.player.ash.length}</div><div class="lbl">ash</div>`;
  }

  function renderLedger() {
    ledger.replaceChildren(
      h('h5', {}, "Jev's ledger"),
      ...s.jev.mutations.map((id) => {
        const m = getMutation(id);
        return h('div', { class: 'rule', 'data-rule': id, 'data-tip-title': m.name, 'data-tip': m.text, html: `<span class="dot"></span>${m.name}` });
      }),
    );
    if (!s.jev.mutations.length) ledger.append(h('div', { class: 'rule', style: { opacity: '.5' }, 'data-tip': 'Jev writes a new rule after every fight, chosen to punish how you play.' }, 'nothing… yet'));
  }

  function renderJevHand() {
    jevHand.replaceChildren(
      ...s.jev.hand.map((c, i) => {
        const def = getCard(c.id);
        const real = intentOf(def);
        const lying = s.jev.lies.includes(c.uid) && !s.jev.peeked.includes(c.uid);
        const order = ['strike', 'guard', 'curse', 'trick'] as const;
        const shownIntent = lying ? order[(order.indexOf(real) + 1 + (c.uid % 3)) % 4] : real;
        const peeked = s.jev.peeked.includes(c.uid);
        const slot = h('div', {
          class: `slot ${peeked ? 'peeked' : ''} ${lying ? 'lying' : ''}`, 'data-uid': c.uid,
          style: { transform: `rotate(${(i - (s.jev.hand.length - 1) / 2) * 6}deg) translateY(${Math.abs(i - (s.jev.hand.length - 1) / 2) * 5}px)` },
        });
        slot.append(cardEl(c, { faceDown: !peeked }));
        slot.append(h('div', { class: `intent ${shownIntent}`, 'data-tip-title': shownIntent[0].toUpperCase() + shownIntent.slice(1), 'data-tip': INTENT_TIP[shownIntent], html: icon(INTENT_ICON[shownIntent]) }));
        if (!peeked) slot.append(h('div', { class: 'peek-hint' }, peekCost(s) ? 'peek · 1 candle' : 'peek · free'));
        slot.addEventListener('click', () => doPeek(c.uid));
        return slot;
      }),
    );
  }

  function renderMaskDamage() {
    const f = shown.jev.hp / s.jev.maxHp;
    maskWrap.classList.toggle('crack1', f < 0.75);
    maskWrap.classList.toggle('crack2', f < 0.5);
    maskWrap.classList.toggle('crack3', f < 0.25);
  }

  function renderAll() {
    jevBar.set(shown.jev.hp, s.jev.maxHp, shown.jev.ward);
    pBar.set(shown.player.hp, s.player.maxHp, shown.player.ward);
    statusRow(jevStatuses, shown.jev.st);
    statusRow(pStatuses, shown.player.st);
    renderCandles();
    renderPiles();
    renderLedger();
    renderJevHand();
    renderMaskDamage();
    sigils.replaceChildren(...s.player.sigils.map((sg) => h('div', { class: 'sigil', 'data-tip-title': getCard(sg.id).name, 'data-tip': (sg.rev ? getCard(sg.id).revText(sg.up) : getCard(sg.id).text(sg.up)).replace(/<[^>]+>/g, '') }, getCard(sg.id).name)));
    const low = shown.player.hp / s.player.maxHp < 0.3;
    vignette.classList.toggle('on', low && settings.juice > 0);
    setMuffled(low);
    if (low && !heartbeat && alive) heartbeat = window.setInterval(() => sfx.heart(), 1100);
    if (!low && heartbeat) {
      clearInterval(heartbeat);
      heartbeat = 0;
    }
    endBtn.classList.toggle('nudge', s.phase === 'player' && !s.player.hand.some((c) => canPlay(s, 'player', c.uid).ok));
    (endBtn as HTMLButtonElement).disabled = s.phase !== 'player' || busy;
    hand.layout();
  }

  function syncShown() {
    for (const side of ['player', 'jev'] as Side[]) {
      const f = side === 'player' ? s.player : s.jev;
      shown[side].hp = f.hp;
      shown[side].ward = f.ward;
      shown[side].st = { ...f.st } as Record<string, number>;
      shown[side].candles = f.candles;
    }
  }

  // ─────────── speech ───────────
  let speechEl: HTMLElement | null = null;
  async function say(text: string | null, src?: string) {
    if (!text || !alive) return;
    speechEl?.remove();
    const el = h('div', { class: 'speech' }, text, src ? h('span', { class: 'src' }, src) : null);
    speechEl = el;
    jevZone.append(el);
    maskWrap.classList.add('talking');
    setTimeout(() => maskWrap.classList.remove('talking'), Math.min(2200, 60 * text.length));
    setTimeout(() => {
      if (speechEl !== el) return;
      el.classList.add('out');
      setTimeout(() => el.remove(), 260);
    }, 1800 + 45 * text.length);
  }

  function reactOnce(key: Parameters<typeof react>[1], chance = 1) {
    if (said.has(key) || Math.random() > chance) return;
    said.add(key);
    void say(react(s.rng, key));
  }

  // ─────────── positions ───────────
  const targetPos = (side: Side) => {
    if (side === 'jev') {
      const r = maskWrap.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height * 0.45 };
    }
    const r = pBar.el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top };
  };
  const tableCenter = () => ({ x: innerWidth / 2, y: innerHeight * 0.58 });

  // ─────────── FX playback ───────────
  let floating: HTMLElement | null = null; // the card currently on the table
  const J = () => Math.max(0.15, settings.juice);

  async function playFx(events: FxEvent[]) {
    const draws: CardInst[] = [];
    const flushDraws = async () => {
      if (!draws.length) return;
      const from = center(drawPile);
      hand.sync(s.player.hand, from);
      for (let i = 0; i < draws.length; i++) {
        sfx.draw();
        await wait(55);
      }
      draws.length = 0;
      renderPiles();
    };
    for (const e of events) {
      if (!alive) return;
      if (e.t !== 'draw' || e.side !== 'player') await flushDraws();
      await handle(e, draws);
    }
    await flushDraws();
    syncShown();
    renderAll();
  }

  async function handle(e: FxEvent, draws: CardInst[]) {
    switch (e.t) {
      case 'turn': {
        await banner(e.side === 'player' ? 'Your Turn' : "Jev's Turn", e.side);
        fadeStains();
        return;
      }
      case 'draw':
        if (e.side === 'player') draws.push(e.card);
        else {
          renderJevHand();
          sfx.draw();
          await wait(70);
        }
        return;
      case 'dmg': {
        const p = targetPos(e.to);
        shown[e.to].hp = e.hp;
        shown[e.to].ward = e.ward;
        const big = e.amount >= 10 || e.crit;
        if (e.amount > 0) {
          sfx.hit(big);
          if (e.to === 'jev') {
            maskWrap.classList.remove('hurt');
            void maskWrap.offsetWidth;
            maskWrap.classList.add('hurt');
          } else flash('#b3261e', 0.25 + Math.min(0.35, e.amount / 40));
          burst('ink', p.x, p.y, { n: 10 + e.amount * 2, speed: 5 + e.amount * 0.3, size: 3, stain: true });
          burst('blood', p.x, p.y, { n: 6 + e.amount, speed: 4 + e.amount * 0.2, size: 2.6, stain: true });
          shake(Math.min(0.9, 0.18 + e.amount / 28));
          floatText(p.x, p.y, String(e.amount), e.crit ? 'crit' : 'dmg');
        } else if (e.blocked > 0) {
          sfx.ward();
          floatText(p.x, p.y, `${e.blocked}`, 'ward');
          burst('bone', p.x, p.y, { n: 8, speed: 3 });
          shake(0.12);
        }
        if (e.crit) {
          sfx.crit();
          burst('gold', p.x, p.y, { n: 40, speed: 9, size: 3 });
          zoomPunch(1.05);
          chroma(260);
          flash('#ecc978', 0.3);
        }
        if (e.pierce && e.amount > 0) burst('spark', p.x, p.y, { n: 12, speed: 8, angle: e.to === 'jev' ? -Math.PI / 2 : Math.PI / 2, spread: 0.6 });
        renderBars();
        if (big) await hitstop(e.crit ? 140 : 80);
        await wait(e.amount > 0 ? 160 : 120);
        return;
      }
      case 'wardBreak': {
        const p = targetPos(e.to);
        sfx.shatter();
        burst('shard', p.x - 60, p.y, { n: 18, speed: 6, size: 5 });
        return;
      }
      case 'ward': {
        const p = targetPos(e.to);
        shown[e.to].ward = e.ward;
        sfx.ward();
        floatText(p.x - 50, p.y, `+${e.amount}`, 'ward');
        burst('bone', p.x - 50, p.y, { n: 8, speed: 2.5, gravity: -0.03 });
        renderBars();
        await wait(120);
        return;
      }
      case 'heal': {
        const p = targetPos(e.to);
        shown[e.to].hp = e.hp;
        floatText(p.x, p.y, `+${e.amount}`, 'heal');
        burst('gold', p.x, p.y, { n: 14, speed: 2, gravity: -0.05 });
        sfx.buff();
        renderBars();
        await wait(140);
        return;
      }
      case 'lose': {
        const p = targetPos(e.to);
        shown[e.to].hp = e.hp;
        if (e.kind === 'bleed') sfx.bleed();
        else sfx.hit(false);
        burst('blood', p.x, p.y - 10, { n: 8 + e.amount, speed: 2.5, angle: Math.PI / 2, spread: 1.4, stain: true });
        floatText(p.x + 30, p.y, `-${e.amount}`, 'bleed');
        if (e.to === 'player') flash('#8a1c17', 0.15);
        else {
          maskWrap.classList.remove('hurt');
          void maskWrap.offsetWidth;
          maskWrap.classList.add('hurt');
        }
        shake(0.12 + e.amount / 60);
        renderBars();
        await wait(150);
        return;
      }
      case 'status': {
        shown[e.to].st = { ...shown[e.to].st, [e.s]: e.total };
        statusRow(e.to === 'player' ? pStatuses : jevStatuses, shown[e.to].st, e.n > 0 ? e.s : undefined);
        if (e.n > 0) {
          const p = targetPos(e.to);
          const info = STATUS_INFO[e.s];
          floatText(p.x, p.y + 40, `+${e.n} ${info.name}`, 'status');
          if (info.good) {
            sfx.buff();
            burst('gold', p.x, p.y + 30, { n: 10, speed: 2.5, gravity: -0.04 });
          } else {
            sfx.curse();
            burst(e.s === 'bleed' ? 'blood' : 'violet', p.x, p.y + 30, { n: 14, speed: 3 });
          }
          await wait(120);
        }
        return;
      }
      case 'candle': {
        shown[e.side].candles = e.candles;
        if (e.side === 'player') {
          renderCandles();
          if (e.n > 0) {
            sfx.candle();
            const c = center(candlesEl);
            burst('ember', c.x, c.y - 20, { n: 16, speed: 2 });
            floatText(c.x, c.y - 40, `+${e.n}`, 'candle');
          } else if (e.n < 0) sfx.snuff();
        }
        return;
      }
      case 'roll':
        await rollDice(e.faces, e.result, e.label);
        return;
      case 'trigger': {
        const p = targetPos(e.side);
        floatText(p.x + (e.side === 'jev' ? 120 : 60), p.y + (e.side === 'jev' ? -20 : -50), e.name, 'info');
        const t = TRINKETS.find((x) => x.name === e.name);
        if (t) bar.el.querySelector(`[data-trinket="${t.id}"]`)?.classList.add('pulse');
        const rule = ledger.querySelector(`[data-rule]`) && [...ledger.querySelectorAll<HTMLElement>('[data-rule]')].find((r) => getMutation(r.dataset.rule!).name === e.name);
        if (rule) {
          rule.classList.remove('flash');
          void rule.offsetWidth;
          rule.classList.add('flash');
        }
        if (e.name === 'Lightning') {
          flash('#fff6d8', 0.6, 400);
          shake(0.7);
          sfx.bell();
        }
        await wait(220);
        return;
      }
      case 'sigil': {
        sfx.bell();
        const p = targetPos('player');
        burst('gold', p.x, p.y - 40, { n: 30, speed: 5 });
        floatText(p.x, p.y - 60, getCard(e.id).name, 'info');
        if (floating) {
          await anim(floating, [{ opacity: 1 }, { opacity: 0, transform: `${floating.style.transform} scale(.2)` }], { duration: 400 });
          floating.remove();
          floating = null;
        }
        return;
      }
      case 'addCard': {
        const p = e.side === 'player' ? center(drawPile) : targetPos('jev');
        floatText(p.x, p.y - 80, `+ ${getCard(e.card.id).name}`, 'status');
        sfx.curse();
        burst('violet', p.x, p.y - 40, { n: 16, speed: 3 });
        await wait(200);
        return;
      }
      case 'shuffle': {
        if (e.side !== 'player') return;
        sfx.shuffle();
        const from = center(discardPile);
        const to = center(drawPile);
        for (let i = 0; i < 6; i++) {
          const b = cardEl({ id: 'strike' }, { faceDown: true, width: 56 });
          b.style.position = 'fixed';
          b.style.left = `${from.x - 28}px`;
          b.style.top = `${from.y - 45}px`;
          b.style.zIndex = '65';
          document.body.append(b);
          void anim(b, [{ transform: 'none' }, { transform: `translate(${to.x - from.x}px, ${to.y - from.y}px) rotate(${-200 - i * 30}deg)` }], { duration: 380, delay: i * 40, easing: 'cubic-bezier(.5,0,.3,1)' }).then(() => b.remove());
        }
        await wait(420);
        renderPiles();
        return;
      }
      case 'discard': {
        if (e.side === 'player') await sendAway(e.card.uid, discardPile);
        else if (floating && floating.dataset.uid === String(e.card.uid)) await sendAwayFloating(targetPos('jev'), true);
        else renderJevHand();
        return;
      }
      case 'ashed': {
        await burnFloating();
        renderPiles();
        return;
      }
      case 'phase': {
        sfx.death();
        maskWrap.classList.add('phase2');
        flash('#ffffff', 0.8, 700);
        shake(1);
        await banner('No more masks', 'jev');
        return;
      }
      case 'death': {
        const p = targetPos(e.side);
        sfx.death();
        shake(1);
        burst('ink', p.x, p.y, { n: 120, speed: 12, size: 4, stain: true });
        burst('bone', p.x, p.y, { n: 50, speed: 9, size: 3 });
        if (e.side === 'jev') {
          maskWrap.animate([{ opacity: 1, filter: 'none' }, { opacity: 0, filter: 'blur(6px) brightness(3)', transform: 'translateX(-50%) scale(1.3)' }], { duration: 1200, fill: 'forwards' });
        } else {
          document.getElementById('stage')!.animate([{ filter: 'none' }, { filter: 'grayscale(1) brightness(.5)' }], { duration: 1500, fill: 'forwards' });
        }
        await hitstop(300);
        await wait(700);
        return;
      }
      case 'play':
        return; // animated by the caller
    }
  }

  function renderBars() {
    jevBar.set(shown.jev.hp, s.jev.maxHp, shown.jev.ward);
    pBar.set(shown.player.hp, s.player.maxHp, shown.player.ward);
    renderMaskDamage();
  }

  async function banner(text: string, side: Side) {
    const el = h('div', { class: `turn-banner ${side}` }, text);
    root.append(el);
    await anim(el, [
      { opacity: 0, transform: 'scaleX(1.6)', letterSpacing: '.5em' },
      { opacity: 1, transform: 'scaleX(1)', letterSpacing: '.05em', offset: 0.3 },
      { opacity: 1, offset: 0.7 },
      { opacity: 0, transform: 'translateY(-20px)' },
    ], { duration: 900 * Math.max(0.6, J()), easing: 'ease-out' });
    el.remove();
  }

  async function rollDice(faces: number, result: number, label: string) {
    const c = tableCenter();
    const d = h('div', { class: 'dice' }, '?', h('small', {}, `${label} · d${faces}`));
    d.style.left = `${c.x + 150}px`;
    d.style.top = `${c.y - 32}px`;
    root.append(d);
    sfx.dice();
    const txt = d.firstChild as Text;
    const t0 = performance.now();
    await new Promise<void>((ok) => {
      const spin = () => {
        const k = (performance.now() - t0) / 650;
        if (k >= 1) return ok();
        txt.textContent = String(1 + Math.floor(Math.random() * faces));
        d.style.transform = `rotate(${k * 720}deg) scale(${1 + Math.sin(k * Math.PI) * 0.4})`;
        requestAnimationFrame(spin);
      };
      spin();
    });
    txt.textContent = String(result);
    d.style.transform = 'rotate(0) scale(1.25)';
    const high = result === faces;
    burst(high ? 'gold' : 'dust', c.x + 182, c.y, { n: high ? 30 : 12, speed: 4 });
    if (high) sfx.crit();
    await wait(480);
    void anim(d, [{ opacity: 1 }, { opacity: 0, transform: 'scale(.6)' }], { duration: 300 }).then(() => d.remove());
  }

  /** Move a card element to the table centre and keep it there as `floating`. */
  async function toTable(el: HTMLElement, fromRect: DOMRect, faceDownFirst = false) {
    const c = tableCenter();
    const cw = Math.round(Math.min(250, Math.max(160, innerHeight * 0.18)));
    const card = el;
    card.style.position = 'fixed';
    card.style.left = `${c.x - cw / 2}px`;
    card.style.top = `${c.y - cw * 0.8}px`;
    card.style.setProperty('--cw', `${cw}px`);
    card.style.zIndex = '58';
    card.classList.add('played');
    document.body.append(card);
    const dx = fromRect.left + fromRect.width / 2 - c.x;
    const dy = fromRect.top + fromRect.height / 2 - c.y;
    const sc = fromRect.width / cw;
    floating = card;
    sfx.play();
    await anim(card, [
      { transform: `translate(${dx}px, ${dy}px) scale(${sc}) rotate(${faceDownFirst ? 8 : -4}deg)` },
      { transform: 'translate(0, -20px) scale(1.08) rotate(0deg)', offset: 0.7 },
      { transform: 'translate(0,0) scale(1) rotate(0deg)' },
    ], { duration: 320 * Math.max(0.7, J()), easing: 'cubic-bezier(.2,.8,.3,1)' });
    if (faceDownFirst) {
      card.classList.remove('face-down');
      await wait(220);
    }
    const p = center(card);
    burst('dust', p.x, p.y + 120, { n: 14, speed: 3, angle: 0, spread: Math.PI * 2, gravity: 0.02 });
    shake(0.08);
  }

  async function sendAway(uid: number, pile: HTMLElement) {
    hideKeywords();
    if (floating && floating.dataset.uid === String(uid)) return sendAwayFloating(center(pile));
    const el = hand.els.get(uid);
    if (!el) return;
    hand.els.delete(uid);
    const r = el.getBoundingClientRect();
    const to = center(pile);
    el.style.position = 'fixed';
    el.style.left = `${r.left}px`;
    el.style.top = `${r.top}px`;
    el.style.transform = 'none';
    el.style.transition = 'none';
    document.body.append(el);
    void anim(el, [{ transform: 'none', opacity: 1 }, { transform: `translate(${to.x - r.left - r.width / 2}px, ${to.y - r.top - r.height / 2}px) scale(.35) rotate(40deg)`, opacity: 0.2 }], { duration: 300, easing: 'cubic-bezier(.5,0,.8,.4)' }).then(() => el.remove());
    sfx.whoosh();
    await wait(45);
  }

  async function sendAwayFloating(to: { x: number; y: number }, up = false) {
    const el = floating!;
    floating = null;
    const c = center(el);
    await anim(el, [{ transform: 'none', opacity: 1 }, { transform: `translate(${to.x - c.x}px, ${to.y - c.y}px) scale(${up ? 0.4 : 0.36}) rotate(${up ? -30 : 30}deg)`, opacity: 0 }], { duration: 280, easing: 'cubic-bezier(.5,0,.8,.4)' });
    el.remove();
    renderPiles();
  }

  async function burnFloating() {
    const el = floating;
    floating = null;
    if (!el) return;
    sfx.burn();
    const r = el.getBoundingClientRect();
    const steps = 14;
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        const y = r.bottom - (r.height * i) / steps;
        burst('ember', r.left + Math.random() * r.width, y, { n: 6, speed: 2.5, size: 2.4 });
        burst('smoke', r.left + Math.random() * r.width, y, { n: 2, speed: 1, size: 8 });
      }, i * 45);
    }
    await anim(el, [
      { clipPath: 'inset(0 0 0 0)', filter: 'none', transform: 'none' },
      { clipPath: 'inset(0 0 40% 0)', filter: 'sepia(1) brightness(.7) contrast(1.4)', transform: 'translateY(-6px)', offset: 0.5 },
      { clipPath: 'inset(0 0 100% 0)', filter: 'sepia(1) brightness(.2)', transform: 'translateY(-14px)' },
    ], { duration: 700, easing: 'ease-in' });
    el.remove();
  }

  // ─────────── player actions ───────────
  async function playerPlay(uid: number, el: HTMLElement) {
    if (busy || s.phase !== 'player') return;
    busy = true;
    hand.locked = true;
    const c = s.player.hand.find((x) => x.uid === uid)!;
    const rect = el.getBoundingClientRect();
    hand.els.delete(uid);
    el.style.transition = 'none';
    el.style.transform = 'none';
    el.classList.remove('lifted', 'selected', 'playable-glow');
    await toTable(el, rect);
    if (c.rev) reactOnce('firstReversed', 0.7);
    playCard(s, 'player', uid);
    await playFx(drainFx(s));
    hand.sync(s.player.hand);
    busy = false;
    hand.locked = false;
    renderAll();
    if (over()) return finish();
    if (shown.jev.hp / s.jev.maxHp < 0.3) reactOnce('jevLow');
  }

  async function doPeek(uid: number) {
    if (busy || s.phase !== 'player') return;
    if (s.jev.peeked.includes(uid)) return;
    if (!peek(s, uid)) {
      sfx.error();
      floatText(innerWidth / 2 + 200, 140, 'Not enough candles', 'info');
      return;
    }
    sfx.page();
    shown.player.candles = s.player.candles;
    renderCandles();
    renderJevHand();
    reactOnce('peek', 0.6);
    hand.layout();
  }

  function liveProfile(): Profile {
    const p: Profile = structuredClone(run.profile);
    absorb(p, s);
    absorbHits(p, s);
    return p;
  }

  async function endTurn() {
    if (busy || s.phase !== 'player') return;
    busy = true;
    hand.locked = true;
    hand.select(null);
    renderAll();
    const dealt = s.player.dmgThisTurn;
    endPlayerTurn(s);
    await playFx(drainFx(s));
    if (dealt >= 15) reactOnce('bigHit');
    if (over()) return finish();
    await jevTurn();
  }

  async function jevTurn() {
    maskWrap.classList.add('thinking');
    whisper.classList.add('on');
    sfx.thinking();
    const minThink = wait(650);
    const d = await decideTurn(s, { profile: liveProfile(), grudge: app.memory.grudge });
    await minThink;
    if (!alive) return;
    maskWrap.classList.remove('thinking');
    whisper.classList.remove('on');
    const src = d.source === 'jev' ? `Jev · ${Math.round((d.confidence ?? 0) * 100)}% sure` : d.source === 'lethal' ? 'Jev smells blood' : 'instinct';
    const line = d.taunt === 'recall' && app.memory.lastDeath ? `${taunt(s.rng, 'recall')}` : taunt(s.rng, d.taunt);
    void say(line ?? '…', src);

    for (const uid of d.plan.uids) {
      if (!alive || over()) break;
      if (!canPlay(s, 'jev', uid).ok) continue;
      await jevPlay(uid);
    }
    if (over()) return finish();
    await wait(200);
    endJevTurn(s);
    await playFx(drainFx(s));
    if (over()) return finish();
    busy = false;
    hand.locked = false;
    renderAll();
    if (shown.player.hp / s.player.maxHp < 0.3) reactOnce('playerLow');
  }

  async function jevPlay(uid: number) {
    const slot = jevHand.querySelector<HTMLElement>(`.slot[data-uid="${uid}"]`);
    const c = s.jev.hand.find((x) => x.uid === uid)!;
    const rect = slot?.getBoundingClientRect() ?? new DOMRect(innerWidth / 2, 100, 80, 128);
    const peeked = s.jev.peeked.includes(uid);
    slot?.remove();
    const el = cardEl(c, { faceDown: !peeked });
    el.dataset.uid = String(uid);
    maskWrap.classList.remove('attack');
    void maskWrap.offsetWidth;
    if (intentOf(getCard(c.id)) === 'strike') maskWrap.classList.add('attack');
    await toTable(el, rect, !peeked);
    await wait(260);
    playCard(s, 'jev', uid);
    await playFx(drainFx(s));
    await wait(120);
  }

  async function finish() {
    if (!alive) return;
    busy = true;
    hand.locked = true;
    await wait(500);
    absorb(run.profile, s);
    absorbHits(run.profile, s);
    run.profile.fights++;
    if (s.winner === 'player') {
      sfx.victory();
      void say(react(s.rng, 'playerWins'));
      run.hp = s.player.hp;
      if (run.trinkets.includes('rosary')) run.hp = Math.min(run.maxHp, run.hp + 5);
      run.fightsWon++;
      run.at = node.id;
      run.visited.push(node.id);
      await wait(1400);
      if (mask.kind === 'boss') {
        run.over = 'won';
        app.memory.wins++;
        app.memory.grudge = Math.max(0, app.memory.grudge - 1);
        app.memory.runs++;
        app.memory.ghostCard = undefined;
        clearRun();
        persist();
        go('end', { won: true });
      } else {
        persist();
        go('reward', { nodeId: node.id, elite: mask.kind === 'elite' });
      }
    } else {
      void say(react(s.rng, 'jevWins'));
      run.over = 'lost';
      app.memory.deaths++;
      app.memory.runs++;
      app.memory.grudge++;
      app.memory.lastDeath = mask.name;
      app.memory.ghostCard = favorite(run.profile);
      clearRun();
      persist();
      await wait(1800);
      go('end', { won: false, mask: mask.name });
    }
  }

  // ─────────── keys ───────────
  const onKey = (e: KeyboardEvent) => {
    if (document.querySelector('.modal')) return;
    if (e.key === 'e' || e.key === 'E') return void endTurn();
    const n = Number(e.key);
    if (n >= 1 && n <= 9) {
      const c = s.player.hand[n - 1];
      if (c) hand.select(hand.selected === c.uid ? null : c.uid);
    }
    if (e.key === 'Enter' && hand.selected !== null) hand.tryPlay(hand.selected);
    if (e.key === 'Escape') hand.select(null);
  };
  addEventListener('keydown', onKey);

  // ─────────── start ───────────
  syncShown();
  shown.player.candles = 0;
  renderAll();
  (async () => {
    await wait(300);
    const intro = mask.intro;
    void say(intro[0]);
    const events = drainFx(s);
    // Show the opening deal with everything else already in place.
    await playFx(events);
    hand.sync(s.player.hand, center(drawPile));
    renderAll();
    if (intro[1]) setTimeout(() => void say(intro[1]), 2600);
  })();

  return () => {
    alive = false;
    removeEventListener('keydown', onKey);
    hand.destroy();
    bar.destroy();
    floating?.remove();
    speechEl?.remove();
    setMuffled(false);
    clearInterval(heartbeat);
    document.querySelectorAll('body > .card.played').forEach((c) => c.remove());
    document.getElementById('stage')!.getAnimations().forEach((a) => a.cancel());
  };
}
