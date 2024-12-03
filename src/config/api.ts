export const API_SPORTS_CONFIG = {
  BASE_URL: 'https://v1.formula-1.api-sports.io',
  API_KEY: '4c9231198ab431b3ea7a24b5731a5699',
  ENDPOINTS: {
    TEAMS_RANKINGS: '/rankings/teams',
    SEASONS: '/seasons',
    TEAMS: '/teams'
  }
};

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  HEADERS: {
    'x-rapidapi-host': 'v1.formula-1.api-sports.io',
    'x-rapidapi-key': API_SPORTS_CONFIG.API_KEY
  }
};