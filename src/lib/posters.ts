import moviesData from "../../data/movies.json";

// Map of movie title -> full poster URL
export const POSTER_URLS: Record<string, string> = {};

for (const movie of moviesData as Array<{ title: string; posterPath?: string }>) {
  if (movie.posterPath) {
    POSTER_URLS[movie.title] = `https://image.tmdb.org/t/p/w500${movie.posterPath}`;
  }
}

export function getPosterUrl(title: string): string | null {
  return POSTER_URLS[title] || null;
}
