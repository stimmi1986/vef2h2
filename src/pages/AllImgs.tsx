import { AddImgForm, GetAllImgs } from "$/components/img";

export default function Home() {
  return(
  <>
    <div className="flex flex-col w-full h-full">
      <div className="justify-center mt-4 mb-8">
        <GetAllImgs/>
      </div>
      <div>
        <AddImgForm/>
      </div>
    </div>
  </>
  )
};
