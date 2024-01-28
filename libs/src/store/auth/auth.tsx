/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { RootContext } from '../provider';

interface AuthContextProps {
  isAuthenticated: boolean;
  token?: string;
  expiry?: number;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    state,
  } = useContext(RootContext);

  const {
    token,
    expiry,
  } = state;

  useEffect(() => {
    const isTokenExpired = (value: boolean) => {
      if (!value) {
        return true;
      }

      try {
        const currentTime = Math.floor(Date.now() / 1000);
        return expiry !== undefined && expiry < currentTime;
      } catch (error) {
        return true;
      }
    };

    if (token && isTokenExpired(token)) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [token, expiry]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, expiry }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};
