// Story events between fights. Each choice may roll dice; results are narrated.
import { chance, int, pick } from '../core/rng.ts';
import type { RunState } from './run.ts';
import { getCard, playerPool } from './cards.ts';
import { TRINKETS } from './trinkets.ts';
import { getMutation } from '../jev/mutations.ts';

export interface EventChoice {
  label: string;
  hint: string;
  can?: (r: RunState) => boolean;
  resolve: (r: RunState) => EventOutcome;
}

export interface EventOutcome {
  text: string;
  gainCard?: string;
  gainTrinket?: string;
  roll?: { faces: number; result: number };
}

export interface EventDef {
  id: string;
  title: string;
  art: 'mirror' | 'child' | 'pawn' | 'candle' | 'corpse' | 'chair';
  body: string[];
  choices: EventChoice[];
}

const heal = (r: RunState, n: number) => (r.hp = Math.min(r.maxHp, r.hp + n));
const hurt = (r: RunState, n: number) => (r.hp = Math.max(1, r.hp - n));
const addCard = (r: RunState, id: string) => r.deck.push({ id, up: false });
const randomOf = (r: RunState, rarity: string) => pick(r.rng, playerPool.filter((d) => d.rarity === rarity)).id;
const freeTrinket = (r: RunState) => {
  const pool = TRINKETS.filter((t) => !r.trinkets.includes(t.id));
  if (!pool.length) return undefined;
  const t = pick(r.rng, pool).id;
  r.trinkets.push(t);
  return t;
};

export const EVENTS: EventDef[] = [
  {
    id: 'mirror', title: 'The Drowned Mirror', art: 'mirror',
    body: [
      'A basin of black water in an empty hallway. A mirror lies at the bottom, face-up.',
      'Your reflection is upside-down. It is holding a card you do not own.',
    ],
    choices: [
      {
        label: 'Reach in', hint: '50%: gain a rare card. 50%: lose 8 HP and gain a Doubt.',
        resolve: (r) => {
          const roll = int(r.rng, 1, 6);
          if (roll >= 4) {
            const id = randomOf(r, 'rare');
            addCard(r, id);
            return { text: `Your fingers close on a card. It is dry. It is ${getCard(id).name}.`, gainCard: id, roll: { faces: 6, result: roll } };
          }
          hurt(r, 8);
          addCard(r, 'doubt');
          return { text: 'Something takes your wrist and holds it under. You pull free with less than you came with.', gainCard: 'doubt', roll: { faces: 6, result: roll } };
        },
      },
      {
        label: 'Break the glass', hint: 'Lose 3 HP. Remove a random Strike.',
        can: (r) => r.deck.some((c) => c.id === 'strike'),
        resolve: (r) => {
          hurt(r, 3);
          r.deck.splice(r.deck.findIndex((c) => c.id === 'strike'), 1);
          return { text: 'The mirror shatters. One of your Strikes goes with it, and you feel lighter.' };
        },
      },
      { label: 'Walk on', hint: 'Nothing happens. Probably.', resolve: () => ({ text: 'Behind you, the water ripples once.' }) },
    ],
  },
  {
    id: 'child', title: "A Child's Deck", art: 'child',
    body: [
      'A child in a nightgown sits cross-legged on the stairs, dealing cards to nobody.',
      '"Trade?" it asks, without looking up. "Or I could teach you a trick."',
    ],
    choices: [
      {
        label: 'Trade a card', hint: 'Lose a random card. Gain a random uncommon.',
        resolve: (r) => {
          const i = int(r.rng, 0, r.deck.length - 1);
          const lost = r.deck.splice(i, 1)[0];
          const id = randomOf(r, 'uncommon');
          addCard(r, id);
          return { text: `It takes your ${getCard(lost.id).name} and gives you ${getCard(id).name}. "Fair," it says. It is not.`, gainCard: id };
        },
      },
      {
        label: 'Learn the trick', hint: 'Carve (upgrade) 2 random cards.',
        resolve: (r) => {
          const pool = r.deck.filter((c) => !c.up && getCard(c.id).rarity !== 'curse');
          const names: string[] = [];
          for (let k = 0; k < 2 && pool.length; k++) {
            const c = pool.splice(int(r.rng, 0, pool.length - 1), 1)[0];
            c.up = true;
            names.push(getCard(c.id).name);
          }
          return { text: `Its small hands move yours. ${names.join(' and ')} feel sharper now.` };
        },
      },
      { label: 'Leave it be', hint: 'Heal 6.', resolve: (r) => (heal(r, 6), { text: 'You sit with it a while. Neither of you speaks. It helps.' }) },
    ],
  },
  {
    id: 'pawn', title: 'Pawn a Memory', art: 'pawn',
    body: [
      'A pawnbroker with no eyes behind a counter of glass jars. Each jar holds a small, glowing thing.',
      '"Memories," he says. "I buy. Everyone sells, eventually."',
    ],
    choices: [
      {
        label: 'Sell your childhood', hint: 'Lose 6 max HP. Gain 70 teeth.',
        resolve: (r) => {
          r.maxHp -= 6;
          r.hp = Math.min(r.hp, r.maxHp);
          r.teeth += 70;
          return { text: 'He unscrews a jar. You forget the colour of a kitchen. He pays in teeth.' };
        },
      },
      {
        label: 'Sell your name', hint: 'Gain a trinket. Jev learns more about you.',
        resolve: (r) => {
          const t = freeTrinket(r);
          r.grudge += 1;
          return { text: `You say your name into the jar. Somewhere, Jev smiles. You receive ${t ? TRINKETS.find((x) => x.id === t)!.name : 'nothing'}.`, gainTrinket: t };
        },
      },
      { label: 'Keep what you have', hint: 'Nothing.', resolve: () => ({ text: '"Everyone sells," he repeats, to your back.' }) },
    ],
  },
  {
    id: 'candle', title: 'The Candle That Speaks', art: 'candle',
    body: ['A single candle on a windowsill. Its flame leans toward you when you breathe.', '"I have seen its ledger," the candle whispers. "I could tell you things."'],
    choices: [
      {
        label: 'Ask about Jev', hint: 'Lose 5 HP. Remove one of Jev\'s ledger rules.',
        can: (r) => r.jev.mutations.length > 0,
        resolve: (r) => {
          hurt(r, 5);
          const m = r.jev.mutations.splice(int(r.rng, 0, r.jev.mutations.length - 1), 1)[0];
          return { text: `The flame burns your palm and whispers: "${getMutation(m).name}." You tear the rule from its ledger in your mind — and in its hand.` };
        },
      },
      {
        label: 'Warm your hands', hint: 'Heal 12.',
        resolve: (r) => (heal(r, 12), { text: 'The warmth reaches places the cold had settled in.' }),
      },
      {
        label: 'Snuff it', hint: 'Gain Tallow. The candle screams.',
        resolve: (r) => (addCard(r, 'tallow'), { text: 'It screams in a voice you almost recognise. What is left is soft and useful.', gainCard: 'tallow' }),
      },
    ],
  },
  {
    id: 'corpse', title: "A Card Sharp's Corpse", art: 'corpse',
    body: ['Slumped against the wall: a gambler in a good coat, very dead, still smiling.', 'Their pockets bulge.'],
    choices: [
      {
        label: 'Search the pockets', hint: 'Roll d6. 1–2: a curse. 3–4: 35 teeth. 5–6: a trinket.',
        resolve: (r) => {
          const roll = int(r.rng, 1, 6);
          if (roll <= 2) {
            addCard(r, 'doubt');
            return { text: 'Your fingers find only a cold card. It is blank. It is yours now.', gainCard: 'doubt', roll: { faces: 6, result: roll } };
          }
          if (roll <= 4) {
            r.teeth += 35;
            return { text: 'A velvet purse of teeth. Some still have fillings.', roll: { faces: 6, result: roll } };
          }
          const t = freeTrinket(r);
          return { text: `Tucked inside the lining: ${t ? TRINKETS.find((x) => x.id === t)!.name : 'lint'}.`, gainTrinket: t, roll: { faces: 6, result: roll } };
        },
      },
      {
        label: 'Take their best card', hint: 'Gain a random uncommon. Lose 4 HP.',
        resolve: (r) => {
          const id = randomOf(r, 'uncommon');
          addCard(r, id);
          hurt(r, 4);
          return { text: `The fingers do not want to let go of ${getCard(id).name}. You break one.`, gainCard: id };
        },
      },
      { label: 'Close their eyes', hint: 'Gain 3 max HP.', resolve: (r) => ((r.maxHp += 3), heal(r, 3), { text: 'A small decency. The house notices.' }) },
    ],
  },
  {
    id: 'chair', title: "Jev's Empty Chair", art: 'chair',
    body: ['You find the table again — but Jev is not there. Its chair is still warm.', 'Its ledger lies open. Its deck lies beside it.'],
    choices: [
      {
        label: 'Steal a card from its deck', hint: 'Gain one of Jev\'s own cards.',
        resolve: (r) => {
          const id = pick(r.rng, ['j_rake', 'j_bell', 'j_leech', 'j_shard', 'j_ledger', 'j_veil']);
          addCard(r, id);
          return { text: `You pocket ${getCard(id).name}. It is heavier than it looks, and warm.`, gainCard: id };
        },
      },
      {
        label: 'Tear out a page', hint: "Remove a stolen trick from Jev's deck, or 50% remove a ledger rule.",
        resolve: (r) => {
          if (r.jev.stolen.length) {
            const id = r.jev.stolen.splice(int(r.rng, 0, r.jev.stolen.length - 1), 1)[0];
            return { text: `You find your own ${getCard(id).name} pressed between the pages and take it back.` };
          }
          if (r.jev.mutations.length && chance(r.rng, 0.5)) {
            const m = r.jev.mutations.splice(0, 1)[0];
            return { text: `You tear out "${getMutation(m).name}". The ink screams a little.` };
          }
          return { text: 'The pages are blank. For now.' };
        },
      },
      { label: 'Sit in its chair', hint: 'Heal to full. Jev will know.', resolve: (r) => ((r.hp = r.maxHp), (r.grudge += 1), { text: 'It fits you perfectly. That is the worst part.' }) },
    ],
  },
];

export const EVENT_IDS = EVENTS.map((e) => e.id);
export const getEvent = (id: string) => EVENTS.find((e) => e.id === id)!;
