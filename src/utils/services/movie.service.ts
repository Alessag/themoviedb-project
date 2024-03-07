import type {
  GetPopularMovieParams,
  GetRatedMovieParams,
  GuestSessionIdResponse,
  MovieApiErrorResponse,
  MovieResponse,
  RateMovieParams,
  RateMovieResponse,
  SearchMovieParams,
} from '../types/movies.types.d';

export class MovieService {
  private async makeRequest<T, Params>(
    url: string,
    method: string,
    queryParams?: Params,
    body?: BodyInit,
  ): Promise<T> {
    const BASE_URL = 'https://api.themoviedb.org/3';

    const options: RequestInit = {
      method,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: body,
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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const body = await response.json();

      if (!response.ok) {
        const error = body as MovieApiErrorResponse;
        throw new Error(error.status_message);
      }

      const data: T = body as T;
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

  getGuestSessionId = async (): Promise<GuestSessionIdResponse> => {
    const response = await this.makeRequest<GuestSessionIdResponse, null>(
      'authentication/guest_session/new',
      'GET',
    );

    return response;
  };

  rateMovie = async (
    input: RateMovieParams,
    movie_id: number,
    rate: number,
  ): Promise<RateMovieResponse> => {
    const response = await this.makeRequest<RateMovieResponse, RateMovieParams>(
      `movie/${movie_id}/rating`,
      'POST',
      input,
      JSON.stringify({ value: rate }),
    );

    return response;
  };

  getRatedMovies = async (
    guest_session_id: string,
    input: GetRatedMovieParams = {},
  ): Promise<MovieResponse> => {
    const response = await this.makeRequest<MovieResponse, GetRatedMovieParams>(
      `guest_session/${guest_session_id}/rated/movies`,
      'GET',
      input,
    );

    return response;
  };
}
