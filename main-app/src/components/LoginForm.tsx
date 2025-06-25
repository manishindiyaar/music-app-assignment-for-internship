import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Simulate loading effect for background image
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email, role);
      navigate('/');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden transition-all duration-1000"
      style={{
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 animate-gradient-shift" 
        style={{ animationDuration: '15s' }}
      ></div>
      
      {/* Glassmorphism card container with animation */}
      <div 
        className={`w-full max-w-md transition-all duration-1000 transform animate-float ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        style={{ animationDuration: '6s' }}
      >
        <div 
          className={`${isLoading ? '' : 'animate-glow-pulse'} glassmorphism dark:glassmorphism-dark rounded-lg p-8 transition-all duration-500`}
        >
          <h2 className="text-4xl font-bold text-white text-center mb-8 transition-all duration-500">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input with icon */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/70 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                required
              />
            </div>

            {/* Role selector */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: `right 0.75rem center`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `1.5em 1.5em`,
                  paddingRight: `2.5rem`
                }}
              >
                <option value="user" className="bg-gray-800 text-white">User</option>
                <option value="admin" className="bg-gray-800 text-white">Admin</option>
              </select>
            </div>

            {/* Login button with animation */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 