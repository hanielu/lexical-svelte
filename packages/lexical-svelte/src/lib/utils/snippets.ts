/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, Snippet } from 'svelte';

export function isComponent(value: Component | Snippet): value is Component {
	const check = value.length === 2;
	return check;
}

export function isSnippet(value: Component | Snippet): value is Snippet {
	const check = value.length === 1;
	return check;
}

export type SnippetArgs<T> = T extends Snippet<infer U> ? U : never;

// Extract all parameters of a Snippet
type SnippetParams<T> = T extends Snippet<infer P> ? P : never;

// Helper type to create tuple of parameters
type PreserveArrayTypes<T extends any[]> = {
	[K in keyof T]: T[K];
};

// Helper type to make it single parameter or tuple of parameters based on length
type ParamsType<T extends any[]> = T extends [any]
	? T[0] // Single parameter case
	: PreserveArrayTypes<T>; // Multiple parameters case

/**
 * Binds a snippet to a set of parameters
 *
 * @example
 *
 * // Original snippet with multiple parameters
 * {#snippet MainSnip(param1: string, param2: string)}
 *   <div>{param1} {param2}</div>
 * {/snippet}
 *
 * // Convert to single param snippet with fixed second param
 * const SnippetWithParam = useSnippet(MainSnip, "Bruzz")
 * // or with multiple fixed params
 * const SnippetWithParam2 = useSnippet(MainSnip, ["Bruzz", "Hello"])
 *
 * // Can now use with just one parameter
 * banner({title: "Hello"}, SnippetWithParam)
 * banner({title: "Hello"}, SnippetWithParam2)
 *
 * @param snippet - The original multi-parameter snippet to convert
 * @param params - Fixed values for additional parameters
 * @returns A snippet that can be called with a `@render` tag
 */
export function useSnippet<T extends Snippet<any[]>>(snippet: T, params: ParamsType<SnippetParams<T>>) {
	const paramsArr = Array.isArray(params) ? params : [params];
	// @ts-expect-error Snippet typing is cooked
	return ((anchor: any) => snippet(anchor, ...paramsArr.map((param) => () => param))) as Snippet;
}
