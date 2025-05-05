<script lang="ts">
	import type { Snippet } from 'svelte';
	import Box from '~icons/lucide/box';

	type HeaderProps = {
		name: string;
		Description?: Snippet;
	};

	let { name, Description }: HeaderProps = $props();
</script>

<div class="mb-6 mt-1 rounded-lg bg-purple-100 px-3 py-4">
	<h1 class="flex items-center gap-x-2 text-xl font-medium">
		<Box class="text-24px" />
		{name}
	</h1>

	{#if Description}
		<div class="mt-4 px-1 text-sm text-gray-700">
			{@render Description()}
		</div>
	{/if}
</div>
