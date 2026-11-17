import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  getProfile,
  saveProfile,
  getProgress,
  getCaregiver,
  type UserProfile,
} from '../services/storage';

export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(getProfile());
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [phone, setPhone] = useState(profile?.phone || '');

  const caregiver = getCaregiver();
  const progress = getProgress();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    const updated: UserProfile = {
      ...profile,
      name: name.trim(),
      phone: phone.trim(),
    };
    saveProfile(updated);
    setProfile(updated);
    setEditing(false);
  };

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
          {t('profile')}
        </h1>
        <button
          onClick={() => setEditing(!editing)}
          style={{
            minHeight: '44px',
            padding: '0 16px',
            background: 'transparent',
            border: 'var(--border)',
            borderRadius: 'var(--radius)',
            fontWeight: 600,
            fontSize: 'var(--text-body)',
            cursor: 'pointer',
          }}
        >
          {editing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {editing ? (
        <form
          onSubmit={handleSave}
          style={{
            background: 'var(--color-surface)',
            border: 'var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: '6px' }}>
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: 'var(--text-body)',
                border: 'var(--border)',
                borderRadius: 'var(--radius)',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: '6px' }}>
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: 'var(--text-body)',
                border: 'var(--border)',
                borderRadius: 'var(--radius)',
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
              fontWeight: 700,
              fontSize: 'var(--text-body)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save Profile
          </button>
        </form>
      ) : (
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
          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Name</div>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{profile?.name || 'Friend'}</div>
          </div>

          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Age Range</div>
            <div style={{ fontSize: 'var(--text-body)' }}>{profile ? t(`age.${profile.ageRange}`) : ''}</div>
          </div>

          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Registered Phone</div>
            <div style={{ fontSize: 'var(--text-body)' }}>{profile?.phone || 'Not provided'}</div>
          </div>

          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Preferred Language</div>
            <div style={{ fontSize: 'var(--text-body)', textTransform: 'capitalize' }}>{profile?.language}</div>
          </div>
        </div>
      )}

      {/* Caregiver Summary */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Caregiver Summary</div>
        {caregiver && caregiver.approved ? (
          <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-text)' }}>
            Linked with {caregiver.name} ({caregiver.relationship}) &middot; {caregiver.phone}
          </div>
        ) : (
          <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}>
            No caregiver linked currently.
          </div>
        )}
      </div>

      {/* Progress Summary */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Progress Summary</div>
        <div style={{ fontSize: 'var(--text-body)' }}>
          Lessons Completed: {progress.lessonsCompleted || 0}
        </div>
        <div style={{ fontSize: 'var(--text-body)' }}>
          Scenarios Completed: {progress.scenariosCompleted || 0}
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        style={{
          minHeight: 'var(--btn-height)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: 'var(--border)',
          borderRadius: 'var(--radius)',
          fontSize: 'var(--text-body)',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {t('settings.logout')}
      </button>
    </div>
  );
}
