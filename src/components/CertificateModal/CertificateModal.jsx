import React, {useEffect} from 'react';
import styles from '../PhotoModal/PhotoModal.module.css';

export default function CertificateModal({onClose}){
  useEffect(()=>{
    const onKey = (e) => { if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  },[onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
        <button className={styles.close} aria-label="Close" onClick={onClose}>✕</button>
        <div className={styles.imageWrap}>
          <img src="/images/cert.png" alt="Certificate" className={styles.image} />
        </div>
      </div>
    </div>
  )
}
