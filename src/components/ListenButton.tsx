import { useTranslation } from 'react-i18next';
import { speak } from '../services/speech';

interface Props {
  text: string;
}

export default function ListenButton({ text }: Props) {
  const { t, i18n } = useTranslation();

  function handleListen() {
    speak(text, i18n.language as 'en' | 'hi' | 'mr');
  }

  return (
    <button
      onClick={handleListen}
      aria-label={t('listen')}
      style={{
        background: 'var(--color-secondary)',
        color: '#fff',
        minHeight: '44px',
        padding: '8px 16px',
        borderRadius: 'var(--radius)',
        fontSize: 'var(--text-body)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      🔊 {t('listen')}
    </button>
  );
}
