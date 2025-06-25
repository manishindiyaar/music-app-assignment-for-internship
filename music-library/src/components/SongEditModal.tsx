import React, { useState, useEffect } from 'react';
import { Song } from '../utils/music';

interface SongEditModalProps {
  song: Song | null;
  onSave: (song: Song) => void;
  onCancel: () => void;
}

const SongEditModal = ({ song, onSave, onCancel }: SongEditModalProps) => {
  const [editedSong, setEditedSong] = useState({
    id: '',
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
    duration: '0:00',
    genre: ''
  });

  useEffect(() => {
    if (song) {
      setEditedSong(song);
    }
  }, [song]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditedSong(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(editedSong);
  };

  if (!song) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="glassmorphism dark:glassmorphism-dark rounded-xl p-6 max-w-md w-full animate-float" style={{ animationDuration: '4s' }}>
        <h2 className="text-xl font-bold mb-4 text-foreground dark:text-white">
          {song.id ? 'Edit Song' : 'Add New Song'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground dark:text-white/80">Title</label>
              <input
                type="text"
                name="title"
                value={editedSong.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background dark:bg-white/10 border border-input dark:border-white/20 text-foreground dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground dark:text-white/80">Artist</label>
              <input
                type="text"
                name="artist"
                value={editedSong.artist}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background dark:bg-white/10 border border-input dark:border-white/20 text-foreground dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground dark:text-white/80">Album</label>
              <input
                type="text"
                name="album"
                value={editedSong.album}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background dark:bg-white/10 border border-input dark:border-white/20 text-foreground dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground dark:text-white/80">Year</label>
                <input
                  type="number"
                  name="year"
                  value={editedSong.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background dark:bg-white/10 border border-input dark:border-white/20 text-foreground dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground dark:text-white/80">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={editedSong.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background dark:bg-white/10 border border-input dark:border-white/20 text-foreground dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  required
                  pattern="[0-9]+:[0-5][0-9]"
                  placeholder="0:00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground dark:text-white/80">Genre</label>
              <input
                type="text"
                name="genre"
                value={editedSong.genre || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background dark:bg-white/10 border border-input dark:border-white/20 text-foreground dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground dark:text-white/80">Cover URL (optional)</label>
              <input
                type="text"
                name="coverUrl"
                value={editedSong.coverUrl || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background dark:bg-white/10 border border-input dark:border-white/20 text-foreground dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="https://example.com/album-cover.jpg"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-secondary dark:bg-white/10 text-secondary-foreground dark:text-white rounded-lg hover:bg-secondary/80 dark:hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500 text-primary-foreground dark:text-white rounded-lg hover:bg-primary/90 dark:hover:opacity-90 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SongEditModal; 