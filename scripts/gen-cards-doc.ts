// Generates docs/CARDS.md from the live card, mask, trinket and mutation data.
//   node scripts/gen-cards-doc.ts
import { writeFileSync } from 'node:fs';
import { allCards, tollOf } from '../src/game/cards.ts';
import { TRINKETS } from '../src/game/trinkets.ts';
import { MASKS } from '../src/jev/masks.ts';
import { MUTATIONS } from '../src/jev/mutations.ts';
import { KEYWORDS } from '../src/game/keywords.ts';

const plain = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\|/g, '/').trim();
const cost = (id: string) => {
  const d = allCards.find((c) => c.id === id)!;
  return d.toll ? `Toll ${tollOf(d, false)} HP` : String(d.cost);
};

const out: string[] = [
  '# Card reference',
  '',
  '_Generated from the game data by `node scripts/gen-cards-doc.ts`. Do not edit by hand._',
  '',
  'Every card has an upright and a reversed face. Each draw has a 20% chance to come up reversed (more with some trinkets). Carved (upgraded) values are in the game; this table shows base values.',
  '',
];

const groups: [string, string][] = [
  ['starter', 'Starting hand'], ['common', 'Common'], ['uncommon', 'Uncommon'], ['rare', 'Rare'], ['curse', 'Curses'], ['jev', "Jev's cards"],
];
for (const [rarity, title] of groups) {
  out.push(`## ${title}`, '', '| Card | Suit | Cost | Upright | Reversed |', '|---|---|---|---|---|');
  for (const d of allCards.filter((c) => c.rarity === rarity)) {
    out.push(`| **${d.name}** <sub>${d.numeral}</sub> | ${d.suit} | ${d.unplayable ? '—' : cost(d.id)} | ${plain(d.text(false))} | ${plain(d.revText(false))} |`);
  }
  out.push('');
}

out.push("## Jev's masks", '', '| Mask | Kind | HP | Candles | Quirk |', '|---|---|---|---|---|');
for (const m of Object.values(MASKS)) out.push(`| **${m.name}** <sub>${m.numeral}</sub> | ${m.kind} | ${m.hp} | ${m.candles} | ${m.quirk} |`);
out.push('', 'Non-boss masks gain +3 HP per fight you have won and +2 per grudge. The boss gains +4 per grudge.', '');

out.push("## Jev's ledger (counter-rules)", '', 'After each fight Jev inks one of these, chosen to punish your strongest habit.', '', '| Rule | Effect | Punishes |', '|---|---|---|');
for (const m of MUTATIONS) out.push(`| **${m.name}** | ${m.text} | ${m.counters} |`);
out.push('');

out.push('## Trinkets', '', '| Trinket | Effect | Price |', '|---|---|---|');
for (const t of TRINKETS) out.push(`| **${t.name}** | ${t.text} | ${t.price} teeth |`);
out.push('');

out.push('## Keywords and statuses', '', '| Keyword | Meaning |', '|---|---|');
const seen = new Set<string>();
for (const [k, v] of Object.entries(KEYWORDS)) {
  if (seen.has(k)) continue;
  seen.add(k);
  out.push(`| **${k}** | ${v} |`);
}
out.push('');

writeFileSync('docs/CARDS.md', out.join('\n'));
console.log('wrote docs/CARDS.md');
