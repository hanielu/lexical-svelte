import { DEFAULT_SETTINGS, INITIAL_SETTINGS, type SettingName, type Settings } from '$lib/app-settings';
import { getContext, hasContext, setContext } from 'svelte';

type ContextShape = {
	settings: () => Settings;
	setOption: (setting: SettingName, value: boolean) => void;
};

const SettingsContextKey = Symbol('SettingsContext');

const settings = $state(INITIAL_SETTINGS);

export function setSettingsContext() {
	const setOption = (setting: SettingName, value: boolean) => {
		settings[setting] = value;
		setURLParam(setting, value);
	};

	setContext(SettingsContextKey, {
		settings: () => settings,
		setOption
	});
}

export function useSettings() {
	if (!hasContext(SettingsContextKey)) {
		throw new Error('useSettings must be used within a SettingsProvider');
	}
	return getContext<ContextShape>(SettingsContextKey);
}

function setURLParam(param: SettingName, value: null | boolean) {
	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);
	if (value !== DEFAULT_SETTINGS[param]) {
		params.set(param, String(value));
	} else {
		params.delete(param);
	}
	url.search = params.toString();
	window.history.pushState(null, '', url.toString());
}
