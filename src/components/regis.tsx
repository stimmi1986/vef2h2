import { useEffect, useState } from "react";

interface Regi {
    id: number;
    name: string;
    username: string;
    comment: string;
    created: string;
    updated: string;
  }

export const Regis: React.FC<{ slug: string }> = ({
    slug,
  }) => {
    const [Regis, setRegis] = useState<Regi[]>([]);

    async function regisGet(){
        try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/${slug}/regis`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        })

        const dat = await response.json();
        setRegis(dat);
        }catch(error) {
            console.error(error);
        }

    }
    useEffect(() => {
        regisGet();
    },[]);

    return (<ul className="divide-y divide-gray-300">
      {Regis.map((d,i)=>(
          <li key={i} className="py-4">
              <p>{d.name}</p>
              <p>{d.comment}</p>
          </li>
      ))}
      </ul>
    )
}
