import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import helplinesData from '../../data/helplines.json';
import { getBankCareNumber, saveBankCareNumber } from '../../services/storage';

export default function Helplines() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language || 'en') as 'en' | 'hi' | 'mr';

  const [bankNumber, setBankNumber] = useState(getBankCareNumber());
  const [editingBank, setEditingBank] = useState(!getBankCareNumber());
  const [tempNumber, setTempNumber] = useState(getBankCareNumber());

  const handleSaveBankNumber = () => {
    saveBankCareNumber(tempNumber.trim());
    setBankNumber(tempNumber.trim());
    setEditingBank(false);
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back button */}
      <div>
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
          }}
        >
          {t('back')}
        </button>
      </div>

      <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
        {t('help.helplines.title')}
      </h1>

      {helplinesData.categories.map((cat) => {
        const catTitle = (cat.title as any)[lang] || cat.title.en;
        return (
          <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0, color: 'var(--color-primary)' }}>
              {catTitle}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cat.entries.map((entry: any) => {
                const name = (entry.name as any)[lang] || entry.name.en;
                const desc = (entry.description as any)[lang] || entry.description.en;

                if (entry.isUserStoredBank) {
                  return (
                    <div
                      key={entry.id}
                      style={{
                        background: 'var(--color-surface)',
                        border: 'var(--border)',
                        borderRadius: 'var(--radius)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{name}</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                          {desc}
                        </div>
                      </div>

                      {editingBank ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <input
                            type="tel"
                            value={tempNumber}
                            onChange={(e) => setTempNumber(e.target.value)}
                            placeholder="e.g. 18001234567"
                            style={{
                              padding: '12px',
                              fontSize: 'var(--text-body)',
                              border: 'var(--border)',
                              borderRadius: 'var(--radius)',
                              width: '100%',
                              boxSizing: 'border-box',
                            }}
                          />
                          <button
                            onClick={handleSaveBankNumber}
                            disabled={!tempNumber.trim()}
                            style={{
                              minHeight: '48px',
                              background: 'var(--color-primary)',
                              color: '#fff',
                              borderRadius: 'var(--radius)',
                              fontWeight: 700,
                              fontSize: 'var(--text-body)',
                              cursor: 'pointer',
                            }}
                          >
                            {t('save', { defaultValue: 'Save number' })}
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <a
                            href={`tel:${bankNumber}`}
                            style={{
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: 'var(--btn-height)',
                              background: 'var(--color-primary)',
                              color: '#fff',
                              borderRadius: 'var(--radius)',
                              fontWeight: 700,
                              fontSize: 'var(--text-lg)',
                              textDecoration: 'none',
                            }}
                          >
                            Call {bankNumber}
                          </a>
                          <button
                            onClick={() => setEditingBank(true)}
                            style={{
                              minHeight: 'var(--btn-height)',
                              padding: '0 16px',
                              background: 'transparent',
                              border: 'var(--border)',
                              borderRadius: 'var(--radius)',
                              fontSize: 'var(--text-body)',
                              cursor: 'pointer',
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                if (entry.placeholder) {
                  return (
                    <div
                      key={entry.id}
                      style={{
                        background: 'var(--color-surface)',
                        border: 'var(--border)',
                        borderRadius: 'var(--radius)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{name}</div>
                      <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-accent)', fontStyle: 'italic' }}>
                        {desc}
                      </div>
                    </div>
                  );
                }

                if (entry.url) {
                  return (
                    <div
                      key={entry.id}
                      style={{
                        background: 'var(--color-surface)',
                        border: 'var(--border)',
                        borderRadius: 'var(--radius)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{name}</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                          {desc}
                        </div>
                      </div>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: 'var(--btn-height)',
                          background: 'var(--color-primary)',
                          color: '#fff',
                          borderRadius: 'var(--radius)',
                          fontWeight: 700,
                          fontSize: 'var(--text-lg)',
                          textDecoration: 'none',
                          marginTop: '4px',
                        }}
                      >
                        Visit cybercrime.gov.in
                      </a>
                    </div>
                  );
                }

                return (
                  <div
                    key={entry.id}
                    style={{
                      background: 'var(--color-surface)',
                      border: 'var(--border)',
                      borderRadius: 'var(--radius)',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{name}</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        {desc}
                      </div>
                    </div>
                    <a
                      href={`tel:${entry.number}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 'var(--btn-height)',
                        background: entry.id === '1930' ? 'var(--color-danger)' : 'var(--color-primary)',
                        color: '#fff',
                        borderRadius: 'var(--radius)',
                        fontWeight: 700,
                        fontSize: 'var(--text-lg)',
                        textDecoration: 'none',
                        marginTop: '4px',
                      }}
                    >
                      Call {entry.number}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
