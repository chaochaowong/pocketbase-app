<script>
	import { MyNGSPostItem } from '$lib/components';
	export let data;
	$: console.log(data.posts) 
</script>

<h2 class="text-3xl font-bold">My NGS records</h2>
<div class="w-full mt-4 flex flex-col items-center">
	{#if data.posts.length === 0}
		<p class="text-center text-3xl">☹️</p>
		<p class="text-center text-3xl">Looks like you don't have any NGS records.</p>
		<a href="/ngs_posts/new" class="btn btn-primary max-w-md mt-4">Add One</a>
	{:else}
		{#each data.posts as post}
			<MyNGSPostItem {post} />
			<div class="divider mt-0 mb-2" />
		{/each}
	{/if}
</div>
