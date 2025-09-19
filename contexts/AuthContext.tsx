// Fix: Populating file with an AuthContext provider.
import React, { createContext, useState, useContext, useMemo } from 'react';
import { AuthContextType, User, UserRole } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default to logged in for demo
  const [user, setUser] = useState<User | null>({
    name: 'Hach Wíinik',
    email: 'super@hachwiinik.com',
    avatarUrl: 'https://res.cloudinary.com/dy08afhuz/image/upload/v1758235391/favicon_v2_x1sfk0.png',
    role: 'super-admin'
  });

  const setCurrentRole = (role: UserRole) => {
    setUser(prevUser => (prevUser ? { ...prevUser, role } : null));
  };
  
  const value = useMemo(() => ({ 
      isAuthenticated, 
      user, 
      setCurrentRole 
  }), [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
