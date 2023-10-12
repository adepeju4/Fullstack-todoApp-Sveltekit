<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ResponseData } from '$lib/store';

	import { useFetch } from '../../../hooks.client';

	let userInput = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	};

	const { executeFetch, subscribe } = useFetch('auth/signup');
	let data: ResponseData | null = null,
		loading: boolean = false;

	subscribe((val) => {
		(data = val.data), (loading = val.loading);
	});

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		await executeFetch({
			method: 'POST',
			body: userInput
		});
	};

	$: if (data) goto('/');

</script>

<form on:submit={handleSubmit} class="signup">
	<label>
		First Name:
		<input type="text" name="firstName" bind:value={userInput.firstName} required />
	</label>
	<br />
	<label>
		Last Name:
		<input type="text" name="lastName" bind:value={userInput.lastName} required />
	</label>
	<br />
	<label>
		Email:
		<input type="email" name="email" bind:value={userInput.email} required />
	</label>
	<br />
	<label>
		Password:
		<input type="password" name="password" bind:value={userInput.password} required />
	</label>
	<br />
	<p>
		Already have an account? <a href="/auth/login">Login</a>
	</p>
	<button type="submit">{loading ? 'Signing up' : 'Sign Up'}</button>
</form>
