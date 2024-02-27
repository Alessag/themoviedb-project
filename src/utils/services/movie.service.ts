import type { MovieResponse } from '../types/movies.types.d';

export class MovieService {
  private async makeRequest<T>(
    url: string,
    method: string,
    queryParams: Record<string, string>,
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

  getPopularMovies = async (): Promise<MovieResponse> => {
    const response = await this.makeRequest<MovieResponse>(
      'movie/popular',
      'GET',
      {
        page: '1',
        language: 'en-US',
      },
    );

    return response;
  };

  searchMovies = async (): Promise<MovieResponse> => {
    const response = await this.makeRequest<MovieResponse>(
      'search/movie',
      'GET',
      {
        page: '1',
        language: 'en-US',
        query: 'patos',
      },
    );

    return response;
  };
}
