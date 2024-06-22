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
			<h3 class="text-3xl font-bold">Tell us more about this project</h3>
			<p class="mt-2 text-lg">We'll need the experiment_id, experiment_name, contributors, description, and etc.</p>
			<Input 
				id="project_id" 
				label="Project ID" 
				value={form?.data?.project_id} 
				errors={form?.errors?.project_id} 
			/>
			<Input 
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
			<Input
				id="library_strategy"
				label="Library strategy"
				value={form?.data?.library_strategy}
				errors={form?.errors?.library_strategy}
			/>
			<Input id="url" label="Project URL" value={form?.data?.url} errors={form?.errors?.url} />
			<TextArea
				id="description"
				label="Experiment description"
				value={form?.data?.description}
				errors={form?.errors?.description}
			/>
			<Input id="thumbnail" label="Thumbnail" type="file" errors={form?.errors?.thumbnail} />
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create Project</button>
			</div>
		</form>
	</div>
</div>
