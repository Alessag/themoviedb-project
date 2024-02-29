import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import type { RootState } from '../app/store';
import MoviesGrid from '../components/movies/MoviesGrid';
import ErrorMessage from '../components/utils/ErrorMessage';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import { MovieService } from '../utils/services/movie.service';

const MyList = () => {
  const movieService = new MovieService();

  const [page, setPage] = useState<number>(1);

  const guestSessionId = useSelector(
    (state: RootState) => state.guest.guestSessionId,
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ['rated-movies', guestSessionId],
    queryFn: () => {
      if (!guestSessionId) {
        throw new Error('Guest session not found');
      }
      return movieService.getRatedMovies(guestSessionId, { page: page });
    },
    enabled: !!guestSessionId,
    retry: 2,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage error="No rated movies found" />;
  }

  return (
    <div className="container my-0 mx-auto">
      <Row>
        <Col xs={24}>
          <h1 className="text-3xl font-bold text-center my-6">Rated Movies</h1>
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

export default MyList;
