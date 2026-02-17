import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.scss';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';

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
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tentang-kami' element={<AboutPage />} />
        <Route path='/artikel' element={<ArticlesPage />} />
        <Route path='/artikel/:slug' element={<ArticleDetailPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
