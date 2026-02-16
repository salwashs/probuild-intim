import { useState } from 'react';
import { articles } from '../../data';
import styles from './News.module.scss';
import ArticleDetail from './ArticleDetail';

const colorMap = { red: 'red', blue: 'blue', green: 'green' };

export default function News() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <ArticleDetail article={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <section className={`section ${styles.section}`} id="news">
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <div>
            <span className="section__label">Artikel & Berita</span>
            <h2 className="section__title">
              Update Terkini<br />
              <span className={styles.accent}>Industri Konstruksi</span>
            </h2>
          </div>
          <a href="#news" className={`btn btn--outline-dark ${styles.viewAll}`} onClick={(e) => e.preventDefault()}>
            Semua Artikel
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className={`${styles.grid}`}>
          {articles.map((article, i) => (
            <article
              key={article.id}
              className={`${styles.card} ${i === 0 ? styles.card__featured : ''} reveal delay-${i + 1}`}
            >
              <div className={styles.card__imgWrap}>
                <img
                  src={article.image}
                  alt={article.title}
                  className={styles.card__img}
                  loading="lazy"
                />
                <div className={styles.card__imgOverlay} />
              </div>

              <div className={styles.card__body}>
                <div className={styles.card__meta}>
                  <span className={`tag tag--${colorMap[article.categoryColor]}`}>
                    {article.category}
                  </span>
                  <span className={styles.card__date}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    {article.date}
                  </span>
                  <span className={styles.card__read}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {article.readTime}
                  </span>
                </div>

                <h3 className={styles.card__title}>{article.title}</h3>
                <p className={styles.card__excerpt}>{article.excerpt}</p>

                <div className={styles.card__footer}>
                  <div className={styles.card__author}>
                    <div className={styles.card__authorAvatar}>
                      {article.author.charAt(0)}
                    </div>
                    <span>{article.author}</span>
                  </div>
                  <button
                    className={`btn btn--outline-dark ${styles.card__btn}`}
                    onClick={() => setSelected(article)}
                  >
                    Baca
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
