// Generate a deterministic color from a movie title (for placeholder gradients)
export function getTitleColor(title: string): { from: string; to: string } {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate muted, light-mode-appropriate colors
  const hue = Math.abs(hash % 360);
  const from = `hsl(${hue}, 15%, 88%)`;
  const to = `hsl(${(hue + 30) % 360}, 20%, 78%)`;

  return { from, to };
}

// TMDB poster URL (for when we have tmdbIds)
export function getTMDBPosterUrl(tmdbId: string | null, size: 'w342' | 'w500' | 'w780' = 'w500'): string | null {
  if (!tmdbId) return null;
  return `https://image.tmdb.org/t/p/${size}/${tmdbId}`;
}

// Poster aspect ratios
export const POSTER_RATIO = {
  portrait: 2 / 3,    // standard movie poster
  landscape: 16 / 9,  // widescreen crop
  square: 1,
} as const;
