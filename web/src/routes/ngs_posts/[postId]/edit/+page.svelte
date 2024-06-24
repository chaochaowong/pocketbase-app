<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, TextArea } from '$lib/components';
	import { getImageURL, getFileURL } from '$lib/utils';
	export let data;
	export let form;

	let loading = false;

	const submitUpdatePost = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await update();
			}

			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			method="POST"
			action="?/updatePost"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdatePost}
		>
			<h3 class="text-3xl font-bold">Edit {data.post.experiment_id}</h3>
			<Input
				id="project_name"
				label="Project name"
				value={form?.data?.project_name ?? data.post.project_name}
				errors={form?.errors?.project_name}
			/>
			<Input
				id="experiment_id"
				label="Experiment ID"
				value={form?.data?.experiment_id ?? data.post.experiment_id}
				errors={form?.errors?.experiment_id}
			/>
			<TextArea
				id="description"
				label="Experiment description"
				value={form?.data?.description ?? data.post.description}
				errors={form?.errors?.description}
			/>
			<Input
				id="contributors"
				label="Contributors"
				value={form?.data?.contributors ?? data.post.contributors}
				errors={form?.errors?.contributors}
			/>
			<Input
				id="library_strategy"
				label="Library strategy"
				value={form?.data?.library_strategy ?? data.post.library_strategy}
				errors={form?.errors?.library_strategy}
			/>
			<TextArea
				id="experiment_design"
				label="Experiment design"
				value={form?.data?.experiment_design ?? data.post.experiment_design}
				errors={form?.errors?.experiment_design}
			/>
			<Input
				id="organism"
				label="Organism"
				value={form?.data?.organism ?? data.post.organism}
				errors={form?.errors?.organism}
			/>
			<Input
				id="cell_type"
				label="Cell type"
				value={form?.data?.cell_type ?? data.post.cell_type}
				errors={form?.errors?.cell_type}
			/>
			<Input
				id="cell_line"
				label="Cell line"
				value={form?.data?.cell_line ?? data.post.cell_line}
				errors={form?.errors?.cell_line}
			/>
			<Input
				id="antibody"
				label="Antibody"
				value={form?.data?.antibody ?? data.post.antibody}
				errors={form?.errors?.antibody}
			/>
			<Input
				id="molecule"
				label="Molecule"
				value={form?.data?.molecule ?? data.post.molecule}
				errors={form?.errors?.molecule}
			/>
			<Input
				id="genome_build"
				label="Genome build"
				value={form?.data?.genome_build ?? data.post.genome_build}
				errors={form?.errors?.genome_build}
			/>
			<Input
				id="nextflow_pipeline"
				label="Nextflow pipeline"
				value={form?.data?.nextflow_pipeline ?? data.post.nextflow_pipeline}
				errors={form?.errors?.nextflow_pipeline}
			/>
			<Input
				id="instrument_model"
				label="Instrument model"
				value={form?.data?.instrument_model ?? data.post.instrument_model}
				errors={form?.errors?.instrument_model}
			/>
			<Input
				id="fastq_path"
				label="FASTQ path"
				value={form?.data?.fastq_path ?? data.post.fastq_path}
				errors={form?.errors?.fastq_path}
			/>
			<Input
				id="result_folder_path"
				label="Result folder path"
				value={form?.data?.result_folder_path ?? data.post.result_folder_path}
				errors={form?.errors?.result_folder_path}
			/>
			<Input
				id="GEO_series"
				label="GEO series number"
				value={form?.data?.GEO_series ?? data.post.GEO_series}
				errors={form?.errors?.GEO_series}
			/>
			<Input
				id="DOI"
				label="DOI"
				value={form?.data?.DOI ?? data.post.DOI}
				errors={form?.errors?.DOI}
			/>
			<Input
				id="PMID"
				label="PMID"
				value={form?.data?.PMID ?? data.post.PMID}
				errors={form?.errors?.PMID}
			/>
			<TextArea
				id="comments"
				label="Comments"
				value={form?.data?.comments ?? data.post.comments}
				errors={form?.errors?.comments}
			/>
			<div class="form-control w-full max-w-lg">
				<label for="sample_master_sheet" class="label font-medium pb-1">
					<span class="label-text">Master sheet</span>
				</label>
				{#if data.post.sample_master_sheet}
					<label for="sample_master_sheet" class="flex flex-col w-full mt-4">
						<label for="sample_master_sheet" class="absolute hover:cursor-pointer">
							<button formaction="?/deleteMasterSheet" class="btn btn-error btn-sm btn-circle">
								<Icon src={Trash} class="w-5 h-5 text-white" />
							</button>
						</label>
						<div class="flex flex-col w-full h-full ml-10 mt-1">
							<p>{data.post.sample_master_sheet}</p>
						</div>
					</label>
				{/if}	
				<input
					type="file"
					name="sample_master_sheet"
					id="sample_master_sheet"
					class="file-input file-input-bordered w-full max-w-lg mt-4"
				/>
				{#if form?.errors?.sample_master_sheet}
					{#each form?.errors?.sample_master_sheet as error}
						<label for="sample_master_sheet" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
						</label>
					{/each}
				{/if}
			</div>
			<div class="form-control w-full max-w-lg">
				<label for="tap_station_output" class="label font-medium pb-1">
					<span class="label-text">Tap station output</span>
				</label>
				{#if data.post.tap_station_output}
					<label for="tap_station_output" class="flex flex-col w-full mt-4">
						<label for="tap_station_output" class="absolute hover:cursor-pointer">
							<button formaction="?/deleteTapStation" class="btn btn-error btn-sm btn-circle">
								<Icon src={Trash} class="w-5 h-5 text-white" />
							</button>
						</label>
						<div class="flex flex-col w-full h-full ml-10 mt-1">
							<p>{data.post.tap_station_output}</p>
						</div>
					</label>
				{/if}	
				<input
					type="file"
					name="nf_tap_station_output"
					id="nf_tap_station_output"
					class="file-input file-input-bordered w-full max-w-lg mt-4"
				/>
				{#if form?.errors?.tap_station_output}
					{#each form?.errors?.tap_station_output as error}
						<label for="tap_station_output" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
						</label>
					{/each}
				{/if}
			</div>
			<div class="form-control w-full max-w-lg">
				<label for="nf_sample_sheet" class="label font-medium pb-1">
					<span class="label-text">Nextflow sample sheet</span>
				</label>
				{#if data.post.nf_sample_sheet}
					<label for="nf_sample_sheet" class="flex flex-col w-full mt-4">
						<label for="nf_sample_sheet" class="absolute hover:cursor-pointer">
							<button formaction="?/deleteNFSampleSheet" class="btn btn-error btn-sm btn-circle">
								<Icon src={Trash} class="w-5 h-5 text-white" />
							</button>
						</label>
						<div class="flex flex-col w-full h-full ml-10 mt-1">
							<p>{data.post.nf_sample_sheet}</p>
						</div>
					</label>
				{/if}	
				<input
					type="file"
					name="nf_samplesheet"
					id="nf_sample_sheet"
					class="file-input file-input-bordered w-full max-w-lg mt-4"
				/>
				{#if form?.errors?.nf_sample_sheet}
					{#each form?.errors?.nf_sample_sheet as error}
						<label for="nf_sample_sheet" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
						</label>
					{/each}
				{/if}
			</div>
			<div class="form-control w-full max-w-lg">
				<label for="nf_configuration" class="label font-medium pb-1">
					<span class="label-text">Nextflow configuration file</span>
				</label>
				{#if data.post.nf_configuration}
					<label for="nf_configuration" class="flex flex-col w-full mt-4">
						<label for="nf_configuration" class="absolute hover:cursor-pointer">
							<button formaction="?/deleteNFConfiguration" class="btn btn-error btn-sm btn-circle">
								<Icon src={Trash} class="w-5 h-5 text-white" />
							</button>
						</label>
						<div class="flex flex-col w-full h-full ml-10 mt-1">
							<p>{data.post.nf_configuration}</p>
						</div>
					</label>
				{/if}	
				<input
					type="file"
					name="nf_configuration"
					id="nf_configuration"
					class="file-input file-input-bordered w-full max-w-lg mt-4"
				/>
				{#if form?.errors?.nf_configuration}
					{#each form?.errors?.nf_configuration as error}
						<label for="nf_configuration" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
						</label>
					{/each}
				{/if}
			</div>

			<div class="form-control w-full max-w-lg">
				<label for="thumbnail" class="label font-medium pb-1">
					<span class="label-text">Thumbnail</span>
				</label>
				{#if data.post.thumbnail}
					<label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
						<label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer">
							<button formaction="?/deleteThumbnail" class="btn btn-error btn-sm btn-circle">
								<Icon src={Trash} class="w-5 h-5 text-white" />
							</button>
						</label>
						<div class="w-20 rounded">
							<img
								src={getImageURL(
									data.post.collectionId,
									data.post.id,
									data.post.thumbnail,
									'80x80'
								)}
								alt="Post thumbnail"
							/>
						</div>
					</label>
				{/if}
				<input
					type="file"
					name="thumbnail"
					id="thumbnail"
					class="file-input file-input-bordered w-full max-w-lg mt-2"
				/>
				{#if form?.errors?.thumbnail}
					{#each form?.errors?.thumbnail as error}
						<label for="thumbnail" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
						</label>
					{/each}
				{/if}
			</div>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Save Changes</button>
			</div>
		</form>
	</div>
</div>
