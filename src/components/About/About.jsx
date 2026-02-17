import { useState, useEffect, useRef } from 'react';
import { eventInfo } from '../../data';
import styles from './About.module.scss';

const highlights = [
  { icon: '🏗️', number: 100, suffix: '+', label: 'Exhibitor Terpilih', color: 'red' },
  { icon: '👥', number: 15000, suffix: '+', label: 'Target Pengunjung', color: 'blue' },
  { icon: '🎓', number: 20, suffix: '+', label: 'Pembicara Ahli', color: 'green' },
  { icon: '📅', number: 4, suffix: ' Hari', label: 'Durasi Event', color: 'yellow' },
];

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(ease * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString('id-ID')}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section className={`section ${styles.about}`} id='about'>
      <div className='container'>
        <div className={styles.grid}>
          {/* Left: Text Content */}
          <div className={`${styles.textCol} reveal-left`}>
            <span className='section__label'>Tentang Event</span>
            <h2 className='section__title'>
              Panggung Terbesar
              <br />
              <span className={styles.accent}>Industri Konstruksi</span>
              <br />
              Indonesia Timur
            </h2>
            <p className={styles.body}>
              <strong>ProBuild 2026</strong> adalah pameran konstruksi B2B terbesar di Indonesia
              Timur, mempertemukan {eventInfo.exhibitor}+ exhibitor,{' '}
              {eventInfo.targetVisitor?.toLocaleString('id-ID')}+ pengunjung profesional, dan 20+
              pembicara ahli dari seluruh Indonesia. Fokus pada inovasi infrastruktur, material
              bangunan, teknologi digital konstruksi (BIM, AI), dan proyek strategis nasional serta
              pengembangan kawasan timur Indonesia.
            </p>
            <p className={styles.body}>
              <strong>Target 2026</strong>, {eventInfo.targetVisitor?.toLocaleString('id-ID')}+
              pengunjung, didukung Dinas Bina Marga & Bina Konstruksi (DBMBK) Provinsi Sulawesi
              Selatan, BJKW VI Makassar dan 10+ asosiasi industri.
            </p>

            {/* Tags */}
            <div className={styles.tags}>
              <span className='tag tag--red'>Konstruksi</span>
              <span className='tag tag--blue'>Arsitektur</span>
              <span className='tag tag--green'>Properti</span>
              <span className='tag tag--yellow'>Interior</span>
              <span className='tag tag--red'>Smart Building</span>
              <span className='tag tag--blue'>Green Construction</span>
              <span className='tag tag--green'>Infrastruktur</span>
            </div>

            <a
              href='#why-attend'
              className='btn btn--outline-dark'
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#why-attend')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Selengkapnya
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                <path d='M5 12h14M12 5l7 7-7 7' />
              </svg>
            </a>
          </div>

          {/* Right: Image + Highlights */}
          <div className={`${styles.imageCol} reveal`}>
            <div className={styles.imageWrap}>
              <img
                src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
                alt='Konstruksi Expo'
                className={styles.image}
              />
              {/* Floating card */}
              <div className={styles.floatCard}>
                <span className={styles.floatCard__dot} />
                <div>
                  <strong>Event Terdekat</strong>
                  <span>{eventInfo.date}</span>
                </div>
              </div>
              {/* Decorative squares */}
              <div className={styles.deco1} aria-hidden='true' />
              <div className={styles.deco2} aria-hidden='true' />
            </div>
          </div>
        </div>

        {/* Highlights Strip */}
        <div className={`${styles.highlights} reveal`}>
          {highlights.map((h, i) => (
            <div key={i} className={`${styles.highlight} ${styles[`highlight--${h.color}`]}`}>
              <span className={styles.highlight__icon}>{h.icon}</span>
              <span className={styles.highlight__value}>
                <Counter end={h.number} suffix={h.suffix} />
              </span>
              <span className={styles.highlight__label}>{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
