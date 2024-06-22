<script>
	import { getImageURL } from '$lib/utils';
	import { getFileURL } from '$lib/utils';
	export let data;
	$: console.log(data.post) 
</script>

<div class="flex flex-col w-full mt-4">
	<div class="avatar" style="align-items: flex-end;">
		<div class="w-20 rounded" style="padding-right: 10px;">
			<img
				src={data.post?.thumbnail
					? getImageURL(data.post.collectionId, data.post.id, data.post.thumbnail, '80x80')
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data.post.experiment_id}`}
				alt="post thumbnail"
				style="width: 80px; height: 80px;" 
			/>
		</div>

		<h1 class="text-2xl font-bold mt-4">
            {data.post.experiment_id}
	    </h1>
	</div>
	<h1 class="text-2xl font-bold mt-4">
		{data.post.experiment_name}
	</h1>
	<hr>
	<p>Project name: {data.post.project_name}</p>
	<p>Description: {data.post.description}</p>
	<p>Contributors: {data.post.contributors}</p>
	<p>Library strategy: {data.post.library_strategy}</p>
	<p>Experiment design: {data.post.experiment_design}</p>
	<p>Organism: {data.post.organism}</p>
	<p>Cell type: {data.post.cell_type}</p>
	<p>Cell line: {data.post.cell_line}</p>
	<p>Antibody: {data.post.antibody}</p>
	<p>Molecule: {data.post.molecule}</p>
	<p>Spike_in: {data.post.spike_in}</p>
	<p>FASTQ path: {data.post.fastq_path}</p>
	<p>Result folder path: {data.post.result_folder_path}</p>
	<p>Genome build: {data.post.genome_build}</p>
	<p>Nextflow pipeline: {data.post.nextflow_pipeline}</p>
	<p>Instrument model: {data.post.instrument_model}</p>
	<p>GEO series number: {data.post.GEO_series}</p>
	<p>DOI: {data.post.DOI}</p>
	<p>PMID: {data.post.PMID}</p>
	<p>Comments: {data.post.comments}</p>
	<p>Tag: {data.post.tag}</p>
	<p></p>
   

	<h2 class="text-1xl font-bold mt-4">
	  Files 
	</h2>
	<p>
	<p>Nextflow sample sheet: 
	   {data.post.nf_sample_sheet}</p>
	<p>Nextflow configuration file: 
	   {data.post.nf_configuration}</p>
	<p>Master sample sheet: 
	   {data.post.sample_master_sheet}</p>
</div>