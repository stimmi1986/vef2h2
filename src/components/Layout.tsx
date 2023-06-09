import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

interface LayoutProps {
  children: React.ReactNode;
}

export const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    Cookies.remove('signin');
    setLoggedIn(false);
    setIsAdmin(false);
    router.push('/');
  };

  useEffect(() => {
    const token = Cookies.get('signin');
    if (token && NEXT_PUBLIC_JWT_SECRET) {
      const dec = jwt.decode(token);
      if (dec && typeof dec !== 'string') {
        setLoggedIn(true);
        setIsAdmin(dec.admin);
      }
    }
  }, [router]);

  useEffect(() => {
    if (isSigningOut) {
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }, [isSigningOut]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
        <div className="flex items-center">
          <h1 className="text-lg font-bold mr-8">Viðburðasíða fyrir Vefforritun 2</h1>
        </div>
        <div className="flex items-center">
        <Link href='/AllImgs'>
            <button className="text-blue-400 font-bold hover:text-blue-300 mr-8">Sjá Allar Myndir</button>
        </Link>
        {isAdmin && (
          <Link href="/makeCourse">
            <button className="text-blue-400 font-bold hover:text-blue-300 mr-8">Búa til viðburð?</button>
          </Link>
        )}
          <Link href="/">
            <button className="text-blue-400 font-bold hover:text-blue-300 mr-8">Skoða Viðburði</button>
          </Link>
        </div>
      </header>


      {/* Main */}
      <main className="flex-grow px-4 py-2">
        <div className="flex items-center">{children}</div>
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
        <div className="flex items-center">
          <span className="mr-4">LoggedIn: {loggedIn ? 'Yes' : 'No'}</span>
          <span className="mr-4">isAdmin: {isAdmin ? 'Yes' : 'No'}</span>
        </div>
        <div className="flex items-center">
          {loggedIn ? (
            <button onClick={handleSignOut}>Sign Out</button>
          ) : (
            <>
              <Link href="/signup">
                <button className="mr-4">Register</button>
              </Link>
              <Link href="/login">
                <button className="mr-4">Login</button>
              </Link>
            </>
          )}
        </div>
      </footer>
    </div>
  );
};
export default Layout;
