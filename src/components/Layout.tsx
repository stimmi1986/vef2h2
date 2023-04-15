import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AuthContext } from '../pages/auth';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch(`${BaseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    });
    if (response.ok) {
      console.log(response);
      // redirect to home page after successful logout
      router.push('/');
    }
  };

  useEffect(() => {
    // check if user is authenticated and set loggedIn and isAdmin props accordingly
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${BaseUrl}/api/auth/status`);
        const data = await response.json();
        setLoggedIn(data.loggedIn);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error(error);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
        <h1 className="text-lg font-bold">Viðburðasíða fyrir Vefforritun 2</h1>
        <Link href="/">
          <div className="text-blue-400 hover:text-blue-300">Skoða Viðburði</div>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-grow px-4 py-2">
        <div className="flex items-center">
          {children}
        </div>
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
              <Link href="/signup"><button className="mr-4">Register</button></Link>
              <Link href="/login"><button className="mr-4">Login</button></Link>
            </>
          )}
        </div>
      </footer>

    </div>
  );
};

export default Layout;
