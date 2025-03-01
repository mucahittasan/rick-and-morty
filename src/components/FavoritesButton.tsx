'use client';

import { Button } from '@/components/ui/button';
import { useCharacterFilters } from '@/hooks/useCharacterFilters';
import { useCharacterStore } from '@/store/characterStore';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FavoritesButton() {
  const { favoriteCharacters } = useCharacterStore();
  const { filters, setShowFavorites } = useCharacterFilters({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(favoriteCharacters.length);
  }, [favoriteCharacters]);

  const handleClick = () => {
    setShowFavorites(!filters.showFavorites);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative ml-4"
      onClick={handleClick}
      aria-label={filters.showFavorites ? 'Tüm karakterleri göster' : 'Favorileri göster'}
    >
      <Heart className={`h-5 w-5 ${filters.showFavorites ? 'fill-red-500 text-red-500' : ''}`} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {count}
        </span>
      )}
    </Button>
  );
}
