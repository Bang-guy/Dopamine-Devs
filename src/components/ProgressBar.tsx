import { useTranslation } from 'react-i18next';
import { getProgress } from '../services/storage';

// Simple placeholder progress bar – shows lessons and scenarios count
export default function ProgressBar() {
  const { t } = useTranslation();
  const progress = getProgress();
  const lessons = progress?.lessonsCompleted ?? 0;
  const scenarios = progress?.scenariosCompleted ?? 0;
  const totalLessons = 6;
  const totalScenarios = 2;

  // Determine badge label
  let badge = t('progress.justStarting');
  if (lessons >= totalLessons && scenarios >= totalScenarios) {
    badge = t('progress.safetyReady');
  } else if (lessons > 0 || scenarios > 0) {
    badge = t('progress.gettingConfident');
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ marginBottom: '4px', fontWeight: 600 }}>{badge}</div>
      <div>
        {t('progress.lessonsOf', { done: lessons, total: totalLessons })} |
        {t('progress.scenariosCompleted', { count: scenarios })}
      </div>
    </div>
  );
}
