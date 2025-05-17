<script lang="ts">
	import type { InitialConfigType } from '@hvniel/lexical-svelte';
	import { CommentNode, createCommentNode$ } from './nodes/comment/comment-node';
	import { LexicalComposer, RichTextPlugin, LexicalErrorBoundary, ContentEditable } from '@hvniel/lexical-svelte';
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
	<RichTextPlugin errorBoundary={LexicalErrorBoundary}>
		{#snippet contenteditable()}
			<ContentEditable />
		{/snippet}
	</RichTextPlugin>
</LexicalComposer>
