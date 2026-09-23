import type { StatusId } from './types.ts';

export const STATUS_INFO: Record<StatusId, { name: string; text: string; good: boolean }> = {
  bleed: { name: 'Bleed', text: 'Lose HP equal to Bleed at the start of your turn, then Bleed drops by 1. Ignores Ward.', good: false },
  hex: { name: 'Hex', text: 'Your attacks deal 25% less damage. Drops by 1 at end of your turn.', good: false },
  frail: { name: 'Frail', text: 'You gain 25% less Ward. Drops by 1 at end of your turn.', good: false },
  thorns: { name: 'Thorns', text: 'When struck by an attack, the attacker loses that much HP. Fades at the start of your turn.', good: true },
  fury: { name: 'Fury', text: 'Each hit of your attacks deals that much extra damage. Lasts the whole fight.', good: true },
  omen: { name: 'Omen', text: 'Your next attack card deals double damage.', good: true },
  dread: { name: 'Dread', text: 'Lose that many candles at the start of your next turn.', good: false },
  veil: { name: 'Veil', text: 'The next attack that would hit you passes through harmlessly.', good: true },
  twice: { name: 'Twice', text: 'Your next card is played twice.', good: true },
};

export const KEYWORDS: Record<string, string> = {
  Ward: 'Blocks incoming damage. Clears at the start of your turn.',
  Pierce: 'Ignores Ward.',
  Ash: 'Burns away after use. Gone until the fight ends.',
  Toll: 'Pay HP instead of candles.',
  Sigil: 'Stays in play for the rest of the fight.',
  Unplayable: 'Cannot be played.',
  Doubt: 'A curse card. Unplayable. Clogs your hand.',
  Reversed: 'Drawn upside-down (20% chance). The reversed text applies — usually stronger, always with a price.',
  ...Object.fromEntries(Object.values(STATUS_INFO).map((s) => [s.name, s.text])),
};
