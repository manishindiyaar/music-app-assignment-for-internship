import React from 'react';

interface FilterBarProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar = ({ filter, onFilterChange }: FilterBarProps) => {
  const filters = ['all', 'newest', 'oldest', 'latest'];
  
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => onFilterChange(filterOption)}
          className={`px-5 py-2 rounded-full transition-all duration-300 ${
            filter === filterOption
              ? 'glassmorphism dark:glassmorphism-dark animate-glow-pulse text-foreground dark:text-white'
              : 'bg-secondary/50 dark:bg-white/5 text-secondary-foreground dark:text-white/80 hover:bg-secondary/80 dark:hover:bg-white/10'
          }`}
        >
          {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterBar; 