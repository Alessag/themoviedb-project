import fetchMock from 'jest-fetch-mock';

import { MovieService } from '../../src/utils/services/movie.service';
import {
  mockMovieApiResponse,
  mockNotMovieFoundApiResponse,
  mockSingleMovieApiResponse,
} from '../utils/mock-data';

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

  describe('searchMovies', () => {
    it('Should make a request to search a movie given the full movie name', async () => {
      // Should return the API response whit the movies that match whit the given parameter
      fetchMock.mockResponseOnce(JSON.stringify(mockSingleMovieApiResponse));

      const response = await movieService.searchMovies({
        query: 'Ant-Man and the Wasp: Quantumania',
      });

      expect(response.results).toBeInstanceOf(Array);
      expect(response.results).toHaveLength(1);
      // If a put the query in the searchMovie and here I comparethe expected result with the same expected title, it's that okat(?)
      expect(response.results[0].title).toEqual(response.results[0].title);
    });

    // Should make a request to search a movie given the first 3 words of the title
    // --> Should return an array with the movies that title have the words

    // if there are not movies found, the API should return an empty array
    it('If there are no movies found give the title should the API return an empty results array', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockNotMovieFoundApiResponse));

      const response = await movieService.searchMovies({ query: 'asdfg' });

      expect(response.results).toBeInstanceOf(Array);
      expect(response.results).toHaveLength(0);
    });

    // If there is an error fetching the data

    // internet conection
    it('Should handle network errors', async () => {
      fetchMock.mockReject(
        new Error('The resource you requested could not be found'),
      );

      await expect(
        movieService.searchMovies({ query: 'asdfg' }),
      ).rejects.toThrow('The resource you requested could not be found');
      // "The resource you requested could not be found."
      // status_code : 404 not found
    });
  });
});
