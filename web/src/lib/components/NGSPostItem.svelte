<script>
	import { getImageURL } from '$lib/utils';
	export let post;
</script>

<div class="w-full h-28 flex items-center justify-between">
	<a href="/ngs_posts/{post.id}">
		<div class="avatar">
			<div class="w-20 rounded">
				<img
					src={post?.thumbnail
						? getImageURL(post.collectionId, post.id, post.thumbnail, '80x80')
						: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${post.experiment_id}`}
					alt="post thumbnail"
				/>
			</div>
		</div>	
	</a>	

	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/ngs_posts/{post.id}" class="font-semibold text-lg hover:text-blue-700">{post.experiment_id}</a>
		<p class="font-semibold">{post.experiment_name}</p>
		<p>{post.description}</p>
		<p>{post.tag}</p>
	</div>
</div>