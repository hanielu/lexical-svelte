import { defineConfig, presetTypography, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import shadcnPreset from './presets/shadcn-preset';
import customPreset from './presets/custom-preset';

export default defineConfig({
	content: {
		filesystem: [
			'./node_modules/bits-ui/dist/**/*.{html,js,svelte,ts}',
			'./node_modules/@tauri-controls/svelte/**/*.{js,svelte,ts}'
		],
		pipeline: {
			include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|ts)($|\?)/]
		}
	},
	shortcuts: {
		'styled-comment':
			"relative rounded-xl bg-yellow-200/80 px-1 py-3 after:absolute after:right-3 after:top-0 after:rounded-bl-md after:rounded-br-md after:bg-yellow-900/10 after:px-2 after:py-1 after:text-xs after:font-medium after:text-yellow-950/50 after:content-['Comment']"
	},
	configDeps: ['./presets/custom-preset.ts', './presets/shadcn-preset.ts'],
	presets: [shadcnPreset, customPreset, presetWind3(), presetTypography()],
	transformers: [transformerDirectives(), transformerVariantGroup()]
});
