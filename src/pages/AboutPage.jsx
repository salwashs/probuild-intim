import { useEffect } from 'react';
import About from '../components/About/About';
import WhyAttend from '../components/WhyAttend/WhyAttend';
import Sponsors from '../components/Sponsors/Sponsors';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '80px' }}>
      <About />
      <WhyAttend />
      <Sponsors />
    </main>
  );
}
