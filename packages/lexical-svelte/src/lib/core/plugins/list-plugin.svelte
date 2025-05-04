<script lang="ts" module>
	export interface ListPluginProps {
		/**
		 * When `true`, enforces strict indentation rules for list items, ensuring consistent structure.
		 * When `false` (default), indentation is more flexible.
		 */
		hasStrictIndent?: boolean;
	}
</script>

<script lang="ts">
	import { ListNode, ListItemNode, registerListStrictIndentTransform, registerList } from '@lexical/list';
	import { useLexicalComposerContext } from '../composer-context.js';

	const { hasStrictIndent }: ListPluginProps = $props();
	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		if (!editor.hasNodes([ListNode, ListItemNode])) {
			throw new Error('ListPlugin: ListNode and/or ListItemNode not registered on editor');
		}
	});

	$effect(() => {
		if (!hasStrictIndent) return;
		return registerListStrictIndentTransform(editor);
	});

	$effect(() => {
		return registerList(editor);
	});
</script>
