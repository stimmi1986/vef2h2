import { AuthContext } from "$/pages/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import jwt from 'jsonwebtoken';
import { Input } from "./form/Input";
import { Button } from "./form/Button";

export const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface img {
  name: string;
  url: string;
}
export const AddImgForm: React.FC<{}> = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
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
  if (!isAdmin || !loggedIn) {
    return <></>
  }
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleURL = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUrl(event.target.value);
  };

  const ImgSubmitter = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${BaseUrl}/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ name, url }),
      });
      const data = await res.json();
      if (res.ok) {
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
    <form onSubmit={ImgSubmitter} className="w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="name">Veldu Nafn á mynd:</label>
        <input type="text" id="name" name="name" className="w-full border border-gray-400 p-2 rounded-md" onChange={handleName} />
      </div>
      <div className="mb-4">
        <label htmlFor="url">Url Myndar:</label>
        <input type="text" id="url" name="url" className="w-full border border-gray-400 p-2 rounded-md" onChange={handleURL}></input>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Hlaða inn mynd
      </button>
    </form>
  )
}

export const AddEventImg: React.FC<{ slug: string }> = ({ slug }) => {
  const router = useRouter();
  const [name, setName] = useState("");
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
  if (!isAdmin || !loggedIn) {
    return <></>
  }
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const ImgSubmitter = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${BaseUrl}/image/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
      }
      console.log(data);
      setLoggedIn(true);
      setIsAdmin(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
    useEffect(() => {
    }, []);
  };

  return (<form className="w-full max-w-lg">
    <ImgNameSelect func={handleName} />
    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      tengja mynd við viðburð
    </button>
  </form>)
}

export const GetEventImgs: React.FC<{ event: string, name: string,  }> = ({ event }) => {
  const [img, setImg] = useState<img[]>([]);
  async function EvImgs() {
    try {
      const response = await fetch(`${BaseUrl}/event/${event}/img`, {
        method: "GET"
      });
      const dat = await response.json();
      setImg(dat);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    EvImgs();
  }, []);

  return (<ul className="divide-y divide-gray-300">
    {img.map((d, i) => (
      <li key={i} className="py-4">
        <ShowImg url={d.url} name={d.name} />
      </li>
    ))}
  </ul>
  )
};

export const ImgNameSelect: React.FC<{ func: Function }> = ({ func }) => {
  const [img, setImg] = useState<img[]>([]);
  async function AllImgs() {
    try {
      const response = await fetch(`${BaseUrl}/image`, {
        method: 'GET'
      });
      const dat = await response.json();
      console.log(dat);
      setImg(dat)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AllImgs();
  }, []);

  return (
    <select name="img" id="img" onChange={func} className="w-full max-w-lg">
      {img.map((d, i) => (
        <option key={i} value={d.name}>{d.name}</option>
      ))}
    </select>)
}

export const GetAllImgs: React.FC<{}> = () => {
  const [img, setImg] = useState<img[]>([]);
  async function AllImgs() {
    try {
      const response = await fetch(`${BaseUrl}/image`, {
        method: 'GET'
      });
      const dat = await response.json();
      console.log(dat);
      setImg(dat);
    } catch (error) {
      console.log(error);
    }
  }



  const handleAllImgsDelete = async (slug: string) => {
    const token = Cookies.get('signin');
    const response = await fetch(`${BaseUrl}/image/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({slug, token})
    });
    console.log(response);
    if (response.ok) {
      AllImgs();
    }
  };

  useEffect(() => {
    AllImgs();
  }, []);

  return (
    <>
      <ul className="img-grid">
        {img.map((d, i) => (
          <li key={i} className="img-grid-item flex justify-center items-center">
            <div>
              <p>{d.name}</p>
              <ShowImg url={d.url} name={d.name} />
              <button
              className='text-2ml ml-4 mr-4 hover:text-red-500'
              onClick={() => handleAllImgsDelete(d.name)}
              >
              delete?
            </button>
            </div>
          </li>
        ))}
      </ul>

      <style>{`
        .img-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 20px;
        }

        .img-grid-item {
          list - style: none;
          text-align: center;
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </>
  );


}

export const ShowImg: React.FC<{ url: string, name: string }> = ({ url, name }) => {
  return (
    <img src={url} alt={name} width={'120px'} height={'120px'} />
  )
}
