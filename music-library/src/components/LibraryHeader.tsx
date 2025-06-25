import React from 'react';

interface LibraryHeaderProps {
  isAdmin: boolean;
  onAddSong: () => void;
}

const LibraryHeader = ({ isAdmin, onAddSong }: LibraryHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
  
      
      {isAdmin && (
        <button
          onClick={onAddSong}
          className="glassmorphism dark:glassmorphism-dark px-5 py-2 rounded-full flex items-center space-x-2 hover:bg-secondary/30 dark:hover:bg-white/10 transition-all duration-300"
        >
          <svg className="w-5 h-5 text-foreground dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
          <span className="text-foreground dark:text-white">Add Music</span>
        </button>
      )}
    </div>
  );
};

export default LibraryHeader; 