import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import lessonsData from '../../data/lessons.json';
import { getProgress } from '../../services/storage';

export default function LearnHub() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language || 'en') as 'en' | 'hi' | 'mr';

  const progress = getProgress();
  const kycDone = (progress.lessonsCompleted || 0) >= 1;

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
        {t('home.askLearn')}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
        {lessonsData.modules.map((m) => {
          const title = (m.title as any)[lang] || m.title.en;
          const desc = (m.description as any)[lang] || m.description.en;

          if (m.live) {
            return (
              <button
                key={m.id}
                onClick={() => navigate('/app/learn/kyc')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '8px',
                  padding: '20px',
                  background: kycDone ? '#F0FDF4' : 'var(--color-surface)',
                  border: kycDone ? '2px solid var(--color-safe)' : 'var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  minHeight: 'var(--btn-height)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)' }}>
                    {title}
                  </span>
                  {kycDone && (
                    <span style={{ color: 'var(--color-safe)', fontWeight: 700, fontSize: '14px' }}>
                      {t('simulator.done')}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                  {desc}
                </span>
              </button>
            );
          }

          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: '20px',
                background: 'var(--color-surface)',
                border: 'var(--border)',
                borderRadius: 'var(--radius-lg)',
                opacity: 0.75,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-text)' }}>
                  {title}
                </span>
                <span style={{ fontSize: '13px', background: 'var(--color-bg)', padding: '2px 8px', borderRadius: '4px', border: 'var(--border)' }}>
                  Coming soon
                </span>
              </div>
              <span style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                {desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
