import type { SessionData } from "../types";

export const loadSessionData = (sessionKey: string): SessionData => {
  try {
    const raw = sessionStorage.getItem(sessionKey);
    return raw ? JSON.parse(raw) : { viewedMovies: [] };
  } catch (e) {
    console.warn('Failed to parse session data:', e);
    return { viewedMovies: [] };
  }
};
