# Problem

- Library exports a component that uses data
- We want to take advantage of <Suspense> so that component can finish fetching before rendering
- We don't want to make it a server component, since it uses hooks etc for interactivity, and bundling with `use client` directives on different levels gets messy

# Approach

- `fetch` on client during SSR and use `use` to trigger the <Suspense> boundary.

This has the problem that it causes infinite rerenders. I have previously managed to get around this by storing the promise in a ref and `use`-ing the ref instead of the fetch call directly:

```ts
function usePrefetchedData() {
  const promiseRef = React.useRef<Promise<{ message: string }>>();

  if (!promiseRef.current) {
    promiseRef.current = fetchData();
  }

  const data = React.use(promiseRef);
  return data;
}
```
