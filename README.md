# React useResource

This is SolidJS's `createResource` API, implemented in React.

## Disclaimer

This is just a clone of Solid's API It's not a complete implementation, just the basics. It doesn't make a lot of sense in the context of React, but hey, I like it, so here it is!

## Usage

```tsx
import { useResource } from '?'

const fetcher = () => fetch('https://api.example.com/data')
const [data, { refetch, mutate }] = useResource(fetcher)

return (
  <pre>
    {!data.latest && data.isLoading
    ? 'Loading...'
    : JSON.stringify(data(), null, 2)}
    {data.error && <div>Error: {data.error}</div>}
   </pre>
)
```
