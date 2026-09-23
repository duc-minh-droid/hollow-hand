// Spilled Inkwell — a squat ceramic inkwell tipped on its side, violet ink running out.
import { BONE, INK, PARCH, VIOLET } from '../palette.ts';

export default () => `
  <path d="M4 51C8 45 18 46 24 47C31 43 41 45 45 48C53 46 61 50 59 54C57 58 45 59 37 57C29 61 15 60 9 57C4 56 2 54 4 51Z" fill="${VIOLET}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M12 51Q20 49 26 50M40 49Q48 49 52 51" fill="none" stroke="${BONE}" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>
  <circle cx="58" cy="44" r="1.6" fill="${VIOLET}" stroke="${INK}" stroke-width="1"/>
  <g transform="rotate(22 28 30)">
    <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">
      <path d="M8 22Q8 13 18 13H32Q42 13 42 23V37Q42 45 32 45H18Q8 45 8 37Z" fill="${PARCH}"/>
      <path d="M42 24H48V36H42Z" fill="${PARCH}"/>
      <path d="M48 22H52V38H48Z" fill="${BONE}"/>
    </g>
    <path d="M30 13H32Q42 13 42 23V37Q42 45 32 45H30Q36 40 36 29Q36 18 30 13Z" fill="url(#hh-hatch-d)" opacity=".55"/>
    <path d="M8 28H42" stroke="${INK}" stroke-width="1"/>
    <path d="M8 32H42" stroke="${VIOLET}" stroke-width="2.2"/>
    <path d="M13 18Q13 16 17 16" fill="none" stroke="${BONE}" stroke-width="1.4" stroke-linecap="round"/>
  </g>
  <path d="M45 44Q51 45 50 51" fill="none" stroke="${INK}" stroke-width="5.4" stroke-linecap="round"/>
  <path d="M45 44Q51 45 50 51" fill="none" stroke="${VIOLET}" stroke-width="3" stroke-linecap="round"/>
`;
