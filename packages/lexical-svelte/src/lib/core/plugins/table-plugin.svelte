<script lang="ts" module>
	export interface TablePluginProps {
		/**
		 * When `false` (default `true`), merged cell support (colspan and rowspan) will be disabled and all
		 * tables will be forced into a regular grid with 1x1 table cells.
		 */
		hasCellMerge?: boolean;
		/**
		 * When `false` (default `true`), the background color of TableCellNode will always be removed.
		 */
		hasCellBackgroundColor?: boolean;
		/**
		 * When `true` (default `true`), the tab key can be used to navigate table cells.
		 */
		hasTabHandler?: boolean;
		/**
		 * When `true` (default `false`), tables will be wrapped in a `<div>` to enable horizontal scrolling
		 */
		hasHorizontalScroll?: boolean;
	}
</script>

<script lang="ts">
	import {
		$isScrollableTablesActive as isScrollableTablesActive$,
		setScrollableTablesActive,
		TableNode,
		registerTablePlugin,
		registerTableSelectionObserver,
		registerTableCellUnmergeTransform,
		TableCellNode
	} from '@lexical/table';

	import { useLexicalComposerContext } from '../composer-context.js';

	let {
		hasCellMerge = true,
		hasCellBackgroundColor = true,
		hasTabHandler = true,
		hasHorizontalScroll = false
	}: TablePluginProps = $props();

	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		const hadHorizontalScroll = isScrollableTablesActive$(editor);
		if (hadHorizontalScroll !== hasHorizontalScroll) {
			setScrollableTablesActive(editor, hasHorizontalScroll);
			// Registering the transform has the side-effect of marking all existing
			// TableNodes as dirty. The handler is immediately unregistered.
			editor.registerNodeTransform(TableNode, () => {})();
		}
	});

	$effect(() => registerTablePlugin(editor));

	$effect(() => registerTableSelectionObserver(editor, hasTabHandler));

	// Unmerge cells when the feature isn't enabled
	$effect(() => {
		if (!hasCellMerge) {
			return registerTableCellUnmergeTransform(editor);
		}
	});

	// Remove cell background color when feature is disabled
	$effect(() => {
		if (hasCellBackgroundColor) {
			return;
		}
		return editor.registerNodeTransform(TableCellNode, (node) => {
			if (node.getBackgroundColor() !== null) {
				node.setBackgroundColor(null);
			}
		});
	});
</script>

<!-- 
	@component
	A plugin to enable all of the features of Lexical's TableNode.

	@param props - See type for documentation
-->
