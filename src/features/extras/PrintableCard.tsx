import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function PrintableCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="no-print">
        <button
          onClick={() => navigate(-1)}
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

      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>Printable Safety Card</h1>
        <button
          onClick={handlePrint}
          style={{
            minHeight: '48px',
            padding: '0 20px',
            background: 'var(--color-primary)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            fontWeight: 700,
            fontSize: 'var(--text-body)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Print Card
        </button>
      </div>

      {/* A4 Printable Card Container */}
      <div
        id="printable-card-content"
        style={{
          background: '#FFFFFF',
          color: '#111827',
          border: '2px solid #1E3A8A',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '640px',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', borderBottom: '2px solid #E5E7EB', paddingBottom: '16px' }}>
          <h2 style={{ fontSize: '26px', margin: '0 0 6px 0', color: '#1E3A8A' }}>
            Satark - Senior Citizen Safety Card
          </h2>
          <p style={{ margin: 0, fontSize: '16px', color: '#4B5563' }}>
            Keep this card next to your phone or inside your wallet.
          </p>
        </div>

        {/* Emergency Numbers */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, background: '#FEF2F2', border: '2px solid #B91C1C', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#B91C1C' }}>CYBERCRIME HELPLINE</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#B91C1C' }}>1930</div>
            <div style={{ fontSize: '13px', color: '#7F1D1D' }}>Call within 2 hrs if scammed</div>
          </div>

          <div style={{ flex: 1, background: '#EFF6FF', border: '2px solid #1E3A8A', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E3A8A' }}>ALL EMERGENCY</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#1E3A8A' }}>112</div>
            <div style={{ fontSize: '13px', color: '#1E3A8A' }}>Police, Fire, Ambulance</div>
          </div>
        </div>

        {/* 5 Golden Rules */}
        <div>
          <h3 style={{ fontSize: '18px', margin: '0 0 10px 0', color: '#1E3A8A' }}>
            Five Golden Rules of Cyber Safety
          </h3>
          <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', lineHeight: 1.4 }}>
            <li><strong>Never share OTP or PIN:</strong> No real bank, police or government officer will ever ask for them.</li>
            <li><strong>No PIN to receive money:</strong> Entering your UPI PIN always sends money, never receives it.</li>
            <li><strong>Never install APKs from chat:</strong> Do not download apps or share your phone screen with anyone.</li>
            <li><strong>Call the card back:</strong> Only use the phone number printed on the back of your bank card.</li>
            <li><strong>No arrest over video calls:</strong> Police or CBI never interrogate citizens over WhatsApp or Skype.</li>
          </ol>
        </div>

        {/* Blank Spaces for Emergency Contacts */}
        <div style={{ borderTop: '2px solid #E5E7EB', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ fontSize: '16px', margin: 0 }}>My Trusted Contacts (Fill in with pen):</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
            <div style={{ borderBottom: '1px dashed #9CA3AF', paddingBottom: '4px' }}>
              My Bank Customer Care: _________________________________________
            </div>
            <div style={{ borderBottom: '1px dashed #9CA3AF', paddingBottom: '4px' }}>
              Trusted Family Member / Caregiver: _________________________________________
            </div>
            <div style={{ borderBottom: '1px dashed #9CA3AF', paddingBottom: '4px' }}>
              Local Police Station Phone: _________________________________________
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-card-content, #printable-card-content * {
            visibility: visible;
          }
          #printable-card-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
