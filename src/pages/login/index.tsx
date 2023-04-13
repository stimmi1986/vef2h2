import { useState, useEffect } from 'react';
import cookie from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = cookie.get('token');
    if (token) {
      // If a token exists in the cookie, send it to the server to check if it's valid
      fetch('http://localhost:4000/check-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      })
        .then(response => {
          if (response.ok) {
            setLoggedIn(true);
            setIsAdmin(response.isAdmin);
            setUsername(response.username);
          } else {
            cookie.remove('token');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
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
      cookie.set('token', data.access_token, { expires: data.expiresIn / 86400 });
    }
  };

  let message;
  console.log('Mess:', message)
  if (!loggedIn) {
    message = <div>You are not logged in.</div>;
  } else if (isAdmin) {
    message = <div>You are an admin.</div>;
  } else {
    message = <div>You are not an admin, but you are awesome!</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log In</button>
      </form>
      {message}
    </div>
  );
};

export default Login;
