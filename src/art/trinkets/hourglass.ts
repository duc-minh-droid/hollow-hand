// Cracked Hourglass — gold sand still running through a split glass.
import { BONE, GOLD, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <path d="M20 12C20 24 30 28 30 32C30 36 20 40 20 52H44C44 40 34 36 34 32C34 28 44 24 44 12Z" fill="${BONE}" opacity=".3"/>
  <path d="M24 19C26 25 31 27.5 32 31C33 27.5 38 25 40 19Z" fill="${GOLD}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M32 31V46" stroke="${GOLD}" stroke-width="1.2"/>
  <path d="M21.5 52C23 45 29 42.5 32 42.5C35 42.5 41 45 42.5 52Z" fill="${GOLD}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M20 12C20 24 30 28 30 32C30 36 20 40 20 52H44C44 40 34 36 34 32C34 28 44 24 44 12Z" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M23 15C23 22 27 25 28 28M23 49C23 44 26 40 28 38" fill="none" stroke="${BONE}" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>
  <path d="M40 13l-4 5 3 3-5 5" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linejoin="miter" stroke-linecap="round"/>
  <path d="M41 13.5l-4 5 3 3-5 5" fill="none" stroke="${BONE}" stroke-width=".7" opacity=".8"/>
  <path d="M36 21l4 1" stroke="${INK}" stroke-width="1"/>
  <path d="M16 12V52M48 12V52" stroke="${INK}" stroke-width="4.4" stroke-linecap="round"/>
  <path d="M16 12V52M48 12V52" stroke="${SHADOW}" stroke-width="2"/>
  <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">
    <rect x="11" y="6" width="42" height="7" rx="2" fill="${PARCH}"/>
    <rect x="11" y="51" width="42" height="7" rx="2" fill="${PARCH}"/>
  </g>
  <path d="M40 6H51Q53 6 53 8V11Q53 13 51 13H40ZM40 51H51Q53 51 53 53V56Q53 58 51 58H40Z" fill="url(#hh-hatch-d)" opacity=".55"/>
`;
