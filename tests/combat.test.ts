import { describe, expect, it } from 'vitest';
import { makeRng, next } from '../src/core/rng.ts';
import { createCombat, endJevTurn, endPlayerTurn, playCard, type CombatSetup } from '../src/game/combat.ts';
import { allCards, getCard } from '../src/game/cards.ts';
import { dealDamage, gainWard, applyStatus } from '../src/game/ops.ts';
import type { CardInst, CombatState } from '../src/game/types.ts';

const setup = (over: Partial<CombatSetup> = {}): CombatSetup => ({
  seed: 42,
  player: { hp: 60, maxHp: 60, deck: Array.from({ length: 10 }, () => ({ id: 'strike', up: false })) },
  trinkets: [],
  mask: 'fool',
  mutations: [],
  stolen: [],
  ...over,
});

/** Put a specific card into the player's hand and return it. */
function give(s: CombatState, id: string, rev = false, up = false): CardInst {
  const c = { uid: s.nextUid++, id, rev, up };
  s.player.hand.push(c);
  return c;
}

describe('rng', () => {
  it('is deterministic per seed', () => {
    const a = makeRng(7);
    const b = makeRng(7);
    expect([next(a), next(a), next(a)]).toEqual([next(b), next(b), next(b)]);
  });
});

describe('combat basics', () => {
  it('starts with 5 cards, 3 candles and Jev holding its hand', () => {
    const s = createCombat(setup());
    expect(s.player.hand).toHaveLength(5);
    expect(s.player.candles).toBe(3);
    expect(s.jev.hand).toHaveLength(4);
  });

  it('ward absorbs damage before HP', () => {
    const s = createCombat(setup());
    gainWard(s, 'player', 5);
    dealDamage(s, 'jev', 'player', 8);
    expect(s.player.ward).toBe(0);
    expect(s.player.hp).toBe(57);
  });

  it('pierce ignores ward', () => {
    const s = createCombat(setup());
    gainWard(s, 'player', 10);
    dealDamage(s, 'jev', 'player', 6, { pierce: true });
    expect(s.player.ward).toBe(10);
    expect(s.player.hp).toBe(54);
  });

  it('hex reduces attack damage by 25%', () => {
    const s = createCombat(setup());
    applyStatus(s, 'player', 'hex', 1);
    const hp = s.jev.hp;
    dealDamage(s, 'player', 'jev', 8);
    expect(hp - s.jev.hp).toBe(6);
  });

  it('reversed Strike hits harder and costs HP', () => {
    const s = createCombat(setup());
    const c = give(s, 'strike', true);
    const jevHp = s.jev.hp;
    playCard(s, 'player', c.uid);
    expect(jevHp - s.jev.hp).toBe(9);
    expect(s.player.hp).toBe(58);
  });

  it('omen doubles the next attack card only', () => {
    const s = createCombat(setup());
    s.player.st.omen = 1;
    const a = give(s, 'strike');
    const b = give(s, 'strike');
    const hp0 = s.jev.hp;
    playCard(s, 'player', a.uid);
    expect(hp0 - s.jev.hp).toBe(12);
    const hp1 = s.jev.hp;
    playCard(s, 'player', b.uid);
    expect(hp1 - s.jev.hp).toBe(6);
  });

  it('bleed ticks at turn start and decays', () => {
    const s = createCombat(setup());
    s.jev.st.bleed = 4;
    const hp = s.jev.hp;
    s.jev.hand = []; // Jev passes
    endPlayerTurn(s);
    expect(hp - s.jev.hp).toBe(4);
    expect(s.jev.st.bleed).toBe(3);
  });

  it('ash cards leave the deck; others go to discard', () => {
    const s = createCombat(setup());
    const t = give(s, 'tallow');
    const k = give(s, 'strike');
    playCard(s, 'player', t.uid);
    playCard(s, 'player', k.uid);
    expect(s.player.ash.map((c) => c.id)).toContain('tallow');
    expect(s.player.discard.map((c) => c.id)).toContain('strike');
  });

  it('cannot play without candles', () => {
    const s = createCombat(setup());
    s.player.candles = 0;
    const c = give(s, 'strike');
    expect(playCard(s, 'player', c.uid)).toBe(false);
  });

  it('killing Jev ends the fight with the player winning', () => {
    const s = createCombat(setup());
    s.jev.hp = 5;
    const c = give(s, 'strike');
    playCard(s, 'player', c.uid);
    expect(s.phase).toBe('over');
    expect(s.winner).toBe('player');
  });

  it('boss enters phase two at half HP and shuffles in stolen cards', () => {
    const s = createCombat(setup({ mask: 'jev', stolen: ['tower', 'lunge'] }));
    const before = s.jev.draw.length + s.jev.hand.length;
    s.jev.hp = s.jev.maxHp / 2 + 3;
    const c = give(s, 'strike');
    playCard(s, 'player', c.uid);
    expect(s.jev.phase).toBe(2);
    expect(s.jev.draw.length + s.jev.hand.length).toBe(before + 2);
  });

  it('a full turn cycle returns control to the player', () => {
    const s = createCombat(setup());
    endPlayerTurn(s);
    expect(s.phase).toBe('jev');
    endJevTurn(s);
    expect(s.phase).toBe('player');
    expect(s.turn).toBe(2);
  });

  it('every card can be played upright and reversed, by either side, without throwing', () => {
    for (const def of allCards) {
      if (def.unplayable) continue;
      for (const rev of [false, true]) {
        for (const up of [false, true]) {
          const s = createCombat(setup());
          s.player.candles = 9;
          s.player.discard.push({ uid: 999, id: 'strike', rev: false, up: false });
          const c = give(s, def.id, rev, up);
          expect(() => playCard(s, 'player', c.uid), `${def.id} rev=${rev} up=${up}`).not.toThrow();
          expect(typeof getCard(def.id).text(up)).toBe('string');
        }
      }
    }
  });
});

describe('mutations', () => {
  it('Sundering Gaze breaks ward twice as fast', () => {
    const s = createCombat(setup({ mutations: ['sunder'] }));
    gainWard(s, 'player', 10);
    dealDamage(s, 'jev', 'player', 4);
    expect(s.player.ward).toBe(2);
    expect(s.player.hp).toBe(60);
  });

  it('Toll Keeper charges HP from the 4th card', () => {
    const s = createCombat(setup({ mutations: ['tollkeeper'] }));
    s.player.candles = 9;
    const cards = [give(s, 'reading'), give(s, 'reading'), give(s, 'reading'), give(s, 'reading')];
    for (const c of cards) playCard(s, 'player', c.uid);
    expect(s.player.hp).toBe(58);
  });
});
