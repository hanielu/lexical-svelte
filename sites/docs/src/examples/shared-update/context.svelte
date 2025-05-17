<script lang="ts" module>
	import { debounce } from '$lib/utils/debounce';
	import { useLexicalComposerContext } from '@hvniel/lexical-svelte';
	import { getContext, setContext } from 'svelte';

	const AutoSaveKey = Symbol('auto-save');

	const defaultEmitUpdate = () => {
		console.log('Lexical Update');
	};

	export const setAutoSaveContext = (handleUpdate?: () => void) =>
		setContext(AutoSaveKey, handleUpdate ?? defaultEmitUpdate);

	export const getAutoSaveContext = () => getContext<typeof defaultEmitUpdate>(AutoSaveKey);
</script>

<script lang="ts">
	const editor = useLexicalComposerContext()[0];

	const handleUpdate = () => console.log(editor.getEditorState().toJSON());
	const debouncedUpdate = debounce(handleUpdate, 1000);

	const { children } = $props();

	setAutoSaveContext(debouncedUpdate);
</script>

{@render children()}
