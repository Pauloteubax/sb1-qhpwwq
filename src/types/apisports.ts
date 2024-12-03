export interface F1TeamRanking {
  position: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  season: number;
}

export interface F1Season {
  id: number;
  year: number;
  name: string;
  current: boolean;
}

export interface ApiResponse<T> {
  get: string;
  parameters: Record<string, string>;
  errors: string[];
  results: number;
  response: T[];
}