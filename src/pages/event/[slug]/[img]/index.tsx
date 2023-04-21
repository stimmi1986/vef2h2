import React from 'react'
import { ShowImg } from '$/components/img'
import { BaseUrl } from '$/components/Layout'


interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  created: string;
  updated: string;
}

export function eventImg({ url, event, name, slug  }: {event: Event, url: string, name: string, slug: string}) {
  return (
    <ShowImg url={event.slug} name={name}/>

  )
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
