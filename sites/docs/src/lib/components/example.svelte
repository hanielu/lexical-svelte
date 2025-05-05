<script lang="ts">
	import type { Component } from 'svelte';
	import ChevronLeft from '~icons/lucide/chevron-left';

	type ExampleProps = {
		unselectExample: () => void;
		example: {
			id: string;
			title: string;
			Component: Component<any>;
		};
	};

	let { unselectExample, example }: ExampleProps = $props();
</script>

<div class="mx-auto my-12 max-w-xl">
	<button
		class="-mb-10 flex items-center rounded-lg border-2 border-gray-100 bg-gray-100 px-2 py-2 text-sm font-medium transition-all hover:border-gray-200"
		onclick={() => unselectExample()}
	>
		<ChevronLeft class="text-24px" />
	</button>

	<example.Component />
</div>
