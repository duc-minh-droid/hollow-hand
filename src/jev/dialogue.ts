// Everything Jev says. Lines are authored; Jev (the model) or instinct picks the category.
import { pick, type Rng } from '../core/rng.ts';
import type { TauntKind } from './brain.ts';

const T: Record<TauntKind, string[]> = {
  mock_habit: [
    'You always reach for the same card. I have started to reach first.',
    'Predictable. Like a clock with one number.',
    'That trick again? I have it memorised. I have it framed.',
    'Your hands have a rhythm. I dance to it now.',
  ],
  menace: [
    'Hold still. This part is quick.',
    'Count your candles. Count them again.',
    'I will enjoy writing your name in my ledger.',
    'You hear that? The bell is warming up.',
  ],
  respect: [
    '...Good. Do that again and I will have to take you seriously.',
    'You bite. I like things that bite.',
    'Hm. That one I did not see.',
    'Careful. You are almost interesting.',
  ],
  silence: ['...', '*shuffles*', '*taps the table twice*', '*smiles under the mask*'],
  recall: [
    'Last night you fell on this very table. Remember the smell?',
    'I kept your name from last time. It is warm in my pocket.',
    'Again? You taste familiar.',
  ],
};

export function taunt(rng: Rng, kind: TauntKind): string | null {
  const line = pick(rng, T[kind]);
  return kind === 'silence' && line === '...' ? null : line;
}

export const REACT = {
  firstReversed: ['Upside-down. How very honest of you.', 'Reversed. The cards are laughing at one of us.'],
  bigHit: ['Ah—! You will pay interest on that.', 'That hurt. I am writing it down.'],
  jevLow: ['Not yet. Not like this.', 'The mask is cracking. So is my patience.'],
  playerLow: ['Your candle gutters.', 'Shh. Almost over now.'],
  jevWins: ['Your name is mine. Sit. There is always another hand.'],
  playerWins: ['...Take it, then. The mask. I have others.'],
  peek: ['Peeking? Rude. Useful, but rude.', 'Look all you like. Knowing will not save you.'],
};

export function react(rng: Rng, key: keyof typeof REACT) {
  return pick(rng, REACT[key]);
}

export interface Memory {
  grudge: number;
  deaths: number;
  wins: number;
  lastDeath?: string; // mask that killed you
  ghostCard?: string; // your favourite card from the last night
  runs: number;
}

export function greeting(m: Memory): string[] {
  if (m.runs === 0) {
    return [
      'You do not remember arriving. The candles do.',
      'Across the table, something in a paper mask shuffles a deck with too many hands.',
      '"I am Jev. I deal. You play. Win the night, and you keep your name."',
    ];
  }
  if (m.wins > 0 && m.grudge === 0) {
    return ['The table is set again. Jev does not look up.', '"You won, once. The house remembers debts."'];
  }
  const lines = ['The candles relight themselves as you sit.'];
  if (m.lastDeath) lines.push(`"Last time ${m.lastDeath} took you. I laughed for an hour."`);
  if (m.ghostCard) lines.push('"I kept one of your tricks. You will see it again."');
  if (m.grudge >= 2) lines.push('"I have been practising. Against you, specifically."');
  return lines;
}
