import AppRouter from './app/AppRouter';
import { MovieStoreProvider } from './context/MovieContext';

export default function App() {
  return (
    <MovieStoreProvider>
      <AppRouter />
    </MovieStoreProvider>
  );
}
