<script>
	import '../app.postcss';
	import { Toaster } from 'svelte-french-toast';
	import { getImageURL } from '$lib/utils';
	import { Icon, SunIcon} from 'svelte-hero-icons';
	export let data;
</script>

<Toaster />
<div class="min-h-full">
	<nav class="navbar bg-base-200 border-b">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">PocketBase @ bobolink</a>
		</div>
		<div class="flex-none">
			{#if !data.user}
				<div class="dropdown dropdown-end">
					<a href="/login" class="btn btn-primary">Login</a>
					<a href="/register" class="btn btn-secondary">Register</a>
				</div>
			{:else}
				<div class="dropdown dropdown-end mr-4">
					<a href="/view/ngs_posts" class="btn btn-primary btn-outline">View NGS records</a>
				</div>
				<div class="dropdown dropdown-end mr-4">
					<a href="/ngs_posts/new" class="btn btn-primary btn-outline">Add NGS record</a>
				</div>
<!-- 
				<div class="dropdown dropdown-end mr-4">
				    <a href="/view/projects" class="btn btn-primary btn-outline">View Projects</a>
				</div>
				<div class="dropdown dropdown-end mr-4">
					<a href="/projects/new" class="btn btn-primary btn-outline">Add Project</a>
				</div>
-->
				<div class="dropdown dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img
								src={data.user?.avatar
									? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
									: `https://ui-avatars.com/api/?name=${data.user?.name}`}
								alt="User avatar"
							/>
						</div>
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
<!--
						<li>
							<a href="/my/projects" class="justify-between">My Projects</a>
						</li>
-->
						<li>
							<a href="/my/ngs_posts" class="justify-between">My NGS records</a>
						</li>
						<li><a href="/my/settings">Settings</a></li>
						<li>
							<form action="/logout" method="POST">
								<button type="submit" class="w-full text-start">Logout</button>
							</form>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</nav>
	<div class="py-4">
		<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
			<slot />
		</div>
	</div>
	<!-- Footer -->
    <footer class="bg-base-200 border-t py-12 mt-auto">
        <div class="container mx-auto px-8">
            <div class="flex justify-between items-center text-sm">
                <div class="text-gray-600">
                    Created by <span class="font-semibold">Sarthy Lab @ SCRI</span>
                </div>
                <div class="text-gray-600">
                    <span class="font-semibold">Seattle, WA</span>
                </div>
            </div>
        </div>
    </footer>
</div>
