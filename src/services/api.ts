import { CharacterFilters, CharactersResponse } from '@/types/api';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(filters: CharacterFilters): Promise<CharactersResponse> {
  const queryParams = new URLSearchParams();

  if (filters.status) {
    queryParams.append('status', filters.status.toLowerCase());
  }

  if (filters.gender) {
    queryParams.append('gender', filters.gender.toLowerCase());
  }

  if (filters.page && filters.page > 0) {
    queryParams.append('page', filters.page.toString());
  }

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  const response = await fetch(`${API_BASE_URL}/character${queryString}`);

  if (!response.ok) {
    if (response.status === 404) {
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
