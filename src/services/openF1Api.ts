import axios from 'axios';
import { OPENF1_API_CONFIG } from '../config/api';
import type { Constructor, ConstructorStanding } from '../types/f1';

const api = axios.create({
  baseURL: OPENF1_API_CONFIG.BASE_URL,
  timeout: 10000
});

export async function fetchCurrentSession(): Promise<number | null> {
  try {
    const { data } = await api.get(OPENF1_API_CONFIG.ENDPOINTS.SESSIONS, {
      params: {
        year: new Date().getFullYear(),
        type: 'Race',
        order: 'desc',
        limit: 1
      }
    });

    return data[0]?.session_id || null;
  } catch (error) {
    console.error('Error fetching current session:', error);
    return null;
  }
}

export async function fetchConstructors(sessionId: number): Promise<Constructor[]> {
  const { data } = await api.get(OPENF1_API_CONFIG.ENDPOINTS.CONSTRUCTORS, {
    params: { session_id: sessionId }
  });

  return data.map((constructor: any) => ({
    constructorId: constructor.constructor_id.toString(),
    name: constructor.constructor_name,
    nationality: constructor.constructor_nationality || 'Unknown'
  }));
}

export async function fetchConstructorStandings(sessionId: number): Promise<ConstructorStanding[]> {
  const { data } = await api.get(OPENF1_API_CONFIG.ENDPOINTS.CONSTRUCTOR_STANDINGS, {
    params: { session_id: sessionId }
  });

  return data.map((standing: any) => ({
    position: standing.position.toString(),
    points: standing.points.toString(),
    Constructor: {
      constructorId: standing.constructor_id.toString(),
      name: standing.constructor_name,
      nationality: standing.constructor_nationality || 'Unknown'
    }
  }));
}