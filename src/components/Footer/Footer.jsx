import { eventInfo, navLinks } from '../../data';
import styles from './Footer.module.scss';

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
        <rect x='2' y='2' width='20' height='20' rx='5' />
        <circle cx='12' cy='12' r='4.5' />
        <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
        <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
        <path d='M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z' />
        <polygon
          points='9.75 15.02 15.5 12 9.75 8.98 9.75 15.02'
          fill='currentColor'
          stroke='none'
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
        <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
        <rect x='2' y='9' width='4' height='12' />
        <circle cx='4' cy='4' r='2' />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: 'Tentang Event', href: '/tentant-kami' },
  { label: 'Keunggulan', href: '#why-attend' },
  { label: 'Sponsor', href: '#sponsors' },
  { label: 'Artikel', href: '/artikel' },
];

const exhibitorLinks = [
  { label: 'Booking Stand', href: '#booking' },
  { label: 'Paket Sponsorship', href: '#sponsors' },
  { label: 'Layout Denah', href: '#' },
  { label: 'Peraturan Exhibitor', href: '#' },
];

export default function Footer() {
  const handleNav = (e, href) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className='container'>
          <div className={styles.grid}>
            {/* Brand column */}
            <div className={styles.brand}>
              <a
                href='#'
                className={styles.logo}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className={styles.logo__icon}>
                  <img src='/images/logo-probuild.png' alt='Logo' />
                </span>
                <span className={styles.logo__text}>
                  <strong>
                    <span className={styles.textRed}>Pre</span>
                    <span className={styles.textGreen}>Build</span>
                    <span className={styles.textBlue}>INT</span>
                    <span className={styles.textOrange}>IM</span>
                  </strong>
                  <em>
                    <span className={styles.textRed}>2</span>
                    <span className={styles.textGreen}>0</span>
                    <span className={styles.textBlue}>2</span>
                    <span className={styles.textOrange}>6</span>
                  </em>
                </span>
              </a>

              <p className={styles.brand__desc}>
                Pameran konstruksi dan arsitektur terbesar Indonesia Timur. Platform bertemu,
                berinovasi, dan bertransaksi bagi seluruh ekosistem industri bangunan.
              </p>

              <div className={styles.socials}>
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className={styles.social}
                    aria-label={s.name}
                    onClick={(e) => e.preventDefault()}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <div className={styles.badge}>
                <span className={styles.badge__dot} />
                <span>Event Terdekat: {eventInfo.date}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.col}>
              <h4 className={styles.col__title}>Navigasi</h4>
              <ul className={styles.links}>
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
                      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                        <path d='M5 12h14M12 5l7 7-7 7' />
                      </svg>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exhibitor */}
            <div className={styles.col}>
              <h4 className={styles.col__title}>Exhibitor</h4>
              <ul className={styles.links}>
                {exhibitorLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
                      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                        <path d='M5 12h14M12 5l7 7-7 7' />
                      </svg>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.col}>
              <h4 className={styles.col__title}>Kontak</h4>
              <ul className={styles.contacts}>
                <li>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
                    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
                    <circle cx='12' cy='10' r='3' />
                  </svg>
                  <span>
                    {eventInfo.venue}, {eventInfo.venueAddress}
                  </span>
                </li>
                <li>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
                    <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                  </svg>
                  <a href='https://wa.me/6285705852676'>085705852676</a>
                </li>
                <li>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
                    <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                    <polyline points='22,6 12,13 2,6' />
                  </svg>
                  <a href='mailto:info@probuildintim.com'>info@probuildintim.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className='container'>
          <div className={styles.bottom__inner}>
            <p>© 2026 ProBuild INTIM. Seluruh hak cipta dilindungi.</p>
            {/* <div className={styles.bottom__links}>
              <a href='#' onClick={(e) => e.preventDefault()}>
                Kebijakan Privasi
              </a>
              <span>·</span>
              <a href='#' onClick={(e) => e.preventDefault()}>
                Syarat & Ketentuan
              </a>
              <span>·</span>
              <a href='#' onClick={(e) => e.preventDefault()}>
                Peta Situs
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
