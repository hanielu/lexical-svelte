<script lang="ts">
	import type { Snippet } from 'svelte';
	import ExternalLinks from './external-links.svelte';
	import Header from './header.svelte';

	type AppContainerProps = {
		name: string;
		slug: string;
		Description?: Snippet;
		children: Snippet;
	};

	let { children, name, slug, Description }: AppContainerProps = $props();
</script>

<div class="mx-auto my-16 max-w-xl">
	<ExternalLinks {slug} />
	<main class="my-4">
		<Header {name} {Description} />
		{@render children()}
	</main>
</div>
