import React, { useState, useEffect, useContext } from 'react';
import { BaseUrl } from "$/components/Layout";
import { GetEventImgs } from "$/components/img";
import { useRouter } from "next/router";
import { AuthContext } from '$/pages/auth';
import Cookies from 'js-cookie';

interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  created: string;
  updated: string;
}

interface Registration {
  id: number;
  username: string;
  comment: string;
}

function SignUp({ slug, event }: { event: Event, slug: string }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [comment, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAdmin, loggedIn } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState<Registration[]>([]);


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
      const token = Cookies.get("signin");
      console.log('token:1', token)
      const res = await fetch(`${BaseUrl}/event/${slug}`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, comment, token }),
      });
      const data = await res.json();
      console.log(data);
      setRegistrations([...registrations, data]);
      setUsername("");
      setDescription("");
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    async function fetchRegistrations() {
      const response = await fetch(`${BaseUrl}/event/${slug}/regis`);
      const data = await response.json();
      setRegistrations(data);
    }
    fetchRegistrations();
  }, []);


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
      <p className="text-lg mb-6">{event.description}</p>
      <div className="flex flex-col w-full">
        <h1 className="text-lg uppercase mb-2">Skráning á atburð</h1>
        <ul className="divide-y divide-gray-400">
          {registrations.map((registration: Registration) => (
            <li key={registration.id}>
              <p className="text-gray-800 font-bold uppercase m-0 p-0">
                Notendanafn: &nbsp;
                <span className="text-lg text-gray-700">
                  {registration.username}
                </span>
              </p>
              <p className="text-gray-800 font-bold m-0 p-0">
                Comment: &nbsp;
                <span className="text-lg text-gray-700">
                  {registration.comment}
                <div className="divide-y divide-gray-400" />
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <GetEventImgs event={event.slug} />
      {loggedIn && isAdmin && (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Nafn
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
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleSignUpDescription}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Skrá sig á atburð
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
