import styles from './About.module.scss';

const highlights = [
  { icon: '🏗️', value: '500+', label: 'Exhibitor Terpilih', color: 'red' },
  { icon: '👥', value: '40K+', label: 'Target Pengunjung', color: 'blue' },
  { icon: '📐', value: '18.000 m²', label: 'Area Pameran', color: 'green' },
  { icon: '📅', value: '4 Hari', label: 'Durasi Event', color: 'yellow' },
];

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <div className={styles.grid}>
          {/* Left: Text Content */}
          <div className={`${styles.textCol} reveal-left`}>
            <span className="section__label">Tentang Event</span>
            <h2 className="section__title">
              Panggung Terbesar<br />
              <span className={styles.accent}>Industri Konstruksi</span><br />
              Indonesia
            </h2>
            <p className={styles.body}>
              Konstruksi Expo 2025 adalah pameran dagang dan profesional bertaraf internasional 
              yang menghadirkan ekosistem lengkap industri konstruksi, arsitektur, dan properti 
              Indonesia dalam satu platform yang terorganisir dengan standar dunia.
            </p>
            <p className={styles.body}>
              Selama 4 hari penuh, JIExpo Kemayoran akan bertransformasi menjadi pusat inovasi 
              dan transaksi bisnis, mempertemukan developer perumahan, kontraktor, arsitek, 
              supplier material, hingga masyarakat umum yang ingin membangun impian mereka.
            </p>

            {/* Tags */}
            <div className={styles.tags}>
              <span className="tag tag--red">Konstruksi</span>
              <span className="tag tag--blue">Arsitektur</span>
              <span className="tag tag--green">Properti</span>
              <span className="tag tag--yellow">Interior</span>
              <span className="tag tag--red">Smart Building</span>
              <span className="tag tag--blue">Green Construction</span>
            </div>

            <a
              href="#why-attend"
              className="btn btn--outline-dark"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#why-attend')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Selengkapnya
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right: Image + Highlights */}
          <div className={`${styles.imageCol} reveal-right`}>
            <div className={styles.imageWrap}>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Konstruksi Expo"
                className={styles.image}
              />
              {/* Floating card */}
              <div className={styles.floatCard}>
                <span className={styles.floatCard__dot} />
                <div>
                  <strong>Event Berlangsung</strong>
                  <span>14–17 November 2025</span>
                </div>
              </div>
              {/* Decorative squares */}
              <div className={styles.deco1} aria-hidden="true" />
              <div className={styles.deco2} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Highlights Strip */}
        <div className={`${styles.highlights} reveal`}>
          {highlights.map((h, i) => (
            <div key={i} className={`${styles.highlight} ${styles[`highlight--${h.color}`]}`}>
              <span className={styles.highlight__icon}>{h.icon}</span>
              <span className={styles.highlight__value}>{h.value}</span>
              <span className={styles.highlight__label}>{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
