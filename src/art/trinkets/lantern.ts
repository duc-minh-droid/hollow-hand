// Hooded Lantern — an iron lantern under a cowl, one candle lit behind the glass.
import { BONE, FLAME, INK, SHADOW } from '../palette.ts';

export default () => `
  <circle cx="32" cy="6" r="3.6" fill="none" stroke="${INK}" stroke-width="2.2"/>
  <path d="M18 26H46L44 52H20Z" fill="${FLAME}" opacity=".35"/>
  <circle cx="32" cy="40" r="12" fill="url(#hh-glow)"/>
  <path d="M18 26H25L24.5 52H20Z" fill="url(#hh-hatch-d)" opacity=".7"/>
  <path d="M39 26H46L44 52H39.5Z" fill="url(#hh-hatch-d)" opacity=".7"/>
  <path d="M18 26H46L44 52H20Z" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M25 26L24.5 52M39 26L39.5 52" stroke="${INK}" stroke-width="2"/>
  <g class="a-flicker" filter="url(#hh-soft-glow)">
    <path d="M32 31Q26.5 39 28.5 44.5Q32 48 35.5 44.5Q37.5 39 32 31Z" fill="${FLAME}" stroke="${INK}" stroke-width="1.2"/>
    <path d="M32 37Q30 41 31 43.5Q32 44.5 33 43.5Q34 41 32 37Z" fill="${BONE}"/>
  </g>
  <rect x="30" y="45" width="4" height="7" fill="${BONE}" stroke="${INK}" stroke-width="1.2"/>
  <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">
    <path d="M16 27Q15 10 32 9Q49 10 48 27H16Z" fill="${SHADOW}"/>
    <path d="M14 52H50L47 59H17Z" fill="${SHADOW}"/>
  </g>
  <path d="M36 10Q47 13 48 27H40Q41 16 36 10Z" fill="url(#hh-hatch-d)" opacity=".6"/>
  <path d="M20 23Q21 14 29 12" fill="none" stroke="${BONE}" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
  <path d="M40 52L38 59H47L50 52Z" fill="url(#hh-hatch-d)" opacity=".6"/>
`;
