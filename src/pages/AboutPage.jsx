import { useEffect } from 'react';
import { eventInfo } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import styles from './AboutPage.module.scss';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { lang } = useLanguage();
  const t = translations.aboutPage[lang];

  const stats = [
    { value: '100+', label: t.statsLabels[0] },
    { value: '15.000+', label: t.statsLabels[1] },
    { value: '20+', label: t.statsLabels[2] },
  ];

  const visionText1 = t.visionText1
    .replace('{exhibitor}', eventInfo.exhibitor)
    .replace('{targetVisitor}', eventInfo.targetVisitor?.toLocaleString('id-ID'))
    .replace('{speakers}', eventInfo.speakers);

  const visionText2 = t.visionText2.replace(
    '{targetVisitor}',
    eventInfo.targetVisitor?.toLocaleString('id-ID')
  );

  const badgeColors = ['orange', 'blue', 'green', 'purple'];
  const featureColors = ['red', 'green', 'orange', 'blue'];

  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__overlay} />
        <div className={styles.hero__content}>
          <div className='container'>
            <h1 className={styles.hero__title}>
              <span className={styles.hero__titleRed}>Pro</span>
              <span className={styles.hero__titleGreen}>Build</span>{' '}
              <span className={styles.hero__titleBlue}>INT</span>
              <span className={styles.hero__titleOrange}>IM</span>{' '}
              <span className={styles.hero__titleRed}>2</span>
              <span className={styles.hero__titleGreen}>0</span>
              <span className={styles.hero__titleBlue}>2</span>
              <span className={styles.hero__titleOrange}>6</span>
              <br />
              <span className={styles.hero__title}>{t.heroTitle2}</span>
              <br />
              <span className={styles.hero__title}>{t.heroTitle3}</span>
            </h1>
            <p className={styles.hero__subtitle}>{t.heroSubtitle}</p>

            {/* Stats */}
            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.stats__item}>
                  <div className={styles.stats__value}>{stat.value}</div>
                  <div className={styles.stats__label}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className={`section ${styles.visionSection}`}>
        <div className='container'>
          <div className={styles.visionGrid}>
            {/* Left Content */}
            <div className={styles.visionContent}>
              <span className='section__label'>
                <span style={{ background: '#E8303A' }} />
                {t.visionLabel}
              </span>
              <h2 className='section__title'>
                {t.visionTitle[0]}
                <br />
                {t.visionTitle[1]}
              </h2>
              <p className={styles.visionText}>{visionText1}</p>
              <p className={styles.visionText}>{visionText2}</p>
              <div className={styles.visionDivider}>
                <span style={{ background: '#E8303A' }} />
                <span style={{ background: '#4CAF50' }} />
                <span style={{ background: '#FF9800' }} />
              </div>
            </div>

            {/* Right Cards */}
            <div className={styles.visionCards}>
              {t.visionMission.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.visionCard} ${styles[`visionCard--${item.color || ['red', 'green', 'orange', 'blue'][index]}`]}`}
                >
                  <div className={styles.visionCard__icon}>{item.icon}</div>
                  <h3 className={styles.visionCard__title}>{item.title}</h3>
                  <p className={styles.visionCard__desc}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Features Section */}
      <section className={`section ${styles.featuresSection}`}>
        <div className='container'>
          <div className={styles.featuresHeader}>
            <h2 className='section__title'>{t.featuresTitle}</h2>
            <div className={styles.featuresUnderline} />
          </div>

          <div className={styles.featuresGrid}>
            {t.features.map((feature, index) => (
              <div key={index} className={`${styles.featureCard} reveal delay-${index + 1}`}>
                <div
                  className={`${styles.featureCard__icon} ${styles[`featureCard__icon--${featureColors[index]}`]}`}
                >
                  {feature.icon}
                </div>
                <h3 className={styles.featureCard__title}>{feature.title}</h3>
                <p className={styles.featureCard__desc}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Agenda Section */}
      <section className={`section ${styles.agendaSection}`}>
        <div className='container'>
          <div className={styles.agendaHeader}>
            <h2 className='section__title'>{t.agendaTitle}</h2>
            <div className={styles.agendaUnderline} />
          </div>

          <div className={styles.agendaTimeline}>
            {t.agenda.map((item, index) => (
              <div key={index} className={`${styles.agendaItem} reveal delay-${index}`}>
                <div className={styles.agendaTime}>
                  <div className={styles.agendaTime__dot} />
                  <span className={styles.agendaTime__label}>{item.day}</span>
                </div>
                <div className={styles.agendaCard}>
                  <div
                    className={`${styles.agendaCard__badge} ${styles[`agendaCard__badge--${badgeColors[index]}`]}`}
                  >
                    {item.badge}
                  </div>
                  <div className={styles.agendaCard__icon}>{item.icon}</div>
                  <h3 className={styles.agendaCard__title}>{item.title}</h3>
                  <p className={styles.agendaCard__desc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
