import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  created: string;
  updated: string;
}

export const Events: React.FC = ({ title }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('http://localhost:4000/event/');
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvents();
  }, []);

  return (

    <ul className="divide-y divide-gray-300">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {events.map((event, i) => (
        <li key={i} className="py-4">
          <Link href={`/event/${event.slug}`} className="text-lg font-bold">
            {event.name}
          </Link>
          <p className="mt-2">{event.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default Events;
