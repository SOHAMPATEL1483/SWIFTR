<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	import ServiceCard from '$lib/service_card.svelte';
	import Preloader from '$lib/Preloader.svelte';

	export let data: PageData;
</script>

<Preloader>
	<form method="get">
		<div class="flex w-1/3 gap-2 ml-auto mt-4 mr-10">
			<input class="input px-3" type="text" placeholder="Search..." name="search" />
			<button type="submit" class="btn variant-filled-primary">Search</button>
			<a href="/services" class="btn variant-filled-secondary">Clear</a>
		</div>
	</form>
	<div class="font-poppins flex flex-wrap justify-center">
		{#each data.services as service}
			<ServiceCard {service} />
		{:else}
			<p class="unstyled text-xl mt-16">No Services to show</p>
		{/each}
	</div>
	<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
</Preloader>
