<script lang="ts">
	import AppContainer from '$lib/ui/app-container.svelte';
	import Editor from './editor.svelte';

	const AppConfig = {
		slug: 'shared-update',
		name: 'Shared Update',
		Description
	};
</script>

<AppContainer {...AppConfig}>
	<Editor />
</AppContainer>

{#snippet Description()}
	<div>
		<p class="mb-4">
			Usually, content updates from a nested editor do not trigger an update in the parent editor. This example adds an
			AutoSaveContext that propagates updates to a shared update handler.
		</p>
		<p>Take a look at the logs when you edit content in both editors.</p>
	</div>
{/snippet}
