import { sponsors } from '../../data';
import styles from './Sponsors.module.scss';

// Generate a colored placeholder logo for each sponsor
function SponsorLogo({ sponsor }) {
  const colors = {
    platinum: '#1A5FD6',
    gold: '#F5A623',
    silver: '#7A8899',
    bronze: '#2D9C6E',
  };

  const abbrev = sponsor.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const color = colors[sponsor.tier];

  return (
    <div
      className={styles.logo}
      style={{ '--logo-color': color }}
      title={sponsor.name}
    >
      <span className={styles.logo__abbrev}>{abbrev}</span>
      <span className={styles.logo__name}>{sponsor.name}</span>
    </div>
  );
}

export default function Sponsors() {
  // Duplicate sponsors for infinite loop
  const loop = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className={`section section--light ${styles.section}`} id="sponsors">
      <div className="container">
        <div className="section__header reveal">
          <span className="section__label">Sponsor & Mitra</span>
          <h2 className="section__title">
            Didukung Pemain <span className={styles.accent}>Terbaik</span> Industri
          </h2>
          <p className="section__subtitle">
            Bergabung bersama merek-merek terkemuka yang telah mempercayakan promosi mereka di Konstruksi Expo.
          </p>
        </div>

        {/* Tier labels */}
        <div className={`${styles.tiers} reveal`}>
          {[
            { label: 'Platinum Sponsor', color: '#1A5FD6', count: 2 },
            { label: 'Gold Sponsor', color: '#F5A623', count: 3 },
            { label: 'Silver Sponsor', color: '#7A8899', count: 3 },
            { label: 'Bronze Sponsor', color: '#2D9C6E', count: 2 },
          ].map((t) => (
            <div key={t.label} className={styles.tier}>
              <span className={styles.tier__dot} style={{ background: t.color }} />
              <span className={styles.tier__label}>{t.label}</span>
              <span className={styles.tier__count}>{t.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel - full width */}
      <div className={`${styles.carouselWrap} reveal`}>
        <div className={styles.carousel}>
          <div className={styles.track}>
            {loop.map((s, i) => (
              <div key={`${s.id}-${i}`} className={styles.slide}>
                <SponsorLogo sponsor={s} />
              </div>
            ))}
          </div>
        </div>
        {/* Fade masks */}
        <div className={`${styles.mask} ${styles.mask__left}`} />
        <div className={`${styles.mask} ${styles.mask__right}`} />
      </div>

      <div className="container">
        <div className={`${styles.cta} reveal`}>
          <p>Tertarik menjadi sponsor Konstruksi Expo 2025?</p>
          <a
            href="#booking"
            className="btn btn--primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
