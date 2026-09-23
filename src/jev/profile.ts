// What Jev knows about you. Built from combat logs; persists across the run.
import { getCard } from '../game/cards.ts';
import type { CombatState, Tag } from '../game/types.ts';
import type { Habit } from './mutations.ts';

export interface Profile {
  fights: number;
  turns: number;
  cards: number;
  tags: Partial<Record<Tag, number>>;
  plays: Record<string, number>;
  revs: number;
  dmgTotal: number;
  biggestTurn: number;
  wardTotal: number;
  jevHits: number;
  unwarded: number;
  multiHit: number;
  bigCards: number;
  maxCardsTurn: number;
}

export const newProfile = (): Profile => ({
  fights: 0, turns: 0, cards: 0, tags: {}, plays: {}, revs: 0, dmgTotal: 0, biggestTurn: 0,
  wardTotal: 0, jevHits: 0, unwarded: 0, multiHit: 0, bigCards: 0, maxCardsTurn: 0,
});

const MULTI = new Set(['twinknives', 'castlots', 'j_twinfang']);

/** Fold one finished (or in-progress) combat into the profile. `from` = first unread log index. */
export function absorb(p: Profile, s: CombatState, from = 0) {
  for (const t of s.log.slice(from)) {
    if (t.side !== 'player') continue;
    p.turns++;
    p.cards += t.cards.length;
    p.revs += t.revs;
    p.dmgTotal += t.dmg;
    p.wardTotal += t.ward;
    p.biggestTurn = Math.max(p.biggestTurn, t.dmg);
    p.maxCardsTurn = Math.max(p.maxCardsTurn, t.cards.length);
    for (const id of t.cards) {
      p.plays[id] = (p.plays[id] ?? 0) + 1;
      const def = getCard(id);
      for (const tag of def.tags) p.tags[tag] = (p.tags[tag] ?? 0) + 1;
      if (MULTI.has(id)) p.multiHit++;
      if (def.cost >= 2) p.bigCards++;
    }
  }
  return s.log.length;
}

export function absorbHits(p: Profile, s: CombatState) {
  p.jevHits += s.flags.jevHits ?? 0;
  p.unwarded += s.flags.unwarded ?? 0;
}

const clamp = (x: number) => Math.max(0, Math.min(1, x));

export function habits(p: Profile): Record<Habit, number> {
  const n = Math.max(1, p.cards);
  const turns = Math.max(1, p.turns);
  const tag = (t: Tag) => (p.tags[t] ?? 0) / n;
  return {
    attack: clamp(tag('attack') * 1.4),
    ward: clamp(tag('ward') * 1.8 + (p.wardTotal / turns) / 25),
    bleed: clamp(tag('bleed') * 3),
    hex: clamp(tag('hex') * 3.5),
    reversed: clamp((p.revs / n) * 3),
    spam: clamp((p.cards / turns - 3) / 2),
    burst: clamp((p.biggestTurn - 12) / 16),
    bigcards: clamp((p.bigCards / n) * 3),
    unwarded: clamp(p.jevHits ? p.unwarded / p.jevHits : 0),
    multihit: clamp((p.multiHit / n) * 4),
  };
}

export function favorite(p: Profile, exclude: string[] = []): string | undefined {
  // Jev wants your signature, not your basics: a non-starter played twice beats any starter.
  const ranked = Object.entries(p.plays)
    .filter(([id]) => !exclude.includes(id) && !['jev', 'curse'].includes(getCard(id).rarity))
    .sort((a, b) => b[1] - a[1]);
  const signature = ranked.find(([id, n]) => getCard(id).rarity !== 'starter' && n >= 2);
  return (signature ?? ranked[0])?.[0];
}

/** Plain-language profile, used as model state and in the evolution cutscene. */
export function describe(p: Profile) {
  const h = habits(p);
  const n = Math.max(1, p.cards);
  const turns = Math.max(1, p.turns);
  const fav = favorite(p);
  return {
    fights_seen: p.fights,
    turns_seen: p.turns,
    cards_per_turn: +(p.cards / turns).toFixed(1),
    avg_damage_per_turn: +(p.dmgTotal / turns).toFixed(1),
    biggest_turn_damage: p.biggestTurn,
    avg_ward_per_turn: +(p.wardTotal / turns).toFixed(1),
    share_of_attack_cards: pct((p.tags.attack ?? 0) / n),
    share_of_ward_cards: pct((p.tags.ward ?? 0) / n),
    share_of_bleed_cards: pct((p.tags.bleed ?? 0) / n),
    share_of_hex_cards: pct((p.tags.hex ?? 0) / n),
    reversed_card_rate: pct(p.revs / n),
    hits_taken_unwarded: pct(h.unwarded),
    favorite_card: fav ? getCard(fav).name : 'none yet',
  };
}

const pct = (x: number) => `${Math.round(x * 100)}%`;

/** The one line Jev says about you in the ledger scene. */
export function readHabit(p: Profile): { habit: Habit; line: string } {
  if (p.cards < 3) return { habit: 'attack', line: 'You have shown me almost nothing. I will assume the worst.' };
  const h = habits(p);
  const top = (Object.entries(h) as [Habit, number][]).sort((a, b) => b[1] - a[1])[0];
  const d = describe(p);
  const lines: Record<Habit, string> = {
    attack: `You swing first. ${d.share_of_attack_cards} of your cards are blades.`,
    ward: `You hide. ${d.avg_ward_per_turn} Ward a turn, every turn.`,
    bleed: `You like to watch things bleed. ${d.share_of_bleed_cards} of your hand is knives in slow motion.`,
    hex: `Curses. ${d.share_of_hex_cards} of the time. How rude.`,
    reversed: `You play them upside-down. ${d.reversed_card_rate} of your cards, reversed.`,
    spam: `${d.cards_per_turn} cards a turn. Busy little hands.`,
    burst: `${d.biggest_turn_damage} damage in one turn. I felt that.`,
    bigcards: `You save your candles for the big ones.`,
    unwarded: `You leave yourself open. ${d.hits_taken_unwarded} of my blows land clean.`,
    multihit: `Many small cuts. A thousand little hellos.`,
  };
  return { habit: top[0], line: lines[top[0]] };
}
