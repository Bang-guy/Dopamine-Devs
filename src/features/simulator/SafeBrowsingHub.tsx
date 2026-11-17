import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import scenarioData from '../../data/scenarios.json';
import { getProgress } from '../../services/storage';
import ListenButton from '../../components/ListenButton';

export default function SafeBrowsingHub() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language || 'en') as 'en' | 'hi' | 'mr';
  const progress = getProgress();
  const completedIds: string[] = (progress as any).completedScenarios ?? [];

  return (
    <div>
      <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '16px' }}>
        {t('simulator.safeBrowsing')}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
        {scenarioData.scenarios.map((sc) => {
          const done = completedIds.includes(sc.id);
          const title = (sc.title as any)[lang] || sc.title.en;
          const desc = (sc.description as any)[lang] || sc.description.en;
          return (
            <button
              key={sc.id}
              onClick={() => navigate(`/app/practise/scenario/${sc.id}`)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '20px',
                background: done ? '#F0FDF4' : 'var(--color-surface)',
                border: done ? '2px solid var(--color-safe)' : 'var(--border)',
                borderRadius: 'var(--radius-lg)',
                minHeight: 'var(--btn-height)',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{title}</span>
                {done && <span style={{ color: 'var(--color-safe)', fontWeight: 700, fontSize: '14px' }}>{t('simulator.done')}</span>}
              </div>
              <span style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}>{desc}</span>
              <ListenButton text={`${title}. ${desc}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
