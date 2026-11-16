import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

interface Props {
  onNext: (lang: 'en' | 'hi' | 'mr') => void;
}

const languages = [
  { code: 'en' as const, label: 'English',  sublabel: 'English' },
  { code: 'hi' as const, label: 'हिन्दी',   sublabel: 'Hindi' },
  { code: 'mr' as const, label: 'मराठी',    sublabel: 'Marathi' },
];

export default function Step1Language({ onNext }: Props) {
  const { t } = useTranslation();

  function choose(lang: 'en' | 'hi' | 'mr') {
    localStorage.setItem('dsc_lang', lang);
    i18n.changeLanguage(lang);
    onNext(lang);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '32px' }}>
      <h1 style={{ fontSize: 'var(--text-2xl)', textAlign: 'center' }}>
        {t('onboarding.chooseLanguage')}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => choose(lang.code)}
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              minHeight: 'var(--btn-height)',
              borderRadius: 'var(--radius)',
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '16px',
            }}
          >
            <span>{lang.label}</span>
            <span style={{ fontSize: 'var(--text-body)', opacity: 0.8 }}>{lang.sublabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
