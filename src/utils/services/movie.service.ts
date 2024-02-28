import type {
  GetPopularMovieParams,
  MovieResponse,
  SearchMovieParams,
} from '../types/movies.types.d';

export class MovieService {
  private async makeRequest<T, Params>(
    url: string,
    method: string,
    queryParams: Params,
  ): Promise<T> {
    const BASE_URL = 'https://api.themoviedb.org/3';

    const options: RequestInit = {
      method,
      headers: {
        accept: 'application/json',
      },
    };

    const searchParams = new URLSearchParams({
      api_key: import.meta.env.VITE_API_KEY,
      ...queryParams,
    });

    try {
      const response: Response = await fetch(
        `${BASE_URL}/${url}?` + searchParams.toString(),
        options,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: T = (await response.json()) as T;
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error(error as string);
    }
  }

  getPopularMovies = async (
    input: GetPopularMovieParams = {},
  ): Promise<MovieResponse> => {
    const response = await this.makeRequest<
      MovieResponse,
      GetPopularMovieParams
    >('movie/popular', 'GET', input);

    return response;
  };

  searchMovies = async (input: SearchMovieParams): Promise<MovieResponse> => {
    const response = await this.makeRequest<MovieResponse, SearchMovieParams>(
      'search/movie',
      'GET',
      input,
    );

    return response;
  };
}
