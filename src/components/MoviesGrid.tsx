import { Col, Row } from 'antd';

import type { MovieResponse } from '../utils/types/movies.types';

import CustomPagination from './CustomPagination';
import MovieCard from './MovieCard';

interface MovieCardProps {
  movies: MovieResponse;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MoviesGrid = ({ movies, page, setPage }: MovieCardProps) => {
  if (!movies) {
    return <div>No movies available</div>;
  }

  if (!movies.results) {
    return <div>No movies available</div>;
  }

  return (
    <div className="container mx-auto my-0">
      <Row
        justify="start"
        gutter={[16, 16]}
      >
        {movies.results.map((movie) => (
          <Col key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <Row
        justify="center"
        align="middle"
        className="bg-blue-300 h-16 my-5"
      >
        <Col xs={12}>
          <CustomPagination
            page={page}
            setPage={setPage}
            total_pages={movies.total_pages}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MoviesGrid;
