// Salt Circle — a ring of poured salt lit by four candles; a crawling shadow recoils at its edge.
import { BONE, FLAME, GOLD, INK, PARCH, SHADOW } from '../palette.ts';

const candle = (x: number, y: number, h: number, lit = false) => {
  const w = h / 4.4;
  const f = (v: number) => v.toFixed(1);
  return `
  <circle cx="${x}" cy="${f(y - h - w * 1.6)}" r="${(w * 3).toFixed(1)}" fill="url(#hh-glow)"/>
  <g stroke="${INK}" stroke-width="1.2" stroke-linejoin="round">
    <ellipse cx="${x}" cy="${f(y)}" rx="${(w * 1.9).toFixed(1)}" ry="${(w * 0.6).toFixed(1)}" fill="${SHADOW}" opacity=".6" stroke="none"/>
    <path d="M${f(x - w)} ${f(y - h)}V${f(y)}Q${x} ${f(y + w * 0.5)} ${f(x + w)} ${f(y)}V${f(y - h)}Z" fill="${BONE}"/>
    <path d="M${f(x + w * 0.2)} ${f(y - h)}V${f(y + w * 0.3)}Q${f(x + w * 0.7)} ${f(y + w * 0.2)} ${f(x + w)} ${f(y)}V${f(y - h)}Z" fill="url(#hh-hatch-v)" opacity=".6" stroke="none"/>
    <path d="M${f(x - w)} ${f(y - h)}Q${x} ${f(y - h - w * 0.5)} ${f(x + w)} ${f(y - h)}Q${f(x + w)} ${f(y - h + w * 1.6)} ${f(x + w * 0.4)} ${f(y - h + w * 0.8)}Q${f(x - w * 0.2)} ${f(y - h + w * 2.2)} ${f(x - w * 0.5)} ${f(y - h + w * 0.6)}Q${f(x - w)} ${f(y - h + w)} ${f(x - w)} ${f(y - h)}Z" fill="${BONE}"/>
  </g>
  <g${lit ? ' class="a-flicker"' : ''}>
    <path d="M${x} ${f(y - h - w * 3.6)}Q${f(x + w * 1.1)} ${f(y - h - w * 1.5)} ${x} ${f(y - h - w * 0.3)}Q${f(x - w * 1.1)} ${f(y - h - w * 1.5)} ${x} ${f(y - h - w * 3.6)}Z" fill="url(#hh-flame)" stroke="${INK}" stroke-width=".8"/>
    <path d="M${x} ${f(y - h - w * 2.4)}Q${f(x + w * 0.5)} ${f(y - h - w * 1.2)} ${x} ${f(y - h - w * 0.5)}Q${f(x - w * 0.5)} ${f(y - h - w * 1.2)} ${x} ${f(y - h - w * 2.4)}Z" fill="${FLAME}"/>
  </g>`;
};

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <!-- wall and flagstones -->
  <rect width="200" height="44" fill="url(#hh-xhatch)" opacity=".55"/>
  <path d="M0 44H200" stroke="${INK}" stroke-width="1.4"/>
  <path d="M0 58H200M0 80H200M0 112H200M60 44L20 150M104 44V150M148 44L188 150M30 44L-30 150M176 44L230 150" stroke="${SHADOW}" stroke-width=".8"/>

  <!-- the salt ring -->
  <ellipse cx="104" cy="100" rx="66" ry="30" fill="${BONE}" opacity=".35"/>
  <ellipse cx="104" cy="100" rx="50" ry="21" fill="none" stroke="${INK}" stroke-width=".7" stroke-dasharray="2 3"/>
  <path d="M104 80L134 112L68 94H140L74 112Z" fill="none" stroke="${SHADOW}" stroke-width=".8" stroke-linejoin="round"/>
  <ellipse cx="104" cy="100" rx="66" ry="30" fill="none" stroke="${INK}" stroke-width="7.4"/>
  <ellipse cx="104" cy="100" rx="66" ry="30" fill="none" stroke="${BONE}" stroke-width="4.6"/>
  <ellipse cx="104" cy="100" rx="66" ry="30" fill="none" stroke="${SHADOW}" stroke-width="1" stroke-dasharray=".6 3.4" stroke-linecap="round"/>
  <g fill="${BONE}" stroke="${INK}" stroke-width=".5">
    <circle cx="46" cy="118" r="1.1"/><circle cx="160" cy="124" r="1"/><circle cx="92" cy="134" r="1.1"/><circle cx="170" cy="84" r=".9"/><circle cx="130" cy="67" r=".9"/>
  </g>

  <!-- the shadow that cannot cross -->
  <g stroke="${INK}" stroke-width="1.2" stroke-linejoin="round">
    <path d="M0 48Q20 38 40 46Q56 52 54 62Q62 66 64 74Q60 72 56 70Q58 64 52 68Q46 76 40 72Q44 82 38 88Q32 84 34 76Q20 82 0 80Z" fill="${INK}" opacity=".9"/>
    <path d="M0 48Q20 38 40 46Q56 52 54 62Q62 66 64 74Q60 72 56 70Q58 64 52 68Q46 76 40 72Q44 82 38 88Q32 84 34 76Q20 82 0 80Z" fill="url(#hh-xhatch-bone)" opacity=".35"/>
    <path d="M200 132Q186 128 176 122Q172 118 174 114Q178 118 180 116Q182 124 200 124Z" fill="${INK}" opacity=".9"/>
  </g>
  <path d="M60 80l4-1M64 76l4 1M40 92l1 4M172 126l-2 3M178 112l-3-2" stroke="${GOLD}" stroke-width="1.2" stroke-linecap="round"/>
  <g class="a-blink">
    <path d="M18 56q4-3 8 0q-4 3-8 0zM30 58q4-3 8 0q-4 3-8 0z" fill="${BONE}"/>
    <path d="M22 54.6v2.8M34 56.6v2.8" stroke="${INK}" stroke-width="1"/>
  </g>

  <!-- four candles at the quarters -->
  ${candle(104, 72, 13)}
  ${candle(38, 102, 17)}
  ${candle(170, 102, 17)}
  ${candle(104, 132, 22, true)}
`;
