<script>
// @ts-nocheck

    import { page } from '$app/stores';

    console.log($page.error, "FOR PAGE")
</script>

<div class="error">
<h1>{$page.status}</h1>
<p>{$page?.error.message}</p>
<p>error code: {$page?.error.statusCode}</p>
</div>
