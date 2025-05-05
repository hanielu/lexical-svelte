<script lang="ts">
	import { HISTORY_MERGE_TAG, type EditorState, type LexicalEditor } from 'lexical';
	import { useLexicalComposerContext } from '../composer-context.js';

	let {
		ignoreHistoryMergeTagChange = true,
		ignoreSelectionChange = false,
		onChange
	}: {
		ignoreHistoryMergeTagChange?: boolean;
		ignoreSelectionChange?: boolean;
		onChange: (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void;
	} = $props();

	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		if (onChange) {
			return editor.registerUpdateListener(({ editorState, dirtyElements, dirtyLeaves, prevEditorState, tags }) => {
				if (
					(ignoreSelectionChange && dirtyElements.size === 0 && dirtyLeaves.size === 0) ||
					(ignoreHistoryMergeTagChange && tags.has(HISTORY_MERGE_TAG)) ||
					prevEditorState.isEmpty()
				) {
					return;
				}

				onChange(editorState, editor, tags);
			});
		}
	});
</script>
