import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data';
import styles from './ArticlesPage.module.scss';

export default function ArticlesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.page}>
      <div className='container'>
        <div className={styles.header}>
          <h1 className={styles.title}>Artikel & Berita</h1>
          <p className={styles.subtitle}>
            Temukan insight terbaru seputar industri konstruksi dan arsitektur
          </p>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <Link key={article.id} to={`/artikel/${article.slug}`} className={styles.card}>
              <div className={styles.card__image}>
                <img src={article.image} alt={article.title} />
                <span
                  className={`${styles.card__category} ${styles[`card__category--${article.categoryColor}`]}`}
                >
                  {article.category}
                </span>
              </div>
              <div className={styles.card__content}>
                <h3 className={styles.card__title}>{article.title}</h3>
                <p className={styles.card__excerpt}>{article.excerpt}</p>
                <div className={styles.card__meta}>
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
