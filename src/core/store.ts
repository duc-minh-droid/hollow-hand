// Persistence. localStorage can be missing or throw (private mode); the game must still run.
import type { Memory } from '../jev/dialogue.ts';

export interface Settings {
  juice: number; // 0..1 — scales shake, particles, hit-stop
  volume: number; // 0..1
  muted: boolean;
}

const MEMORY_KEY = 'hollowhand.memory.v1';
const RUN_KEY = 'hollowhand.run.v1';
const SETTINGS_KEY = 'hollowhand.settings.v1';

function read<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep playing */
  }
}

export const defaultMemory = (): Memory => ({ grudge: 0, deaths: 0, wins: 0, runs: 0 });

export const loadMemory = () => ({ ...defaultMemory(), ...read<Memory>(MEMORY_KEY) });
export const saveMemory = (m: Memory) => write(MEMORY_KEY, m);

export const loadRun = <T>() => read<T>(RUN_KEY);
export const saveRun = (r: unknown) => write(RUN_KEY, r);
export const clearRun = () => write(RUN_KEY, undefined);

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const loadSettings = (): Settings => ({ juice: reducedMotion() ? 0.2 : 1, volume: 0.7, muted: false, ...read<Settings>(SETTINGS_KEY) });
export const saveSettings = (s: Settings) => write(SETTINGS_KEY, s);
