<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="w-fit h-fit mx-auto mt-24">
	<h1 class="unstyled font-poppins text-4xl">{$page.error?.message}</h1>
</div>
