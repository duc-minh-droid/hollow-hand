// Counter-rules Jev inks into its ledger between fights. `counters` names the habit it punishes;
// the profile turns those habits into weights (heuristic) and into context for the Jev model.
export type Habit = 'attack' | 'ward' | 'bleed' | 'hex' | 'reversed' | 'spam' | 'burst' | 'bigcards' | 'unwarded' | 'multihit';

export interface MutationDef {
  id: string;
  name: string;
  text: string;
  counters: Habit;
  line: string; // what Jev says when it inks this
}

export const MUTATIONS: MutationDef[] = [
  { id: 'ironhide', name: 'Iron Hide', text: 'Jev starts each of its turns with 4 Ward.', counters: 'attack', line: 'You swing so much. I will simply be harder.' },
  { id: 'sunder', name: 'Sundering Gaze', text: "Jev's attacks break Ward twice as fast.", counters: 'ward', line: 'You hide behind your little walls. Walls crack.' },
  { id: 'saltblood', name: 'Salt Blood', text: 'Bleed on Jev is halved each turn instead of dropping by 1.', counters: 'bleed', line: 'Your cuts close faster now. I salted them.' },
  { id: 'coldblood', name: 'Cold Blood', text: 'Jev is immune to Hex.', counters: 'hex', line: 'Curse me again. See what happens.' },
  { id: 'mirroreye', name: 'Mirror Eye', text: 'Whenever you play a reversed card, Jev gains 1 Fury.', counters: 'reversed', line: 'Upside-down tricks. I see them from both sides.' },
  { id: 'tollkeeper', name: 'Toll Keeper', text: 'Your 4th and later cards each turn cost 2 HP.', counters: 'spam', line: 'So many little cards. Each one pays now.' },
  { id: 'foresight', name: 'Foresight', text: 'When you deal 15+ damage in one turn, Jev gains 8 Ward.', counters: 'burst', line: 'I felt that last swing coming. I will feel the next.' },
  { id: 'heavyair', name: 'Heavy Air', text: 'Your cards costing 2 or more cost 2 HP extra to play.', counters: 'bigcards', line: 'Big cards, big prices.' },
  { id: 'hunger', name: 'Hunger', text: 'Jev heals 3 whenever its attack hits your HP.', counters: 'unwarded', line: 'You leave yourself open. I am so very hungry.' },
  { id: 'briarskin', name: 'Briar Skin', text: 'Jev keeps 2 Thorns at all times.', counters: 'multihit', line: 'Many small cuts? Then many small thorns.' },
];

const byId = new Map(MUTATIONS.map((m) => [m.id, m]));
export const getMutation = (id: string) => byId.get(id)!;
