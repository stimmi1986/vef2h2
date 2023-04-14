import { useState } from 'react';
import { useRouter } from 'next/router';
import { BaseUrl } from '$/components/Layout';

const LogOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const router = useRouter();

  const handleLogOut = async () => {
    setIsLoading(true);
    const response = await fetch(`${BaseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setIsLoading(false);
    console.log(response.status);

    if (response.status === 200) {
      setIsLoggedOut(true);
    }
  };

  if (isLoggedOut) {
    router.push('/');
    return null;
  }

  return (
    <div>
      <button onClick={handleLogOut} disabled={isLoading}>
        Sign Out
      </button>
    </div>
  );
};

export default LogOut;
