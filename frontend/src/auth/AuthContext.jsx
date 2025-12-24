import { createContext, useState, useEffect, useContext } from 'react';
import { getToken, getUserFromToken, setToken as saveToken, removeToken } from '../utils/tokenUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = getToken();
      if (token) {
        const decodedUser = getUserFromToken();
        if (decodedUser) {
          setUser(decodedUser);
        } else {
            removeToken();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = (token) => {
    saveToken(token);
    const decodedUser = getUserFromToken();
    setUser(decodedUser);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const refreshUser = () => {
    const decodedUser = getUserFromToken();
    setUser(decodedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
