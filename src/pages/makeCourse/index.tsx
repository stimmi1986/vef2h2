import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '$/pages/auth';
import jwt from 'jsonwebtoken';
import { BaseUrl } from '$/components/Layout';

interface EventProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  created: string;
  updated: string;
}

interface Props {
  event: EventProps;
}

function Event({ event }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAdmin, setIsAdmin, loggedIn, setLoggedIn } = useContext(AuthContext);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BaseUrl}/event/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();
      if (token && process.env.NEXT_PUBLIC_JWT_SECRET) {
        const dec = jwt.decode(token);
        if (dec) {
          console.log(dec);
          setLoggedIn(true);
          setIsAdmin(true);
          console.log(data);
          setIsSubmitting(false);
          router.push('/');
        } else {
          console.log('Invalid token');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isAdmin && (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Hvað á atburðurinn að heita?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Um hvað á atburðurinn að vera?
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Búa til atburð
            </button>
          </form>
        )}
      </>
    );
  }

  interface Context {
    query: {
      slug: string;
    };
  }

  export async function getServerSideProps(context: Context) {
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
