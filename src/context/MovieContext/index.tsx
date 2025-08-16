import React, { createContext, useContext, useEffect, useState } from 'react';
import type { MovieContentItem } from '../../types';
import { loadSessionData } from '../../utils/loadSessionData';
import { saveSessionData } from '../../utils/saveSessionData';
import { SESSION_KEY } from '../../pages/config';

interface MovieStoreType {
  featuredMovie: MovieContentItem | null;
  setFeaturedMovie: (movie: MovieContentItem) => void;

  isVideoMode: boolean;
  setIsVideoMode: (mode: boolean) => void;

  viewedMovies: string[];
  addViewedMovie: (movieId: string) => void;
}

const MovieStoreContext = createContext<MovieStoreType | null>(null);

export const MovieStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [featuredMovie, _setFeaturedMovie] = useState<MovieContentItem | null>(
    null
  );
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [viewedMovies, setViewedMovies] = useState<string[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const session = loadSessionData(SESSION_KEY);
    setViewedMovies(session.viewedMovies || []);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    const session = loadSessionData(SESSION_KEY);
    session.viewedMovies = viewedMovies;
    saveSessionData(session, SESSION_KEY);
  }, [viewedMovies, hasHydrated]);

  const setFeaturedMovie = (movie: MovieContentItem) => {
    _setFeaturedMovie(movie);
    const session = loadSessionData(SESSION_KEY);
    session.featuredMovieId = movie.Id;
    saveSessionData(session, SESSION_KEY);
  };

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
