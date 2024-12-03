import type { StandingsResponse } from '../types/f1';

interface F1WorldConstructor {
  id: string;
  name: string;
  nationality: string;
  points: number;
  position: number;
  wins: number;
  podiums: number;
}

export function transformF1WorldData(data: F1WorldConstructor[]): StandingsResponse {
  const constructorStandings = data.map(constructor => ({
    position: constructor.position.toString(),
    points: constructor.points.toString(),
    Constructor: {
      constructorId: normalizeConstructorId(constructor.name),
      name: formatConstructorName(constructor.name),
      nationality: constructor.nationality.toLowerCase()
    }
  }));

  return {
    MRData: {
      StandingsTable: {
        StandingsLists: [{
          ConstructorStandings: constructorStandings
        }]
      }
    }
  };
}

function formatConstructorName(name: string): string {
  const nameMapping: Record<string, string> = {
    'RB': 'Racing Bulls',
    'VCARB': 'Visa Cash App RB',
    'HAAS': 'Haas F1 Team',
    'ALFA': 'Stake F1 Team',
    'AT': 'AlphaTauri'
  };

  return nameMapping[name] || name;
}

function normalizeConstructorId(name: string): string {
  const mapping: Record<string, string> = {
    'Red Bull Racing': 'red_bull',
    'Ferrari': 'ferrari',
    'Mercedes': 'mercedes',
    'McLaren': 'mclaren',
    'Aston Martin': 'aston_martin',
    'Alpine': 'alpine',
    'Racing Bulls': 'visa_cash_app_rb',
    'Williams': 'williams',
    'Haas F1 Team': 'haas',
    'Stake F1 Team': 'sauber',
    'RB': 'visa_cash_app_rb',
    'VCARB': 'visa_cash_app_rb',
    'HAAS': 'haas',
    'ALFA': 'sauber',
    'AT': 'alphatauri'
  };

  return mapping[name] || name.toLowerCase().replace(/\s+/g, '_');
}