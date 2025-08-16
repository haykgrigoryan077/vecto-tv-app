import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MovieContentItem } from '../../types';
import { SESSION_KEY } from '../../pages/config';

interface MovieStoreType {
  featuredMovie: MovieContentItem | null;
  setFeaturedMovie: (movie: MovieContentItem) => void;

  isVideoMode: boolean;
  setIsVideoMode: (mode: boolean) => void;

  viewedMovies: string[];
  addViewedMovie: (movieId: string) => void;
}

interface SessionData {
  viewedMovies: string[];
  featuredMovieId?: string;
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
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed: SessionData = JSON.parse(stored);
        if (Array.isArray(parsed.viewedMovies)) {
          setViewedMovies(parsed.viewedMovies);
        }
        if (parsed.featuredMovieId) {
        }
      }
    } catch (error) {
      console.warn('Failed to load from sessionStorage:', error);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      const parsed: SessionData = stored ? JSON.parse(stored) : {};
      parsed.viewedMovies = viewedMovies;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
    } catch (error) {
      console.warn('Failed to update viewed movies in sessionStorage:', error);
    }
  }, [viewedMovies, hasHydrated]);

  const setFeaturedMovie = (movie: MovieContentItem) => {
    _setFeaturedMovie(movie);
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      const parsed: SessionData = stored
        ? JSON.parse(stored)
        : { viewedMovies: [] };
      parsed.featuredMovieId = movie.Id;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
    } catch (error) {
      console.warn('Failed to save featured movie to sessionStorage:', error);
    }
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
