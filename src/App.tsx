import { useState } from 'react'
import './App.css'
import { useResource } from './hooks/useResource'

const App = () => {
	const [counter, setCounter] = useState<number>(1)
	const fetcher = () =>
		fetch(`https://jsonplaceholder.typicode.com/todos/${counter}`).then(res =>
			res.json()
		)
	const [data, { refetch }] = useResource(fetcher)

	const handleRefetch = () => {
		setCounter(counter + 1)

		refetch()
	}

	return (
		<pre>
			{!data.latest && data.isLoading
				? 'Loading...'
				: JSON.stringify(data(), null, 2)}
			{data.error && <div>Error: {data.error}</div>}
		</pre>
	)
}
// <button onClick={handleRefetch}>Refetch</button>

export default App
