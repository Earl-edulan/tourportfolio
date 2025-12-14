import React, {useState, useEffect} from 'react';
import styles from './PhotoCard.module.css';

// PhotoCard: shows an image as a background with a title and short caption.
// Uses CSS background-image for better layout control across varied aspect ratios.
export default function PhotoCard({photo, onClick}){
  const {image, url, title, caption} = photo;
  const src = image || url;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    setIsLoaded(false); setIsError(false);
    if(!src) { setIsError(true); return; }
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => { setIsError(true); console.warn('PhotoCard: failed to load', src); };
    img.src = src;
  },[src]);
  const handleKeyDown = (e) => {
    if(!onClick) return;
    if(e.key === 'Enter' || e.key === ' ') onClick();
  }

  return (
    <article
      className={styles.card}
      role="group"
      aria-label={`${title} - ${caption}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className={styles.media}
        style={{
          backgroundImage: `url(${isError ? '/images/placeholder.svg' : src})`,
        }}
        aria-hidden="true"
      >
        {isError && (
          <div className={styles.placeholder}>
            <span>Image missing</span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.caption}>{caption}</p>
      </div>
    </article>
  )
}
