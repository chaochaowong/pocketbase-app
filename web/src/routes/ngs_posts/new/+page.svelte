<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<h3 class="text-3xl font-bold">Enter new record of NGS experiment</h3>
			<Input 
				id="project_id" 
				label="Project ID" 
				value={form?.data?.project_id} 
				errors={form?.errors?.project_id} 
			/>
			<Input class="fond-semibold"
				id="experiment_id" 
				label="Experiment ID" 
				value={form?.data?.experiment_id} 
				errors={form?.errors?.experiment_id} 
			/>
			<Input
				id="experiment_name"
				label="Experiment name"
				value={form?.data?.experiment_name}
				errors={form?.errors?.experiment_name}
			/>
			<TextArea
				id="description"
				label="Experiment description"
				value={form?.data?.description}
				errors={form?.errors?.description}
			/>
			<Input
				id="contributors"
				label="Contributors"
				value={form?.data?.contributors}
				errors={form?.errors?.contributors}
			/>
			<Input
				id="library_strategy"
				label="Library strategy"
				value={form?.data?.library_strategy}
				errors={form?.errors?.library_strategy}
			/>
			<TextArea
				id="experiment_design"
				label="Experiment design"
				value={form?.data?.experiment_design}
				errors={form?.errors?.experiment_design}
			/>
			<Input
				id="organism"
				label="Organism"
				value={form?.data?.organism}
				errors={form?.errors?.organism}
			/>
			<Input
				id="cell_type"
				label="Cell type"
				value={form?.data?.cell_type}
				errors={form?.errors?.cell_type}
			/>
			<Input
				id="cell_line"
				label="Cell line"
				value={form?.data?.cell_line}
				errors={form?.errors?.cell_line}
			/>
			<Input
				id="antibody"
				label="Antibody"
				value={form?.data?.antibody}
				errors={form?.errors?.antibody}
			/>
			<Input
				id="molecule"
				label="Molecule"
				value={form?.data?.molecule}
				errors={form?.errors?.molecule}
			/>
			<Input
				id="spike_in"
				label="Spiked-in"
				value={form?.data?.spike_in}
				errors={form?.errors?.spike_in}
			/>
			<Input
				id="instrument_model"
				label="Instrument model"
				value={form?.data?.instrument_model}
				errors={form?.errors?.instrument_model}
			/>
			<Input
				id="genome_build"
				label="Genome build"
				value={form?.data?.genome_build}
				errors={form?.errors?.genome_build}
			/>
			<Input
				id="nextflow_pipeline"
				label="Nextflow pipeline"
				value={form?.data?.nextflow_pipeline}
				errors={form?.errors?.nextflow_pipeline}
			/>
			<Input
				id="fastq_path"
				label="FASTQ path"
				value={form?.data?.fastq_path}
				errors={form?.errors?.fastq_path}
			/>
			<Input
				id="result_folder_path"
				label="Result folder path"
				value={form?.data?.result_folder_path}
				errors={form?.errors?.result_folder_path}
			/>
			<Input
				id="GEO_series"
				label="GEO series number"
				value={form?.data?.GEO_series}
				errors={form?.errors?.GEO_series}
			/>
			<Input
				id="DOI"
				label="DOI"
				value={form?.data?.DOI}
				errors={form?.errors?.DOI}
			/>
			<Input
				id="PMID"
				label="PMID"
				value={form?.data?.PMID}
				errors={form?.errors?.PMID}
			/>
			<TextArea
				id="comments"
				label="Comments"
				value={form?.data?.comments}
				errors={form?.errors?.comments}
			/>
			<Input id="sample_master_sheet" label="Master sheet" type="file" errors={form?.errors?.sample_master_sheet} />
			<Input id="tap_station" label="Tap station output" type="file" errors={form?.errors?.tap_station_output} />
			<Input id="nf_sample_sheet" label="Nextflow sample sheet" type="file" errors={form?.errors?.nf_sample_sheet} />
			<Input id="nf_configuration" label="Nextflow configuration file" type="file" errors={form?.errors?.nf_configuration} />
			<Input id="thumbnail" label="Thumbnail" type="file" errors={form?.errors?.thumbnail} />
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create NGS post</button>
			</div>
		</form>
	</div>
</div>
