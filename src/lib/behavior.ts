import { Movie } from "./types";

// --- Interfaces ---

export interface MovieSignals {
  saved: boolean;
  skipped: boolean;
  seen: boolean;
  expandCount: number;
  firstInteracted: string; // ISO date
  lastInteracted: string; // ISO date
}

export interface BehaviorState {
  signals: Record<string, MovieSignals>; // keyed by movie title
  lastUpdated: string; // ISO date
}

export interface RankedMovie {
  movie: Movie;
  score: number;
  isNew: boolean;
  isSaved: boolean;
  isSkipped: boolean;
  isSeen: boolean;
}

// --- Constants ---

const STORAGE_KEY = "movie-rec-behavior";
const FRESHNESS_DAYS = 7;

// --- Helpers ---

function createDefaultSignals(): MovieSignals {
  const now = new Date().toISOString();
  return {
    saved: false,
    skipped: false,
    seen: false,
    expandCount: 0,
    firstInteracted: now,
    lastInteracted: now,
  };
}

function createDefaultState(): BehaviorState {
  return {
    signals: {},
    lastUpdated: new Date().toISOString(),
  };
}

function getOrCreateSignals(
  state: BehaviorState,
  movieTitle: string
): MovieSignals {
  return state.signals[movieTitle] ?? createDefaultSignals();
}

function isWithinDays(dateStr: string | undefined, days: number): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}

// --- Core API ---

/**
 * Initialize or load state from localStorage.
 * Safe to call during SSR (returns default state if localStorage unavailable).
 */
export function loadBehavior(): BehaviorState {
  if (typeof window === "undefined") {
    return createDefaultState();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();

    const parsed = JSON.parse(raw) as BehaviorState;
    // Basic validation
    if (parsed && typeof parsed.signals === "object" && parsed.lastUpdated) {
      return parsed;
    }
    return createDefaultState();
  } catch {
    return createDefaultState();
  }
}

/**
 * Save state to localStorage.
 * No-op during SSR.
 */
export function saveBehavior(state: BehaviorState): void {
  if (typeof window === "undefined") return;

  try {
    const updated: BehaviorState = {
      ...state,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Storage full or unavailable -- fail silently
  }
}

/**
 * Record a signal for a movie. Returns a new state object (immutable).
 */
export function recordSignal(
  state: BehaviorState,
  movieTitle: string,
  signal: "save" | "skip" | "seen" | "expand"
): BehaviorState {
  const existing = getOrCreateSignals(state, movieTitle);
  const now = new Date().toISOString();

  let updated: MovieSignals;

  switch (signal) {
    case "save":
      updated = { ...existing, saved: true, lastInteracted: now };
      break;
    case "skip":
      updated = { ...existing, skipped: true, lastInteracted: now };
      break;
    case "seen":
      updated = { ...existing, seen: true, lastInteracted: now };
      break;
    case "expand":
      updated = {
        ...existing,
        expandCount: existing.expandCount + 1,
        lastInteracted: now,
      };
      break;
  }

  // If this is the first interaction, set firstInteracted
  if (!state.signals[movieTitle]) {
    updated.firstInteracted = now;
  }

  return {
    ...state,
    signals: {
      ...state.signals,
      [movieTitle]: updated,
    },
    lastUpdated: now,
  };
}

/**
 * Toggle a signal (for save/skip which can be undone). Returns a new state object.
 */
export function toggleSignal(
  state: BehaviorState,
  movieTitle: string,
  signal: "save" | "skip"
): BehaviorState {
  const existing = getOrCreateSignals(state, movieTitle);
  const now = new Date().toISOString();

  const updated: MovieSignals = {
    ...existing,
    [signal === "save" ? "saved" : "skipped"]:
      signal === "save" ? !existing.saved : !existing.skipped,
    lastInteracted: now,
  };

  if (!state.signals[movieTitle]) {
    updated.firstInteracted = now;
  }

  return {
    ...state,
    signals: {
      ...state.signals,
      [movieTitle]: updated,
    },
    lastUpdated: now,
  };
}

/**
 * Score and sort movies based on behavior state.
 * Movies with `seen: true` are filtered out entirely.
 * Movies with `skipped: true` drop to the bottom but still appear.
 */
export function rankMovies(
  movies: Movie[],
  state: BehaviorState,
  dials?: { scary: number; extreme: number; pace: number }
): RankedMovie[] {
  // Collect DNA tags from all saved movies for similarity boost
  const savedDnaTags = new Set<string>();
  for (const [title, signals] of Object.entries(state.signals)) {
    if (signals.saved) {
      const movie = movies.find((m) => m.title === title);
      if (movie) {
        movie.dna.forEach((tag) => savedDnaTags.add(tag));
      }
    }
  }

  const ranked: RankedMovie[] = [];

  for (const movie of movies) {
    const signals = state.signals[movie.title];
    const isSeen = signals?.seen ?? false;
    const isSaved = signals?.saved ?? false;
    const isSkipped = signals?.skipped ?? false;

    // Filter out seen movies entirely
    if (isSeen) continue;

    // Dial filtering
    if (dials) {
      if (dials.scary > 1 && movie.scary != null && movie.scary < dials.scary) continue;
      if (dials.extreme < 10 && movie.extreme != null && movie.extreme > dials.extreme) continue;
      if (dials.pace > 0) {
        const paceMap: Record<string, number> = { slow: 1, medium: 2, fast: 3 };
        const moviePace = movie.pace ? paceMap[movie.pace] || 0 : 0;
        if (moviePace > 0 && moviePace !== dials.pace) continue;
      }
    }

    // Calculate score
    let score = 100;

    if (isSaved) score += 50;

    if (signals) {
      const expandBonus = Math.min(signals.expandCount * 10, 30);
      score += expandBonus;
    }

    if (isSkipped) score -= 100;

    // DNA similarity boost: +20 for each DNA tag shared with any saved movie
    // (but don't boost with the movie's own tags if it's the saved one)
    if (!isSaved) {
      for (const tag of movie.dna) {
        if (savedDnaTags.has(tag)) {
          score += 20;
        }
      }
    }

    // Freshness boost
    const addedDate = (movie as Movie & { addedDate?: string }).addedDate;
    const isFresh = isWithinDays(addedDate, FRESHNESS_DAYS);
    if (isFresh) score += 30;

    // "New" badge: added in last 7 days OR no interaction at all
    const hasNoInteraction = !signals;
    const isNew = isFresh || hasNoInteraction;

    ranked.push({
      movie,
      score,
      isNew,
      isSaved,
      isSkipped,
      isSeen: false, // seen movies are already filtered out
    });
  }

  // Sort: score descending, ties broken by rating descending
  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.movie.rating - a.movie.rating;
  });

  return ranked;
}
