import { useEffect, useRef } from 'react';
import styles from './Parallax.module.scss';
import { eventInfo } from '../../data';

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
      const shift = (progress - 0.5) * 500;
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
        <img src='/images/exhibition-hall.png' alt='Construction Background' />
      </div>
      <div className={styles.overlay} />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrow__line} />
            {eventInfo.date} · {eventInfo.location}
          </span>

          <h2 className={styles.headline}>
            Jelajahi Inovasi,
            <br />
            Perluas Koneksi, dan
            <br />
            Raih <em>Peluang Baru</em>
          </h2>

          <p className={styles.body}>
            ProBuild menghadirkan ribuan pelaku industri dalam satu ekosistem kolaboratif.
            <br />
            Dapatkan insight strategis, temukan solusi inovatif, dan bangun koneksi langsung dengan
            pengambil keputusan proyek nasional.
          </p>

          <div className={styles.ctas}>
            <a
              href='#booking'
              className={`btn btn--primary ${styles.ctaPrimary}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Daftar Sebagai Visitor
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                <path d='M5 12h14M12 5l7 7-7 7' />
              </svg>
            </a>
          </div>

          {/* Features row */}
          <div className={styles.features}>
            {[
              { icon: '🤝', text: '100+ Exhibitor' },
              { icon: '👥', text: '15.000+ Pengunjung' },
              { icon: '💡', text: '20+ Pembicara Profesional' },
              { icon: '📍', text: eventInfo.venue },
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
