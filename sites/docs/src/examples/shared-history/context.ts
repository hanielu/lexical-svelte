import { getContext, setContext } from 'svelte';
import { createEmptyHistoryState } from '@lexical/history';
const HistoryStateKey = Symbol('shared-history');

const historyState = createEmptyHistoryState();

export const setHistoryStateContext = () => setContext(HistoryStateKey, historyState);
export const getHistoryStateContext = () => getContext<typeof historyState>(HistoryStateKey);
