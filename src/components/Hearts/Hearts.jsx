import React, {useEffect, useRef, useState} from 'react';
import styles from './Hearts.module.css';

function rand(min, max){ return Math.random() * (max - min) + min }

export default function Hearts({count = 1}){
  const rafRef = useRef(null);
  const heartRef = useRef(null);
  const mounted = useRef(false);
  const [, setTick] = useState(0); // force rerender occasionally

  // spawn a single heart starting near the center and animate it
  useEffect(()=>{
    mounted.current = true;
    const w = window.innerWidth;
    const h = window.innerHeight;
    spawnCenter(w,h);
    let last = performance.now();
    const loop = (t)=>{
      const dt = Math.min((t - last)/1000, 0.05);
      last = t;
      update(dt);
      // force a low-frequency React render so positions update smoothly
      setTick(n => (n+1) % 60);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return ()=>{ mounted.current = false; cancelAnimationFrame(rafRef.current); }
  },[])

  function spawnCenter(w,h){
    const size = Math.round(rand(28, 48));
    // start near the center
    heartRef.current = {
      id: Math.random().toString(36).slice(2),
      x: w/2 - size/2 + rand(-60,60),
      y: h/2 - size/2 + rand(-40,40),
      vx: rand(-180, 180),
      vy: rand(-140, 140),
      size,
      color: `hsl(${Math.round(rand(330, 360))}, 80%, ${Math.round(rand(45,65))}%)`
    };
  }

  function update(dt){
    const w = window.innerWidth;
    const h = window.innerHeight;
    const p = heartRef.current;
    if(!p) return;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
      // bounce off edges
      if(p.x < 6){ p.x = 6; p.vx = Math.abs(p.vx) }
      if(p.x + p.size > w - 6){ p.x = w - 6 - p.size; p.vx = -Math.abs(p.vx) }
      if(p.y < 6){ p.y = 6; p.vy = Math.abs(p.vy) }
      if(p.y + p.size > h - 6){ p.y = h - 6 - p.size; p.vy = -Math.abs(p.vy) }
    // tiny friction
    p.vx *= 0.9995; p.vy *= 0.9995;
    // keep a gentle randomness so movement isn't linear
    if(Math.random() < 0.008){ p.vx += rand(-40,40); p.vy += rand(-30,30); }
  }

  const hearts = heartRef.current ? [heartRef.current] : [];

  return (
    <div className={styles.container} aria-hidden="true">
      {hearts.map(h => (
        <div key={h.id} className={styles.heart} style={{left:0,top:0,transform:`translate3d(${Math.round(h.x)}px, ${Math.round(h.y)}px, 0) scale(${h.size/28})`, width:h.size, height:h.size, color:h.color}}>
          <svg viewBox="0 0 24 24" className={styles.svg} xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7-4.35-9-7.06C-1.5 9.83 5 3.5 12 8.5c7-5 13.5 1.33 9 5.44C19 16.65 12 21 12 21z" fill="currentColor"/></svg>
        </div>
      ))}
    </div>
  )
}
