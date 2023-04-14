import { BaseUrl } from '$/components/Layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

type EventProps = {
  event: {
    name: string,
    description: string,
    slug: string,
  },
};

function Event({ event }: EventProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const admin = localStorage.getItem('isAdmin');

    if (loggedIn && admin) {
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleEdit = () => {
    router.push(`/event/${event.slug}/edit`);
  };

  const handleDelete = () => {
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>

      {isLoggedIn && isAdmin && (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  console.log(context.query)

  const res = await fetch(`${BaseUrl}/event/${slug}`);
  const event = await res.json();

  return {
    props: {
      event,
    },
  };
}

export default Event;
