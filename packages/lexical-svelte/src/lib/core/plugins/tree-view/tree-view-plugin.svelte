<script lang="ts" module>
	import type { EditorState, LexicalEditor } from 'lexical';
	import { generateContent, type CustomPrintNodeFn } from '@lexical/devtools-core';
	import { useLexicalCommandsLog } from './use-lexical-commands-log.svelte.js';
	import { mergeRegister } from '@lexical/utils';
	import TreeViewCore from './tree-view.svelte';

	export interface TreeViewProps {
		/**
		 * The Lexical editor instance to be visualized and debugged
		 */
		editor: LexicalEditor;
		/**
		 * Custom class name for the tree type toggle button
		 */
		treeTypeButtonClassName?: string;
		/**
		 * Custom class name for the time travel toggle button
		 */
		timeTravelButtonClassName?: string;
		/**
		 * Custom class name for buttons inside the time travel panel
		 */
		timeTravelPanelButtonClassName?: string;
		/**
		 * Custom class name for the overall time travel panel container
		 */
		timeTravelPanelClassName?: string;
		/**
		 * Custom class name for the time travel slider in the panel
		 */
		timeTravelPanelSliderClassName?: string;
		/**
		 * Custom class name for the tree view container
		 */
		viewClassName?: string;
		/**
		 * A function for customizing the display of nodes in the tree
		 */
		customPrintNode?: CustomPrintNodeFn;
	}
</script>

<script lang="ts">
	let {
		treeTypeButtonClassName,
		timeTravelButtonClassName,
		timeTravelPanelSliderClassName,
		timeTravelPanelButtonClassName,
		timeTravelPanelClassName,
		viewClassName,
		editor,
		customPrintNode
	}: TreeViewProps = $props();

	let treeElementRef: HTMLPreElement;
	let editorCurrentState = $state.raw(editor.getEditorState());

	const getCommandsLog = useLexicalCommandsLog(editor);
	const commandsLog = $derived(getCommandsLog());

	$effect(() => {
		// Registers listeners to update the tree view when the editor state changes
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorCurrentState = editorState;
			}),
			editor.registerEditableListener(() => {
				editorCurrentState = editor.getEditorState();
			})
		);
	});

	$effect(() => {
		const element = treeElementRef;

		if (element !== null) {
			// Assigns the editor instance to the tree view DOM element for internal tracking
			// @ts-ignore Internal field used by Lexical
			element.__lexicalEditor = editor;

			return () => {
				// Cleans up the reference when the component is unmounted
				// @ts-ignore Internal field used by Lexical
				element.__lexicalEditor = null;
			};
		}
	});

	/**
	 * Handles toggling the readonly state of the editor.
	 *
	 * @param {boolean} isReadonly - Whether the editor should be set to readonly.
	 */
	const handleEditorReadOnly = (isReadonly: boolean) => {
		const rootElement = editor.getRootElement();
		if (rootElement == null) {
			return;
		}

		rootElement.contentEditable = isReadonly ? 'false' : 'true';
	};
</script>

<!--
@component
TreeView is a component that provides a visual representation of the Lexical editor's state and enables debugging features like time travel and custom tree node rendering.

## Props
- `editor: LexicalEditor` - The Lexical editor instance to be visualized and debugged
- `treeTypeButtonClassName?: string` - Custom class name for the tree type toggle button
- `timeTravelButtonClassName?: string` - Custom class name for the time travel toggle button
- `timeTravelPanelButtonClassName?: string` - Custom class name for buttons inside the time travel panel
- `timeTravelPanelClassName?: string` - Custom class name for the overall time travel panel container
- `timeTravelPanelSliderClassName?: string` - Custom class name for the time travel slider in the panel
- `viewClassName?: string` - Custom class name for the tree view container
- `customPrintNode?: CustomPrintNodeFn` - A function for customizing the display of nodes in the tree\
-->

<TreeViewCore
	{treeTypeButtonClassName}
	{timeTravelButtonClassName}
	{timeTravelPanelSliderClassName}
	{timeTravelPanelButtonClassName}
	{viewClassName}
	{timeTravelPanelClassName}
	setEditorReadOnly={handleEditorReadOnly}
	editorState={editorCurrentState}
	setEditorState={(state) => editor.setEditorState(state)}
	generateContent={async function (exportDOM) {
		// Generates the content for the tree view, allowing customization with exportDOM and customPrintNode
		return generateContent(editor, commandsLog, exportDOM, customPrintNode);
	}}
	bind:ref={treeElementRef}
	{commandsLog}
/>
