import type { SessionData } from '../types';

export const saveSessionData = (data: SessionData, sessionKey: string) => {
  try {
    sessionStorage.setItem(sessionKey, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save session data:', e);
  }
};
