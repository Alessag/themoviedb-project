import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import MoviesGrid from '../components/movies/MoviesGrid';
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
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="border-4 border-grey-400 container my-0 mx-auto">
      <Row justify="center">
        <Col xs={24}>
          <h1 className="text-3xl font-bold text-center my-6">
            Popular Movies
          </h1>
        </Col>
      </Row>
      {data && (
        <MoviesGrid
          movies={data}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default Home;
