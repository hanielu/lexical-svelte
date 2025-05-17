import type { LexicalEditor, NodeKey } from 'lexical';
import {
	$createNodeSelection as createNodeSelection$,
	$getNodeByKey as getNodeByKey$,
	$getSelection as getSelection$,
	$isNodeSelection as isNodeSelection$,
	$setSelection as setSelection$
} from 'lexical';
import { useLexicalComposerContext } from '../composer-context.js';

/**
 * A helper function to determine if a specific node is selected in a Lexical editor.
 *
 * @param {LexicalEditor} editor - The LexicalEditor instance.
 * @param {NodeKey} key - The key of the node to check.
 * @returns {boolean} Whether the node is selected.
 */

function isNodeSelected(editor: LexicalEditor, key: NodeKey): boolean {
	return editor.getEditorState().read(() => {
		const node = getNodeByKey$(key);

		if (node === null) {
			return false; // Node doesn't exist, so it's not selected.
		}

		return node.isSelected(); // Check if the node is selected.
	});
}

/**
 * A custom hook to manage the selection state of a specific node in a Lexical editor.
 *
 * This hook provides utilities to:
 * - Check if a node is selected.
 * - Update its selection state.
 * - Clear the selection.
 *
 * @param {NodeKey} key - The key of the node to track selection for.
 * @returns {[() => boolean, (selected: boolean) => void, () => void]} A tuple containing:
 * - `isSelected` (function): A getter function that returns whether the node is currently selected.
 * - `setSelected` (function): A function to set the selection state of the node.
 * - `clearSelected` (function): A function to clear the selection of the node.
 *
 */

export function useLexicalNodeSelection(key: NodeKey): [() => boolean, (selected: boolean) => void, () => void] {
	const editor = useLexicalComposerContext()[0];

	// State to track whether the node is currently selected.
	let isSelected = $state.raw(isNodeSelected(editor, key));

	$effect(() => {
		let isMounted = true;
		const unregister = editor.registerUpdateListener(() => {
			if (isMounted) {
				isSelected = isNodeSelected(editor, key);
			}
		});

		return () => {
			isMounted = false; // Prevent updates after component unmount.
			unregister();
		};
	});

	const setSelected = (selected: boolean) => {
		editor.update(() => {
			let selection = getSelection$();

			if (!isNodeSelection$(selection)) {
				selection = createNodeSelection$();
				setSelection$(selection);
			}

			if (isNodeSelection$(selection)) {
				if (selected) {
					selection.add(key);
				} else {
					selection.delete(key);
				}
			}
		});
	};

	const clearSelected = () => {
		editor.update(() => {
			const selection = getSelection$();

			if (isNodeSelection$(selection)) {
				selection.clear();
			}
		});
	};

	return [() => isSelected, setSelected, clearSelected];
}
