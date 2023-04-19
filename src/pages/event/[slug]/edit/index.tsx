import React, { useState, useEffect, useContext } from 'react';
import { BaseUrl, NEXT_PUBLIC_JWT_SECRET } from "$/components/Layout";
import { useRouter } from "next/router";
import { AuthContext } from '$/pages/auth';
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

function Edit({ event, slug }: { event: Event, slug: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAdmin, loggedIn, setLoggedIn, setIsAdmin } = useContext(AuthContext);


  useEffect(() => {
    const signin = Cookies.get('signin');
    if (signin && NEXT_PUBLIC_JWT_SECRET) {
      const dec: any = jwt.decode(signin);
      if (dec) {
        console.log(dec);
        setLoggedIn(true);
        setIsAdmin(dec.admin);
      }
    }
  }, []);

  const handleUpdateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUpdateDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const signin = Cookies.get("signin");
      const token = localStorage.getItem("token");
      const res = await fetch(`${BaseUrl}/event/${slug}`, {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("signin", data.signin);
      }



      console.log(data);
      setLoggedIn(true);
      setIsAdmin(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">{event.name}</h1>
      <p className="text-lg mb-6">{event.description}</p>
      {loggedIn && isAdmin && (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Breyta nafni á atburð
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleUpdateName}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              breyta lýsingu á atburð
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleUpdateDescription}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            vista breitingar
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

export default Edit;
