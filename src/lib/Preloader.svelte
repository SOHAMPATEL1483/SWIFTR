<script lang="ts">
	import { navigating } from '$app/stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
</script>

{#if $navigating}
	<div class="h-fit w-fit mx-auto mt-64">
		<ProgressRadial
			width="w-20"
			stroke={90}
			meter="stroke-primary-500"
			track="stroke-primary-500/30"
		/>
	</div>
{:else}
	<slot />
{/if}
