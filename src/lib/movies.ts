import moviesData from "../data/engine-movies.json";
import { Movie } from "./types";

export const movies: Movie[] = moviesData as unknown as Movie[];

export function getMoviesByCategory(category: string): Movie[] {
  return movies.filter((movie) =>
    movie.categories.some((c) => c.toLowerCase() === category.toLowerCase())
  );
}

export function getAllCategories(): string[] {
  const categorySet = new Set<string>();
  movies.forEach((movie) => {
    movie.categories.forEach((c) => categorySet.add(c));
  });
  return Array.from(categorySet).sort();
}

export function getMovieByTitle(title: string): Movie | undefined {
  return movies.find(
    (movie) => movie.title.toLowerCase() === title.toLowerCase()
  );
}
