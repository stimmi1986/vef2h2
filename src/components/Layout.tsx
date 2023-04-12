import Link from 'next/link';

const Layout: React.FC = ({ children }) => {
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
          <Link href="/signup"><button className="mr-2">Sign up</button></Link>
          <Link href="/login"><button className="mr-2">Login</button></Link>
          <Link href="/logout"><button className="mr-2">Sign Out</button></Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;





/*
export function Layout({ title, children, footer }) {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        {children}
      </main>
      <footer>
        {footer}
      </footer>
    </>
  )
}

export default Layout;
*/
