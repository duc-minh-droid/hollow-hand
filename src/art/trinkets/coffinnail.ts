// Coffin Nail — a square-cut iron nail, bent where it was pulled from the lid, bloody at the point.
import { BLOOD, BONE, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <g stroke="${INK}" stroke-width="2.4" stroke-linejoin="round">
    <path d="M15 12V37L44 57L60 62L50 48L25 31V12Z" fill="${SHADOW}"/>
    <path d="M5 4H35V13H5Z" fill="${SHADOW}"/>
  </g>
  <path d="M21 13V33L47 51L53 56L46 54.5L19 36V13Z" fill="url(#hh-hatch-d)" opacity=".5"/>
  <path d="M18 15V36L42 53" fill="none" stroke="${PARCH}" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>
  <path d="M8 7H26" stroke="${BONE}" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
  <path d="M28 5l3 6M13 5l-2 6" stroke="${INK}" stroke-width="1.1"/>
  <path d="M41 52L60 62L45 57.5Z" fill="${BLOOD}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M36 47q-2 3 0 6" fill="none" stroke="${BLOOD}" stroke-width="1.8" stroke-linecap="round"/>
`;
