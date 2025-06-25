import React, { useRef, useEffect } from 'react';
import { Song } from '../utils/music';

interface NowPlayingBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  onTogglePlay: (id: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const NowPlayingBar = ({ 
  currentSong, 
  isPlaying, 
  progress, 
  onTogglePlay, 
  onPrevious, 
  onNext 
}: NowPlayingBarProps) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  // Generate a gradient for album art
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

  if (!currentSong) return null;

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate current time based on progress
  const calculateCurrentTime = () => {
    if (!currentSong) return '0:00';
    
    // Parse the duration string (e.g., "3:45" to seconds)
    const [mins, secs] = currentSong.duration.split(':').map(Number);
    const totalSeconds = (mins * 60) + secs;
    const currentSeconds = totalSeconds * (progress / 100);
    
    return formatTime(currentSeconds);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glassmorphism dark:glassmorphism-dark border-t border-white/10 p-3 z-40">
      <div className="container mx-auto flex items-center">
        {/* Hidden audio element for actual playback */}
        {currentSong.audioSrc && (
          <audio 
            ref={audioRef}
            src={currentSong.audioSrc}
            loop={false}
          />
        )}
        
        {/* Album Art Thumbnail */}
        {currentSong.coverUrl ? (
          <div className="w-12 h-12 rounded-lg overflow-hidden mr-4">
            <img 
              src={currentSong.coverUrl} 
              alt={`${currentSong.album} cover`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className={`w-12 h-12 rounded-lg ${getAlbumBackground(currentSong.id)} flex items-center justify-center mr-4`}>
            <span className="text-xl font-bold text-white">{currentSong.album.charAt(0)}</span>
          </div>
        )}
        
        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground dark:text-white truncate">{currentSong.title}</h4>
          <p className="text-sm text-muted-foreground dark:text-white/70 truncate">{currentSong.artist}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="flex-1 px-4">
          <div className="relative h-1 bg-muted dark:bg-white/20 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground dark:text-white/50 mt-1">
            <span>{calculateCurrentTime()}</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onPrevious}
            className="text-muted-foreground dark:text-white/80 hover:text-foreground dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6L9 12l10 6V6z" />
              <rect x="4" y="6" width="2" height="12" />
            </svg>
          </button>
          
          <button 
            onClick={() => onTogglePlay(currentSong.id)}
            className="w-10 h-10 rounded-full bg-muted/50 dark:bg-white/10 flex items-center justify-center hover:bg-muted dark:hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-foreground dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-foreground dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <button 
            onClick={onNext}
            className="text-muted-foreground dark:text-white/80 hover:text-foreground dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 6l10 6-10 6V6z" />
              <rect x="18" y="6" width="2" height="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar; 