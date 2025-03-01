'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCharacterFilters } from '@/hooks/useCharacterFilters';
import { useCharacterStore } from '@/store/characterStore';
import { motion } from 'framer-motion';
import { Activity, Filter, Heart, RotateCcw, User } from 'lucide-react';

export function CharacterFilters() {
  const { resetFavorites } = useCharacterStore();
  const { filters, setStatus, setGender, resetFilters, setShowFavorites } = useCharacterFilters({
    onReset: resetFavorites,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-4 backdrop-blur-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
            <Filter size={16} />
          </div>
          <h2 className="text-lg font-semibold text-white">Filtreler</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 text-white/80 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        >
          <RotateCcw size={14} />
          <span>Sıfırla</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <label
            htmlFor="status-filter"
            className="flex items-center gap-2 text-sm font-medium text-white/80"
          >
            <Activity size={14} className="text-green-400" />
            Durum
          </label>
          <Select value={filters.status || 'all'} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger
              id="status-filter"
              className="w-full border-white/10 bg-black/40 text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/50"
            >
              <SelectValue placeholder="Herhangi bir durum" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-black/80 text-white backdrop-blur-xl">
              <SelectItem value="all" className="focus:bg-white/10">
                Herhangi bir durum
              </SelectItem>
              <SelectItem value="alive" className="focus:bg-white/10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
                  <span>Hayatta</span>
                </div>
              </SelectItem>
              <SelectItem value="dead" className="focus:bg-white/10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-red-400" />
                  <span>Ölü</span>
                </div>
              </SelectItem>
              <SelectItem value="unknown" className="focus:bg-white/10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-purple-400" />
                  <span>Bilinmiyor</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="gender-filter"
            className="flex items-center gap-2 text-sm font-medium text-white/80"
          >
            <User size={14} className="text-blue-400" />
            Cinsiyet
          </label>
          <Select value={filters.gender || 'all'} onValueChange={(value) => setGender(value)}>
            <SelectTrigger
              id="gender-filter"
              className="w-full border-white/10 bg-black/40 text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/50"
            >
              <SelectValue placeholder="Herhangi bir cinsiyet" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-black/80 text-white backdrop-blur-xl">
              <SelectItem value="all" className="focus:bg-white/10">
                Herhangi bir cinsiyet
              </SelectItem>
              <SelectItem value="female" className="focus:bg-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-pink-400">♀</span>
                  <span>Kadın</span>
                </div>
              </SelectItem>
              <SelectItem value="male" className="focus:bg-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">♂</span>
                  <span>Erkek</span>
                </div>
              </SelectItem>
              <SelectItem value="genderless" className="focus:bg-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">⊖</span>
                  <span>Cinsiyetsiz</span>
                </div>
              </SelectItem>
              <SelectItem value="unknown" className="focus:bg-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">?</span>
                  <span>Bilinmiyor</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="favorites-filter"
            className="flex items-center gap-2 text-sm font-medium text-white/80"
          >
            <Heart size={14} className="text-red-400" />
            Favoriler
          </label>
          <div className="flex h-10 items-center gap-3 rounded-md border border-white/10 bg-black/40 px-3 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/50">
            <Switch
              id="favorites-filter"
              checked={filters.showFavorites}
              onCheckedChange={setShowFavorites}
              className="data-[state=checked]:bg-red-500 data-[state=checked]:shadow-[0_0_10px_rgba(248,113,113,0.5)]"
            />
            <label htmlFor="favorites-filter" className="flex cursor-pointer items-center gap-1.5">
              <Heart
                size={16}
                className={`transition-transform duration-300 ${
                  filters.showFavorites ? 'scale-110 fill-red-400 text-red-400' : 'text-white/80'
                }`}
              />
              <span className="text-sm text-white">Sadece Favoriler</span>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
