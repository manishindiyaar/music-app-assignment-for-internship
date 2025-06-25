import { Song } from './music';

/**
 * Extract unique values from an array of songs based on a property
 * @param songs Array of songs
 * @param property Property to extract unique values from
 * @returns Array of unique values
 */
export const getUniqueValues = (songs: Song[], property: keyof Song): string[] => {
  const values = songs.map(song => song[property] as string);
  const uniqueValues = Array.from(new Set(values));
  return uniqueValues.sort();
};

/**
 * Filter songs based on multiple criteria
 * @param songs Array of songs to filter
 * @param searchTerm Search term to filter by
 * @param artist Artist to filter by
 * @param album Album to filter by
 * @param genre Genre to filter by
 * @param year Year to filter by
 * @returns Filtered array of songs
 */
export const filterSongs = (
  songs: Song[], 
  searchTerm = '', 
  artist = '', 
  album = '', 
  genre = '',
  year?: number
): Song[] => {
  return songs.filter(song => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Artist filter
    const matchesArtist = !artist || song.artist === artist;
    
    // Album filter
    const matchesAlbum = !album || song.album === album;
    
    // Genre filter
    const matchesGenre = !genre || song.genre === genre;
    
    // Year filter
    const matchesYear = !year || song.year === year;
    
    return matchesSearch && matchesArtist && matchesAlbum && matchesGenre && matchesYear;
  });
};

/**
 * Sort songs by a specific property
 * @param songs Array of songs to sort
 * @param sortBy Property to sort by
 * @param ascending Sort in ascending order if true, descending if false
 * @returns Sorted array of songs
 */
export const sortSongs = (
  songs: Song[], 
  sortBy: keyof Song = 'title', 
  ascending = true
): Song[] => {
  return [...songs].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return ascending 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return ascending 
        ? valueA - valueB 
        : valueB - valueA;
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

/**
 * Get the most recently added songs (using ID as a proxy for addition time)
 * @param songs Array of songs
 * @param limit Number of songs to return
 * @returns Array of most recently added songs
 */
export const getRecentlyAddedSongs = (songs: Song[], limit = 5): Song[] => {
  return [...songs]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, limit);
}; 