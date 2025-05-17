<script lang="ts">
	import type { EditorState, EditorSetOptions } from 'lexical';
	import type { LexicalCommandLog } from './use-lexical-commands-log.svelte.js'; // Assuming this type definition is correct

	const LARGE_EDITOR_STATE_SIZE = 1000;

	// --- Props ---
	interface Props {
		editorState: EditorState;
		treeTypeButtonClassName?: string;
		timeTravelButtonClassName?: string;
		timeTravelPanelButtonClassName?: string;
		timeTravelPanelClassName?: string;
		timeTravelPanelSliderClassName?: string;
		viewClassName?: string;
		generateContent: (exportDOM: boolean) => Promise<string>;
		setEditorState: (state: EditorState, options?: EditorSetOptions) => void;
		setEditorReadOnly: (isReadonly: boolean) => void;
		commandsLog?: LexicalCommandLog;
		ref?: HTMLPreElement;
	}

	let {
		editorState,
		treeTypeButtonClassName = '',
		timeTravelButtonClassName = '',
		timeTravelPanelButtonClassName = '',
		timeTravelPanelClassName = '',
		timeTravelPanelSliderClassName = '',
		viewClassName = '',
		generateContent,
		setEditorState,
		setEditorReadOnly,
		commandsLog = [],
		ref = $bindable()
	}: Props = $props();

	// --- State ---
	let timeStampedEditorStates = $state.raw<Array<[number, EditorState]>>([]);
	let content = $state('');
	let timeTravelEnabled = $state(false);
	let showExportDOM = $state(false);
	let isPlaying = $state(false);
	let isLimited = $state(false);
	let showLimited = $state(false);

	// --- Refs / Internal Vars ---
	let playingIndexRef = 0; // Not $state as it's mutated directly within effects/handlers
	let lastEditorStateRef: EditorState | null = null;
	let lastCommandsLogRef: LexicalCommandLog = [];
	let lastGenerationID = 0;
	let inputElement: HTMLInputElement | null = null;

	// --- Derived State ---
	const totalEditorStates = $derived(timeStampedEditorStates.length);

	// --- Logic ---

	async function generateTree(exportDOM: boolean) {
		const myID = ++lastGenerationID;
		try {
			const treeText = await generateContent(exportDOM);
			if (myID === lastGenerationID) {
				content = treeText;
			}
		} catch (err: any) {
			if (myID === lastGenerationID) {
				content = `Error rendering tree: ${err.message}\n\nStack:\n${err.stack}`;
			}
		}
	}

	// Update view effect
	$effect(() => {
		// Use editorState and commandsLog as dependencies
		editorState;
		commandsLog;
		showExportDOM;
		showLimited;
		timeTravelEnabled;

		if (!showLimited && editorState._nodeMap.size > LARGE_EDITOR_STATE_SIZE) {
			isLimited = true;
			if (!showLimited) {
				return; // Don't generate tree if limited and not shown
			}
		} else {
			isLimited = false; // Reset if size goes down or showLimited becomes true
		}

		const isEditorStateChange = lastEditorStateRef !== editorState;
		const isCommandsLogChange = lastCommandsLogRef !== commandsLog;
		const shouldUpdate = isEditorStateChange || isCommandsLogChange;

		if (shouldUpdate) {
			lastEditorStateRef = editorState;
			lastCommandsLogRef = commandsLog;
			generateTree(showExportDOM);

			// Only record in time travel if there was an actual editor state change
			if (!timeTravelEnabled && isEditorStateChange) {
				timeStampedEditorStates = [...timeStampedEditorStates, [Date.now(), editorState]];
			}
		}
	});

	// Time travel playing effect
	$effect(() => {
		if (!isPlaying) return;

		let timeoutId: ReturnType<typeof setTimeout>;

		const play = () => {
			const currentIndex = playingIndexRef;

			if (currentIndex >= totalEditorStates - 1) {
				isPlaying = false;
				return;
			}

			const currentTime = timeStampedEditorStates[currentIndex][0];
			const nextTime = timeStampedEditorStates[currentIndex + 1][0];
			const timeDiff = nextTime - currentTime;

			timeoutId = setTimeout(() => {
				playingIndexRef++;
				const index = playingIndexRef;
				const stateToSet = timeStampedEditorStates[index]?.[1];

				if (inputElement) {
					inputElement.value = String(index);
				}

				if (stateToSet) {
					setEditorState(stateToSet);
				}
				play();
			}, timeDiff);
		};

		play();

		return () => {
			clearTimeout(timeoutId);
		};
	});

	// --- Handlers ---

	function handleExportModeToggleClick() {
		const newShowExportDOM = !showExportDOM;
		generateTree(newShowExportDOM);
		showExportDOM = newShowExportDOM;
	}

	function handleShowLimitedClick() {
		showLimited = true;
		// Trigger regeneration now that showLimited is true
		generateTree(showExportDOM);
	}

	function handleTimeTravelClick() {
		setEditorReadOnly(true);
		playingIndexRef = totalEditorStates > 0 ? totalEditorStates - 1 : 0;
		if (inputElement && totalEditorStates > 0) {
			inputElement.value = String(playingIndexRef);
		}
		timeTravelEnabled = true;
	}

	function handlePlayPauseClick() {
		if (playingIndexRef >= totalEditorStates - 1 && totalEditorStates > 1) {
			// If at the end, reset to beginning before playing
			playingIndexRef = 0;
			if (inputElement) {
				inputElement.value = String(playingIndexRef);
			}
			const stateToSet = timeStampedEditorStates[0]?.[1];
			if (stateToSet) {
				setEditorState(stateToSet);
			}
		}
		isPlaying = !isPlaying;
	}

	function handleRangeChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const editorStateIndex = Number(target.value);
		const timeStampedEditorState = timeStampedEditorStates[editorStateIndex];

		if (timeStampedEditorState) {
			playingIndexRef = editorStateIndex;
			setEditorState(timeStampedEditorState[1]);
		}
	}

	function handleExitClick() {
		setEditorReadOnly(false);
		const index = totalEditorStates > 0 ? totalEditorStates - 1 : 0;
		const timeStampedEditorState = timeStampedEditorStates[index];
		if (timeStampedEditorState) {
			setEditorState(timeStampedEditorState[1]);
		}

		if (inputElement) {
			inputElement.value = String(index);
		}

		timeTravelEnabled = false;
		isPlaying = false;
		// Ensure last state is rendered if exited
		generateTree(showExportDOM);
	}
</script>

<div class={viewClassName}>
	{#if !showLimited && isLimited}
		<div style="padding: 20px">
			<span style="margin-right: 20px"> Detected large EditorState, this can impact debugging performance. </span>
			<button
				onclick={handleShowLimitedClick}
				style="background: transparent; border: 1px solid black; color: black; cursor: pointer; padding: 5px;"
				type="button"
			>
				Show full tree
			</button>
		</div>
	{:else if showLimited || !isLimited}
		<!-- Controls visible when not limited, or when explicitly shown -->
		<button onclick={handleExportModeToggleClick} class={treeTypeButtonClassName} type="button">
			{showExportDOM ? 'Tree' : 'Export DOM'}
		</button>

		{#if !timeTravelEnabled && totalEditorStates > 2}
			<button onclick={handleTimeTravelClick} class={timeTravelButtonClassName} type="button">Time Travel</button>
		{/if}

		<!-- Tree Content -->
		<pre bind:this={ref}>{content}</pre>

		<!-- Time Travel Panel -->
		{#if timeTravelEnabled}
			<div class={timeTravelPanelClassName}>
				<button class={timeTravelPanelButtonClassName} onclick={handlePlayPauseClick} type="button">
					{isPlaying ? 'Pause' : 'Play'}
				</button>
				<input
					class={timeTravelPanelSliderClassName}
					bind:this={inputElement}
					oninput={handleRangeChange}
					type="range"
					min={0}
					max={totalEditorStates > 0 ? totalEditorStates - 1 : 0}
					value={playingIndexRef}
				/>
				<button class={timeTravelPanelButtonClassName} onclick={handleExitClick} type="button">Exit</button>
			</div>
		{/if}
	{/if}
</div>
