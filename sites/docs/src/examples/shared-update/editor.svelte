<script lang="ts">
	import EditorContext from './context.svelte';
	import EditorPlugins from './editor-plugins.svelte';
	import type { InitialConfigType } from 'lexical-svelte';
	import { CommentNode, createCommentNode$ } from './nodes/comment/comment-node';
	import { LexicalComposer } from 'lexical-svelte';
	import { initEditorContent$, createDefaultParagraphNode$ } from '$lib/utils/state';
	import { logError } from '$lib/utils/error';
	import { theme } from '$lib/utils/theme';

	const getInitialContent = () => [
		createDefaultParagraphNode$(),
		createCommentNode$('This is a comment node with a nested editor sama!')
	];

	const config: InitialConfigType = {
		namespace: 'lexical',
		nodes: [CommentNode], // 👈 CommentNode is a custom node type with a nested editor
		onError: logError,
		theme,
		editorState: () => initEditorContent$({ nodes: getInitialContent() })
	};
</script>

<LexicalComposer initialConfig={config}>
	<EditorContext>
		<EditorPlugins />
	</EditorContext>
</LexicalComposer>
