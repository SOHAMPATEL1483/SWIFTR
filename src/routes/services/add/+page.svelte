<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import Preloader from '$lib/Preloader.svelte';

	let categories = [
		'cleaning',
		'plumbing',
		'electrician',
		'carpentry',
		'gardening',
		'painting',
		'pest control',
		'beauty',
		'fitness',
		'tutoring',
		'photography',
		'repair',
		'handyman',
		'moving',
		'massage',
		'therapy',
		'other'
	];

	// export let form: ActionData;
	//@ts-ignore
	// $: if (form) toastStore.trigger({ message: form?.msg, background: 'variant-filled-error' });
</script>

<Preloader>
	<div class="mx-auto my-16 w-full font-poppins">
		<div class="card  mx-auto w-5/6  p-5 lg:w-1/3">
			<!-- heading -->
			<p class="unstyled text-center font-poppins text-4xl font-bold">Add New Service</p>
			<!-- form -->
			<form action="?/AddService" method="post" use:enhance>
				<label class="name">
					<span>Name</span>
					<input class="input rounded-md" type="text" placeholder="name" name="name" required />
				</label>
				<label class="description">
					<span>Description</span>
					<textarea
						class="textarea"
						rows="2"
						placeholder="Enter description for your service"
						name="description"
						required
					/>
				</label>
				<label class="category">
					<span>Category</span>
					<select class="select" name="category" required>
						{#each categories as c}
							<option value={c}>{c}</option>
						{/each}
					</select>
				</label>
				<label class="price">
					<span>price</span>
					<input class="input rounded-md" type="number" placeholder="price" name="price" required />
				</label>
				<label class="image">
					<span>Image</span>
					<input class="input rounded-md" name="image" type="file" />
				</label>

				<button type="submit" class="btn variant-filled-primary w-full">Create Service</button>
			</form>
		</div>
	</div>
</Preloader>

<style>
	label {
		margin-top: 0.75rem /* 20px */;
		margin-bottom: 0.75rem /* 20px */;
	}
	input,
	select,
	textarea {
		margin-top: 0.5rem;
		padding: 5px;
	}
</style>
