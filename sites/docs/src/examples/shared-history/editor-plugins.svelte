<script lang="ts">
	import { RichTextPlugin, LexicalErrorBoundary, ContentEditable, HistoryPlugin } from '@hvniel/lexical-svelte';
	import { getHistoryStateContext } from './context';

	const historyState = getHistoryStateContext();
</script>

<RichTextPlugin errorBoundary={LexicalErrorBoundary}>
	{#snippet contenteditable()}
		<ContentEditable />
	{/snippet}
</RichTextPlugin>
<HistoryPlugin externalHistoryState={historyState} />
