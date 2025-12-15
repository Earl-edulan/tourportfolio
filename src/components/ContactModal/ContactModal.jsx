import React, {useEffect} from 'react';
import styles from '../PhotoModal/PhotoModal.module.css';

export default function ContactModal({onClose}){
  useEffect(()=>{
    const onKey = (e) => { if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  },[onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
        <button className={styles.close} aria-label="Close" onClick={onClose}>✕</button>
        <div className={styles.imageWrap} style={{flexDirection:'column',alignItems:'flex-start'}}>
          <h3 style={{marginTop:6}}>Contact</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}><strong>Phone:</strong> <a href="tel:">+6398 5439 9330</a></li>
            <li className={styles.contactItem}><strong>Email:</strong> <a href="mailto:earljohn.edulan@hcdc.edu.ph">earljohn.edulan@hcdc.edu.ph</a></li>
            <li className={styles.contactItem}><strong>Socials:</strong>
              <div className={styles.socials}>
                <a className={styles.socialLink} href="https://www.facebook.com/ejedulan3" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.76-1.61 1.54v1.84h2.74l-.44 2.89h-2.3V21.9C18.34 21.12 22 16.99 22 12z"/>
                  </svg>
                </a>
                <a className={styles.socialLink} href="https://www.instagram.com/rlejrd_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.5-3a1 1 0 11-1 1 1 1 0 011-1zM12 9.5A2.5 2.5 0 1114.5 12 2.5 2.5 0 0112 9.5z"/>
                  </svg>
                </a>
                <a className={styles.socialLink} href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                    <path d="M22 5.92a8.19 8.19 0 01-2.36.65 4.12 4.12 0 001.8-2.27 8.28 8.28 0 01-2.6.99A4.14 4.14 0 0016.11 4c-2.28 0-4.13 1.85-4.13 4.13 0 .32.04.63.11.93-3.43-.17-6.47-1.81-8.51-4.3a4.13 4.13 0 00-.56 2.08c0 1.44.73 2.71 1.84 3.45a4.12 4.12 0 01-1.87-.52v.05c0 2.01 1.43 3.69 3.33 4.07a4.18 4.18 0 01-1.86.07 4.14 4.14 0 003.86 2.87A8.31 8.31 0 012 19.54 11.72 11.72 0 008.29 21c7.55 0 11.69-6.26 11.69-11.69 0-.18 0-.36-.01-.53A8.36 8.36 0 0022 5.92z"/>
                  </svg>
                </a>
                <a className={styles.socialLink} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                    <path d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8.98h3.98V21H3V8.98zM9.5 8.98h3.82v1.56h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.66 4.78 6.12V21h-3.98v-5.3c0-1.26-.02-2.88-1.75-2.88-1.75 0-2.02 1.37-2.02 2.8V21H9.5V8.98z"/>
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
