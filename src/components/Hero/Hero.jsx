import { useState, useEffect } from 'react';
import { eventInfo } from '../../data';
import styles from './Hero.module.scss';

function CountdownUnit({ value, label }) {
  return (
    <div className={styles.countdown__unit}>
      <span className={styles.countdown__number}>{String(value).padStart(2, '0')}</span>
      <span className={styles.countdown__label}>{label}</span>
    </div>
  );
}

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(eventInfo.targetDate);

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="home">
      {/* Background */}
      <div className={styles.bg}>
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85"
          alt="Modern Architecture"
          className={styles.bg__img}
        />
        <div className={styles.bg__overlay} />
        <div className={styles.bg__noise} />
      </div>

      {/* Grid lines decoration */}
      <div className={styles.gridLines} aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="container">
        <div className={styles.content}>
          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrow__dot} />
            <span>Jakarta International Expo • {eventInfo.date}</span>
            <span className={styles.eyebrow__badge}>Event Nasional</span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            <span className={styles.headline__top}>Indonesia's Premier</span>
            <span className={styles.headline__main}>Construction &</span>
            <span className={styles.headline__accent}>Architecture</span>
            <span className={styles.headline__sub}>Expo 2025</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Platform pertemuan 500+ exhibitor, 40.000 profesional, dan inovator industri
            konstruksi terbesar se-Indonesia dalam 4 hari transformasi.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctas}>
            <a
              href="#booking"
              className={`btn btn--primary ${styles.cta__primary}`}
              onClick={(e) => { e.preventDefault(); handleScroll('#booking'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Daftar Sekarang
            </a>
            <a
              href="#booking"
              className={`btn btn--outline ${styles.cta__outline}`}
              onClick={(e) => { e.preventDefault(); handleScroll('#booking'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Booking Stand
            </a>
          </div>

          {/* Countdown */}
          <div className={styles.countdownWrap}>
            <span className={styles.countdownLabel}>Menghitung mundur ke hari H:</span>
            <div className={styles.countdown}>
              <CountdownUnit value={days} label="Hari" />
              <span className={styles.countdown__sep}>:</span>
              <CountdownUnit value={hours} label="Jam" />
              <span className={styles.countdown__sep}>:</span>
              <CountdownUnit value={minutes} label="Menit" />
              <span className={styles.countdown__sep}>:</span>
              <CountdownUnit value={seconds} label="Detik" />
            </div>
          </div>
        </div>

        {/* Bottom badges */}
        <div className={styles.badges}>
          <div className={styles.badge}>
            <span className={styles.badge__value}>500+</span>
            <span className={styles.badge__label}>Exhibitor</span>
          </div>
          <div className={styles.badge__divider} />
          <div className={styles.badge}>
            <span className={styles.badge__value}>40.000+</span>
            <span className={styles.badge__label}>Pengunjung</span>
          </div>
          <div className={styles.badge__divider} />
          <div className={styles.badge}>
            <span className={styles.badge__value}>18.000 m²</span>
            <span className={styles.badge__label}>Area Pameran</span>
          </div>
          <div className={styles.badge__divider} />
          <div className={styles.badge}>
            <span className={styles.badge__value}>4 Hari</span>
            <span className={styles.badge__label}>Event</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className={styles.scrollDown}
        onClick={() => handleScroll('#about')}
        aria-label="Scroll down"
      >
        <span className={styles.scrollDown__line} />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </button>
    </section>
  );
}
