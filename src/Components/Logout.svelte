<script lang="ts">
	import { goto } from '$app/navigation';

	import type { IFetchState, IUserFetchResponse } from '../app';
	import { useFetch } from '../hooks.client';

	const { executeFetch: logout, subscribe } = useFetch<IUserFetchResponse>('auth/logout');

	let fetchState: IFetchState<IUserFetchResponse> | null = null,
		loading: boolean = false;

	subscribe((val) => {
		(fetchState = val), (loading = val.loading);
	});

	$: if (fetchState) {
		const data = fetchState.data;
		
		if (data?.success) {
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
