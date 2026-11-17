import { describe, it, expect, beforeEach } from 'vitest';
import { getCaregiver, saveCaregiver, type CaregiverData } from '../src/services/storage';

describe('Phase 7 Caregiver Consent & Permissions (tests/caregiver.test.ts)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('No caregiver data exists initially before approval', () => {
    expect(getCaregiver()).toBeNull();
  });

  it('Approved caregiver saves consent and permissions properly', () => {
    const cg: CaregiverData = {
      name: 'Rohan Sharma',
      relationship: 'Son',
      phone: '9876543210',
      inviteCode: '4321',
      approved: true,
      permissions: {
        lessonProgress: true,
        redAlerts: false,
      },
    };
    saveCaregiver(cg);

    const saved = getCaregiver();
    expect(saved).not.toBeNull();
    expect(saved?.approved).toBe(true);
    expect(saved?.permissions.lessonProgress).toBe(true);
    expect(saved?.permissions.redAlerts).toBe(false);
  });

  it('Immediate revoke removes all caregiver data and permissions', () => {
    const cg: CaregiverData = {
      name: 'Rohan Sharma',
      relationship: 'Son',
      phone: '9876543210',
      inviteCode: '4321',
      approved: true,
      permissions: { lessonProgress: true, redAlerts: true },
    };
    saveCaregiver(cg);
    expect(getCaregiver()).not.toBeNull();

    // Revoke
    saveCaregiver(null);
    expect(getCaregiver()).toBeNull();
  });
});
