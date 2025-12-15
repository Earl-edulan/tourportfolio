import React, {useEffect, useRef, useState} from 'react';
import styles from './HeroSection.module.css';
import CertificateModal from '../CertificateModal/CertificateModal';
import JournalModal from '../JournalModal/JournalModal';
import ContactModal from '../ContactModal/ContactModal';

// HeroSection: split-image top/bottom slices with overlay and subtle parallax effect.
export default function HeroSection(){
  const ref = useRef();
  const topRef = useRef();
  const bottomRef = useRef();
  const [topImage, setTopImage] = useState(()=>{
    try{ return localStorage.getItem('heroTopImage') }catch(e){return null}
  });
  const [defaultTop, setDefaultTop] = useState(null);
  const [logoSrc, setLogoSrc] = useState('/images/logoo.jpg');
  const [showCert, setShowCert] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(()=>{
    const onScroll = () => {
      if(!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offset = rect.top; // negative when scrolled down
      const factor = Math.min(Math.max(offset / 200, -10), 10);
      if(topRef.current) topRef.current.style.transform = `translateY(${factor * 6}px)`;
      if(bottomRef.current) bottomRef.current.style.transform = `translateY(${factor * -6}px)`;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    return () => window.removeEventListener('scroll', onScroll);
  },[])

  // find local default hero image if the user put it in public/images
  useEffect(()=>{
    const candidates = ['/images/CCLEX-Day-Shot-3-1024x697.jpg','/images/CCLEX-day.jpg','/images/cclex-day.jpg','/images/CCLEX.jpg','/images/cclex.jpg'];
    let mounted = true;
    const checkNext = (idx) => {
      if(!mounted) return;
      if(idx >= candidates.length) return;
      const img = new Image();
      img.onload = () => { if(mounted) setDefaultTop(candidates[idx]); };
      img.onerror = () => checkNext(idx+1);
      img.src = candidates[idx];
    }
    checkNext(0);
    return () => { mounted = false; }
  },[])

  // prefer user-supplied HCDC logo if present
  useEffect(()=>{
    const candidates = ['/images/logoo.jpg','/images/hcdclogo.png','/images/logoo.jpg','/images/logo.jpg'];
    let mounted = true;
    const checkNext = (i)=>{
      if(!mounted) return;
      if(i >= candidates.length) return;
      const img = new Image();
      img.onload = () => { if(mounted) setLogoSrc(candidates[i]); };
      img.onerror = () => checkNext(i+1);
      img.src = candidates[i];
    }
    checkNext(0);
    return ()=>{ mounted = false }
  },[])

  // topImage is read from `localStorage` if previously saved; UI removed per request

  return (
    <header ref={ref} className={styles.hero}>
        <div className={styles.credit}>
          <img src="/images/profile.jpg" alt="Profile" className={styles.profile} />
          <div className={styles.creditContent}>
            <div className={styles.name}>Earl John V. Edulan · BSIT 3B</div>
            <div className={styles.actions}>
              <button className={styles.certificate} onClick={() => setShowCert(true)} aria-haspopup="dialog" aria-expanded={showCert}>Certificate</button>
              <button className={styles.certificate} onClick={() => setShowJournal(true)} aria-haspopup="dialog" aria-expanded={showJournal}>Journal</button>
              <button className={styles.certificate} onClick={() => setShowContact(true)} aria-haspopup="dialog" aria-expanded={showContact}>Contact</button>
            </div>
          </div>
        </div>
      <img src={logoSrc} alt="HCDC logo" className={styles.logo} />
      <div className={styles.sliceTop} ref={topRef} style={ topImage ? { backgroundImage:`url(${topImage})` } : (defaultTop ? { backgroundImage:`url(${defaultTop})` } : undefined) }>
        <div className={styles.overlay} />
        <h1 className={styles.label}>EDUCATIONAL TOUR</h1>
      </div>
      <div className={styles.sliceBottom} ref={bottomRef}>
        <div className={styles.overlay} />
        <h4 className={styles.label}>CEBU AND BOHOL</h4>
      </div>
      {showCert && <CertificateModal onClose={() => setShowCert(false)} />}
      {showJournal && <JournalModal onClose={() => setShowJournal(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </header>
  )
} 
