<script lang="ts">
	//@ts-nocheck
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import Preloader from '$lib/Preloader.svelte';
	import Spinner from '$lib/spinner.svelte';

	export let data: PageData;
	export let form: ActionData;
	$: if (form) toastStore.trigger({ message: form?.msg });

	let loading = false;
	const custom_enhance: SubmitFunction = () => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<Preloader>
	<div class="flex mx-5 mt-5 font-poppins justify-between">
		<p class="unstyled my-auto text-xl font-bold dark:text-slate-300">Your Cart</p>
		<form action="?/checkout" method="post" use:enhance={custom_enhance}>
			<button disabled={loading} type="submit" class="btn variant-filled-primary">
				{#if loading}
					<Spinner />
				{/if}
				Checkout
			</button>
		</form>
	</div>

	<div class=" font-poppins flex flex-wrap">
		{#each data.items as item}
			<div class="card card-hover max-w-[320px] p-5 m-5 divide-y-2 divide-slate-600">
				<div class="mb-3">
					<a class="unstyled" href={'/services/' + item.Service.id}>
						<p class="unstyled text-xl font-semibold text-center mb-5">{item.Service.name}</p>
						<p class="unstyled italic text-sm">
							{item.Service.description}
						</p>
						<p class="unstyled text-xl font-semibold my-2">₹{item.Service.price}</p>
						<!-- <p>⭐{item.services.avgRating} ({item.services.noOfReviews})</p> -->
						<p class="my-2">On {new Date(item.Service.createdAt).toLocaleDateString()}</p>
					</a>
				</div>
				<div class="flex justify-between pt-4">
					<p class="my-auto mr-6">Quantity : {item.quantity}</p>
					<form action="?/removeItem" method="post" use:enhance>
						<input type="hidden" name="id" value={item.Service.id} />
						<input type="hidden" name="quantity" value={item.quantity} />
						<button type="submit" class="btn variant-filled-error rounded-lg font-poppins"
							>Remove</button
						>
					</form>
				</div>
			</div>
		{:else}
			<p class="unstyled text-xl mt-16 mx-auto">No items in Cart</p>
		{/each}
	</div>

	<!-- <pre>{JSON.stringify(data, null, 4)}</pre> -->
</Preloader>
