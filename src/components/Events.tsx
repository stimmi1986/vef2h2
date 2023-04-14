import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BaseUrl } from './Layout';

interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  created: string;
  updated: string;
}

export const Events: React.FC<{ title: string }> = ({ title }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${BaseUrl}/event/`);
        const data = await res.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error loading events.</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <ul className="divide-y divide-gray-300">
        <h1 className="text-2xl font-bold mt-4 mb-8">{title}</h1>
        {events.map((event, i) => (
          <li key={i} className="py-4">
            <Link href={`/event/${event.slug}`} className="text-lg font-bold">
              {event.name}
            </Link>
            <p className="mt-2">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
