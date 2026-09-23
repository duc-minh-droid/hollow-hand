// Stolen Ledger — a small leather account book, strapped shut with a gold lock.
import { BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">
    <path d="M48 12L54 15V55L48 56Z" fill="${PARCH}"/>
    <path d="M10 10H46Q50 10 50 14V52Q50 56 46 56H10Z" fill="${SHADOW}"/>
    <path d="M10 10H17V56H10Z" fill="${SHADOW}"/>
  </g>
  <path d="M50 15L54 17M50 20L54 22M50 25L54 27M50 45L54 47M50 50L54 52" stroke="${INK}" stroke-width=".8"/>
  <path d="M10 10H17V56H10Z" fill="url(#hh-hatch-d)" opacity=".7"/>
  <path d="M40 10H46Q50 10 50 14V52Q50 56 46 56H40Z" fill="url(#hh-hatch-d)" opacity=".45"/>
  <rect x="21" y="14" width="25" height="38" rx="1.5" fill="none" stroke="${BONE}" stroke-width=".9" opacity=".55"/>
  <path d="M10 16H17M10 50H17" stroke="${INK}" stroke-width="1.2"/>
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M17 29H56V37H17Z" fill="${INK}"/>
    <path d="M17 29H56V37H17Z" fill="url(#hh-hatch-bone)" opacity=".35"/>
    <rect x="33" y="25" width="14" height="16" rx="2" fill="${GOLD}"/>
  </g>
  <path d="M42 26H45Q46 26 46 27V39Q46 40 45 40H42Z" fill="${GOLD_D}"/>
  <path d="M40 29.5a2.2 2.2 0 1 1 0 4.4l1.2 3.8h-2.4l1.2-3.8a2.2 2.2 0 1 1 0-4.4z" fill="${INK}"/>
  <path d="M35 27.5H39" stroke="${BONE}" stroke-width="1" stroke-linecap="round"/>
`;
