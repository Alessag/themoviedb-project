import fetchMock from 'jest-fetch-mock';

import { MovieService } from '../../src/utils/services/movie.service';
import type { RateMovieParams } from '../../src/utils/types/movies.types';
import {
  mockGuestSessionIdApiResponse,
  mockMovie,
  mockMovieApiResponse,
  mockNotMovieFoundApiResponse,
  mockRateMovieApiResponse,
  mockSingleMovieApiResponse,
} from '../utils/mock-data';

describe('MovieService', () => {
  let movieService: MovieService;

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    movieService = new MovieService();
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

    it('Should throw an error when the API request fails due to an invalid key', async () => {
      fetchMock.mockRejectOnce(
        new Error('Invalid API key: You must be granted a valid key.'),
      );

      const service = new MovieService();
      await expect(service.getPopularMovies()).rejects.toThrow(
        'Invalid API key: You must be granted a valid key.',
      );
    });
  });

  describe('searchMovies', () => {
    it('Should make a request to search a movie given the movie name', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockSingleMovieApiResponse));

      const response = await movieService.searchMovies({
        query: 'Anyone But You',
      });

      expect(response.results).toBeInstanceOf(Array);
      expect(response.results).toHaveLength(1);
      expect(response.results[0].title).toEqual(mockMovie.title);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('search/movie'),
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });

    it('Should return an empty array if there are no movies found', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockNotMovieFoundApiResponse));

      const response = await movieService.searchMovies({ query: 'asdfg' });

      expect(response.results).toBeInstanceOf(Array);
      expect(response.results).toHaveLength(0);
    });

    it('Should handle network errors', async () => {
      fetchMock.mockRejectOnce(
        new Error('The resource you requested could not be found'),
      );

      await expect(
        movieService.searchMovies({ query: 'asdfg' }),
      ).rejects.toThrow('The resource you requested could not be found');
    });
  });

  describe('getGuestSessionId', () => {
    it('Should make a request to get a session id', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockGuestSessionIdApiResponse));

      const response = await movieService.getGuestSessionId();

      expect(response.success).toBe(true);
      expect(response.guest_session_id).toEqual(
        '1fdb8777cd1af889a42885732230767e',
      );
      expect(response.expires_at).toMatch(
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC$/,
      );
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('authentication/guest_session/new'),
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });

    it('Should throw an error when the API request fails', async () => {
      fetchMock.mockReject(new Error('Failed to fetch guest session ID'));

      await expect(movieService.getGuestSessionId()).rejects.toThrow(
        'Failed to fetch guest session ID',
      );
    });
  });

  describe('rateMovie', () => {
    it('Should make the request to rate a movie given the movie rate value', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockRateMovieApiResponse));

      const input: RateMovieParams = {
        guest_session_id: '123456789',
      };
      const movieId = 123456;
      const rate = 6;
      const response = await movieService.rateMovie(input, movieId, rate);

      expect(response).toEqual(mockRateMovieApiResponse);
    });
  });
});
