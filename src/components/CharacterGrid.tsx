'use client';

import { CharacterCard } from '@/components/CharacterCard';
import { gridContainerVariants, gridItemVariants } from '@/constants/animations';
import { Character } from '@/types/api';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface CharacterGridProps {
  characters: Character[];
}

export const CharacterGrid = memo(function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((character, index) => (
        <motion.div key={character.id} variants={gridItemVariants} custom={index} layout>
          <CharacterCard character={character} />
        </motion.div>
      ))}
    </motion.div>
  );
});
