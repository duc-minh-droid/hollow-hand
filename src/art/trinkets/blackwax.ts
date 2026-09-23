// Black Wax — a blot of black sealing wax stamped with an open eye, red ribbon tails beneath.
import { BLOOD, BONE, INK, LACQUER, SHADOW } from '../palette.ts';

export default () => `
  <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">
    <path d="M25 40L15 61L22 57L27 62L33 44Z" fill="${BLOOD}"/>
    <path d="M39 40L49 61L42 57L37 62L31 44Z" fill="${BLOOD}"/>
    <path d="M32 6C38 5 42 9 47 10C52 13 53 18 56 23C58 29 55 33 56 38C54 44 49 47 45 51C40 54 35 52 30 54C24 53 20 49 15 46C11 41 12 36 8 31C8 25 11 20 14 15C18 10 24 9 32 6Z" fill="${LACQUER}" stroke-width="2.4"/>
  </g>
  <path d="M14 16C18 11 24 9 32 7C24 11 18 16 15 24Z" fill="url(#hh-hatch-bone)" opacity=".6"/>
  <path d="M13 20C17 13 23 10 30 9" fill="none" stroke="${BONE}" stroke-width="1.3" stroke-linecap="round" opacity=".75"/>
  <circle cx="32.8" cy="30.8" r="15" fill="none" stroke="${INK}" stroke-width="1.2"/>
  <circle cx="32" cy="30" r="15" fill="none" stroke="${SHADOW}" stroke-width="1.6"/>
  <path d="M20 30Q32 20 44 30Q32 40 20 30Z" fill="none" stroke="${SHADOW}" stroke-width="1.8" stroke-linejoin="round"/>
  <circle cx="32" cy="30" r="4.6" fill="${BLOOD}" stroke="${SHADOW}" stroke-width="1"/>
  <circle cx="32" cy="30" r="1.8" fill="${INK}"/>
  <path d="M23 26l-2-3M27.5 24l-1-3.5M32 23.2v-3.6M36.5 24l1-3.5M41 26l2-3" fill="none" stroke="${SHADOW}" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="33.4" cy="28.6" r=".9" fill="${BONE}"/>
`;
