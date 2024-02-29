import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import MovieCard from '../components/MovieCard';
import { MovieService } from '../utils/services/movie.service';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const movieService = new MovieService();

  const query = useQuery({
    queryKey: ['movies', page, search],
    queryFn: () => movieService.searchMovies({ query: search, page: page }),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <Row justify="start">
        <Col xs={24}>
          <h1 className="text-3xl font-bold underline">Search Movies</h1>
          <input
            value={search}
            placeholder="search movies"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Col>
        <div className="container mx-auto my-0">
          <Row
            justify="start"
            gutter={[16, 16]}
          >
            {query.data?.results.map((movie) => (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </div>
      </Row>
      <span>Current Page: {page}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (
            !query.isPlaceholderData &&
            (query.data?.page ?? 0 < (query.data?.total_pages ?? 0))
          ) {
            setPage((old) => old + 1);
          }
        }}
        disabled={
          query.isPlaceholderData ||
          !(query.data?.page ?? 0 < (query.data?.total_pages ?? 0))
        }
      >
        Next Page
      </button>
    </div>
  );
};

export default Search;
