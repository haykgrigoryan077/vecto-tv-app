import React, { useRef, useCallback, useMemo } from 'react';
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
  const isDragging = useRef(false);
  const startX = useRef(0);
  const initialScroll = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
    initialScroll.current = carouselRef.current?.scrollLeft || 0;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = initialScroll.current - walk;
  }, []);

  const stopDragging = useCallback(() => {
    isDragging.current = false;
  }, []);

  const renderedItems = useMemo(
    () =>
      items.map((item) => (
        <div
          key={item.Id}
          className={styles.carouselItem}
          onClick={() => onItemClick(item)}
        >
          <img
            src={`/assets/${item.CoverImage}`}
            alt={item.Title}
            className={styles.coverImage}
            draggable={false}
          />
        </div>
      )),
    [items, onItemClick]
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Trending Now</h2>

      <div
        className={styles.carousel}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {renderedItems}
      </div>
    </section>
  );
};

export default TrendingCarousel;
