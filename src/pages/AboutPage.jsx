import { useEffect } from 'react';
import { eventInfo } from '../data';
import styles from './AboutPage.module.scss';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: '100+', label: 'Exhibitors' },
    { value: '15.000+', label: 'Visitors' },
    { value: '20+', label: 'Expert Speakers' },
  ];

  const visionMission = [
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Membangun sinergi antar pelaku industri.',
      color: 'red',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Menampilkan teknologi konstruksi terdepan.',
      color: 'green',
    },
    {
      icon: '📈',
      title: 'Investment',
      description: 'Membuka peluang investasi untuk proyek daerah.',
      color: 'orange',
    },
    {
      icon: '🌱',
      title: 'Green Infra',
      description: 'Fokus pada pembangunan ramah lingkungan.',
      color: 'blue',
    },
  ];

  const features = [
    {
      icon: '👥',
      title: 'Business Matching',
      description:
        'Sesi khusus B2B untuk mempertemukan kontraktor dengan supplier material pilihan.',
      color: 'red',
    },
    {
      icon: '🎤',
      title: 'Conference & Seminar',
      description: 'Berbagi pengetahuan bersama pakar konstruksi nasional dan internasional.',
      color: 'green',
    },
    {
      icon: '🏗️',
      title: 'Expo & Demo',
      description: 'Demonstrasi langsung alat berat dan teknologi konstruksi terbaru di lapangan.',
      color: 'orange',
    },
    {
      icon: '⚙️',
      title: 'Digital Integration',
      description: 'Implementasi BIM (Building Information Modeling) dan digitalisasi proyek.',
      color: 'blue',
    },
  ];

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
              <span className={styles.hero__title}>Bangun Masa Depan</span>
              <br />
              <span className={styles.hero__title}>Indonesia Timur</span>
            </h1>
            <p className={styles.hero__subtitle}>
              Pameran Konstruksi Terbesar di Indonesia Timur. Makassar sebagai gerbang utama inovasi
              dan kolaborasi infrastruktur masa depan.
            </p>

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
                Tentang Kami
              </span>
              <h2 className='section__title'>
                Gerbang Pembangunan
                <br />
                Berkelanjutan
              </h2>
              <p className={styles.visionText}>
                ProBuild 2026 adalah pameran konstruksi B2B terbesar di Indonesia Timur yang
                menghadirkan {eventInfo.exhibitor}+ exhibitor,{' '}
                {eventInfo.targetVisitor.toLocaleString('id-ID')}+ pengunjung profesional, dan{' '}
                {eventInfo.speakers}+ pembicara ahli dari seluruh Indonesia. Event ini berfokus pada
                inovasi infrastruktur, material bangunan, teknologi digital konstruksi (BIM & AI),
                serta proyek strategis nasional dan pengembangan kawasan timur.
              </p>
              <p className={styles.visionText}>
                Didukung oleh Dinas Bina Marga & Bina Konstruksi (DBMBK) Sulawesi Selatan dan BJKW
                VI Makassar, ProBuild INTIM 2026 menargetkan lebih dari{' '}
                {eventInfo.targetVisitor.toLocaleString('id-ID')} pengunjung profesional.
                Diselenggarakan di Makassar sebagai gateway Indonesia Timur, lokasi ini memiliki
                akses strategis melalui bandara internasional dan pelabuhan utama.
              </p>
              <div className={styles.visionDivider}>
                <span style={{ background: '#E8303A' }} />
                <span style={{ background: '#4CAF50' }} />
                <span style={{ background: '#FF9800' }} />
              </div>
            </div>

            {/* Right Cards */}
            <div className={styles.visionCards}>
              {visionMission.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.visionCard} ${styles[`visionCard--${item.color}`]}`}
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
            <h2 className='section__title'>Fitur Utama Event</h2>
            <div className={styles.featuresUnderline} />
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={`${styles.featureCard} reveal delay-${index + 1}`}>
                <div
                  className={`${styles.featureCard__icon} ${styles[`featureCard__icon--${feature.color}`]}`}
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
      <section className={`section ${styles.agendaSection} `}>
        <div className='container'>
          <div className={styles.agendaHeader}>
            <h2 className='section__title'>Agenda Acara</h2>
            <div className={styles.agendaUnderline} />
          </div>

          <div className={styles.agendaTimeline}>
            {/* Day 1 */}
            <div className={`${styles.agendaItem} reveal`}>
              <div className={styles.agendaTime}>
                <div className={styles.agendaTime__dot} />
                <span className={styles.agendaTime__label}>Hari ke 1</span>
              </div>
              <div className={styles.agendaCard}>
                <div
                  className={`${styles.agendaCard__badge} ${styles['agendaCard__badge--orange']}`}
                >
                  Seremonial
                </div>
                <div className={styles.agendaCard__icon}>🎉</div>
                <h3 className={styles.agendaCard__title}>
                  Pembukaan Menteri PU, Expo + Demo Alat Berat
                </h3>
                <p className={styles.agendaCard__desc}>
                  Upacara pembukaan resmi oleh Menteri PU dan Gubernur Provinsi, dilanjutkan dengan
                  demo alat berat dan teknologi konstruksi terkini
                </p>
              </div>
            </div>

            {/* Day 2 */}
            <div className={`${styles.agendaItem} reveal delay-1`}>
              <div className={styles.agendaTime}>
                <div className={styles.agendaTime__dot} />
                <span className={styles.agendaTime__label}>Hari ke 2</span>
              </div>
              <div className={styles.agendaCard}>
                <div className={`${styles.agendaCard__badge} ${styles['agendaCard__badge--blue']}`}>
                  Seminar
                </div>
                <div className={styles.agendaCard__icon}>🎤</div>
                <h3 className={styles.agendaCard__title}>
                  Konferensi "Inovasi Konstruksi Hijau" (10 Pembicara), Business Matching
                </h3>
                <p className={styles.agendaCard__desc}>
                  Keynote: Konstruksi Indonesia Timur 2030 - Visi pembangunan infrastruktur kawasan
                  Indonesia Timur, dilanjutkan dengan sesi business matching B2B
                </p>
              </div>
            </div>

            {/* Day 3 */}
            <div className={`${styles.agendaItem} reveal delay-2`}>
              <div className={styles.agendaTime}>
                <div className={styles.agendaTime__dot} />
                <span className={styles.agendaTime__label}>Hari ke 3</span>
              </div>
              <div className={styles.agendaCard}>
                <div
                  className={`${styles.agendaCard__badge} ${styles['agendaCard__badge--green']}`}
                >
                  Pameran
                </div>
                <div className={styles.agendaCard__icon}>🏗️</div>
                <h3 className={styles.agendaCard__title}>
                  Kompetisi & Fasilitas SKK Gratis oleh BJKW VI
                </h3>
                <p className={styles.agendaCard__desc}>
                  Pameran terbuka — Hall A & B dengan 200+ booth exhibitor dari seluruh Indonesia,
                  kompetisi inovasi konstruksi, dan fasilitas sertifikasi gratis
                </p>
              </div>
            </div>

            {/* Day 4 */}
            <div className={`${styles.agendaItem} reveal delay-3`}>
              <div className={styles.agendaTime}>
                <div className={styles.agendaTime__dot} />
                <span className={styles.agendaTime__label}>Hari ke 4</span>
              </div>
              <div className={styles.agendaCard}>
                <div
                  className={`${styles.agendaCard__badge} ${styles['agendaCard__badge--purple']}`}
                >
                  Workshop
                </div>
                <div className={styles.agendaCard__icon}>💻</div>
                <h3 className={styles.agendaCard__title}>
                  Deal Signing, Award "Best Innovator Konstruksi Timur"
                </h3>
                <p className={styles.agendaCard__desc}>
                  Workshop: BIM untuk Proyek Skala Menengah - Praktis dan langsung diterapkan di
                  lapangan, penandatanganan MoU, dan penganugerahan award
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
