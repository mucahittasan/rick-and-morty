'use client';

import { CharacterGrid } from '@/components/CharacterGrid';
import { Pagination } from '@/components/Pagination';
import { useCharacterFilters } from '@/hooks/useCharacterFilters';
import { useCharacters } from '@/hooks/useCharacters';
import { useCharacterStore } from '@/store/characterStore';
import { CharactersResponse } from '@/types/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface CharacterContainerProps {
  initialData: CharactersResponse;
}

export function CharacterContainer({ initialData }: CharacterContainerProps) {
  const { filters, setPage, resetFilters } = useCharacterFilters({});
  const { favoriteCharacters } = useCharacterStore();
  const [isFiltering, setIsFiltering] = useState(false);
  const [pageOutOfRange, setPageOutOfRange] = useState(false);
  const [filterError, setFilterError] = useState(false);
  const [filterChanged, setFilterChanged] = useState(false);

  // Önceki filtre değerlerini izlemek için ref kullanıyoruz
  const prevFiltersRef = useRef({
    status: '',
    gender: '',
    page: 1,
  });

  // URL'den doğrudan sayfa numarası girildiğinde, sayfa numarasının geçerli olup olmadığını kontrol et
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');

    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10);
      if (isNaN(pageNumber) || pageNumber <= 0) {
        setPage(1);
      }
    }
  }, [setPage]);

  // Filtre değişikliğini izle ve kullanıcıya bilgi ver
  useEffect(() => {
    // Filtre değişikliği olduğunda ve sayfa numarası değiştiğinde
    if (
      (prevFiltersRef.current.status !== filters.status ||
        prevFiltersRef.current.gender !== filters.gender) &&
      prevFiltersRef.current.page > 1
    ) {
      setFilterChanged(true);

      // 3 saniye sonra uyarıyı kaldır
      const timer = setTimeout(() => {
        setFilterChanged(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    // Ref'leri güncelle
    prevFiltersRef.current = {
      status: filters.status,
      gender: filters.gender,
      page: filters.page,
    };
  }, [filters.status, filters.gender, filters.page]);

  const { data: charactersData, isLoading } = useCharacters({
    status: filters.status,
    gender: filters.gender,
    page: filters.page,
    enabled: !filters.showFavorites,
  });

  // Sayfa dışı durumunu ve filtre hatalarını kontrol et
  useEffect(() => {
    if (charactersData) {
      // Sayfa dışı durumu
      if (charactersData.info.pages > 0 && filters.page > charactersData.info.pages) {
        setPageOutOfRange(true);
        // Otomatik olarak ilk sayfaya dön
        setPage(1);
      } else {
        setPageOutOfRange(false);
      }

      // Filtre hatası durumu - sonuç yoksa ve filtreler aktifse
      if (
        charactersData.results.length === 0 &&
        (filters.status || filters.gender) &&
        !filters.showFavorites
      ) {
        setFilterError(true);
      } else {
        setFilterError(false);
      }
    }
  }, [
    charactersData,
    filters.page,
    filters.status,
    filters.gender,
    filters.showFavorites,
    setPage,
  ]);

  // Filtreleme işlemi yapıldığında bir animasyon göstermek için
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [filters.status, filters.gender]);

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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    ),
    []
  );

  const EmptyState = useCallback(
    () => (
      <div className="py-12 text-center">
        <h2 className="mb-2 text-2xl font-bold text-white">
          {filters.showFavorites
            ? 'Henüz favori karakter eklenmemiş'
            : pageOutOfRange
              ? 'Sayfa bulunamadı'
              : filterError
                ? 'Bu filtrelerle karakter bulunamadı'
                : 'Karakter bulunamadı'}
        </h2>
        <p className="text-white/70">
          {filters.showFavorites
            ? 'Karakterleri favorilere eklemek için detaylarını görüntüleyin'
            : pageOutOfRange
              ? 'İstediğiniz sayfa mevcut değil, ilk sayfaya yönlendirildiniz'
              : filterError
                ? 'Farklı filtreler deneyebilir veya filtreleri sıfırlayabilirsiniz'
                : 'Filtreleri değiştirerek karakter bulmayı deneyin'}
        </p>
        {filterError && (
          <button
            onClick={resetFilters}
            className="mt-4 rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600"
          >
            Filtreleri Sıfırla
          </button>
        )}
      </div>
    ),
    [filters.showFavorites, pageOutOfRange, filterError, resetFilters]
  );

  return (
    <section>
      {(isLoading || isFiltering) && !filters.showFavorites ? (
        <LoadingSpinner />
      ) : (
        <>
          {filterChanged && (
            <div className="fade-in mb-4 rounded-lg bg-blue-500/20 p-3 text-center text-blue-200">
              <p>Filtre değişikliği nedeniyle ilk sayfaya yönlendirildiniz.</p>
            </div>
          )}

          {pageOutOfRange && (
            <div className="mb-4 rounded-lg bg-yellow-500/20 p-3 text-center text-yellow-200">
              <p>İstediğiniz sayfa bulunamadı. İlk sayfaya yönlendirildiniz.</p>
            </div>
          )}

          {filterError && (
            <div className="mb-4 rounded-lg bg-red-500/20 p-3 text-center text-red-200">
              <p>Seçtiğiniz filtrelerle eşleşen karakter bulunamadı.</p>
              <button
                onClick={resetFilters}
                className="mt-2 rounded-lg bg-red-500/30 px-4 py-1 text-sm font-medium text-white hover:bg-red-500/50"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          )}

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
