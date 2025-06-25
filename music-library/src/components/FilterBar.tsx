import React from 'react';

interface FilterBarProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  artists?: string[];
  albums?: string[];
  genres?: string[];
  selectedArtist?: string;
  selectedAlbum?: string;
  selectedGenre?: string;
  onArtistChange?: (artist: string) => void;
  onAlbumChange?: (album: string) => void;
  onGenreChange?: (genre: string) => void;
}

const FilterBar = ({ 
  filter, 
  onFilterChange, 
  artists = [], 
  albums = [], 
  genres = [],
  selectedArtist, 
  selectedAlbum,
  selectedGenre,
  onArtistChange,
  onAlbumChange,
  onGenreChange
}: FilterBarProps) => {
  const filters = ['all', 'newest', 'oldest', 'latest'];
  
  return (
    <div className="mb-10 space-y-6">
      {/* Time-based filters */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => onFilterChange(filterOption)}
            className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
              filter === filterOption
                ? 'iconBackground text-white animate-glow-pulse'
                : 'bg-secondary/50 dark:bg-white/5 text-secondary-foreground dark:text-white/80 hover:bg-secondary/80 dark:hover:bg-white/10'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Artist filter dropdown */}
        {artists.length > 0 && onArtistChange && (
          <div className="relative">
            <label htmlFor="artist-select" className="block text-sm font-medium text-secondary-foreground dark:text-white/80 mb-2">
              Artist
            </label>
            <div className="relative">
              <select
                id="artist-select"
                value={selectedArtist || ''}
                onChange={(e) => onArtistChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-secondary/30 dark:bg-white/5 text-secondary-foreground dark:text-white/80 focus:outline-none border border-secondary/50 dark:border-white/10 appearance-none"
              >
                <option value="">All Artists</option>
                {artists.map((artist) => (
                  <option key={artist} value={artist}>
                    {artist}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="h-4 w-4 text-secondary-foreground dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Album filter dropdown */}
        {albums.length > 0 && onAlbumChange && (
          <div className="relative">
            <label htmlFor="album-select" className="block text-sm font-medium text-secondary-foreground dark:text-white/80 mb-2">
              Album
            </label>
            <div className="relative">
              <select
                id="album-select"
                value={selectedAlbum || ''}
                onChange={(e) => onAlbumChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-secondary/30 dark:bg-white/5 text-secondary-foreground dark:text-white/80 focus:outline-none border border-secondary/50 dark:border-white/10 appearance-none"
              >
                <option value="">All Albums</option>
                {albums.map((album) => (
                  <option key={album} value={album}>
                    {album}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="h-4 w-4 text-secondary-foreground dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Genre filter dropdown */}
        {genres.length > 0 && onGenreChange && (
          <div className="relative">
            <label htmlFor="genre-select" className="block text-sm font-medium text-secondary-foreground dark:text-white/80 mb-2">
              Genre
            </label>
            <div className="relative">
              <select
                id="genre-select"
                value={selectedGenre || ''}
                onChange={(e) => onGenreChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-secondary/30 dark:bg-white/5 text-secondary-foreground dark:text-white/80 focus:outline-none border border-secondary/50 dark:border-white/10 appearance-none"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="h-4 w-4 text-secondary-foreground dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar; 