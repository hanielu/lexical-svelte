<script lang="ts">
	import AppContainer from '$lib/ui/app-container.svelte';
	import Editor from './editor.svelte';

	const AppConfig = {
		slug: 'nested-editor',
		name: 'Nested editor'
	};
</script>

<AppContainer {...AppConfig}>
	<Editor />
</AppContainer>
