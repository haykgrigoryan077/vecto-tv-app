import React, { useEffect, useState } from 'react';

import mockData from './../../data/mockData.json';
import Featured from './components/Featured';
import TrendingCarousel from './components/TrendingCarousel';
import { getViewedMovies, saveViewedMovie, sortByViewedMovies } from './utils';
import type { MovieContentItem } from '../../types';
import { useMovieStore } from '../../context/MovieContext';

const HomePage: React.FC = () => {
  const [trendingItems, setTrendingItems] = useState<MovieContentItem[]>([]);
  const { setFeaturedMovie, setIsVideoMode } = useMovieStore();

  useEffect(() => {
    const sorted = sortByViewedMovies(mockData.TendingNow.slice(0, 50));
    setTrendingItems(sorted);

    const viewedIds = getViewedMovies();
    const lastViewedId = viewedIds[0];
    const lastViewedMovie = sorted.find((movie) => movie.Id === lastViewedId);

    if (lastViewedMovie) {
      setFeaturedMovie(lastViewedMovie);
      setIsVideoMode(true);
    } else {
      setFeaturedMovie(mockData.Featured);
      setIsVideoMode(false);
    }
  }, []);

  const handleItemClick = (item: MovieContentItem) => {
    saveViewedMovie(item.Id);
    setFeaturedMovie(item);
    setIsVideoMode(false);

    const updatedItems = sortByViewedMovies(trendingItems);
    setTrendingItems(updatedItems);

    setTimeout(() => {
      setIsVideoMode(true);
    }, 2000);
  };

  return (
    <div>
      <Featured />
      <TrendingCarousel items={trendingItems} onItemClick={handleItemClick} />
    </div>
  );
};

export default HomePage;
