// Collects every illustration file. Missing art falls back to a drawn sigil so nothing breaks.
import { INK, PARCH, BONE } from './palette.ts';

type Art = () => string;
type Mod = { default: Art };

const cards = import.meta.glob<Mod>('./cards/*.ts', { eager: true });
const masks = import.meta.glob<Mod>('./masks/*.ts', { eager: true });
const trinkets = import.meta.glob<Mod>('./trinkets/*.ts', { eager: true });

const index = (mods: Record<string, Mod>) =>
  new Map(Object.entries(mods).map(([path, m]) => [path.split('/').pop()!.replace(/\.ts$/, ''), m.default]));

const cardArt = index(cards);
const maskArt = index(masks);
const trinketArt = index(trinkets);
const cache = new Map<string, string>();

function fallbackCard(id: string, dark: boolean) {
  const bg = dark ? 'url(#hh-lacquer)' : PARCH;
  const ink = dark ? BONE : INK;
  return `<rect width="200" height="150" fill="${bg}"/>
    <g fill="none" stroke="${ink}" stroke-width="1.4"><circle cx="100" cy="78" r="44"/><circle cx="100" cy="78" r="30"/>
    <path d="M100 30v96M52 78h96M66 44l68 68M134 44l-68 68"/></g>
    <circle cx="100" cy="78" r="8" fill="${ink}"/><title>${id}</title>`;
}

export function artFor(id: string): string {
  const key = `c:${id}`;
  if (!cache.has(key)) cache.set(key, cardArt.get(id)?.() ?? fallbackCard(id, id.startsWith('j_')));
  return cache.get(key)!;
}

export function maskFor(id: string): string {
  const m = maskArt.get(id);
  if (m) return m();
  return `<g><path d="M40 280c0-60 30-90 80-90s80 30 80 90z" fill="#0b0706"/>
    <ellipse cx="120" cy="120" rx="62" ry="80" fill="${BONE}" stroke="${INK}" stroke-width="3"/>
    <g class="m-eyes"><ellipse cx="96" cy="112" rx="12" ry="7" fill="#8a1c17"/><ellipse cx="144" cy="112" rx="12" ry="7" fill="#8a1c17"/></g>
    <g class="m-mouth"><path d="M98 160q22 14 44 0" stroke="${INK}" stroke-width="3" fill="none"/></g>
    <g class="crack crack-1"><path d="M120 40l-6 30 8 10" stroke="${INK}" fill="none" stroke-width="2"/></g>
    <g class="crack crack-2"><path d="M80 90l20 20-6 20" stroke="${INK}" fill="none" stroke-width="2"/></g>
    <g class="crack crack-3"><path d="M160 150l-20 20 4 30" stroke="${INK}" fill="none" stroke-width="2"/></g></g>`;
}

export function trinketFor(id: string): string {
  return trinketArt.get(id)?.() ?? `<circle cx="32" cy="32" r="20" fill="${BONE}" stroke="${INK}" stroke-width="2.5"/><circle cx="32" cy="32" r="6" fill="${INK}"/>`;
}

export const hasArt = (id: string) => cardArt.has(id);
