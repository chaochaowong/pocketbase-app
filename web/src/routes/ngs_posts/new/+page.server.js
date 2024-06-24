import { error, invalid, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { createNGSPostSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	createPost: async ({ request, locals }) => {
		const body = await request.formData();

		const sample_master_sheet = bosy.get('sample_master_sheet');
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
		body.append('user', locals.user.id);

		const { formData, errors } = await validateData(body, createNGSPostSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return invalid(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('ngs_posts').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/ngs_posts');
	}
};
