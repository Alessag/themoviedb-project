import { useEffect, useState } from 'react';
import { Button, Modal, Rate } from 'antd';

import type { Movie } from '../../utils/types/movies.types';

interface MovieModalProps {
  movie: Movie;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  handleRateSubmit: (movieId: number, rate: number) => void;
}
const MovieModal = ({
  movie,
  handleRateSubmit,
  handleCloseModal,
  isModalOpen,
}: MovieModalProps) => {
  const [rating, setRating] = useState<number>(movie.rating ?? 0);
  const isSubmitDisabled = rating === 0;

  const handleRateChange = (value: number) => {
    setRating(value);
  };

  useEffect(() => {
    setRating(movie.rating ?? 0);
  }, [movie]);

  return (
    <div>
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
            {movie.release_date}
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
              value={rating}
              className="mx-2"
            />
            <Button
              key="submit"
              type="primary"
              ghost
              disabled={isSubmitDisabled}
              onClick={() => {
                handleRateSubmit(movie.id, rating);
                setRating(0);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MovieModal;
