import type { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { key: 'search', icon: '/assets/icons/search-icon.png', label: 'Search' },
  { key: 'home', icon: '/assets/icons/home-icon.png', label: 'Home' },
  { key: 'tv', icon: '/assets/icons/tv-shows-icon.png', label: 'TV Shows' },
  { key: 'movies', icon: '/assets/icons/movies-icon.png', label: 'Movies' },
  { key: 'genres', icon: '/assets/icons/genres-icon.png', label: 'Genres' },
  {
    key: 'later',
    icon: '/assets/icons/watch-later-icon.png',
    label: 'Watch Later',
  },
];

export const FOOTER = ['LANGUAGE', 'GET HELP', 'EXIT'];
