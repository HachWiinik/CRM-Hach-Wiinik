import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';

type User = {
    name: string;
    email: string;
    avatarUrl: string;
    role: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    setCurrentRole: (role: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated] = useState(true); // Default to logged in for demo
  const [user, setUser] = useState<User | null>({
    name: 'NeuroFlow User',
    email: 'user@neuroflow.ai',
    avatarUrl: 'https://res.cloudinary.com/dy08afhuz/image/upload/v1758236390/grok-image-61ceeb3a-8e89-4bec-8609-5658d8038280_nhcxbv.jpg',
    role: 'super-admin'
  });

  const setCurrentRole = (role: string) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      return { ...currentUser, role };
    });
  };
  
  const value = useMemo(() => ({ isAuthenticated, user, setCurrentRole }), [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};