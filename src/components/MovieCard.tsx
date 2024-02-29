import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Modal, Rate } from 'antd';

import type { RootState } from '../app/store';
import { MovieService } from '../utils/services/movie.service';
import type { Movie } from '../utils/types/movies.types';

const { Meta } = Card;

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const movieService = new MovieService();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(movie.rating ?? 0);

  const guestSessionId = useSelector(
    (state: RootState) => state.guest.guest_session_id,
  );

  const mutation = useMutation({
    mutationFn: (rating: number) => {
      if (!guestSessionId) {
        throw new Error('Guest session id not found');
      }
      return movieService.rateMovie(
        { guest_session_id: guestSessionId },
        movie.id,
        rating,
      );
    },
  });
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRateChange = (value: number) => {
    setRating(value);
  };

  const handleRateSubmit = () => {
    mutation.mutate(rating);
    setRating(0);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Card
        style={{ width: '240px' }}
        cover={
          <img
            className="w-[238px] h-[361px] cursor-pointer"
            alt={`Poster for ${movie.title}`}
            src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            onClick={handleOpenModal}
          />
        }
      >
        <Meta
          title={movie.title}
          description={`Fecha de estreno: ${movie.release_date.toString()}`}
          className="block w-[190px] text-ellipsis whitespace-nowrap overflow-hidden"
        />
      </Card>
      <Modal
        title={movie.title}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <div>
          <p>
            <span className="font-bold">Overview:</span> {movie.overview}
          </p>
          <p>
            <span className="font-bold">Popularity:</span> {movie.popularity}
          </p>
          <p>
            <span className="font-bold">Release Date:</span>{' '}
            {movie.release_date.toString()}
          </p>
          <p>
            <span className="font-bold">Vote Average:</span>{' '}
            {movie.vote_average.toFixed(1)}
          </p>
          <p>
            <span className="font-bold">Original Language:</span>{' '}
            {movie.original_language}
          </p>
          <div className="flex items-center">
            <p className="font-bold">Rate the movie: </p>
            <Rate
              count={10}
              key="rate"
              allowHalf
              defaultValue={rating}
              onChange={handleRateChange}
              className="mx-2"
            />
            <Button
              key="submit"
              type="primary"
              ghost
              onClick={handleRateSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MovieCard;
