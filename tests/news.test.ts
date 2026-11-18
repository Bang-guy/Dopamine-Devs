import { describe, it, expect } from 'vitest';
import news from '../src/data/news.json';

describe('Cyber fraud news data', () => {
  it('contains at least 3 news articles', () => {
    expect(news.length).toBeGreaterThanOrEqual(3);
  });

  it('each article has a valid title, source, and https url', () => {
    news.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.title.length).toBeGreaterThan(10);
      expect(item.source.length).toBeGreaterThan(2);
      expect(item.url).toMatch(/^https:\/\//);
    });
  });
});
