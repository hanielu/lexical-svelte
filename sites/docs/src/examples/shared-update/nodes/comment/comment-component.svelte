<script lang="ts">
	import StyledComment from '$lib/ui/comment.svelte';
	import type { Comment as CommentType } from './comment-node';
	import {
		LexicalNestedComposer,
		PlainTextPlugin,
		ContentEditable,
		LexicalErrorBoundary,
		OnChangePlugin
	} from '@hvniel/lexical-svelte';
	import { themeNestedEditor as theme } from '$lib/utils/theme';
	import { getAutoSaveContext } from '../../context.svelte';

	type CommentProps = {
		comment: CommentType;
	};

	let { comment }: CommentProps = $props();
	const emitUpdate = getAutoSaveContext();
</script>

<StyledComment>
	<LexicalNestedComposer initialTheme={theme} initialEditor={comment}>
		<PlainTextPlugin errorBoundary={LexicalErrorBoundary}>
			{#snippet contenteditable()}
				<ContentEditable />
			{/snippet}
		</PlainTextPlugin>
		<OnChangePlugin onChange={emitUpdate} ignoreSelectionChange />
	</LexicalNestedComposer>
</StyledComment>
