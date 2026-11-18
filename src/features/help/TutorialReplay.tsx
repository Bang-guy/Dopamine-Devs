import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TutorialReplay() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleReplay = () => {
    navigate('/app/home');
    // Fire custom event after navigation so AppShell picks it up
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('replay-tutorial'));
    }, 300);
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <button
        onClick={() => navigate('/app/help')}
        style={{
          background: 'transparent',
          color: 'var(--color-text)',
          minHeight: '56px',
          fontSize: 'var(--text-lg)',
          fontWeight: 700,
          padding: '8px 0',
          border: 'none',
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        {t('back')}
      </button>

      <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
        {t('help.hub.tutorialTitle', 'Replay the tutorial')}
      </h1>

      <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
        {t('tutorial.replayDesc', 'The guided tour highlights each feature on the Home screen. It does not change any of your data.')}
      </p>

      <button
        onClick={handleReplay}
        style={{
          minHeight: '56px',
          background: 'var(--color-primary)',
          color: '#fff',
          borderRadius: 'var(--radius)',
          fontSize: 'var(--text-lg)',
          fontWeight: 700,
          cursor: 'pointer',
          border: 'none',
        }}
      >
        {t('tutorial.startReplay', 'Start the guided tour')}
      </button>
    </div>
  );
}
