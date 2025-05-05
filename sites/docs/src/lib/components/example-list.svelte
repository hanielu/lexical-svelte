<script lang="ts">
	import Box from '~icons/lucide/box';
	import ChevronRight from '~icons/lucide/chevron-right';
	import type { Component } from 'svelte';

	type ExampleListProps = {
		selectExample: (id: string) => void;
		examples: {
			id: string;
			title: string;
			Component: Component<any>;
		}[];
	};

	let { selectExample, examples }: ExampleListProps = $props();
</script>

<div class="mx-auto my-24 max-w-lg">
	<div class="mb-6 mt-1 rounded-lg bg-purple-100 px-6 py-4">
		<h1 class="flex items-center gap-x-2 text-xl font-medium">
			<Box class="text-24px" /> lexical-examples
		</h1>
	</div>
	<div class="flex-col items-center justify-center">
		{#each examples as { id, title }}
			<button
				class="group my-2 flex w-full items-center justify-between gap-2 rounded-lg border-2 border-gray-100 bg-gray-100 px-6 py-2 text-left font-medium transition-all hover:border-gray-200"
				onclick={() => selectExample(id)}
			>
				{title}
				<ChevronRight class="text-18px transition-all group-hover:translate-x-2" />
			</button>
		{/each}
	</div>
</div>
