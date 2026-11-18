import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PanicBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      role="banner"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'var(--color-danger)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        zIndex: 200,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={() => navigate('/app/help')}
      onKeyDown={(e) => e.key === 'Enter' && navigate('/app/help')}
      tabIndex={0}
      aria-label="Emergency help: got scammed? Tap here"
    >
      <span style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>
        {t('panic.text')}
      </span>
      <span
        style={{
          background: '#fff',
          color: 'var(--color-danger)',
          borderRadius: '6px',
          padding: '4px 12px',
          fontSize: '16px',
          fontWeight: 700,
        }}
      >
        {t('panic.cta')}
      </span>
    </div>
  );
}
