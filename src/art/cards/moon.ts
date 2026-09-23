// The Moon — a sleeping moon weeping blood between two towers; a dog and a wolf howl, a crayfish climbs from the pool.
import { BLOOD, BLOOD_D, BONE, INK, PARCH, SHADOW } from '../palette.ts';

const MX = 100;
const MY = 38;
const rays = () =>
  Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 * Math.PI) / 180;
    const r0 = 22;
    const r1 = i % 2 ? 27 : 31;
    const p = (r: number, da = 0) => `${(MX + Math.cos(a + da) * r).toFixed(1)} ${(MY + Math.sin(a + da) * r).toFixed(1)}`;
    return `M${p(r0, -0.07)}L${p(r1)}L${p(r0, 0.07)}`;
  }).join('');
// sitting canine howling up and to the right; mirror for the other side
const canine = (x: number, flip: boolean, fill: string, shade: string) => `
  <g transform="translate(${x} 120)${flip ? ' scale(-1 1)' : ''}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round">
    <path d="M0 0C-1-10 3-16 9-19L13-27L15-33L19-31L25-36L22-29L18-26L18-22C18-14 20-8 21 0ZM-1-3q-7-1-8-8" fill="${fill}"/>
    <path d="M0 0C-1-10 3-16 9-19L12-22C10-14 12-6 14 0Z" fill="${shade}" opacity=".6" stroke="none"/>
    <path d="M13-29l-1-6 4 3" fill="${fill}"/>
    <path d="M22-35q4-4 3-9M26-33q6-2 7-7" fill="none" stroke-width=".8" stroke-dasharray="1.5 1.5"/>
  </g>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V78H0Z" fill="url(#hh-hatch-r)" opacity=".4"/>
  <path d="M0 80q30-12 60-4q20-10 40-2q24-10 50 0q28-8 50 2V92H0Z" fill="${SHADOW}" opacity=".5" stroke="${INK}" stroke-width="1"/>

  <!-- towers -->
  <g stroke="${INK}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M22 124V62h-2v-7h4v3h4v-3h4v3h4v-3h4v7h-2v62z" fill="${BONE}"/>
    <path d="M22 124V62h8v62z" fill="url(#hh-hatch)" opacity=".5" stroke="none"/>
    <path d="M160 124V62h-2v-7h4v3h4v-3h4v3h4v-3h4v7h-2v62z" fill="${BONE}"/>
    <path d="M170 124V62h8v62z" fill="url(#hh-hatch)" opacity=".5" stroke="none"/>
    <path d="M29 78v-5a2.5 2.5 0 0 1 5 0v5zM166 78v-5a2.5 2.5 0 0 1 5 0v5z" fill="${INK}"/>
  </g>

  <!-- the path winding away over the hills -->
  <g fill="none" stroke="${INK}" stroke-linecap="round">
    <path d="M66 134C86 120 106 112 96 100C90 92 100 86 99.4 79M134 134C116 120 116 110 107 100C102 92 103 86 100.6 79" stroke-width="1.2"/>
    <path d="M84 128l6-1M104 128l8 1M94 121l6-1M108 120l4 1M100 112l4 0M100 104l3 0M98 96l3 0M100 88h2" stroke-width="1"/>
  </g>

  <!-- sleeping moon -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="${rays()}" fill="none" stroke-width="1.2"/>
    <circle cx="${MX}" cy="${MY}" r="20" fill="${BONE}" stroke-width="1.6"/>
    <path d="M100 18a20 20 0 0 1 0 40a14 20 0 0 0 0-40z" fill="url(#hh-hatch)" opacity=".6" stroke="none"/>
    <path d="M100 18a14 20 0 0 1 0 40" fill="none" stroke-width="1"/>
    <path d="M86 34q3 2.5 6 0M96 34q3 2.5 6 0" fill="none" stroke-width="1.2"/>
    <path d="M94 36q-2 4 1 5M89 46q5 3 10 0" fill="none" stroke-width="1"/>
  </g>
  <path d="M89 37q-1 5 0 8" fill="none" stroke="${BLOOD}" stroke-width="1.4" stroke-linecap="round"/>

  <!-- falling yods of blood -->
  <g fill="${BLOOD}" stroke="${INK}" stroke-width=".6">
    <path d="M66 58q-3 4 0 6q3-2 0-6z"/><path d="M134 60q-3 4 0 6q3-2 0-6z"/><path d="M78 72q-2.4 3.4 0 5q2.4-1.6 0-5z"/><path d="M124 74q-2.4 3.4 0 5q2.4-1.6 0-5z"/>
  </g>
  <g class="a-drip"><path d="M89 48q-3 4 0 6q3-2 0-6z" fill="${BLOOD}" stroke="${INK}" stroke-width=".6"/></g>

  ${canine(52, false, BONE, SHADOW)}
  ${canine(148, true, INK, INK)}
  <path d="M148 120C149 110 145 104 139 101" fill="none" stroke="${BONE}" stroke-width=".7" stroke-dasharray="1.5 1.5"/>

  <!-- the pool and the crayfish -->
  <path d="M40 150q0-18 60-18q60 0 60 18z" fill="${SHADOW}" stroke="${INK}" stroke-width="1.4"/>
  <path d="M40 150q0-18 60-18q60 0 60 18z" fill="url(#hh-hatch-h)" opacity=".7"/>
  <g stroke="${INK}" stroke-width="1" stroke-linejoin="round">
    <path d="M94 128c0 4 1 8 2 13h8c1-5 2-9 2-13q-6-3-12 0z" fill="${BLOOD}"/>
    <path d="M95 132h10M95.5 136h9" fill="none" stroke="${BLOOD_D}" stroke-width="1.2"/>
    <path d="M95 129L88 122l-3-5M105 129l7-7 3-5" fill="none" stroke-width="1.6"/>
    <path d="M85 117q-4-3-2-6q3 0 4 3zM115 117q4-3 2-6q-3 0-4 3z" fill="${BLOOD}"/>
    <path d="M98 127l-2-7M102 127l2-7M94 134l-5 2M106 134l5 2M94 138l-5 3M106 138l5 3" fill="none" stroke-width=".8"/>
  </g>
`;
