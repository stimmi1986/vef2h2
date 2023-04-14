import { BaseUrl } from "$/components/Layout";
import { useRouter } from "next/router";

function Event({ event }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
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
