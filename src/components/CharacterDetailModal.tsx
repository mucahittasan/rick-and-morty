'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { modalContentVariants } from '@/constants/animations';
import { DEFAULT_COLORS } from '@/constants/colors';
import { getGenderColors, getSpeciesColors, getStatusColors } from '@/helpers/color-helpers';
import { useNotifications } from '@/providers/ToastProvider';
import { useCharacterStore } from '@/store/characterStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Heart, MapPin, User, X } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useMemo } from 'react';

export const CharacterDetailModal = memo(function CharacterDetailModal() {
  const {
    selectedCharacter,
    setSelectedCharacter,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useCharacterStore();
  const { notifySuccess, notifyInfo } = useNotifications();

  const isOpen = !!selectedCharacter;
  const favorite = selectedCharacter ? isFavorite(selectedCharacter.id) : false;

  const handleClose = useCallback(() => {
    setSelectedCharacter(null);
  }, [setSelectedCharacter]);

  const handleFavoriteToggle = useCallback(() => {
    if (!selectedCharacter) return;

    if (favorite) {
      removeFromFavorites(selectedCharacter.id);
      notifyInfo('Favorilerden çıkarıldı', `${selectedCharacter.name} favorilerden çıkarıldı.`);
    } else {
      addToFavorites(selectedCharacter);
      notifySuccess('Favorilere eklendi', `${selectedCharacter.name} favorilere eklendi.`);
    }
  }, [selectedCharacter, favorite, addToFavorites, removeFromFavorites, notifySuccess, notifyInfo]);

  const statusStyle = useMemo(() => {
    if (!selectedCharacter) return DEFAULT_COLORS.status;
    return getStatusColors(selectedCharacter.status);
  }, [selectedCharacter]);

  const speciesStyle = useMemo(() => {
    if (!selectedCharacter) return DEFAULT_COLORS.species;
    return getSpeciesColors(selectedCharacter.species);
  }, [selectedCharacter]);

  const genderStyle = useMemo(() => {
    if (!selectedCharacter) return DEFAULT_COLORS.gender;
    return getGenderColors(selectedCharacter.gender);
  }, [selectedCharacter]);

  if (!selectedCharacter) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && handleClose()}>
      <DialogContent className="overflow-hidden border-none bg-black/80 p-0 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:max-w-[550px]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative"
            >
              <DialogTitle className="sr-only">{selectedCharacter.name} Detayları</DialogTitle>

              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md transition-all hover:bg-black/80 hover:text-white"
                aria-label="Kapat"
              >
                <X size={16} />
              </button>

              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="absolute right-0 bottom-0 left-0 p-6"
                >
                  <h2 className="mb-3 text-3xl font-bold text-white">{selectedCharacter.name}</h2>

                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                      className={`flex items-center gap-1.5 rounded-full border ${statusStyle.border} ${statusStyle.bg} px-3 py-1`}
                    >
                      <span
                        className={`inline-flex h-2 w-2 animate-pulse rounded-full ${statusStyle.dot}`}
                      />
                      <span className={`text-sm font-medium ${statusStyle.text}`}>
                        {selectedCharacter.status}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                      className={`flex items-center gap-1.5 rounded-full border ${speciesStyle.border} ${speciesStyle.bg} px-3 py-1`}
                    >
                      <User size={12} className={speciesStyle.text} />
                      <span className={`text-sm font-medium ${speciesStyle.text}`}>
                        {selectedCharacter.species}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.2 }}
                      className={`flex items-center gap-1.5 rounded-full border ${genderStyle.border} ${genderStyle.bg} px-3 py-1`}
                    >
                      <span className={`text-sm font-medium ${genderStyle.text}`}>
                        {selectedCharacter.gender}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="space-y-6 p-6"
              >
                <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/70">Köken</h3>
                      <p className="text-base font-medium text-white">
                        {selectedCharacter.origin.name}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/70">Son Bilinen Konum</h3>
                      <p className="text-base font-medium text-white">
                        {selectedCharacter.location.name}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/70">İlk Görüldüğü Bölüm</h3>
                      <p className="text-base font-medium text-white">{`${selectedCharacter.episode.length} bölüm`}</p>
                    </div>
                  </motion.div>
                </div>

                <DialogFooter className="flex gap-3 sm:justify-between">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    Kapat
                  </Button>

                  <Button
                    className={`relative overflow-hidden ${
                      favorite
                        ? 'border-red-400/20 bg-red-500/10 text-white hover:bg-red-500/20'
                        : 'border-purple-400/20 bg-purple-500/10 text-white hover:bg-purple-500/20'
                    }`}
                    onClick={handleFavoriteToggle}
                    aria-label={favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                  >
                    <div className="relative z-10 flex items-center justify-center gap-1.5">
                      <Heart
                        size={16}
                        className={favorite ? 'fill-red-400 text-red-400' : 'text-purple-400'}
                      />
                      <span>{favorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}</span>
                    </div>
                  </Button>
                </DialogFooter>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
});
