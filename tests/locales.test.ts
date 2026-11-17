import { describe, it, expect } from 'vitest';
import en from '../src/locales/en.json';
import hi from '../src/locales/hi.json';
import mr from '../src/locales/mr.json';

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys = keys.concat(getKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

describe('Locales parity', () => {
  const enKeys = getKeys(en);
  const hiKeys = getKeys(hi);
  const mrKeys = getKeys(mr);

  it('contains expected core keys in en.json', () => {
    expect(enKeys).toContain('appName');
    expect(enKeys).toContain('greeting');
    expect(enKeys).toContain('coreRule');
    expect(enKeys).toContain('panic.text');
  });

  it('has identical keys in en and hi', () => {
    expect(hiKeys).toEqual(enKeys);
  });

  it('has identical keys in en and mr', () => {
    expect(mrKeys).toEqual(enKeys);
  });
});
