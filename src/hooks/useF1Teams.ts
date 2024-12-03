import { useQuery } from '@tanstack/react-query';
import { fetchF1TeamRankings } from '../services/api/apisportsApi';
import type { F1Team, PositionChange } from '../types/f1';

export function useF1Teams(season?: number) {
  const {
    data: teams = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['f1-teams', season],
    queryFn: () => fetchF1TeamRankings(season),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!season
  });

  const getPositionChange = (team: F1Team): PositionChange | null => {
    if (!teams || teams.length === 0) return null;

    const currentPosition = team.position;
    const previousIndex = teams.findIndex((t) => t.id === team.id);

    if (previousIndex === -1) return null;

    const difference = previousIndex + 1 - currentPosition;

    if (difference > 0) return { type: 'up', value: difference };
    if (difference < 0) return { type: 'down', value: Math.abs(difference) };
    return { type: 'same', value: 0 };
  };

  return {
    teams,
    loading: isLoading,
    error: error instanceof Error ? error.message : error ? 'Une erreur est survenue' : null,
    getPositionChange,
    retryLoadTeams: refetch
  };
}