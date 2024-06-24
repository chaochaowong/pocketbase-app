import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getUsersPosts = async (userID) => {
		try {
			const posts = serializeNonPOJOs(
				await locals.pb.collection('ngs_posts').getFullList(undefined, {
					filter: `user = "${userID}"`
				})
			);
			return posts;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		posts: await getUsersPosts(locals.user.id)
	}; 
};

export const actions = {
	deletePost: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('ngs_posts').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
