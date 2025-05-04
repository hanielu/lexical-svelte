<script lang="ts" module>
	import type { LexicalNode } from 'lexical';
	import {
		type ElementTransformer,
		TRANSFORMERS,
		type Transformer,
		registerMarkdownShortcuts
	} from '@lexical/markdown';
	import { useLexicalComposerContext } from '$lib/core/composer-context.js';
	import {
		HorizontalRuleNode,
		isHorizontalRuleNode$,
		createHorizontalRuleNode$
	} from './horizontal-rule-plugin/node.svelte';

	const HR: ElementTransformer = {
		dependencies: [HorizontalRuleNode],
		export: (node: LexicalNode) => {
			return isHorizontalRuleNode$(node) ? '***' : null;
		},
		regExp: /^(---|\*\*\*|___)\s?$/,
		replace: (parentNode, _1, _2, isImport) => {
			const line = createHorizontalRuleNode$();

			// TODO: Get rid of isImport flag
			if (isImport || parentNode.getNextSibling() != null) {
				parentNode.replace(line);
			} else {
				parentNode.insertBefore(line);
			}

			line.selectNext();
		},
		type: 'element'
	};

	export const DEFAULT_TRANSFORMERS = [HR, ...TRANSFORMERS];
</script>

<script lang="ts">
	const {
		transformers = DEFAULT_TRANSFORMERS
	}: Readonly<{
		transformers?: Array<Transformer>;
	}> = $props();

	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		return registerMarkdownShortcuts(editor, transformers);
	});
</script>
