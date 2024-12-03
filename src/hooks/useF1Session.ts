import { useQuery } from '@tanstack/react-query';
import { fetchCurrentSession } from '../services/openF1Api';

export function useF1Session() {
  return useQuery({
    queryKey: ['currentSession'],
    queryFn: fetchCurrentSession,
    staleTime: 5 * 60 * 1000,
    retry: 3
  });
}