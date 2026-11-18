import { useTranslation } from 'react-i18next';
import newsData from '../data/news.json';
import ListenButton from './ListenButton';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  url: string;
  date: string;
}

export default function NewsSection() {
  const { t } = useTranslation();
  const articles: NewsItem[] = newsData;

  const headerText = `${t('news.title', 'Cyber Fraud News')}. ${t('news.subtitle', 'Latest news articles and safety advisories')}`;

  return (
    <section
      aria-label={t('news.title', 'Cyber Fraud News')}
      style={{
        background: 'var(--color-surface)',
        border: 'var(--border)',
        borderRadius: 'var(--radius-lg, 16px)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2
            style={{
              fontSize: 'var(--text-xl, 24px)',
              margin: 0,
              color: 'var(--color-primary)',
              fontWeight: 700,
            }}
          >
            {t('news.title', 'Cyber Fraud News')}
          </h2>
          <p
            style={{
              fontSize: 'var(--text-sm, 15px)',
              color: 'var(--color-text-muted)',
              margin: '4px 0 0 0',
            }}
          >
            {t('news.subtitle', 'Latest news articles and safety advisories')}
          </p>
        </div>
        <ListenButton text={headerText} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {articles.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '14px 16px',
              minHeight: '56px',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              color: 'var(--color-text)',
              transition: 'background var(--transition)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-secondary)',
                  letterSpacing: '0.5px',
                }}
              >
                {item.source} &middot; {item.date}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                }}
              >
                {t('news.readArticle', 'Read article')} &rarr;
              </span>
            </div>
            <span
              style={{
                fontSize: 'var(--text-body)',
                fontWeight: 600,
                color: 'var(--color-primary)',
                lineHeight: 1.4,
              }}
            >
              {item.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
