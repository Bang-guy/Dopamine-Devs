import { describe, it, expect } from 'vitest';
import tips from '../src/data/tips.json';

describe('Safety tips data', () => {
  it('contains at least 15 tips', () => {
    expect(tips.length).toBeGreaterThanOrEqual(15);
  });

  it('has valid non-empty translations for en, hi, and mr in each tip', () => {
    tips.forEach((tip) => {
      expect(tip.id).toBeDefined();
      expect(typeof tip.en).toBe('string');
      expect(tip.en.trim().length).toBeGreaterThan(10);

      expect(typeof tip.hi).toBe('string');
      expect(tip.hi.trim().length).toBeGreaterThan(10);

      expect(typeof tip.mr).toBe('string');
      expect(tip.mr.trim().length).toBeGreaterThan(10);
    });
  });

  it('contains no em dashes in copy', () => {
    tips.forEach((tip) => {
      expect(tip.en).not.toMatch(/—/);
      expect(tip.hi).not.toMatch(/—/);
      expect(tip.mr).not.toMatch(/—/);
    });
  });
});
