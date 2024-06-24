<script>
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import toast from 'svelte-french-toast';
	export let post;
    
	let modalOpen;
	let loading = false;

	const submitDeletePost = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('NGS Post deleted successfully!');
					await update();
					break;
				case 'error':
					toast.error('Could not delete the NGS post. Try again later.');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	$: modalOpen = false;
</script>

<div class="w-full h-28 flex items-center justify-between">
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

	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/ngs_posts/{post.id}" class="font-semibold text-lg">{post.experiment_id}</a>
		<p class="font-semibold">{post.experiment_name}</p>
		<p>{post.description}</p>
	</div>
	<div class="flex items-center justify-end w-full">
		<a href="/ngs_posts/{post.id}/edit" class="btn btn-outline">Edit</a>
		<Modal label={post.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error ml-2">Delete</span>
			<div slot="heading">
				<h3 class="text-2xl">Delete {post.experiment_id} post</h3>
				<p class="text-base font-normal mt-2">
					Are you sure you want to delete this NGS post? Once deleted, the post cannot be
					restored.
				</p>
			</div>
			<div slot="actions" class="flex w-full items-center justify-center space-x-2">
				<label for={post.id} class="btn btn-outline">Cancel</label>
				<form action="?/deletePost" method="POST" use:enhance={submitDeletePost}>
					<input type="hidden" name="id" value={post.id} />
					<button type="submit" class="btn btn-error" disabled={loading}>Delete</button>
				</form>
			</div>
		</Modal>
	</div>
</div>
