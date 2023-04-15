import { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";
import { BaseUrl } from '$/components/Layout';
import { useRouter } from 'next/router';

export const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      jwt.verify(token, NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          localStorage.removeItem('token');
        } else {
          setLoggedIn(true);
          setIsAdmin(decoded.isAdmin);
          setUsername(decoded.username);
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${BaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setLoggedIn(true);
      setUsername(data.username);
      setIsAdmin(data.isAdmin);
      if (data.access_Token) {
        localStorage.setItem('token', data.access_Token);
      }
      router.push('/');
    }
  };

  let message;
  if (!loggedIn) {
    message = <div>You are not logged in.</div>;
  } else if (isAdmin) {
    message = <div>You are an admin.</div>;
  } else {
    message = <div>You are not an admin, but you are awesome!</div>;
  }

  return (
    <div className="max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
      {message}
    </div>
  );
};

export default Login;
