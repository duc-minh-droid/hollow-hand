// Every card in the game. Player and Jev share one engine, so a stolen card works on either side.
import type { CardDef, Ctx } from './types.ts';
import {
  F, addCard, applyStatus, cleanse, dealDamage, discardRandom, drawCards, gainCandles,
  gainWard, heal, loseHp, roll, st, trigger,
} from './ops.ts';

const hit = (c: Ctx, n: number, pierce = false) => dealDamage(c.s, c.self, c.foe, n, { pierce });
const ward = (c: Ctx, n: number) => gainWard(c.s, c.self, n);
const hurtSelf = (c: Ctx, n: number) => loseHp(c.s, c.self, n, 'self');
const foeSt = (c: Ctx, id: Parameters<typeof applyStatus>[2], n: number) => applyStatus(c.s, c.foe, id, n);
const selfSt = (c: Ctx, id: Parameters<typeof applyStatus>[2], n: number) => applyStatus(c.s, c.self, id, n);
const u = (up: boolean, a: number, b: number) => (up ? b : a);

const defs: CardDef[] = [
  // ───────────── starter ─────────────
  {
    id: 'strike', name: 'Strike', suit: 'blades', rarity: 'starter', cost: 1, numeral: 'I', tags: ['attack'],
    text: (up) => `Deal <b>${u(up, 6, 9)}</b> damage.`,
    revText: (up) => `Deal <b>${u(up, 9, 13)}</b> damage. Lose <b>2</b> HP.`,
    play: (c) => (c.rev ? (hit(c, u(c.up, 9, 13)), hurtSelf(c, 2)) : hit(c, u(c.up, 6, 9))),
    lore: 'The moon bleeds first.',
  },
  {
    id: 'ward', name: 'Ward', suit: 'chalices', rarity: 'starter', cost: 1, numeral: 'II', tags: ['ward'],
    text: (up) => `Gain <b>${u(up, 5, 8)}</b> Ward.`,
    revText: (up) => `Gain <b>${u(up, 8, 11)}</b> Ward. Gain <b>1</b> Frail.`,
    play: (c) => (c.rev ? (ward(c, u(c.up, 8, 11)), selfSt(c, 'frail', 1)) : ward(c, u(c.up, 5, 8))),
    lore: 'An open hand hides nothing. That is its defence.',
  },
  {
    id: 'cutpalm', name: 'Cut Palm', suit: 'wands', rarity: 'starter', cost: 1, numeral: 'III', tags: ['bleed'],
    text: (up) => `Lose <b>2</b> HP. Apply <b>${u(up, 4, 6)}</b> Bleed.`,
    revText: (up) => `Lose <b>4</b> HP. Apply <b>${u(up, 7, 9)}</b> Bleed.`,
    play: (c) => {
      hurtSelf(c, c.rev ? 4 : 2);
      foeSt(c, 'bleed', c.rev ? u(c.up, 7, 9) : u(c.up, 4, 6));
    },
    lore: 'Every pact wants a signature.',
  },
  {
    id: 'reading', name: 'Reading', suit: 'coins', rarity: 'starter', cost: 0, numeral: 'IV', tags: ['draw'],
    text: (up) => `Draw <b>${u(up, 2, 3)}</b> cards.`,
    revText: (up) => `Draw <b>${u(up, 3, 4)}</b> cards. Discard <b>1</b> at random.`,
    play: (c) => {
      drawCards(c.s, c.self, c.rev ? u(c.up, 3, 4) : u(c.up, 2, 3));
      if (c.rev) discardRandom(c.s, c.self, 1);
    },
    ash: (rev) => !rev,
    lore: 'Three cards, one candle, no good news.',
  },

  // ───────────── common ─────────────
  {
    id: 'twinknives', name: 'Twin Knives', suit: 'blades', rarity: 'common', cost: 1, numeral: 'V', tags: ['attack'],
    text: (up) => `Deal <b>${u(up, 3, 4)}</b> damage twice.`,
    revText: (up) => `Deal <b>${u(up, 2, 3)}</b> damage four times.`,
    play: (c) => {
      const times = c.rev ? 4 : 2;
      for (let i = 0; i < times; i++) hit(c, c.rev ? u(c.up, 2, 3) : u(c.up, 3, 4));
    },
  },
  {
    id: 'lunge', name: 'Lunge', suit: 'blades', rarity: 'common', cost: 2, numeral: 'VI', tags: ['attack'],
    text: (up) => `Deal <b>${u(up, 12, 16)}</b> damage.`,
    revText: (up) => `Deal <b>${u(up, 18, 22)}</b> <i>Pierce</i> damage. <i>Ash</i>.`,
    play: (c) => (c.rev ? hit(c, u(c.up, 18, 22), true) : hit(c, u(c.up, 12, 16))),
    ash: (rev) => rev,
  },
  {
    id: 'castlots', name: 'Cast Lots', suit: 'blades', rarity: 'common', cost: 1, numeral: 'VII', tags: ['attack', 'chaos'],
    text: (up) => `Roll d3. Deal <b>${u(up, 4, 5)}</b> damage that many times.`,
    revText: (up) => `Roll d4+1. Deal <b>${u(up, 3, 4)}</b> damage that many times.`,
    play: (c) => {
      const n = c.rev ? roll(c.s, c.self, 4, 'Lots') + 1 : roll(c.s, c.self, 3, 'Lots');
      for (let i = 0; i < n; i++) hit(c, c.rev ? u(c.up, 3, 4) : u(c.up, 4, 5));
    },
  },
  {
    id: 'briarveil', name: 'Briar Veil', suit: 'chalices', rarity: 'common', cost: 1, numeral: 'VIII', tags: ['ward', 'thorns'],
    text: (up) => `Gain <b>${u(up, 4, 6)}</b> Ward and <b>${u(up, 3, 4)}</b> Thorns.`,
    revText: (up) => `Gain <b>${u(up, 6, 8)}</b> Thorns.`,
    play: (c) => {
      if (!c.rev) ward(c, u(c.up, 4, 6));
      selfSt(c, 'thorns', c.rev ? u(c.up, 6, 8) : u(c.up, 3, 4));
    },
  },
  {
    id: 'saltcircle', name: 'Salt Circle', suit: 'chalices', rarity: 'common', cost: 1, numeral: 'IX', tags: ['ward'],
    text: (up) => `Gain <b>${u(up, 6, 9)}</b> Ward. Cleanse <b>2</b>.`,
    revText: (up) => `Gain <b>${u(up, 3, 5)}</b> Ward. Cleanse all.`,
    play: (c) => {
      ward(c, c.rev ? u(c.up, 3, 5) : u(c.up, 6, 9));
      cleanse(c.s, c.self, c.rev ? 99 : 2);
    },
  },
  {
    id: 'gravedirt', name: 'Grave Dirt', suit: 'chalices', rarity: 'common', cost: 1, numeral: 'X', tags: ['ward', 'draw'],
    text: (up) => `Gain <b>${u(up, 5, 7)}</b> Ward. Draw <b>1</b>.`,
    revText: (up) => `Gain <b>${u(up, 9, 12)}</b> Ward. Discard <b>1</b> at random.`,
    play: (c) => {
      if (c.rev) {
        ward(c, u(c.up, 9, 12));
        discardRandom(c.s, c.self, 1);
      } else {
        ward(c, u(c.up, 5, 7));
        drawCards(c.s, c.self, 1);
      }
    },
  },
  {
    id: 'nailhex', name: 'Nail Hex', suit: 'wands', rarity: 'common', cost: 1, numeral: 'XI', tags: ['hex'],
    text: (up) => `Apply <b>${u(up, 2, 3)}</b> Hex.`,
    revText: (up) => `Apply <b>${u(up, 4, 5)}</b> Hex. Gain <b>1</b> Hex.`,
    play: (c) => {
      foeSt(c, 'hex', c.rev ? u(c.up, 4, 5) : u(c.up, 2, 3));
      if (c.rev) selfSt(c, 'hex', 1);
    },
  },
  {
    id: 'rustnail', name: 'Rust Nail', suit: 'wands', rarity: 'common', cost: 1, numeral: 'XII', tags: ['attack', 'bleed'],
    text: (up) => `Deal <b>${u(up, 4, 6)}</b> damage. Apply <b>2</b> Bleed.`,
    revText: (up) => `Deal <b>1</b> damage. Apply <b>${u(up, 5, 7)}</b> Bleed.`,
    play: (c) => {
      hit(c, c.rev ? 1 : u(c.up, 4, 6));
      foeSt(c, 'bleed', c.rev ? u(c.up, 5, 7) : 2);
    },
  },
  {
    id: 'tallow', name: 'Tallow', suit: 'coins', rarity: 'common', cost: 0, numeral: 'XIII', tags: ['candle', 'ash'],
    text: (up) => `Gain <b>${u(up, 1, 2)}</b> candle. <i>Ash</i>.`,
    revText: (up) => `Gain <b>${u(up, 2, 3)}</b> candles. Lose <b>3</b> HP. <i>Ash</i>.`,
    play: (c) => {
      gainCandles(c.s, c.self, c.rev ? u(c.up, 2, 3) : u(c.up, 1, 2));
      if (c.rev) hurtSelf(c, 3);
    },
    ash: true,
  },
  {
    id: 'crowomen', name: "Crow's Omen", suit: 'coins', rarity: 'common', cost: 1, numeral: 'XIV', tags: ['omen', 'draw'],
    text: (up) => `Gain <b>1</b> Omen. Draw <b>${u(up, 1, 2)}</b>.`,
    revText: (up) => `Gain <b>2</b> Omen. Gain <b>${u(up, 1, 0)}</b> Dread.`,
    play: (c) => {
      if (c.rev) {
        selfSt(c, 'omen', 2);
        if (!c.up) selfSt(c, 'dread', 1);
      } else {
        selfSt(c, 'omen', 1);
        drawCards(c.s, c.self, u(c.up, 1, 2));
      }
    },
  },

  // ───────────── uncommon ─────────────
  {
    id: 'tower', name: 'The Tower', suit: 'blades', rarity: 'uncommon', cost: 2, numeral: 'XVI', tags: ['attack'],
    text: (up) => `Deal <b>${u(up, 16, 21)}</b> damage.`,
    revText: (up) => `Deal <b>${u(up, 26, 32)}</b> damage. Lose <b>8</b> HP.`,
    play: (c) => {
      hit(c, c.rev ? u(c.up, 26, 32) : u(c.up, 16, 21));
      if (c.rev) hurtSelf(c, 8);
    },
  },
  {
    id: 'wheel', name: 'Wheel of Fortune', suit: 'coins', rarity: 'uncommon', cost: 1, numeral: 'X', tags: ['chaos'],
    text: (up) => `Roll d6. <b>1</b> lose 4 HP · <b>2</b> ${up ? 10 : 8} Ward · <b>3</b> draw 2 · <b>4</b> deal ${up ? 12 : 10} · <b>5</b> +2 candles · <b>6</b> Omen, deal ${up ? 14 : 12}.`,
    revText: () => `Roll the Wheel <b>twice</b>. <i>Ash</i>.`,
    play: (c) => {
      const spins = c.rev ? 2 : 1;
      for (let i = 0; i < spins; i++) {
        const r = roll(c.s, c.self, 6, 'Wheel');
        const bonus = c.up ? 2 : 0;
        if (r === 1) hurtSelf(c, 4);
        else if (r === 2) ward(c, 8 + bonus);
        else if (r === 3) drawCards(c.s, c.self, 2);
        else if (r === 4) hit(c, 10 + bonus);
        else if (r === 5) gainCandles(c.s, c.self, 2);
        else {
          selfSt(c, 'omen', 1);
          hit(c, 12 + bonus);
        }
      }
    },
    ash: (rev) => rev,
  },
  {
    id: 'hanged', name: 'The Hanged Man', suit: 'wands', rarity: 'uncommon', cost: 1, numeral: 'XII', tags: ['candle', 'draw', 'ash'],
    text: (up) => `Next turn: gain <b>2</b> candles, draw <b>${u(up, 2, 3)}</b>. <i>Ash</i>.`,
    revText: (up) => `Gain <b>3</b> candles now. Lose <b>${u(up, 6, 4)}</b> HP. <i>Ash</i>.`,
    play: (c) => {
      if (c.rev) {
        gainCandles(c.s, c.self, 3);
        hurtSelf(c, u(c.up, 6, 4));
      } else {
        c.s.flags[`hangedC_${c.self}`] = (c.s.flags[`hangedC_${c.self}`] ?? 0) + 2;
        c.s.flags[`hangedD_${c.self}`] = (c.s.flags[`hangedD_${c.self}`] ?? 0) + u(c.up, 2, 3);
        trigger(c.s, c.self, 'The Hanged Man', 'Patience, upside down.');
      }
    },
    ash: true,
  },
  {
    id: 'moon', name: 'The Moon', suit: 'wands', rarity: 'uncommon', cost: 2, numeral: 'XVIII', tags: ['hex', 'bleed'],
    text: (up) => `Apply <b>${u(up, 3, 4)}</b> Hex and <b>${u(up, 3, 4)}</b> Bleed.`,
    revText: (up) => `Apply <b>${u(up, 6, 8)}</b> Bleed. Reveal every card in Jev's hand.`,
    play: (c) => {
      if (c.rev) {
        foeSt(c, 'bleed', u(c.up, 6, 8));
        if (c.self === 'player') c.s.jev.peeked = c.s.jev.hand.map((h) => h.uid);
      } else {
        foeSt(c, 'hex', u(c.up, 3, 4));
        foeSt(c, 'bleed', u(c.up, 3, 4));
      }
    },
  },
  {
    id: 'deathtoll', name: "Death's Toll", suit: 'blades', rarity: 'uncommon', cost: 0, toll: 6, numeral: 'XIII', tags: ['attack', 'toll'],
    text: (up) => `<i>Toll 6</i>. Deal <b>${u(up, 18, 23)}</b> <i>Pierce</i> damage.`,
    revText: (up) => `<i>Toll 10</i>. Deal <b>${u(up, 26, 32)}</b> <i>Pierce</i> damage.`,
    play: (c) => hit(c, c.rev ? u(c.up, 26, 32) : u(c.up, 18, 23), true),
  },
  {
    id: 'nailthread', name: 'Nail & Thread', suit: 'wands', rarity: 'uncommon', cost: 1, numeral: 'XV', tags: ['dread'],
    text: (up) => `Apply <b>${u(up, 1, 2)}</b> Dread. ${up ? '' : '<i>Ash</i>.'}`,
    revText: (up) => `Apply <b>${u(up, 2, 3)}</b> Dread. Lose <b>5</b> HP. <i>Ash</i>.`,
    play: (c) => {
      foeSt(c, 'dread', c.rev ? u(c.up, 2, 3) : u(c.up, 1, 2));
      if (c.rev) hurtSelf(c, 5);
    },
    ash: true,
    lore: 'Sew the mouth that bargains.',
  },
  {
    id: 'ashenvow', name: 'Ashen Vow', suit: 'wands', rarity: 'uncommon', cost: 1, numeral: 'XX', tags: ['sigil', 'ash'],
    text: (up) => `<i>Sigil</i>. Whenever a card burns to <i>Ash</i>, deal <b>${u(up, 5, 7)}</b> damage.`,
    revText: (up) => `<i>Sigil</i>. Whenever a card burns to <i>Ash</i>, deal <b>${u(up, 9, 11)}</b> and lose <b>1</b> HP.`,
    play: () => {},
    sigil: true,
  },
  {
    id: 'bloodletting', name: 'Bloodletting', suit: 'coins', rarity: 'uncommon', cost: 0, numeral: 'XXI', tags: ['candle', 'toll'],
    text: (up) => `Lose <b>3</b> HP. Gain <b>${u(up, 2, 3)}</b> candles.`,
    revText: (up) => `Lose <b>6</b> HP. Gain <b>${u(up, 3, 4)}</b> candles. Draw <b>1</b>.`,
    play: (c) => {
      hurtSelf(c, c.rev ? 6 : 3);
      gainCandles(c.s, c.self, c.rev ? u(c.up, 3, 4) : u(c.up, 2, 3));
      if (c.rev) drawCards(c.s, c.self, 1);
    },
  },
  {
    id: 'mirror', name: 'Drowned Mirror', suit: 'chalices', rarity: 'uncommon', cost: 1, numeral: 'XXII', tags: ['chaos'],
    text: (up) => `Replay the last card you played this turn${up ? ', for free' : ''}.`,
    revText: () => `Replay it <b>twice</b>. <i>Ash</i>.`,
    play: (c) => {
      const last = F(c.s, c.self).lastPlayed;
      if (!last || last.id === 'mirror') return trigger(c.s, c.self, 'Drowned Mirror', 'Nothing to reflect.');
      const times = c.rev ? 2 : 1;
      for (let i = 0; i < times; i++) {
        trigger(c.s, c.self, 'Drowned Mirror', getCard(last.id).name);
        getCard(last.id).play({ ...c, rev: last.rev, up: last.up, card: last });
      }
    },
    ash: (rev) => rev,
  },
  {
    id: 'reaper', name: "Reaper's Arc", suit: 'blades', rarity: 'uncommon', cost: 2, numeral: 'XXIII', tags: ['attack', 'bleed'],
    text: (up) => `Deal <b>${u(up, 8, 11)}</b> damage, +<b>3</b> per Bleed on the foe.`,
    revText: (up) => `Consume all Bleed on the foe. Deal <b>${u(up, 4, 5)}</b> per stack.`,
    play: (c) => {
      const b = st(c.s, c.foe, 'bleed');
      if (c.rev) {
        applyStatus(c.s, c.foe, 'bleed', -b);
        hit(c, b * u(c.up, 4, 5));
      } else hit(c, u(c.up, 8, 11) + b * 3);
    },
  },
  {
    id: 'bonechapel', name: 'Bone Chapel', suit: 'chalices', rarity: 'uncommon', cost: 2, numeral: 'XXIV', tags: ['ward'],
    text: (up) => `Gain <b>${u(up, 14, 18)}</b> Ward.`,
    revText: (up) => `Gain <b>${u(up, 22, 28)}</b> Ward. Gain <b>2</b> Frail.`,
    play: (c) => {
      ward(c, c.rev ? u(c.up, 22, 28) : u(c.up, 14, 18));
      if (c.rev) selfSt(c, 'frail', 2);
    },
  },

  // ───────────── rare ─────────────
  {
    id: 'death', name: 'Death', suit: 'blades', rarity: 'rare', cost: 3, numeral: 'XIII', tags: ['attack'],
    text: (up) => `Deal <b>${u(up, 28, 36)}</b> damage. If it kills, heal <b>10</b>.`,
    revText: (up) => `Deal <b>${u(up, 42, 50)}</b> damage. Lose <b>8</b> HP. <i>Ash</i>.`,
    play: (c) => {
      hit(c, c.rev ? u(c.up, 42, 50) : u(c.up, 28, 36));
      if (c.rev) hurtSelf(c, 8);
      else if (F(c.s, c.foe).hp <= 0) {
        c.s.phase = 'player'; // let the heal land before combat closes
        heal(c.s, c.self, 10, 'Death');
        c.s.phase = 'over';
      }
    },
    ash: (rev) => rev,
  },
  {
    id: 'star', name: 'The Star', suit: 'chalices', rarity: 'rare', cost: 2, numeral: 'XVII', tags: ['heal', 'ash'],
    text: (up) => `Heal <b>${u(up, 8, 12)}</b>. Cleanse all. <i>Ash</i>.`,
    revText: (up) => `Heal <b>${u(up, 16, 20)}</b>. Gain <b>2</b> Frail. <i>Ash</i>.`,
    play: (c) => {
      heal(c.s, c.self, c.rev ? u(c.up, 16, 20) : u(c.up, 8, 12));
      if (c.rev) selfSt(c, 'frail', 2);
      else cleanse(c.s, c.self);
    },
    ash: true,
  },
  {
    id: 'sun', name: 'The Sun', suit: 'coins', rarity: 'rare', cost: 2, numeral: 'XIX', tags: ['sigil', 'candle'],
    text: (up) => `<i>Sigil</i>. Gain <b>1</b> extra candle each turn.${up ? ' Draw 1 now.' : ''}`,
    revText: () => `<i>Sigil</i>. Gain <b>2</b> extra candles each turn. Lose <b>2</b> HP each turn.`,
    play: (c) => {
      if (c.up) drawCards(c.s, c.self, 1);
    },
    sigil: true,
  },
  {
    id: 'magician', name: 'The Magician', suit: 'coins', rarity: 'rare', cost: 1, numeral: 'I', tags: ['chaos'],
    text: (up) => `Your next card this turn is played twice.${up ? ' Draw 1.' : ''}`,
    revText: () => `Your next <b>2</b> cards are played twice. Lose <b>5</b> HP.`,
    play: (c) => {
      selfSt(c, 'twice', c.rev ? 2 : 1);
      if (c.rev) hurtSelf(c, 5);
      else if (c.up) drawCards(c.s, c.self, 1);
    },
  },
  {
    id: 'judgement', name: 'Judgement', suit: 'blades', rarity: 'rare', cost: 2, numeral: 'XX', tags: ['attack'],
    text: (up) => `Deal <b>${u(up, 3, 4)}</b> damage for each card in your discard pile.`,
    revText: (up) => `Shuffle your discard into your deck. Deal <b>${u(up, 2, 3)}</b> per card shuffled.`,
    play: (c) => {
      const f = F(c.s, c.self);
      const n = f.discard.length;
      if (c.rev) {
        f.draw.push(...f.discard.splice(0));
        hit(c, n * u(c.up, 2, 3));
      } else hit(c, n * u(c.up, 3, 4));
    },
  },
  {
    id: 'bargain', name: "Devil's Bargain", suit: 'wands', rarity: 'rare', cost: 0, numeral: 'XV', tags: ['fury'],
    text: (up) => `Gain <b>${u(up, 3, 4)}</b> Fury. Shuffle a <i>Doubt</i> into your deck.`,
    revText: (up) => `Gain <b>${u(up, 5, 6)}</b> Fury. Lose <b>8</b> HP. <i>Ash</i>.`,
    play: (c) => {
      if (c.rev) {
        selfSt(c, 'fury', u(c.up, 5, 6));
        hurtSelf(c, 8);
      } else {
        selfSt(c, 'fury', u(c.up, 3, 4));
        addCard(c.s, c.self, 'doubt', 'draw');
      }
    },
    ash: (rev) => rev,
  },

  // ───────────── curse ─────────────
  {
    id: 'doubt', name: 'Doubt', suit: 'curse', rarity: 'curse', cost: 0, numeral: '0', tags: [],
    text: () => `<i>Unplayable</i>. It weighs on your hand.`,
    revText: () => `<i>Unplayable</i>. It weighs on your hand.`,
    play: () => {},
    unplayable: true,
    lore: 'What if you already lost?',
  },

  // ───────────── Jev's deck ─────────────
  {
    id: 'j_bite', name: 'Bite', suit: 'blades', rarity: 'jev', cost: 1, numeral: 'I', tags: ['attack'], intent: 'strike',
    text: () => `Deal <b>5</b> damage.`,
    revText: () => `Deal <b>8</b> damage. Gain <b>1</b> Bleed.`,
    play: (c) => (c.rev ? (hit(c, 8), selfSt(c, 'bleed', 1)) : hit(c, 5)),
  },
  {
    id: 'j_rake', name: 'Rake', suit: 'blades', rarity: 'jev', cost: 2, numeral: 'II', tags: ['attack'], intent: 'strike',
    text: () => `Deal <b>11</b> damage.`,
    revText: () => `Deal <b>15</b> damage. Lose <b>3</b> HP.`,
    play: (c) => (c.rev ? (hit(c, 15), hurtSelf(c, 3)) : hit(c, 11)),
  },
  {
    id: 'j_twinfang', name: 'Twin Fang', suit: 'blades', rarity: 'jev', cost: 1, numeral: 'III', tags: ['attack'], intent: 'strike',
    text: () => `Deal <b>3</b> damage twice.`,
    revText: () => `Deal <b>2</b> damage four times.`,
    play: (c) => {
      const t = c.rev ? 4 : 2;
      for (let i = 0; i < t; i++) hit(c, c.rev ? 2 : 3);
    },
  },
  {
    id: 'j_carapace', name: 'Carapace', suit: 'chalices', rarity: 'jev', cost: 1, numeral: 'IV', tags: ['ward'], intent: 'guard',
    text: () => `Gain <b>8</b> Ward.`,
    revText: () => `Gain <b>12</b> Ward. Gain <b>1</b> Frail.`,
    play: (c) => (c.rev ? (ward(c, 12), selfSt(c, 'frail', 1)) : ward(c, 8)),
  },
  {
    id: 'j_evileye', name: 'Evil Eye', suit: 'wands', rarity: 'jev', cost: 1, numeral: 'V', tags: ['hex'], intent: 'curse',
    text: () => `Apply <b>2</b> Hex.`,
    revText: () => `Apply <b>3</b> Hex. Gain <b>1</b> Hex.`,
    play: (c) => {
      foeSt(c, 'hex', c.rev ? 3 : 2);
      if (c.rev) selfSt(c, 'hex', 1);
    },
  },
  {
    id: 'j_leech', name: 'Leech', suit: 'blades', rarity: 'jev', cost: 1, numeral: 'VI', tags: ['attack', 'heal'], intent: 'strike',
    text: () => `Deal <b>5</b> damage. Heal <b>4</b>.`,
    revText: () => `Deal <b>9</b> damage.`,
    play: (c) => {
      hit(c, c.rev ? 9 : 5);
      if (!c.rev) heal(c.s, c.self, 4);
    },
  },
  {
    id: 'j_hook', name: 'Gutting Hook', suit: 'wands', rarity: 'jev', cost: 1, numeral: 'VII', tags: ['attack', 'bleed'], intent: 'strike',
    text: () => `Deal <b>2</b> damage. Apply <b>2</b> Bleed.`,
    revText: () => `Deal <b>1</b> damage. Apply <b>4</b> Bleed.`,
    play: (c) => {
      hit(c, c.rev ? 1 : 2);
      foeSt(c, 'bleed', c.rev ? 4 : 2);
    },
  },
  {
    id: 'j_grin', name: 'Wide Grin', suit: 'wands', rarity: 'jev', cost: 1, numeral: 'VIII', tags: ['fury'], intent: 'trick',
    text: () => `Gain <b>1</b> Fury.`,
    revText: () => `Gain <b>2</b> Fury. Lose <b>4</b> HP.`,
    play: (c) => {
      selfSt(c, 'fury', c.rev ? 2 : 1);
      if (c.rev) hurtSelf(c, 4);
    },
  },
  {
    id: 'j_sleight', name: 'Sleight', suit: 'coins', rarity: 'jev', cost: 0, numeral: 'IX', tags: ['candle'], intent: 'trick',
    text: () => `Gain <b>1</b> candle.`,
    revText: () => `Gain <b>2</b> candles. Lose <b>3</b> HP.`,
    play: (c) => {
      gainCandles(c.s, c.self, c.rev ? 2 : 1);
      if (c.rev) hurtSelf(c, 3);
    },
  },
  {
    id: 'j_bell', name: 'Bell Toll', suit: 'blades', rarity: 'jev', cost: 2, numeral: 'X', tags: ['attack'], intent: 'strike',
    text: () => `Deal <b>13</b> damage.`,
    revText: () => `Deal <b>16</b> <i>Pierce</i> damage. Gain <b>1</b> Hex.`,
    play: (c) => {
      if (c.rev) {
        hit(c, 16, true);
        selfSt(c, 'hex', 1);
      } else hit(c, 13);
    },
  },
  {
    id: 'j_shard', name: 'Mirror Shard', suit: 'blades', rarity: 'jev', cost: 1, numeral: 'XI', tags: ['attack'], intent: 'strike',
    text: () => `Deal <b>4</b> <i>Pierce</i> damage, + half the foe's Ward.`,
    revText: () => `Deal <b>2</b> <i>Pierce</i> damage, + the foe's full Ward.`,
    play: (c) => {
      const w = F(c.s, c.foe).ward;
      hit(c, c.rev ? 2 + w : 4 + Math.floor(w / 2), true);
    },
  },
  {
    id: 'j_snuff', name: 'Snuff', suit: 'wands', rarity: 'jev', cost: 1, numeral: 'XII', tags: ['dread'], intent: 'curse',
    text: () => `Apply <b>1</b> Dread.`,
    revText: () => `Apply <b>2</b> Dread. Lose <b>3</b> HP.`,
    play: (c) => {
      foeSt(c, 'dread', c.rev ? 2 : 1);
      if (c.rev) hurtSelf(c, 3);
    },
  },
  {
    id: 'j_veil', name: 'Veil', suit: 'chalices', rarity: 'jev', cost: 1, numeral: 'XIII', tags: ['ward'], intent: 'guard',
    text: () => `Gain <b>1</b> Veil and <b>3</b> Ward.`,
    revText: () => `Gain <b>2</b> Veil. Gain <b>1</b> Frail.`,
    play: (c) => {
      selfSt(c, 'veil', c.rev ? 2 : 1);
      if (c.rev) selfSt(c, 'frail', 1);
      else ward(c, 3);
    },
  },
  {
    id: 'j_ossify', name: 'Ossify', suit: 'chalices', rarity: 'jev', cost: 1, numeral: 'XIV', tags: ['ward', 'thorns'], intent: 'guard',
    text: () => `Gain <b>5</b> Ward and <b>2</b> Thorns.`,
    revText: () => `Gain <b>5</b> Thorns.`,
    play: (c) => {
      if (!c.rev) ward(c, 5);
      selfSt(c, 'thorns', c.rev ? 5 : 2);
    },
  },
  {
    id: 'j_bolt', name: "Tower's Bolt", suit: 'blades', rarity: 'jev', cost: 2, numeral: 'XV', tags: ['attack'], intent: 'strike',
    text: () => `Deal <b>14</b> damage. Lose <b>4</b> HP.`,
    revText: () => `Deal <b>18</b> damage to the foe <i>and</i> to Jev.`,
    play: (c) => {
      hit(c, c.rev ? 18 : 14);
      hurtSelf(c, c.rev ? 18 : 4);
    },
  },
  {
    id: 'j_pale', name: 'Pale Card', suit: 'wands', rarity: 'jev', cost: 1, numeral: 'XVI', tags: ['chaos'], intent: 'curse',
    text: () => `Shuffle a <i>Doubt</i> into the foe's deck. Gain <b>3</b> Ward.`,
    revText: () => `Shuffle <b>2</b> <i>Doubt</i> into the foe's deck.`,
    play: (c) => {
      addCard(c.s, c.foe, 'doubt', 'draw');
      if (c.rev) addCard(c.s, c.foe, 'doubt', 'draw');
      else ward(c, 3);
    },
  },
  {
    id: 'j_ledger', name: 'Open Ledger', suit: 'coins', rarity: 'jev', cost: 2, numeral: 'XVII', tags: ['chaos'], intent: 'trick',
    text: () => `Roll d6. <b>1–3</b>: gain 10 Ward. <b>4–6</b>: deal 12 damage.`,
    revText: () => `Roll d6. Deal that ×3 damage.`,
    play: (c) => {
      const r = roll(c.s, c.self, 6, 'Ledger');
      if (c.rev) hit(c, r * 3);
      else if (r <= 3) ward(c, 10);
      else hit(c, 12);
    },
  },
];

const byId = new Map(defs.map((d) => [d.id, d]));

export function getCard(id: string): CardDef {
  const d = byId.get(id);
  if (!d) throw new Error(`Unknown card: ${id}`);
  return d;
}

export const allCards = defs;
export const playerPool = defs.filter((d) => ['common', 'uncommon', 'rare'].includes(d.rarity));
export const jevCards = defs.filter((d) => d.rarity === 'jev');

export const STARTER_DECK = ['strike', 'strike', 'strike', 'strike', 'ward', 'ward', 'ward', 'ward', 'cutpalm', 'reading'];

export function isAsh(def: CardDef, rev: boolean) {
  return typeof def.ash === 'function' ? def.ash(rev) : !!def.ash;
}

export function tollOf(def: CardDef, rev: boolean) {
  if (!def.toll) return 0;
  return rev ? def.toll + 4 : def.toll;
}

export function intentOf(def: CardDef) {
  if (def.intent) return def.intent;
  if (def.tags.includes('attack')) return 'strike';
  if (def.tags.includes('ward') || def.tags.includes('heal')) return 'guard';
  if (def.tags.some((t) => ['hex', 'bleed', 'dread'].includes(t))) return 'curse';
  return 'trick';
}

