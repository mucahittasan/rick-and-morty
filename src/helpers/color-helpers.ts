import { DEFAULT_COLORS, genderColors, speciesColors, statusColors } from '@/constants/colors';
import { Character } from '@/types/api';

export const getStatusColors = (status: Character['status']) => {
  return statusColors[status] ?? DEFAULT_COLORS.status;
};

export const getSpeciesColors = (species: Character['species']) => {
  return speciesColors[species] ?? speciesColors.default ?? DEFAULT_COLORS.species;
};

export const getGenderColors = (gender: Character['gender']) => {
  return genderColors[gender] ?? genderColors.default ?? DEFAULT_COLORS.gender;
};
