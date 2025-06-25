import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the Song type
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: string;
}

interface SongContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  setCurrentSong: (song: Song | null) => void;
  togglePlayback: () => void;
}

// Create the context with a default value
const SongContext = createContext<SongContextType>({
  currentSong: null,
  isPlaying: false,
  setCurrentSong: () => {},
  togglePlayback: () => {},
});

// Custom hook for using the song context
export const useSong = () => useContext(SongContext);

interface SongProviderProps {
  children: ReactNode;
}

// Provider component
export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <SongContext.Provider
      value={{
        currentSong,
        isPlaying,
        setCurrentSong,
        togglePlayback,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default SongContext; 