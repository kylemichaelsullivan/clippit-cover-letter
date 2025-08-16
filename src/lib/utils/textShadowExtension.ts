import { Mark, mergeAttributes } from '@tiptap/core';

export const TextShadow = Mark.create({
	name: 'textShadow',

	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'span',
				class: 'text-shadow',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'span',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				class: 'text-shadow',
			}),
			0,
		];
	},
});
