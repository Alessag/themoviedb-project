import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import MovieCard from '../components/MovieCard';
import { MovieService } from '../utils/services/movie.service';

const Home = () => {
  const movieService = new MovieService();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies'],
    queryFn: () => movieService.getPopularMovies(),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex justify-center flex-col">
      <Row>
        <Col xs={24}>
          <h1 className="text-3xl font-bold underline">Popular Movies</h1>
        </Col>
      </Row>
      <div className="container mx-auto my-0">
        <Row
          justify="start"
          gutter={[16, 16]}
        >
          {data?.results.map((movie) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
