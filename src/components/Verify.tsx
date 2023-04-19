import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { NEXT_PUBLIC_JWT_SECRET } from '$/components/Layout';

interface VerifyResponse {
  loggedIn: boolean;
  isAdmin: boolean;
}

export const useVerify = (): VerifyResponse => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('signin');
    if (token && NEXT_PUBLIC_JWT_SECRET) {
      const dec: any = jwt.decode(token);
      if (dec) {
        setLoggedIn(true);
        setIsAdmin(!!dec.admin);
      }
    }
  }, []);

  return {
    loggedIn,
    isAdmin,
  };
};
