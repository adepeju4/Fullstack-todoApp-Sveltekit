<script lang="ts">
	import PrivateRoute from '../Components/PrivateRoute.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import { user } from '$lib/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Logout from '../Components/Logout.svelte';
	import Createtodo from '../Components/Createtodo.svelte';
	import TodoList from '../Components/TodoList.svelte';

	onMount(() => {
		const verifyUser = async () => {
			const response = await fetch('api/auth/verify');

			const data = await response.json();

			if (data.data) {
				user.set({ isAuthenticated: true, data: data.data });
			} else goto('/auth/login');
		};

		verifyUser();
	});
</script>

<section>
	<PrivateRoute user={$user}>
		<header class="todo--header">
			<Pencil />
			<Logout />
			<h3>Create and manage your tasks</h3>
		</header>

		<main class="todo--main">
			<div class="todo--cover">
				<Createtodo />
				<TodoList />
			</div>
		</main>
	</PrivateRoute>
</section>
