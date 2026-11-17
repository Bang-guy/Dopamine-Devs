import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveProfile,
  getProfile,
  saveProgress,
  getProgress,
  saveSettings,
  getSettings,
  clearAllData,
  UserProfile,
  AppProgress,
  AppSettings,
} from '../src/services/storage';

describe('Storage service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and retrieves profile correctly', () => {
    const profile: UserProfile = {
      name: 'Ramesh',
      ageRange: '60to69',
      phone: '9876543210',
      language: 'hi',
      onboardingComplete: true,
    };
    saveProfile(profile);
    const retrieved = getProfile();
    expect(retrieved).toEqual(profile);
  });

  it('saves and retrieves progress with default fallback', () => {
    const initial = getProgress();
    expect(initial).toEqual({
      lessonsCompleted: 0,
      scenariosCompleted: 0,
      checklistTicks: [],
    });

    const progress: AppProgress = {
      lessonsCompleted: 2,
      scenariosCompleted: 1,
      checklistTicks: [true, false, true],
    };
    saveProgress(progress);
    expect(getProgress()).toEqual(progress);
  });

  it('saves and retrieves settings with default fallback', () => {
    const initial = getSettings();
    expect(initial).toEqual({
      language: 'en',
      textSize: 'normal',
      theme: 'light',
      alertsEnabled: true,
    });

    const newSettings: AppSettings = {
      language: 'mr',
      textSize: 'large',
      theme: 'dark',
      alertsEnabled: false,
    };
    saveSettings(newSettings);
    expect(getSettings()).toEqual(newSettings);
  });

  it('clears all data', async () => {
    saveProfile({
      name: 'Suresh',
      ageRange: '70plus',
      phone: '9998887776',
      language: 'en',
      onboardingComplete: true,
    });
    await clearAllData();
    expect(getProfile()).toBeNull();
  });
});
