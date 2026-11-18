import { useTranslation } from 'react-i18next';
import { speak } from '../services/speech';
import { Volume2 } from 'lucide-react';

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
        background: 'transparent',
        color: 'var(--color-text-muted)',
        minHeight: '40px',
        padding: '4px 12px',
        borderRadius: 'var(--radius)',
        fontSize: 'var(--text-body)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontWeight: 500,
        flexShrink: 0,
        opacity: 0.7,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <Volume2 size={18} /> {t('listen')}
    </button>
  );
}
