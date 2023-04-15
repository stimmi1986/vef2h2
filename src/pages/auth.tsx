import { createContext, useState } from 'react';

type AuthContextType = {
  loggedIn: boolean;
  isAdmin: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

const defaultAuthContext: AuthContextType = {
  loggedIn: false,
  isAdmin: false,
  setLoggedIn: () => {},
  setIsAdmin: () => {},
};

export const AuthProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ loggedIn, isAdmin, setLoggedIn, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
