<script lang="ts">
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import TrashCan from 'svelte-material-icons/TrashCan.svelte';
	import ToggleSwitch from 'svelte-material-icons/ToggleSwitch.svelte';
	import ToggleSwitchOff from 'svelte-material-icons/ToggleSwitchOff.svelte';
	import { callSuccessToast, useFetch } from '../hooks.client';
	import type { TodoAttributes } from '../sequelize/models/todo.model';
	import { todos, type ResponseData } from '$lib/store';

	export let todo: TodoAttributes;
	let editMode: boolean = false;
	let editLoading: boolean = false;

	const { executeFetch: callEditTodo, subscribe: editSubscribe } = useFetch(
		'todo/update/' + todo.id
	);
	const { executeFetch: callDeleteTodo, subscribe: deleteSubscribe } = useFetch(
		'todo/delete/' + todo.id
	);
	const { executeFetch: callToggleTodo, subscribe: toggleSubscribe } = useFetch(
		'todo/toggle/' + todo.id
	);

	const todoActions = {
		editTodo: async (body: { title: string; description: string }) => {
			editLoading = true;
			let data: ResponseData | null = null,
				loading: boolean = false;

			editSubscribe((val) => {
				data = val.data;
				loading = val.loading;
			});

			await callEditTodo({
				method: 'PATCH',
				body
			});

			if (data) {
				const { success } = data;

				if (success) {
					const todoIdx = $todos.findIndex((t) => t.id === todo.id);

					if (todoIdx !== -1) {
						$todos[todoIdx] = { ...$todos[todoIdx], ...todo };

						todos.set($todos);
					}

					callSuccessToast('Task edited successfully');
				}
			}

			editMode = false;
			editLoading = false;
		},

		deleteTodo: async () => {
			let data: ResponseData | null = null,
				loading: boolean = false;

			deleteSubscribe((val) => {
				data = val.data;
				loading = val.loading;
			});
			await callDeleteTodo({
				method: 'DELETE'
			});

			if (data) {
				const { success } = data;

				if (success) {
                    const newState = [...$todos]
					const todoIndex = newState.findIndex((td) => td.id === todo.id);

					if (todoIndex !== -1) {
						newState.splice(todoIndex, 1);
						todos.set(newState);
					}

					callSuccessToast('Task deleted successfully');
				}
			}
		},

		toggleTodo: async () => {
			let data: ResponseData | null = null,
				loading: boolean = false;

			toggleSubscribe((val) => {
				data = val.data;
				loading = val.loading;
			});
			await callToggleTodo({
				method: 'PATCH'
			});

			if (data) {
				const { success, data: toggleData } = data as ResponseData;

				if (success && toggleData) {
					const completed = toggleData.completed;

					const newList = $todos.map((td) => {
						td.id === todo.id ? (td = { ...todo, completed }) : todo;
						return td;
					});


					todos.set(newList);

					callSuccessToast(`Task ${completed ? 'set to completed' : 'set to uncompleted'} `);
				}
			}
		}
	};
</script>

<li class="todo">
	{#if !editMode}
		<div class="todo--item">
			<h2>{todo.title}</h2>
			<p>{todo.description}</p>
		</div>
	{:else}
		<div class="todo--item">
			<input bind:value={todo.title} placeholder="title" readOnly={!editMode} />
			<textarea bind:value={todo.description} placeholder="description" readOnly={!editMode} />
		</div>
	{/if}

	<div class="actions">
		<button
			class="edit--action"
			on:click={() =>
				editMode
					? todoActions.editTodo({
							title: todo.title,
							description: todo.description || ''
					  })
					: (editMode = true)}
		>
			{#if !editMode}
				<Pencil />
			{:else}
				{editLoading ? 'Saving...' : 'Save'}
			{/if}
		</button>
		<button class="delete--action" on:click={todoActions.deleteTodo}>
			<TrashCan  />
		</button>
		<button class="toggle--action" on:click={todoActions.toggleTodo}>
			{#if todo.completed}
				<ToggleSwitch />
			{:else}
				<ToggleSwitchOff on:click={todoActions.toggleTodo} />
			{/if}
		</button>
	</div>
</li>
