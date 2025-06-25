import React, { useState, useEffect, useMemo } from 'react';
import { sampleSongs } from '../utils/music';
import { filterSongs, sortSongs, getUniqueValues, getRecentlyAddedSongs } from '../utils/songUtils';
import SongCard from './SongCard';
import NowPlayingBar from './NowPlayingBar';
import SongEditModal from './SongEditModal';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import LibraryHeader from './LibraryHeader';

const SongLibrary = () => {
  const [songs, setSongs] = useState(sampleSongs);
  const [filteredSongs, setFilteredSongs] = useState(sampleSongs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPlaying, setIsPlaying] = useState(null);
  const [editingSong, setEditingSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);

  // Extract unique values for filters
  const uniqueArtists = useMemo(() => getUniqueValues(songs, 'artist'), [songs]);
  const uniqueAlbums = useMemo(() => getUniqueValues(songs, 'album'), [songs]);
  const uniqueGenres = useMemo(() => {
    // Filter out undefined or empty genres
    const genres = songs
      .map(song => song.genre)
      .filter(genre => genre && genre.trim() !== '');
    return Array.from(new Set(genres)).sort();
  }, [songs]);

  // Check if user is admin
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');
  }, []);

  // Filter songs based on search and filter criteria
  useEffect(() => {
    // First apply basic filters (search, artist, album, genre)
    let result = filterSongs(
      songs, 
      searchTerm, 
      selectedArtist, 
      selectedAlbum, 
      selectedGenre
    );
    
    // Then apply time-based filters
    switch (filter) {
      case 'newest':
        result = sortSongs(result, 'year', false); // Sort by year descending
        break;
      case 'oldest':
        result = sortSongs(result, 'year', true); // Sort by year ascending
        break;
      case 'latest':
        result = getRecentlyAddedSongs(result, 5); // Get 5 most recently added songs
        break;
    }

    setFilteredSongs(result);
  }, [songs, searchTerm, filter, selectedArtist, selectedAlbum, selectedGenre]);

  // Simulate progress bar movement when a song is playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      const playingSong = songs.find(song => song.id === isPlaying);
      if (playingSong) {
        setCurrentSong(playingSong);
        setProgress(0);
        interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              if (interval) clearInterval(interval);
              return 100;
            }
            return prev + 0.5;
          });
        }, 100);
      }
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, songs]);

  const addSong = () => {
    if (!isAdmin) return;
    
    const newSong = {
      id: Date.now().toString(),
      title: '',
      artist: '',
      album: '',
      year: new Date().getFullYear(),
      duration: '0:00',
      genre: ''
    };
    
    setEditingSong(newSong);
  };

  const saveSong = (song) => {
    if (!isAdmin) return;

    const updatedSongs = editingSong?.id 
      ? songs.map(s => s.id === editingSong.id ? song : s)
      : [...songs, song];
    
    setSongs(updatedSongs);
    setEditingSong(null);
    localStorage.setItem('songs', JSON.stringify(updatedSongs));
  };

  const deleteSong = (id) => {
    if (!isAdmin) return;
    const updatedSongs = songs.filter((song) => song.id !== id);
    setSongs(updatedSongs);
    localStorage.setItem('songs', JSON.stringify(updatedSongs));
    
    // If the deleted song was playing, stop playback
    if (isPlaying === id) {
      setIsPlaying(null);
      setCurrentSong(null);
    }
  };

  const togglePlay = (id) => {
    setIsPlaying(isPlaying === id ? null : id);
  };

  const handlePrevious = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    if (currentIndex > 0) {
      const prevSong = songs[currentIndex - 1];
      setIsPlaying(prevSong.id);
    }
  };

  const handleNext = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    if (currentIndex < songs.length - 1) {
      const nextSong = songs[currentIndex + 1];
      setIsPlaying(nextSong.id);
    }
  };

  const handleClearFilters = () => {
    setFilter('all');
    setSelectedArtist('');
    setSelectedAlbum('');
    setSelectedGenre('');
    setSearchTerm('');
  };

  // Check if any filter is active
  const hasActiveFilters = filter !== 'all' || selectedArtist || selectedAlbum || selectedGenre || searchTerm;

  return (
    <div>
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-24">
        {/* Header with Logo */}
        <LibraryHeader isAdmin={isAdmin} onAddSong={addSong} />

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="relative">
          {/* Filter Pills */}
          <FilterBar 
            filter={filter} 
            onFilterChange={setFilter}
            artists={uniqueArtists}
            albums={uniqueAlbums}
            genres={uniqueGenres}
            selectedArtist={selectedArtist}
            selectedAlbum={selectedAlbum}
            selectedGenre={selectedGenre}
            onArtistChange={setSelectedArtist}
            onAlbumChange={setSelectedAlbum}
            onGenreChange={setSelectedGenre}
          />
          
          {/* Clear Filters Button - show only when filters are active */}
          {hasActiveFilters && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/30 dark:bg-white/5 hover:bg-secondary/50 dark:hover:bg-white/10 text-secondary-foreground dark:text-white/80 transition-all duration-300 border border-secondary/50 dark:border-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Song Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredSongs.map((song) => (
            <div key={song.id}>
              <SongCard
                song={song}
                isPlaying={isPlaying === song.id}
                isAdmin={isAdmin}
                onPlay={togglePlay}
                onEdit={setEditingSong}
                onDelete={deleteSong}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSongs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎵</div>
            <h3 className="text-xl font-medium text-foreground dark:text-white mb-2">No songs found</h3>
            <p className="text-muted-foreground dark:text-white/70">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Show More Button */}
        {filteredSongs.length > 0 && filteredSongs.length < songs.length && (
          <div className="mt-8 text-center">
            <button className="px-8 py-2 iconBackground text-white rounded-full hover:opacity-90 transition-all duration-300">
              Show More
            </button>
          </div>
        )}

        {/* Edit Song Modal */}
        {editingSong && (
          <SongEditModal
            song={editingSong}
            onSave={saveSong}
            onCancel={() => setEditingSong(null)}
          />
        )}
      </div>

      {/* Now Playing Bar - Fixed at bottom */}
      {isPlaying && currentSong && (
        <NowPlayingBar
          currentSong={currentSong}
          isPlaying={!!isPlaying}
          progress={progress}
          onTogglePlay={togglePlay}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default SongLibrary; 