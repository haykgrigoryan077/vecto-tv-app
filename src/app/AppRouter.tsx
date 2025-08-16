import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import AppShell from './AppShell';
import MoviesPage from '../pages/Movies';
import TvShows from '../pages/TvShows';
import Genres from '../pages/Genres';
import WatchLater from '../pages/WatchLater';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies',
        element: <MoviesPage />,
      },
      {
        path: 'tv-shows',
        element: <TvShows />,
      },
      {
        path: 'genres',
        element: <Genres />,
      },
      {
        path: 'watch-later',
        element: <WatchLater />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
