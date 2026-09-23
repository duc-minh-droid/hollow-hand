// Combat flow: turns, playing cards, Jev's turn. Pure and seeded; the UI replays `s.fx`.
import { makeRng, next, shuffle, pick } from '../core/rng.ts';
import { getCard, isAsh, tollOf } from './cards.ts';
import {
  F, applyStatus, dealDamage, drawCards, fx, gainWard, hasM, hasT, isOver, loseHp, makeInst,
  other, st, trigger, gainCandles,
} from './ops.ts';
import type { CardInst, CombatState, Fighter, JevFighter, Side } from './types.ts';
import { MASKS } from '../jev/masks.ts';

export interface DeckCard {
  id: string;
  up: boolean;
}

export interface CombatSetup {
  seed: number;
  player: { hp: number; maxHp: number; deck: DeckCard[] };
  trinkets: string[];
  mask: string;
  mutations: string[];
  stolen: string[]; // player cards Jev has copied
  jevHpBonus?: number;
}

const emptyFighter = (hp: number, maxHp: number, candles: number): Fighter => ({
  hp, maxHp, ward: 0, st: {}, sigils: [], candles, maxCandles: candles,
  draw: [], hand: [], discard: [], ash: [], cardsThisTurn: 0, dmgThisTurn: 0,
  wardThisTurn: 0, turnCards: [], turnRevs: 0,
});

export function createCombat(setup: CombatSetup): CombatState {
  const mask = MASKS[setup.mask];
  const hp = mask.hp + (setup.jevHpBonus ?? 0);
  const jev: JevFighter = {
    ...emptyFighter(hp, hp, mask.candles),
    mask: mask.id, handSize: mask.handSize, mutations: setup.mutations.slice(),
    peeked: [], phase: 1, lies: [],
  };
  const s: CombatState = {
    turn: 0, phase: 'player', player: emptyFighter(setup.player.hp, setup.player.maxHp, 3), jev,
    rng: makeRng(setup.seed), nextUid: 1, trinkets: setup.trinkets.slice(), flags: {}, fx: [], sim: false,
    revChance: 0.2 + (setup.trinkets.includes('hourglass') ? 0.1 : 0) + (setup.trinkets.includes('rabbitfoot') ? 0.15 : 0),
    log: [], jevStolen: [],
  };
  s.player.draw = shuffle(s.rng, setup.player.deck.map((d) => makeInst(s, d.id, d.up)));
  const jevDeck = mask.deck.slice();
  // The boss keeps stolen tricks up its sleeve until phase two; masks use them right away.
  if (mask.kind !== 'boss') jevDeck.push(...setup.stolen);
  s.jev.draw = shuffle(s.rng, jevDeck.map((id) => makeInst(s, id)));
  s.flags.stolenHeld = mask.kind === 'boss' ? 1 : 0;
  s.jevStolen = setup.stolen.slice();

  if (mask.id === 'devil' || hasM(s, 'briarskin')) jev.st.thorns = 2;
  if (hasT(s, 'ravenskull')) s.player.st.omen = 1;
  if (hasT(s, 'stolenledger')) jev.st.dread = 1;
  startPlayerTurn(s);
  return s;
}

function resetTurn(f: Fighter) {
  f.cardsThisTurn = 0;
  f.dmgThisTurn = 0;
  f.wardThisTurn = 0;
  f.turnCards = [];
  f.turnRevs = 0;
  f.lastPlayed = undefined;
}

function tickBleed(s: CombatState, side: Side) {
  const f = F(s, side);
  const b = f.st.bleed ?? 0;
  if (b <= 0) return;
  loseHp(s, side, b, 'bleed');
  const nextB = side === 'jev' && hasM(s, 'saltblood') ? Math.floor(b / 2) : b - 1;
  f.st.bleed = nextB;
  fx(s, { t: 'status', to: side, s: 'bleed', n: nextB - b, total: nextB });
}

function decay(s: CombatState, side: Side) {
  const f = F(s, side);
  for (const id of ['hex', 'frail'] as const) {
    if ((f.st[id] ?? 0) > 0) {
      f.st[id]! -= 1;
      fx(s, { t: 'status', to: side, s: id, n: -1, total: f.st[id]! });
    }
  }
}

function keepThorns(s: CombatState, side: Side) {
  const f = F(s, side);
  const floor = side === 'jev' && (s.jev.mask === 'devil' || hasM(s, 'briarskin')) ? 2 : 0;
  if ((f.st.thorns ?? 0) !== floor) {
    f.st.thorns = floor;
    fx(s, { t: 'status', to: side, s: 'thorns', n: 0, total: floor });
  }
}

export function startPlayerTurn(s: CombatState) {
  if (isOver(s)) return;
  s.turn++;
  s.phase = 'player';
  const p = s.player;
  fx(s, { t: 'turn', side: 'player', n: s.turn });
  p.ward = 0;
  keepThorns(s, 'player');
  resetTurn(p);
  s.flags.inkUsed = 0;
  s.flags.peekFree = hasT(s, 'lantern') ? 1 : 0;
  s.flags.jevHpAtTurn = s.jev.hp;

  tickBleed(s, 'player');
  if (isOver(s)) return;

  let candles = p.maxCandles;
  for (const sg of p.sigils) {
    if (sg.id !== 'sun') continue;
    candles += sg.rev ? 2 : 1;
    if (sg.rev) loseHp(s, 'player', 2, 'self');
  }
  if (isOver(s)) return;
  candles += s.flags.hangedC_player ?? 0;
  const dread = p.st.dread ?? 0;
  if (dread > 0) {
    candles -= dread;
    p.st.dread = 0;
    fx(s, { t: 'status', to: 'player', s: 'dread', n: -dread, total: 0 });
  }
  p.candles = Math.max(0, candles);
  fx(s, { t: 'candle', side: 'player', n: 0, candles: p.candles });

  const extra = (hasT(s, 'hourglass') ? 1 : 0) + (s.flags.hangedD_player ?? 0);
  s.flags.hangedC_player = 0;
  s.flags.hangedD_player = 0;
  drawCards(s, 'player', 5 + extra);
  if (s.turn === 1 && hasT(s, 'blackwax')) gainWard(s, 'player', 6);

  // Jev lays its hand face-down so you can read (or misread) its intent.
  const j = s.jev;
  drawCards(s, 'jev', Math.max(0, j.handSize - j.hand.length));
  j.peeked = [];
  j.lies = j.mask === 'moon' && j.hand.length ? [pick(s.rng, j.hand).uid] : [];
}

export function costOf(s: CombatState, side: Side, c: CardInst): number {
  const def = getCard(c.id);
  if (side === 'player' && c.rev && hasT(s, 'inkwell') && !s.flags.inkUsed) return 0;
  return def.cost;
}

export function canPlay(s: CombatState, side: Side, uid: number): { ok: boolean; why?: string } {
  if (isOver(s)) return { ok: false, why: 'The game is over.' };
  if (s.phase !== side) return { ok: false, why: 'Not your turn.' };
  const f = F(s, side);
  const c = f.hand.find((h) => h.uid === uid);
  if (!c) return { ok: false, why: 'Not in hand.' };
  const def = getCard(c.id);
  if (def.unplayable) return { ok: false, why: 'Unplayable.' };
  if (costOf(s, side, c) > f.candles) return { ok: false, why: 'Not enough candles.' };
  const toll = tollOf(def, c.rev);
  if (toll && toll >= f.hp) return { ok: false, why: 'The toll would kill you.' };
  if (side === 'player' && s.jev.mask === 'devil' && f.cardsThisTurn >= 4) return { ok: false, why: 'Chains: 4 cards per turn.' };
  return { ok: true };
}

export function playCard(s: CombatState, side: Side, uid: number): boolean {
  if (!canPlay(s, side, uid).ok) return false;
  const f = F(s, side);
  const idx = f.hand.findIndex((h) => h.uid === uid);
  const c = f.hand[idx];
  const def = getCard(c.id);
  const foe = other(side);

  f.hand.splice(idx, 1);
  const cost = costOf(s, side, c);
  if (side === 'player' && c.rev && cost === 0 && def.cost > 0) s.flags.inkUsed = 1;
  f.candles -= cost;
  fx(s, { t: 'play', side, card: c });
  if (cost) fx(s, { t: 'candle', side, n: -cost, candles: f.candles });

  const toll = tollOf(def, c.rev);
  if (toll) loseHp(s, side, toll, 'toll');

  f.cardsThisTurn++;
  f.turnCards.push(c.id);
  if (c.rev) f.turnRevs++;

  if (side === 'player') {
    if (hasM(s, 'tollkeeper') && f.cardsThisTurn >= 4) {
      trigger(s, 'jev', 'Toll Keeper', 'Pay 2.');
      loseHp(s, 'player', 2, 'toll');
    }
    if (hasM(s, 'heavyair') && def.cost >= 2) {
      trigger(s, 'jev', 'Heavy Air', 'Pay 2.');
      loseHp(s, 'player', 2, 'toll');
    }
    if (c.rev && hasM(s, 'mirroreye')) {
      trigger(s, 'jev', 'Mirror Eye', 'I saw that.');
      applyStatus(s, 'jev', 'fury', 1);
    }
    if (hasT(s, 'thimble')) gainWard(s, 'player', 1);
    if (c.rev && hasT(s, 'rabbitfoot')) gainWard(s, 'player', 2);
  }

  const attack = def.tags.includes('attack');
  if (attack && st(s, side, 'omen') > 0) {
    applyStatus(s, side, 'omen', -1);
    s.flags[`omen_${side}`] = 1;
  }
  let times = 1;
  if (st(s, side, 'twice') > 0 && def.id !== 'magician') {
    applyStatus(s, side, 'twice', -1);
    times = 2;
  }
  for (let i = 0; i < times && !isOver(s); i++) {
    def.play({ s, self: side, foe, rev: c.rev, up: c.up, card: c });
  }
  s.flags[`omen_${side}`] = 0;
  f.lastPlayed = c;

  if (def.sigil) {
    f.sigils.push({ id: def.id, rev: c.rev, up: c.up });
    fx(s, { t: 'sigil', side, id: def.id });
  } else if (isAsh(def, c.rev)) {
    f.ash.push(c);
    fx(s, { t: 'ashed', side, card: c });
    onAsh(s, side);
  } else {
    f.discard.push(c);
    fx(s, { t: 'discard', side, card: c });
  }
  checkPhase(s);
  return true;
}

function onAsh(s: CombatState, side: Side) {
  for (const sg of F(s, side).sigils) {
    if (sg.id !== 'ashenvow' || isOver(s)) continue;
    trigger(s, side, 'Ashen Vow', 'The ash remembers.');
    const n = sg.rev ? (sg.up ? 11 : 9) : sg.up ? 7 : 5;
    dealDamage(s, side, other(side), n, { attack: false });
    if (sg.rev) loseHp(s, side, 1, 'self');
  }
}

/** Boss tears off its last mask at half HP. */
export function checkPhase(s: CombatState) {
  const j = s.jev;
  if (isOver(s) || j.mask !== 'jev' || j.phase !== 1 || j.hp > j.maxHp / 2) return;
  j.phase = 2;
  fx(s, { t: 'phase', n: 2 });
  trigger(s, 'jev', 'Two Hands', 'No more masks.');
  j.maxCandles += 1;
  for (const id of ['bleed', 'hex', 'frail', 'dread'] as const) j.st[id] = 0;
  const stolen = s.jevStolen ?? [];
  if (s.flags.stolenHeld && stolen.length) {
    for (const id of stolen) j.draw.push(makeInst(s, id));
    j.draw = shuffle(s.rng, j.draw);
    s.flags.stolenHeld = 0;
    trigger(s, 'jev', 'Stolen Tricks', `${stolen.length} of your cards join its deck.`);
  }
  gainWard(s, 'jev', 12);
}

export function peekCost(s: CombatState) {
  return s.flags.peekFree ? 0 : 1;
}

export function peek(s: CombatState, uid: number): boolean {
  const j = s.jev;
  if (s.phase !== 'player' || j.peeked.includes(uid) || !j.hand.some((c) => c.uid === uid)) return false;
  const cost = peekCost(s);
  if (s.player.candles < cost) return false;
  if (cost) gainCandles(s, 'player', -cost);
  else s.flags.peekFree = 0;
  j.peeked.push(uid);
  return true;
}

function logTurn(s: CombatState, side: Side) {
  const f = F(s, side);
  s.log.push({ side, turn: s.turn, cards: f.turnCards.slice(), revs: f.turnRevs, dmg: f.dmgThisTurn, ward: f.wardThisTurn });
}

export function endPlayerTurn(s: CombatState) {
  if (s.phase !== 'player') return;
  const p = s.player;
  for (const c of p.hand.splice(0)) {
    p.discard.push(c);
    fx(s, { t: 'discard', side: 'player', card: c });
  }
  decay(s, 'player');
  logTurn(s, 'player');

  if (s.jev.mask === 'hanged' && (s.flags.jevHpAtTurn ?? 0) - s.jev.hp >= 10) {
    trigger(s, 'jev', 'Martyr', 'Pain is instruction.');
    applyStatus(s, 'jev', 'fury', 1);
  }
  s.flags.foresight = hasM(s, 'foresight') && p.dmgThisTurn >= 15 ? 1 : 0;
  beginJevTurn(s);
}

export function beginJevTurn(s: CombatState) {
  if (isOver(s)) return;
  s.phase = 'jev';
  const j = s.jev;
  fx(s, { t: 'turn', side: 'jev', n: s.turn });
  j.ward = 0;
  keepThorns(s, 'jev');
  resetTurn(j);
  tickBleed(s, 'jev');
  if (isOver(s)) return;
  if (j.mask === 'tower' && s.turn % 3 === 0) {
    trigger(s, 'jev', 'Lightning', 'The tower falls on everyone.');
    loseHp(s, 'player', 8, 'self');
    loseHp(s, 'jev', 8, 'self');
    if (isOver(s)) return;
  }
  let candles = j.maxCandles;
  const dread = j.st.dread ?? 0;
  if (dread > 0) {
    candles -= dread;
    j.st.dread = 0;
    fx(s, { t: 'status', to: 'jev', s: 'dread', n: -dread, total: 0 });
  }
  j.candles = Math.max(0, candles);
  fx(s, { t: 'candle', side: 'jev', n: 0, candles: j.candles });
  if (hasM(s, 'ironhide')) {
    trigger(s, 'jev', 'Iron Hide', '');
    gainWard(s, 'jev', 4);
  }
  if (s.flags.foresight) {
    trigger(s, 'jev', 'Foresight', 'I felt that coming.');
    gainWard(s, 'jev', 8);
  }
  checkPhase(s);
}

export function endJevTurn(s: CombatState) {
  if (isOver(s)) return;
  const j = s.jev;
  for (const c of j.hand.splice(0)) {
    j.discard.push(c);
    fx(s, { t: 'discard', side: 'jev', card: c });
  }
  decay(s, 'jev');
  logTurn(s, 'jev');
  startPlayerTurn(s);
}

/** Deep copy for Jev's look-ahead. Simulations never emit FX. */
export function cloneForSim(s: CombatState): CombatState {
  const c = structuredClone({ ...s, fx: [] });
  c.sim = true;
  // Decorrelate sim RNG from the real stream so peeking ahead can't leak future rolls.
  c.rng.s = (c.rng.s ^ 0xa5a5a5a5) >>> 0;
  next(c.rng);
  return c;
}

export function drainFx(s: CombatState) {
  return s.fx.splice(0);
}
