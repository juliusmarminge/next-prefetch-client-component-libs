"use client";

import * as React from "react";

function getBaseUrl() {
  const vcurl = process.env.VERCEL_URL;
  if (vcurl) return `https://${vcurl}`; // use Vercel URL for production

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

async function fetchData() {
  const url = getBaseUrl() + "/api/data";
  const res = await fetch(url);
  const data = await res.json();
  return data as { message: string };
}

function usePrefetchedData() {
  const promiseRef = React.useRef<Promise<{ message: string }>>();
  console.log(promiseRef.current);

  if (!promiseRef.current) {
    promiseRef.current = fetchData();
  }

  console.log(promiseRef.current);

  const data = React.use(promiseRef.current);
  return data;
}

export function ClientComponent() {
  // Component prefetches data to avoid flickering
  const data = usePrefetchedData();

  // Component needs to be a client component cause it uses hooks
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Client Component</h1>
      <p>{data.message}</p>

      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
