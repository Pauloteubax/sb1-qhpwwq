import { useQuery } from '@tanstack/react-query';
import { fetchF1Seasons } from '../services/api/apisportsApi';

export function useF1Seasons() {
  const {
    data: seasons = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['f1-seasons'],
    queryFn: fetchF1Seasons,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 3,
    refetchOnWindowFocus: false
  });

  return {
    seasons,
    loading: isLoading,
    error: error instanceof Error ? error.message : error ? 'Une erreur est survenue' : null
  };
}