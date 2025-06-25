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
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    album: 'Aashiqui 2',
    year: 2013,
    duration: '4:22',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431'
  },
  {
    id: '2',
    title: 'Chaiyya Chaiyya',
    artist: 'Sukhwinder Singh, Sapna Awasthi',
    album: 'Dil Se',
    year: 1998,
    duration: '6:52',
    genre: 'Bollywood',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452'
  },
  {
    id: '3',
    title: 'Kal Ho Naa Ho',
    artist: 'Sonu Nigam',
    album: 'Kal Ho Naa Ho',
    year: 2003,
    duration: '5:21',
    genre: 'Bollywood',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856'
  },
  {
    id: '4',
    title: 'Jai Ho',
    artist: 'Sukhwinder Singh, Tanvi Shah, Mahalaxmi Iyer',
    album: 'Slumdog Millionaire',
    year: 2008,
    duration: '5:19',
    genre: 'Bollywood',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464'
  },
  {
    id: '5',
    title: 'Kabira',
    artist: 'Arijit Singh, Harshdeep Kaur',
    album: 'Yeh Jawaani Hai Deewani',
    year: 2013,
    duration: '3:55',
    genre: 'Folk',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a'
  },
  {
    id: '6',
    title: 'Galliyan',
    artist: 'Ankit Tiwari',
    album: 'Ek Villain',
    year: 2014,
    duration: '5:07',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856'
  },
  {
    id: '7',
    title: 'Tere Mast Mast Do Nain',
    artist: 'Rahat Fateh Ali Khan, Shreya Ghoshal',
    album: 'Dabangg',
    year: 2010,
    duration: '4:31',
    genre: 'Qawwali',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452'
  },
  {
    id: '8',
    title: 'Dil Diyan Gallan',
    artist: 'Atif Aslam',
    album: 'Tiger Zinda Hai',
    year: 2017,
    duration: '4:20',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856'
  },
  {
    id: '9',
    title: 'Sapna Jahan',
    artist: 'Arijit Singh, Shreya Ghoshal',
    album: 'Brothers',
    year: 2015,
    duration: '4:54',
    genre: 'Bollywood',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464'
  },
  {
    id: '10',
    title: 'Ghungroo',
    artist: 'Arijit Singh, Shilpa Rao',
    album: 'War',
    year: 2019,
    duration: '5:02',
    genre: 'Dance',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a'
  },
  {
    id: '11',
    title: 'Kesariya',
    artist: 'Arijit Singh',
    album: 'Brahmastra',
    year: 2022,
    duration: '4:28',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431'
  },
  {
    id: '12',
    title: 'Besharam Rang',
    artist: 'Shilpa Rao, Caralisa Monteiro, Vishal Dadlani, Shekhar Ravjiani',
    album: 'Pathaan',
    year: 2023,
    duration: '4:18',
    genre: 'Pop',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452'
  },
  {
    id: '13',
    title: 'Jhoome Jo Pathaan',
    artist: 'Arijit Singh, Sukriti Kakar',
    album: 'Pathaan',
    year: 2023,
    duration: '3:27',
    genre: 'Dance',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856'
  },
  {
    id: '14',
    title: 'Tere Pyaar Mein',
    artist: 'Arijit Singh, Nikhita Gandhi',
    album: 'Tu Jhoothi Main Makkaar',
    year: 2023,
    duration: '3:25',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464'
  },
  {
    id: '15',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh',
    album: 'Bhediya',
    year: 2022,
    duration: '4:02',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856'
  },
  {
    id: '16',
    title: 'Naacho Naacho',
    artist: 'Vishal Mishra',
    album: 'RRR (Hindi)',
    year: 2022,
    duration: '3:32',
    genre: 'Dance',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431'
  },
  {
    id: '17',
    title: 'Malang (Title Track)',
    artist: 'Ved Sharma',
    album: 'Malang',
    year: 2020,
    duration: '4:48',
    genre: 'Bollywood',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452'
  },
  {
    id: '18',
    title: 'Teri Mitti',
    artist: 'B Praak',
    album: 'Kesari',
    year: 2019,
    duration: '5:30',
    genre: 'Patriotic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856'
  },
  {
    id: '19',
    title: 'Qaafirana',
    artist: 'Arijit Singh, Nikhita Gandhi',
    album: 'Kedarnath',
    year: 2018,
    duration: '5:39',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464'
  },
  {
    id: '20',
    title: 'Zinda',
    artist: 'Siddharth Mahadevan',
    album: 'Bhaag Milkha Bhaag',
    year: 2013,
    duration: '4:13',
    genre: 'Rock',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a'
  },
  {
    id: '21',
    title: 'Allah Ke Bande',
    artist: 'Kailash Kher',
    album: 'Kailasa',
    year: 2004,
    duration: '4:15',
    genre: 'Sufi',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431'
  },
  {
    id: '22',
    title: 'Agar Tum Saath Ho',
    artist: 'Arijit Singh, Alka Yagnik',
    album: 'Tamasha',
    year: 2015,
    duration: '5:41',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452'
  },
  {
    id: '23',
    title: 'Ae Dil Hai Mushkil',
    artist: 'Arijit Singh',
    album: 'Ae Dil Hai Mushkil',
    year: 2016,
    duration: '4:29',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856'
  },
  {
    id: '24',
    title: 'Tujhe Kitna Chahne Lage',
    artist: 'Arijit Singh',
    album: 'Kabir Singh',
    year: 2019,
    duration: '4:45',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464'
  },
  {
    id: '25',
    title: 'Shayad',
    artist: 'Arijit Singh',
    album: 'Love Aaj Kal',
    year: 2020,
    duration: '4:08',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a'
  },
  {
    id: '26',
    title: 'Humnava Mere',
    artist: 'Jubin Nautiyal',
    album: 'Single',
    year: 2018,
    duration: '3:40',
    genre: 'Ballad',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431'
  },
  {
    id: '27',
    title: 'Baarish',
    artist: 'Ash King, Shashaa Tirupati',
    album: 'Half Girlfriend',
    year: 2017,
    duration: '4:35',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452'
  },
  {
    id: '28',
    title: 'Humdard',
    artist: 'Arijit Singh',
    album: 'Ek Villain',
    year: 2014,
    duration: '4:18',
    genre: 'Romantic',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856'
  },
  {
    id: '29',
    title: 'Leja Re',
    artist: 'Dhvani Bhanushali',
    album: 'Single',
    year: 2018,
    duration: '3:15',
    genre: 'Pop',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464'
  },
  {
    id: '30',
    title: 'Pachtaoge',
    artist: 'Arijit Singh',
    album: 'Single',
    year: 2019,
    duration: '4:04',
    genre: 'Pop',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a'
  }
]; 