<script lang="ts">
	import ExampleList from '$lib/components/example-list.svelte';
	import Example from '$lib/components/example.svelte';

	import nestedEditor from '$examples/nested-editor/app.svelte';
	import sharedHistory from '$examples/shared-history/app.svelte';
	import sharedUpdate from '$examples/shared-update/app.svelte';

	const examples = [
		{
			id: 'lexical-nested-editor',
			title: 'Nested Editor',
			Component: nestedEditor
		},
		{
			id: 'lexical-shared-history',
			title: 'Shared History',
			Component: sharedHistory
		},
		{
			id: 'lexical-shared-update',
			title: 'Shared Update',
			Component: sharedUpdate
		}
	];

	let selectedExample = $state<string | null>(null);
	const example = $derived(examples.find((example) => example.id === selectedExample));
</script>

{#if example}
	<Example {example} unselectExample={() => (selectedExample = null)} />
{:else}
	<ExampleList {examples} selectExample={(id) => (selectedExample = id)} />
{/if}
