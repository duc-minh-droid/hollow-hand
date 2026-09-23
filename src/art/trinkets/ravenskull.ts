// Raven Skull — a bird skull with a long beak and a coal still burning in the socket.
import { BLOOD, BONE, FLAME, INK, PARCH } from '../palette.ts';

export default () => `
  <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">
    <path d="M24 46C32 47 44 44 58 42L42 50C36 52 28 51 24 46Z" fill="${BONE}"/>
    <path d="M36 21L61 39L38 38Z" fill="${PARCH}"/>
    <path d="M6 30C6 18 14 12 24 12C33 12 38 16 40 22L38 38C36 43 30 46 22 46C12 46 6 40 6 30Z" fill="${BONE}"/>
  </g>
  <path d="M40 24L60 38.5L39 34Z" fill="url(#hh-hatch-d)" opacity=".55"/>
  <path d="M38 30L59 39" stroke="${INK}" stroke-width="1.2"/>
  <path d="M43 27l6 3" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M22 46C30 46 36 43 38 38L38 34C33 40 26 42 18 42Z" fill="url(#hh-hatch)" opacity=".5"/>
  <path d="M10 22Q14 15 22 14" fill="none" stroke="${INK}" stroke-width=".9"/>
  <path d="M12 38l4-3 2 3 4-2" fill="none" stroke="${INK}" stroke-width=".9" stroke-linejoin="miter"/>
  <circle cx="24" cy="28" r="7.2" fill="${INK}"/>
  <g filter="url(#hh-soft-glow)">
    <circle cx="25" cy="28.5" r="2.8" fill="${BLOOD}"/>
    <circle cx="25" cy="28.5" r="1.2" fill="${FLAME}"/>
  </g>
`;
