import axios, { AxiosError } from 'axios';
import { SPORTMONKS_API_CONFIG, API_CONFIG } from '../../config/api';
import { handleApiError } from '../../utils/errorHandling';
import type { F1Team, F1TeamResponse, F1Season, F1SeasonResponse } from '../../types/sportmonks';

const api = axios.create({
  baseURL: SPORTMONKS_API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
  params: {
    api_token: SPORTMONKS_API_CONFIG.API_TOKEN
  }
});

export async function fetchF1Teams(seasonId?: number): Promise<F1Team[]> {
  try {
    const params = seasonId ? { season_id: seasonId } : undefined;
    const { data } = await api.get<F1TeamResponse>(SPORTMONKS_API_CONFIG.ENDPOINTS.TEAMS, { params });
    return data.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
}

export async function fetchF1Seasons(): Promise<F1Season[]> {
  try {
    const { data } = await api.get<F1SeasonResponse>(SPORTMONKS_API_CONFIG.ENDPOINTS.SEASONS);
    return data.data.sort((a, b) => b.year - a.year);
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
}

export async function fetchTeamDetails(teamId: number): Promise<F1Team> {
  try {
    const { data } = await api.get<{ data: F1Team }>(
      SPORTMONKS_API_CONFIG.ENDPOINTS.TEAM_DETAILS(teamId)
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
}