// Ashen Vow — a sealed letter burning from one corner; the wax seal bears an open hand with an eye, embers rise.
import { BLOOD, BLOOD_D, BONE, INK, PARCH, SHADOW } from '../palette.ts';

// the burnt edge, from the top edge down to the bottom edge
const EDGE = 'L130 36L127 43L137 46L134 54L145 58L142 67L153 71L150 81L161 86L158 97L169 103L167 116';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V150H0Z" fill="url(#hh-hatch-r)" opacity=".25"/>
  <path d="M40 146q60-14 130-6" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3" opacity=".6"/>

  <!-- the letter -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M34 46L128 30${EDGE}L50 134Z" fill="${SHADOW}" opacity=".5" stroke="none" transform="translate(4 5)"/>
    <path d="M34 46L128 30${EDGE}L50 134Z" fill="${BONE}" stroke-width="1.6"/>
    <path d="M34 46L90 90L50 134Z" fill="url(#hh-hatch)" opacity=".35" stroke="none"/>
    <path d="M34 46L90 90L128 30M50 134L90 90" fill="none" stroke-width=".9"/>
    <!-- lines of script -->
    <path d="M46 56q6-3 12-1t12-2t12-1t10-3M44 66q8-3 14-1t12-2t14-2M48 104q8-2 16-1t14-3t14-2t12-3M52 114q8-2 16-1t14-3t14-3M54 124q10-2 20-2t18-3" fill="none" stroke-width=".9"/>
    <!-- charred band along the burnt edge -->
    <path d="M122 31${EDGE}L160 117L159 104L150 98L152 88L141 82L144 72L133 68L135 60L125 55L127 48L118 44L121 37Z" fill="${INK}" stroke-width="1"/>
    <path d="M118 44L127 48L125 55L135 60L133 68L144 72L141 82L152 88L150 98L159 104L160 117" fill="none" stroke="${SHADOW}" stroke-width="1.4" stroke-dasharray="2 2"/>
    <path d="M150 81q14-4 18 6q-8-2-12 2z" fill="${SHADOW}" stroke-width="1"/>
    <path d="M150 81q14-4 18 6q-8-2-12 2z" fill="url(#hh-hatch-d)" opacity=".6" stroke="none"/>
  </g>

  <!-- flames licking the edge -->
  <g class="a-flicker" filter="url(#hh-soft-glow)">
    <path d="M130 38q-4-10 2-18q0 6 4 8q2-6 0-12q8 8 4 20q-4 4-10 2z" fill="url(#hh-flame)"/>
    <path d="M146 62q-4-9 2-16q0 5 3 7q2-5 0-10q7 7 3 17q-3 3-8 2z" fill="url(#hh-flame)"/>
    <path d="M160 92q-4-9 2-15q0 5 3 6q2-5 0-9q7 7 3 16q-3 3-8 2z" fill="url(#hh-flame)"/>
  </g>

  <!-- rising embers and ash flakes -->
  <g class="a-smoke">
    <circle cx="150" cy="24" r="1.4" fill="url(#hh-flame)"/><circle cx="162" cy="40" r="1.1" fill="url(#hh-flame)"/>
    <circle cx="172" cy="66" r="1.3" fill="url(#hh-flame)"/><circle cx="140" cy="14" r="1" fill="url(#hh-flame)"/>
    <path d="M168 24l4-1 1 3-4 1zM180 50l3 0 0 3-3 0zM156 14l3-2 1 3z" fill="${SHADOW}" stroke="${INK}" stroke-width=".6"/>
  </g>

  <!-- the wax seal: an open hand with an eye in the palm -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M84 96l-6 26 6-4 4 6 2-26zM96 96l2 24 4-5 5 4-4-24z" fill="${BLOOD}" stroke-width="1.1"/>
    <path d="M90 76q10-4 16 4q6 6 1 14q-2 8-12 8q-10 2-15-6q-6-8 0-15q4-6 10-5z" fill="${BLOOD}" stroke-width="1.5"/>
    <circle cx="92" cy="89" r="9" fill="none" stroke="${BLOOD_D}" stroke-width="1.6"/>
    <path d="M87 93v-8M90 92v-10M93 92v-10M96 93v-8M86 95q-3-3-3-6M86 94q6 5 11-1" fill="none" stroke="${BONE}" stroke-width="1" stroke-linecap="round"/>
    <path d="M88.5 89.5q3-2 6 0q-3 2-6 0z" fill="${BONE}" stroke="none"/>
    <circle cx="91.5" cy="89.5" r=".8" fill="${INK}" stroke="none"/>
  </g>
`;
