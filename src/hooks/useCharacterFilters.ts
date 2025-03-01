'use client';

import { parseAsBoolean, parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo } from 'react';

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

  const resetFilters = useCallback(() => {
    setStatus('all');
    setGender('all');
    setPage(DEFAULT_FILTERS.page);
    setShowFavorites(DEFAULT_FILTERS.showFavorites);

    if (onReset) {
      onReset();
    }
  }, [setStatus, setGender, setPage, setShowFavorites, onReset]);

  const filters = useMemo(
    () => ({
      status: status === 'all' ? '' : (status as FilterStatus),
      gender: gender === 'all' ? '' : (gender as FilterGender),
      page,
      showFavorites,
    }),
    [status, gender, page, showFavorites]
  );

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
    setStatus,
    setGender,
    setPage,
    setShowFavorites,
    resetFilters,
  };
}
