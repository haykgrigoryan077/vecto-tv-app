import { loadSessionData } from '../../utils/loadSessionData';
import { saveSessionData } from '../../utils/saveSessionData';
import { SESSION_KEY } from '../config';

export const saveViewedMovie = (movieId: string): void => {
  const session = loadSessionData(SESSION_KEY);
  session.viewedMovies = [
    movieId,
    ...(session.viewedMovies || []).filter((id) => id !== movieId),
  ];
  saveSessionData(session, SESSION_KEY);
};

export const getViewedMovies = (): string[] => {
  return loadSessionData(SESSION_KEY).viewedMovies || [];
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
