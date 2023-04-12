import { useState } from 'react';

const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      credentials: 'include',
    });
    setIsLoading(false);
    console.log(response.status);
  };

  return (
    <div>
      <button onClick={handleSignOut} disabled={isLoading}>
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
