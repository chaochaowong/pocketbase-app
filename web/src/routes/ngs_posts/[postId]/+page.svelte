<script>
	import { getImageURL } from '$lib/utils';
	import { getFileURL } from '$lib/utils';
	import { Icon, InboxArrowDown, Calendar, Link, Folder, Bars3BottomLeft, Users, User, Hashtag } from 'svelte-hero-icons';
	export let data;
	$: console.log(data.post) 
	const baseGEOURL  = 'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=';
	const basePMIDURL = 'https://pubmed.ncbi.nlm.nih.gov/'
	const baseDOIURL  = 'https://doi.org/'

	function openFile(url) {
        if (url) {
            window.open(url, '_blank');
        }
    }
</script>

<style>
    .table {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px 40px;
        align-items: center;
    }
    .label-icon {
        display: flex;
        align-items: center;
        color: #9CA3AF; /* Equivalent to text-gray-400 */
    }
    .label-icon span {
        margin-left: 8px; /* Spacing between the icon and label */
        font-weight: 600; /* Equivalent to font-semibold */
		color: #6B7280; /* Equivalent to text-gray-600 */
    }
    .value {
        text-align: left;
    }
	.code-break {
        display: block;
        white-space: pre-wrap; /* Ensures code wraps properly */
        word-break: break-all; /* Force word break in second column */
        background-color: #f9f9f9;
        padding: 0.5rem;
        border-radius: 0.25rem;
    }
</style>

<main class="px-40">
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

		<h1 class="text-4xl font-bold mt-4">
            {data.post.experiment_id}
	    </h1>
	</div>
	<!-- Two column table: icon/label value -->
	<div class="table mt-8">
		<!-- expreiment Name Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Experiment name</span>
		</div>
		<div class="value">
			{data.post.experiment_name}
		</div>

		<!-- Project Name Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Project name</span>
		</div>
		<div class="value">
			{data.post.project_name}
		</div>
	
		<!-- Description Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Description</span>
		</div>
		<div class="value">
			{data.post.description}
		</div>

		<!-- created date Row -->
		<div class="label-icon">
			<Icon src={Calendar} class="w-5 h-5" />
			<span>Created date</span>
		</div>
		<div class="value">
			{data.post.created}
		</div>

		<!-- last updated date Row -->
		<div class="label-icon">
			<Icon src={Calendar} class="w-5 h-5" />
			<span>Last updated</span>
		</div>
		<div class="value">
			{data.post.updated}
		</div>

		<!-- Tag Row -->
		<div class="label-icon">
			<Icon src={Hashtag} class="w-5 h-5" />
			<span>Tags</span>
		</div>
		<div class="value">
			{data.post.tag}
		</div>

		<!-- Contributors Row -->
		<div class="label-icon">
			<Icon src={Users} class="w-5 h-5" />
			<span>Experiment contributors</span>
		</div>
		<div class="value">
			{data.post.contributors}
		</div>

		<!-- collaborators Row -->
		<div class="label-icon">
			<Icon src={Users} class="w-5 h-5" />
			<span>Collaborators</span>
		</div>
		<div class="value">
			{data.post.collaborators}
		</div>

		<!-- usr (record maintainer) Row -->
		<div class="label-icon">
			<Icon src={User} class="w-5 h-5" />
			<span>Record maintainer</span>
		</div>
		<div class="value">
			{data.user.name}
		</div>

		<!-- Library strategy Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Library strategy</span>
		</div>
		<div class="value">
			{data.post.library_strategy}
		</div>

		<!-- Experiment design Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Experiment design</span>
		</div>
		<div class="value">
			{data.post.experiment_design}
		</div>

		<!-- Organism Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Organism</span>
		</div>
		<div class="value">
			{data.post.organism}
		</div>

		<!-- Cell type Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Cell type</span>
		</div>
		<div class="value">
			{data.post.cell_type}
		</div>

		<!-- Cell link Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Cell line</span>
		</div>
		<div class="value">
			{data.post.cell_line}
		</div>

		<!-- Antibody Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Antibody</span>
		</div>
		<div class="value">
			{data.post.antibody}
		</div>

		<!-- Moleculey Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Molecule</span>
		</div>
		<div class="value">
			{data.post.molecule}
		</div>

		<!-- Spiked-in Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Spiked-in species (if any)</span>
		</div>
		<div class="value">
			{data.post.spike_in}
		</div>

		<!-- Instrument model Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Instrument model</span>
		</div>
		<div class="value">
			{data.post.instrument_model}
		</div>

		<!-- Genome build Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Genome build</span>
		</div>
		<div class="value">
			{data.post.genome_build}
		</div>

		<!-- Nextflow pipeline Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Nextflow pipeline (version)</span>
		</div>
		<div class="value">
			{data.post.nextflow_pipeline}
		</div>

		<!-- Comments Row -->
		<div class="label-icon">
			<Icon src={Bars3BottomLeft} class="w-5 h-5" />
			<span>Comments</span>
		</div>
		<div class="value">
			{data.post.comments}
		</div>

		<!-- FASTQ path Row -->
		<div class="label-icon">
			<Icon src={Folder} class="w-5 h-5" />
			<span>FASTQ folder</span>
		</div>
		<div class="value">
			<code class="code-break">{data.post.fastq_path}</code>
		</div>

		<!-- Result folder Row -->
		<div class="label-icon">
			<Icon src={Folder} class="w-5 h-5" />
			<span>Result folder</span>
		</div>
		<div class="value">
			<code class="code-break">{data.post.result_folder_path}</code>
		</div>

		<!-- GEO series number Row -->
		<div class="label-icon">
			<Icon src={Link} class="w-5 h-5" />
			<span>GEO</span>
		</div>
		<div class="value">
			{#if data.post.GEO_series}
				<a href={baseGEOURL + data.post.GEO_series} class="text-blue-500" target="_blank" rel="noopener noreferrer">{data.post.GEO_series}</a>
			{/if}
		</div>

		<!-- DOI Row -->
		<div class="label-icon">
			<Icon src={Link} class="w-5 h-5" />
			<span>DOI</span>
		</div>
		<div class="value">
			{#if data.post.GEO_series}
				<a href={baseDOIURL + data.post.DOI} class="text-blue-500" target="_blank" rel="noopener noreferrer">{data.post.DOI}</a>
			{/if}
		</div>

		<!-- PMID Row -->
		<div class="label-icon">
			<Icon src={Link} class="w-5 h-5" />
			<span>PMID</span>
		</div>
		<div class="value">
			{#if data.post.PMID}
				<a href={basePMIDURL + data.post.PMID} class="text-blue-500" target="_blank" rel="noopener noreferrer">{data.post.PMID}</a>
			{/if}
		</div>

		<!-- Sample master sheet Row -->
		<div class="label-icon">
			{#if data.post.sample_master_sheet}
                    <a href={getFileURL(data.post.collectionId, data.post.id, data.post.sample_master_sheet)} target="_blank" rel="noopener noreferrer">
					   <Icon src={InboxArrowDown} class="hover:cursor-pointer w-5 h-5 text-blue-500" 
					   />
					</a>	
            {:else}
                    <Icon src={InboxArrowDown}
                        class="icon-container-disabled w-5 h-5 text-gray-500"
                    />
            {/if}
			<span>Master sample sheet</span>
		</div>
		<div class="value">
			{data.post.sample_master_sheet}
		</div>

		<!-- tap_station_output Row -->
		<div class="label-icon">
			{#if data.post.tap_station_output}
                    <a href={getFileURL(data.post.collectionId, data.post.id, data.post.tap_station_output)} target="_blank" rel="noopener noreferrer">
					   <Icon src={InboxArrowDown} class="hover:cursor-pointer w-5 h-5 text-blue-500" 
					   />
					</a>	
            {:else}
                    <Icon src={InboxArrowDown}
                        class="icon-container-disabled w-5 h-5 text-gray-500"
                    />
            {/if}
			<span>Tap station output</span>
		</div>
		<div class="value">
			{data.post.tap_station_output}
		</div>

		<!-- nf_sample_sheet Row -->
		<div class="label-icon">
			{#if data.post.nf_sample_sheet}
                    <a href={getFileURL(data.post.collectionId, data.post.id, data.post.nf_sample_sheet)} target="_blank" rel="noopener noreferrer">
					   <Icon src={InboxArrowDown} class="hover:cursor-pointer w-5 h-5 text-blue-500" 
					   />
					</a>	
            {:else}
                    <Icon src={InboxArrowDown}
                        class="icon-container-disabled w-5 h-5 text-gray-500"
                    />
            {/if}
			<span>Nextflow sample sheet</span>
		</div>
		<div class="value">
			{data.post.nf_sample_sheet}
		</div>

		<!-- nf_configuration Row -->
		<div class="label-icon">
			{#if data.post.nf_configuration}
                    <a href={getFileURL(data.post.collectionId, data.post.id, data.post.nf_configuration)} target="_blank" rel="noopener noreferrer">
					   <Icon src={InboxArrowDown} class="hover:cursor-pointer w-5 h-5 text-blue-500" 
					   />
					</a>	
            {:else}
                    <Icon src={InboxArrowDown}
                        class="icon-container-disabled w-5 h-5 text-gray-500"
                    />
            {/if}
			<span>Nextflow configuration file</span>
		</div>
		<div class="value">
			{data.post.nf_configuration}
		</div>
	</div>
</div>
</main>