import { Card } from 'antd';

import type { Movie } from '../../utils/types/movies.types';

const { Meta } = Card;

interface MovieCardProps {
  movie: Movie;
  movieSelected: (movieId: number) => void;
}

const MovieCard = ({ movie, movieSelected }: MovieCardProps) => {
  return (
    <div>
      <Card
        style={{ width: '240px' }}
        cover={
          <img
            className="w-[238px] h-[361px] cursor-pointer"
            alt={`Poster for ${movie.title}`}
            src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            onClick={() => movieSelected(movie.id)}
          />
        }
      >
        <Meta
          title={movie.title}
          description={`Release date: ${movie.release_date}`}
          className="block w-[190px] text-ellipsis whitespace-nowrap overflow-hidden"
        />
      </Card>
    </div>
  );
};

export default MovieCard;
