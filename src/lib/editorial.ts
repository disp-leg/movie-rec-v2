import { Movie } from './types';

export interface TypographyBreakContent {
  label: string;
  sublabel?: string;
  afterIndex: number; // insert after this movie index
}

export const TYPOGRAPHY_BREAKS: TypographyBreakContent[] = [
  { label: 'Bunker Films', sublabel: 'What happens when the door closes', afterIndex: 4 },
  { label: 'Survival Stories', sublabel: 'Staying alive at any cost', afterIndex: 9 },
  { label: 'Psychological Descent', sublabel: 'The mind is the real enemy', afterIndex: 14 },
  { label: 'Group Dynamics', sublabel: 'Trust dissolves under pressure', afterIndex: 19 },
];

// Select the featured pick (first movie or highest-rated)
export function getFeaturedPick(movies: Movie[]): Movie {
  return movies[0]; // Right at Your Door — curated first position
}

// Get the layout variant for a movie at a given index
export function getLayoutVariant(index: number): 'full-bleed' | 'inset' | 'landscape' | 'text-first' {
  const variants = ['full-bleed', 'inset', 'landscape', 'text-first'] as const;
  return variants[index % 4];
}
