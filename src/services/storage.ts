import { openDB, IDBPDatabase } from 'idb';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  ageRange: 'under40' | '40to49' | '50to59' | '60to69' | '70plus';
  gender?: 'woman' | 'man' | 'preferNotToSay';
  city?: string;
  phone: string;
  language: 'en' | 'hi' | 'mr';
  onboardingComplete: boolean;
}

export interface AppProgress {
  lessonsCompleted: number;
  scenariosCompleted: number;
  checklistTicks: boolean[];
}

export interface AppSettings {
  language: 'en' | 'hi' | 'mr';
  textSize: 'normal' | 'large' | 'extraLarge';
  theme: 'light' | 'dark';
  alertsEnabled: boolean;
}

export interface CaregiverData {
  name: string;
  relationship: string;
  phone: string;
  inviteCode: string;
  approved: boolean;
  permissions: {
    lessonProgress: boolean;
    redAlerts: boolean;
  };
}

// ─── LocalStorage helpers ───────────────────────────────────────────────────

const LS_KEYS = {
  PROFILE: 'dsc_profile',
  PROGRESS: 'dsc_progress',
  SETTINGS: 'dsc_settings',
  BANK_CARE_NUMBER: 'dsc_bank_care_number',
  CAREGIVER: 'dsc_caregiver',
  TUTORIAL_COMPLETED: 'dsc_tutorial_completed',
} as const;

function lsSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('localStorage write failed for key:', key);
  }
}

function lsGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

// ─── Profile ───────────────────────────────────────────────────────────────

export function saveProfile(profile: UserProfile): void {
  lsSet(LS_KEYS.PROFILE, profile);
}

export function getProfile(): UserProfile | null {
  return lsGet<UserProfile>(LS_KEYS.PROFILE);
}

// ─── Progress ──────────────────────────────────────────────────────────────

export function saveProgress(progress: AppProgress): void {
  lsSet(LS_KEYS.PROGRESS, progress);
}

export function getProgress(): AppProgress {
  return (
    lsGet<AppProgress>(LS_KEYS.PROGRESS) ?? {
      lessonsCompleted: 0,
      scenariosCompleted: 0,
      checklistTicks: [],
    }
  );
}

// ─── Settings ──────────────────────────────────────────────────────────────

export function saveSettings(settings: AppSettings): void {
  lsSet(LS_KEYS.SETTINGS, settings);
}

export function getSettings(): AppSettings {
  return (
    lsGet<AppSettings>(LS_KEYS.SETTINGS) ?? {
      language: 'en',
      textSize: 'normal',
      theme: 'light',
      alertsEnabled: true,
    }
  );
}

// ─── Bank Care Number ──────────────────────────────────────────────────────

export function saveBankCareNumber(number: string): void {
  lsSet(LS_KEYS.BANK_CARE_NUMBER, number);
}

export function getBankCareNumber(): string {
  return lsGet<string>(LS_KEYS.BANK_CARE_NUMBER) ?? '';
}

// ─── Caregiver Data ────────────────────────────────────────────────────────

export function saveCaregiver(cg: CaregiverData | null): void {
  if (!cg) {
    localStorage.removeItem(LS_KEYS.CAREGIVER);
  } else {
    lsSet(LS_KEYS.CAREGIVER, cg);
  }
}

export function getCaregiver(): CaregiverData | null {
  return lsGet<CaregiverData>(LS_KEYS.CAREGIVER);
}

// ─── Tutorial State ────────────────────────────────────────────────────────

export function isTutorialCompleted(): boolean {
  return lsGet<boolean>(LS_KEYS.TUTORIAL_COMPLETED) === true;
}

export function setTutorialCompleted(value: boolean): void {
  lsSet(LS_KEYS.TUTORIAL_COMPLETED, value);
}

// ─── Clear all data ─────────────────────────────────────────────────────────

export async function clearAllData(): Promise<void> {
  Object.values(LS_KEYS).forEach((key) => localStorage.removeItem(key));
  try {
    const db = await getDB();
    db.close();
    await indexedDB.deleteDatabase('dsc-db');
  } catch {
    // IDB not available or already cleared
  }
}

// ─── IndexedDB (for future large data) ─────────────────────────────────────

let _db: IDBPDatabase | null = null;

async function getDB(): Promise<IDBPDatabase> {
  if (_db) return _db;
  _db = await openDB('dsc-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('cache')) {
        db.createObjectStore('cache', { keyPath: 'id' });
      }
    },
  });
  return _db;
}

export async function idbSet(id: string, value: unknown): Promise<void> {
  const db = await getDB();
  await db.put('cache', { id, value });
}

export async function idbGet<T>(id: string): Promise<T | undefined> {
  const db = await getDB();
  const row = await db.get('cache', id);
  return row?.value as T | undefined;
}
