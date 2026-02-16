import { useEffect } from 'react';
import './styles/global.scss';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import WhyAttend from './components/WhyAttend/WhyAttend';
import Parallax from './components/Parallax/Parallax';
import Gallery from './components/Gallery/Gallery';
import Sponsors from './components/Sponsors/Sponsors';
import Testimonials from './components/Testimonials/Testimonials';
import News from './components/News/News';
import BookingForm from './components/BookingForm/BookingForm';
import Footer from './components/Footer/Footer';

export default function App() {
  useEffect(() => {
    // Global scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyAttend />
        <Parallax />
        <Gallery />
        <Sponsors />
        <Testimonials />
        <News />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
