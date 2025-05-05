<script lang="ts">
	import Github from '~icons/lucide/github';

	let { slug }: { slug: string } = $props();

	const GITHUB_EXAMPLES_DIR = 'https://github.com/konstantinmuenster/lexical-examples/tree/main/examples/';
</script>

<div class="flex justify-end gap-2">
	<a
		href={`${GITHUB_EXAMPLES_DIR}${slug}`}
		target="_blank"
		rel="noopener noreferrer"
		class="inline-flex items-center gap-1 text-right text-xs font-medium text-gray-500 hover:text-gray-800"
	>
		<Github class="text-sm" /> View code
	</a>
</div>
