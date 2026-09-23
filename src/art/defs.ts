// Shared SVG defs injected once into the document. Every inline SVG can reference these ids.
import { BLOOD, BONE, FLAME, GOLD, GOLD_D, INK, NIGHT } from './palette.ts';

const hatch = (id: string, color: string, gap: number, width: number, angle: number) => `
  <pattern id="${id}" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})">
    <line x1="0" y1="0" x2="0" y2="${gap}" stroke="${color}" stroke-width="${width}"/>
  </pattern>`;

export const DEFS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
<defs>
  ${hatch('hh-hatch', INK, 3, 0.7, 45)}
  ${hatch('hh-hatch-d', INK, 2, 0.8, 45)}
  ${hatch('hh-hatch-r', INK, 3, 0.7, -45)}
  ${hatch('hh-hatch-v', INK, 2.5, 0.6, 0)}
  ${hatch('hh-hatch-h', INK, 2.5, 0.6, 90)}
  ${hatch('hh-hatch-bone', BONE, 3, 0.6, 45)}
  ${hatch('hh-hatch-bone-d', BONE, 2, 0.7, -45)}
  ${hatch('hh-hatch-blood', BLOOD, 2.5, 0.8, 45)}
  ${hatch('hh-hatch-gold', GOLD, 2.5, 0.7, 45)}
  <pattern id="hh-xhatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="3" stroke="${INK}" stroke-width="0.7"/>
    <line x1="0" y1="0" x2="3" y2="0" stroke="${INK}" stroke-width="0.7"/>
  </pattern>
  <pattern id="hh-xhatch-bone" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="3" stroke="${BONE}" stroke-width="0.5"/>
    <line x1="0" y1="0" x2="3" y2="0" stroke="${BONE}" stroke-width="0.5"/>
  </pattern>
  <pattern id="hh-stipple" width="4" height="4" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="0.55" fill="${INK}"/><circle cx="3" cy="3" r="0.45" fill="${INK}"/>
  </pattern>
  <pattern id="hh-stipple-bone" width="4" height="4" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="0.5" fill="${BONE}"/><circle cx="3" cy="3" r="0.4" fill="${BONE}"/>
  </pattern>

  <linearGradient id="hh-gold" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#e9c877"/><stop offset=".45" stop-color="${GOLD}"/>
    <stop offset=".55" stop-color="#f3dc98"/><stop offset="1" stop-color="${GOLD_D}"/>
  </linearGradient>
  <radialGradient id="hh-flame" cx=".5" cy=".6" r=".5">
    <stop offset="0" stop-color="#fff6d8"/><stop offset=".35" stop-color="${FLAME}"/>
    <stop offset=".75" stop-color="#d9622b" stop-opacity=".7"/><stop offset="1" stop-color="#d9622b" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="hh-glow" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#fff3cf" stop-opacity=".9"/><stop offset="1" stop-color="#fff3cf" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="hh-glow-red" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#ff5a3c" stop-opacity=".95"/><stop offset=".4" stop-color="${BLOOD}" stop-opacity=".6"/>
    <stop offset="1" stop-color="${BLOOD}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="hh-night" cx=".5" cy=".35" r=".8">
    <stop offset="0" stop-color="#3a4058"/><stop offset="1" stop-color="${NIGHT}"/>
  </radialGradient>
  <radialGradient id="hh-lacquer" cx=".5" cy=".4" r=".75">
    <stop offset="0" stop-color="#2a1714"/><stop offset="1" stop-color="#0b0706"/>
  </radialGradient>

  <filter id="hh-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="2.2" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="hh-grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 .1  0 0 0 0 .07  0 0 0 0 .05  0 0 0 .22 0"/>
    <feComposite in2="SourceGraphic" operator="in"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode/></feMerge>
  </filter>
  <filter id="hh-burn" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="3" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G">
      <animate attributeName="scale" from="0" to="60" dur=".9s" fill="freeze" begin="indefinite" id="hh-burn-anim"/>
    </feDisplacementMap>
  </filter>
</defs>
</svg>`;

export function injectDefs() {
  if (document.getElementById('hh-defs')) return;
  const holder = document.createElement('div');
  holder.id = 'hh-defs';
  holder.innerHTML = DEFS;
  document.body.prepend(holder);
}
