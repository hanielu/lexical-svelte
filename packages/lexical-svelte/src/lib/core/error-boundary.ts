import { createRawSnippet } from 'svelte';

export const ErrorBoundary = {
	failed: createRawSnippet<[error: unknown, reset: () => void]>((error, reset) => {
		return {
			render: () =>
				`<div style="border: 1px solid #f00; color: #f00; padding: 8px;">An error was thrown. ${error()} <button>Reset</button></div>`,
			setup(node) {
				const btn = node.querySelector('button')!;
				const handler = reset();
				btn.addEventListener('click', handler);
				return () => btn.removeEventListener('click', handler);
			}
		};
	})
};
