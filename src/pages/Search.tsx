import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';

import { MovieService } from '../utils/services/movie.service';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const movieService = new MovieService();

  const query = useQuery({
    queryKey: ['movies', search],
    queryFn: () => movieService.searchMovies({ query: search }),
  });

  return (
    <div>
      <Row justify="start">
        <Col xs={24}>
          <h1 className="text-3xl font-bold underline">Search Movies</h1>
          <input
            value={search}
            placeholder="search movies"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
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

export default Search;
