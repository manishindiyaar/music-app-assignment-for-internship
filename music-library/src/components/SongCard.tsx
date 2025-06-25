import React from 'react';
import { Song } from '../utils/music';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  isAdmin: boolean;
  onPlay: (id: string) => void;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
}

const SongCard = ({ 
  song, 
  isPlaying, 
  isAdmin, 
  onPlay, 
  onEdit, 
  onDelete 
}: SongCardProps) => {
  // Generate a random gradient for album art
  const getAlbumBackground = (id: string) => {
    const colors = [
      'from-purple-600 to-blue-500',
      'from-pink-500 to-orange-400',
      'from-green-500 to-teal-400',
      'from-blue-500 to-indigo-600',
      'from-red-500 to-pink-500'
    ];
    return `bg-gradient-to-br ${colors[parseInt(id, 10) % colors.length]}`;
  };

  return (
    <div
      className={`glassmorphism dark:glassmorphism-dark rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 ${isPlaying ? 'ring-2 ring-purple-500 scale-102' : ''}`}
    >
      <div className="relative">
        {/* Album Art */}
        {song.coverUrl ? (
          <div className="aspect-square bg-black">
            <img 
              src={song.coverUrl} 
              alt={`${song.album} cover`}
              className="w-full h-full object-cover"
              style={{
                animation: isPlaying ? 'pulse 2s infinite ease-in-out' : 'none'
              }}
            />
          </div>
        ) : (
          <div 
            className={`aspect-square ${getAlbumBackground(song.id)} flex items-center justify-center`}
            style={{
              backgroundSize: '200% 200%',
              animation: isPlaying ? 'gradient-shift 5s ease infinite' : 'none'
            }}
          >
            <span className="text-4xl font-bold text-white opacity-80">
              {song.album.charAt(0)}
            </span>
          </div>
        )}

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={() => onPlay(song.id)}
            className="iconBackground w-14 h-14 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300"
          >
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => onEdit(song)}
              className="glassmorphism w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
            <button
              onClick={() => onDelete(song.id)}
              className="glassmorphism bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Song Info */}
      <div className="p-4">
        <h3 className="font-bold text-foreground dark:text-white truncate">{song.title}</h3>
        <p className="text-sm text-muted-foreground dark:text-white/70 truncate">
          {song.artist} • {song.genre}
        </p>
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground dark:text-white/50">
          <span>{song.album}</span>
          <span>{song.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default SongCard; 