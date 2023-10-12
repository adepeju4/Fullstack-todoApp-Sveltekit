<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ResponseData } from '$lib/store';
	import { useFetch } from '../hooks.client';

	const { executeFetch: logout, subscribe } = useFetch('auth/logout');

	let data: ResponseData | null = null,
		loading: boolean = false;

	subscribe((val) => {
		(data = val.data), (loading = val.loading);
	});

	$: if (data) {
		const { success } = data;
		if (success) {
			goto('/auth/login');
		}
	}

	const handleLogout = async () => {
		await logout({ method: 'POST' });
	};
</script>

<div class="logout">
	<button type="button" on:click={handleLogout}>
		{loading ? 'Logging out...' : 'Log Out'}
	</button>
</div>
