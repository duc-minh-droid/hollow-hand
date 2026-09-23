// Code owns the rules: enumerate every legal line of play for Jev's turn, simulate it,
// and score it. The Jev model then chooses among these — it never invents a move.
import { canPlay, cloneForSim, playCard } from '../game/combat.ts';
import { getCard } from '../game/cards.ts';
import type { CombatState } from '../game/types.ts';
import { MASKS } from './masks.ts';
import { habits, type Profile } from './profile.ts';

export interface Plan {
  key: string; // stable id for the model's Choice ("p0", "p1", …)
  uids: number[];
  names: string[];
  score: number; // heuristic value
  outcome: Outcome;
  summary: string;
}

export interface Outcome {
  dmgToPlayer: number;
  jevHpLoss: number;
  jevWard: number;
  playerHp: number;
  jevHp: number;
  kills: boolean;
  suicide: boolean;
  playerStatus: string[];
  jevStatus: string[];
  candlesLeft: number;
}

const MAX_DEPTH = 5;
const MAX_NODES = 400;

export function enumeratePlans(s: CombatState, profile: Profile): Plan[] {
  const found = new Map<string, Plan>();
  let nodes = 0;
  const visit = (state: CombatState, uids: number[]) => {
    const plan = evaluate(s, state, uids, profile);
    // Order matters (Omen, Sleight), so keep the best ordering per set of cards.
    const setKey = uids.slice().sort((a, b) => a - b).join(',');
    const prev = found.get(setKey);
    if (!prev || plan.score > prev.score) found.set(setKey, plan);
    if (uids.length >= MAX_DEPTH || state.phase === 'over') return;
    for (const c of state.jev.hand) {
      if (nodes >= MAX_NODES) return;
      if (!canPlay(state, 'jev', c.uid).ok) continue;
      nodes++;
      const nextState = cloneForSim(state);
      playCard(nextState, 'jev', c.uid);
      visit(nextState, [...uids, c.uid]);
    }
  };
  visit(cloneForSim(s), []);
  const plans = [...found.values()].sort((a, b) => b.score - a.score);
  plans.forEach((p, i) => (p.key = `p${i}`));
  return plans;
}

function statusList(st: CombatState['player']['st']) {
  return Object.entries(st)
    .filter(([, n]) => (n ?? 0) > 0)
    .map(([k, n]) => `${n} ${k}`);
}

function evaluate(s0: CombatState, r: CombatState, uids: number[], profile: Profile): Plan {
  const names = uids.map((uid) => {
    const c = s0.jev.hand.find((h) => h.uid === uid)!;
    return getCard(c.id).name + (c.rev ? ' (reversed)' : '');
  });
  const outcome: Outcome = {
    dmgToPlayer: s0.player.hp - r.player.hp,
    jevHpLoss: s0.jev.hp - r.jev.hp,
    jevWard: r.jev.ward,
    playerHp: Math.max(0, r.player.hp),
    jevHp: Math.max(0, r.jev.hp),
    kills: r.player.hp <= 0,
    suicide: r.jev.hp <= 0,
    playerStatus: statusList(r.player.st),
    jevStatus: statusList(r.jev.st),
    candlesLeft: r.jev.candles,
  };
  const score = scoreOutcome(s0, r, outcome, profile);
  const summary = uids.length
    ? `Play ${names.join(', then ')}. Player takes ${outcome.dmgToPlayer} (HP ${s0.player.hp}→${outcome.playerHp}); ` +
      `Jev ${outcome.jevHpLoss > 0 ? `loses ${outcome.jevHpLoss} HP, ` : ''}ends with ${outcome.jevWard} Ward` +
      (outcome.playerStatus.length ? `; player afflicted: ${outcome.playerStatus.join(', ')}` : '') +
      (outcome.kills ? '. KILLS THE PLAYER.' : '.')
    : 'Hold: play nothing this turn and keep candles unused.';
  return { key: '', uids, names, score, outcome, summary };
}

/** Rough estimate of how hard the player can hit Jev next turn. */
export function playerThreat(s: CombatState, profile: Profile) {
  const perTurn = profile.turns ? profile.dmgTotal / profile.turns : 8;
  const fury = s.player.st.fury ?? 0;
  const omen = s.player.st.omen ? 1.5 : 1;
  return Math.max(5, (perTurn + fury * 2) * omen);
}

export function scoreOutcome(s0: CombatState, r: CombatState, o: Outcome, profile: Profile) {
  if (o.suicide) return -1000;
  if (o.kills) return 1000 - o.jevHpLoss;
  const h = habits(profile);
  const persona = MASKS[s0.jev.mask]?.id;
  const threat = playerThreat(s0, profile);
  const jevHpFrac = s0.jev.hp / s0.jev.maxHp;
  const playerHpFrac = s0.player.hp / s0.player.maxHp;

  let wAtk = 1 + (playerHpFrac < 0.35 ? 0.6 : 0);
  let wDef = 0.75 + (jevHpFrac < 0.4 ? 0.5 : 0) + h.burst * 0.4;
  let wCurse = 1;
  if (persona === 'tower') wAtk += 0.35;
  if (persona === 'hanged') wCurse += 0.5;
  if (persona === 'moon') wDef += 0.1;
  if (persona === 'fool') wAtk += 0.1;

  const effectiveWard = Math.min(o.jevWard, threat * 1.2);
  const ps = r.player.st;
  const js = r.jev.st;
  const doubtsAdded = r.player.draw.filter((c) => c.id === 'doubt').length - s0.player.draw.filter((c) => c.id === 'doubt').length;
  const curse =
    ((ps.bleed ?? 0) - (s0.player.st.bleed ?? 0)) * 1.7 +
    ((ps.hex ?? 0) - (s0.player.st.hex ?? 0)) * (2 + h.attack * 2) +
    ((ps.dread ?? 0) - (s0.player.st.dread ?? 0)) * 5 +
    Math.max(0, doubtsAdded) * 3;
  const buffs =
    ((js.fury ?? 0) - (s0.jev.st.fury ?? 0)) * 3.2 +
    ((js.veil ?? 0) - (s0.jev.st.veil ?? 0)) * Math.min(12, threat * 0.6) +
    ((js.thorns ?? 0) - (s0.jev.st.thorns ?? 0)) * (1 + h.multihit * 2 + h.attack);

  return (
    o.dmgToPlayer * wAtk +
    effectiveWard * wDef +
    curse * wCurse +
    buffs -
    o.jevHpLoss * 1.3 -
    o.candlesLeft * 0.4
  );
}
