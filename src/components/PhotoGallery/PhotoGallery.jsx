import React, {useState} from 'react';
import styles from './PhotoGallery.module.css';
import PhotoCard from '../PhotoCard/PhotoCard';
import PhotoModal from '../PhotoModal/PhotoModal';

// PhotoGallery: render a grid of clickable PhotoCards; open PhotoModal on click.
export default function PhotoGallery({photos = []}){
  const [selected, setSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const open = (idx) => { setSelected(photos[idx]); setSelectedIndex(idx); }
  const close = () => { setSelected(null); }
  const prev = () => { if(selectedIndex > 0) open(selectedIndex - 1); }
  const next = () => { if(selectedIndex < photos.length - 1) open(selectedIndex + 1); }

  return (
    <>
      <div className={styles.grid}>
        {photos.map((p, i) => (
          <PhotoCard key={i} photo={p} onClick={()=>open(i)} />
        ))}
      </div>
      <PhotoModal
        photo={selected}
        index={selectedIndex}
        total={photos.length}
        onClose={close}
      />
    </>
  );
}
