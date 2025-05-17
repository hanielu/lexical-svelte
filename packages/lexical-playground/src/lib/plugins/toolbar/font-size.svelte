<script lang="ts" module>
	import { MIN_ALLOWED_FONT_SIZE, MAX_ALLOWED_FONT_SIZE } from '$lib/context/toolbar-context.svelte';

	export function parseAllowedFontSize(input: string): string {
		const match = input.match(/^(\d+(?:\.\d+)?)px$/);
		if (match) {
			const n = Number(match[1]);
			if (n >= MIN_ALLOWED_FONT_SIZE && n <= MAX_ALLOWED_FONT_SIZE) {
				return input;
			}
		}
		return '';
	}
</script>

<script lang="ts">
</script>
