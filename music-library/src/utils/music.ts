export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: string;
  coverUrl?: string;
  genre?: string;
  audioSrc?: string;
}

export const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Dil Ka Kya',
    artist: 'Pritam, Arijit Singh',
    album: 'Metro In Dino',
    year: 2023,
    duration: '5:55',
    genre: 'Bollywood',
    audioSrc: '/music/128-Dil Ka Kya - Metro In Dino 128 Kbps.mp3',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431'
  },
  {
    id: '2',
    title: 'You\'re Not Alone',
    artist: 'Josh A',
    album: 'Fearless',
    year: 2022,
    duration: '3:45',
    genre: 'Hip-Hop',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431'
  },
  {
    id: '3',
    title: 'Starboy',
    artist: 'The Weeknd, Daft Punk',
    album: 'Starboy',
    year: 2016,
    duration: '3:50',
    genre: 'R&B',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452'
  },
  {
    id: '4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    year: 2020,
    duration: '3:20',
    genre: 'Synth-pop',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856'
  },
  {
    id: '5',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    year: 2020,
    duration: '3:59',
    genre: 'Indie Pop',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464'
  },
  {
    id: '6',
    title: 'Dynamite',
    artist: 'BTS',
    album: 'BE',
    year: 2020,
    duration: '3:19',
    genre: 'K-pop',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a'
  }
]; 