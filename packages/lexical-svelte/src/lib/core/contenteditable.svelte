<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { useCanShowPlaceholder } from './shared/use-can-show-placeholder.svelte.js';
	import { useLexicalComposerContext } from './composer-context.js';

	type HtmlDivAttributes = HTMLAttributes<HTMLDivElement>;

	export type ContentEditableProps = Omit<HtmlDivAttributes, 'placeholder'> & {
		ariaActiveDescendant?: HtmlDivAttributes['aria-activedescendant'];
		ariaAutoComplete?: HtmlDivAttributes['aria-autocomplete'];
		ariaControls?: HtmlDivAttributes['aria-controls'];
		ariaDescribedBy?: HtmlDivAttributes['aria-describedby'];
		ariaErrorMessage?: HtmlDivAttributes['aria-errormessage'];
		ariaExpanded?: HtmlDivAttributes['aria-expanded'];
		ariaInvalid?: HtmlDivAttributes['aria-invalid'];
		ariaLabel?: HtmlDivAttributes['aria-label'];
		ariaLabelledBy?: HtmlDivAttributes['aria-labelledby'];
		ariaMultiline?: HtmlDivAttributes['aria-multiline'];
		ariaOwns?: HtmlDivAttributes['aria-owns'];
		ariaRequired?: HtmlDivAttributes['aria-required'];
		autoCapitalize?: HtmlDivAttributes['autocapitalize'];
		'data-testid'?: string | null | undefined;
		ref?: HTMLDivElement;
	} & (
			| {
					'aria-placeholder'?: void;
					placeholder?: null;
			  }
			| {
					'aria-placeholder': string;
					placeholder: Snippet<[isEditable: boolean]>;
			  }
		);
</script>

<script lang="ts">
	let {
		ariaActiveDescendant,
		ariaAutoComplete,
		ariaControls,
		ariaDescribedBy,
		ariaErrorMessage,
		ariaExpanded,
		ariaInvalid,
		ariaLabel,
		ariaLabelledBy,
		ariaMultiline,
		ariaOwns,
		ariaRequired,
		autoCapitalize,
		class: className,
		id,
		role = 'textbox',
		spellcheck = true,
		style,
		tabindex,
		'data-testid': testid,
		ref = $bindable(),
		'aria-placeholder': ariaPlaceholder,
		placeholder,
		...rest
	}: ContentEditableProps = $props();

	const editor = useLexicalComposerContext()[0];
	const showPlaceholder = useCanShowPlaceholder(editor);

	let isEditable = $state.raw(editor.isEditable());

	$effect(() => {
		// defaultView is required for a root element.
		// In multi-window setups, the defaultView may not exist at certain points.
		if (ref && ref.ownerDocument && ref.ownerDocument.defaultView) {
			editor.setRootElement(ref);
		} else {
			editor.setRootElement(null);
		}

		isEditable = editor.isEditable();
		return editor.registerEditableListener((currentIsEditable) => {
			isEditable = currentIsEditable;
		});
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	aria-activedescendant={isEditable ? ariaActiveDescendant : undefined}
	aria-autocomplete={isEditable ? ariaAutoComplete : 'none'}
	aria-controls={isEditable ? ariaControls : undefined}
	aria-describedby={ariaDescribedBy}
	{...ariaErrorMessage != null ? { 'aria-errormessage': ariaErrorMessage } : {}}
	aria-expanded={isEditable && role === 'combobox' ? !!ariaExpanded : undefined}
	{...ariaInvalid != null ? { 'aria-invalid': ariaInvalid } : {}}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledBy}
	aria-multiline={ariaMultiline}
	aria-owns={isEditable ? ariaOwns : undefined}
	aria-readonly={isEditable ? undefined : true}
	aria-required={ariaRequired}
	autocapitalize={autoCapitalize}
	class={className}
	contentEditable={isEditable}
	data-testid={testid}
	{id}
	bind:this={ref}
	role={isEditable ? role : undefined}
	{spellcheck}
	{style}
	{tabindex}
	{...rest}
></div>

{#if showPlaceholder() && placeholder !== null}
	<div aria-hidden="true">
		{@render placeholder?.(isEditable)}
	</div>
{/if}
