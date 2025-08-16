import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import cn from 'classnames';
import styles from './Featured.module.scss';
import { useMovieStore } from '../../../../context/MovieContext';
import Loader from '../../../../components/Loader';

const formatDuration = (total: string) => {
  const totalSeconds = parseInt(total);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.round((totalSeconds % 3600) / 60);
  return `${h}h ${m}m`;
};

const Featured: React.FC = () => {
  const { featuredMovie, isVideoMode } = useMovieStore();
  const [videoError, setVideoError] = useState(false);
  const [videoKey, setVideoKey] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setVideoError(false);
    setIsPaused(false);
    setIsVideoReady(false);
    setVideoKey(featuredMovie?.VideoUrl || '');
  }, [featuredMovie]);

  const handlePlayToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
    setIsVideoReady(false);
  }, []);

  const shouldTryVideo = useMemo(() => {
    return (
      isVideoMode && featuredMovie?.VideoUrl && !videoError && isVideoReady
    );
  }, [isVideoMode, featuredMovie?.VideoUrl, videoError, isVideoReady]);

  const formattedDuration = useMemo(() => {
    return featuredMovie?.Duration
      ? formatDuration(featuredMovie.Duration)
      : '';
  }, [featuredMovie?.Duration]);

  if (!featuredMovie) return <Loader />;

  const {
    CoverImage,
    VideoUrl,
    TitleImage,
    Title,
    Description,
    Category,
    ReleaseYear,
    MpaRating,
  } = featuredMovie;

  return (
    <section className={styles.featured}>
      <div className={styles['media-container']}>
        <img
          src={`/assets/${CoverImage}`}
          alt={Title}
          className={styles['featured-bg']}
        />

        {isVideoMode && VideoUrl && !videoError && (
          <video
            ref={videoRef}
            key={`${videoKey}-${isVideoMode}`}
            src={VideoUrl}
            autoPlay
            muted
            loop
            controls={false}
            onCanPlay={() => setIsVideoReady(true)}
            onError={handleVideoError}
            onPlay={() => setIsPaused(false)}
            onPause={() => setIsPaused(true)}
            className={cn(styles['featured-video'], {
              [styles['video-hidden']]: !isVideoReady,
            })}
            style={{ pointerEvents: 'none' }}
          />
        )}

        <div className={styles['featured-shade']} />
      </div>

      <div className={styles['featured-content']}>
        <span className={styles.category}>{Category?.toUpperCase()}</span>

        {TitleImage ? (
          <div className={styles['title-image-wrapper']}>
            <img
              src={`/assets/${TitleImage}`}
              alt={Title}
              className={styles['title-image']}
            />
          </div>
        ) : (
          <h1 className={styles['title-fallback']}>{Title}</h1>
        )}

        <div className={styles['meta-row']}>
          <span>{ReleaseYear}</span>
          <span>{MpaRating}</span>
          <span>{formattedDuration}</span>
        </div>

        <p className={styles.description}>{Description}</p>

        <div className={styles.actions}>
          {shouldTryVideo ? (
            <button
              className={cn(styles.btn, styles['btn--primary'])}
              onClick={handlePlayToggle}
            >
              <span className={styles['btn-icon']}>{isPaused ? '►' : '⏸'}</span>{' '}
              {isPaused ? 'Play' : 'Pause'}
            </button>
          ) : (
            <button className={cn(styles.btn, styles['btn--primary'])}>
              <span className={styles['btn-icon']}>►</span> Play
            </button>
          )}

          <button className={cn(styles.btn, styles['btn--brand'])}>
            More Info
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
