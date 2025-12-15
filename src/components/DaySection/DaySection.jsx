import React from 'react';
import styles from './DaySection.module.css';
import PhotoCard from '../PhotoCard/PhotoCard';
import PhotoGallery from '../PhotoGallery/PhotoGallery';

// DaySection: renders a day title and a responsive grid of PhotoCard components
export default function DaySection({day}){
  const {title, photos} = day;
  return (
    <section className={styles.day} aria-labelledby={day.id}>
      <div className={styles.header}>
        <h2 id={day.id}>{title}</h2>
        {day.id === 'day1' && (
          <div className={styles.hint} aria-hidden="false">
            <svg className={styles.hintIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 5a7 7 0 100 14 7 7 0 000-14zm9-1h-3.2l-1.2-2H7.4L6.2 4H3a1 1 0 00-1 1v14a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1zM12 8.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"/></svg>
            <span>Click the photo</span>
          </div>
        )}
      </div>
      <div className={`${styles.grid} ${photos.length === 1 ? styles.single : ''}`}>
        <PhotoGallery photos={photos} />
      </div>
    </section>
  )
}
