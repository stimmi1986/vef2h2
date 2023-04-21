import React, { createContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

type AuthContextType = {
  loggedIn: boolean;
  isAdmin: boolean;
  username: string;
  setLoggedIn: (loggedIn: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setUsername: (username: string) => void;
};

const defaultAuthContext: AuthContextType = {
  loggedIn: false,
  isAdmin: false,
  username: '',
  setLoggedIn: () => {},
  setIsAdmin: () => {},
  setUsername: () => {},
};

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const token = Cookies.get('signin');
    if (token && process.env.NEXT_PUBLIC_JWT_SECRET) {
      try {
        const dec = jwt.decode(token) as { admin: boolean, username: string };
        if (dec) {
          console.log(dec);
          setLoggedIn(true);
          setIsAdmin(dec.admin);
          setUsername(dec.username);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, isAdmin, username, setLoggedIn, setIsAdmin, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
