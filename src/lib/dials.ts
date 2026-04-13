import { DialState, DEFAULT_DIALS } from "./engine-types";

const STORAGE_KEY = "movie-rec-dials";

export function loadDials(): DialState {
  if (typeof window === "undefined") return DEFAULT_DIALS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DIALS;
    const parsed = JSON.parse(raw) as DialState;
    if (
      typeof parsed.scary === "number" &&
      typeof parsed.extreme === "number" &&
      typeof parsed.pace === "number"
    ) {
      return parsed;
    }
    return DEFAULT_DIALS;
  } catch {
    return DEFAULT_DIALS;
  }
}

export function saveDials(state: DialState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable
  }
}
