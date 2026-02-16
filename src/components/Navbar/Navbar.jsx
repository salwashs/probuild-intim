import { useState, useEffect } from 'react';
import { navLinks, eventInfo } from '../../data';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <span className={styles.logo__icon}>
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#E8303A" />
              <path d="M6 24L11 10L16 18L21 13L26 24H6Z" fill="white" />
              <circle cx="21" cy="10" r="3" fill="white" fillOpacity="0.6" />
            </svg>
          </span>
          <span className={styles.logo__text}>
            <strong>{eventInfo.name}</strong>
            <em>{eventInfo.edition}</em>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={styles.nav__link}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#booking"
          className={styles.cta}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#booking');
          }}
        >
          Booking Stand
        </a>

        {/* Mobile Toggle */}
        <button
          className={`${styles.toggle} ${mobileOpen ? styles.open : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobile} ${mobileOpen ? styles.mobile__open : ''}`}>
        <nav className={styles.mobile__nav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={styles.mobile__link}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className={styles.mobile__cta}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#booking');
            }}
          >
            Booking Stand
          </a>
        </nav>
      </div>
    </header>
  );
}
