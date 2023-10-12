<script lang="ts">

	import type { UserStore } from '$lib/store';
	export let user: UserStore;

</script>

<main>
	{#if !user.data}
		<p>loading...</p>
	{:else}
		<slot />
	{/if}
</main>
