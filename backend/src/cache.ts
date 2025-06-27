type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<any>>();
const TTL = 15 * 60 * 1000; // 15 minutes in ms

export function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const now = Date.now();
  if (entry.expiresAt < now) {
    cache.delete(key); // TTL expired
    return null;
  }

  return entry.value;
}

export function setInCache<T>(key: string, value: T): void {
  cache.set(key, {
    value,
    expiresAt: Date.now() + TTL
  });
}

export function clearCache(): void {
  cache.clear();
}
