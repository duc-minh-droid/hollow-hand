// The Devil (XV, elite) — a horned goat-skull mask, inverted star on the brow, a jaw of gold teeth,
// and chains draped across the shoulders to a padlock at the throat.
import { BLOOD, BONE, FLAME, GOLD, GOLD_D, INK, LACQUER, PARCH, SHADOW } from '../palette.ts';

// Chain links along a quadratic curve, alternating face-on and edge-on.
const chain = (x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, n: number) => {
  let s = '';
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    const x = u * u * x0 + 2 * u * t * cx + t * t * x1;
    const y = u * u * y0 + 2 * u * t * cy + t * t * y1;
    const dx = 2 * u * (cx - x0) + 2 * t * (x1 - cx);
    const dy = 2 * u * (cy - y0) + 2 * t * (y1 - cy);
    const a = ((Math.atan2(dy, dx) * 180) / Math.PI).toFixed(1);
    const ry = i % 2 ? 1.4 : 3.3;
    s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="5.4" ry="${ry}" transform="rotate(${a} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  return s;
};

const chains = () =>
  chain(4, 234, 58, 290, 112, 262, 20) + chain(236, 234, 182, 290, 128, 262, 20) + chain(0, 212, 40, 250, 70, 224, 9) + chain(240, 212, 200, 250, 170, 224, 9);

const horn = (flip: boolean) => {
  const f = (x: number) => (flip ? 240 - x : x);
  const P = (x: number, y: number) => `${f(x)} ${y}`;
  return `
    <path d="M${P(84, 72)}C${P(58, 66)} ${P(30, 46)} ${P(30, 8)}C${P(46, 32)} ${P(76, 38)} ${P(102, 48)}Z" fill="${PARCH}"/>
    <path d="M${P(84, 72)}C${P(58, 66)} ${P(30, 46)} ${P(30, 8)}C${P(38, 40)} ${P(62, 56)} ${P(90, 62)}Z" fill="url(#hh-hatch-d)" opacity=".55" stroke="none"/>
    <path d="M${P(38, 20)}L${P(44, 16)}M${P(38, 32)}L${P(48, 25)}M${P(42, 42)}L${P(54, 32)}M${P(50, 52)}L${P(62, 38)}M${P(60, 59)}L${P(72, 42)}M${P(71, 64)}L${P(84, 45)}" fill="none" stroke-width="1.1"/>`;
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
  <path d="M0 262C24 240 52 228 80 222M240 262C216 240 188 228 160 222M34 280C38 262 50 248 62 240M206 280C202 262 190 248 178 240" fill="none" stroke="${BONE}" stroke-width=".8" opacity=".3"/>
  <path d="M0 280V250C18 226 50 212 80 206L88 210C58 220 30 238 12 264V280Z" fill="url(#hh-hatch-bone-d)" opacity=".25"/>

  <!-- horns -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">${horn(false)}${horn(true)}</g>

  <!-- goat skull -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M80 76C80 54 98 42 120 42C142 42 160 54 160 76C160 98 154 118 148 134C146 160 142 184 138 204H102C98 184 94 160 92 134C86 118 80 98 80 76Z" fill="${BONE}"/>
  </g>
  <path d="M146 50C156 58 160 66 160 76C160 98 154 118 148 134C146 160 142 184 138 204H128C134 184 138 160 138 134C142 114 148 94 146 50Z" fill="url(#hh-hatch-r)" opacity=".6"/>
  <path d="M92 134C94 160 98 184 102 204H108C104 184 102 160 102 136Z" fill="url(#hh-hatch)" opacity=".45"/>
  <!-- suture, cheek ridges, snout ridges -->
  <g fill="none" stroke="${INK}" stroke-linecap="round">
    <path d="M100 50l4 3 4-2 4 3 4-2 4 3 4-2 4 3 4-2 4 3" stroke-width=".9"/>
    <path d="M84 104Q86 122 96 132M156 104Q154 122 144 132" stroke-width="1.2"/>
    <path d="M110 134Q114 150 112 170M130 134Q126 150 128 170" stroke-width="1.1"/>
    <path d="M116 132v8M124 132v8" stroke-width=".8"/>
  </g>
  <!-- inverted star -->
  <circle cx="120" cy="75" r="15.5" fill="none" stroke="${INK}" stroke-width="1.1"/>
  <path d="M120 89L111.8 63.7L133.3 79.3L106.7 79.3L128.2 63.7Z" fill="none" stroke="${BLOOD}" stroke-width="2" stroke-linejoin="round"/>
  <!-- nasal slits -->
  <path d="M111 172Q114 160 118 176Q114 182 111 172ZM129 172Q126 160 122 176Q126 182 129 172Z" fill="${INK}" stroke="${INK}" stroke-width="1" stroke-linejoin="round"/>

  <g class="m-eyes">
    <path d="M84 102C90 92 106 94 111 104C114 116 106 126 97 124C88 122 82 112 84 102Z" fill="${INK}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M156 102C150 92 134 94 129 104C126 116 134 126 143 124C152 122 158 112 156 102Z" fill="${INK}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <g filter="url(#hh-soft-glow)">
      <circle cx="98" cy="110" r="4.8" fill="${BLOOD}"/>
      <circle cx="98" cy="110" r="2.2" fill="${FLAME}"/>
      <circle cx="142" cy="110" r="4.8" fill="${BLOOD}"/>
      <circle cx="142" cy="110" r="2.2" fill="${FLAME}"/>
    </g>
    <circle cx="99.6" cy="108.4" r=".9" fill="${BONE}"/>
    <circle cx="143.6" cy="108.4" r=".9" fill="${BONE}"/>
  </g>

  <g class="m-mouth">
    <path d="M100 198H140L137 222Q120 232 103 222Z" fill="${INK}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <g fill="${GOLD}" stroke="${INK}" stroke-width="1" stroke-linejoin="round">
      <path d="M101 199h5.4v8l-2.7 4-2.7-4z"/><path d="M106.4 199h5.4v9l-2.7 4-2.7-4z"/>
      <path d="M111.8 199h5.4v10l-2.7 4-2.7-4z"/><path d="M117.2 199h5.6v11l-2.8 4-2.8-4z"/>
      <path d="M122.8 199h5.4v10l-2.7 4-2.7-4z"/><path d="M128.2 199h5.4v9l-2.7 4-2.7-4z"/>
      <path d="M133.6 199h5.4v8l-2.7 4-2.7-4z"/>
      <path d="M106 225v-5l2.5-4 2.5 4v5zM112 227v-6l2.5-4 2.5 4v6zM118 228v-6l2 -4 2 4v6zM123 227v-6l2.5-4 2.5 4v6zM129 225v-5l2.5-4 2.5 4v5z"/>
    </g>
    <path d="M103 200h3M117.5 200h3M129 200h3" fill="none" stroke="${FLAME}" stroke-width=".8" opacity=".8"/>
  </g>

  <!-- chains draped across the shoulders -->
  <g fill="none" stroke="${INK}" stroke-width="3.6">${chains()}</g>
  <g fill="none" stroke="${SHADOW}" stroke-width="1.7">${chains()}</g>
  <!-- padlock at the throat -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M113 256V250A7 7 0 0 1 127 250V256" fill="none" stroke-width="4"/>
    <path d="M113 256V250A7 7 0 0 1 127 250V256" fill="none" stroke="${SHADOW}" stroke-width="1.8"/>
    <rect x="109" y="255" width="22" height="18" rx="2.5" fill="${GOLD}"/>
    <rect x="109" y="255" width="22" height="18" rx="2.5" fill="url(#hh-hatch-d)" opacity=".35"/>
    <path d="M120 260a2.4 2.4 0 1 1 0 4.8l1.4 4.6h-2.8l1.4-4.6a2.4 2.4 0 1 1 0-4.8z" fill="${INK}" stroke="none"/>
    <path d="M111 258h18" fill="none" stroke="${GOLD_D}" stroke-width="1"/>
  </g>

  <g class="crack crack-1" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M140 46l-3 7 4 4-4 7 2 5"/>
    <path d="M139 57l6 1"/>
  </g>
  <g class="crack crack-2" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M81 86l8 2 2 6 7 0"/>
    <path d="M150 140l-6 4 0 7-6 4 1 6"/>
    <path d="M44 22l6 6-2 6 5 4"/>
  </g>
  <g class="crack crack-3" fill="none" stroke="${INK}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M108 44l4 10-5 7 6 8-4 8 7 10-2 9 6 10-5 9 5 10-4 12 5 10-3 12 4 12"/>
    <path d="M112 86l-9 4-3 7"/>
    <path d="M116 132l10 5 3 8"/>
    <path d="M192 18l-5 7 3 6-6 5"/>
  </g>
`;
