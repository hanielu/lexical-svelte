# `@hvniel/lexical-svelte`

[![Stable release](https://img.shields.io/npm/v/@hvniel/lexical-svelte.svg)](https://npm.im/@hvniel/lexical-svelte)

This package provides a set of components and hooks for Lexical that allow for text editing in Svelte applications.

## Getting started

Install `lexical` and `@hvniel/lexical-svelte`:

```
npm install lexical @hvniel/lexical-svelte
```

## Usage

Below is an example of a basic plain text editor using lexical and @hvniel/lexical-svelte:

### App.svelte

```svelte
<script>
	import { $getRoot as getRoot$, $getSelection as getSelection$ } from 'lexical';
	import { LexicalComposer, PlainTextPlugin, ContentEditable, HistoryPlugin, OnChangePlugin, useLexicalComposerContext } from '@hvniel/lexical-svelte';

	const theme = {
		// Theme styling goes here
		...
	}

	// Catch any errors that occur during Lexical updates and log them
	// or throw them as needed. If you don't throw them, Lexical will
	// try to recover gracefully without losing user data.
	function onError(error) {
		throw error;
	}

	const initialConfig = {
		namespace: 'MyEditor',
		theme,
		onError
	}

	// When the editor changes, you can get notified via the
	// LexicalOnChangePlugin!
	function onChange(editorState) {
		editorState.read(() => {
			// Read the contents of the EditorState here.
			const root = getRoot$();
			const selection = getSelection$();

			console.log(root, selection);
		});
	}
</script>

<LexicalComposer {initialConfig}>
	<PlainTextPlugin>
		{#snippet contentEditable()}
			<ContentEditable />
		{/snippet}
	</PlainTextPlugin>
	<HistoryPlugin />
	<OnChangePlugin {onChange} />
	<CustomAutoFocusPlugin />
</LexicalComposer>
```

### CustomAutoFocusPlugin.svelte

```svelte
<!-- Lexical Svelte plugins are Svelte components, which makes them
highly composable. Furthermore, you can lazy load plugins if
desired, so you don't pay the cost for plugins until you
actually use them. -->

<script>
	import { useLexicalComposerContext } from '@hvniel/lexical-svelte';

	const [editor] = useLexicalComposerContext();

	$effect(() => {
		// Focus the editor when the effect fires!
		editor.focus();
	});
</script>
```
