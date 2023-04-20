import { useEffect, useState } from "react";
import { BaseUrl } from "./Layout";
import Cookies from 'js-cookie';
import { UsernameToken } from "./Verify";

interface Regi {
    id: number;
    name: string;
    username: string;
    comment: string;
    created: string;
    updated: string;
  }

export const Regis: React.FC<{ regis: Regi[] }> = ({
    regis,
  }) => {
    return (<ul className="divide-y divide-gray-300">
      {regis.map((d,i)=>(
          <li key={i} className="py-4">
              <p>{d.name}</p>
              <p>{d.comment}</p>
          </li>
      ))}
      </ul>
    )
}
const UsernameSelect: React.FC<{func:Function}> = ({func})=>{
    const [usernames, setUsernames] = useState<string[]>([]);
    async function userNamesGet(){
        try{
            const token = Cookies.get('signin');
            const response = await fetch(`${BaseUrl}/usernames`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body:JSON.stringify({token})
            })
            if(response.ok){
                setUsernames(await response.json());
            }
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        userNamesGet();
    },[]);
    return (<select name="img" id="img" onChange={func}  className="w-full max-w-lg">
        {usernames.map((d,i)=>(
            <option key={i} value={d}>{d}</option>
        ))}
    </select>);
}
export function UserNameOrSelect(Admin:boolean,func:Function){
    if(Admin){
        return <UsernameSelect func={func}/>
    }
    const username = UsernameToken();
    return <input id="username"name="username"value={username}></input>
}