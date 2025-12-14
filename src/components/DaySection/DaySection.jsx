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
      </div>
      <div className={`${styles.grid} ${photos.length === 1 ? styles.single : ''}`}>
        <PhotoGallery photos={photos} />
      </div>
    </section>
  )
}
