import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import ErrorMessage from './components/utils/ErrorMessage';
import LoadingSpinner from './components/utils/LoadingSpinner';
import { setGuestSessionId } from './features/guest/guestSlice';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import MyList from './pages/MyList';
import Search from './pages/Search';
import Root from './routes/root';
import { MovieService } from './utils/services/movie.service';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/mylist',
        element: <MyList />,
      },
    ],
  },
]);
const App = () => {
  const movieService = new MovieService();

  const {
    data: guestQuery,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['sessionId'],
    queryFn: () => movieService.getGuestSessionId(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (guestQuery?.guest_session_id)
      dispatch(setGuestSessionId(guestQuery.guest_session_id));
  }, [guestQuery]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage error={error.message} />;
  }

  return <RouterProvider router={router} />;
};

export default App;
