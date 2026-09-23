// The faces Jev wears. Each mask is a fight: HP, deck, persona (fed to the Jev model), and a quirk.
export interface MaskDef {
  id: string;
  name: string;
  numeral: string;
  hp: number;
  candles: number;
  handSize: number;
  deck: string[];
  persona: string;
  quirk: string;
  intro: string[];
  kind: 'fight' | 'elite' | 'boss';
}

export const MASKS: Record<string, MaskDef> = {
  fool: {
    id: 'fool', name: 'The Fool', numeral: '0', hp: 34, candles: 2, handSize: 4, kind: 'fight',
    deck: ['j_bite', 'j_bite', 'j_twinfang', 'j_carapace', 'j_carapace', 'j_grin', 'j_sleight', 'j_leech', 'j_ledger'],
    persona: 'The Fool: playful, reckless, loves gambling and big swings, underestimates the player',
    quirk: "Fool's Luck — Jev's cards are reversed 30% of the time.",
    intro: ['Sit, sit. First hand is always free.', '...Nothing is free. But it feels that way.'],
  },
  tower: {
    id: 'tower', name: 'The Tower', numeral: 'XVI', hp: 44, candles: 3, handSize: 4, kind: 'fight',
    deck: ['j_rake', 'j_bite', 'j_bolt', 'j_bell', 'j_carapace', 'j_ossify', 'j_grin', 'j_twinfang'],
    persona: 'The Tower: brutal, prefers overwhelming damage now over safety, accepts self-harm',
    quirk: 'Lightning — every 3rd turn, lightning strikes both of you for 8.',
    intro: ['Everything you build, I knock down.', 'Build anyway. I like the sound.'],
  },
  hanged: {
    id: 'hanged', name: 'The Hanged Man', numeral: 'XII', hp: 40, candles: 2, handSize: 4, kind: 'fight',
    deck: ['j_hook', 'j_hook', 'j_evileye', 'j_snuff', 'j_veil', 'j_carapace', 'j_bite', 'j_leech'],
    persona: 'The Hanged Man: patient, attritional, prefers bleed, hex and dread to outlast the player',
    quirk: 'Martyr — when Jev loses 10+ HP in one of your turns, it gains 1 Fury.',
    intro: ['Upside down, the world makes more sense.', 'Let us go slowly. You bleed so honestly.'],
  },
  moon: {
    id: 'moon', name: 'The Moon', numeral: 'XVIII', hp: 42, candles: 3, handSize: 4, kind: 'fight',
    deck: ['j_veil', 'j_veil', 'j_shard', 'j_evileye', 'j_pale', 'j_bite', 'j_twinfang', 'j_carapace'],
    persona: 'The Moon: deceptive, sows confusion, punishes players who hoard Ward',
    quirk: 'Illusion — one of Jev\'s face-down sigils each turn is a lie.',
    intro: ['Which card is real? Which of us is?', 'Look closer. No — closer.'],
  },
  devil: {
    id: 'devil', name: 'The Devil', numeral: 'XV', hp: 56, candles: 3, handSize: 5, kind: 'elite',
    deck: ['j_rake', 'j_bite', 'j_hook', 'j_ossify', 'j_ossify', 'j_grin', 'j_pale', 'j_leech', 'j_bell', 'j_sleight'],
    persona: 'The Devil: greedy tyrant, stacks thorns and fury, wants to bind the player to bad bargains',
    quirk: 'Chains — you cannot play more than 4 cards per turn. Jev starts with 2 Thorns.',
    intro: ['Ah. A customer.', 'Everything here has a price, and I set all of them.'],
  },
  jev: {
    id: 'jev', name: 'Jev, Unmasked', numeral: 'XXII', hp: 90, candles: 2, handSize: 4, kind: 'boss',
    deck: ['j_rake', 'j_bell', 'j_hook', 'j_shard', 'j_carapace', 'j_carapace', 'j_evileye', 'j_snuff', 'j_ledger', 'j_leech', 'j_twinfang'],
    persona: 'Jev unmasked: the true Dealer, cold and precise, has studied every habit of the player and plays to exploit them',
    quirk: 'Two Hands — at half HP Jev tears the last mask away, gains a candle and plays every trick it stole from you.',
    intro: ['No more masks.', 'I have watched you all night. I know which hand you favour.'],
  },
};

export const FIGHT_MASKS = ['tower', 'hanged', 'moon'];
