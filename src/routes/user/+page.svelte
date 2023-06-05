<script lang="ts">
	//@ts-nocheck
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Preloader from '$lib/Preloader.svelte';

	export let data: PageData;
	// https://res.cloudinary.com/dnteevm9m/image/upload/v1682842511/swiftr/testing/m6ch0bqzgjte47pw8rqf.png
</script>

<Preloader>
	<div class="flex gap-28 mx-auto w-fit my-20 font-poppins">
		<div class="my-auto">
			<Avatar initials={data.authuser.name} width="w-20" />
		</div>
		<div class="my-auto">
			<p class="unstyled text-3xl font-bold">{data.authuser.name}</p>
			<!-- <p class="dark:text-slate-300">{data.user.roles}</p> -->
			<div class="flex gap-6 mt-4">
				<!-- {#if data.user.roles != 'user'}
				<a href="/services/add" class="btn variant-filled-primary">Add Service</a>
			{/if} -->
				<a href="/user/changepass" class="btn variant-filled-error">Change Password</a>
			</div>
		</div>
	</div>
	<p class="unstyled my-auto text-xl font-bold dark:text-surface-400 font-poppins ml-5">
		Your Orders:
	</p>
	<div class=" font-poppins flex flex-wrap">
		{#each data.orders as order}
			<div class="card card-hover w-[46%] p-5 m-5 font-poppins divide-y-2 divide-surface-700">
				<div class="pb-3">
					<p class="unstyled text-xl font-bold mb-3">ORDER ID: {order.id}</p>
					<div class="flex divide-x-2 divide-slate-500">
						<p class="mr-6">
							Order date: {new Date(order.createdAt).toLocaleDateString()}
						</p>
						<p class="text-primary-500 pl-6">
							Estimated Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
						</p>
					</div>
				</div>
				{#each order.OrderItem as curr}
					<div class="py-3 flex justify-between">
						<div class="flex">
							<img src={curr.Service.image} alt="" class="object-contain w-16" />
							<p class="unstyled my-auto text-md font-semibold ml-5">{curr.Service.name}</p>
						</div>
						<div class="mr-3">
							<p class="unstyled text-lg font-semibold">₹{curr.Service.price}</p>
							<p>Qty: {curr.quantity}</p>
						</div>
					</div>
				{/each}
				<div class="flex justify-between py-4">
					<div>
						<p class="unstyled font-semibold text-center">Delivery</p>
						<p>{order.address}</p>
					</div>
					<div class="w-1/2">
						<p class="unstyled font-semibold text-center">Order Summary</p>
						<div class="flex justify-between my-2">
							<p>Subtotal</p>
							<p>₹{order.subtotal}</p>
						</div>
						<div class="flex justify-between my-2">
							<p>Convinience Fee</p>
							<p>₹{order.convinienceFee}</p>
						</div>
						<div class="flex justify-between my-2">
							<p>Delivery</p>
							<p>₹0</p>
						</div>
						<hr />
						<div class="flex justify-between my-2">
							<p>Total</p>
							<p>₹{order.total}</p>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<p class="unstyled text-xl my-14 mx-auto italic">No Orders to show</p>
		{/each}
	</div>

	<!-- provider orders -->
	<!-- <p class="unstyled my-auto text-xl font-bold dark:text-surface-400 font-poppins ml-5">
	Provider Orders:
</p>
<div class=" font-poppins flex flex-wrap">
    {#each data.provider_order as order}
    <div class="card card-hover w-[46%] p-5 m-5 font-poppins divide-y-2 divide-surface-700">
        <div class="pb-3">
				<p class="unstyled text-xl font-bold mb-3">ORDER ID: {order._id}</p>
				<div class="flex divide-x-2 divide-slate-500">
                    <p class="mr-6">
						Order date: {new Date(order.createdAt).toLocaleDateString()}
					</p>
					<p class="text-error-300 pl-6">
                        Estimated Delivery: {new Date(order.deliver_date).toLocaleDateString()}
					</p>
				</div>
				<p class="unstyled font-semibold mt-3">Ordered by: {order.user}</p>
			</div>
			{#each order.orderItems as curr}
            <div class="py-3 flex justify-between">
					<div class="flex">
						<img src={curr.image} alt="" class="object-contain w-16" />
						<p class="unstyled my-auto text-md font-semibold ml-5">{curr.name}</p>
					</div>
					<div class="mr-3">
                        <p class="unstyled text-lg font-semibold">₹{curr.price}</p>
						<p>Qty: {curr.qty}</p>
					</div>
				</div>
			{/each}
			<div class="flex justify-between py-4">
				<div>
					<p class="unstyled font-semibold text-center">Delivery</p>
					<p>{order.address}</p>
				</div>
				<div class="w-1/2">
					<p class="unstyled font-semibold text-center">Order Summary</p>
					<div class="flex justify-between my-2">
						<p>Subtotal</p>
						<p>₹{order.subtotal}</p>
					</div>
					<div class="flex justify-between my-2">
						<p>Convinience Fee</p>
						<p>₹{order.convinienceFee}</p>
					</div>
					<div class="flex justify-between my-2">
						<p>Delivery</p>
						<p>₹0</p>
					</div>
					<hr />
					<div class="flex justify-between my-2">
                        <p>Total</p>
						<p>₹{order.total}</p>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p class="unstyled text-xl my-14 mx-auto italic">No Orders to show</p>
	{/each}
</div> -->

	<!-- <pre>{JSON.stringify(data, null, 4)}</pre> -->
</Preloader>
