import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  const handleChange = (e: any) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="What do you want to listen today?"
          className="w-full px-4 py-3 pl-12 glassmorphism dark:glassmorphism-dark text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/70 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          value={searchTerm}
          onChange={handleChange}
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-white/70"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>
    </div>
  );
};

export default SearchBar; 