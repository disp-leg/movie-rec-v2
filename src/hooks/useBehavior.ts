"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Movie } from "../lib/types";
import {
  BehaviorState,
  RankedMovie,
  loadBehavior,
  saveBehavior,
  toggleSignal,
  recordSignal,
  rankMovies,
} from "../lib/behavior";

export function useBehavior(movies: Movie[]) {
  const [state, setState] = useState<BehaviorState | null>(null);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    setState(loadBehavior());
  }, []);

  // Auto-save to localStorage on every state change
  useEffect(() => {
    if (state !== null) {
      saveBehavior(state);
    }
  }, [state]);

  // Rank movies whenever state or movies change
  const rankedMovies: RankedMovie[] = useMemo(() => {
    if (state === null) {
      // Pre-hydration: return movies in original order with default metadata
      return movies.map((movie) => ({
        movie,
        score: 100,
        isNew: true,
        isSaved: false,
        isSkipped: false,
        isSeen: false,
      }));
    }
    return rankMovies(movies, state);
  }, [movies, state]);

  const save = useCallback(
    (title: string) => {
      setState((prev) => {
        if (!prev) return prev;
        return toggleSignal(prev, title, "save");
      });
    },
    []
  );

  const skip = useCallback(
    (title: string) => {
      setState((prev) => {
        if (!prev) return prev;
        return toggleSignal(prev, title, "skip");
      });
    },
    []
  );

  const markSeen = useCallback(
    (title: string) => {
      setState((prev) => {
        if (!prev) return prev;
        return recordSignal(prev, title, "seen");
      });
    },
    []
  );

  const recordExpand = useCallback(
    (title: string) => {
      setState((prev) => {
        if (!prev) return prev;
        return recordSignal(prev, title, "expand");
      });
    },
    []
  );

  // Compute stats
  const stats = useMemo(() => {
    if (!state) return { saved: 0, skipped: 0, seen: 0 };

    let saved = 0;
    let skipped = 0;
    let seen = 0;

    for (const signals of Object.values(state.signals)) {
      if (signals.saved) saved++;
      if (signals.skipped) skipped++;
      if (signals.seen) seen++;
    }

    return { saved, skipped, seen };
  }, [state]);

  return {
    rankedMovies,
    save,
    skip,
    markSeen,
    recordExpand,
    savedCount: stats.saved,
    stats,
  };
}
