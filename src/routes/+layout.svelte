<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.css';
	import { AppBar, Toast } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { enhance, type SubmitFunction } from '$app/forms';
	import Spinner from '$lib/spinner.svelte';
	import { Modal } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let loading = false;
	const custom_enhance: SubmitFunction = () => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	class="px-20 font-poppins"
>
	<svelte:fragment slot="lead">
		<a
			href="/"
			class="self-center whitespace-nowrap text-xl font-semibold tracking-widest dark:text-white md:text-2xl"
		>
			SWIFTR
		</a>
	</svelte:fragment>
	<svelte:fragment>
		<div class="flex gap-7 font-medium">
			<a href="/" class="hover:text-primary-500">Home</a>
			<a href="/services" class="hover:text-primary-500">Services</a>
			<a href="/cart" class="hover:text-primary-500">Cart</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
		{#if data.authuser.isLoggedIn}
			<a href="/user" class="flex gap-3">
				<Avatar initials={data.authuser.name} background="bg-primary-500" width="w-10" />
				<p class="my-auto">{data.authuser.name}</p>
			</a>
			<form method="post" action="/login?/logout" use:enhance={custom_enhance}>
				<button disabled={loading} type="submit" class="btn variant-filled-primary">
					{#if loading}
						<Spinner />
					{/if}Logout
				</button>
			</form>
		{:else}
			<a href="/login" class="btn variant-filled-primary">Login</a>
		{/if}
	</svelte:fragment>
</AppBar>
<Toast />
<Modal />
<slot />
