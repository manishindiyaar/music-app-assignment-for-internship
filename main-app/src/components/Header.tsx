import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, role } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Load image effect
  useEffect(() => {
    const img = new Image();
    img.src = '/music_bg_img.png';
    img.onload = () => setImageLoaded(true);
  }, []);

  // Custom glassmorphism effect for sidebar
  const sidebarStyle = {
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: isDarkMode 
      ? '0 4px 30px rgba(0, 0, 0, 0.2)' 
      : '0 4px 30px rgba(0, 0, 0, 0.1)',
  };

  return (
    <>
      {/* Compact Sidebar Navigation with Glassmorphism */}
      <aside 
        className={`fixed left-0 top-0 bottom-0 w-16 border-r z-50 flex flex-col transition-all duration-500 ease-in-out ${
          isDarkMode 
            ? 'bg-card/80 border-border/30' 
            : 'bg-background/80 border-border/20'
        }`}
        style={sidebarStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Music Image with Animation */}
        <div className="p-2 flex items-center justify-center">
          <div 
            className={`w-10 h-10 rounded-full overflow-hidden relative flex items-center justify-center transition-all duration-700 hover:scale-110 shadow-lg ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              boxShadow: '0 0 15px rgba(167, 110, 246, 0.5)'
            }}
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40 mix-blend-overlay z-10"></div>
            
            {/* Music Image */}
            <img 
              src="/music_bg_img.png" 
              alt="Music App" 
              className={` ml-1.5 w-full h-full object-cover transition-all duration-1000 ${
                isDarkMode ? 'brightness-90 contrast-125' : 'brightness-105 contrast-110'
              }`}
              style={{
                filter: `hue-rotate(${isDarkMode ? '0deg' : '10deg'})`,
                animation: 'pulse-subtle 4s infinite ease-in-out'
              }}
            />
            
            {/* Animated Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent z-20 animate-pulse"></div>
          </div>
        </div>

        {/* Navigation Links - Icons Only with Glow Effect */}
        <nav className="mt-8 flex-1">
          <ul className="space-y-6">
            <li className="flex justify-center">
              <button
                onClick={() => navigate('/')}
                className={`w-10 h-10 flex items-center justify-center transition-all duration-500 ${
                  isActive('/') 
                    ? 'iconBackground animate-pulse shadow-lg shadow-purple-500/20' 
                    : isDarkMode
                      ? 'bg-secondary/30 hover:bg-secondary/50 text-secondary-foreground'
                      : 'bg-secondary/50 hover:bg-secondary/70 text-secondary-foreground'
                } rounded-full`}
                title="Home"
              >
                <svg 
                  className={`w-5 h-5 ${isActive('/') ? 'text-white' : ''}`}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </li>
            <li className="flex justify-center">
              <button
                onClick={() => navigate('/explore')}
                className={`w-10 h-10 flex items-center justify-center transition-all duration-500 ${
                  isActive('/explore') 
                    ? 'iconBackground animate-pulse shadow-lg shadow-purple-500/20' 
                    : isDarkMode
                      ? 'bg-secondary/30 hover:bg-secondary/50 text-secondary-foreground'
                      : 'bg-secondary/50 hover:bg-secondary/70 text-secondary-foreground'
                } rounded-full`}
                title="Explore all music"
              >
                <svg 
                  className={`w-5 h-5 ${isActive('/explore') ? 'text-white' : ''}`}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </li>
          </ul>
        </nav>

        {/* User Role Indicator - Icon Only with Glow Effect */}
        <div className="p-4 border-t border-border/30 flex justify-center">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              role === 'admin' 
                ? 'iconBackground speaking-animation shadow-lg shadow-purple-500/30' 
                : isDarkMode
                  ? 'bg-secondary/30 hover:bg-secondary/50'
                  : 'bg-secondary/50 hover:bg-secondary/70'
            }`}
            title={`${role || 'user'} role`}
          >
            <svg 
              className={`w-5 h-5 ${role === 'admin' ? 'text-white' : 'text-muted-foreground'}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </aside>

      {/* Main Header - Search Only with Glassmorphism */}
      <header 
        className={`fixed top-0 left-16 right-0 h-16 border-b z-30 transition-all duration-500 ease-in-out ${
          isDarkMode 
            ? 'bg-card/80 border-border/30' 
            : 'bg-background/80 border-border/20'
        }`}
        style={sidebarStyle}
      >
        <div className="h-full px-4 flex items-center justify-between">
          {/* Search Bar with Glow Effect */}
          <div className="m-5 w-full max-w-xl mx-auto relative">
            
        
          </div>

          {/* Right Actions - Icons Only with Glow Effect */}
          <div className="flex items-center space-x-3 ml-4">
            {/* <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 ${
                isDarkMode 
                  ? 'iconBackground shadow-lg shadow-purple-500/20' 
                  : 'bg-secondary/50 hover:bg-secondary/70'
              }`}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {isDarkMode ? (
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
            </button> */}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="iconBackground w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-lg shadow-purple-500/20"
                title="Logout"
              >
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Content Padding */}
      <div className="pt-16 pl-16"></div>

      {/* Add keyframes for subtle pulse animation */}
      <style>
        {`
          @keyframes pulse-subtle {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            50% { transform: scale(1.03); filter: brightness(1.1); }
          }
        `}
      </style>
    </>
  );
};

export default Header; 