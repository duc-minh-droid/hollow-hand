import { describe, expect, it } from 'vitest';
import { makeRng } from '../src/core/rng.ts';
import { createCombat, type CombatSetup } from '../src/game/combat.ts';
import { getCard } from '../src/game/cards.ts';
import { decideTurn } from '../src/jev/brain.ts';
import { enumeratePlans } from '../src/jev/candidates.ts';
import { evolve, mutationWeights } from '../src/jev/evolve.ts';
import { newProfile, habits, favorite, type Profile } from '../src/jev/profile.ts';
import type { askJev, Question } from '../src/jev/jevClient.ts';

const setup = (over: Partial<CombatSetup> = {}): CombatSetup => ({
  seed: 9,
  player: { hp: 50, maxHp: 50, deck: Array.from({ length: 10 }, () => ({ id: 'strike', up: false })) },
  trinkets: [], mask: 'tower', mutations: [], stolen: [], ...over,
});

const offline: typeof askJev = async () => null;

function wardyProfile(): Profile {
  const p = newProfile();
  p.turns = 10;
  p.cards = 30;
  p.tags = { ward: 22, attack: 8 };
  p.wardTotal = 150;
  p.plays = { ward: 20, strike: 8, bonechapel: 2 };
  return p;
}

describe('candidates', () => {
  it('only produces affordable plans and includes holding', () => {
    const s = createCombat(setup());
    s.phase = 'jev';
    s.jev.candles = 3;
    const plans = enumeratePlans(s, newProfile());
    expect(plans.some((p) => p.uids.length === 0)).toBe(true);
    for (const p of plans) {
      const cost = p.uids.reduce((a, uid) => a + getCard(s.jev.hand.find((c) => c.uid === uid)!.id).cost, 0);
      expect(cost).toBeLessThanOrEqual(3); // the Tower deck has no candle gain
      expect(p.summary.length).toBeGreaterThan(0);
    }
  });

  it('simulation does not mutate the real state', () => {
    const s = createCombat(setup());
    s.phase = 'jev';
    const snapshot = JSON.stringify({ p: s.player, j: s.jev });
    enumeratePlans(s, newProfile());
    expect(JSON.stringify({ p: s.player, j: s.jev })).toBe(snapshot);
  });
});

describe('brain', () => {
  it('always takes a lethal line', async () => {
    const s = createCombat(setup());
    s.phase = 'jev';
    s.jev.candles = 3;
    s.jev.hand = [{ uid: 900, id: 'j_rake', rev: false, up: false }, { uid: 901, id: 'j_carapace', rev: false, up: false }];
    s.player.hp = 5;
    const d = await decideTurn(s, { profile: newProfile(), grudge: 0, ask: offline });
    expect(d.source).toBe('lethal');
    expect(d.plan.uids).toContain(900);
  });

  it('falls back to instinct when Jev is unreachable', async () => {
    const s = createCombat(setup());
    s.phase = 'jev';
    const d = await decideTurn(s, { profile: newProfile(), grudge: 0, ask: offline });
    expect(d.source).toBe('instinct');
    expect(d.plans.length).toBeGreaterThan(0);
  });

  it("follows Jev's choice when it is confident", async () => {
    const s = createCombat(setup());
    s.phase = 'jev';
    s.player.hp = 50;
    let asked: Record<string, Question> = {};
    const ask: typeof askJev = async (_state, questions) => {
      asked = questions;
      const keys = Object.keys((questions.plan as { criteria: Record<string, string> }).criteria);
      const last = keys[keys.length - 1];
      return {
        plan: { choice: last, confidence: 0.99, probabilities: Object.fromEntries(keys.map((k) => [k, k === last ? 1 : 0])) },
        threat: { score: 2, confidence: 0.8, probabilities: {} },
        taunt: { choice: 'menace', confidence: 0.9, probabilities: {} },
      };
    };
    const picks = new Set<string>();
    for (let i = 0; i < 5; i++) {
      const d = await decideTurn(s, { profile: newProfile(), grudge: 0, ask });
      expect(d.source).toBe('jev');
      picks.add(d.plan.key);
      expect(d.taunt).toBe('menace');
    }
    expect(asked.plan).toBeDefined();
    // With 75% trust on a one-hot answer, Jev's pick should dominate.
    const keys = Object.keys((asked.plan as { criteria: Record<string, string> }).criteria);
    expect(picks.has(keys[keys.length - 1])).toBe(true);
  });
});

describe('evolution', () => {
  it('habits reflect ward-heavy play', () => {
    const h = habits(wardyProfile());
    expect(h.ward).toBeGreaterThan(h.attack);
    expect(h.ward).toBeGreaterThan(0.8);
  });

  it('ward-heavy players make Sundering Gaze the likeliest counter', () => {
    const w = mutationWeights(wardyProfile(), []);
    const best = Object.entries(w).sort((a, b) => b[1] - a[1])[0][0];
    expect(best).toBe('sunder');
  });

  it('offline evolution picks a counter and steals the signature card', async () => {
    const e = await evolve(makeRng(1), wardyProfile(), [], [], offline);
    expect(e.mutation).toBeDefined();
    expect(e.stolen).toBe(favorite(wardyProfile()));
    expect(e.stolen).toBe('bonechapel');
    expect(e.read.length).toBeGreaterThan(0);
  });

  it('never re-inks an owned mutation', () => {
    const w = mutationWeights(wardyProfile(), ['sunder']);
    expect('sunder' in w).toBe(false);
  });
});
