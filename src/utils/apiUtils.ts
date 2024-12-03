import { isNetworkError } from './errorHandling';

interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  timeout: number;
  backoffFactor: number;
  jitter: boolean;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  timeout: 15000,
  backoffFactor: 2,
  jitter: true,
};

export async function fetchWithRetry<T>(
  url: string,
  apiKey: string,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: Error;
  let attempt = 0;

  while (attempt < retryConfig.maxRetries) {
    try {
      const response = await axios.get<T>(url, {
        params: { api_key: apiKey },
        timeout: retryConfig.timeout,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      return response.data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error occurred');

      if (error.response?.status === 429) {
        // Rate limit atteint, attendre plus longtemps
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      }

      if (!isNetworkError(lastError) && error.response?.status !== 500) {
        throw lastError;
      }

      if (attempt === retryConfig.maxRetries - 1) {
        throw lastError;
      }

      const delay = Math.min(
        retryConfig.initialDelay * Math.pow(retryConfig.backoffFactor, attempt),
        retryConfig.maxDelay
      );

      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    }
  }

  throw lastError!;
}