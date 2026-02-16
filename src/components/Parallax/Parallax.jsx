import { useEffect, useRef } from 'react';
import styles from './Parallax.module.scss';

export default function Parallax() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const section = bgRef.current.closest('section');
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      
      if (rect.bottom < 0 || rect.top > viewH) return;
      
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const shift = (progress - 0.5) * 120;
      bgRef.current.style.transform = `translateY(${shift}px) scale(1.15)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.parallax}>
      {/* Parallax BG */}
      <div className={styles.bg} ref={bgRef}>
        <img
          src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=85"
          alt="Construction Background"
        />
      </div>
      <div className={styles.overlay} />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrow__line} />
            November 2025 · Jakarta
          </span>

          <h2 className={styles.headline}>
            Temukan Inovasi Terbaru<br />
            di Dunia <em>Konstruksi</em><br />
            & Arsitektur
          </h2>

          <p className={styles.body}>
            Lebih dari 500 exhibitor premium, 30+ seminar eksklusif, dan<br />
            ribuan kesempatan bisnis menanti Anda di Konstruksi Expo 2025.
          </p>

          <div className={styles.ctas}>
            <a
              href="#booking"
              className={`btn btn--primary ${styles.ctaPrimary}`}
              onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Daftar Sebagai Exhibitor
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#gallery"
              className={`btn btn--outline ${styles.ctaOutline}`}
              onClick={(e) => { e.preventDefault(); document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Lihat Galeri
            </a>
          </div>

          {/* Features row */}
          <div className={styles.features}>
            {[
              { icon: '🏆', text: 'Skala Internasional' },
              { icon: '🤝', text: '40.000+ Profesional' },
              { icon: '💡', text: '30+ Seminar' },
              { icon: '📍', text: 'JIExpo Kemayoran' },
            ].map((f, i) => (
              <div key={i} className={styles.feature}>
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
