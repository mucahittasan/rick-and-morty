import { CharacterContainer } from '@/components/CharacterContainer';
import { CharacterDetailModal } from '@/components/CharacterDetailModal';
import { CharacterFilters } from '@/components/CharacterFilters';
import { FavoritesButton } from '@/components/FavoritesButton';
import { getCharacters } from '@/services/api';
import { CharactersResponse } from '@/types/api';
import { Suspense } from 'react';

interface SearchParams {
  status?: string;
  gender?: string;
  page?: string;
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;

  const status = params.status === 'all' || !params.status ? '' : params.status;
  const gender = params.gender === 'all' || !params.gender ? '' : params.gender;
  const page = parseInt(params.page || '1', 10);

  let charactersData: CharactersResponse;

  try {
    charactersData = await getCharacters({
      status: status as 'alive' | 'dead' | 'unknown' | '',
      gender: gender as 'female' | 'male' | 'genderless' | 'unknown' | '',
      page,
    });
  } catch (error) {
    console.error('Error fetching characters:', error);
    charactersData = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }

  return (
    <main className="relative min-h-screen bg-black/90 px-4 py-8">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
      <div className="pointer-events-none fixed -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl"></div>
      <div className="pointer-events-none fixed -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>

      <div className="container mx-auto">
        <div className="relative mb-16 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/10"></div>

          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>

          <header className="relative z-10 text-center">
            <h1 className="mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow-[0_0_10px_rgba(139,92,246,0.3)] sm:text-6xl">
              Rick and Morty Keşif
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-medium text-white/80">
              Rick and Morty evrenindeki karakterleri keşfedin, favorilerinizi kaydedin ve detaylı
              bilgilere ulaşın
            </p>
            <div className="absolute top-0 right-0 sm:right-4">
              <FavoritesButton />
            </div>
          </header>
        </div>

        <section className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <CharacterFilters />
        </section>

        <Suspense
          fallback={
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
            </div>
          }
        >
          <CharacterContainer initialData={charactersData} />
        </Suspense>

        <CharacterDetailModal />
      </div>
    </main>
  );
}
