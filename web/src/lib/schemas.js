import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' }),
	password: z.string({ required_error: 'Password is required' })
});

export const registerUserSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required' })
			.regex(/^[a-zA-z\s]*$/, { message: 'Name can only contain letters and spaces.' })
			.min(2, { message: 'Name must be at least 2 characters' })
			.max(64, { message: 'Name must be less than 64 characters' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

const imageTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/svg+xml',
	'image/gif'
];

export const createProjectSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name must be 64 characters or less' })
		.trim(),
	tagline: z
		.string({ required_error: 'Tagline is required' })
		.min(1, { message: 'Tagline is required' })
		.max(64, { message: 'Tagline must be 64 characters or less' })
		.trim(),
	url: z.string({ required_error: 'URL is required' }).url({ message: 'URL must be a valid URL' }),
	description: z
		.string({ required_error: 'Description is required' })
		.min(1, { message: 'Description is required' })
		.max(512, { message: 'Description must be less than 512 characters' })
		.trim(),
	thumbnail: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Thumbnail must be less than 5MB'
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		}),
	user: z.string({ required_error: 'User is required.' })
});

export const updateProjectSchema = createProjectSchema.omit({ user: true });

export const createNGSPostSchema = z.object({
	project_name: z
		.string({ required_error: 'Project name is required' })
		.min(2, { message: 'Project name must be more than 2 characters' })
		.max(64, { message: 'Project name must be 64 characters or less' })
		.trim(),
	experiment_id: z
		.string({ required_error: 'Experiment ID is required (e.g., GBe4)' })
		.min(2, { message: 'Experiment ID must be more than 2 characters' })
		.max(64, { message: 'Experiment ID must be 64 characters or less' })
		.trim(),
	experiment_name: z
		.string({ required_error: 'Experiment name is required' })
		.min(2, { message: 'Experiment name must be more than 2 characters' })
		.max(64, { message: 'Experiment name must be 64 characters or less' })
		.trim(),		
	library_strategy: z
		.string({ required_error: 'Library strategy is required (e.g., CUT&RUN, CUT&Tag)' })
		.min(2, { message: 'Library strategy must be more than 2 characters' })
		.max(64, { message: 'Library strategy must be 64 characters or less' })
		.trim(),	
	description: z
		.string({ required_error: 'Description is required (e.g. CUT&RUN)' })
		.min(2, { message: 'Description must be more than 2 characters' })
		.max(512, { message: 'Description must be less than 512 characters' })
		.trim(),	
	experiment_design: z
		.string()
		.max(2048, { message: 'Experiment desgin must be less than 2048 character'})
		.trim()
		.optional(),
	contributors: z
		.string()
		.max(512, { message: 'Contributors must be less than 512 character'})
		.trim()
		.optional(),		
	collaborators: z
		.string()
		.max(512, { message: 'Collaborators must be less than 512 character'})
		.trim()
		.optional(),				
	organism: z
		.string()
		.max(64, { message: 'organism must be less than 64 character'})
		.trim()
		.optional(),			
	cell_line: z
		.string()
		.max(64, { message: 'Cell line must be less than 64 character'})
		.trim()
		.optional(),
	cell_type: z
		.string()
		.max(64, { message: 'Cell type must be less than 64 character'})
		.trim()
		.optional(),		
	antibody: z
		.string()
		.max(64, { message: 'Antibody must be less than 64 character'})
		.trim()
		.optional(),	
	molecule: z
		.string()
		.max(64, { message: 'Moleculre must be less than 64 character'})
		.trim()
		.optional(),				
	spike_in: z
		.string()
		.max(64, { message: 'Spiked-in must be less than 64 character'})
		.trim()
		.optional(),	
	instrument_model: z
		.string()
		.max(64, { message: 'Instrument model must be less than 64 character'})
		.trim()
		.optional(),			
	genome_build: z
		.string()
		.max(64, { message: 'Genome build must be less than 64 character'})
		.trim()
		.optional(),	
	nextflow_pipeline: z
		.string()
		.max(64, { message: 'Nexflow pipeline must be less than 64 character'})
		.trim()
		.optional(),		
	comments: z
		.string()
		.max(2048, { message: 'comments must be less than 2048 character'})
		.trim()
		.optional(),	
	GEO_series: z
		.string()
		.max(64, { message: 'GEO_series must be less than 64 character'})
		.trim()
		.optional(),			
	DOI: z
		.string()
		.max(64, { message: 'DOI must be less than 64 character'})
		.trim()
		.optional(),		
	PMID: z
		.string()
		.max(64, { message: 'PMID must be less than 64 character'})
		.trim()
		.optional(),
	fastq_path: z
		.string()
		.max(512, { message: 'FASTQ path must be less than 512 character'})
		.trim()
		.optional(),		
	result_folder_path: z
		.string()
		.max(512, { message: 'Results folder path must be less than 512 character'})
		.trim()
		.optional(),				
	tag: z
		.string()
		.max(512, { message: 'Tag must be less than 512 character'})
		.trim()
		.optional(),		
	nf_sample_sheet: z
		.instanceof(Blob)
		.optional(),
	nf_configuration: z
		.instanceof(Blob)
		.optional(),
	sample_master_sheet: z
		.instanceof(Blob)
		.optional(),
	tap_station_output: z
		.instanceof(Blob)
		.optional(),				
	thumbnail: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Thumbnail must be less than 5MB'
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		}),
	user: z.string({ required_error: 'User is required.' })
});

export const updateNGSPostSchema = createNGSPostSchema.omit({ user: true });

export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(24, { message: 'Username must be 24 characters or less' })
		.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: 'Old password is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const updateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name must be 64 characters or less' })
		.trim(),
	avatar: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Avatar must be less than 5MB'
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		})
});
