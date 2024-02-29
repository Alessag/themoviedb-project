import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <nav className="container mx-auto h-16 flex justify-center align-middle items-center">
      <Link
        to="/"
        className={location.pathname === '/' ? 'font-bold' : ''}
      >
        Home
      </Link>
      <Link
        to="/search"
        className={
          'mx-4 ' + (location.pathname === '/search' ? 'font-bold' : '')
        }
      >
        Search
      </Link>
      <Link
        to="/mylist"
        className={location.pathname === '/mylist' ? 'font-bold' : ''}
      >
        My List
      </Link>
    </nav>
  );
};

export default Header;
