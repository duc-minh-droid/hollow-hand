// Nail Hex — a straw poppet bound in red thread, pinned to a board by three iron nails.
import { BLOOD, BONE, INK, PARCH, SHADOW } from '../palette.ts';

// an iron nail: head at (x, y), shaft running toward (tx, ty) where it enters the straw
const nail = (x: number, y: number, tx: number, ty: number) => `
  <path d="M${x} ${y}L${tx} ${ty}" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M${x} ${y}L${tx} ${ty}" stroke="${SHADOW}" stroke-width="1.1" stroke-linecap="round"/>
  <circle cx="${x}" cy="${y}" r="5" fill="${SHADOW}" stroke="${INK}" stroke-width="1.4"/>
  <circle cx="${x}" cy="${y}" r="5" fill="url(#hh-xhatch)" opacity=".6"/>
  <path d="M${x - 2.4} ${y - 1.6}q2-1.6 4.4-.6" fill="none" stroke="${BONE}" stroke-width=".9" stroke-linecap="round"/>
  <circle cx="${tx}" cy="${ty}" r="1.8" fill="${INK}"/>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <!-- the board -->
  <rect width="200" height="150" fill="url(#hh-hatch-v)" opacity=".3"/>
  <path d="M46 0V150M154 0V150" stroke="${INK}" stroke-width="1.3"/>
  <path d="M20 10q-6 40 2 80q4 30-2 60M180 0q6 50-2 90q-4 30 4 60M60 20q4 20 0 40" fill="none" stroke="${SHADOW}" stroke-width=".9"/>
  <ellipse cx="172" cy="40" rx="5" ry="8" fill="none" stroke="${INK}" stroke-width="1"/>
  <ellipse cx="172" cy="40" rx="2" ry="3.6" fill="${INK}"/>
  <ellipse cx="102" cy="138" rx="30" ry="4" fill="${SHADOW}" opacity=".4"/>

  <!-- the poppet -->
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M86 106L78 140L92 140L98 108ZM102 108L108 140L122 140L114 106Z" fill="${BONE}"/>
    <path d="M58 60Q100 54 142 60L142 70Q100 66 58 70Z" fill="${BONE}"/>
    <path d="M58 60l-8-5M58 63l-10-1M58 67l-9 4M58 70l-6 6M142 60l8-5M142 63l10-1M142 67l9 4M142 70l6 6M80 140l-3 5M86 140v5M92 140l2 5M108 140l-2 5M115 140v5M122 140l3 5" fill="none" stroke-width="1"/>
    <path d="M88 50Q82 80 86 108L114 108Q118 80 112 50Z" fill="${BONE}"/>
    <path d="M104 50Q112 80 110 108H114Q118 80 112 50Z" fill="url(#hh-hatch-r)" opacity=".7" stroke="none"/>
    <path d="M92 54q-3 26 0 50M97 52q-2 28 0 54M102 52q1 28 0 54M107 54q3 26 1 50M64 63h24M64 66.5h24M114 63h24M114 66.5h24M84 112l-4 26M110 112l4 26" fill="none" stroke-width=".6" opacity=".8"/>
    <circle cx="100" cy="36" r="15" fill="${BONE}"/>
    <path d="M100 21a15 15 0 0 1 0 30a10 15 0 0 0 0-30z" fill="url(#hh-hatch-r)" opacity=".6" stroke="none"/>
    <path d="M90 26q10-6 20 0M88 36q12-4 24 0M90 45q10 5 20 0" fill="none" stroke-width=".6" opacity=".7"/>
    <path d="M91 32l5 5M96 32l-5 5M104 32l5 5M109 32l-5 5" stroke-width="1.3"/>
    <path d="M93 43q7 3 14 0" fill="none" stroke-width="1.1" stroke-dasharray="1.6 1.4"/>
  </g>
  <!-- red binding thread -->
  <g stroke="${BLOOD}" stroke-width="2.6" stroke-linecap="round" fill="none">
    <path d="M89 51q11 3 22 0M66 59v12M134 59v12M86 96q14 3 28 0M81 132q6 1 11 0M109 132q6 1 11 0"/>
  </g>

  <!-- three nails -->
  ${nail(76, 20, 92, 31)}
  ${nail(126, 70, 106, 78)}
  ${nail(78, 98, 94, 92)}
  <g class="a-drip">
    <path d="M106 82q-3.6 5.6 0 8.4q3.6-2.8 0-8.4z" fill="${BLOOD}" stroke="${INK}" stroke-width=".8"/>
  </g>
`;
