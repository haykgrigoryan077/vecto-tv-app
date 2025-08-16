const VIEWED_MOVIES_KEY = 'viewedMovies';

export const saveViewedMovie = (movieId: string): void => {
  try {
    const viewed = getViewedMovies();
    const updatedViewed = [movieId, ...viewed.filter((id) => id !== movieId)];
    localStorage.setItem(VIEWED_MOVIES_KEY, JSON.stringify(updatedViewed));
  } catch (error) {
    console.warn('Failed to save viewed movie to local storage:', error);
  }
};

export const getViewedMovies = (): string[] => {
  try {
    const stored = localStorage.getItem(VIEWED_MOVIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to get viewed movies from local storage:', error);
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
