import { getCharacters } from '@/services/api';
import { CharacterFilters } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

interface UseCharactersOptions extends CharacterFilters {
  enabled?: boolean;
}

export function useCharacters(options: UseCharactersOptions) {
  const { enabled = true, ...filters } = options;

  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => getCharacters(filters),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    enabled,
  });
}
