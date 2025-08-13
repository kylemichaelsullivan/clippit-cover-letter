import { describe, it, expect } from 'vitest';
import { formatContentForPDF } from '@/lib/utils';

describe('formatContentForPDF', () => {
	it('should convert # headers to h2 tags', () => {
		const input = '# Experience\nSome content';
		const expected = '<h2>Experience</h2>\n<p>Some content</p>';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should convert ## headers to h3 tags', () => {
		const input = '## Experience\nSome content';
		const expected = '<h3>Experience</h3>\n<p>Some content</p>';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should convert ### headers to h4 tags', () => {
		const input = '### Skills\nSome content';
		const expected = '<h4>Skills</h4>\n<p>Some content</p>';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should convert bold text with ** to strong tags', () => {
		const input = '**Group Name**: Some skills';
		const expected = '<p><strong>Group Name</strong>: Some skills</p>';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should convert list items with - to li tags with circle bullets', () => {
		const input = '- Item 1\n- Item 2\n- Item 3';
		const expected =
			'<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ul>';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should handle mixed content correctly', () => {
		const input = `## Experience
### Frontend Developer
**Company**: Tech Corp
- Developed React applications
- Implemented responsive design
- Optimized performance

## Skills
**Programming**: JavaScript, TypeScript
- React
- Next.js
- Tailwind CSS`;

		const expected = `<h3>Experience</h3>
<h4>Frontend Developer</h4>
<p><strong>Company</strong>: Tech Corp</p>
<ul>
<li>Developed React applications</li>
<li>Implemented responsive design</li>
<li>Optimized performance</li>
</ul>
<h3>Skills</h3>
<p><strong>Programming</strong>: JavaScript, TypeScript</p>
<ul>
<li>React</li>
<li>Next.js</li>
<li>Tailwind CSS</li>
</ul>`;

		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should handle single * for emphasis', () => {
		const input = 'This is *emphasized* text';
		const expected = '<p>This is <em>emphasized</em> text</p>';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should convert _text_ to span with `text-shadow` class', () => {
		const input = 'This is _highlighted_ text';
		const expected =
			'<p>This is <span class="text-shadow">highlighted</span> text</p>';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should clean up excessive line breaks', () => {
		const input = 'Line 1\n\n\nLine 2';
		const expected = '<p>Line 1</p>\n<p>Line 2</p>';
		expect(formatContentForPDF(input)).toBe(expected);
	});
});
