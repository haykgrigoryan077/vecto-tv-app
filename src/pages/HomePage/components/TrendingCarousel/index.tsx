import React, { useRef } from 'react';
import type { MovieContentItem } from '../../../../types';
import styles from './TrendingCarousel.module.scss';

interface TrendingCarouselProps {
  items: MovieContentItem[];
  onItemClick: (item: MovieContentItem) => void;
}

const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  items,
  onItemClick,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDownRef.current = true;
    startXRef.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
    scrollLeftRef.current = carouselRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Trending Now</h2>

      <div
        className={styles.carousel}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item) => (
          <div
            key={item.Id}
            className={styles.carouselItem}
            onClick={() => onItemClick(item)}
          >
            <img
              src={`/assets/${item.CoverImage}`}
              alt={item.Title}
              className={styles.coverImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCarousel;
