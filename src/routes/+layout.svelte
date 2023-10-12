<script lang="ts">
	import './app.css';
	import { ToastContainer, FlatToast } from 'svelte-toasts';
</script>

<main>
	<slot />
</main>
<ToastContainer let:data placement="top-right" showProgress theme="light" duration={5000}>
	<FlatToast {data} />
</ToastContainer>
