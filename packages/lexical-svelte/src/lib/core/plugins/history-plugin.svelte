<script lang="ts">
	import { useLexicalComposerContext } from '../composer-context.js';
	import { createEmptyHistoryState, registerHistory, type HistoryState } from '@lexical/history';

	interface HistoryPluginProps {
		delay?: number;
		externalHistoryState?: HistoryState;
	}

	const { delay = 1000, externalHistoryState = createEmptyHistoryState() }: HistoryPluginProps = $props();

	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		return registerHistory(editor, externalHistoryState, delay);
	});
</script>
