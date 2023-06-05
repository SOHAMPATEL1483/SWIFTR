<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
</script>

<form action="?/testaction" method="POST" enctype="multipart/form-data">
	<input type="file" id="in" name="image" />
	<input class="btn variant-filled-primary" type="submit" value="submit" />
</form>
