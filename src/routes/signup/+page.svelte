<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import Spinner from '../../lib/spinner.svelte';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import Preloader from '$lib/Preloader.svelte';

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
	<!-- <pre>{JSON.stringify(form, null, 2)}</pre> -->
	<div class="w-full mx-auto font-poppins my-16">
		<div class="card w-5/6 lg:w-1/3 p-5 mx-auto">
			<!-- heading -->
			<p class="text-center font-bold font-poppins text-4xl unstyled">Sign up</p>
			<!-- form -->
			<form action="?/signup" method="post" use:enhance>
				<label class="username">
					<span>Username</span>
					<input
						class:input-error={form?.error?.name}
						class="input rounded-md"
						type="text"
						placeholder="Username"
						name="name"
						required
					/>
					{#if form?.error?.name}
						<p class="unstyled text-sm text-error-400">{form?.error?.name[0]}</p>
					{/if}
				</label>
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
						<p class="unstyled text-sm text-error-400">{form.error.password[0]}</p>
					{/if}
				</label>
				<label class="Phone No.">
					<span>Phone No.</span>
					<input
						class:input-error={form?.error?.phone}
						class="input rounded-md"
						type="number"
						placeholder="Phone No."
						name="phone"
						required
					/>
					{#if form?.error?.phone}
						<p class="unstyled text-sm text-error-400">{form.error.phone[0]}</p>
					{/if}
				</label>
				<label class="address">
					<span>Address</span>
					<textarea
						class:input-error={form?.error?.address}
						class="textarea"
						rows="2"
						placeholder="Enter your full address here"
						name="address"
						required
					/>
					{#if form?.error?.address}
						<p class="unstyled text-sm text-error-400">{form.error.address[0]}</p>
					{/if}
				</label>
				<label for="roles" class="flex gap-5">
					<span class="my-auto">Role:</span>
					<select class:input-error={form?.error?.role} class="select" name="role">
						<option value="CUSTOMER">Customer</option>
						<option value="PROVIDER">Provider</option>
					</select>
					{#if form?.error?.role}
						<p class="unstyled text-sm text-error-400">{form.error.role[0]}</p>
					{/if}
				</label>
				<label class="state">
					<span>State</span>
					<input
						class:input-error={form?.error?.state}
						class="input rounded-md"
						type="text"
						placeholder="state"
						name="state"
						required
					/>
					{#if form?.error?.state}
						<p class="unstyled text-sm text-error-400">{form.error.state[0]}</p>
					{/if}
				</label>
				<label class="city">
					<span>City</span>
					<input
						class:input-error={form?.error?.City}
						class="input rounded-md"
						type="text"
						placeholder="city"
						name="city"
						required
					/>
					{#if form?.error?.city}
						<p class="unstyled text-sm text-error-400">{form.error.city[0]}</p>
					{/if}
				</label>
				<button disabled={loading} type="submit" class="btn variant-filled-primary w-full"
					>{#if loading}
						<Spinner />
					{/if}Signup</button
				>
			</form>
			<p class="mt-5">Already have an Account? <a href="/login">Signin</a></p>
		</div>
	</div>
</Preloader>

<style>
	label {
		margin-top: 0.75rem /* 20px */;
		margin-bottom: 0.75rem /* 20px */;
	}
	input,
	textarea {
		margin-top: 0.5rem;
		padding: 5px;
	}
</style>
