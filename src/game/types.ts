import type { Rng } from '../core/rng.ts';

export type Side = 'player' | 'jev';
export type Suit = 'blades' | 'chalices' | 'coins' | 'wands' | 'curse';
export type Rarity = 'starter' | 'common' | 'uncommon' | 'rare' | 'jev' | 'curse';
export type Tag =
  | 'attack' | 'ward' | 'bleed' | 'hex' | 'draw' | 'candle' | 'omen'
  | 'heal' | 'ash' | 'toll' | 'sigil' | 'fury' | 'dread' | 'thorns' | 'chaos';

export type StatusId =
  | 'bleed' | 'hex' | 'frail' | 'thorns' | 'fury' | 'omen' | 'dread' | 'veil' | 'twice';

export type Statuses = Partial<Record<StatusId, number>>;

export interface CardInst {
  uid: number;
  id: string;
  up: boolean; // carved (upgraded)
  rev: boolean; // reversed — rolled every time the card is drawn
}

export interface Sigil {
  id: string; // card id that created it
  rev: boolean;
  up: boolean;
}

export interface Fighter {
  hp: number;
  maxHp: number;
  ward: number;
  st: Statuses;
  sigils: Sigil[];
  candles: number;
  maxCandles: number;
  draw: CardInst[];
  hand: CardInst[];
  discard: CardInst[];
  ash: CardInst[];
  cardsThisTurn: number;
  dmgThisTurn: number;
  wardThisTurn: number;
  turnCards: string[];
  turnRevs: number;
  lastPlayed?: CardInst;
}

export interface JevFighter extends Fighter {
  mask: string;
  handSize: number;
  mutations: string[];
  peeked: number[]; // uids revealed to player this turn
  phase: number; // boss phase
  lies: number[]; // uids whose intent sigil is a lie (Moon mask)
}

export type FxEvent =
  | { t: 'play'; side: Side; card: CardInst }
  | { t: 'dmg'; to: Side; amount: number; blocked: number; crit: boolean; pierce: boolean; hp: number; ward: number }
  | { t: 'ward'; to: Side; amount: number; ward: number }
  | { t: 'wardBreak'; to: Side }
  | { t: 'heal'; to: Side; amount: number; hp: number }
  | { t: 'lose'; to: Side; amount: number; hp: number; kind: 'bleed' | 'toll' | 'self' }
  | { t: 'status'; to: Side; s: StatusId; n: number; total: number }
  | { t: 'draw'; side: Side; card: CardInst }
  | { t: 'discard'; side: Side; card: CardInst }
  | { t: 'ashed'; side: Side; card: CardInst }
  | { t: 'shuffle'; side: Side }
  | { t: 'candle'; side: Side; n: number; candles: number }
  | { t: 'roll'; side: Side; faces: number; result: number; label: string }
  | { t: 'trigger'; side: Side; name: string; text: string }
  | { t: 'sigil'; side: Side; id: string }
  | { t: 'addCard'; side: Side; card: CardInst; to: 'draw' | 'hand' | 'discard' }
  | { t: 'phase'; n: number }
  | { t: 'death'; side: Side }
  | { t: 'turn'; side: Side; n: number };

export interface CombatState {
  turn: number;
  phase: 'player' | 'jev' | 'over';
  winner?: Side;
  player: Fighter;
  jev: JevFighter;
  rng: Rng;
  nextUid: number;
  trinkets: string[];
  flags: Record<string, number>; // per-combat counters (first attack used etc.)
  fx: FxEvent[];
  sim: boolean; // true while Jev is simulating — no side-effects on profile
  revChance: number;
  log: TurnLog[];
  jevStolen: string[];
}

export interface TurnLog {
  side: Side;
  turn: number;
  cards: string[];
  revs: number;
  dmg: number;
  ward: number;
}

export interface Ctx {
  s: CombatState;
  self: Side;
  foe: Side;
  rev: boolean;
  up: boolean;
  card: CardInst;
}

export interface CardDef {
  id: string;
  name: string;
  suit: Suit;
  rarity: Rarity;
  cost: number; // candles; for toll cards, cost is 0 and toll is HP
  toll?: number;
  numeral: string;
  tags: Tag[];
  text: (up: boolean) => string;
  revText: (up: boolean) => string;
  play: (c: Ctx) => void;
  ash?: boolean | ((rev: boolean) => boolean);
  unplayable?: boolean;
  sigil?: boolean;
  lore?: string;
  /** What the face-down sigil shows when Jev holds this card. */
  intent?: Intent;
}

export type Intent = 'strike' | 'guard' | 'curse' | 'trick';
