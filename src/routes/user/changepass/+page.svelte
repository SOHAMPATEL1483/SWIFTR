<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { PageData } from './$types';
	import Spinner from '$lib/spinner.svelte';

	let loading = false;
	const custom_enhance: SubmitFunction = () => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center font-poppins">
	<div class="card w-1/4 p-5">
		<!-- heading -->
		<p class="text-center font-bold font-poppins text-4xl unstyled">Change Password</p>
		<!-- form -->
		<form action="?/changePassword" method="post" use:enhance={custom_enhance}>
			<label class="oldPassword">
				<!-- <span>Old Password</span> -->
				<input
					class="input rounded-md"
					type="password"
					placeholder="Old Password"
					name="oldPassword"
					required
				/>
			</label>
			<label class="Password">
				<!-- <span>New Password</span> -->
				<input
					class="input rounded-md"
					type="password"
					placeholder="New Password"
					name="newPassword"
					required
				/>
			</label>
			<button type="submit" class="btn variant-filled-primary w-full">
				{#if loading}
					<Spinner />
				{/if}
				Change Password
			</button>
		</form>
	</div>
</div>

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
