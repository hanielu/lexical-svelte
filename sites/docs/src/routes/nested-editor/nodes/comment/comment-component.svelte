<script lang="ts">
	import type { Comment as CommentType } from './comment-node';
	import { LexicalNestedComposer, PlainTextPlugin, ContentEditable, LexicalErrorBoundary } from 'lexical-svelte';
	import { themeNestedEditor as theme } from '$lib/utils/theme';

	type CommentProps = {
		comment: CommentType;
	};

	let { comment }: CommentProps = $props();
</script>

<div class="styled-comment">
	<LexicalNestedComposer initialTheme={theme} initialEditor={comment}>
		<PlainTextPlugin errorBoundary={LexicalErrorBoundary}>
			{#snippet contenteditable()}
				<ContentEditable />
			{/snippet}
		</PlainTextPlugin>
	</LexicalNestedComposer>
</div>
