<script lang="ts">
	import StyledComment from '$lib/ui/comment.svelte';
	import type { Comment as CommentType } from './comment-node';
	import { LexicalNestedComposer, PlainTextPlugin, ContentEditable, LexicalErrorBoundary } from 'lexical-svelte';
	import { themeNestedEditor as theme } from '$lib/utils/theme';

	type CommentProps = {
		comment: CommentType;
	};

	let { comment }: CommentProps = $props();
</script>

<StyledComment>
	<LexicalNestedComposer initialTheme={theme} initialEditor={comment}>
		<PlainTextPlugin errorBoundary={LexicalErrorBoundary}>
			{#snippet contenteditable()}
				<ContentEditable />
			{/snippet}
		</PlainTextPlugin>
	</LexicalNestedComposer>
</StyledComment>
