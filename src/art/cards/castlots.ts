// Cast Lots — a hand lets go of three bone dice; they tumble toward a circle scratched in the dirt.
import { BLOOD, BONE, INK, PARCH, SHADOW } from '../palette.ts';

// an isometric bone die: one pip on top, two on the left face, three on the right
const die = (x: number, y: number, s: number, rot: number) => {
  const h = s / 2;
  const L = (u: number, v: number) => `${(x - s + u * s).toFixed(1)} ${(y - h + u * h + v * s).toFixed(1)}`;
  const R = (u: number, v: number) => `${(x + u * s).toFixed(1)} ${(y - u * h + v * s).toFixed(1)}`;
  const pip = (p: string, r: number) => { const [a, b] = p.split(' '); return `<circle cx="${a}" cy="${b}" r="${r.toFixed(2)}"/>`; };
  return `
  <g transform="rotate(${rot} ${x} ${y})" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
    <path d="M${x} ${y - s}L${x + s} ${y - h}L${x} ${y}L${x - s} ${y - h}Z" fill="${BONE}"/>
    <path d="M${x - s} ${y - h}L${x} ${y}V${y + s}L${x - s} ${y + h}Z" fill="${BONE}"/>
    <path d="M${x - s} ${y - h}L${x} ${y}V${y + s}L${x - s} ${y + h}Z" fill="url(#hh-hatch-v)" opacity=".3"/>
    <path d="M${x} ${y}L${x + s} ${y - h}V${y + h}L${x} ${y + s}Z" fill="${SHADOW}" opacity=".5"/>
    <path d="M${x} ${y}L${x + s} ${y - h}V${y + h}L${x} ${y + s}Z" fill="url(#hh-hatch-d)" opacity=".6"/>
    <g stroke="none" fill="${INK}">
      <circle cx="${x}" cy="${y - h}" r="${(s * 0.2).toFixed(1)}" fill="${BLOOD}" stroke="${INK}" stroke-width=".6"/>
      ${pip(L(0.3, 0.3), s * 0.1)}${pip(L(0.7, 0.7), s * 0.1)}
      ${pip(R(0.25, 0.25), s * 0.1)}${pip(R(0.5, 0.5), s * 0.1)}${pip(R(0.75, 0.75), s * 0.1)}
    </g>
  </g>`;
};

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V40C150 28 60 48 0 30Z" fill="url(#hh-hatch)" opacity=".5"/>
  <!-- the ground and the scratched circle -->
  <path d="M0 150V116Q100 104 200 116V150Z" fill="url(#hh-stipple)" opacity=".7"/>
  <path d="M0 116Q100 104 200 116" fill="none" stroke="${INK}" stroke-width=".8"/>
  <ellipse cx="116" cy="130" rx="58" ry="12" fill="none" stroke="${INK}" stroke-width="1.6"/>
  <ellipse cx="116" cy="130" rx="50" ry="9" fill="none" stroke="${INK}" stroke-width=".7" stroke-dasharray="4 2 1 2"/>
  <path d="M62 126l-4-3M74 138l-3 4M116 118v-3M158 138l3 4M170 126l4-3M116 142v3" stroke="${INK}" stroke-width="1.1" stroke-linecap="round"/>
  <ellipse cx="124" cy="130" rx="10" ry="2.4" fill="${SHADOW}" opacity=".5"/>
  <ellipse cx="96" cy="131" rx="8" ry="2" fill="${SHADOW}" opacity=".35"/>

  <!-- the releasing hand, back turned to us, fingers opening -->
  <g stroke-linecap="round" fill="none">
    <path d="M66 40Q80 42 92 52M70 48Q84 56 88 68M66 56Q76 66 76 78M58 60Q62 70 60 80M40 60Q52 74 62 70" stroke="${INK}" stroke-width="9.4"/>
    <path d="M66 40Q80 42 92 52M70 48Q84 56 88 68M66 56Q76 66 76 78M58 60Q62 70 60 80M40 60Q52 74 62 70" stroke="${BONE}" stroke-width="6.4"/>
    <path d="M88 50l-3 4M84 64l-4 2M74 74l-4 0M60 76l-3-1" stroke="${INK}" stroke-width=".8"/>
  </g>
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M0 30Q36 26 58 32Q74 38 74 50Q70 62 54 62Q30 60 0 58Z" fill="${BONE}"/>
    <path d="M0 48Q30 52 54 54Q66 54 72 50Q70 62 54 62Q30 60 0 58Z" fill="url(#hh-hatch)" opacity=".55" stroke="none"/>
    <path d="M52 38q4 2 8 0M60 44q4 2 8 0M22 38q10 2 20 0" fill="none" stroke-width=".9"/>
  </g>

  <!-- motion arcs and the three dice -->
  <path d="M96 40q10 2 14 10M104 72q10 2 14 10M78 88q6 4 8 12" fill="none" stroke="${INK}" stroke-width="1" stroke-linecap="round" stroke-dasharray="3 2"/>
  ${die(118, 58, 10, 14)}
  <g class="a-float">${die(148, 86, 9, -20)}</g>
  ${die(96, 108, 8, 32)}
`;
