import { useState, useEffect } from 'react';
import { sponsors } from '../../data';
import styles from './Sponsors.module.scss';

// Helper to generate placeholder or show image
// Helper to generate placeholder or show image
function SponsorLogo({ sponsor, className, variant = 'supporting' }) {
  // Simple hashing for placeholder color if needed, or random
  const colors = ['#1A5FD6', '#F5A623', '#7A8899', '#2D9C6E'];
  const color = colors[sponsor.id % colors.length];

  const abbrev = sponsor.name
    ? sponsor.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'SP';

  const logoContent = sponsor.logo ? (
    <img src={sponsor.logo} alt={sponsor.name} />
  ) : (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: color,
          marginBottom: '0.25rem',
        }}
      >
        {abbrev}
      </div>
      {/* If simple placeholder, we might show name inside if not showing outside */}
      {variant === 'supporting' && (
        <div style={{ fontSize: '0.7rem', color: '#666' }}>{sponsor.name}</div>
      )}
    </div>
  );

  return (
    <div className={`${className} ${styles.logoContainer}`} title={sponsor.name}>
      <div className={styles.logoImageWrapper} style={!sponsor.logo ? { borderColor: color } : {}}>
        {logoContent}
      </div>

      {variant === 'main' && <div className={styles.mainName}>{sponsor.name}</div>}

      {variant === 'secondary' && (
        <div className={styles.secondaryInfo}>
          <div className={styles.secondaryName}>{sponsor.name}</div>
          {sponsor.fullName && <div className={styles.secondaryFullName}>{sponsor.fullName}</div>}
        </div>
      )}
    </div>
  );
}

export default function Sponsors() {
  const { main, secondary, supporting } = sponsors;

  // --- Main Sponsor Logic ---
  const [activeMainIndex, setActiveMainIndex] = useState(0);

  useEffect(() => {
    if (main.length <= 1) return;

    const interval = setInterval(() => {
      setActiveMainIndex((prev) => (prev + 1) % main.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [main.length]);

  const currentMain = main[activeMainIndex];

  // --- Secondary Sponsor Logic ---
  // Duplicate for seamless marquee
  // If list is short, duplicate more times to fill width
  const secondaryLoop =
    secondary.length > 0 ? [...secondary, ...secondary, ...secondary, ...secondary] : [];

  return (
    <section className={styles.section} id='sponsors'>
      <div className='container'>
        {/* Header */}
        <div className='section__header reveal' style={{ marginBottom: '2rem' }}>
          <span className='section__label'>Mitra dan Sponsor</span>
          <h2 className='section__title'>
            <span className='text-primary'>
              Didukung Oleh yang <span className={styles.accent}>Terbaik</span>
            </span>
          </h2>
          <p className='section__subtitle'>
            Mitra strategis yang mendukung kesuksesan ProBuild INTIM 2026.
          </p>
        </div>

        {/* 1. Main Sponsor (Carousel/Single) */}
        {main.length > 0 && (
          <div className='reveal'>
            <div className={styles.subHeader}>
              <h3>Pendukung Utama Nasional</h3>
            </div>
            <div className={styles.mainWrapper}>
              <SponsorLogo
                key={currentMain.id}
                sponsor={currentMain}
                className={styles.mainCard}
                variant='main'
              />
            </div>
          </div>
        )}

        {/* 2. Secondary Sponsor (Marquee) */}
        {secondary.length > 0 && (
          <div className='reveal'>
            <div className={styles.subHeader}>
              <h3>Asosiasi & Mitra Pendukung</h3>
            </div>

            <div className={styles.secondaryWrapper}>
              <div className={styles.secondaryTrack}>
                {secondaryLoop.map((s, i) => (
                  <SponsorLogo
                    key={`${s.id}-${i}`}
                    sponsor={s}
                    className={styles.secondaryCard}
                    variant='secondary'
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Supporting Sponsor (Grid) */}
        {/* {supporting.length > 0 && (
          <div className='reveal'>
            <div className={styles.subHeader}>
              <h3>Sponsor Lainnya & Media Partners</h3>
            </div>

            <div className={styles.supportingWrapper}>
              {supporting.map((s, i) => (
                <SponsorLogo
                  key={s.id}
                  sponsor={s}
                  className={styles.supportingCard}
                  variant='supporting'
                />
              ))}
            </div>
          </div>
        )} */}

        {/* CTA */}
        <div className={`reveal ${styles.cta}`}>
          <p>Ingin brand Anda tampil di sini?</p>
          <a
            href='https://wa.me/6285705852676?text=Halo%20Saya%20tertarik%20jadi%20sponsor%20ProBuild%20INTIM%202026'
            target='_blank'
            className='btn btn--primary'
          >
            Jadi Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
