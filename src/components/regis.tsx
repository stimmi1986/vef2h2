import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { BaseUrl } from "./Layout";
import Cookies from 'js-cookie';
import { UsernameToken } from "./Verify";
import { Registration } from "$/pages/event/[slug]";
import { Button } from "$/components/form/Button";


export const DelButton: React.FC<{ user: string, username: string, admin: boolean, func: MouseEventHandler<HTMLButtonElement> }> = ({
  user, username, admin, func }) => {
  if (admin || username === user) {
    return (
      <button onClick={func} value={user} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Eyða
      </button>
    )
  }
  return null;
}


export const Regis: React.FC<{ regis: Registration[], user: string, admin: boolean, func: MouseEventHandler<HTMLButtonElement> }> = ({
  regis, user, admin, func,
}) => {

  return (<ul className="divide-y divide-gray-300">
    {regis.map((d, i) => (
      <li key={i} className="py-4">
        <p>{d.name}</p>
        <p>{d.comment}</p>
        <DelButton user={user} username={d.username} admin={admin} func={func} />
      </li>
    ))}
  </ul>
  )
}

const UsernameSelect: React.FC<{ func: ChangeEventHandler<HTMLSelectElement> }> = ({ func }) => {
  const [usernames, setUsernames] = useState<string[]>([]);
  async function userNamesGet() {
    try {
      const token = Cookies.get('signin');
      const response = await fetch(`${BaseUrl}/usernames`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ token })
      })
      if (response.ok) {
        setUsernames(await response.json());
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    userNamesGet();
  }, []);
  return (<select name="img" id="img" onChange={func} className="w-full max-w-lg">
    {usernames.map((d, i) => (
      <option key={i} value={d}>{d}</option>
    ))}
  </select>);
}

export function UserNameOrSelect(Admin: boolean, func: ChangeEventHandler<HTMLSelectElement>) {
  if (Admin) {
    return <UsernameSelect func={func} />
  }
  const username = UsernameToken();
  return <input id="username" name="username" value={username} readOnly />
}

