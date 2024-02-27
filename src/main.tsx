import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage.tsx';
import MyList from './pages/MyList.tsx';
import Search from './pages/Search.tsx';
import Root from './routes/root.tsx';
import App from './App.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);
