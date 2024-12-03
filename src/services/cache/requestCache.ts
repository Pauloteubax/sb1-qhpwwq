import { F1Team } from '../../types/f1';
import { F1Season } from '../../types/apisports';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class RequestCache {
  private static instance: RequestCache;
  private cache: Map<string, CacheItem<any>>;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): RequestCache {
    if (!RequestCache.instance) {
      RequestCache.instance = new RequestCache();
    }
    return RequestCache.instance;
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

    const isExpired = Date.now() - item.timestamp > this.CACHE_DURATION;
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

export const requestCache = RequestCache.getInstance();