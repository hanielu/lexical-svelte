<script lang="ts">
	import PlaygroundEditorTheme from '$lib/themes/playground-editor-theme';
	import PlaygroundNodes from '$lib/nodes/playground-nodes';
	import { $prepopulatedRichText as prepopulatedRichText, buildImportMap } from './state';
	import { LexicalComposer } from '@hvniel/lexical-svelte';
	import { useSettings } from '$lib/context/settings-context.svelte';

	const { isCollab, emptyEditor } = $derived(useSettings().settings());

	const initialConfig = $derived({
		editorState: isCollab ? null : emptyEditor ? undefined : prepopulatedRichText,
		html: { import: buildImportMap() },
		namespace: 'Playground',
		nodes: [...PlaygroundNodes],
		onError: (error: Error) => {
			throw error;
		},
		theme: PlaygroundEditorTheme
	});
</script>

<LexicalComposer {initialConfig}>
	<!-- <Playground /> -->
</LexicalComposer>
