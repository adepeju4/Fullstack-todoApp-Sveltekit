<script lang="ts">
	import { derived } from 'svelte/store';
	import Todo from '../Components/Todo.svelte';
	import { todos, type ResponseData } from '$lib/store';
	import { useFetch } from '../hooks.client';
	import type { TodoAttributes } from '../sequelize/models/todo.model';
	import { onMount } from 'svelte';

	const { executeFetch, subscribe } = useFetch('todo');

	let filtered: TodoAttributes[] = [];
	let filter: string = 'all';
	let sortOrder: string = 'asc';

	let data: ResponseData | null = null,
		loading: boolean = false;

	subscribe((val) => {
		(data = val.data), (loading = val.loading);
	});
	export const getTodos = (): void => {
		executeFetch();
	};

	$: if (data) {
		todos.set(data.data as TodoAttributes[]);
	}

	$: todos.subscribe((list) => {
		filtered = list;
		if (filter === 'completed') {
			filtered = list.filter((todo) => todo.completed === true);
		} else if (filter === 'active') {
			filtered = list.filter((todo) => todo.completed === false);
		}

		filtered = [...filtered].sort((a, b) => {
			const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
			const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
			return sortOrder === 'asc'
				? dateA.getTime() - dateB.getTime()
				: dateB.getTime() - dateA.getTime();
		});
	});

	onMount(() => {
		getTodos();
	});
</script>

<div class="todo--list">
	<div class="list--heading">
		<h1>TODOS</h1>
		<div class="list--actions">
			<select bind:value={filter}>
				<option value="all">All</option>
				<option value="completed">Completed</option>
				<option value="active">Active</option>
			</select>
			<select bind:value={sortOrder}>
				<option value="asc">Oldest</option>
				<option value="desc">Newest</option>
			</select>
		</div>
	</div>
	<hr />
	<ul>
		{#if loading}
			<p>Loading...</p>
		{:else}
			{#each filtered as todo (todo.id)}
				<Todo {todo} />
			{/each}
		{/if}
	</ul>
</div>
