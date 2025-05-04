import type { Decorator } from 'lexical-svelte';
import {
	type LexicalEditor,
	type SerializedEditor,
	type Spread,
	type SerializedLexicalNode,
	DecoratorNode,
	type NodeKey,
	createEditor,
	$createParagraphNode,
	$createTextNode,
	type LexicalNode
} from 'lexical';

import CommentComponent from './comment-component.svelte';
import { initEditorContent$ } from '$lib/utils/state';
export type Comment = LexicalEditor;
export type SerializedComment = SerializedEditor;

export type SerializedCommentNode = Spread<{ comment: SerializedComment }, SerializedLexicalNode>;

export const CommentNodeType = 'comment';

/**
 * Decorator Node
 */

export class CommentNode extends DecoratorNode<Decorator<typeof CommentComponent>> {
	__comment: LexicalEditor;

	constructor(comment?: Comment, key?: NodeKey) {
		super(key);
		this.__comment = comment ?? createEditor();
	}

	static getType(): string {
		return CommentNodeType;
	}

	getComment(): Comment {
		const self = this.getLatest();
		return self.__comment;
	}

	setComment(comment: Comment) {
		const self = this.getWritable();
		self.__comment = comment;
	}

	static clone(node: CommentNode): CommentNode {
		return new CommentNode(node.__comment, node.__key);
	}

	createDOM(): HTMLElement {
		return document.createElement('div');
	}

	updateDOM(): false {
		return false;
	}

	static importJSON(serializedNode: SerializedCommentNode): CommentNode {
		const { comment: serializedComment } = serializedNode;

		const nestedCommentEditor = createEditor();
		const editorState = nestedCommentEditor.parseEditorState(serializedComment.editorState);

		if (!editorState.isEmpty()) {
			nestedCommentEditor.setEditorState(editorState);
		}

		return new CommentNode(nestedCommentEditor);
	}

	exportJSON(): SerializedCommentNode {
		return {
			comment: this.__comment.toJSON(),
			type: CommentNodeType,
			version: 1
		};
	}

	decorate(): Decorator<typeof CommentComponent> {
		return { component: CommentComponent, props: { comment: this.__comment } };
	}
}

export const createCommentNode$ = (comment?: string): CommentNode => {
	const editor = createEditor();

	if (comment) {
		editor.update(
			() => {
				initEditorContent$({
					nodes: [$createParagraphNode().append($createTextNode(comment))]
				});
			},
			{ discrete: true }
		);
	}

	return new CommentNode(editor);
};

export const isCommentNode$ = (node: LexicalNode): node is CommentNode => {
	return node.__type === CommentNode.getType();
};
