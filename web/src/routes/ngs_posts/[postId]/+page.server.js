import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	try {
		const post = await serializeNonPOJOs(await locals.pb.collection('ngs_posts').getOne(params.postId));
		return { post };
	} catch (err) {
		console.log('Error: ', err);
		throw error(err.status, err.message);
	}
};

