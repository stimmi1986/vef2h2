import Link from 'next/link';

export const BaseUrl = process.env.DB_HOST;

const Layout: React.FC = ({ children }) => {

  const handleLogout = async () => {
    const response = await fetch(`${BaseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    });
    if (response.ok) {
      console.log(response)
    }
  };

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
        <div>
          <Link href="/signup"><button className="mr-10">Sign up</button></Link>
          <Link href="/login"><button className="mr-10">Login</button></Link>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
