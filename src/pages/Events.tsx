import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { BaseUrl, NEXT_PUBLIC_JWT_SECRET } from '../components/Layout';
import { useRouter } from 'next/router';
import { AuthContext } from './auth';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  created: string;
  updated: string;
}

export const Events: React.FC<{ title: string }> = ({
  title,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  const { isAdmin, loggedIn, setLoggedIn, setIsAdmin } = useContext(AuthContext);

  async function fetchEvents() {
    try {
      const res = await fetch(`${BaseUrl}/event/`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (slug: string) => {
    const response = await fetch(`${BaseUrl}/event/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug })
    });
    if (response.ok) {
      fetchEvents();
    }
  };

  useEffect(() => {
    fetchEvents();
    const token = Cookies.get('signin');
    if (token && NEXT_PUBLIC_JWT_SECRET) {
      const dec = jwt.decode(token);
      if (dec) {
        console.log(dec);
        setLoggedIn(true);
        setIsAdmin(true);
      }
    }
  }, [isAdmin, loggedIn, setIsAdmin, setLoggedIn]);

  return (
    <ul className="divide-y divide-gray-300">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {events.map((event, i) => (
        <li key={i} className="py-4">
          <Link href={`/event/${event.slug}`} className="text-lg font-bold">
            {event.name}
          </Link>
          {isAdmin && (
            <>
            <button
              className='text-2ml ml-4 mr-4 hover:text-red-500'
              onClick={() => handleDelete(event.slug)}
            >
              delete?
            </button>
            <>or</>
            <Link href={`/event/${event.slug}/edit`} className='text-2ml ml-4 hover:text-green-500'>
            Edit?
            </Link>
            </>
          )}
          <p className="mt-2">{event.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default Events;
