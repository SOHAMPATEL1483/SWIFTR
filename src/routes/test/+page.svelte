<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	const handleClick = async () => {
		const modal: ModalSettings = {
			type: 'alert',
			// Data
			title: 'Example Alert',
			body: 'This is an example modal.',
			image: 'https://i.imgur.com/WOgTG96.gif'
		};
		modalStore.trigger(modal);
	};
</script>

<button class="btn variant-filled-primary" on:click={handleClick}>click me</button>
