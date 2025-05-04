<script lang="ts">
	import Decorators, { type ErrorBoundaryProps } from '../decorators.svelte';
	import type { Snippet } from 'svelte';
	import { mergeRegister } from '@lexical/utils';
	import { registerDragonSupport } from '@lexical/dragon';
	import { registerPlainText } from '@lexical/plain-text';
	import { useLexicalComposerContext } from '../composer-context.js';

	interface Props {
		contenteditable: Snippet;
		errorBoundary: ErrorBoundaryProps;
	}

	let { contenteditable, errorBoundary }: Props = $props();

	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		return mergeRegister(registerPlainText(editor), registerDragonSupport(editor));
	});
</script>

{@render contenteditable()}
<Decorators {editor} {errorBoundary} />
