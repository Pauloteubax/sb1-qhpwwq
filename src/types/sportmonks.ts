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

export interface F1Season {
  id: number;
  year: number;
  name: string;
  current: boolean;
  start_date: string;
  end_date: string;
}

export interface F1TeamResponse {
  data: F1Team[];
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
}

export interface F1SeasonResponse {
  data: F1Season[];
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
}

export interface PositionChange {
  type: 'up' | 'down' | 'same';
  value: number;
}