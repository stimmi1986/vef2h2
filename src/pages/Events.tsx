import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BaseUrl } from '../components/Layout';


interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  created: string;
  updated: string;
}

export const Events: React.FC<{title: string}> = ({ title }) => {
  const [events, setEvents] = useState<Event[]>([]);

  async function fetchEvents() {
    try {
      const res = await fetch(`${BaseUrl}/event/`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
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
