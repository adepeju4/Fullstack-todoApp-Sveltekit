import { writable } from 'svelte/store';
import { toasts } from 'svelte-toasts';
import { FetchStore } from '$lib/store';
import type { FetchOptions, IFetchState } from './app';

const createFetchStore = <T>(initialState: IFetchState<T>) => {
	const fetchStore = writable(initialState);

	return {
		store: FetchStore,
		subscribe: fetchStore.subscribe,

		setLoading: (loading: boolean) => fetchStore.update((store) => ({ ...store, loading })),
		setData: (data: T) => fetchStore.update((store) => ({ ...store, data, loading: false })),
		setError: (error: Error) => fetchStore.update((store) => ({ ...store, error, loading: false }))
	};
};

export const useFetch = <T>(url: string) => {
	const { setLoading, setData, setError, subscribe } = createFetchStore<T>({
		loading: false,
		data: null,
		error: null
	});
	const executeFetch = async (options?: FetchOptions) => {
		setLoading(true);
		if (options && options.queryParams) {
			const params = new URLSearchParams(options.queryParams).toString();
			url += `?${params}`;
		}
		try {
			const response = await fetch(`/api/${url}`, {
				method: (options && options.method) || 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(options && options.body),
				credentials: 'include'
			});
			if (!response.ok) {
				const err = await response.json();
				throw err;
			}

			const data: T = await response.json();
			setData(data);
			setLoading(false);
		} catch (err: unknown) {
			const error = err as Error;

			toasts.add({
				title: 'Error',
				description: error?.message || 'An error occured',
				type: 'error',
				placement: 'bottom-left',
				duration: 5000
			});
			setError(error);
			setLoading(false);
		}
	};
	return { executeFetch, subscribe };
};
export const callSuccessToast = (message: string): void => {
	toasts.add({
		title: 'Success',
		description: message,

		type: 'success',
		placement: 'bottom-left',
		duration: 3000
	});
};
