import { Character } from '@/types/api';

export interface StatusColorStyle {
  dot: string;
  text: string;
  glow: string;
  border: string;
  bg: string;
  hoverBg: string;
}

export interface SpeciesColorStyle {
  bg: string;
  text: string;
  border: string;
}

export interface GenderColorStyle {
  bg: string;
  text: string;
  border: string;
}

export const DEFAULT_COLORS = {
  status: {
    dot: 'bg-purple-400',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_12px_rgba(192,132,252,0.8)]',
    border: 'border-purple-400/30',
    bg: 'bg-purple-400/10',
    hoverBg: 'hover:bg-purple-600',
  } as StatusColorStyle,

  species: {
    bg: 'bg-teal-500/20',
    text: 'text-teal-400',
    border: 'border-teal-400/30',
  } as SpeciesColorStyle,

  gender: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
    border: 'border-gray-400/30',
  } as GenderColorStyle,
};

export const statusColors: Record<Character['status'], StatusColorStyle> = {
  Alive: {
    dot: 'bg-green-400',
    text: 'text-green-400',
    glow: 'shadow-[0_0_12px_rgba(74,222,128,0.8)]',
    border: 'border-green-400/30',
    bg: 'bg-green-400/10',
    hoverBg: 'hover:bg-green-600',
  },
  Dead: {
    dot: 'bg-red-400',
    text: 'text-red-400',
    glow: 'shadow-[0_0_12px_rgba(248,113,113,0.8)]',
    border: 'border-red-400/30',
    bg: 'bg-red-400/10',
    hoverBg: 'hover:bg-red-600',
  },
  unknown: {
    dot: 'bg-purple-400',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_12px_rgba(192,132,252,0.8)]',
    border: 'border-purple-400/30',
    bg: 'bg-purple-400/10',
    hoverBg: 'hover:bg-purple-600',
  },
};

export const speciesColors: Record<string, SpeciesColorStyle> = {
  Human: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-400/30',
  },
  Alien: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-400/30',
  },
  Robot: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-400/30',
  },
  'Mythological Creature': {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-400/30',
  },
  default: {
    bg: 'bg-teal-500/20',
    text: 'text-teal-400',
    border: 'border-teal-400/30',
  },
};

export const genderColors: Record<string, GenderColorStyle> = {
  Male: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-400/30',
  },
  Female: {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-400/30',
  },
  Genderless: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-400/30',
  },
  unknown: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
    border: 'border-gray-400/30',
  },
  default: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
    border: 'border-gray-400/30',
  },
};
