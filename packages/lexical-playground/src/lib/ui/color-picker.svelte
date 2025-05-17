<script lang="ts" module>
	export function parseAllowedColor(input: string) {
		return /^rgb\(\d+, \d+, \d+\)$/.test(input) ? input : '';
	}
</script>

<script lang="ts">
</script>

<style></style>
