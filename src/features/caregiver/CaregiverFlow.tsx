import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  getCaregiver,
  saveCaregiver,
  getProgress,
  getProfile,
  type CaregiverData,
} from '../../services/storage';

export default function CaregiverFlow() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [caregiver, setCaregiver] = useState<CaregiverData | null>(getCaregiver());
  const [viewMode, setViewMode] = useState<'senior' | 'family'>('senior');

  // Form states
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showApprovalCard, setShowApprovalCard] = useState(false);

  const handleCreateCaregiver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(code);
    setShowInviteModal(true);
  };

  const handleShowApproval = () => {
    setShowInviteModal(false);
    setShowApprovalCard(true);
  };

  const handleApprove = () => {
    const newCg: CaregiverData = {
      name: name.trim(),
      relationship: relationship.trim() || 'Family',
      phone: phone.trim(),
      inviteCode: generatedCode,
      approved: true,
      permissions: {
        lessonProgress: true,
        redAlerts: false,
      },
    };
    saveCaregiver(newCg);
    setCaregiver(newCg);
    setShowApprovalCard(false);
  };

  const handleReject = () => {
    setShowApprovalCard(false);
  };

  const handleTogglePermission = (perm: 'lessonProgress' | 'redAlerts') => {
    if (!caregiver) return;
    const updated: CaregiverData = {
      ...caregiver,
      permissions: {
        ...caregiver.permissions,
        [perm]: !caregiver.permissions[perm],
      },
    };
    saveCaregiver(updated);
    setCaregiver(updated);
  };

  const handleRemoveCaregiver = () => {
    saveCaregiver(null);
    setCaregiver(null);
    setName('');
    setRelationship('');
    setPhone('');
    setViewMode('senior');
  };

  const progress = getProgress();
  const profile = getProfile();

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
          {t('settings.caregiver')}
        </h1>
        {caregiver && caregiver.approved && (
          <div style={{ display: 'flex', gap: '4px', background: 'var(--color-surface)', border: 'var(--border)', borderRadius: 'var(--radius)', padding: '4px' }}>
            <button
              onClick={() => setViewMode('senior')}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                background: viewMode === 'senior' ? 'var(--color-primary)' : 'transparent',
                color: viewMode === 'senior' ? '#fff' : 'var(--color-text)',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {t('caregiver.seniorView')}
            </button>
            <button
              onClick={() => setViewMode('family')}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                background: viewMode === 'family' ? 'var(--color-primary)' : 'transparent',
                color: viewMode === 'family' ? '#fff' : 'var(--color-text)',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {t('caregiver.familyView')}
            </button>
          </div>
        )}
      </div>

      <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
        Demo: both views on this device
      </div>

      {/* VIEW: Senior mode */}
      {viewMode === 'senior' && (
        <>
          {!caregiver || !caregiver.approved ? (
            /* Add Caregiver Form */
            <div
              style={{
                background: 'var(--color-surface)',
                border: 'var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <h2 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>
                {t('caregiver.addLabel')}
              </h2>
              <p style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                Link a trusted family member to receive updates on your learning progress.
              </p>

              <form onSubmit={handleCreateCaregiver} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: '6px' }}>
                    {t('caregiver.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: 'var(--text-body)',
                      borderRadius: 'var(--radius)',
                      border: 'var(--border)',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: '6px' }}>
                    {t('caregiver.relationship')}
                  </label>
                  <input
                    type="text"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="e.g. Son, Daughter"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: 'var(--text-body)',
                      borderRadius: 'var(--radius)',
                      border: 'var(--border)',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: '6px' }}>
                    {t('caregiver.phone')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: 'var(--text-body)',
                      borderRadius: 'var(--radius)',
                      border: 'var(--border)',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    minHeight: 'var(--btn-height)',
                    background: 'var(--color-primary)',
                    color: '#fff',
                    borderRadius: 'var(--radius)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  Generate Invite Code
                </button>
              </form>
            </div>
          ) : (
            /* Active Caregiver Settings & Permissions */
            <div
              style={{
                background: 'var(--color-surface)',
                border: 'var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                    {caregiver.name} ({caregiver.relationship})
                  </div>
                  <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    {caregiver.phone}
                  </div>
                </div>
                <span style={{ background: '#DCFCE7', color: '#15803D', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 700 }}>
                  Active
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: 'var(--border)', paddingTop: '16px' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
                  Caregiver Permissions
                </h3>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ fontSize: 'var(--text-body)' }}>{t('caregiver.lessonProgress')}</span>
                  <input
                    type="checkbox"
                    checked={caregiver.permissions.lessonProgress}
                    onChange={() => handleTogglePermission('lessonProgress')}
                    style={{ width: '24px', height: '24px', accentColor: 'var(--color-primary)' }}
                  />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ fontSize: 'var(--text-body)' }}>{t('caregiver.riskAlerts')}</span>
                  <input
                    type="checkbox"
                    checked={caregiver.permissions.redAlerts}
                    onChange={() => handleTogglePermission('redAlerts')}
                    style={{ width: '24px', height: '24px', accentColor: 'var(--color-primary)' }}
                  />
                </label>
              </div>

              <button
                onClick={handleRemoveCaregiver}
                style={{
                  minHeight: 'var(--btn-height)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-danger)',
                  border: '1px solid var(--color-danger)',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                {t('caregiver.remove')}
              </button>
            </div>
          )}
        </>
      )}

      {/* VIEW: Family View Mode */}
      {viewMode === 'family' && caregiver && (
        <div
          style={{
            background: 'var(--color-surface)',
            border: 'var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>
              Viewing as Caregiver: {caregiver.name}
            </h2>
          </div>

          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: 'var(--radius)', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Senior Account</div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{profile?.name || 'Senior Citizen'}</div>
          </div>

          {caregiver.permissions.lessonProgress ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>Safety Learning Status</h3>
              <div style={{ padding: '16px', background: '#F0FDF4', border: '1px solid var(--color-safe)', borderRadius: 'var(--radius)' }}>
                <div style={{ fontSize: 'var(--text-body)', fontWeight: 700, color: 'var(--color-safe)' }}>
                  {progress.lessonsCompleted || 0} Lessons Completed
                </div>
                <div style={{ fontSize: '14px', color: '#166534', marginTop: '4px' }}>
                  {progress.scenariosCompleted || 0} Safety practice scenarios solved
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '16px', background: '#F1F5F9', borderRadius: 'var(--radius)', color: 'var(--color-text-muted)' }}>
              Lesson progress sharing is turned off by senior.
            </div>
          )}

          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, borderTop: 'var(--border)', paddingTop: '12px' }}>
            Privacy note: Caregivers never see message content, links, OTPs, PINs, or financial details.
          </div>
        </div>
      )}

      {/* Invite Code Dialog */}
      {showInviteModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              padding: '24px',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '400px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>{t('caregiver.demoLabel')}</h3>
            <p style={{ margin: 0, fontSize: 'var(--text-body)' }}>
              Share this 4-digit code with {name}:
            </p>
            <div style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', letterSpacing: '6px', color: 'var(--color-primary)' }}>
              {generatedCode}
            </div>
            <button
              onClick={handleShowApproval}
              style={{
                minHeight: 'var(--btn-height)',
                background: 'var(--color-primary)',
                color: '#fff',
                borderRadius: 'var(--radius)',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Simulate Caregiver Request
            </button>
          </div>
        </div>
      )}

      {/* Approval Card */}
      {showApprovalCard && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              padding: '24px',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '420px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h3 style={{ fontSize: 'var(--text-xl)', margin: 0, color: 'var(--color-primary)' }}>
              {t('caregiver.approveTitle')}
            </h3>
            <p style={{ margin: 0, fontSize: 'var(--text-body)', lineHeight: 1.5 }}>
              {t('caregiver.approveBody', { name })}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleApprove}
                style={{
                  flex: 1,
                  minHeight: 'var(--btn-height)',
                  background: 'var(--color-safe)',
                  color: '#fff',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t('caregiver.approve')}
              </button>
              <button
                onClick={handleReject}
                style={{
                  flex: 1,
                  minHeight: 'var(--btn-height)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {t('caregiver.notNow')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
