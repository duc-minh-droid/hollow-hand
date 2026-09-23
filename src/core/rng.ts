// Seeded RNG (mulberry32). State lives in a plain object so game state stays cloneable.
export interface Rng {
  s: number;
}

export function makeRng(seed: number): Rng {
  return { s: seed >>> 0 || 0x9e3779b9 };
}

export function next(r: Rng): number {
  r.s = (r.s + 0x6d2b79f5) >>> 0;
  let t = r.s;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function int(r: Rng, min: number, max: number): number {
  return min + Math.floor(next(r) * (max - min + 1));
}

export function chance(r: Rng, p: number): boolean {
  return next(r) < p;
}

export function pick<T>(r: Rng, arr: readonly T[]): T {
  return arr[Math.floor(next(r) * arr.length)];
}

export function shuffle<T>(r: Rng, arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next(r) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Pick a key from a weight map. Zero/negative weights are skipped. */
export function weighted<K extends string>(r: Rng, weights: Partial<Record<K, number>>): K {
  const entries = Object.entries(weights) as [K, number][];
  const total = entries.reduce((a, [, w]) => a + Math.max(0, w), 0);
  if (total <= 0) return entries[0][0];
  let roll = next(r) * total;
  for (const [k, w] of entries) {
    roll -= Math.max(0, w);
    if (roll <= 0) return k;
  }
  return entries[entries.length - 1][0];
}

export function pickN<T>(r: Rng, arr: readonly T[], n: number): T[] {
  return shuffle(r, arr.slice()).slice(0, n);
}

export function randomSeed(): number {
  return (Math.random() * 2 ** 32) >>> 0;
}
