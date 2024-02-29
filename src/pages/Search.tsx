import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import MoviesGrid from '../components/MoviesGrid';
import { MovieService } from '../utils/services/movie.service';

const Search = () => {
  const movieService = new MovieService();

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
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
        {data && (
          <MoviesGrid
            movies={data}
            page={page}
            setPage={setPage}
          />
        )}
      </Row>
    </div>
  );
};

export default Search;
