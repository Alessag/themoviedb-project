import { useQuery } from '@tanstack/react-query';
import { Card, Col, Row } from 'antd';

import { MovieService } from './utils/services/movie.service';

import './App.css';

const { Meta } = Card;

const App = () => {
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
              <Card
                style={{ width: '240px' }}
                cover={
                  <img
                    className="w-[238px] h-[361px]"
                    alt={`Poster for ${movie.title}`}
                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                  />
                }
              >
                <Meta
                  title={movie.title}
                  description={`Fecha de estreno: ${movie.release_date.toString()}`}
                  className="block w-[190px] text-ellipsis whitespace-nowrap overflow-hidden"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default App;
