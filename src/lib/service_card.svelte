<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	/**
	 * @type {{ id: string; image: any; name: any; description: any; price: any; Seller: { name: any; }; createdAt: string | number | Date; }}
	 */
	export let service;
	// https://res.cloudinary.com/dnteevm9m/image/upload/v1682841176/swiftr/testing/irgulxd0cwvnpmuupazz.jpg
	// https://res.cloudinary.com/dnteevm9m/image/upload/v1682842511/swiftr/testing/m6ch0bqzgjte47pw8rqf.png
</script>

<!-- asf -->
<a class="unstyled" href={'/services/' + service.id}>
	<div class="card card-hover m-5 max-w-[320px] p-5">
		<div class="mb-5">
			<img src={service.image} alt="" class="max-h-64 w-full rounded-md object-contain" />
		</div>
		<div class="divide-y-2  divide-slate-600">
			<div class="mb-3">
				<p class="unstyled mb-5 text-center text-xl font-semibold">{service.name}</p>
				<p class="unstyled text-sm italic">
					{service.description}
				</p>
				<p class="unstyled my-2 text-xl font-semibold">₹{service.price}</p>
				<!-- <p>⭐{service.avgRating} ({service.noOfReviews})</p> -->
			</div>
			<div class=" flex justify-between pt-4">
				<div class="flex">
					<Avatar initials={service.Seller.name} width="w-10" />
					<p class="my-auto ml-2">{service.Seller.name}</p>
				</div>
				<p class="my-auto">On {new Date(service.createdAt).toLocaleDateString()}</p>
			</div>
		</div>
	</div>
</a>
