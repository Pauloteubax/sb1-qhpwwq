import axios, { AxiosError } from 'axios';
import { API_SPORTS_CONFIG, API_CONFIG } from '../../config/api';
import { handleApiError } from '../../utils/errorHandling';
import type { ApiResponse, F1TeamRanking, F1Season } from '../../types/apisports';
import type { F1Team } from '../../types/f1';
import { requestCache } from '../cache/requestCache';

const api = axios.create({
  baseURL: API_SPORTS_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
});

async function makeRequest<T>(key: string, request: () => Promise<T>): Promise<T> {
  const cachedData = requestCache.get<T>(key);
  if (cachedData) {
    return cachedData;
  }

  const data = await request();
  requestCache.set(key, data);
  return data;
}

export async function fetchF1TeamRankings(season?: number): Promise<F1Team[]> {
  const currentSeason = season || new Date().getFullYear();
  const cacheKey = `teams_${currentSeason}`;

  return makeRequest(cacheKey, async () => {
    try {
      const { data } = await api.get<ApiResponse<F1TeamRanking>>(
        API_SPORTS_CONFIG.ENDPOINTS.TEAMS_RANKINGS,
        { params: { season: currentSeason } }
      );

      if (data.errors.length > 0) {
        throw new Error(data.errors.join(', '));
      }

      return data.response.map(ranking => ({
        id: ranking.team.id,
        name: ranking.team.name,
        logo_url: ranking.team.logo,
        points: ranking.points,
        position: ranking.position,
        nationality: getNationalityFromTeam(ranking.team.name),
        wins: 0,
        podiums: 0
      }));
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  });
}

export async function fetchF1Seasons(): Promise<F1Season[]> {
  const cacheKey = 'seasons';

  return makeRequest(cacheKey, async () => {
    try {
      const { data } = await api.get<ApiResponse<{ year: number }>>(
        API_SPORTS_CONFIG.ENDPOINTS.SEASONS
      );
      
      if (data.errors.length > 0) {
        throw new Error(data.errors.join(', '));
      }

      const currentYear = new Date().getFullYear();
      return data.response
        .filter(season => season.year >= 2010 && season.year <= currentYear)
        .map(season => ({
          id: season.year,
          year: season.year,
          name: `${season.year} Season`,
          current: season.year === currentYear
        }))
        .sort((a, b) => b.year - a.year);
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  });
}

function getNationalityFromTeam(teamName: string): string {
  const nationalityMap: Record<string, string> = {
    'Red Bull Racing': 'austrian',
    'Ferrari': 'italian',
    'Mercedes': 'german',
    'McLaren': 'british',
    'Aston Martin': 'british',
    'Alpine F1 Team': 'french',
    'Williams': 'british',
    'Haas F1 Team': 'american',
    'Kick Sauber': 'swiss',
    'Visa Cash App RB': 'italian',
    'Force India': 'indian',
    'Toro Rosso': 'italian',
    'Racing Point': 'british',
    'Renault': 'french',
    'Lotus F1': 'british',
    'Sauber': 'swiss',
    'Manor Marussia': 'british',
    'Caterham': 'malaysian',
    'HRT': 'spanish',
    'Virgin': 'british'
  };

  return nationalityMap[teamName] || 'unknown';
}