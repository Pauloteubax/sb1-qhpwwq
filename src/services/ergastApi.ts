import axios from 'axios';
import { ERGAST_API_CONFIG } from '../config/api';
import type { ConstructorStanding, StandingsResponse } from '../types/f1';
import { standingsCache } from './cache';

const api = axios.create({
  baseURL: ERGAST_API_CONFIG.BASE_URL,
  ...ERGAST_API_CONFIG.REQUEST_CONFIG
});

export async function fetchConstructorStandings(year: number): Promise<ConstructorStanding[]> {
  const cacheKey = `standings_${year}`;
  const cachedData = standingsCache.get();
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const endpoint = year === new Date().getFullYear()
      ? ERGAST_API_CONFIG.ENDPOINTS.CURRENT_STANDINGS
      : ERGAST_API_CONFIG.ENDPOINTS.CONSTRUCTOR_STANDINGS(year);

    const { data } = await api.get<StandingsResponse>(endpoint);
    
    const standings = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings;
    
    if (!standings || standings.length === 0) {
      throw new Error(`Aucune donnée disponible pour la saison ${year}`);
    }

    standingsCache.set(standings);
    return standings;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`Aucune donnée disponible pour la saison ${year}`);
      }
      throw new Error('Erreur lors de la récupération des données. Veuillez réessayer.');
    }
    throw error;
  }
}