// Crow's Omen — a crow perched on a skull under a thin moon; one eye catches gold, a feather drifts down.
import { BONE, GOLD, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V60C150 44 60 70 0 50Z" fill="url(#hh-hatch)" opacity=".5"/>
  <path d="M0 150V140Q100 132 200 140V150Z" fill="url(#hh-hatch-h)" opacity=".6"/>
  <path d="M0 140Q100 132 200 140" fill="none" stroke="${INK}" stroke-width="1"/>
  <g stroke="${INK}" stroke-width="1.3">
    <path d="M160 18a18 18 0 1 0 12 30a14 14 0 1 1-12-30z" fill="${BONE}"/>
    <path d="M150 38q2 2 4 0" fill="none" stroke-width="1"/>
  </g>
  <g fill="${INK}"><circle cx="30" cy="24" r="1.2"/><circle cx="120" cy="18" r="1"/><circle cx="186" cy="70" r="1.1"/>
    <path d="M40 60l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z"/></g>

  <!-- the skull -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M70 118Q68 86 100 84Q132 86 130 118Q130 128 122 131L120 142H80L78 131Q70 128 70 118Z" fill="${BONE}"/>
    <path d="M110 86Q130 90 130 118Q130 128 122 131L120 142H110Q124 120 110 86Z" fill="url(#hh-hatch-r)" opacity=".6" stroke="none"/>
    <path d="M78 110Q78 102 88 102Q97 103 96 112Q94 120 86 119Q78 118 78 110Z" fill="${INK}"/>
    <path d="M104 112Q103 103 112 102Q122 102 122 110Q122 118 114 119Q106 120 104 112Z" fill="${INK}"/>
    <path d="M100 116L96 126H104Z" fill="${INK}"/>
    <path d="M82 131H118M86 131v11M91 131v11M96 131v11M100 131v11M104 131v11M109 131v11M114 131v11" stroke-width="1"/>
    <path d="M86 90q-2 6 2 10M116 92l-3 5 3 3" fill="none" stroke-width=".9"/>
  </g>

  <!-- the crow -->
  <g stroke="${INK}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
    <path d="M93 78l-2 8M91 86l-5 1M91 86l1 3M107 78l1 8M108 86l-4 1M108 86l4 2" fill="none" stroke-width="2"/>
    <path d="M66 34Q70 26 82 27Q96 29 112 40Q130 50 132 68L160 88L156 94L150 92L152 98L144 94L120 80Q100 84 86 76Q72 66 72 52Q66 48 66 42Z" fill="${INK}"/>
    <path d="M84 48Q104 44 122 58Q130 68 128 76L112 70L118 78L102 72L106 80Q90 72 84 60Z" fill="url(#hh-hatch-bone)" stroke="${BONE}" stroke-width=".7" opacity=".7"/>
    <path d="M132 68L156 90M134 76L150 92" fill="none" stroke="${BONE}" stroke-width=".6" opacity=".6"/>
    <path d="M68 33L44 40L68 46Q65 40 68 33Z" fill="${INK}"/>
    <path d="M50 40L66 39" fill="none" stroke="${BONE}" stroke-width=".7"/>
    <path d="M72 52Q78 60 86 62" fill="none" stroke="${BONE}" stroke-width=".6" opacity=".6"/>
    <circle cx="76" cy="36" r="3.4" fill="${GOLD}" stroke-width="1"/>
    <circle cx="76.4" cy="36" r="1.3" fill="${INK}" stroke="none"/>
  </g>
  <g class="a-glint">
    <path d="M80 28l1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2z" fill="${GOLD}" stroke="${INK}" stroke-width=".5"/>
  </g>

  <!-- a falling feather -->
  <g class="a-float">
    <g transform="rotate(34 166 104)" stroke="${INK}" stroke-linejoin="round">
      <path d="M166 84Q174 96 170 118L166 124L162 118Q158 96 166 84Z" fill="${SHADOW}" stroke-width="1.2"/>
      <path d="M166 84Q174 96 170 118L166 124Z" fill="url(#hh-hatch-d)" opacity=".7" stroke="none"/>
      <path d="M166 86V130M166 94l-3 3M166 100l-4 4M166 106l-4 4M166 96l3 3M166 102l4 4M166 110l3 3" fill="none" stroke-width=".8"/>
    </g>
  </g>
`;
