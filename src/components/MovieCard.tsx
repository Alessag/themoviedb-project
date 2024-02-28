import { useState } from 'react';
import { Card, Modal } from 'antd';

import type { Movie } from '../utils/types/movies.types';

const { Meta } = Card;

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
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
        </div>
      </Modal>
    </div>
  );
};

export default MovieCard;
