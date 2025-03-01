import { Character } from '@/types/api';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CharacterSlice {
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
}

interface FavoritesSlice {
  favoriteCharacters: Character[];
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
  resetFavorites: () => void;
}

interface CharacterState extends CharacterSlice, FavoritesSlice {}

type SetState = (
  partial:
    | CharacterState
    | Partial<CharacterState>
    | ((state: CharacterState) => CharacterState | Partial<CharacterState>),
  replace?: boolean
) => void;

type GetState = () => CharacterState;

const createCharacterSlice = (set: SetState): CharacterSlice => ({
  selectedCharacter: null,
  setSelectedCharacter: (character: Character | null) => set({ selectedCharacter: character }),
});

const createFavoritesSlice = (set: SetState, get: GetState): FavoritesSlice => ({
  favoriteCharacters: [],

  addToFavorites: (character: Character) => {
    const { favoriteCharacters } = get();
    if (!favoriteCharacters.some((c: Character) => c.id === character.id)) {
      set({ favoriteCharacters: [...favoriteCharacters, character] });
    }
  },

  removeFromFavorites: (characterId: number) => {
    const { favoriteCharacters } = get();
    set({
      favoriteCharacters: favoriteCharacters.filter((c: Character) => c.id !== characterId),
    });
  },

  isFavorite: (characterId: number) => {
    const { favoriteCharacters } = get();
    return favoriteCharacters.some((c: Character) => c.id === characterId);
  },

  resetFavorites: () => {
    set({ favoriteCharacters: [] });
  },
});

export const useCharacterStore = create<CharacterState>()(
  devtools(
    (set, get) => ({
      ...createCharacterSlice(set as SetState),
      ...createFavoritesSlice(set as SetState, get as GetState),
    }),
    { name: 'character-store' }
  )
);
