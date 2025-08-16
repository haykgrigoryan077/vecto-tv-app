import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MovieContentItem } from '../../types';

interface MovieStoreType {
  featuredMovie: MovieContentItem | null;
  setFeaturedMovie: (movie: MovieContentItem) => void;

  isVideoMode: boolean;
  setIsVideoMode: (mode: boolean) => void;

  viewedMovies: string[];
  addViewedMovie: (movieId: string) => void;
}

const VIEWED_MOVIES_KEY = 'viewedMovies';

const MovieStoreContext = createContext<MovieStoreType | null>(null);

export const MovieStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [featuredMovie, setFeaturedMovie] = useState<MovieContentItem | null>(
    null
  );
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [viewedMovies, setViewedMovies] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(VIEWED_MOVIES_KEY);
      if (stored) {
        setViewedMovies(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load viewed movies from session storage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(VIEWED_MOVIES_KEY, JSON.stringify(viewedMovies));
    } catch (error) {
      console.warn('Failed to save viewed movies to session storage:', error);
    }
  }, [viewedMovies]);

  const addViewedMovie = (movieId: string) => {
    setViewedMovies((prev) => {
      if (prev.includes(movieId)) {
        return [movieId, ...prev.filter((id) => id !== movieId)];
      }
      return [movieId, ...prev];
    });
  };

  return (
    <MovieStoreContext.Provider
      value={{
        featuredMovie,
        setFeaturedMovie,
        isVideoMode,
        setIsVideoMode,
        viewedMovies,
        addViewedMovie,
      }}
    >
      {children}
    </MovieStoreContext.Provider>
  );
};

export const useMovieStore = () => {
  const context = useContext(MovieStoreContext);
  if (!context) {
    throw new Error('useMovieStore must be used within MovieStoreProvider');
  }
  return context;
};
