<script lang="ts">
	import Preloader from '$lib/Preloader.svelte';
</script>

<!-- <pre>
	{JSON.stringify(data.user)}
</pre> -->
<Preloader>
	<div class="font-poppins max-w-2xl mt-48 mx-auto">
		<p class="unstyled text-6xl font-bold mb-5 tracking-wide">
			Effortlessly manage <br /> your home <br /> services with us.
		</p>
		<p>
			From routine cleaning to complex repairs and installations, trust our team of skilled and
			experienced service providers to handle all your home service needs with precision and care.
		</p>
		<div class="my-5">
			<a href="/services" class="btn variant-filled-primary px-10 mr-2">Get Started</a>
			<a href="/login" class="btn variant-filled-secondary px-10">Login</a>
		</div>
	</div>
	<div
		class="absolute top-0 -z-10 w-full h-full bg-no-repeat bg-cover invisible md:visible"
		style="background-position-y: 50%;"
	/>
</Preloader>

<style>
	/* .bgimage {
		 @apply bg-gradient-to-l 
		@apply bg-[url('/homepage.png')]
		background-image: linear-gradient(rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.6)),
			url(/homepage.png);
	}
	.g {
		@apply bg-gradient-to-l;
	} */
</style>
