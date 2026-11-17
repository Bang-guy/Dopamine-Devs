import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function HelpHub() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cards = [
    {
      to: '/app/help/checklist',
      title: t('help.hub.checklistTitle', { defaultValue: 'Got scammed? Follow these steps' }),
      desc: t('help.hub.checklistDesc', { defaultValue: 'Five urgent actions to freeze accounts and report fraud' }),
    },
    {
      to: '/app/help/verify',
      title: t('help.hub.verifyTitle', { defaultValue: 'What to do with a suspicious message' }),
      desc: t('help.hub.verifyDesc', { defaultValue: 'Step-by-step verification guide before replying or clicking' }),
    },
    {
      to: '/app/help/helplines',
      title: t('help.hub.helplinesTitle', { defaultValue: 'Helpline numbers' }),
      desc: t('help.hub.helplinesDesc', { defaultValue: 'Direct emergency numbers, 1930, and your bank helpline' }),
    },
    {
      to: '/app/help/tutorial',
      title: t('help.hub.tutorialTitle', { defaultValue: 'Replay the tutorial' }),
      desc: t('help.hub.tutorialDesc', { defaultValue: 'Review the four essential safety rules of this app' }),
    },
  ];

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
        {t('nav.help')}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => navigate(c.to)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '6px',
              padding: '20px',
              background: 'var(--color-surface)',
              border: 'var(--border)',
              borderRadius: 'var(--radius-lg)',
              minHeight: 'var(--btn-height)',
              textAlign: 'left',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)' }}>
              {c.title}
            </span>
            <span style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
              {c.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
