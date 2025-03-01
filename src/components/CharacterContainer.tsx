'use client';

import { CharacterGrid } from '@/components/CharacterGrid';
import { Pagination } from '@/components/Pagination';
import { useCharacterFilters } from '@/hooks/useCharacterFilters';
import { useCharacters } from '@/hooks/useCharacters';
import { useCharacterStore } from '@/store/characterStore';
import { CharactersResponse } from '@/types/api';
import { useCallback, useMemo } from 'react';

interface CharacterContainerProps {
  initialData: CharactersResponse;
}

export function CharacterContainer({ initialData }: CharacterContainerProps) {
  const { filters } = useCharacterFilters({});
  const { favoriteCharacters } = useCharacterStore();

  const { data: charactersData, isLoading } = useCharacters({
    status: filters.status,
    gender: filters.gender,
    page: filters.page,
    enabled: !filters.showFavorites,
  });

  const displayData = useMemo(() => {
    if (filters.showFavorites) {
      return {
        info: {
          count: favoriteCharacters.length,
          pages: 1,
          next: null,
          prev: null,
        },
        results: favoriteCharacters,
      };
    }

    return charactersData || initialData;
  }, [charactersData, filters.showFavorites, favoriteCharacters, initialData]);

  const showEmptyState = useMemo(() => {
    if (filters.showFavorites && favoriteCharacters.length === 0) {
      return true;
    }

    return displayData.results.length === 0;
  }, [displayData.results.length, favoriteCharacters.length, filters.showFavorites]);

  const LoadingSpinner = useCallback(
    () => (
      <div className="flex h-40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
      </div>
    ),
    []
  );

  const EmptyState = useCallback(
    () => (
      <div className="py-12 text-center">
        <h2 className="mb-2 text-2xl font-bold text-white">
          {filters.showFavorites ? 'Henüz favori karakter eklenmemiş' : 'Karakter bulunamadı'}
        </h2>
        <p className="text-white/70">
          {filters.showFavorites
            ? 'Karakterleri favorilere eklemek için detaylarını görüntüleyin'
            : 'Filtreleri değiştirerek karakter bulmayı deneyin'}
        </p>
      </div>
    ),
    [filters.showFavorites]
  );

  return (
    <section>
      {isLoading && !filters.showFavorites ? (
        <LoadingSpinner />
      ) : (
        <>
          <CharacterGrid characters={displayData.results} />

          {!filters.showFavorites && displayData.info.pages > 0 && (
            <Pagination totalPages={displayData.info.pages} />
          )}

          {showEmptyState && <EmptyState />}
        </>
      )}
    </section>
  );
}
