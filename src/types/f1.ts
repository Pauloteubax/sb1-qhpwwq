export interface F1Team {
  id: number;
  name: string;
  nationality: string;
  logo_url: string;
  points: number;
  position: number;
  wins: number;
  podiums: number;
}

export interface PositionChange {
  type: 'up' | 'down' | 'same';
  value: number;
}