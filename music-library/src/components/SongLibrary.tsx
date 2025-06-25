import React, { useState, useEffect } from 'react';
import { sampleSongs } from '../utils/music';
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPlaying, setIsPlaying] = useState(null);
  const [editingSong, setEditingSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);

  // Check if user is admin
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');
  }, []);

  // Filter songs based on search and filter criteria
  useEffect(() => {
    let result = [...songs];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filters
    switch (filter) {
      case 'newest':
        result = result.filter((song) => song.year >= 1980);
        break;
      case 'oldest':
        result = result.filter((song) => song.year < 1980);
        break;
      case 'latest':
        result = [...result].sort((a, b) => b.year - a.year).slice(0, 5);
        break;
    }

    setFilteredSongs(result);
  }, [songs, searchTerm, filter]);

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

  return (
    <div>
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-24">
        {/* Header with Logo */}
        <LibraryHeader isAdmin={isAdmin} onAddSong={addSong} />

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Filter Pills */}
        <FilterBar filter={filter} onFilterChange={setFilter} />

        {/* Song Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        {filteredSongs.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-8 py-2 glassmorphism dark:glassmorphism-dark rounded-full text-foreground dark:text-white hover:bg-secondary/30 dark:hover:bg-white/10 transition-all duration-300">
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