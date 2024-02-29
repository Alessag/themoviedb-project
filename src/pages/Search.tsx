import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import MoviesGrid from '../components/movies/MoviesGrid';
import ErrorMessage from '../components/utils/ErrorMessage';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import SearchBar from '../components/utils/SearchBar';
import { MovieService } from '../utils/services/movie.service';

const Search = () => {
  const movieService = new MovieService();

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies', page, search],
    queryFn: () => movieService.searchMovies({ query: search, page: page }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage error={error.message} />;
  }

  return (
    <div className="container my-0 mx-auto">
      <Row justify="center">
        <Col xs={24}>
          <h1 className="text-3xl font-bold text-center my-6">Search Movies</h1>
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </Col>
        {data && search !== '' && (
          <MoviesGrid
            movies={data}
            page={page}
            setPage={setPage}
          />
        )}
        {search === '' && <p>Type to search for a movie</p>}
      </Row>
    </div>
  );
};

export default Search;
