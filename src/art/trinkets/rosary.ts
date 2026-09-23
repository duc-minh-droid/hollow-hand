// Bone Rosary — a loop of bone beads on gold wire with a small skull hanging from it.
import { BONE, GOLD, INK } from '../palette.ts';

const beads = () =>
  Array.from({ length: 13 }, (_, i) => {
    const a = Math.PI / 2 + ((i + 1) / 14) * Math.PI * 2;
    const x = 32 + Math.cos(a) * 18;
    const y = 23 + Math.sin(a) * 15;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.3"/>`;
  }).join('');

export default () => `
  <ellipse cx="32" cy="23" rx="18" ry="15" fill="none" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="32" cy="23" rx="18" ry="15" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
  <path d="M32 38V44" stroke="${INK}" stroke-width="3"/><path d="M32 38V44" stroke="${GOLD}" stroke-width="1.4"/>
  <g fill="${BONE}" stroke="${INK}" stroke-width="1.8">${beads()}</g>
  <circle cx="32" cy="38.5" r="2.6" fill="${GOLD}" stroke="${INK}" stroke-width="1.6"/>
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M24 51C24 45 27.5 43 32 43C36.5 43 40 45 40 51C40 54 38 55 37 56V60H27V56C26 55 24 54 24 51Z" fill="${BONE}"/>
  </g>
  <path d="M36 44C39 46 40 48 40 51C40 54 38 55 37 56V60H34V55C36 53 37 49 36 44Z" fill="url(#hh-hatch-d)" opacity=".5"/>
  <circle cx="28.8" cy="50.5" r="2.1" fill="${INK}"/><circle cx="35.2" cy="50.5" r="2.1" fill="${INK}"/>
  <path d="M32 53l-1 2h2z" fill="${INK}" stroke="${INK}" stroke-width=".8" stroke-linejoin="round"/>
  <path d="M29.5 57v3M32 57v3M34.5 57v3" stroke="${INK}" stroke-width="1"/>
`;
