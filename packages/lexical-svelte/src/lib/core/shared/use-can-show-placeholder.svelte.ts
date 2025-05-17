import type { LexicalEditor } from 'lexical';

import { $canShowPlaceholderCurry as canShowPlaceholderCurry$ } from '@lexical/text';
import { mergeRegister } from '@lexical/utils';

function canShowPlaceholderFromCurrentEditorState(editor: LexicalEditor) {
	const currentCanShowPlaceholder = editor.getEditorState().read(canShowPlaceholderCurry$(editor.isComposing()));
	return currentCanShowPlaceholder;
}

export function useCanShowPlaceholder(editor: LexicalEditor) {
	let canShowPlaceholder = $state.raw(canShowPlaceholderFromCurrentEditorState(editor));

	function resetCanShowPlaceholder() {
		const currentCanShowPlaceholder = canShowPlaceholderFromCurrentEditorState(editor);
		canShowPlaceholder = currentCanShowPlaceholder;
	}

	$effect(() => {
		resetCanShowPlaceholder();
		return mergeRegister(
			editor.registerUpdateListener(() => {
				resetCanShowPlaceholder();
			}),
			editor.registerEditableListener(() => {
				resetCanShowPlaceholder();
			})
		);
	});

	return () => canShowPlaceholder;
}
