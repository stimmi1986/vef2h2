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

export const Events: React.FC<{ title: string; isAdmin: boolean }> = ({
  title,
  isAdmin,
}) => {
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

  async function deleteEvent(id: number) {
    try {
      const res = await fetch(`${BaseUrl}/event/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });

      if (res.status === 200) {
        // remove deleted event from events list
        const newEvents = events.filter((event) => event.id !== id);
        setEvents(newEvents);
      } else {
        console.error(`Failed to delete event with ID ${id}`);
      }
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
          {isAdmin && (
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Events;
