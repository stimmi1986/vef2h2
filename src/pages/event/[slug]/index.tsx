import React, { useState, useEffect, useContext } from 'react';
import { BaseUrl, NEXT_PUBLIC_JWT_SECRET } from "$/components/Layout";
import { GetEventImgs } from "$/components/img";
import { useRouter } from "next/router";
import Link from 'next/link';
import { AuthContext } from '$/pages/auth';
import jwt from 'jsonwebtoken';

interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  created: string;
  updated: string;
}

function SignUp({ slug, event }: { event: Event, slug: string }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAdmin, loggedIn, setLoggedIn, setIsAdmin } = useContext(AuthContext);


  const handleSignUpName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSignUpDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>
    ) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("signin");
      console.log('token:1', token)
      const res = await fetch(`${BaseUrl}/event/${slug}`, {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, description }),
      });
      const data = await res.json();
      console.log(data);

      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">{event.name}</h1>
      <p className="text-lg mb-6">{event.description}</p>
      <GetEventImgs event = {event.slug}/>
      {loggedIn && isAdmin && (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={handleSignUpName}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleSignUpDescription}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
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
      slug
    },
  };
}

export default SignUp;
