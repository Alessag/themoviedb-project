import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import MoviesGrid from '../components/movies/MoviesGrid';
import ErrorMessage from '../components/utils/ErrorMessage';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import { MovieService } from '../utils/services/movie.service';

const Home = () => {
  const movieService = new MovieService();

  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => movieService.getPopularMovies({ page: page }),
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
          <h1 className="text-3xl font-bold text-center my-6">
            Popular Movies
          </h1>
        </Col>
        <Col>
          {data && data.results.length > 0 ? (
            <MoviesGrid
              movies={data}
              page={page}
              setPage={setPage}
            />
          ) : (
            <p className="text-xl">Movies not found</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Home;
