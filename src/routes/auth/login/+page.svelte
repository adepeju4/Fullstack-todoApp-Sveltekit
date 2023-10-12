<script lang="ts">
	import { useFetch } from "../../../hooks.client";
	import { goto } from '$app/navigation';
	import type { ResponseData } from "$lib/store";

	let userInput = {
		email: '',
		password: ''
	};

	const { executeFetch, subscribe } = useFetch('auth/login');
	let data: ResponseData | null = null,
		loading: boolean = false;

	subscribe((val) => {
		(data = val.data), (loading = val.loading);
	});

	const loginUser = async (e: Event) => {
		e.preventDefault();
		await executeFetch({
			method: 'POST',
			body: userInput
		});
	};

	$: if (data) {
		goto('/');
	}
</script>

<form on:submit={loginUser} class="login">
	<label>
		Email:
		<input type="email" name="email" bind:value={userInput.email} required/>
	</label>
	<br />
	<label>
		Password:
		<input type="password" name="password" bind:value={userInput.password} required/>
	</label>
	<br />
	<p>
		Don't have an account? <a href="/auth/signup">Signup</a>
	</p>
	<button type="submit">{loading ? 'loading...' : 'login'}</button>
</form>
