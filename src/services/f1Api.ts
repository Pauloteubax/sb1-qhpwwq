import { getMockStandings } from './mockData';
import type { ConstructorStanding } from '../types/f1';
import { standingsCache } from './cache';
import { F1_CONSTANTS } from '../constants/f1Data';

const USE_MOCK_DATA = true; // Temporairement à true pour utiliser les données mockées

export async function fetchConstructorStandings(year: number): Promise<ConstructorStanding[]> {
  try {
    if (USE_MOCK_DATA) {
      const mockData = getMockStandings(year);
      return mockData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    }

    const cachedData = standingsCache.get();
    if (cachedData) {
      return cachedData;
    }

    const response = await fetch(F1_CONSTANTS.API_ENDPOINTS.STANDINGS(year));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const standings = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings;

    if (!standings) {
      throw new Error(`Aucune donnée disponible pour la saison ${year}`);
    }

    standingsCache.set(standings);
    return standings;
  } catch (error) {
    console.error('Error loading standings:', error);
    throw new Error('Erreur lors de la récupération des données. Veuillez réessayer.');
  }
}