import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getProgress } from '../services/storage';
import ListenButton from './ListenButton';

export default function ProgressBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const progress = getProgress();
  const lessons = progress?.lessonsCompleted ?? 0;
  const scenarios = progress?.scenariosCompleted ?? 0;
  const totalLessons = 6;
  const totalScenarios = 2;

  // Determine badge label
  let badge = t('progress.justStarting');
  let badgeBg = 'var(--color-bg)';
  let badgeColor = 'var(--color-text)';

  if (lessons >= totalLessons && scenarios >= totalScenarios) {
    badge = t('progress.safetyReady');
    badgeBg = '#DCFCE7';
    badgeColor = 'var(--color-safe)';
  } else if (lessons > 0 || scenarios > 0) {
    badge = t('progress.gettingConfident');
    badgeBg = '#FEF3C7';
    badgeColor = 'var(--color-accent)';
  }

  const percent = Math.min(
    100,
    Math.round(((lessons + scenarios) / (totalLessons + totalScenarios)) * 100)
  );

  const summaryText = `${badge}. ${t('progress.lessonsOf', { done: lessons, total: totalLessons })}, ${t('progress.scenariosCompleted', { count: scenarios })}.`;

  return (
    <section
      aria-label={t('progress.title', 'Your Learning Progress')}
      style={{
        background: 'var(--color-surface)',
        border: 'var(--border)',
        borderRadius: 'var(--radius-lg, 16px)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span
            style={{
              fontSize: 'var(--text-sm, 14px)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'var(--color-text-muted)',
            }}
          >
            {t('progress.title', 'Your Progress')}
          </span>
          <div style={{ marginTop: '4px' }}>
            <span
              style={{
                display: 'inline-block',
                background: badgeBg,
                color: badgeColor,
                padding: '4px 12px',
                borderRadius: 'var(--radius)',
                fontSize: 'var(--text-body)',
                fontWeight: 700,
              }}
            >
              {badge}
            </span>
          </div>
        </div>
        <ListenButton text={summaryText} />
      </div>

      {/* Visual meter bar */}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Overall completion percentage"
        style={{
          width: '100%',
          height: '14px',
          background: 'var(--color-bg)',
          borderRadius: '7px',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: 'var(--color-primary)',
            transition: 'width 300ms ease',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'var(--text-body)',
          color: 'var(--color-text)',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span>
          {t('progress.lessonsOf', { done: lessons, total: totalLessons })}
        </span>
        <span>
          {t('progress.scenariosCompleted', { count: scenarios })}
        </span>
      </div>

      <button
        type="button"
        onClick={() => navigate('/app/profile')}
        style={{
          minHeight: '48px',
          background: 'transparent',
          color: 'var(--color-primary)',
          border: '1px solid var(--color-primary)',
          borderRadius: 'var(--radius)',
          fontSize: 'var(--text-body)',
          fontWeight: 600,
          cursor: 'pointer',
          padding: '8px 16px',
        }}
      >
        {t('home.viewProgress', 'View Full Progress and Profile')}
      </button>
    </section>
  );
}
