import { extractTipTapContent } from '@/lib/utils/tiptap';

describe('extractTipTapContent', () => {
	it('should preserve empty paragraphs by converting them to <p><br></p>', () => {
		const input = '<div class="tiptap ProseMirror"><p><br class="ProseMirror-trailingBreak"></p><p>Some content</p><p></p></div>';
		const expected = '<p><br></p><p>Some content</p><p><br></p>';
		
		const result = extractTipTapContent(input);
		expect(result).toBe(expected);
	});

	it('should handle mixed content with empty and non-empty paragraphs', () => {
		const input = '<div class="tiptap ProseMirror"><p>First paragraph</p><p><br class="ProseMirror-trailingBreak"></p><p>Third paragraph</p><p></p></div>';
		const expected = '<p>First paragraph</p><p><br></p><p>Third paragraph</p><p><br></p>';
		
		const result = extractTipTapContent(input);
		expect(result).toBe(expected);
	});

	it('should remove ProseMirror-trailingBreak elements but preserve paragraph structure', () => {
		const input = '<div class="tiptap ProseMirror"><p>Content with <br class="ProseMirror-trailingBreak">break</p></div>';
		const expected = '<p>Content with break</p>';
		
		const result = extractTipTapContent(input);
		expect(result).toBe(expected);
	});

	it('should handle content without ProseMirror wrapper', () => {
		const input = '<p>Regular content</p>';
		const expected = '<p>Regular content</p>';
		
		const result = extractTipTapContent(input);
		expect(result).toBe(expected);
	});

	it('should handle empty input', () => {
		const input = '';
		const expected = '';
		
		const result = extractTipTapContent(input);
		expect(result).toBe(expected);
	});

	it('should remove p tags inside li elements but preserve their content', () => {
		const input =
			'<div class="tiptap ProseMirror"><ul><li><p><strong>AI &amp; Machine Learning:</strong> ChatGPT, Claude, Context Engineering</p></li><li><p><strong>Back-End Development:</strong> .NET, APIs, C, C#</p></li></ul></div>';
		const expected =
			'<ul><li><strong>AI &amp; Machine Learning:</strong> ChatGPT, Claude, Context Engineering</li><li><strong>Back-End Development:</strong> .NET, APIs, C, C#</li></ul>';

		const result = extractTipTapContent(input);
		expect(result).toBe(expected);
	});

	it('should handle li elements with simple text content', () => {
		const input =
			'<div class="tiptap ProseMirror"><ul><li><p>JavaScript</p></li><li><p>React</p></li><li><p>TypeScript</p></li></ul></div>';
		const expected =
			'<ul><li>JavaScript</li><li>React</li><li>TypeScript</li></ul>';

		const result = extractTipTapContent(input);
		expect(result).toBe(expected);
	});

	it('should remove trailing p element that follows ul elements', () => {
		const input =
			'<div class="tiptap ProseMirror"><ul><li><p><strong>AI &amp; Machine Learning:</strong> ChatGPT, Claude</p></li><li><p><strong>Back-End Development:</strong> .NET, APIs</p></li></ul><p><br class="ProseMirror-trailingBreak"></p></div>';
		const expected =
			'<ul><li><strong>AI &amp; Machine Learning:</strong> ChatGPT, Claude</li><li><strong>Back-End Development:</strong> .NET, APIs</li></ul>';

		const result = extractTipTapContent(input);
		expect(result).toBe(expected);
	});

	it('should remove empty p element that follows ul elements', () => {
		const input =
			'<div class="tiptap ProseMirror"><ul><li><p>JavaScript</p></li><li><p>React</p></li></ul><p></p></div>';
		const expected = '<ul><li>JavaScript</li><li>React</li></ul>';

		const result = extractTipTapContent(input);
		expect(result).toBe(expected);
	});
});
