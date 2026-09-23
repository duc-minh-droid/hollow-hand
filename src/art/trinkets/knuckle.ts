// Saint's Knuckle — a knuckle-bone relic behind glass in a tiny gold reliquary.
import { BONE, GOLD, GOLD_D, INK, LACQUER } from '../palette.ts';

export default () => `
  <path d="M32 11V15" stroke="${INK}" stroke-width="2.2"/>
  <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">
    <path d="M32 3L35 7L32 11L29 7Z" fill="${GOLD}"/>
    <circle cx="15" cy="56" r="3.2" fill="${GOLD_D}"/>
    <circle cx="49" cy="56" r="3.2" fill="${GOLD_D}"/>
    <path d="M10 28L19 15H45L54 28Z" fill="${GOLD}"/>
    <rect x="11" y="28" width="42" height="24" fill="${GOLD}"/>
  </g>
  <path d="M36 15H45L54 28H42Z" fill="url(#hh-hatch-d)" opacity=".5"/>
  <path d="M44 28H53V52H44Z" fill="url(#hh-hatch-d)" opacity=".5"/>
  <path d="M22 21.5H42" stroke="${INK}" stroke-width="1"/>
  <rect x="18" y="32" width="28" height="16" rx="2" fill="${LACQUER}" stroke="${INK}" stroke-width="2"/>
  <path d="M24 40C22 36 26 34 28 36.5H36C38 34 42 36 40 40C42 44 38 46 36 43.5H28C26 46 22 44 24 40Z" fill="${BONE}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M29 38.5H35" stroke="${INK}" stroke-width=".7"/>
  <path d="M20.5 38V34.5H25" fill="none" stroke="${BONE}" stroke-width="1" opacity=".6"/>
  <g fill="${INK}"><circle cx="14.5" cy="31" r="1"/><circle cx="49.5" cy="31" r="1"/><circle cx="14.5" cy="49" r="1"/><circle cx="49.5" cy="49" r="1"/></g>
`;
