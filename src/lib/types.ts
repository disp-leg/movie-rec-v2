export interface WhereToWatch {
  svod: string[];
  vod: string[];
  free: string[];
}

export interface Letterboxd {
  top_positive: string;
  top_negative: string;
}

export interface Movie {
  title: string;
  year: number;
  director: string;
  rating: number;
  genres: string[];
  categories: string[];
  dna: string[];
  description: string;
  letterboxd: Letterboxd;
  whereToWatch: WhereToWatch;
  sources: string[];
  tmdbId: string | null;
}

export type Category = string;
