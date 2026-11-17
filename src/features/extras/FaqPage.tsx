import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import faqsData from '../../data/faqs.json';
import ListenButton from '../../components/ListenButton';

export default function FaqPage() {
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
        {t('faq.title')}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqsData.faqs.map((faq) => {
          const question = (faq.q as any)[lang] || faq.q.en;
          const answer = (faq.a as any)[lang] || faq.a.en;

          return (
            <div
              key={faq.id}
              style={{
                background: 'var(--color-surface)',
                border: 'var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0, color: 'var(--color-primary)' }}>
                {question}
              </h2>

              <p style={{ fontSize: 'var(--text-body)', margin: 0, lineHeight: 1.5, color: 'var(--color-text)' }}>
                {answer}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '6px' }}>
                <ListenButton text={`${question}. ${answer}`} />
                <button
                  onClick={() => navigate(faq.link)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    fontSize: 'var(--text-body)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: '8px 0',
                  }}
                >
                  {faq.linkText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
