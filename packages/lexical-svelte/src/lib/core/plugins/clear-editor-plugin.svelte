<script lang="ts">
	import {
		CLEAR_EDITOR_COMMAND,
		$getRoot as getRoot$,
		$getSelection as getSelection$,
		$createParagraphNode as createParagraphNode$,
		$isRangeSelection as isRangeSelection$,
		COMMAND_PRIORITY_EDITOR
	} from 'lexical';
	import { useLexicalComposerContext } from '../composer-context.js';

	interface ClearEditorPluginProps {
		onClear?: () => void;
	}

	const { onClear }: ClearEditorPluginProps = $props();

	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		return editor.registerCommand(
			CLEAR_EDITOR_COMMAND,
			(payload) => {
				editor.update(() => {
					if (onClear == null) {
						const root = getRoot$();
						const selection = getSelection$();
						const paragraph = createParagraphNode$();
						root.clear();
						root.append(paragraph);

						if (selection !== null) {
							paragraph.select();
						}
						if (isRangeSelection$(selection)) {
							selection.format = 0;
						}
					} else {
						onClear();
					}
				});
				return true;
			},
			COMMAND_PRIORITY_EDITOR
		);
	});
</script>
