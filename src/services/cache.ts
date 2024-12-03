import { ConstructorStanding } from '../types/f1';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export class BrowserCache {
  private static instance: BrowserCache;
  private cache: Map<string, CacheItem<any>>;

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): BrowserCache {
    if (!BrowserCache.instance) {
      BrowserCache.instance = new BrowserCache();
    }
    return BrowserCache.instance;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const standingsCache = {
  key: 'constructor_standings',
  get: (): ConstructorStanding[] | null => {
    return BrowserCache.getInstance().get(standingsCache.key);
  },
  set: (data: ConstructorStanding[]): void => {
    BrowserCache.getInstance().set(standingsCache.key, data);
  }
};