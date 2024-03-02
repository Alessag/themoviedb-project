import fetchMock from 'jest-fetch-mock';

import { MovieService } from '../../src/utils/services/movie.service';
import { mockMovieApiResponse } from '../utils/mock-data';

describe('MovieService', () => {
  let movieService: MovieService;

  beforeEach(() => {
    movieService = new MovieService();
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  describe('getPopularMovies', () => {
    it('Should return the popular movies', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockMovieApiResponse));

      const popularMovies = await movieService.getPopularMovies();

      expect(popularMovies.results).toBeInstanceOf(Array);
      expect(popularMovies.results).not.toHaveLength(0);
      expect(popularMovies.total_results).toBeGreaterThan(0);
      expect(popularMovies.total_pages).toBeGreaterThan(0);
      expect(popularMovies.page).toBe(1);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('Should throw and error when the API request fails without the valid key', async () => {
      fetchMock.mockReject(
        new Error('Invalid API key: You must be granted a valid key.'),
      );

      const service = new MovieService();
      await expect(service.getPopularMovies()).rejects.toThrow(
        'Invalid API key: You must be granted a valid key.',
      );
    });
  });
});
