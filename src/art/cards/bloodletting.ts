// Bloodletting — a pale arm over a brass bowl, a leech fastened to it; the pooled blood reflects candles that are not there.
import { BLOOD, BLOOD_D, BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

// an upside-down candle reflected in the blood (flame hangs below the wax)
const reflected = (x: number, h: number) => `
  <path d="M${x - 2} 104h4v${h}h-4z" fill="${BONE}" opacity=".75"/>
  <path d="M${x} ${104 + h + 0.6}q-2.2 2.5 0 5q2.2-2.5 0-5z" fill="url(#hh-flame)"/>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V96H0Z" fill="url(#hh-hatch-d)" opacity=".45"/>
  <path d="M0 132H200V150H0Z" fill="${SHADOW}" stroke="${INK}" stroke-width="1.3"/>
  <path d="M0 132H200V150H0Z" fill="url(#hh-hatch-h)" opacity=".6"/>

  <!-- brass bowl -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M52 108Q56 134 100 136Q144 134 148 108Z" fill="${GOLD}" stroke-width="1.6"/>
    <path d="M100 136Q144 134 148 108H124Q126 128 100 136Z" fill="url(#hh-hatch)" opacity=".6" stroke="none"/>
    <path d="M60 118Q100 128 140 118" fill="none" stroke="${GOLD_D}" stroke-width="1.2"/>
    <path d="M84 136h32l-4 4H88z" fill="${GOLD_D}" stroke-width="1.2"/>
    <ellipse cx="100" cy="108" rx="48" ry="10" fill="${GOLD_D}" stroke-width="1.6"/>
    <ellipse cx="100" cy="109" rx="42" ry="7.5" fill="${BLOOD_D}" stroke-width="1"/>
    <path d="M60 110q40 8 80 0" fill="none" stroke="${BLOOD}" stroke-width="1.2"/>
  </g>
  <!-- candles that exist only in the reflection -->
  <g class="a-flicker">${reflected(80, 3)}${reflected(94, 5)}${reflected(116, 4)}</g>

  <!-- the arm, laid across from the left -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M0 34C40 32 92 38 128 42L130 58C92 62 40 66 0 64Z" fill="${BONE}" stroke-width="1.6"/>
    <path d="M0 52C40 54 92 54 130 52L130 58C92 62 40 66 0 64Z" fill="url(#hh-hatch)" opacity=".55" stroke="none"/>
    <path d="M20 42q20 2 40 1M70 44q14 2 26 3" fill="none" stroke="${SHADOW}" stroke-width=".8"/>
    <path d="M48 40q16 4 34 2" fill="none" stroke="${BLOOD_D}" stroke-width=".7" opacity=".7"/>
    <!-- limp hand, fingers hanging -->
    <path d="M128 42C138 42 146 46 148 54L150 74Q150 78 147 76L144 62L143 80Q142 84 139 81L138 64L136 82Q134 85 132 81L132 64L130 76Q128 79 126 75L126 58Z" fill="${BONE}" stroke-width="1.5"/>
    <path d="M130 58L132 64M138 64L137 58M144 62L143 56" fill="none" stroke-width=".8"/>
    <path d="M128 42q-3 8 0 16" fill="none" stroke-width="1"/>
    <!-- the leech -->
    <path d="M78 60C74 70 76 82 84 86C90 88 92 82 90 74C88 66 88 62 88 60Z" fill="${INK}" stroke-width="1.2"/>
    <path d="M80 66q4 2 8 0M79 72q5 2 10 0M80 78q4 2 9 0" fill="none" stroke="${SHADOW}" stroke-width=".8"/>
    <path d="M80 64q-1 8 1 12" fill="none" stroke="${BONE}" stroke-width="1" stroke-linecap="round" opacity=".7"/>
  </g>
  <path d="M100 60q1 6 0 10M141 82q0 4 0 6" fill="none" stroke="${BLOOD}" stroke-width="2" stroke-linecap="round"/>

  <!-- falling drops -->
  <g class="a-drip">
    <path d="M100 76q-3.4 5 0 7q3.4-2 0-7z" fill="${BLOOD}" stroke="${INK}" stroke-width=".7"/>
    <path d="M141 92q-3 4 0 6q3-2 0-6z" fill="${BLOOD}" stroke="${INK}" stroke-width=".7"/>
  </g>
  <path d="M100 102v3" stroke="${BLOOD}" stroke-width="1.6" stroke-linecap="round"/>
`;
