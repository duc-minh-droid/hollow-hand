// Headless balance sim: a greedy bot vs each mask with Jev on offline instinct.
//   node scripts/balance.ts [masks]        starter deck
//   BUILT=1 node scripts/balance.ts jev    mid-run deck (for elite/boss)
import { createCombat, canPlay, playCard, endPlayerTurn, endJevTurn } from '../src/game/combat.ts';
import { getCard, STARTER_DECK } from '../src/game/cards.ts';
import { decideTurn } from '../src/jev/brain.ts';
import { newProfile } from '../src/jev/profile.ts';
import type { CombatState } from '../src/game/types.ts';

const offline = async () => null;

function playerTurn(s: CombatState) {
  // Greedy: if Jev shows strike intents, ward first; else attack. Skip self-harm when low.
  for (let guard = 0; guard < 20 && s.phase === 'player'; guard++) {
    const strikes = s.jev.hand.filter((c) => getCard(c.id).tags.includes('attack')).length;
    const opts = s.player.hand.filter((c) => canPlay(s, 'player', c.uid).ok);
    if (!opts.length) break;
    const score = (id: string) => {
      const d = getCard(id);
      let v = 0;
      if (d.tags.includes('draw') || d.tags.includes('candle')) v += 5;
      if (d.tags.includes('attack')) v += 3 + (s.jev.hp < 15 ? 3 : 0);
      if (d.tags.includes('ward')) v += strikes >= 2 ? 4 : 1.5;
      if (d.tags.includes('bleed')) v += 2.5;
      return v;
    };
    opts.sort((a, b) => score(b.id) - score(a.id));
    playCard(s, 'player', opts[0].uid);
  }
}

async function fight(mask: string, seed: number, hp = 64) {
  const s = createCombat({ seed, player: { hp, maxHp: 64, deck: (process.env.BUILT ? [...STARTER_DECK.slice(1), 'lunge', 'tower', 'twinknives', 'bonechapel', 'saltcircle', 'rustnail', 'crowomen'] : STARTER_DECK).map((id, i) => ({ id, up: !!process.env.BUILT && i < 3 })) }, trinkets: [], mask, mutations: [], stolen: [] });
  let turns = 0;
  while (s.phase !== 'over' && turns < 40) {
    playerTurn(s);
    if (s.phase === 'over') break;
    endPlayerTurn(s);
    if (s.phase === 'over') break;
    const d = await decideTurn(s, { profile: newProfile(), grudge: 0, ask: offline });
    for (const uid of d.plan.uids) if (canPlay(s, 'jev', uid).ok) playCard(s, 'jev', uid);
    endJevTurn(s);
    s.fx.length = 0;
    turns++;
  }
  return { win: s.winner === 'player', hp: s.player.hp, turns };
}

for (const mask of (process.argv[2] ?? 'fool,tower,hanged,moon,devil,jev').split(',')) {
  let wins = 0, hpSum = 0, t = 0;
  const N = 120;
  for (let i = 0; i < N; i++) {
    const r = await fight(mask, 1000 + i);
    if (r.win) { wins++; hpSum += r.hp; }
    t += r.turns;
  }
  console.log(mask.padEnd(7), `win ${(wins / N * 100).toFixed(0)}%`, `avg hp left ${(hpSum / Math.max(1, wins)).toFixed(1)}`, `avg turns ${(t / N).toFixed(1)}`);
}
