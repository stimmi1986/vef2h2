import { useEffect, useState } from "react";

export const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface img{
  name:string;
  url:string;
}
export const GetEventImgs: React.FC<{event:string}> = ({event})=>{
  const [img,setImg] = useState<img[]>([]);
  async function EvImgs(){
    try{
      const response = await fetch(`${BaseUrl}/event/${event}/img`,{
        method:"GET"
      });
      const dat = await response.json();
      setImg(dat);
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() =>{
    EvImgs();
  },[]);
  return (<ul className="divide-y divide-gray-300">
  {img.map((d,i)=>(
      <li key={i} className="py-4">
          <ShowImg url= {d.url} name={d.name}/>
      </li>
  ))}
  </ul>
)


}
export const GetAllImgs: React.FC<{}> = () => {
  const [img, setImg] = useState<img[]>([]);
  async function AllImgs(){
    try{
      const response = await fetch(`${BaseUrl}/image`, {
        method: 'GET'
      });
      const dat = await response.json();
      console.log(dat);
      setImg(dat);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    AllImgs();
}, []);

return (<ul className="divide-y divide-gray-300">
  {img.map((d,i)=>(
      <li key={i} className="py-4">
          <ShowImg url= {d.url} name={d.name}/>
      </li>
  ))}
  </ul>
)

}
const ShowImg: React.FC<{url:string, name: string}> = ({url,name})=>{
  return (<img src={url} alt={name}/> )
}
