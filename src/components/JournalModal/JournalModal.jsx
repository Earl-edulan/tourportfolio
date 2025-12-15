import React, {useEffect, useState} from 'react';
import styles from '../PhotoModal/PhotoModal.module.css';
import PhotoModal from '../PhotoModal/PhotoModal';

export default function JournalModal({onClose}){
  const photos = [
    {image: '/images/pic1.jpg', title: 'Pic 1'},
    {image: '/images/pic2.jpg', title: 'Pic 2'},
    {image: '/images/pic3.jpg', title: 'Pic 3'},
    {image: '/images/pic4.jpg', title: 'Pic 4'},
    {image: '/images/pic5.jpg', title: 'Pic 5'},
  ];
  const [selected, setSelected] = useState(null);

  useEffect(()=>{
    const onKey = (e) => { if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  },[onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={`${styles.modal} ${styles.journalModal}`} onClick={(e)=>e.stopPropagation()}>
        <button className={styles.close} aria-label="Close" onClick={onClose}>✕</button>
        <div style={{padding:'8px 4px 2px 4px', color:'var(--muted)'}}>
          <h3 style={{margin:'6px 0 12px 0'}}>Journal</h3>
        </div>
        <div className={styles.journalGrid}>
          {photos.map((p, i) => (
            <img key={p.image} src={p.image} alt={p.title} className={styles.thumb} onClick={() => setSelected(i)} />
          ))}
        </div>
        {selected !== null && (
          <PhotoModal photo={photos[selected]} index={selected} total={photos.length} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  )
}
