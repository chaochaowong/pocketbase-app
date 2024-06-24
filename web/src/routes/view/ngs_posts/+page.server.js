import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	try { 
        const posts = await serializeNonPOJOs(
				await locals.pb.collection('ngs_posts').getFullList({
                    sort: '-created'
                }));
		return { posts };
	} catch (err) {
		console.log('Error: ', err);
		throw error(err.status, err.message);
	}
};
