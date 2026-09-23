// App state + screen router. Screens mount into #stage and return a cleanup function.
import type { RunState } from '../game/run.ts';
import type { Memory } from '../jev/dialogue.ts';
import { loadMemory, saveMemory, saveRun } from '../core/store.ts';
import { inkWipe } from '../fx/juice.ts';
import { clear } from './dom.ts';
import { hideKeywords } from './tooltip.ts';
import { clearStains } from '../fx/particles.ts';

export type ScreenFn = (root: HTMLElement, args: any) => void | (() => void);

const screens = new Map<string, ScreenFn>();
let cleanup: (() => void) | void;
let stage: HTMLElement;

export const app = {
  run: null as RunState | null,
  memory: loadMemory() as Memory,
  current: '',
};

export function register(name: string, fn: ScreenFn) {
  screens.set(name, fn);
}

export function initRouter(el: HTMLElement) {
  stage = el;
}

export async function go(name: string, args: unknown = {}, wipe = true) {
  const mount = () => {
    cleanup?.();
    cleanup = undefined;
    hideKeywords();
    clear(stage);
    clearStains();
    const root = document.createElement('div');
    root.className = `screen screen-${name}`;
    stage.append(root);
    app.current = name;
    cleanup = screens.get(name)!(root, args);
  };
  if (wipe) await inkWipe(mount);
  else mount();
}

export function persist() {
  saveMemory(app.memory);
  if (app.run && !app.run.over) saveRun(app.run);
}
