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
  const [gender, setGender] = useState<UserProfile['gender']>(profile?.gender || 'woman');
  const [city, setCity] = useState(profile?.city || '');

  const caregiver = getCaregiver();
  const progress = getProgress();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    const updated: UserProfile = {
      ...profile,
      name: name.trim(),
      phone: phone.trim(),
      gender,
      city: city.trim(),
    };
    saveProfile(updated);
    setProfile(updated);
    setEditing(false);
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <button
          type="button"
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
          type="button"
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

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: '6px' }}>
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as UserProfile['gender'])}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: 'var(--text-body)',
                border: 'var(--border)',
                borderRadius: 'var(--radius)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
              }}
            >
              <option value="woman">{t('gender.woman', 'Woman')}</option>
              <option value="man">{t('gender.man', 'Man')}</option>
              <option value="preferNotToSay">{t('gender.preferNotToSay', 'Prefer not to say')}</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: '6px' }}>
              City or District
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Nagpur"
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
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Gender</div>
            <div style={{ fontSize: 'var(--text-body)' }}>{profile?.gender ? t(`gender.${profile.gender}`) : 'Not specified'}</div>
          </div>

          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>City or District</div>
            <div style={{ fontSize: 'var(--text-body)' }}>{profile?.city || 'Not provided'}</div>
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

      {/* Caregiver Summary & Direct Link */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
          {t('home.familyCardTitle', 'Family Protection')}
        </div>
        {caregiver && caregiver.approved ? (
          <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-text)' }}>
            Linked with {caregiver.name} ({caregiver.relationship}) &middot; {caregiver.phone}
          </div>
        ) : (
          <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}>
            {t('home.familyCardDesc', 'Link a trusted family member or helper')}
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate('/app/caregiver')}
          style={{
            minHeight: '56px',
            background: 'var(--color-secondary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontSize: 'var(--text-body)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {caregiver && caregiver.approved
            ? t('caregiver.seniorView', 'Manage Caregiver Settings')
            : t('caregiver.addLabel', 'Add a Caregiver')}
        </button>
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
          gap: '12px',
        }}
      >
        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
          {t('progress.title', 'Learning Progress')}
        </div>
        <div style={{ fontSize: 'var(--text-body)' }}>
          Lessons Completed: {progress.lessonsCompleted || 0} of 6
        </div>
        <div style={{ fontSize: 'var(--text-body)' }}>
          Scenarios Completed: {progress.scenariosCompleted || 0} of 2
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
          <button
            type="button"
            onClick={() => navigate('/app/learn')}
            style={{
              flex: 1,
              minHeight: '56px',
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius)',
              fontSize: 'var(--text-body)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t('nav.learn')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/practise')}
            style={{
              flex: 1,
              minHeight: '56px',
              background: 'var(--color-surface)',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-primary)',
              borderRadius: 'var(--radius)',
              fontSize: 'var(--text-body)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t('nav.practise')}
          </button>
        </div>
      </div>

      <button
        type="button"
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
