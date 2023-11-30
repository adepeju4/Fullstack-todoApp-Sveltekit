<script lang="ts">
	import { todos } from '$lib/store';
	import type { IFetchState, IUserFetchResponse } from '../app';
	import { callSuccessToast, useFetch } from '../hooks.client';

	let todo = {
		title: '',
		description: ''
	};

	let descripLength: number = 0;
	$: descripLength = todo.description.length;

	const { executeFetch: callAddTodo, subscribe } = useFetch<IUserFetchResponse>('todo');
	let fetchState: IFetchState<IUserFetchResponse> | null = null,
		loading: boolean = false;

	subscribe((val) => {
		(fetchState = val), (loading = val.loading);
	});

	const addTodo = async (e: Event) => {
		e.preventDefault();

		await callAddTodo({
			method: 'POST',
			body: todo
		});

		descripLength = 0;
		todo = {
			title: '',
			description: ''
		};
		const data = fetchState?.data;
		if (data?.success) {
			callSuccessToast(data?.message || 'New todo added to your list');

			todos.update((list) => [...list, data?.data]);
		}
	};
</script>

<form on:submit={addTodo} class="add--todo">
	<label for="title">
		Title:
		<input id="title" type="text" bind:value={todo.title} required />
	</label>

	<label for="description" class="description">
		Description:
		<textarea id="description" bind:value={todo.description} disabled={descripLength >= 255} />
		<p class="description--length">{`${descripLength}/255`}</p>
	</label>

	<button type="submit">{loading ? 'Creating..' : 'Create Todo'}</button>
</form>
