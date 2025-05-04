<script lang="ts">
	import type { Snippet } from 'svelte';
	import { mergeRegister } from '@lexical/utils';
	import { registerDragonSupport } from '@lexical/dragon';
	import { registerRichText } from '@lexical/rich-text';
	import { useLexicalComposerContext } from '../composer-context.js';
	import Decorators, { type ErrorBoundaryProps } from '../decorators.svelte';

	interface Props {
		contenteditable: Snippet;
		errorBoundary: ErrorBoundaryProps;
	}

	let { contenteditable, errorBoundary }: Props = $props();

	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		return mergeRegister(registerRichText(editor), registerDragonSupport(editor));
	});
</script>

{@render contenteditable()}
<Decorators {editor} {errorBoundary} />
