import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import type { RootState } from '../../app/store';
import { MovieService } from '../../utils/services/movie.service';
import type { Movie, MovieResponse } from '../../utils/types/movies.types';
import CustomPagination from '../utils/CustomPagination';

import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

interface MovieCardProps {
  movies: MovieResponse;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MoviesGrid = ({ movies, page, setPage }: MovieCardProps) => {
  const movieService = new MovieService();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const guestSessionId = useSelector(
    (state: RootState) => state.guest.guestSessionId,
  );

  const mutation = useMutation({
    mutationFn: ({ movieId, rating }: { movieId: number; rating: number }) => {
      if (!guestSessionId) {
        throw new Error('Guest session id not found');
      }

      return movieService.rateMovie(
        { guest_session_id: guestSessionId },
        movieId,
        rating,
      );
    },
  });

  const handleOpenModal = (movieId: number) => {
    const movie = movies.results.find((movie) => movie.id === movieId);

    if (!movie) {
      console.error('Movie not found');
      return;
    }

    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRateSubmit = (movieId: number, rating: number) => {
    mutation.mutate({ movieId, rating });
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (movies.results.length === 0) {
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
            <MovieCard
              movie={movie}
              movieSelected={handleOpenModal}
            />
          </Col>
        ))}
      </Row>
      <Row
        justify="center"
        align="middle"
        className="h-20 my-7"
      >
        <Col>
          <CustomPagination
            page={page}
            setPage={setPage}
            total_pages={movies.total_pages}
          />
        </Col>
      </Row>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          handleRateSubmit={handleRateSubmit}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MoviesGrid;
