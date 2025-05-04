<script lang="ts" module>
	import HorizontalRuleComponent from './node.svelte';
	import type { Decorator } from '$lib/core/decorators.svelte';
	import { addClassNamesToElement, mergeRegister, removeClassNamesFromElement } from '@lexical/utils';
	import {
		$applyNodeReplacement as applyNodeReplacement$,
		CLICK_COMMAND,
		COMMAND_PRIORITY_LOW,
		createCommand,
		DecoratorNode,
		type DOMConversionMap,
		type DOMConversionOutput,
		type DOMExportOutput,
		type EditorConfig,
		type LexicalCommand,
		type LexicalNode,
		type NodeKey,
		type SerializedLexicalNode
	} from 'lexical';
	import { useLexicalComposerContext } from '$lib/core/composer-context.js';
	import { useLexicalNodeSelection } from '$lib/core/shared/use-lexical-node-selection.svelte.js';

	export type SerializedHorizontalRuleNode = SerializedLexicalNode;

	export const INSERT_HORIZONTAL_RULE_COMMAND: LexicalCommand<void> = createCommand('INSERT_HORIZONTAL_RULE_COMMAND');

	export class HorizontalRuleNode extends DecoratorNode<Decorator<typeof HorizontalRuleComponent>> {
		static getType(): string {
			return 'horizontalrule';
		}

		static clone(node: HorizontalRuleNode): HorizontalRuleNode {
			return new HorizontalRuleNode(node.__key);
		}

		static importJSON(serializedNode: SerializedHorizontalRuleNode): HorizontalRuleNode {
			return createHorizontalRuleNode$().updateFromJSON(serializedNode);
		}

		static importDOM(): DOMConversionMap | null {
			return {
				hr: () => ({
					conversion: convertHorizontalRuleElement$,
					priority: 0
				})
			};
		}

		exportDOM(): DOMExportOutput {
			return { element: document.createElement('hr') };
		}

		createDOM(config: EditorConfig): HTMLElement {
			const element = document.createElement('hr');
			addClassNamesToElement(element, config.theme.hr);
			return element;
		}

		getTextContent(): string {
			return '\n';
		}

		isInline(): false {
			return false;
		}

		updateDOM(): boolean {
			return false;
		}

		decorate(): Decorator<typeof HorizontalRuleComponent> {
			return { component: HorizontalRuleComponent, props: { nodeKey: this.__key } };
		}
	}

	function convertHorizontalRuleElement$(): DOMConversionOutput {
		return { node: createHorizontalRuleNode$() };
	}

	export function createHorizontalRuleNode$(): HorizontalRuleNode {
		return applyNodeReplacement$(new HorizontalRuleNode());
	}

	export function isHorizontalRuleNode$(node: LexicalNode | null | undefined): node is HorizontalRuleNode {
		return node instanceof HorizontalRuleNode;
	}
</script>

<script lang="ts">
	const { nodeKey }: { nodeKey: NodeKey } = $props();

	const editor = useLexicalComposerContext()[0];
	const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);

	$effect(() => {
		return mergeRegister(
			editor.registerCommand(
				CLICK_COMMAND,
				(event: MouseEvent) => {
					const hrElem = editor.getElementByKey(nodeKey);

					if (event.target === hrElem) {
						if (!event.shiftKey) {
							clearSelection();
						}
						setSelected(!isSelected());
						return true;
					}

					return false;
				},
				COMMAND_PRIORITY_LOW
			)
		);
	});

	$effect(() => {
		const hrElem = editor.getElementByKey(nodeKey);
		const isSelectedClassName = editor._config.theme.hrSelected ?? 'selected';

		if (hrElem !== null) {
			if (isSelected()) {
				addClassNamesToElement(hrElem, isSelectedClassName);
			} else {
				removeClassNamesFromElement(hrElem, isSelectedClassName);
			}
		}
	});
</script>
