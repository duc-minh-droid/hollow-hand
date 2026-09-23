// Judgement — an angel whose wings are full of eyes sounds the trumpet from the clouds;
// below, the coffins open and the faceless dead stand up with their arms raised.
import { BLOOD, BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

const WING = 'M96 36C84 22 70 15 52 13C58 18 60 22 58 26C64 26 66 30 64 34C70 34 74 38 72 42C80 40 90 40 96 40Z';
const eye = (x: number, y: number) =>
  `<path d="M${x - 3} ${y}q3-2.4 6 0q-3 2.4-6 0z" fill="${BONE}" stroke="${INK}" stroke-width=".7"/><circle cx="${x}" cy="${y}" r=".9" fill="${INK}"/>`;
const coffinBack = (cx: number) => `
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M${cx + 14} 137L${cx + 23} 112L${cx + 27} 113.4L${cx + 18.4} 138Z" fill="${BONE}" stroke-width="1.1"/>
    <path d="M${cx - 18} 122L${cx - 13} 116H${cx + 13}L${cx + 18} 122Z" fill="${INK}" stroke-width="1.2"/>
  </g>`;
const coffinFront = (cx: number) => `
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M${cx - 18} 122H${cx + 18}L${cx + 15} 136H${cx - 15}Z" fill="${SHADOW}" stroke-width="1.3"/>
    <path d="M${cx - 18} 122H${cx + 18}L${cx + 15} 136H${cx - 15}Z" fill="url(#hh-hatch)" opacity=".55" stroke="none"/>
  </g>`;
const risen = (cx: number, h: number) => `
  <g stroke="${INK}" stroke-linejoin="round" stroke-linecap="round">
    <path d="M${cx - 4} 106L${cx - 10} ${92 - h}M${cx + 4} 106L${cx + 10} ${92 - h}" fill="none" stroke-width="4.2"/>
    <path d="M${cx - 4} 106L${cx - 10} ${92 - h}M${cx + 4} 106L${cx + 10} ${92 - h}" fill="none" stroke="${BONE}" stroke-width="2"/>
    <path d="M${cx - 5} 104H${cx + 5}L${cx + 4} 120H${cx - 4}Z" fill="${BONE}" stroke-width="1.2"/>
    <path d="M${cx} 104H${cx + 5}L${cx + 4} 120H${cx}Z" fill="url(#hh-hatch)" opacity=".5" stroke="none"/>
    <circle cx="${cx}" cy="${99 - h / 2}" r="4.6" fill="${BONE}" stroke-width="1.2"/>
  </g>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V96H0Z" fill="url(#hh-hatch-r)" opacity=".25"/>
  <!-- far mountains and the grey sea -->
  <path d="M0 108L22 88L36 98L54 82L74 104L126 104L146 84L164 98L178 86L200 104V112H0Z" fill="${BONE}" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
  <path d="M22 88L36 98L54 82L60 108H0ZM146 84L164 98L178 86L184 108H130Z" fill="url(#hh-hatch)" opacity=".4"/>
  <path d="M0 110H200V150H0Z" fill="${SHADOW}" stroke="${INK}" stroke-width="1.2"/>
  <path d="M0 110H200V150H0Z" fill="url(#hh-hatch-h)" opacity=".5"/>
  <path d="M8 142q10-3 20 0M76 144q12-3 24 0M170 142q10-3 20 0" fill="none" stroke="${BONE}" stroke-width=".9"/>

  <!-- the dead rising -->
  ${coffinBack(50)}${coffinBack(100)}${coffinBack(150)}
  <g class="a-float">${risen(50, 0)}${risen(100, 4)}${risen(150, 0)}</g>
  ${coffinFront(50)}${coffinFront(100)}${coffinFront(150)}

  <!-- the many-eyed angel -->
  <g transform="translate(100 4) scale(1.3) translate(-100 0)">
  <circle cx="100" cy="24" r="11" fill="url(#hh-glow)"/>
  <circle cx="100" cy="24" r="10" fill="none" stroke="${GOLD}" stroke-width="2"/>
  <g stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
    <path d="${WING}" fill="${BONE}"/>
    <path d="${WING}" fill="url(#hh-hatch-r)" opacity=".4" stroke="none"/>
    <g transform="translate(200 0) scale(-1 1)"><path d="${WING}" fill="${BONE}"/><path d="${WING}" fill="url(#hh-hatch)" opacity=".4" stroke="none"/></g>
    <path d="M94 34h12l2 6H92z" fill="${BONE}"/>
    <circle cx="100" cy="25" r="6.5" fill="${BONE}"/>
    <path d="M96.5 25q1.5-1.2 3 0M101 25q1.5-1.2 3 0" fill="none" stroke-width=".9"/>
  </g>
  ${eye(62, 20)}${eye(74, 27)}${eye(84, 33)}${eye(138, 20)}${eye(126, 27)}${eye(116, 33)}
  </g>

  <!-- clouds -->
  <g transform="translate(0 12)" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
    <path d="M30 46q-6-10 6-12q4-8 14-4q6-8 16-2q8-6 16 0q8-6 18 0q10-6 18 0q8-6 16 0q10-4 14 4q12 2 6 14z" fill="${BONE}"/>
    <path d="M30 46q70 -6 140 0q-2 4-8 4H38q-6 0-8-4z" fill="url(#hh-hatch)" opacity=".6" stroke="none"/>
    <path d="M50 38q6-4 12 0M92 36q6-4 12 0M134 38q6-4 12 0" fill="none" stroke-width=".8"/>
  </g>

  <!-- trumpet and banner -->
  <g transform="translate(0 12)">
  <path d="M104 30L143 56" stroke="${INK}" stroke-width="4.4" stroke-linecap="round"/>
  <path d="M104 30L143 56" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M141 57.2L145.7 67.5Q151 64 154.3 56.5L143.2 54.4Z" fill="${GOLD}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M145.7 67.5Q151 64 154.3 56.5" fill="none" stroke="${GOLD_D}" stroke-width="1.6"/>
  <path d="M118 39L133 49V74L125.5 68L118 71Z" fill="${BONE}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M125.5 47V67M119.5 53.5L132 61.5" stroke="${BLOOD}" stroke-width="2.6"/>
  <g class="a-pulse" fill="none" stroke="${INK}" stroke-linecap="round">
    <path d="M158 64q5 6 2 13M164 58q9 9 4 22M170 52q13 12 6 32" stroke-width="1.1"/>
  </g>
  </g>
`;
