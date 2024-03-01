import fetchMock from 'jest-fetch-mock';

import { MovieService } from '../../src/utils/services/movie.service';
import { mockMovieApiResponse } from '../utils/mock-data';

fetchMock.enableMocks();

describe('movieService', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset fetch mocks before each test
  });

  it('fetches popular movies', async () => {
    // Mock the fetch call to return a successful response
    fetchMock.mockResponseOnce(JSON.stringify(mockMovieApiResponse));

    const service = new MovieService();

    const data = await service.getPopularMovies();

    // Assertions to verify the service behaves as expected
    expect(data.results).toBeInstanceOf(Array);
    expect(data.results).not.toHaveLength(0);
    expect(data.total_results).toBeGreaterThan(0);
    expect(data.total_pages).toBeGreaterThan(0);
    expect(data.page).toBe(1);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('fetches it fails without the valid key fails ', async () => {
    // Mock the fetch call to simulate a failure
    fetchMock.mockReject(
      new Error('Invalid API key: You must be granted a valid key.'),
    );

    const service = new MovieService();

    // Assert that the service throws an error as expected
    await expect(service.getPopularMovies()).rejects.toThrow(
      'Invalid API key: You must be granted a valid key.',
    );
  });
});
