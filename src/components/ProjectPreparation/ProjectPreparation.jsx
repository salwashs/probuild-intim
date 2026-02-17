import { galleryPreparation } from '../../data';
import styles from './ProjectPreparation.module.scss';

export default function ProjectShowcase() {
  // Triple the items for smooth infinite scroll
  const loop = [...galleryPreparation, ...galleryPreparation, ...galleryPreparation];

  return (
    <section className={`section ${styles.section}`}>
      <div className='container'>
        <div className='section__header reveal' style={{ marginBottom: '2rem' }}>
          <span className='section__label'>Project Preparation</span>
          <h2 className='section__title'>
            <span className={styles.accent}>Strategi</span> di Balik Panggung
          </h2>
          <p className='section__subtitle'>
            Sebuah event berskala industri tidak dibangun dalam semalam. Ia lahir dari diskusi
            strategis bersama mitra, koordinasi lintas sektor, dan perencanaan detail yang matang.
            <br />
            <strong>Karena kualitas sebuah expo ditentukan jauh sebelum pintu dibuka.</strong>
          </p>
        </div>

        <div className={styles.carouselWrap}>
          <div className={styles.track}>
            {loop.map((item, i) => (
              <div key={`${item.id}-${i}`} className={styles.slide}>
                <div className={styles.card}>
                  <img src={item.thumb} alt={item.alt} loading='lazy' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
