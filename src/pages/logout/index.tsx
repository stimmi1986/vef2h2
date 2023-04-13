import { useState } from 'react';

const LogOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setIsLoading(false);
    console.log(response.status);
  };

  return (
    <div>
      <button onClick={handleLogOut} disabled={isLoading}>
        Sign Out
      </button>
    </div>
  );
};

export default LogOut;
