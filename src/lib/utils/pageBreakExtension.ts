import { Node, mergeAttributes } from '@tiptap/core';

export const PageBreak = Node.create({
	name: 'pageBreak',

	group: 'block',

	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'div[data-type="page-break"]',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				'data-type': 'page-break',
				class: 'page-break',
			}),
		];
	},
});
