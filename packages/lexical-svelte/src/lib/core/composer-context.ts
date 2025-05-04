import type { EditorThemeClasses, LexicalEditor } from 'lexical';
import { getContext, hasContext, setContext } from 'svelte';

export type LexicalComposerContextType = {
	getTheme: () => EditorThemeClasses | null | undefined;
};

export type LexicalComposerContextWithEditor = [LexicalEditor, LexicalComposerContextType];

export const ComposerContextKey = Symbol('composer-context');

export function setComposerContext(context: LexicalComposerContextWithEditor) {
	setContext(ComposerContextKey, context);
}

export function useLexicalComposerContext() {
	if (!hasContext(ComposerContextKey)) {
		throw new Error('ComposerContext.useLexicalComposerContext: cannot find a ComposerContext');
	}

	return getContext<LexicalComposerContextWithEditor>(ComposerContextKey);
}

export function createLexicalComposerContext(
	parent: LexicalComposerContextWithEditor | null | undefined,
	theme: () => EditorThemeClasses | null | undefined
): LexicalComposerContextType {
	let parentContext: LexicalComposerContextType | null = null;

	if (parent != null) {
		parentContext = parent[1];
	}

	function getTheme() {
		if (theme() != null) {
			return theme();
		}

		return parentContext != null ? parentContext.getTheme() : null;
	}

	return { getTheme };
}
