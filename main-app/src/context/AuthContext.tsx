import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our auth state
interface AuthState {
  isAuthenticated: boolean;
  role: string;
  email: string;
  login: (email: string, role: string) => void;
  logout: () => void;
  isAdmin: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  role: '',
  email: '',
  login: () => {},
  logout: () => {},
  isAdmin: false,
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  // Check for auth data on mount
  useEffect(() => {
    const checkAuth = () => {
      const userRole = localStorage.getItem('userRole');
      const authStatus = localStorage.getItem('isAuthenticated');
      const userEmail = localStorage.getItem('userEmail');
      
      if (userRole && authStatus === 'true') {
        setIsAuthenticated(true);
        setRole(userRole);
        setEmail(userEmail || '');
      } else {
        // Clear any partial auth data
        localStorage.removeItem('userRole');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        
        setIsAuthenticated(false);
        setRole('');
        setEmail('');
      }
    };

    checkAuth();

    // Listen for storage events (in case of multiple tabs)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Login function - simple localStorage-based authentication
  const login = (email: string, selectedRole: string) => {
    // Store auth data in localStorage
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    
    // Update state
    setIsAuthenticated(true);
    setRole(selectedRole);
    setEmail(email);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    setIsAuthenticated(false);
    setRole('');
    setEmail('');
  };

  // Compute isAdmin
  const isAdmin = role === 'admin';

  // Value provided to consumers
  const value = {
    isAuthenticated,
    role,
    email,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 