// Trinkets are the player's relics. Effects are applied inside ops.ts / combat.ts by id.
export interface TrinketDef {
  id: string;
  name: string;
  text: string;
  price: number;
}

export const TRINKETS: TrinketDef[] = [
  { id: 'blackwax', name: 'Black Wax', text: 'Start each fight with 6 Ward.', price: 60 },
  { id: 'wolftooth', name: 'Wolf Tooth', text: 'Your first attack each fight deals +6 damage.', price: 55 },
  { id: 'rosary', name: 'Bone Rosary', text: 'Heal 5 HP after each fight.', price: 65 },
  { id: 'lantern', name: 'Hooded Lantern', text: "Your first peek at Jev's hand each turn is free.", price: 50 },
  { id: 'knuckle', name: "Saint's Knuckle", text: 'Once per fight, survive a killing blow at 1 HP.', price: 90 },
  { id: 'hourglass', name: 'Cracked Hourglass', text: 'Draw 1 extra card each turn. Reversed chance +10%.', price: 80 },
  { id: 'inkwell', name: 'Spilled Inkwell', text: 'The first reversed card you play each turn costs 0.', price: 70 },
  { id: 'thimble', name: 'Iron Thimble', text: 'Gain 1 Ward whenever you play a card.', price: 60 },
  { id: 'ravenskull', name: 'Raven Skull', text: 'Start each fight with 1 Omen.', price: 55 },
  { id: 'stolenledger', name: 'Stolen Ledger', text: 'Jev starts each fight with 1 Dread.', price: 75 },
  { id: 'coffinnail', name: 'Coffin Nail', text: 'Whenever you apply Bleed, apply 1 more.', price: 55 },
  { id: 'rabbitfoot', name: "Rabbit's Foot", text: 'Reversed chance +15%. Reversed cards give +2 Ward when played.', price: 60 },
];

const byId = new Map(TRINKETS.map((t) => [t.id, t]));
export const getTrinket = (id: string) => byId.get(id)!;
