import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import MoviesGrid from '../components/movies/MoviesGrid';
import SearchBar from '../components/utils/SearchBar';
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
    <div className="border-4 border-grey-400 container my-0 mx-auto">
      <Row justify="center">
        <Col xs={24}>
          <h1 className="text-3xl font-bold text-center my-6">Search Movies</h1>
          <SearchBar
            search={search}
            setSearch={setSearch}
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
