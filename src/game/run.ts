// A run: one night at Jev's table. Map generation, rewards, shop stock, rest options.
import { int, makeRng, pick, pickN, shuffle, weighted, type Rng } from '../core/rng.ts';
import { FIGHT_MASKS, MASKS } from '../jev/masks.ts';
import { newProfile, type Profile } from '../jev/profile.ts';
import type { Memory } from '../jev/dialogue.ts';
import { MUTATIONS } from '../jev/mutations.ts';
import { STARTER_DECK, getCard, playerPool } from './cards.ts';
import type { CombatSetup, DeckCard } from './combat.ts';
import { TRINKETS } from './trinkets.ts';
import { EVENT_IDS } from './events.ts';

export type NodeType = 'fight' | 'elite' | 'event' | 'shop' | 'rest' | 'boss';

export interface MapNode {
  id: string;
  row: number;
  col: number;
  x: number; // 0..1 layout
  y: number;
  type: NodeType;
  next: string[];
  mask?: string;
  event?: string;
}

export interface RunState {
  seed: number;
  rng: Rng;
  hp: number;
  maxHp: number;
  teeth: number;
  deck: DeckCard[];
  trinkets: string[];
  nodes: MapNode[];
  at?: string; // current node id
  visited: string[];
  jev: { mutations: string[]; stolen: string[] };
  profile: Profile;
  fightsWon: number;
  removeCost: number;
  grudge: number;
  over?: 'won' | 'lost';
  killedBy?: string;
}

const ROWS: NodeType[][] = [
  ['fight'],
  ['fight', 'event'],
  ['fight', 'event', 'shop'],
  ['elite', 'rest', 'event'],
  ['fight', 'shop', 'event'],
  ['fight', 'event', 'elite'],
  ['rest', 'shop'],
  ['boss'],
];

export function newRun(seed: number, memory: Memory): RunState {
  const rng = makeRng(seed);
  const run: RunState = {
    seed, rng, hp: 64, maxHp: 64, teeth: 40,
    deck: STARTER_DECK.map((id) => ({ id, up: false })),
    trinkets: [], nodes: [], visited: [],
    jev: { mutations: [], stolen: [] }, profile: newProfile(),
    fightsWon: 0, removeCost: 50, grudge: memory.grudge,
  };
  // Jev remembers: a grudge of 2+ means it starts the night already adapted.
  if (memory.grudge >= 2) run.jev.mutations.push(pick(rng, MUTATIONS).id);
  if (memory.ghostCard) run.jev.stolen.push(memory.ghostCard);
  run.nodes = genMap(rng);
  return run;
}

function genMap(rng: Rng): MapNode[] {
  const nodes: MapNode[] = [];
  const rows: MapNode[][] = [];
  const events = shuffle(rng, EVENT_IDS.slice());
  let masks = shuffle(rng, FIGHT_MASKS.slice());
  ROWS.forEach((types, row) => {
    const count = types.length === 1 ? 1 : Math.min(types.length, int(rng, 2, 3));
    const chosen = row === 0 || row === ROWS.length - 1 ? types : pickN(rng, types, count);
    const list = chosen.map((type, col) => {
      const jitter = (int(rng, -6, 6) / 100) * (chosen.length > 1 ? 1 : 0);
      const n: MapNode = {
        id: `n${row}_${col}`, row, col, type, next: [],
        x: chosen.length === 1 ? 0.5 : 0.2 + (0.6 * col) / (chosen.length - 1) + jitter,
        y: 1 - row / (ROWS.length - 1),
      };
      if (type === 'fight') {
        if (row === 0) n.mask = 'fool';
        else {
          if (!masks.length) masks = shuffle(rng, FIGHT_MASKS.slice());
          n.mask = masks.pop();
        }
      }
      if (type === 'elite') n.mask = 'devil';
      if (type === 'boss') n.mask = 'jev';
      if (type === 'event') n.event = events.pop() ?? pick(rng, EVENT_IDS);
      return n;
    });
    rows.push(list);
    nodes.push(...list);
  });
  // Connect each node to its nearest neighbours above; guarantee every node is reachable.
  for (let r = 0; r < rows.length - 1; r++) {
    const cur = rows[r];
    const up = rows[r + 1];
    for (const n of cur) {
      const sorted = up.slice().sort((a, b) => Math.abs(a.x - n.x) - Math.abs(b.x - n.x));
      n.next.push(sorted[0].id);
      if (sorted[1] && Math.abs(sorted[1].x - n.x) < 0.45) n.next.push(sorted[1].id);
    }
    for (const u of up) {
      if (!cur.some((n) => n.next.includes(u.id))) {
        const nearest = cur.slice().sort((a, b) => Math.abs(a.x - u.x) - Math.abs(b.x - u.x))[0];
        nearest.next.push(u.id);
      }
    }
  }
  return nodes;
}

export const nodeById = (run: RunState, id: string) => run.nodes.find((n) => n.id === id)!;

export function reachable(run: RunState): MapNode[] {
  if (!run.at) return run.nodes.filter((n) => n.row === 0);
  return nodeById(run, run.at).next.map((id) => nodeById(run, id));
}

export function combatSetup(run: RunState, node: MapNode): CombatSetup {
  const mask = MASKS[node.mask!];
  const bonus = mask.kind === 'boss' ? run.grudge * 4 : run.fightsWon * 3 + run.grudge * 2;
  return {
    seed: int(run.rng, 1, 2 ** 31),
    player: { hp: run.hp, maxHp: run.maxHp, deck: run.deck },
    trinkets: run.trinkets,
    mask: mask.id,
    mutations: run.jev.mutations,
    stolen: run.jev.stolen,
    jevHpBonus: bonus,
  };
}

export function rollCardChoices(run: RunState, n: number, elite = false): string[] {
  const out: string[] = [];
  const weights = elite ? { common: 40, uncommon: 42, rare: 18 } : { common: 58, uncommon: 34, rare: 8 };
  let guard = 0;
  while (out.length < n && guard++ < 100) {
    const rarity = weighted(run.rng, weights);
    const pool = playerPool.filter((d) => d.rarity === rarity && !out.includes(d.id));
    if (pool.length) out.push(pick(run.rng, pool).id);
  }
  return out;
}

export function rollTrinket(run: RunState): string | undefined {
  const pool = TRINKETS.filter((t) => !run.trinkets.includes(t.id));
  return pool.length ? pick(run.rng, pool).id : undefined;
}

export function cardPrice(id: string, rng: Rng) {
  const base = { common: 45, uncommon: 72, rare: 115 }[getCard(id).rarity as 'common'] ?? 50;
  return base + int(rng, -6, 8);
}

export interface ShopStock {
  cards: { id: string; price: number; sold?: boolean }[];
  trinkets: { id: string; price: number; sold?: boolean }[];
}

export function rollShop(run: RunState): ShopStock {
  const cards = rollCardChoices(run, 5).map((id) => ({ id, price: cardPrice(id, run.rng) }));
  const trinkets = pickN(run.rng, TRINKETS.filter((t) => !run.trinkets.includes(t.id)), 2).map((t) => ({ id: t.id, price: t.price + int(run.rng, -5, 10) }));
  return { cards, trinkets };
}

export function teethReward(run: RunState, elite: boolean) {
  return elite ? int(run.rng, 38, 50) : int(run.rng, 16, 26);
}
