'use client';

import { getSpeciesColors, getStatusColors } from '@/helpers/color-helpers';
import { useCardAnimation } from '@/hooks/useCardAnimation';
import { useNotifications } from '@/providers/ToastProvider';
import { useCharacterStore } from '@/store/characterStore';
import { Character } from '@/types/api';
import { motion } from 'framer-motion';
import { Heart, Info, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useMemo, useRef } from 'react';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = memo(function CharacterCard({ character }: CharacterCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite, setSelectedCharacter } =
    useCharacterStore();
  const { notifySuccess, notifyInfo } = useNotifications();

  const favorite = isFavorite(character.id);
  const cardRef = useRef<HTMLDivElement>(null);

  const { rotateX, rotateY, spotlightX, spotlightY, handleMouseMove, handleMouseLeave } =
    useCardAnimation({ cardRef });

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
    <motion.div
      className="h-full perspective-[1200px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        ref={cardRef}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:bg-black/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div
          className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(800px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.15), transparent 40%)`,
          }}
        />

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        <motion.div
          className="relative mb-5 overflow-hidden rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-white/20"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="aspect-square">
            <Image
              src={character.image}
              alt={character.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`absolute bottom-3 left-3 flex items-center gap-2 rounded-full ${statusStyle.bg} ${statusStyle.border} border px-3 py-1.5 backdrop-blur-md ${statusStyle.glow}`}
          >
            <span
              className={`inline-flex h-2.5 w-2.5 animate-pulse rounded-full ${statusStyle.dot}`}
            />
            <span className={`text-xs font-medium ${statusStyle.text}`}>{character.status}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-md"
          >
            <Sparkles size={10} className="text-yellow-400" />
            <span>#{character.id}</span>
          </motion.div>

          {favorite && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 left-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-400/30 bg-black/60 shadow-[0_0_15px_rgba(248,113,113,0.5)] backdrop-blur-md">
                <Heart size={14} className="fill-red-400 text-red-400" />
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div className="mb-5 flex-grow" style={{ transform: 'translateZ(30px)' }}>
          <div className="mb-4">
            <motion.h3
              className="mb-2 text-xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {character.name}
            </motion.h3>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span
                className={`rounded-full ${speciesStyle.bg} ${speciesStyle.border} border px-2.5 py-0.5 text-xs font-medium ${speciesStyle.text}`}
              >
                {character.species}
              </span>
            </motion.div>
          </div>

          <motion.div
            className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ transform: 'translateZ(20px)' }}
          >
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
          </motion.div>
        </motion.div>

        <motion.div className="flex gap-3" style={{ transform: 'translateZ(50px)' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex-1 overflow-hidden rounded-lg border border-blue-400/20 bg-blue-500/10 px-4 py-2.5 text-xs font-medium text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm transition-all hover:bg-blue-500/20"
            onClick={handleShowDetails}
            aria-label={`${character.name} detaylarını göster`}
          >
            <div className="relative z-10 flex items-center justify-center gap-1.5">
              <Info size={14} className="text-blue-400" />
              <span>Detaylar</span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex-1 overflow-hidden rounded-lg border px-4 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition-all ${
              favorite
                ? 'border-red-400/20 bg-red-500/10 shadow-[0_0_15px_rgba(248,113,113,0.3)] hover:bg-red-500/20'
                : 'border-purple-400/20 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:bg-purple-500/20'
            }`}
            onClick={handleFavoriteToggle}
            aria-label={
              favorite
                ? `${character.name} favorilerden çıkar`
                : `${character.name} favorilere ekle`
            }
          >
            <div className="relative z-10 flex items-center justify-center gap-1.5">
              <Heart
                size={14}
                className={favorite ? 'fill-red-400 text-red-400' : 'text-purple-400'}
              />
              <span>{favorite ? 'Çıkar' : 'Favorile'}</span>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});
