import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import { MovieService } from './utils/services/movie.service';

import './App.css';

const App = () => {
  const movieService = new MovieService();

  const query = useQuery({
    queryKey: ['movies'],
    queryFn: () => movieService.getPopularMovies(),
  });

  return (
    <div>
      <Row justify="start">
        <Col xs={24}>
          <h1 className="text-3xl font-bold underline">Movies</h1>
        </Col>
        <ul>
          {query.data?.results.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </Row>
    </div>
  );
};

export default App;
