import { useEffect, useState } from 'react'

type Resource<T> = {
	(): T | undefined
	isLoading: boolean
	error: string | null
	previousState: T | undefined
}

type ResourceControls<T> = {
	refetch: () => void
	mutate: (value: T) => void
}

export const useResource = <T,>(
	fetcher: () => Promise<T>
): [Resource<T>, ResourceControls<T>] => {
	const [data, setData] = useState<T | undefined>(undefined)
	const [previousState, setLatest] = useState<T | undefined>(undefined)
	const [state, setState] = useState<
		'unresolved' | 'pending' | 'ready' | 'refreshing' | 'errored'
	>('unresolved')
	const [error, setError] = useState<string | null>(null)

	const refetch = async () => {
		const currentState = data ? 'refreshing' : 'pending'
		setState(currentState)
		try {
			const newData = await fetcher()
			setLatest(data)
			setData(newData)
			setState('ready')
		} catch (err) {
			setState('errored')
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('An unknown error occurred')
			}
		}
	}

	const mutate = (value: T) => {
		setData(value)
		setLatest(data)
	}

	const resource: Resource<T> = () => data
	resource.isLoading = state === 'pending' || state === 'refreshing'
	resource.error = error
	resource.previousState = previousState

	useEffect(() => {
		refetch()
	}, [])

	return [
		resource,
		{
			refetch,
			mutate,
		},
	]
}
