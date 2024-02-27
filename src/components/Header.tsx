import { Link } from 'react-router-dom';
import { Row } from 'antd';

const Header = () => {
  return (
    <Row justify="center">
      <nav style={{ margin: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/mylist">My List</Link>
      </nav>
    </Row>
  );
};

export default Header;
