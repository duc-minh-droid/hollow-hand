// Small hand-drawn glyphs for the interface. 24×24 unless noted. Stroke = currentColor.
import { BLOOD, BONE, GOLD, INK, LACQUER } from './palette.ts';

const S = (d: string, extra = '') => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const Fl = (d: string, fill = 'currentColor') => `<path d="${d}" fill="${fill}"/>`;

export const ICON: Record<string, string> = {
  // suits
  blades: S('M12 2v15M8 17h8M12 17v5M10 5l2-3 2 3'),
  chalices: S('M6 3h12c0 6-3 9-6 9s-6-3-6-9zM12 12v6M8 21h8M9 18h6'),
  coins: S('M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 6l1.8 5.4H19l-4.4 3.2 1.7 5.2L12 16.6l-4.3 3.2 1.7-5.2L5 11.4h5.2z'),
  wands: S('M5 21L19 3M15 3c2 0 4 1 4 4M9 9c-2-1-3-3-2-5M15 15c1 2 3 3 5 2'),
  curse: S('M12 4c5 0 9 4 9 8s-4 8-9 8-9-4-9-8 4-8 9-8zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6zM12 20v3M9 21l-1 2M15 21l1 2'),

  // intents (Jev's face-down sigils)
  strike: S('M4 20L18 6M14 4l6 0 0 6M6 14l4 4M3 21l3-1-2-2z'),
  guard: S('M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z') + S('M12 7v10M8 11h8', 'stroke-width="1.2"'),
  curseIntent: S('M12 3a9 5 0 1 0 0 10a9 5 0 1 0 0-10zM12 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5zM6 16l-2 5M12 16v6M18 16l2 5'),
  trick: S('M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z'),
  lie: S('M4 12c3-5 13-5 16 0-3 5-13 5-16 0zM3 3l18 18'),

  // statuses
  bleed: Fl('M12 2c3 5 7 9 7 13a7 7 0 0 1-14 0c0-4 4-8 7-13z'),
  hex: S('M12 5c-6 0-9 7-9 7s3 7 9 7 9-7 9-7-3-7-9-7zM12 9v6M9 12h6'),
  frail: S('M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5zM12 5l-2 5 3 2-2 6'),
  thorns: S('M3 20C8 16 16 8 21 4M7 16l-3-1M10 13l-1-3M13 10l3 1M16 7l-1-3M9 15l1 3M15 9l3 0'),
  fury: Fl('M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 3 3 3 5 1-2 1-6 1-10z'),
  omen: S('M4 12c3-4 13-4 16 0-3 4-13 4-16 0z') + Fl('M12 9.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z') + S('M12 2v3M12 19v3M4 5l2 2M20 5l-2 2'),
  dread: S('M10 21h4M11 21V11h2v10M12 11V8') + S('M9 5c1-2 5-2 6 0', 'stroke-dasharray="1.5 2"'),
  veil: S('M4 20c0-8 3-16 8-16s8 8 8 16c-2-2-3-2-4 0-1-2-3-2-4 0-1-2-3-2-4 0-1-2-2-2-4 0zM9.5 11h.1M14.5 11h.1'),
  twice: S('M8 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10zM16 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10z'),

  // hud
  heart: Fl('M12 21S3 14.5 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 14.5 12 21 12 21z'),
  shield: Fl('M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z'),
  tooth: S('M7 3c-3 0-4 3-3 7l2 10c.5 2 2 2 2.5 0L10 14c.5-2 3.5-2 4 0l1.5 6c.5 2 2 2 2.5 0l2-10c1-4 0-7-3-7-2 0-3 1-5 1S9 3 7 3z'),
  eye: S('M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z') + Fl('M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z'),
  eyeClosed: S('M2 12s4 5 10 5 10-5 10-5M5 15l-2 2M9 17l-1 3M15 17l1 3M19 15l2 2'),
  gear: S('M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2'),
  deck: S('M5 5h10v15H5zM8 2h10v15'),
  urn: S('M8 3h8M9 3c0 3-4 4-4 9s3 9 7 9 7-4 7-9-4-6-4-9M7 12h10'),
  quill: S('M20 2C12 4 7 10 5 19l-2 3M20 2c-2 6-6 10-12 12M9 13l-2-1'),
};

export function icon(name: string, cls = '') {
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[name] ?? ''}</svg>`;
}

/** Candle for the energy row. `lit` shows a flickering flame. */
export function candleSvg(lit: boolean) {
  return `<svg class="candle ${lit ? 'lit' : 'out'}" viewBox="0 0 24 48" aria-hidden="true">
    ${lit ? `<g class="a-flicker"><ellipse cx="12" cy="10" rx="5" ry="9" fill="url(#hh-flame)"/><ellipse cx="12" cy="12" rx="1.8" ry="4" fill="#fff6d8"/></g>` :
      `<g class="a-smoke"><path d="M12 16c-2-3 2-5 0-8s2-4 0-7" fill="none" stroke="#6b5d4f" stroke-width="1" opacity=".7"/></g>`}
    <path d="M12 19v-3" stroke="${INK}" stroke-width="1.2"/>
    <path d="M6 20h12v24c0 2-12 2-12 0z" fill="${BONE}" stroke="${INK}" stroke-width="1.3"/>
    <path d="M6 20h12v24c0 2-12 2-12 0z" fill="url(#hh-hatch)" opacity=".35"/>
    <path d="M9 20v7c0 2 2 2 2 0v-4" fill="${BONE}" stroke="${INK}" stroke-width="1"/>
  </svg>`;
}

/** Card back: an eye mandala in gold on black lacquer. viewBox 0 0 250 400. */
export function cardBack() {
  const rays = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r1 = 58;
    const r2 = i % 2 ? 84 : 100;
    return `<line x1="${125 + Math.cos(a) * r1}" y1="${200 + Math.sin(a) * r1}" x2="${125 + Math.cos(a) * r2}" y2="${200 + Math.sin(a) * r2}"/>`;
  }).join('');
  const petals = Array.from({ length: 8 }, (_, i) => `<ellipse cx="125" cy="148" rx="9" ry="22" transform="rotate(${i * 45} 125 200)"/>`).join('');
  return `<svg viewBox="0 0 250 400" class="back-svg" aria-hidden="true">
    <rect x="3" y="3" width="244" height="394" rx="12" fill="url(#hh-lacquer)" stroke="${GOLD}" stroke-width="2"/>
    <rect x="14" y="14" width="222" height="372" rx="6" fill="none" stroke="${GOLD}" stroke-width="1" opacity=".7"/>
    <rect x="20" y="20" width="210" height="360" rx="4" fill="url(#hh-hatch-gold)" opacity=".08"/>
    <g fill="none" stroke="${GOLD}" stroke-width="1.1" opacity=".85">
      <circle cx="125" cy="200" r="104"/><circle cx="125" cy="200" r="56"/>
      ${rays}
      <g opacity=".6">${petals}</g>
      <path d="M125 40l8 18h-16zM125 360l8-18h-16zM30 200l18-8v16zM220 200l-18-8v16z" fill="${GOLD}" opacity=".6"/>
    </g>
    <g class="back-eye">
      <path d="M85 200q40-34 80 0q-40 34-80 0z" fill="${BONE}" stroke="${GOLD}" stroke-width="1.5"/>
      <circle cx="125" cy="200" r="15" fill="${BLOOD}" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="125" cy="200" r="6" fill="${LACQUER}"/>
      <circle cx="120" cy="195" r="2.5" fill="${BONE}" opacity=".9"/>
    </g>
  </svg>`;
}

/** Map node glyphs, 40×40. */
export const NODE_ICON: Record<string, string> = {
  fight: `<path d="M8 32L28 12M22 10l8 0 0 8M32 32L12 12M18 10l-8 0 0 8M6 34l4-1-3-3zM34 34l-4-1 3-3z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  elite: `<path d="M10 8c0 8 4 10 10 10s10-2 10-10M20 18c-6 0-9 4-9 9 0 4 4 7 9 7s9-3 9-7c0-5-3-9-9-9z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="16.5" cy="26" r="2" fill="currentColor"/><circle cx="23.5" cy="26" r="2" fill="currentColor"/>`,
  event: `<path d="M4 20s6-10 16-10 16 10 16 10-6 10-16 10S4 20 4 20z" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="20" cy="20" r="5" fill="currentColor"/>`,
  shop: `<circle cx="15" cy="22" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="25" cy="18" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M25 13v10M22 16h6" stroke="currentColor" stroke-width="2"/>`,
  rest: `<path d="M16 16h8v18h-8z" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M20 4c3 4 4 6 4 8a4 4 0 0 1-8 0c0-2 1-4 4-8z" fill="currentColor"/>`,
  boss: `<path d="M6 30l3-18 6 8 5-12 5 12 6-8 3 18z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="20" cy="24" r="3" fill="currentColor"/>`,
};
