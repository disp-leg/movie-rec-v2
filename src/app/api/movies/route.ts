import { NextResponse } from 'next/server';
import moviesData from '../../../../data/movies.json';
import { Movie } from '../../../lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let movies = moviesData as Movie[];

  if (category && category !== 'all') {
    movies = (moviesData as Movie[]).filter((m) =>
      m.categories.some((c) => c.toLowerCase() === category.toLowerCase())
    );
  }

  return NextResponse.json(movies);
}
