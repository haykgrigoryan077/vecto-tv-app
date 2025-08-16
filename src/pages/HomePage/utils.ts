import { SESSION_KEY } from '../config';

interface SessionData {
  viewedMovies: string[];
  featuredMovieId?: string;
}

export const saveViewedMovie = (movieId: string): void => {
  try {
    const viewed = getViewedMovies();
    const updatedViewed = [movieId, ...viewed.filter((id) => id !== movieId)];

    const existing = sessionStorage.getItem(SESSION_KEY);
    const parsed: SessionData = existing
      ? JSON.parse(existing)
      : { viewedMovies: [] };
    parsed.viewedMovies = updatedViewed;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
  } catch (error) {
    console.warn('Failed to save viewed movie to session storage:', error);
  }
};

export const getViewedMovies = (): string[] => {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return [];
    const parsed: SessionData = JSON.parse(stored);
    return Array.isArray(parsed.viewedMovies) ? parsed.viewedMovies : [];
  } catch (error) {
    console.warn('Failed to get viewed movies from session storage:', error);
    return [];
  }
};

export const sortByViewedMovies = <T extends { Id: string }>(
  items: T[]
): T[] => {
  const viewedIds = getViewedMovies();

  const viewedItems = viewedIds
    .map((id) => items.find((item) => item.Id === id))
    .filter(Boolean) as T[];

  const unviewedItems = items.filter((item) => !viewedIds.includes(item.Id));

  return [...viewedItems, ...unviewedItems];
};
