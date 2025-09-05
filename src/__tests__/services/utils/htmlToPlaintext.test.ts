import { describe, it, expect } from 'vitest';
import { htmlToPlaintext, cleanPlaintext } from '@/lib/utils/htmlToPlaintext';

describe('htmlToPlaintext', () => {
	it('should convert basic HTML to plaintext', () => {
		const html =
			'<h1>Title</h1><p>This is a paragraph with <strong>bold</strong> text.</p>';
		const result = cleanPlaintext(htmlToPlaintext(html));
		expect(result).toBe('Title\n\nThis is a paragraph with bold text.');
	});

	it('should handle lists correctly', () => {
		const html = '<ul><li>Item 1</li><li>Item 2</li></ul>';
		const result = cleanPlaintext(htmlToPlaintext(html));
		expect(result).toBe('• Item 1\n• Item 2');
	});

	it('should remove images', () => {
		const html =
			'<p>Text before <img src="test.jpg" alt="test"> text after</p>';
		const result = cleanPlaintext(htmlToPlaintext(html));
		expect(result).toBe('Text before  text after');
	});

	it('should handle links', () => {
		const html =
			'<p>Visit <a href="https://example.com">our website</a> for more info.</p>';
		const result = cleanPlaintext(htmlToPlaintext(html));
		expect(result).toBe(
			'Visit our website (https://example.com) for more info.',
		);
	});

	it('should return empty string for empty input', () => {
		const result = htmlToPlaintext('');
		expect(result).toBe('');
	});

	it('should handle nested elements', () => {
		const html =
			'<div><h2>Section</h2><p>Content with <em>emphasis</em> and <u>underline</u>.</p></div>';
		const result = cleanPlaintext(htmlToPlaintext(html));
		expect(result).toBe('Section\n\nContent with emphasis and underline.');
	});
});

describe('cleanPlaintext', () => {
	it('should remove excessive newlines', () => {
		const text = 'Line 1\n\n\n\nLine 2';
		const result = cleanPlaintext(text);
		expect(result).toBe('Line 1\n\nLine 2');
	});

	it('should remove trailing whitespace', () => {
		const text = 'Line 1   \nLine 2\t  ';
		const result = cleanPlaintext(text);
		expect(result).toBe('Line 1\nLine 2');
	});

	it('should trim leading and trailing whitespace', () => {
		const text = '  \n  Content  \n  ';
		const result = cleanPlaintext(text);
		expect(result).toBe('Content');
	});
});
