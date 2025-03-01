'use client';

import { getSpeciesColors, getStatusColors } from '@/helpers/color-helpers';
import { useNotifications } from '@/providers/ToastProvider';
import { useCharacterStore } from '@/store/characterStore';
import { Character } from '@/types/api';
import { Heart, Info } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useMemo } from 'react';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = memo(function CharacterCard({ character }: CharacterCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite, setSelectedCharacter } =
    useCharacterStore();
  const { notifySuccess, notifyInfo } = useNotifications();

  const favorite = isFavorite(character.id);

  const statusStyle = useMemo(() => getStatusColors(character.status), [character.status]);
  const speciesStyle = useMemo(() => getSpeciesColors(character.species), [character.species]);

  const handleFavoriteToggle = useCallback(() => {
    if (favorite) {
      removeFromFavorites(character.id);
      notifyInfo('Favorilerden çıkarıldı', `${character.name} favorilerden çıkarıldı.`);
    } else {
      addToFavorites(character);
      notifySuccess('Favorilere eklendi', `${character.name} favorilere eklendi.`);
    }
  }, [favorite, character, addToFavorites, removeFromFavorites, notifySuccess, notifyInfo]);

  const handleShowDetails = useCallback(() => {
    setSelectedCharacter(character);
  }, [character, setSelectedCharacter]);

  return (
    <div className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 shadow-md transition-colors hover:bg-black/50">
        <div className="relative mb-5 overflow-hidden rounded-xl shadow-md">
          <div className="aspect-square">
            <Image
              src={character.image}
              alt={character.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform hover:scale-105"
              loading="lazy"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div
            className={`absolute bottom-3 left-3 flex items-center gap-2 rounded-full ${statusStyle.bg} ${statusStyle.border} border px-3 py-1.5`}
          >
            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${statusStyle.dot}`} />
            <span className={`text-xs font-medium ${statusStyle.text}`}>{character.status}</span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90">
            <span>#{character.id}</span>
          </div>

          {favorite && (
            <div className="absolute top-3 left-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-400/30 bg-black/60">
                <Heart size={14} className="fill-red-400 text-red-400" />
              </div>
            </div>
          )}
        </div>

        <div className="mb-5 flex-grow">
          <div className="mb-4">
            <h3 className="mb-2 text-xl font-bold text-white">{character.name}</h3>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full ${speciesStyle.bg} ${speciesStyle.border} border px-2.5 py-0.5 text-xs font-medium ${speciesStyle.text}`}
              >
                {character.species}
              </span>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-medium text-white/70">Cinsiyet</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white">
                {character.gender}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-medium text-white/70">Köken</span>
              <span className="line-clamp-1 max-w-[150px] rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white">
                {character.origin.name}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/70">Konum</span>
              <span className="line-clamp-1 max-w-[150px] rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white">
                {character.location.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 rounded-lg border border-blue-400/20 bg-blue-500/10 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-blue-500/20"
            onClick={handleShowDetails}
            aria-label={`${character.name} detaylarını göster`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <Info size={14} className="text-blue-400" />
              <span>Detaylar</span>
            </div>
          </button>

          <button
            className={`flex-1 rounded-lg border px-4 py-2.5 text-xs font-medium text-white transition-colors ${
              favorite
                ? 'border-red-400/20 bg-red-500/10 hover:bg-red-500/20'
                : 'border-purple-400/20 bg-purple-500/10 hover:bg-purple-500/20'
            }`}
            onClick={handleFavoriteToggle}
            aria-label={
              favorite
                ? `${character.name} favorilerden çıkar`
                : `${character.name} favorilere ekle`
            }
          >
            <div className="flex items-center justify-center gap-1.5">
              <Heart
                size={14}
                className={favorite ? 'fill-red-400 text-red-400' : 'text-purple-400'}
              />
              <span>{favorite ? 'Çıkar' : 'Favorile'}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});
