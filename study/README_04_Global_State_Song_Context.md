# Study Guide 4 – Global Song State with the Context API

> **Focus**: Managing "what's playing" across micro-frontends.

---

❓ **Why do you need a song context at all?**

💡 As soon as I navigate away from the list of songs I still want the _Now Playing_ bar (hosted by `main-app`) to show the current song and its playback state. Lifting props up the tree would get messy, so I opted for the React **Context API** – simple yet perfectly fine for this scope.

---

### 1. Defining the Model

```1:25:main-app/src/context/SongContext.tsx
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: string;
}
```

The interface gives me **TypeScript autocomplete** everywhere I consume the context.

---

### 2. Creating & Providing the Context

```25:55:main-app/src/context/SongContext.tsx
const SongContext = createContext<SongContextType>({
  currentSong: null,
  isPlaying: false,
  setCurrentSong: () => {},
  togglePlayback: () => {},
});

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => setIsPlaying(!isPlaying);

  return (
    <SongContext.Provider value={{ currentSong, isPlaying, setCurrentSong, togglePlayback }}>
      {children}
    </SongContext.Provider>
  );
};
```

* **`currentSong`** – full metadata of the track.
* **`isPlaying`** – boolean toggle.
* **`togglePlayback()`** – passed down to transport buttons.

The provider wraps the entire `<App />` so _every_ component, including the remote, can call `useSong()`.

---

### 3. Updating the State from the Remote

Inside `music-library`'s `SongCard` the click handler does this:

```jsx
import { useSong } from 'main-app/src/context/SongContext';
// …
const { setCurrentSong, togglePlayback } = useSong();

const handlePlay = (song) => {
  setCurrentSong(song);
  togglePlayback();
};
```

Because the context lives in the host bundle and is listed as a **shared singleton**, both apps reference **the exact same object** – so the host's NowPlaying bar updates instantly.

---

❓ **Why not Redux, Zustand or Recoil?**

💡 Given the tiny state footprint (one object + one boolean) I felt Redux et al. would be heavy. React Context keeps bundle size down and still provides a clean separation.

---

That's it for global state – the final guide walks through the flashy UI & Tailwind tricks! 🎨 