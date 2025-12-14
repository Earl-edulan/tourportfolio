import React, {useEffect} from 'react';
import styles from './PhotoModal.module.css';

export default function PhotoModal({photo, index, total, onClose}){
  if(!photo) return null;
  const {image, url, title, caption, description} = photo;
  const src = image || url;

  useEffect(()=>{
    const onKey = (e) => {
      if(e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  },[onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
        <button className={styles.close} aria-label="Close" onClick={onClose}>✕</button>
        <div className={styles.imageWrap}>
          <img src={src} alt={title} className={styles.image} />
        </div>
        <div className={styles.meta}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.caption}>{description || caption}</p>
          <div className={styles.controls} />
        </div>
      </div>
    </div>
  );
}
