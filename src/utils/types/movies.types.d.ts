export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GetPopularMovieParams {
  language?: string;
  region?: string;
  page?: number;
}

export interface SearchMovieParams extends GetPopularMovieParams {
  query: string;
  include_adult?: boolean;
  primary_release_year?: string;
  year?: string;
}
