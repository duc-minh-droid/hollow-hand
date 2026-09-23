// The Sun — a stern sun with clenched teeth turns its straight and wavy rays over a wall;
// the sunflowers beyond it have all turned their dark eyes up to watch.
import { BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

const CX = 100;
const CY = 56;
const rays = () =>
  Array.from({ length: 16 }, (_, i) => {
    const rot = `transform="rotate(${i * 22.5} ${CX} ${CY})"`;
    return i % 2
      ? `<path ${rot} d="M${CX} ${CY - 27}q-4-3 0-6t0-6t0-6" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>` +
          `<path ${rot} d="M${CX} ${CY - 27}q-4-3 0-6t0-6t0-6" fill="none" stroke="${GOLD}" stroke-width="1.8" stroke-linecap="round"/>`
      : `<path ${rot} d="M${CX - 4} ${CY - 26}L${CX} ${CY - 45}L${CX + 4} ${CY - 26}Z" fill="${GOLD}" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>`;
  }).join('');
const flower = (x: number, y: number, tilt: number) => `
  <path d="M${x} ${y + 6}q${tilt / 3} 14 ${-tilt / 4} 26" fill="none" stroke="${INK}" stroke-width="1.6"/>
  <path d="M${x - tilt / 5} ${y + 20}q-8-4-10 2q6 3 10-2z" fill="${SHADOW}" stroke="${INK}" stroke-width=".9"/>
  <g transform="translate(${x} ${y}) rotate(${tilt})" stroke="${INK}" stroke-width=".9" stroke-linejoin="round">
    ${Array.from({ length: 12 }, (_, i) => `<path transform="rotate(${i * 30})" d="M-2.2-6q2.2-6 4.4 0z" fill="${GOLD}"/>`).join('')}
    <circle r="6.2" fill="${INK}"/>
    <circle r="5" fill="url(#hh-stipple-bone)" stroke="none"/>
    <circle cy="-2" r="1.8" fill="${BONE}" stroke="none"/>
    <circle cy="-2.2" r=".8" fill="${INK}" stroke="none"/>
  </g>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <circle cx="${CX}" cy="${CY}" r="70" fill="url(#hh-glow)" opacity=".7"/>

  <!-- rays, turning -->
  <g class="a-spin-slow">${rays()}</g>

  <!-- the stern face -->
  <g stroke="${INK}" stroke-linejoin="round">
    <circle cx="${CX}" cy="${CY}" r="24" fill="${GOLD}" stroke-width="1.8"/>
    <path d="M100 32a24 24 0 0 1 0 48a24 24 0 0 0 16-24a24 24 0 0 0-16-24z" fill="url(#hh-hatch)" opacity=".4" stroke="none"/>
    <path d="M86 46l10 4M114 46l-10 4" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M87 53q4-3 8 0q-4 3-8 0zM105 53q4-3 8 0q-4 3-8 0z" fill="${BONE}" stroke-width="1.1"/>
    <circle cx="91" cy="53" r="1.5" fill="${INK}" stroke="none"/><circle cx="109" cy="53" r="1.5" fill="${INK}" stroke="none"/>
    <path d="M100 52v9l-3 1" fill="none" stroke-width="1.2"/>
    <path d="M90 66h20v4h-20z" fill="${BONE}" stroke-width="1.2"/>
    <path d="M92 66v4M94.5 66v4M97 66v4M99.5 66v4M102 66v4M104.5 66v4M107 66v4M90 68h20" fill="none" stroke-width=".7"/>
    <path d="M88 64q-2 4 0 8M112 64q2 4 0 8" fill="none" stroke="${GOLD_D}" stroke-width="1.2"/>
  </g>

  <!-- sunflowers peering over -->
  ${flower(34, 96, -20)}${flower(64, 88, -10)}${flower(136, 88, 10)}${flower(166, 96, 20)}

  <!-- the wall -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M0 108H200V150H0Z" fill="${BONE}" stroke-width="1.5"/>
    <path d="M0 102H200V110H0Z" fill="${SHADOW}" stroke-width="1.5"/>
    <path d="M0 102H200V110H0Z" fill="url(#hh-hatch-v)" opacity=".5" stroke="none"/>
    <path d="M0 120H200M0 132H200M0 144H200" stroke-width="1"/>
    <path d="M20 110v10M60 110v10M100 110v10M140 110v10M180 110v10M40 120v12M80 120v12M120 120v12M160 120v12M20 132v12M60 132v12M100 132v12M140 132v12M180 132v12" stroke-width="1"/>
    <path d="M0 132H200V150H0Z" fill="url(#hh-hatch)" opacity=".4" stroke="none"/>
  </g>
`;
