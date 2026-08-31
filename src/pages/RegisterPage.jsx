import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventInfo } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import VisitorRegistrationForm from '../components/VisitorRegistration/VisitorRegistrationForm';
import styles from './RegisterPage.module.scss';

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const t = translations.visitorRegistration[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [submitted]);

  if (submitted) {
    return (
      <main className={styles.page}>
        <section className={styles.success}>
          <div className='container'>
            <div className={styles.success__card}>
              <div className={styles.success__icon}>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                  <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                  <path d='M22 4 12 14.01l-3-3' />
                </svg>
              </div>
              <h1 className={styles.success__title}>{t.successTitle}</h1>
              <p className={styles.success__body}>{t.successBody}</p>
              <Link to='/' className='btn btn--primary'>
                {t.successBtn}
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.hero__overlay} />
        <div className={styles.hero__content}>
          <div className='container'>
            <h1 className={styles.hero__title}>{t.heroTitle}</h1>
            <p className={styles.hero__subtitle}>{t.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.eventInfo}`}>
        <div className='container'>
          <div className={styles.eventCard}>
            <h2 className={styles.eventCard__title}>{t.section1Title}</h2>
            <div className={styles.eventCard__grid}>
              <div className={styles.eventCard__item}>
                <strong>{t.themeLabel}</strong>
                <span>{eventInfo.theme}</span>
              </div>
              <div className={styles.eventCard__item}>
                <strong>{t.dateLabel}</strong>
                <span>{eventInfo.date}</span>
              </div>
              <div className={styles.eventCard__item}>
                <strong>{t.timeLabel}</strong>
                <span>{eventInfo.eventTime}</span>
              </div>
              <div className={styles.eventCard__item}>
                <strong>{t.venueLabel}</strong>
                <span>
                  {eventInfo.venue}, {eventInfo.location}
                </span>
              </div>
              <div className={styles.eventCard__item}>
                <strong>{t.organizerLabel}</strong>
                <span>{eventInfo.organizer}</span>
              </div>
              <div className={styles.eventCard__item}>
                <strong>{t.contactLabel}</strong>
                <a
                  href={`https://wa.me/${eventInfo.committeePhone.replace(/\D/g, '')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {eventInfo.committeePhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.formSection}`}>
        <div className='container'>
          <div className={styles.formLayout}>
            <aside className={styles.sidebar}>
              <h3 className={styles.sidebar__title}>{t.section5Title}</h3>
              <ul className={styles.sidebar__list}>
                {t.importantInfo.map((item, i) => (
                  <li key={i} className={styles.sidebar__item}>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>

            <div className={styles.formCard}>
              <VisitorRegistrationForm onSuccess={() => setSubmitted(true)} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
