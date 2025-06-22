import React, { createContext, useContext, useState, useEffect } from 'react';

export type User = {
  role: 'admin' | 'owner';
};

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({ user: null });

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In reality, this data might come from an API, JWT, or localStorage.
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fake load. Replace with actual call.
    const storedRole = localStorage.getItem('user_role') as 'admin' | 'owner';
    if (storedRole) {
      setUser({ role: storedRole }); 
    } else {
      setUser({ role: 'owner' }); // Default for demo
    }
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
