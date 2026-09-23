// Rabbit's Foot — a pale furred foot capped in gold, hung on a short chain.
import { BONE, GOLD, GOLD_D, INK, PARCH } from '../palette.ts';

export default () => `
  <g fill="none" stroke="${INK}" stroke-width="3">
    <ellipse cx="32" cy="4.5" rx="2.2" ry="3.4"/><ellipse cx="32" cy="10.5" rx="1" ry="3.2"/>
  </g>
  <g fill="none" stroke="${GOLD}" stroke-width="1.4">
    <ellipse cx="32" cy="4.5" rx="2.2" ry="3.4"/><ellipse cx="32" cy="10.5" rx="1" ry="3.2"/>
  </g>
  <path d="M24 22C17 30 15 40 17 48C19 56 25 61 32 61C40 61 47 55 47 46C47 38 44 30 40 22Z" fill="${PARCH}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M36 22H40C44 30 47 38 47 46C47 55 40 61 32 61C39 56 42 48 41 40C40 32 38 26 36 22Z" fill="url(#hh-hatch-d)" opacity=".5"/>
  <path d="M22 30l-2 3M21 38l-2 3M20 46l-1 3M28 28l-1 3M27 36l-1 3M34 30l1 3M40 34l1 3M26 44l-1 3M36 42l1 3M42 44l1 3" fill="none" stroke="${INK}" stroke-width=".9" stroke-linecap="round"/>
  <path d="M25 58Q27 53 26 49M32 60V51M39 58Q37 53 38 49" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M21 34Q21 28 25 25" fill="none" stroke="${BONE}" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
  <path d="M22 13H42L40 23H24Z" fill="${GOLD}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M35 14H41L39.4 22H34Z" fill="${GOLD_D}"/>
  <path d="M23 17.5H41" stroke="${INK}" stroke-width="1"/>
`;
