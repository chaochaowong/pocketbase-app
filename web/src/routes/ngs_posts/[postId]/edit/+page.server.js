import { error, invalid, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs, validateData } from '$lib/utils';
import { updateNGSPostSchema } from '$lib/schemas';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const post = serializeNonPOJOs(
			await locals.pb.collection('ngs_posts').getOne(params.postId)
		);

		if (locals.user.id === post.user) {
			return {
				post
			};
		} else {
			throw error(403, 'Forbidden');
		}
	} catch (err) {
		console.log('Error: ', err);
		throw error(err.status, err.message);
	}
};

export const actions = {
	updatePost: async ({ request, locals, params }) => {
		const body = await request.formData();
		const sample_master_sheet = body.get('sample_master_sheet');
		const tap_station_output = body.get('tap_station_output');
		const nf_sample_sheet = body.get('nf_sample_sheet');
		const nf_configuration = body.get('nf_configuration');
		const thumb = body.get('thumbnail');

		if (sample_master_sheet.size === 0) {
			body.delete('sample_master_sheet');
		}
		if (tap_station_output.size === 0) {
			body.delete('tap_station_output');
		}
		if (nf_sample_sheet.size === 0) {
			body.delete('nf_sample_sheet')
		}
		if (nf_configuration.size === 0) {
			body.delete('nf_configuration')
		}
		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData(body, updateNGSPostSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return invalid(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('ngs_posts').update(params.postId, serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/ngs_posts');
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('ngs_posts').update(params.postId, { thumbnail: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	},

	deleteMasterSheet: async ({ locals, params }) => {
		try {
			await locals.pb.collection('ngs_posts').update(params.postId, { sample_master_sheet: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	},

	deleteNFConfiguration: async ({ locals, params }) => {
		try {
			await locals.pb.collection('ngs_posts').update(params.postId, { nf_configuration: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	},

	deleteNFSampleSheet: async ({ locals, params }) => {
		try {
			await locals.pb.collection('ngs_posts').update(params.postId, { nf_sample_sheet: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	},

	deleteTapStation: async ({ locals, params }) => {
		try {
			await locals.pb.collection('ngs_posts').update(params.postId, { tap_station_output: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
