<script lang="ts">
	import { useLexicalComposerContext } from '$lib/core/composer-context.js';
	import {
		$getSelection as getSelection$,
		$isRangeSelection as isRangeSelection$,
		COMMAND_PRIORITY_EDITOR
	} from 'lexical';
	import { $insertNodeToNearestRoot as insertNodeToNearestRoot$ } from '@lexical/utils';
	import { INSERT_HORIZONTAL_RULE_COMMAND, createHorizontalRuleNode$ } from './node.svelte';

	const editor = useLexicalComposerContext()[0];

	$effect(() => {
		return editor.registerCommand(
			INSERT_HORIZONTAL_RULE_COMMAND,
			(type) => {
				const selection = getSelection$();

				if (!isRangeSelection$(selection)) {
					return false;
				}

				const focusNode = selection.focus.getNode();

				if (focusNode !== null) {
					const horizontalRuleNode = createHorizontalRuleNode$();
					insertNodeToNearestRoot$(horizontalRuleNode);
				}

				return true;
			},
			COMMAND_PRIORITY_EDITOR
		);
	});
</script>
