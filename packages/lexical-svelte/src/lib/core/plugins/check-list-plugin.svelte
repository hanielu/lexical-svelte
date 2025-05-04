<script lang="ts">
	import { registerCheckList } from '@lexical/list';
	import { useLexicalComposerContext } from '../composer-context.js';

	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		return registerCheckList(editor);
	});
</script>
