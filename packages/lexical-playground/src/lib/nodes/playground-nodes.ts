import type { Klass, LexicalNode } from 'lexical';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { MarkNode } from '@lexical/mark';
import { OverflowNode } from '@lexical/overflow';
import { HorizontalRuleNode } from '@hvniel/lexical-svelte';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';

import { CollapsibleContainerNode } from '../plugins/collapsible-plugin/collapsible-container-node';
import { CollapsibleContentNode } from '../plugins/collapsible-plugin/collapsible-content-node';
import { CollapsibleTitleNode } from '../plugins/collapsible-plugin/collapsible-title-node';
import { AutocompleteNode } from './autocomplete-node';
import { EmojiNode } from './emoji-node';
import { EquationNode } from './equation-node';
import { ExcalidrawNode } from './excalidraw-node';
import { FigmaNode } from './figma-node';
import { ImageNode } from './image-node';
import { InlineImageNode } from './inline-image-node/inline-image-node';
import { KeywordNode } from './keyword-node';
import { LayoutContainerNode } from './layout-container-node';
import { LayoutItemNode } from './layout-item-node';
import { MentionNode } from './mention-node';
import { PageBreakNode } from './page-break-node';
import { PollNode } from './poll-node';
import { SpecialTextNode } from './special-text-node';
import { StickyNode } from './sticky-node';
import { TweetNode } from './tweet-node';
import { YouTubeNode } from './youtube-node';

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
	HeadingNode,
	ListNode,
	ListItemNode,
	QuoteNode,
	CodeNode,
	TableNode,
	TableCellNode,
	TableRowNode,
	HashtagNode,
	CodeHighlightNode,
	AutoLinkNode,
	LinkNode,
	OverflowNode,
	PollNode,
	StickyNode,
	ImageNode,
	InlineImageNode,
	MentionNode,
	EmojiNode,
	ExcalidrawNode,
	EquationNode,
	AutocompleteNode,
	KeywordNode,
	HorizontalRuleNode,
	TweetNode,
	YouTubeNode,
	FigmaNode,
	MarkNode,
	CollapsibleContainerNode,
	CollapsibleContentNode,
	CollapsibleTitleNode,
	PageBreakNode,
	LayoutContainerNode,
	LayoutItemNode,
	SpecialTextNode
];

export default PlaygroundNodes;
