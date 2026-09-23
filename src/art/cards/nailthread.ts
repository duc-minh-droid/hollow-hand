// Nail & Thread — a mouth sewn shut with crude thread, knotted to a nail at one corner, the needle still through the last stitch.
import { BLOOD, BONE, INK, PARCH, SHADOW } from '../palette.ts';

// crude cross-stitches over the lip line (x positions along the seam)
const XS = [58, 70, 82, 94, 106, 118, 130];
const seamY = (x: number) => 78 + Math.sin((x - 40) / 30) * 1.5;
const stitches = () =>
  XS.map((x) => {
    const y = seamY(x);
    return `<path d="M${x - 4} ${y - 11}L${x + 4} ${y + 10}M${x + 4} ${y - 10}L${x - 3} ${y + 11}"/>`;
  }).join('');
const holes = () =>
  XS.map((x) => {
    const y = seamY(x);
    return `<circle cx="${x - 4}" cy="${y - 11}" r="1.1"/><circle cx="${x + 4}" cy="${y + 10}" r="1.1"/><circle cx="${x + 4}" cy="${y - 10}" r="1.1"/><circle cx="${x - 3}" cy="${y + 11}" r="1.1"/>`;
  }).join('');

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V150H0Z" fill="url(#hh-stipple)" opacity=".35"/>
  <!-- nose base and philtrum -->
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round" fill="none">
    <path d="M80 14q-6 14 6 20q6 3 14 0q8 3 14 0q12-6 6-20"/>
    <path d="M88 28q3-3 6 0M106 28q3-3 6 0" stroke-width="2"/>
    <path d="M96 36q-2 10 0 18M104 36q2 10 0 18" stroke-width="1"/>
    <path d="M30 20q-10 50 12 96q26 30 58 30q32 0 58-30q22-46 12-96" stroke-width="1.2" stroke-dasharray="6 3"/>
  </g>
  <path d="M30 20q-10 50 12 96q10 12 24 20L40 60Z" fill="url(#hh-hatch)" opacity=".45"/>
  <path d="M170 20q10 50-12 96q-10 12-24 20L160 60Z" fill="url(#hh-hatch-r)" opacity=".5"/>

  <!-- the lips, pulled tight -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M40 78Q60 58 90 60Q100 64 110 60Q140 58 160 78Q140 76 100 78Q60 76 40 78Z" fill="${BONE}" stroke-width="1.6"/>
    <path d="M40 78Q60 98 100 100Q140 98 160 78Q140 80 100 80Q60 80 40 78Z" fill="${BONE}" stroke-width="1.6"/>
    <path d="M40 78Q60 58 90 60Q100 64 110 60Q140 58 160 78Q140 76 100 78Q60 76 40 78Z" fill="url(#hh-hatch-r)" opacity=".5" stroke="none"/>
    <path d="M52 86Q80 98 148 86Q140 98 100 100Q60 98 52 86Z" fill="url(#hh-hatch)" opacity=".6" stroke="none"/>
    <path d="M40 78Q70 77 100 79Q130 77 160 78" fill="none" stroke-width="2.2"/>
    <path d="M60 66q2 4 0 8M76 64q2 5 0 9M124 64q-2 5 0 9M142 68q-2 3 0 6M66 88q2-3 0-6M134 88q-2-3 0-6" fill="none" stroke-width=".7"/>
  </g>

  <!-- punctures and thread -->
  <g fill="${BLOOD}">${holes()}</g>
  <g fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round">${stitches()}</g>
  <path d="M54 67L48 66L36 60" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M62 90q-2 6 0 10M118 90q2 4 1 8" fill="none" stroke="${BLOOD}" stroke-width="1.6" stroke-linecap="round"/>

  <!-- nail at the left corner, thread knotted round it -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M33 57L43 67" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M33 57L43 67" stroke="${SHADOW}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M28 55l7-4 3 5-7 4z" fill="${SHADOW}" stroke-width="1.2"/>
    <path d="M33 60q4-4 6 0q-3 4-6 0z" fill="none" stroke-width="1.2"/>
  </g>

  <!-- the needle through the last stitch, thread trailing -->
  <path d="M134 89Q146 108 166 98Q180 90 180 70" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
  <g class="a-float" stroke="${INK}" stroke-linejoin="round">
    <path d="M126 73L181 43q3 0 2 3L128 75z" fill="${BONE}" stroke-width="1.1"/>
    <path d="M174 47.4l5-2.6" stroke-width="1.2"/>
    <path d="M178 46q4 12 2 24" fill="none" stroke-width="1.6"/>
  </g>
  <g class="a-drip"><path d="M62 104q-3 4 0 6q3-2 0-6z" fill="${BLOOD}" stroke="${INK}" stroke-width=".6"/></g>
`;
