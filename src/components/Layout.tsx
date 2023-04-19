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

  const handleLogout = async () => {
    const token = Cookies.get('signin');
    const response = await fetch(`${BaseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      Cookies.remove('signin');
      document.cookie = 'token=; expires=;';
      setLoggedIn(false);
      setIsAdmin(false);
      router.push('/');
    }
  };

  useEffect(() => {
    const token = Cookies.get('signin');
    if (token && NEXT_PUBLIC_JWT_SECRET) {
      const dec = jwt.decode(token);
      if (dec) {
        console.log(dec);
        setLoggedIn(true);
        setIsAdmin(true);
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
        <div className="flex items-center">
          <h1 className="text-lg font-bold mr-8">Viðburðasíða fyrir Vefforritun 2</h1>
        </div>
        <div className="flex items-center">
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
            <button onClick={handleLogout}>Sign Out</button>
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
