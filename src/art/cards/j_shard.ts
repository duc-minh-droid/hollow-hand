// Mirror Shard — a jagged sliver of looking-glass; an eye stares back from inside, and its edge is wet.
import { BLOOD, BLOOD_D, BONE, GOLD, INK } from '../palette.ts';

const SHARD = 'M78 14L122 22L136 60L118 96L128 138L96 128L70 92L84 58Z';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>

  <!-- scattered fragments -->
  <g stroke="${BONE}" stroke-width="1" stroke-linejoin="round" fill="url(#hh-night)">
    <path d="M34 36L50 30L44 50Z"/><path d="M154 34L170 44L156 52Z"/>
    <path d="M36 112L52 104L50 124Z"/><path d="M156 108L172 118L160 130Z"/>
  </g>
  <g fill="none" stroke="${BONE}" stroke-width=".6" opacity=".7"><path d="M38 38L46 34M158 38L164 42M40 112L48 108M160 112L166 118"/></g>

  <!-- the shard -->
  <path d="${SHARD}" fill="url(#hh-night)" stroke="${BONE}" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M84 20L100 18L78 70L76 60Z" fill="${BONE}" opacity=".18"/>
  <path d="M112 100L126 120L116 132L104 116Z" fill="${BONE}" opacity=".12"/>
  <path d="${SHARD}" fill="url(#hh-hatch-bone-d)" opacity=".15"/>
  <path d="M90 26L102 44M112 30L108 52M88 110L100 124" fill="none" stroke="${BONE}" stroke-width=".6" opacity=".5"/>

  <!-- the reflected eye -->
  <path d="M84 70Q103 54 122 70Q103 86 84 70Z" fill="${BONE}" stroke="${INK}" stroke-width="1.2"/>
  <path d="M86 72Q103 84 120 72Q103 80 86 72Z" fill="url(#hh-hatch)" opacity=".5"/>
  <circle cx="103" cy="70" r="8" fill="${BLOOD}" stroke="${INK}" stroke-width="1"/>
  <circle cx="103" cy="70" r="8" fill="url(#hh-hatch-blood)" opacity=".6"/>
  <ellipse cx="103" cy="70" rx="1.6" ry="6" fill="${INK}"/>
  <circle cx="106" cy="66" r="1.4" fill="${BONE}"/>
  <path d="M88 62q15-10 30 0" fill="none" stroke="${BONE}" stroke-width="1" opacity=".7"/>

  <!-- blood along the cutting edge -->
  <path d="M122 22L136 60L126 80" fill="none" stroke="${BLOOD}" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M124 30L133 56" stroke="${BLOOD_D}" stroke-width="1.2"/>
  <path d="M130 64q2 10 0 16" fill="none" stroke="${BLOOD}" stroke-width="2" stroke-linecap="round"/>
  <g class="a-drip">
    <path d="M130 84q-3.5 5 0 8q3.5-3 0-8z" fill="${BLOOD}" stroke="${BONE}" stroke-width=".5"/>
  </g>

  <g class="a-glint">
    <path d="M82 18l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" fill="${GOLD}"/>
    <circle cx="70" cy="92" r="1.2" fill="${BONE}"/>
  </g>
`;
