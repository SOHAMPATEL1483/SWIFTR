<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import Spinner from '$lib/spinner.svelte';
	import Preloader from '$lib/Preloader.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	// export let data: PageData;
	export let form: ActionData;
	//@ts-ignore
	$: if (form?.msg) toastStore.trigger({ message: form?.msg, background: 'variant-filled-error' });
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
	<!-- <pre>{JSON.stringify(form, null, 4)}</pre> -->
	<div class="container h-full mx-auto flex justify-center items-center font-poppins">
		<div class="card   w-5/6 lg:w-1/4 p-5">
			<!-- heading -->
			<p class="text-center font-bold font-poppins text-4xl unstyled">Sign in</p>
			<!-- form -->
			<form action="?/signin" method="post" use:enhance={custom_enhance}>
				<label class="email">
					<span>Email</span>
					<input
						class:input-error={form?.error?.email}
						class="input rounded-md"
						type="email"
						placeholder="email"
						name="email"
						required
					/>
					{#if form?.error?.email}
						<p class="unstyled text-sm text-error-400">{form.error.email[0]}</p>
					{/if}
				</label>
				<label class="Password">
					<span>Password</span>
					<input
						class:input-error={form?.error?.password}
						class="input rounded-md"
						type="password"
						placeholder="Password"
						name="password"
						required
					/>
					{#if form?.error?.password}
						<p class="unstyled text-sm text-error-400">{form?.error?.password[0]}</p>
					{/if}
				</label>
				<button disabled={loading} type="submit" class="btn variant-filled-primary w-full">
					{#if loading}
						<Spinner />
					{/if}
					Signin
				</button>
			</form>
			<p class="mt-5">Don't have Account? <a href="/signup">Signup</a></p>
		</div>
	</div>
</Preloader>

<style>
	label {
		margin-top: 1.25rem /* 20px */;
		margin-bottom: 1.25rem /* 20px */;
	}
	input {
		margin-top: 0.5rem;
		padding: 5px;
	}
</style>
