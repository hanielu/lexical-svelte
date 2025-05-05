<script lang="ts">
	import type { Snippet } from 'svelte';

	type CommentProps = {
		children: Snippet;
	};

	let { children }: CommentProps = $props();
</script>

<div
	class="relative rounded-xl bg-yellow-200/80 px-1 py-3 after:(absolute right-3 top-0 rounded-bl-md rounded-br-md bg-yellow-900/10 px-2 py-1 text-xs font-medium text-yellow-950/50 content-['Comment'])"
>
	{@render children()}
</div>
