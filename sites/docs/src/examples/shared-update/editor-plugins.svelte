<script lang="ts">
	import { RichTextPlugin, LexicalErrorBoundary, ContentEditable, OnChangePlugin } from '@hvniel/lexical-svelte';
	import { getAutoSaveContext } from './context.svelte';

	const emitUpdate = getAutoSaveContext();
</script>

<RichTextPlugin errorBoundary={LexicalErrorBoundary}>
	{#snippet contenteditable()}
		<ContentEditable />
	{/snippet}
</RichTextPlugin>
<OnChangePlugin onChange={emitUpdate} ignoreSelectionChange />
