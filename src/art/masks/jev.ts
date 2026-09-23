// Jev, Unmasked (XXII, boss) — no mask left: a gaunt face of layered paper peeling away from a hollow,
// candle-flame pupils, a crown of fanned playing cards, and too many long fingers holding cards about the face.
import { BLOOD, BLOOD_D, BONE, FLAME, GOLD, GOLD_D, INK, LACQUER, PARCH } from '../palette.ts';

// Card pips drawn in a card's local frame (pip centred on 0,0).
const PIPS: Record<string, string> = {
  heart: `<path d="M0 6C-8 0 -7 -7 -2.5 -6.5Q-1 -6.2 0 -4Q1 -6.2 2.5 -6.5C7 -7 8 0 0 6Z" fill="${BLOOD}"/>`,
  diamond: `<path d="M0 -7L5 0L0 7L-5 0Z" fill="${BLOOD}"/>`,
  spade: `<path d="M0 -7C-7 -1 -7 4 -2 3.5L-3.5 7H3.5L2 3.5C7 4 7 -1 0 -7Z" fill="${INK}"/>`,
  club: `<g fill="${INK}"><circle cx="0" cy="-3.6" r="2.8"/><circle cx="-3.4" cy="1.4" r="2.8"/><circle cx="3.4" cy="1.4" r="2.8"/><path d="M-1 1h2l1.6 6h-5.2z"/></g>`,
  eye: `<path d="M-7 0Q0 -6 7 0Q0 6 -7 0Z" fill="${BONE}" stroke="${INK}" stroke-width="1"/><circle r="2.4" fill="${BLOOD}"/><circle r="1" fill="${INK}"/>`,
};

// One playing card, w x h, centred at the origin of its own frame.
const card = (w: number, h: number, pip: string) => `
  <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="3" fill="${BONE}" stroke="${INK}" stroke-width="1.6"/>
  <rect x="${-w / 2 + 3}" y="${-h / 2 + 3}" width="${w - 6}" height="${h - 6}" rx="1.5" fill="none" stroke="${INK}" stroke-width=".6"/>
  ${PIPS[pip]}
  <circle cx="${-w / 2 + 5.5}" cy="${-h / 2 + 6}" r="1.2" fill="${pip === 'heart' || pip === 'diamond' ? BLOOD : INK}"/>
  <circle cx="${w / 2 - 5.5}" cy="${h / 2 - 6}" r="1.2" fill="${pip === 'heart' || pip === 'diamond' ? BLOOD : INK}"/>`;

const cardBack = (w: number, h: number) => `
  <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="3" fill="${PARCH}" stroke="${INK}" stroke-width="1.6"/>
  <rect x="${-w / 2 + 3}" y="${-h / 2 + 3}" width="${w - 6}" height="${h - 6}" rx="1.5" fill="url(#hh-hatch-blood)" stroke="${BLOOD_D}" stroke-width="1"/>
  <path d="M0 ${-h / 2 + 7}L${w / 2 - 7} 0L0 ${h / 2 - 7}L${-w / 2 + 7} 0Z" fill="${PARCH}" stroke="${BLOOD_D}" stroke-width="1"/>
  <circle r="2.2" fill="${BLOOD}"/>`;

const crown = () =>
  [
    [-60, 'spade'],
    [-40, 'heart'],
    [-20, 'club'],
    [20, 'diamond'],
    [40, 'spade'],
    [60, 'heart'],
    [0, 'eye'],
  ]
    .map(([a, pip]) => `<g transform="translate(120 112) rotate(${a}) translate(0 -74)">${card(26, 40, pip as string)}</g>`)
    .join('');

// A long jointed finger from a base point: each segment turns by `curl` degrees (0 = straight up).
// Returns the joint points (left-hand orientation; the caller mirrors for the right hand).
const joints = (x: number, y: number, deg: number, lens: number[], curl: number) => {
  const pts: [number, number, number][] = [[x, y, deg]];
  let a = deg;
  for (const l of lens) {
    const r = (a * Math.PI) / 180;
    x += Math.sin(r) * l;
    y -= Math.cos(r) * l;
    pts.push([x, y, a]);
    a += curl;
  }
  return pts;
};

// Five long fingers and a thumb; the two outer fingers pinch a card each, the inner ones stroke the face.
const hand = (flip: boolean) => {
  const X = (x: number) => +(flip ? 240 - x : x).toFixed(1);
  const Y = (y: number) => +y.toFixed(1);
  const A = (a: number) => (flip ? -a : a);
  const digits = [
    joints(40, 230, -22, [28, 26, 18], 12),
    joints(44, 226, -8, [32, 28, 20], 12),
    joints(50, 226, 4, [36, 32, 24], 10),
    joints(54, 226, 22, [30, 24, 10], 20),
    joints(58, 230, 40, [24, 18, 10], 20),
    joints(36, 238, -70, [18, 16], -8),
  ];
  const path = (pts: [number, number, number][]) => 'M' + pts.map(([x, y]) => `${X(x)} ${Y(y)}`).join('L');
  const ticks = digits
    .flatMap((pts) => pts.slice(1, -1))
    .map(([x, y, a]) => {
      const r = (a * Math.PI) / 180;
      const c = Math.cos(r) * 2.6;
      const s = Math.sin(r) * 2.6;
      return `M${X(x - c)} ${Y(y - s)}L${X(x + c)} ${Y(y + s)}`;
    })
    .join('');
  const nails = digits
    .map((pts) => {
      const [x, y] = pts[pts.length - 1];
      return `<circle cx="${X(x)}" cy="${Y(y)}" r="1.8"/>`;
    })
    .join('');
  // cards sit on the fingertips of the two outer fingers, leaning with the last joint
  const held = [0, 1]
    .map((i) => {
      const [x, y, a] = digits[i][digits[i].length - 1];
      const r = (a * Math.PI) / 180;
      const cx = x + Math.sin(r) * 14;
      const cy = y - Math.cos(r) * 14;
      const face = flip ? (i ? cardBack(24, 36) : card(24, 36, 'club')) : i ? card(24, 36, 'heart') : cardBack(24, 36);
      return `<g transform="translate(${X(cx)} ${Y(cy)}) rotate(${A(a).toFixed(1)})">${face}</g>`;
    })
    .join('');
  const d = digits.map(path).join('');
  return `
    ${held}
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="${d}" stroke="${INK}" stroke-width="7.4"/>
      <path d="${d}" stroke="${PARCH}" stroke-width="4.6"/>
      <path d="${d}" stroke="url(#hh-hatch)" stroke-width="4.6" opacity=".3"/>
      <path d="${ticks}" stroke="${INK}" stroke-width="1"/>
    </g>
    <g fill="${BONE}" stroke="${INK}" stroke-width=".8">${nails}</g>
    <!-- palm, knuckles and sleeve cuff -->
    <ellipse cx="${X(47)}" cy="236" rx="17" ry="11" transform="rotate(${A(-8)} ${X(47)} 236)" fill="${PARCH}" stroke="${INK}" stroke-width="2"/>
    <ellipse cx="${X(47)}" cy="236" rx="17" ry="11" transform="rotate(${A(-8)} ${X(47)} 236)" fill="url(#hh-hatch-d)" opacity=".4"/>
    <path d="M${X(36)} 230q3-3 6 0M${X(44)} 227q3-3 6 0M${X(52)} 228q3-3 6 0" fill="none" stroke="${INK}" stroke-width="1"/>
    <path d="M${X(12)} 280L${X(22)} 246Q${X(46)} 238 ${X(74)} 246L${X(80)} 280Z" fill="${LACQUER}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M${X(22)} 246L${X(27)} 240L${X(32)} 245L${X(37)} 239L${X(42)} 244L${X(47)} 239L${X(52)} 244L${X(57)} 239L${X(62)} 245L${X(67)} 240L${X(74)} 246" fill="none" stroke="${BONE}" stroke-width="1" opacity=".7"/>
    <path d="M${X(24)} 256Q${X(48)} 250 ${X(76)} 258M${X(30)} 280Q${X(34)} 266 ${X(40)} 256" fill="none" stroke="${BONE}" stroke-width=".8" opacity=".3"/>`;
};

export default () => `
  <!-- hood and shoulders -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M0 280V250C18 226 50 212 80 206L120 222L160 206C190 212 222 226 240 250V280Z" fill="${LACQUER}"/>
    <path d="M120 6C68 6 38 50 34 112C31 162 44 204 66 234L84 256H156L174 234C196 204 209 162 206 112C202 50 172 6 120 6Z" fill="${LACQUER}"/>
    <path d="M120 24C80 24 58 62 56 112C54 158 68 196 90 222H150C172 196 186 158 184 112C182 62 160 24 120 24Z" fill="${INK}" stroke="none"/>
  </g>
  <path d="M120 6C68 6 38 50 34 112C31 162 44 204 66 234L76 246C56 206 46 164 48 114C52 56 80 14 120 12Z" fill="url(#hh-hatch-bone)" opacity=".3"/>
  <path d="M120 6C68 6 38 50 34 112C31 162 44 204 66 234M120 6C172 6 202 50 206 112C209 162 196 204 174 234" fill="none" stroke="${BONE}" stroke-width=".9" opacity=".4"/>
  <path d="M0 262C24 240 52 228 80 222M240 262C216 240 188 228 160 222" fill="none" stroke="${BONE}" stroke-width=".8" opacity=".3"/>

  <!-- crown of playing cards, fanned behind the head -->
  <g>${crown()}</g>

  <!-- neck and high collar -->
  <g stroke="${INK}" stroke-width="1.8" stroke-linejoin="round">
    <path d="M108 204L106 236H134L132 204Z" fill="${PARCH}"/>
    <path d="M124 204H132L134 236H126Z" fill="url(#hh-hatch-d)" opacity=".6" stroke="none"/>
    <path d="M86 214L106 232L120 262L134 232L154 214L164 250Q120 268 76 250Z" fill="${LACQUER}"/>
    <path d="M106 232L120 262L134 232" fill="none" stroke="${BONE}" stroke-width=".9" opacity=".5"/>
  </g>

  <!-- the gaunt paper face -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M120 70C146 70 160 92 160 126C160 162 150 196 134 212Q120 220 106 212C90 196 80 162 80 126C80 92 94 70 120 70Z" fill="${PARCH}"/>
  </g>
  <!-- forehead layer with a torn lower edge -->
  <path d="M82 104C86 82 100 72 120 72C140 72 154 82 158 104L150 100L142 106L132 99L122 106L112 99L102 106L92 100Z" fill="${BONE}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
  <!-- hollow temples and sunken cheeks -->
  <path d="M82 110Q86 124 88 132Q84 124 82 110ZM158 110Q154 124 152 132Q156 124 158 110Z" fill="url(#hh-hatch-d)" opacity=".7"/>
  <path d="M86 148Q94 170 106 190Q92 184 86 164Z" fill="url(#hh-hatch-d)" opacity=".65"/>
  <path d="M154 148Q146 170 134 190Q148 184 154 164Z" fill="url(#hh-hatch-d)" opacity=".75"/>
  <path d="M146 76C156 86 160 104 160 126C160 162 150 196 134 212C146 190 152 160 150 126C150 104 150 88 146 76Z" fill="url(#hh-hatch-r)" opacity=".6"/>
  <g fill="none" stroke="${INK}" stroke-linecap="round">
    <path d="M86 144Q98 138 110 148M154 144Q142 138 130 148" stroke-width="1.3"/>
  </g>
  <!-- stacked paper edges on the right cheek -->
  <path d="M138 158L154 150M140 166L155 158M142 174L154 168" fill="none" stroke="${INK}" stroke-width=".9"/>
  <!-- peeled layer on the left cheek, the hollow beneath -->
  <path d="M96 153L101 150L105 153L110 151L108 158L111 163L106 168L107 174L101 172L97 166L99 160Z" fill="${INK}" stroke="${INK}" stroke-width="1" stroke-linejoin="round"/>
  <path d="M96 153L101 150L105 153L110 151L108 158L111 163L106 168L107 174L101 172L97 166L99 160Z" fill="url(#hh-hatch-bone)" opacity=".3"/>
  <path d="M110 151L108 158L111 163L106 168L107 174Q114 172 118 176Q122 166 118 158Q114 152 110 151Z" fill="${BONE}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M110 157Q115 160 115 168" fill="none" stroke="${INK}" stroke-width=".7"/>
  <path d="M118 176Q122 166 118 158Q120 166 116 172Z" fill="url(#hh-hatch)" opacity=".6"/>
  <!-- a strip hanging loose from the jaw -->
  <g class="a-sway">
    <path d="M144 196L154 186L158 214L150 228L146 212Z" fill="${BONE}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M150 198L154 214L150 222Z" fill="url(#hh-hatch)" opacity=".5"/>
  </g>
  <!-- nose -->
  <path d="M121 124L117 162Q120 166 124 162" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M115 164q1-3 3-2M125 164q-1-3-3-2" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>

  <!-- circlet where the cards tuck in -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M82 96Q120 80 158 96L156 103Q120 88 84 103Z" fill="${GOLD}"/>
    <path d="M140 88Q150 91 158 96L156 103Q148 99 138 95Z" fill="${GOLD_D}" stroke="none"/>
    <g fill="${BLOOD}" stroke-width="1"><circle cx="120" cy="90" r="2.4"/><circle cx="100" cy="93" r="1.6"/><circle cx="140" cy="93" r="1.6"/></g>
  </g>

  <g class="m-eyes">
    <path d="M86 122Q98 106 114 120Q112 134 100 135Q88 133 86 122Z" fill="${INK}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M154 122Q142 106 126 120Q128 134 140 135Q152 133 154 122Z" fill="${INK}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
    <g class="a-flicker" filter="url(#hh-soft-glow)">
      <path d="M100 113Q94 121 96 126Q100 131 104 126Q106 120 100 113Z" fill="${FLAME}" stroke="${BLOOD}" stroke-width=".8"/>
      <path d="M100 119Q98 123 99 125Q100.5 126.5 102 125Q102.5 122.5 100 119Z" fill="${BONE}"/>
      <path d="M140 113Q134 121 136 126Q140 131 144 126Q146 120 140 113Z" fill="${FLAME}" stroke="${BLOOD}" stroke-width=".8"/>
      <path d="M140 119Q138 123 139 125Q140.5 126.5 142 125Q142.5 122.5 140 119Z" fill="${BONE}"/>
    </g>
  </g>

  <g class="m-mouth">
    <path d="M100 188Q120 196 140 188Q120 202 100 188Z" fill="${INK}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M106 187.5v9M113 189.5v9M120 190.5v9M127 189.5v9M134 187.5v9" fill="none" stroke="${BLOOD}" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M100 188q-3-2-4-6M140 188q3-2 4-6" fill="none" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>
  </g>

  <!-- hands and cards about the face -->
  ${hand(false)}
  ${hand(true)}

  <g class="crack crack-1" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M132 106l-3 7 4 4-4 7"/>
    <path d="M130 114l-5 1"/>
  </g>
  <g class="crack crack-2" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M81 132l7 3 2 6 7 2"/>
    <path d="M158 142l-7 5 1 6-6 5"/>
    <path d="M110 208l3-6-2-6"/>
  </g>
  <g class="crack crack-3" fill="none" stroke="${INK}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M108 106l4 9-5 7 6 8-4 9 7 9-3 10 6 9-4 11 3 10-4 12"/>
    <path d="M111 139l10 2 5 7"/>
    <path d="M114 176l-9 4-2 7"/>
    <path d="M150 116l-7 6 2 8"/>
  </g>
`;
