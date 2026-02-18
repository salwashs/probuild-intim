import { useState, useEffect } from 'react';
import { exhibitorPackages, sponsorshipPackages } from '../data';
import styles from './BoothPage.module.scss';

export default function BoothPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    // Scroll to top first
    window.scrollTo(0, 0);

    // Then check if there's a hash in the URL and scroll to it
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
    document.body.style.overflow = 'auto';
  };

  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__overlay} />
        <div className={styles.hero__content}>
          <div className='container'>
            <h1 className={styles.hero__title}>Venue & Booth</h1>
            <p className={styles.hero__subtitle}>
              Pilih lokasi booth strategis Anda untuk eksposur maksimal selama ProBuild INTIM 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Venue Layout Section */}
      <section id='venue-layout' className={`section ${styles.venueSection}`}>
        <div className='container'>
          <div className={styles.venueSection}>
            <span className='section__label'>
              <span style={{ background: '#4CAF50' }} />
              VENUE LAYOUT
            </span>
            <h2 className='section__title'>
              Venue Layout <span className={styles.textRed}>Pro</span>
              <span className={styles.textGreen}>Build</span>{' '}
              <span className={styles.textBlue}>INT</span>
              <span className={styles.textOrange}>IM</span>{' '}
              <span className={styles.textRed}>2</span>
              <span className={styles.textGreen}>0</span>
              <span className={styles.textBlue}>2</span>
              <span className={styles.textOrange}>6</span>
            </h2>
            <p className='section__subtitle'>Denah lokasi pameran ProBuild INTIM 2026</p>
          </div>
          <div className={styles.layoutImage} onClick={() => openModal('/images/layout-venue.png')}>
            <img src='/images/layout-venue.png' alt='Venue Layout ProBuild INTIM 2026' />
            <div className={styles.layoutImage__overlay}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='11' cy='11' r='8' />
                <path d='m21 21-4.35-4.35' />
                <line x1='11' y1='8' x2='11' y2='14' />
                <line x1='8' y1='11' x2='14' y2='11' />
              </svg>
              <span>Klik untuk memperbesar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitor Packages Section */}
      <section className={`section section--light ${styles.packagesSection}`}>
        <div className='container'>
          <div className={styles.packagesHeader}>
            <span className='section__label'>
              <span style={{ background: '#4CAF50' }} />
              EXHIBITION PACKAGE
            </span>
            <h2 className='section__title'>Pilih Paket Exhibitor</h2>
            <p className='section__subtitle'>
              Sesuaikan dengan target pemasaran dan kebutuhan branding Anda.
            </p>
          </div>

          <div className={styles.packagesGrid}>
            {exhibitorPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`${styles.packageCard} ${pkg.popular ? styles['packageCard--popular'] : ''} ${styles[`packageCard--${pkg.color}`]} reveal delay-${index + 1}`}
              >
                {pkg.popular && <div className={styles.packageCard__badge}>PALING POPULER</div>}

                <div className={styles.packageCard__header}>
                  <div className={styles.packageCard__icon}>{pkg.icon}</div>
                  <h3 className={styles.packageCard__name}>{pkg.name}</h3>
                  <p className={styles.packageCard__tagline}>{pkg.tagline}</p>
                </div>

                <div className={styles.packageCard__price}>
                  <span className={styles.packageCard__priceAmount}>{pkg.price}</span>
                  <span className={styles.packageCard__priceUnit}>{pkg.priceUnit}</span>
                </div>

                <div className={styles.packageCard__size}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                  </svg>
                  Ukuran Booth {pkg.size}
                </div>

                <ul className={styles.packageCard__features}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <polyline points='20 6 9 17 4 12' />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={styles.packageCard__note}>
                  <strong>{pkg.note}</strong>
                  <p>{pkg.noteDetail}</p>
                </div>

                {/* <button className={styles.packageCard__button}>Pilih Paket</button> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section id='sponsorship' className={`section ${styles.sponsorshipSection}`}>
        <div className='container'>
          <div className={styles.sponsorshipHeader}>
            <span className='section__label'>
              <span style={{ background: '#4CAF50' }} />
              SPONSORSHIP PACKAGE
            </span>
            <h2 className={styles.sponsorshipTitle}>Paket Sponsorship</h2>
            <p className={styles.sponsorshipSubtitle}>
              Perkuat kehadiran brand Anda di industri konstruksi nasional.
            </p>
          </div>

          {/* Table Header */}
          <div className={styles.sponsorshipTable}>
            <div className={styles.sponsorshipTable__header}>
              <div className={styles.sponsorshipTable__headerCell}>TINGKAT LEVEL</div>
              <div className={styles.sponsorshipTable__headerCell}>KONTRIBUSI (RP)</div>
              <div className={styles.sponsorshipTable__headerCell}>
                HAK ISTIMEWA (KEY PRIVILEGES)
              </div>
              <div className={styles.sponsorshipTable__headerCell}>MEDIA VALUE</div>
            </div>

            {/* Table Body */}
            <div className={styles.sponsorshipTable__body}>
              {sponsorshipPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`${styles.sponsorshipTable__row} ${styles[`sponsorshipTable__row--${pkg.color}`]}`}
                >
                  <div className={styles.sponsorshipTable__cell}>
                    <div className={styles.sponsorshipLevel}>
                      <span className={styles.sponsorshipLevel__icon}>{pkg.icon}</span>
                      <span className={styles.sponsorshipLevel__name}>{pkg.name}</span>
                    </div>
                  </div>
                  <div className={styles.sponsorshipTable__cell}>
                    <div className={styles.sponsorshipContribution}>{pkg.contribution}</div>
                  </div>
                  <div className={styles.sponsorshipTable__cell}>
                    <div className={styles.sponsorshipPrivileges}>{pkg.privileges}</div>
                  </div>
                  <div className={styles.sponsorshipTable__cell}>
                    <div className={styles.sponsorshipMedia}>
                      <span className={styles.sponsorshipMedia__value}>{pkg.mediaValue}</span>
                      <span className={styles.sponsorshipMedia__unit}>{pkg.mediaUnit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Documents Section */}
      <section
        id='download-documents'
        className={`section section--light ${styles.downloadSection}`}
      >
        <div className='container'>
          <div className={styles.downloadHeader}>
            <span className='section__label'>
              <span style={{ background: '#4CAF50' }} />
              DOKUMEN PENTING
            </span>
            <h2 className='section__title'>Download Dokumen</h2>
            <p className='section__subtitle'>Unduh dokumen penting terkait ProBuild INTIM 2026.</p>
          </div>

          <div className={styles.downloadGrid}>
            {/* Document 1 */}
            <div className={styles.downloadCard}>
              <div className={styles.downloadCard__icon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48'
                  height='48'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                  <polyline points='14 2 14 8 20 8' />
                  <line x1='16' y1='13' x2='8' y2='13' />
                  <line x1='16' y1='17' x2='8' y2='17' />
                  <polyline points='10 9 9 9 8 9' />
                </svg>
              </div>
              <h3 className={styles.downloadCard__title}>Peraturan Exhibition</h3>
              <p className={styles.downloadCard__description}>
                Peraturan dan ketentuan yang harus dipatuhi oleh seluruh exhibitor selama event
                berlangsung.
              </p>
              <a
                href='/files/Peraturan exhibition ProBuild INTIM 2026.pdf'
                download
                className={styles.downloadCard__button}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                  <polyline points='7 10 12 15 17 10' />
                  <line x1='12' y1='15' x2='12' y2='3' />
                </svg>
                Download PDF
              </a>
            </div>

            {/* Document 2 */}
            <div className={styles.downloadCard}>
              <div className={styles.downloadCard__icon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48'
                  height='48'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
                  <line x1='16' y1='2' x2='16' y2='6' />
                  <line x1='8' y1='2' x2='8' y2='6' />
                  <line x1='3' y1='10' x2='21' y2='10' />
                </svg>
              </div>
              <h3 className={styles.downloadCard__title}>Jadwal Setup Booth</h3>
              <p className={styles.downloadCard__description}>
                Jadwal lengkap setup booth dan move-in exhibitor untuk mempersiapkan area pameran
                Anda.
              </p>
              <a
                href='/files/Jadwal setup booth dan move-in exhibitor.pdf'
                download
                className={styles.downloadCard__button}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                  <polyline points='7 10 12 15 17 10' />
                  <line x1='12' y1='15' x2='12' y2='3' />
                </svg>
                Download PDF
              </a>
            </div>

            {/* Document 3 */}
            <div className={styles.downloadCard}>
              <div className={styles.downloadCard__icon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48'
                  height='48'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='12' cy='12' r='10' />
                  <polyline points='12 6 12 12 16 14' />
                </svg>
              </div>
              <h3 className={styles.downloadCard__title}>Jadwal Loading & Unloading</h3>
              <p className={styles.downloadCard__description}>
                Jadwal loading dan unloading booth untuk memastikan kelancaran proses bongkar muat
                barang.
              </p>
              <a
                href='/files/Jadwal loading dan unloading booth ProBuild INTIM 2026.pdf'
                download
                className={styles.downloadCard__button}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                  <polyline points='7 10 12 15 17 10' />
                  <line x1='12' y1='15' x2='12' y2='3' />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modal__overlay} />
          <div className={styles.modal__content}>
            <button className={styles.modal__close} onClick={closeModal} aria-label='Close modal'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>
            <img
              src={modalImage}
              alt='Venue Layout - Zoomed'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  );
}
