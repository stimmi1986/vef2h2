import { BaseUrl } from "$/components/Layout";
import { GetEventImgs } from "$/components/img";
import { Regis } from "$/components/regis";
import { useRouter } from "next/router";
import { useState } from "react";
interface Event {
  id: number;
  name: string;
  description: string;
}

function Event({ event,slug }: { event: Event }) {
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
      const res = await fetch(`${BaseUrl}/event/${event}`, {
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
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">{event.name}</h1>
      <p className="text-lg mb-6">{event.description}</p>
      <GetEventImgs event = {slug}/>
      <Regis slug = {slug}/>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
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
              className="block text-gray-700 font-bold mb-2"
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
            Save Changes
          </button>
        </form>
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
      slug,
    },
  };
}

export default Event;
