import { describe, it, expect, beforeEach } from 'vitest';
import helplinesData from '../src/data/helplines.json';
import { getProgress, saveProgress, getBankCareNumber, saveBankCareNumber } from '../src/services/storage';

describe('Phase 6 Help Module Tests (tests/help.test.ts)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Checklist: ticking a step saves it, and can clear all', () => {
    const p1 = getProgress();
    expect(p1.checklistTicks).toEqual([]);

    // Save ticks
    const updated = [true, false, true, false, false];
    saveProgress({
      ...p1,
      checklistTicks: updated,
    });

    const p2 = getProgress();
    expect(p2.checklistTicks).toEqual(updated);

    // Reset ticks (Start over)
    const reset = [false, false, false, false, false];
    saveProgress({
      ...p2,
      checklistTicks: reset,
    });
    expect(getProgress().checklistTicks).toEqual(reset);
  });

  it('Helplines: 1930 is the first item under Money lost or fraud happening', () => {
    const fraudCat = helplinesData.categories.find((c) => c.id === 'fraud');
    expect(fraudCat).toBeDefined();
    expect(fraudCat?.entries.length).toBeGreaterThan(0);
    expect(fraudCat?.entries[0].id).toBe('1930');
    expect(fraudCat?.entries[0].number).toBe('1930');
  });

  it('Helplines: every data row has a number, url, placeholder or isUserStoredBank flag; no row is blank', () => {
    for (const cat of helplinesData.categories) {
      expect(cat.entries.length).toBeGreaterThan(0);
      for (const entry of cat.entries) {
        const hasValidAction =
          Boolean((entry as any).number) ||
          Boolean((entry as any).url) ||
          Boolean((entry as any).placeholder) ||
          Boolean((entry as any).isUserStoredBank);
        expect(hasValidAction).toBe(true);
      }
    }
  });

  it('Bank care number: saved only to storage, retrievable', () => {
    expect(getBankCareNumber()).toBe('');
    saveBankCareNumber('18004253800');
    expect(getBankCareNumber()).toBe('18004253800');
  });
});
