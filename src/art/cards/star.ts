// The Star — a kneeling figure pours from two jugs, onto the land and into the pool, under one great star and seven small;
// the pool gives back not the star but an eye.
import { BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

const star = (x: number, y: number, r: number, inner: number) => {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const a = ((i * 22.5 - 90) * Math.PI) / 180;
    const rr = i % 2 ? inner : r;
    return `${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`;
  });
  return `M${pts.join('L')}Z`;
};
const SMALL: [number, number][] = [
  [34, 34], [56, 20], [60, 50], [140, 48], [146, 20], [170, 34], [160, 62],
];
const limb = (d: string, w = 5.2) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 2.4}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${BONE}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const jug = (x: number, y: number, r: number) => `
  <g transform="translate(${x} ${y}) rotate(${r})" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round">
    <path d="M-3-9h6l-1 3q6 3 5 9q-1 7-7 7q-6 0-7-7q-1-6 5-9z" fill="${GOLD}"/>
    <path d="M0-6q6 3 5 9q-1 7-5 7z" fill="url(#hh-hatch)" opacity=".5" stroke="none"/>
  </g>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V110H0Z" fill="url(#hh-hatch-r)" opacity=".28"/>

  <!-- stars -->
  <g class="a-glint" stroke="${INK}" stroke-width="1" stroke-linejoin="round">
    <path d="${star(100, 30, 20, 6.5)}" fill="${GOLD}" stroke-width="1.4"/>
    <path d="${star(100, 30, 11, 4)}" fill="${GOLD_D}" stroke="none" opacity=".6"/>
    ${SMALL.slice(0, 4).map(([x, y]) => `<path d="${star(x, y, 6, 2)}" fill="${GOLD}"/>`).join('')}
  </g>
  <g stroke="${INK}" stroke-width="1" stroke-linejoin="round">
    ${SMALL.slice(4).map(([x, y]) => `<path d="${star(x, y, 6, 2)}" fill="${GOLD}"/>`).join('')}
  </g>

  <!-- the land and the pool -->
  <path d="M0 150V120Q30 108 64 114Q90 118 104 124L110 150Z" fill="${SHADOW}" stroke="${INK}" stroke-width="1.4"/>
  <path d="M0 150V120Q30 108 64 114Q90 118 104 124L110 150Z" fill="url(#hh-hatch-d)" opacity=".55"/>
  <path d="M20 112l2-8 2 8M28 110l1-6 2 6" fill="none" stroke="${INK}" stroke-width=".9"/>
  <path d="M104 124Q150 118 200 122V150H110Z" fill="${BONE}" stroke="${INK}" stroke-width="1.4"/>
  <path d="M114 130q10-2 20 0M150 128q12-2 24 0M122 142q14-2 28 0M168 140q10-2 20 0" fill="none" stroke="${INK}" stroke-width=".9"/>
  <!-- the eye in the water -->
  <g class="a-blink">
    <path d="M140 136q14-9 28 0q-14 9-28 0z" fill="${BONE}" stroke="${INK}" stroke-width="1.2"/>
    <circle cx="154" cy="136" r="3.6" fill="${GOLD}" stroke="${INK}" stroke-width="1"/>
    <circle cx="154" cy="136" r="1.5" fill="${INK}"/>
  </g>

  <!-- the pourer -->
  <path d="M70 100q-6 10-8 22M68 101q-3 8-2 18" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="3 1.5"/>
  <path d="M136 98q2 12 0 30M138 98q4 12 4 28" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="3 1.5"/>
  <path d="M128 130q8-3 16 0M130 134q6-2 12 0" fill="none" stroke="${INK}" stroke-width=".8"/>
  ${limb('M96 94L92 120L76 122', 6)}
  ${limb('M104 94L116 102L118 124', 6)}
  <g stroke="${INK}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M94 56C86 60 84 74 86 86L92 80C92 70 94 64 98 62Z" fill="${INK}"/>
    <path d="M95 66C91 74 91 86 93 96H107C107 86 106 74 103 66Z" fill="${BONE}"/>
    <path d="M95 66C91 74 91 86 93 96H99C97 86 97 74 99 66Z" fill="url(#hh-hatch)" opacity=".45" stroke="none"/>
    <circle cx="99" cy="59" r="6" fill="${BONE}"/>
    <path d="M94 56q4-6 10-2q-2-6-7-5q-5 2-3 7z" fill="${INK}"/>
    <path d="M100 59q1.5 1 3 0" fill="none" stroke-width=".9"/>
  </g>
  ${limb('M96 70L84 84L74 92', 4)}
  ${limb('M102 70L114 80L128 88', 4)}
  ${jug(72, 94, -120)}
  ${jug(132, 92, 130)}
`;
