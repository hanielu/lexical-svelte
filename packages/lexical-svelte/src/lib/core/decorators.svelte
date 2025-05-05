<script lang="ts" module>
	import type { LexicalEditor, NodeKey } from 'lexical';
	import { Portal } from '$lib/shared/portal/index.js';
	import { flushSync, type Component, type Snippet, type ComponentProps } from 'svelte';

	export interface ErrorBoundaryProps {
		failed: Snippet<[error: any, reset: () => void]>;
		// onerror: (error: any) => void;
	}

	export type Decorator<T extends Component<any>> = { component: T; props: ComponentProps<T> };
</script>

<script lang="ts">
	interface DecoratorProps {
		editor: LexicalEditor;
		errorBoundary: ErrorBoundaryProps;
	}

	let { editor, errorBoundary }: DecoratorProps = $props();

	let decorators = $state<Record<NodeKey, Decorator<Component>>>(editor.getDecorators<Decorator<Component>>());
	const decoratorKeys = $derived(Object.keys(decorators));

	$effect(() => {
		// If the content editable mounts before the subscription is added, then
		// nothing will be rendered on initial pass. We can get around that by
		// ensuring that we set the value.
		decorators = editor.getDecorators<Decorator<Component>>();

		return editor.registerDecoratorListener<Decorator<Component>>((nextDecorators) => {
			flushSync(() => {
				decorators = nextDecorators;
			});
		});
	});
</script>

{#each decoratorKeys as nodeKey (nodeKey)}
	{@const { component: Component, props } = decorators[nodeKey]}
	{@const element = editor.getElementByKey(nodeKey)}

	{#if element !== null}
		<svelte:boundary onerror={(e) => editor._onError(e as Error)} failed={errorBoundary.failed}>
			<Portal to={element}>
				<Component {...props} />
			</Portal>
		</svelte:boundary>
	{/if}
{/each}
