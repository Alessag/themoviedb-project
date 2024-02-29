import type React from 'react';
import { Col, Input, Row } from 'antd';

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="container my-3 mx-auto">
      <Row justify="center">
        <Col xs={24}>
          <Input
            size="large"
            placeholder="Search movies"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
