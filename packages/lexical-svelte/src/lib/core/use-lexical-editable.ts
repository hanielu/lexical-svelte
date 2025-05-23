import type { LexicalSubscription } from './use-lexical-subscription.svelte.js';
import type { LexicalEditor } from 'lexical';

import { useLexicalSubscription } from './use-lexical-subscription.svelte.js';

function subscription(editor: LexicalEditor): LexicalSubscription<boolean> {
	return {
		initialValueFn: () => editor.isEditable(),
		subscribe: (callback) => {
			return editor.registerEditableListener(callback);
		}
	};
}

/**
 * Get the current value for {@link LexicalEditor.isEditable}
 * using {@link useLexicalSubscription}.
 * You should prefer this over manually observing the value with
 * {@link LexicalEditor.registerEditableListener},
 * which is a bit tricky to do correctly, particularly when using
 * React StrictMode (the default for development) or concurrency.
 */
export function useLexicalEditable(): () => boolean {
	return useLexicalSubscription(subscription);
}
