<script lang="ts">
	import PrivateRoute from '../Components/PrivateRoute.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import { user } from '$lib/store';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Logout from '../Components/Logout.svelte';
	import Createtodo from '../Components/Createtodo.svelte';
	import TodoList from '../Components/TodoList.svelte';

	onMount(() => {
		if (!$page.data.user) goto('/auth/login');
		else {
			user.set({ isAuthenticated: true, data: $page.data.user });
		}
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
