// Primitive combat operations. Everything that changes a fighter goes through here so
// trinkets, mutations and statuses apply consistently and every change emits an FxEvent.
import { next, shuffle, int } from '../core/rng.ts';
import type { CardInst, CombatState, Fighter, FxEvent, Side, StatusId } from './types.ts';

export const other = (side: Side): Side => (side === 'player' ? 'jev' : 'player');
export const F = (s: CombatState, side: Side): Fighter => (side === 'player' ? s.player : s.jev);
export const hasT = (s: CombatState, id: string) => s.trinkets.includes(id);
export const hasM = (s: CombatState, id: string) => s.jev.mutations.includes(id);
export const st = (s: CombatState, side: Side, id: StatusId) => F(s, side).st[id] ?? 0;

export function fx(s: CombatState, e: FxEvent) {
  if (!s.sim) s.fx.push(e);
}

export function isOver(s: CombatState) {
  return s.phase === 'over';
}

function checkDeath(s: CombatState, side: Side) {
  const f = F(s, side);
  if (f.hp > 0 || isOver(s)) return;
  if (side === 'player' && hasT(s, 'knuckle') && !s.flags.knuckleUsed) {
    s.flags.knuckleUsed = 1;
    f.hp = 1;
    fx(s, { t: 'trigger', side, name: "Saint's Knuckle", text: 'You refuse to fall.' });
    return;
  }
  f.hp = 0;
  s.phase = 'over';
  s.winner = other(side);
  fx(s, { t: 'death', side });
}

export interface DmgOpts {
  pierce?: boolean;
  attack?: boolean; // attacks get fury, hex, omen, thorns
  flat?: boolean; // ignore fury/hex/omen
}

/** Compute one hit's damage before ward, without side effects (used by UI previews too). */
export function hitValue(s: CombatState, from: Side, base: number, opts: DmgOpts = {}) {
  const attack = opts.attack ?? true;
  let amt = base;
  let crit = false;
  if (attack && !opts.flat) {
    amt += st(s, from, 'fury');
    if (from === 'player' && hasT(s, 'wolftooth') && !s.flags.wolfUsed) amt += 6;
    if (st(s, from, 'hex') > 0) amt = Math.floor(amt * 0.75);
    if (s.flags[`omen_${from}`]) {
      amt *= 2;
      crit = true;
    }
  }
  return { amt: Math.max(0, amt), crit };
}

export function dealDamage(s: CombatState, from: Side, to: Side, base: number, opts: DmgOpts = {}): number {
  if (isOver(s)) return 0;
  const attack = opts.attack ?? true;
  const target = F(s, to);
  const { amt: raw, crit } = hitValue(s, from, base, opts);
  let amt = raw;
  if (attack && from === 'player' && hasT(s, 'wolftooth') && !s.flags.wolfUsed) {
    s.flags.wolfUsed = 1;
    fx(s, { t: 'trigger', side: 'player', name: 'Wolf Tooth', text: '+6 on first blood' });
  }

  if (attack && st(s, to, 'veil') > 0) {
    target.st.veil = st(s, to, 'veil') - 1;
    fx(s, { t: 'trigger', side: to, name: 'Veil', text: 'The blow passes through smoke.' });
    fx(s, { t: 'status', to, s: 'veil', n: -1, total: target.st.veil });
    return 0;
  }

  let blocked = 0;
  if (!opts.pierce && target.ward > 0) {
    // Sundering Gaze: Jev's attacks chew through Ward twice as fast.
    const sunder = attack && from === 'jev' && hasM(s, 'sunder');
    const cap = sunder ? Math.ceil(target.ward / 2) : target.ward;
    blocked = Math.min(cap, amt);
    target.ward = Math.max(0, target.ward - (sunder ? blocked * 2 : blocked));
    if (target.ward === 0) fx(s, { t: 'wardBreak', to });
  }
  const hpLoss = amt - blocked;
  target.hp -= hpLoss;
  F(s, from).dmgThisTurn += hpLoss;
  fx(s, { t: 'dmg', to, amount: hpLoss, blocked, crit, pierce: !!opts.pierce, hp: Math.max(0, target.hp), ward: target.ward });

  if (from === 'jev' && to === 'player' && attack && !s.sim) {
    s.flags.jevHits = (s.flags.jevHits ?? 0) + 1;
    if (blocked === 0 && hpLoss > 0) s.flags.unwarded = (s.flags.unwarded ?? 0) + 1;
  }
  if (hpLoss > 0 && from === 'jev' && attack && hasM(s, 'hunger')) heal(s, 'jev', 3, 'Hunger');
  checkDeath(s, to);

  const thorns = st(s, to, 'thorns');
  if (attack && thorns > 0 && !isOver(s)) {
    fx(s, { t: 'trigger', side: to, name: 'Thorns', text: `${thorns} back` });
    loseHp(s, from, thorns, 'self');
  }
  return hpLoss;
}

export function gainWard(s: CombatState, side: Side, n: number) {
  if (isOver(s)) return;
  const f = F(s, side);
  let amt = n;
  if (st(s, side, 'frail') > 0) amt = Math.floor(amt * 0.75);
  f.ward += amt;
  f.wardThisTurn += amt;
  fx(s, { t: 'ward', to: side, amount: amt, ward: f.ward });
}

export function applyStatus(s: CombatState, to: Side, id: StatusId, n: number) {
  if (isOver(s) || n === 0) return;
  const f = F(s, to);
  let amt = n;
  if (id === 'bleed' && to === 'jev' && hasT(s, 'coffinnail') && n > 0) amt += 1;
  if (id === 'hex' && to === 'jev' && hasM(s, 'coldblood') && n > 0) {
    fx(s, { t: 'trigger', side: 'jev', name: 'Cold Blood', text: 'Hex slides off.' });
    return;
  }
  f.st[id] = Math.max(0, (f.st[id] ?? 0) + amt);
  fx(s, { t: 'status', to, s: id, n: amt, total: f.st[id]! });
}

export function heal(s: CombatState, side: Side, n: number, source?: string) {
  if (isOver(s)) return;
  const f = F(s, side);
  const amt = Math.min(n, f.maxHp - f.hp);
  if (amt <= 0) return;
  f.hp += amt;
  if (source) fx(s, { t: 'trigger', side, name: source, text: `+${amt}` });
  fx(s, { t: 'heal', to: side, amount: amt, hp: f.hp });
}

export function loseHp(s: CombatState, side: Side, n: number, kind: 'bleed' | 'toll' | 'self') {
  if (isOver(s) || n <= 0) return;
  const f = F(s, side);
  f.hp -= n;
  fx(s, { t: 'lose', to: side, amount: n, hp: Math.max(0, f.hp), kind });
  checkDeath(s, side);
}

export function gainCandles(s: CombatState, side: Side, n: number) {
  const f = F(s, side);
  f.candles = Math.max(0, f.candles + n);
  fx(s, { t: 'candle', side, n, candles: f.candles });
}

export function rollRev(s: CombatState, side: Side): boolean {
  const p = side === 'player' ? s.revChance : s.jev.mask === 'fool' ? 0.3 : 0.15;
  return next(s.rng) < p;
}

export function drawCards(s: CombatState, side: Side, n: number) {
  const f = F(s, side);
  for (let i = 0; i < n; i++) {
    if (side === 'player' && f.hand.length >= 10) return;
    if (f.draw.length === 0) {
      if (f.discard.length === 0) return;
      f.draw = shuffle(s.rng, f.discard);
      f.discard = [];
      fx(s, { t: 'shuffle', side });
    }
    const c = f.draw.pop()!;
    c.rev = rollRev(s, side);
    f.hand.push(c);
    fx(s, { t: 'draw', side, card: c });
  }
}

export function makeInst(s: CombatState, id: string, up = false): CardInst {
  return { uid: s.nextUid++, id, up, rev: false };
}

export function addCard(s: CombatState, side: Side, id: string, where: 'draw' | 'hand' | 'discard') {
  const f = F(s, side);
  const c = makeInst(s, id);
  if (where === 'draw') f.draw.splice(int(s.rng, 0, f.draw.length), 0, c);
  else if (where === 'hand') {
    c.rev = rollRev(s, side);
    f.hand.push(c);
  } else f.discard.push(c);
  fx(s, { t: 'addCard', side, card: c, to: where });
}

export function discardRandom(s: CombatState, side: Side, n: number, exceptUid?: number) {
  const f = F(s, side);
  for (let i = 0; i < n; i++) {
    const pool = f.hand.filter((c) => c.uid !== exceptUid);
    if (!pool.length) return;
    const c = pool[Math.floor(next(s.rng) * pool.length)];
    f.hand.splice(f.hand.indexOf(c), 1);
    f.discard.push(c);
    fx(s, { t: 'discard', side, card: c });
  }
}

export function cleanse(s: CombatState, side: Side, n = 99) {
  const f = F(s, side);
  for (const id of ['bleed', 'hex', 'frail', 'dread'] as StatusId[]) {
    const cur = f.st[id] ?? 0;
    if (cur <= 0) continue;
    const take = Math.min(cur, n);
    f.st[id] = cur - take;
    fx(s, { t: 'status', to: side, s: id, n: -take, total: f.st[id]! });
  }
}

export function roll(s: CombatState, side: Side, faces: number, label: string) {
  const result = int(s.rng, 1, faces);
  fx(s, { t: 'roll', side, faces, result, label });
  return result;
}

export function trigger(s: CombatState, side: Side, name: string, text: string) {
  fx(s, { t: 'trigger', side, name, text });
}
