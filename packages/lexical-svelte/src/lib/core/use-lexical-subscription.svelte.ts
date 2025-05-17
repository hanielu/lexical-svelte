import type { LexicalEditor } from 'lexical';
import { useLexicalComposerContext } from './composer-context.js';

export type LexicalSubscription<T> = {
	initialValueFn: () => T;
	subscribe: (callback: (value: T) => void) => () => void;
};

/**
 * Shortcut to Lexical subscriptions when values are used for render.
 * @param subscription - The function to create the {@link LexicalSubscription}. This function's identity must be stable (e.g. defined at module scope or with useCallback).
 */
export function useLexicalSubscription<T>(subscription: (editor: LexicalEditor) => LexicalSubscription<T>): () => T {
	const [editor] = useLexicalComposerContext();
	const initializedSubscription = $derived(subscription(editor));
	let value = $state.raw<T>(initializedSubscription.initialValueFn());
	let valueRef = value;
	$effect(() => {
		const { initialValueFn, subscribe } = initializedSubscription;
		const currentValue = initialValueFn();
		if (valueRef !== currentValue) {
			valueRef = currentValue;
			value = currentValue;
		}

		return subscribe((newValue: T) => {
			valueRef = newValue;
			value = newValue;
		});
	});

	return () => value;
}
