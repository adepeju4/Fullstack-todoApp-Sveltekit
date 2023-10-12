/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import { toasts } from 'svelte-toasts';
import { FetchStore } from '$lib/store';

type FetchOptions = {
	method?: string;
	queryParams?: Record<string, string>;
	body?: unknown;
};

interface IFetchState {
	loading: boolean;
	data: any;
	error: Error |null;
}

const createFetchStore = (initialState: IFetchState) => {
	const fetchStore = writable(initialState);

	return {
		store: FetchStore,
		subscribe: fetchStore.subscribe,
		setLoading: (loading: boolean) => fetchStore.update((store) => ({ ...store, loading })),
		setData: (data: any) => fetchStore.update((store) => ({ ...store, data })),
		setError: (error: Error) => fetchStore.update((store) => ({ ...store, error }))
	};
};

export const useFetch = (url: string) => {
	const { setLoading, setData, setError, subscribe } = createFetchStore({
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

			const data = await response.json();

			setData(data);
			setLoading(false);
		} catch (err: unknown) {
			const error = err as Error
			toasts.add({
				title: 'Error',
				description: error.message,
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
	console.log(message, "hello")
	toasts.add({
		title: 'Success',
		description: message,
		type: 'success',
		placement: 'bottom-left',
		duration: 3000
	});
};
