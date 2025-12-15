import React from 'react';
import styles from './App.module.css';
import HeroSection from './components/HeroSection/HeroSection';
import Hearts from './components/Hearts/Hearts';
import DaySection from './components/DaySection/DaySection';
import daysData from './data/photos';

// Root App: renders the hero and dynamically maps day sections from data
export default function App(){
  return (
    <div className={styles.app}>
      <Hearts />
      <HeroSection />
      <main className={styles.main}>
        {daysData.map((day, idx) => (
          <DaySection key={day.id || idx} day={day} />
        ))}
      </main>
      <footer className={styles.footer}>Documentary · Travel · Photo Journal</footer>
    </div>
  )
}
