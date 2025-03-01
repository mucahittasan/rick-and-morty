'use client';

import { parseAsBoolean, parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export type FilterStatus = 'alive' | 'dead' | 'unknown' | '';
export type FilterGender = 'female' | 'male' | 'genderless' | 'unknown' | '';

export interface Filters {
  status: FilterStatus;
  gender: FilterGender;
  page: number;
  showFavorites: boolean;
}

export interface UseCharacterFiltersProps {
  onReset?: () => void;
  initialFilters?: Partial<Filters>;
  onChange?: (filters: Filters) => void;
}

const DEFAULT_FILTERS = {
  status: '',
  gender: '',
  page: 1,
  showFavorites: false,
};

export function useCharacterFilters({
  onReset,
  initialFilters = {},
  onChange,
}: UseCharacterFiltersProps = {}) {
  // Önceki filtre değerlerini izlemek için ref kullanıyoruz
  const prevStatusRef = useRef<string | null>(null);
  const prevGenderRef = useRef<string | null>(null);

  const [status, setStatus] = useQueryState(
    'status',
    parseAsString.withDefault(initialFilters.status ? initialFilters.status : 'all')
  );

  const [gender, setGender] = useQueryState(
    'gender',
    parseAsString.withDefault(initialFilters.gender ? initialFilters.gender : 'all')
  );

  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(initialFilters.page || DEFAULT_FILTERS.page)
  );

  const [showFavorites, setShowFavorites] = useQueryState(
    'favorites',
    parseAsBoolean.withDefault(initialFilters.showFavorites || DEFAULT_FILTERS.showFavorites)
  );

  // Filtre değişikliğini izleyen ve sayfa numarasını sıfırlayan özel fonksiyonlar
  const handleStatusChange = useCallback(
    (newStatus: string) => {
      // Eğer status değişiyorsa, sayfa numarasını 1'e sıfırla
      if (newStatus !== status) {
        setStatus(newStatus);
        setPage(1);
      }
    },
    [status, setStatus, setPage]
  );

  const handleGenderChange = useCallback(
    (newGender: string) => {
      // Eğer gender değişiyorsa, sayfa numarasını 1'e sıfırla
      if (newGender !== gender) {
        setGender(newGender);
        setPage(1);
      }
    },
    [gender, setGender, setPage]
  );

  // Filtre değişikliğini izleyen useEffect
  useEffect(() => {
    // Eğer status veya gender değişmişse ve sayfa 1'den büyükse, sayfa numarasını 1'e sıfırla
    if (
      (prevStatusRef.current !== null && prevStatusRef.current !== status) ||
      (prevGenderRef.current !== null && prevGenderRef.current !== gender)
    ) {
      if (page > 1) {
        setPage(1);
      }
    }

    // Ref'leri güncelle
    prevStatusRef.current = status;
    prevGenderRef.current = gender;
  }, [status, gender, page, setPage]);

  const resetFilters = useCallback(() => {
    setStatus('all');
    setGender('all');
    setPage(DEFAULT_FILTERS.page);
    setShowFavorites(DEFAULT_FILTERS.showFavorites);

    if (onReset) {
      onReset();
    }
  }, [setStatus, setGender, setPage, setShowFavorites, onReset]);

  const filters = useMemo(() => {
    let statusValue: FilterStatus = '';
    if (status !== 'all') {
      statusValue = status as FilterStatus;
    }

    let genderValue: FilterGender = '';
    if (gender !== 'all') {
      genderValue = gender as FilterGender;
    }

    return {
      status: statusValue,
      gender: genderValue,
      page,
      showFavorites,
    };
  }, [status, gender, page, showFavorites]);

  useEffect(() => {
    if (onChange) {
      onChange(filters);
    }
  }, [filters, onChange]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return {
    filters,
    setStatus: handleStatusChange,
    setGender: handleGenderChange,
    setPage,
    setShowFavorites,
    resetFilters,
  };
}
