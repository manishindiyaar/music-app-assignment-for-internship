// Define the Song type
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: string;
}

// Filter songs by search term
export const filterSongs = (songs: Song[], searchTerm: string): Song[] => {
  if (!searchTerm) return songs;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return songs.filter((song) =>
    song.title.toLowerCase().includes(lowerSearchTerm) ||
    song.artist.toLowerCase().includes(lowerSearchTerm) ||
    song.album.toLowerCase().includes(lowerSearchTerm)
  );
};

// Sort songs by a specified field and direction
export const sortSongs = (
  songs: Song[],
  sortBy: keyof Song,
  sortDirection: 'asc' | 'desc'
): Song[] => {
  return [...songs].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    return 0;
  });
};

// Group songs by a specified field
export const groupSongs = (
  songs: Song[],
  groupBy: keyof Song
): Record<string, Song[]> => {
  return songs.reduce<Record<string, Song[]>>((acc, song) => {
    const key = String(song[groupBy]);
    acc[key] = acc[key] ? [...acc[key], song] : [song];
    return acc;
  }, {});
};

// Filter songs by year range
export const filterByYearRange = (
  songs: Song[],
  minYear?: number,
  maxYear?: number
): Song[] => {
  return songs.filter((song) => {
    const yearMatches = 
      (minYear === undefined || song.year >= minYear) &&
      (maxYear === undefined || song.year <= maxYear);
    
    return yearMatches;
  });
}; 