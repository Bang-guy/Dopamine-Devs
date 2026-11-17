import { describe, it, expect } from 'vitest';
import scenariosData from '../src/data/scenarios.json';
import en from '../src/locales/en.json';
import hi from '../src/locales/hi.json';
import mr from '../src/locales/mr.json';

describe('Phase 3 Simulator & Bank verification', () => {
  it('Scenario A has correct wrong and right options with red flag feedback', () => {
    const scA = scenariosData.scenarios.find((s) => s.id === 'A');
    expect(scA).toBeDefined();
    expect(scA?.buttons).toHaveLength(2);

    const wrongBtn = scA?.buttons.find((b) => !b.correct);
    expect(wrongBtn).toBeDefined();
    expect(wrongBtn?.flags).toBeDefined();
    expect(wrongBtn?.flags?.length).toBe(3);
    expect(wrongBtn?.feedback.en).toContain('You never enter your UPI PIN');

    const rightBtn = scA?.buttons.find((b) => b.correct);
    expect(rightBtn).toBeDefined();
    expect(rightBtn?.feedback.en).toContain('Money is never received by entering a PIN');
  });

  it('Scenario B has right choice to delete and wrong choice explaining official app', () => {
    const scB = scenariosData.scenarios.find((s) => s.id === 'B');
    expect(scB).toBeDefined();
    expect(scB?.buttons).toHaveLength(2);

    const wrongBtn = scB?.buttons.find((b) => !b.correct);
    expect(wrongBtn?.feedback.en).toContain('Pay only through the official app');

    const rightBtn = scB?.buttons.find((b) => b.correct);
    expect(rightBtn?.label.en).toBe('Delete message');
  });

  it('All Phase 3 locale keys exist in en, hi, and mr locales', () => {
    const checkNestedKeys = (objEn: any, objHi: any, objMr: any, prefix = '') => {
      for (const key of Object.keys(objEn)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        expect(objHi, `Missing ${fullKey} in hi.json`).toHaveProperty(key);
        expect(objMr, `Missing ${fullKey} in mr.json`).toHaveProperty(key);
        if (typeof objEn[key] === 'object' && objEn[key] !== null) {
          checkNestedKeys(objEn[key], objHi[key], objMr[key], fullKey);
        }
      }
    };

    expect((en as any).simulator).toBeDefined();
    expect((hi as any).simulator).toBeDefined();
    expect((mr as any).simulator).toBeDefined();

    expect((en as any).bank).toBeDefined();
    expect((hi as any).bank).toBeDefined();
    expect((mr as any).bank).toBeDefined();

    checkNestedKeys((en as any).simulator, (hi as any).simulator, (mr as any).simulator, 'simulator');
    checkNestedKeys((en as any).bank, (hi as any).bank, (mr as any).bank, 'bank');
  });
});
