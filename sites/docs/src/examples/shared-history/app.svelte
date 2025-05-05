<script lang="ts">
	import AppContainer from '$lib/ui/app-container.svelte';
	import Editor from './editor.svelte';

	const AppConfig = {
		slug: 'shared-history',
		name: 'Shared History',
		Description
	};
</script>

<AppContainer {...AppConfig}>
	<Editor />
</AppContainer>

{#snippet Description()}
	<div class="contents prose">
		<ol class="text-sm">
			<li>Type something in the comment editor.</li>
			<li>Type something in the parent editor above.</li>
			<li>Hit ⌘Z to revert changes in parent and comment.</li>
		</ol>
	</div>
{/snippet}
