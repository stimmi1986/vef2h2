import React, { useState, useEffect, useContext } from 'react';
import { BaseUrl } from "$/components/Layout";
import { GetEventImgs } from "$/components/img";
import { useRouter } from "next/router";
import { AuthContext } from '$/pages/auth';
import Cookies from 'js-cookie';
import { NameToken, UsernameToken } from '$/components/Verify';
import { Regis, UserNameOrSelect } from '$/components/regis';

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
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAdmin, loggedIn } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  if(loggedIn){
    setUsername(UsernameToken());
    setName(NameToken())
  };

  const handleSignUpName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSignUpDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setComment(event.target.value);
  };
  const handleUsername = (event:React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault();
    setUsername(event.target.value);
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, comment, token }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      setRegistrations([...registrations, data]);
      setUsername("");
      setComment("");
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
  const usernameOrSel = UserNameOrSelect(isAdmin,()=>handleUsername);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
      <p className="text-lg mb-6">{event.description}</p>
      <GetEventImgs event = {event.slug}/>
      {loggedIn && (
        <form onSubmit={()=>handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Nafn
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={()=>handleSignUpName}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 font-bold mb-2"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={()=>handleSignUpDescription}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
            {usernameOrSel}
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
