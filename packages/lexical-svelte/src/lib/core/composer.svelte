<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import {
		type Klass,
		type LexicalNode,
		type LexicalNodeReplacement,
		type LexicalEditor,
		type EditorThemeClasses,
		type HTMLConfig,
		type EditorState,
		createEditor,
		$createParagraphNode as createParagraphNode$,
		$getRoot as getRoot$,
		$getSelection as getSelection$,
		HISTORY_MERGE_TAG
	} from 'lexical';
	import { CAN_USE_DOM } from '@lexical/utils';
	import { setComposerContext, createLexicalComposerContext } from './composer-context.js';

	export type InitialEditorStateType = null | string | EditorState | ((editor: LexicalEditor) => void);

	export type InitialConfigType = Readonly<{
		namespace: string;
		nodes?: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement>;
		onError: (error: Error, editor: LexicalEditor) => void;
		editable?: boolean;
		theme?: EditorThemeClasses;
		editorState?: InitialEditorStateType;
		html?: HTMLConfig;
	}>;

	const HISTORY_MERGE_OPTIONS = { tag: HISTORY_MERGE_TAG };
	function initializeEditor(editor: LexicalEditor, initialEditorState?: InitialEditorStateType): void {
		if (initialEditorState === null) {
			return;
		} else if (initialEditorState === undefined) {
			editor.update(() => {
				const root = getRoot$();
				if (root.isEmpty()) {
					const paragraph = createParagraphNode$();
					root.append(paragraph);
					const activeElement = CAN_USE_DOM ? document.activeElement : null;
					if (getSelection$() !== null || (activeElement !== null && activeElement === editor.getRootElement())) {
						paragraph.select();
					}
				}
			}, HISTORY_MERGE_OPTIONS);
		} else if (initialEditorState !== null) {
			switch (typeof initialEditorState) {
				case 'string': {
					const parsedEditorState = editor.parseEditorState(initialEditorState);
					editor.setEditorState(parsedEditorState, HISTORY_MERGE_OPTIONS);
					break;
				}
				case 'object': {
					editor.setEditorState(initialEditorState, HISTORY_MERGE_OPTIONS);
					break;
				}
				case 'function': {
					editor.update(() => {
						const root = getRoot$();
						if (root.isEmpty()) {
							initialEditorState(editor);
						}
					}, HISTORY_MERGE_OPTIONS);
					break;
				}
			}
		}
	}
</script>

<script lang="ts">
	interface Props {
		initialConfig: InitialConfigType;
		children: Snippet;
	}

	let { initialConfig, children }: Props = $props();

	const { theme, namespace, nodes, onError, editorState: initialEditorState, editable, html } = initialConfig;

	const editor = createEditor({
		editable: initialConfig.editable,
		html,
		namespace,
		nodes,
		onError: (error) => onError(error, editor),
		theme
	});

	initializeEditor(editor, initialEditorState);
	editor.setEditable(editable !== undefined ? editable : true);

	setComposerContext([editor, createLexicalComposerContext(null, () => theme)]);
</script>

{@render children()}
