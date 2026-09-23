// Live settings shared by UI and FX.
import { loadSettings, saveSettings, type Settings } from '../core/store.ts';
import { setVolume } from '../fx/audio.ts';

export const settings: Settings = loadSettings();

export function updateSettings(patch: Partial<Settings>) {
  Object.assign(settings, patch);
  saveSettings(settings);
  setVolume(settings.volume, settings.muted);
  document.documentElement.style.setProperty('--juice', String(settings.juice));
}

export function applySettings() {
  setVolume(settings.volume, settings.muted);
  document.documentElement.style.setProperty('--juice', String(settings.juice));
}
