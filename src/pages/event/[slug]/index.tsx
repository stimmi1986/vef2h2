import { BaseUrl } from "$/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";

interface Event {
  id: number;
  name: string;
  description: string;
  // any other properties
}

function Event({ event }: { event: Event }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const res = await fetch(`${BaseUrl}/event/${event.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();
      console.log(data);
      setName("");
      setDescription("");
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
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      {('loggedIn' || 'isAdmin') && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold">
              Name
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
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold"
            >
              Description
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
            Sign Up
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
    },
  };
}

export default Event;
