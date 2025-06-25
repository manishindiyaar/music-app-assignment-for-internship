import React, { useState, useEffect } from "react";
import SongLibrary from "./components/SongLibrary.tsx";
import "./styles/global.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      setIsLoading(false);
    } catch (err) {
      console.error('Error in initialization:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document and body
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-xl text-red-500 mb-4">Error loading application:</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded">{error}</pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Music Library
          </h1>
          {/* Dark mode toggle button using the same style as in main-app/src/components/Header.tsx */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 ${
              darkMode 
                ? 'iconBackground shadow-lg shadow-purple-500/20' 
                : 'bg-secondary/50 hover:bg-secondary/70'
            }`}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      
        <SongLibrary />
      </div>
    </div>
  );
};

export default App;

