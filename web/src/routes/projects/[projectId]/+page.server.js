import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	try {
		const project = await serializeNonPOJOs(await locals.pb.collection('projects').getOne(params.projectId));
		return { project };
	} catch (err) {
		console.log('Error: ', err);
		throw error(err.status, err.message);
	}
};

