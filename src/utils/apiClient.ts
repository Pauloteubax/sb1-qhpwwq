import { fetchWithRetry } from './apiUtils';

class ApiClient {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async fetch(url: string): Promise<Response> {
    const cached = this.cache.get(url);
    const now = Date.now();

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return new Response(JSON.stringify(cached.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetchWithRetry(url);
    const data = await response.clone().json();
    
    this.cache.set(url, {
      data,
      timestamp: now
    });

    return response;
  }

  clearCache() {
    this.cache.clear();
  }
}

export const apiClient = new ApiClient();