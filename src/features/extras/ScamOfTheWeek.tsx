import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import scamsData from '../../data/scamOfTheWeek.json';

export default function ScamOfTheWeek() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language || 'en') as 'en' | 'hi' | 'mr';

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '56px',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            padding: '8px 0',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t('back')}
        </button>
      </div>

      <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
        Scam of the Week
      </h1>
      <p style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
        Real fraud patterns reported across India with official advisory sources.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {scamsData.scams.map((scam) => {
          const title = (scam.title as any)[lang] || scam.title.en;
          const summary = (scam.summary as any)[lang] || scam.summary.en;

          return (
            <div
              key={scam.id}
              style={{
                background: 'var(--color-surface)',
                border: 'var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 700 }}>
                Source: {scam.source}
              </div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0 }}>
                {title}
              </h2>
              <p style={{ fontSize: 'var(--text-body)', margin: 0, lineHeight: 1.5, color: 'var(--color-text-muted)' }}>
                {summary}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
