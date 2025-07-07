import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking for existing session on app start
  useEffect(() => {
    const checkExistingSession = () => {
      const savedUser = localStorage.getItem('gameUser');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          localStorage.removeItem('gameUser');
        }
      }
      setIsLoading(false);
    };

    // Simulate loading time
    setTimeout(checkExistingSession, 1000);
  }, []);

  const login = async (username: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple validation for demo purposes
    if (!username || !password) {
      setIsLoading(false);
      throw new Error('Wszystkie pola są wymagane');
    }

    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('Hasło musi mieć co najmniej 6 znaków');
    }

    // Valid access passwords - in real app this would be checked against database
    const validPasswords = ['admin123', 'aitribes2024', 'livegood123'];

    if (!validPasswords.includes(password)) {
      setIsLoading(false);
      throw new Error('Nieprawidłowe hasło dostępu. Hasło zostanie przyznane po spełnieniu warunku koniecznego (rejestracja w AI Tribes) i warunku wystarczającego (rejestracja w Live Good). Skontaktuj się z administratorem.');
    }

    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: 'user@aitribes.com',
      username: 'Członek AI Tribes & Live Good',
      createdAt: new Date().toISOString()
    };

    setUser(userData);
    
    if (rememberMe) {
      localStorage.setItem('gameUser', JSON.stringify(userData));
    }
    
    setIsLoading(false);
  };

  const register = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple validation
    if (!email || !username || !password) {
      setIsLoading(false);
      throw new Error('Wszystkie pola są wymagane');
    }

    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('Hasło musi mieć co najmniej 6 znaków');
    }

    if (!email.includes('@')) {
      setIsLoading(false);
      throw new Error('Wprowadź prawidłowy adres email');
    }

    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username,
      createdAt: new Date().toISOString()
    };

    setUser(userData);
    localStorage.setItem('gameUser', JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gameUser');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout
  };

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
