import { useQuery } from '@tanstack/react-query';
import { fetchConstructorStandings } from '../services/ergastApi';
import type { ConstructorStanding, PositionChange } from '../types/f1';

export function useF1Standings(selectedYear: number) {
  const { data: standings = [], isLoading, error, refetch } = useQuery({
    queryKey: ['standings', selectedYear],
    queryFn: () => fetchConstructorStandings(selectedYear),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    refetchOnWindowFocus: false
  });

  const getPositionChange = (constructor: ConstructorStanding): PositionChange | null => {
    if (!standings || standings.length === 0) return null;

    const currentPosition = parseInt(constructor.position);
    const previousIndex = standings.findIndex(
      (c) => c.Constructor.constructorId === constructor.Constructor.constructorId
    );

    if (previousIndex === -1) return null;

    const difference = previousIndex + 1 - currentPosition;

    if (difference > 0) return { type: 'up', value: difference };
    if (difference < 0) return { type: 'down', value: Math.abs(difference) };
    return { type: 'same', value: 0 };
  };

  return {
    standings,
    loading: isLoading,
    error: error instanceof Error ? error.message : error ? 'Une erreur est survenue' : null,
    getPositionChange,
    retryLoadStandings: refetch
  };
}