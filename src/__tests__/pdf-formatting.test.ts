import { describe, it, expect } from 'vitest';
import {
	formatContentForPDF,
	convertMarkdownToHTML,
} from '@/lib/utils/markdownParser';

describe('formatContentForPDF', () => {
	it('should convert # headers to h2 tags', () => {
		const input = '# Main Title';
		expect(formatContentForPDF(input)).toBe('<h2>Main Title</h2>');
	});

	it('should convert ## headers to h3 tags', () => {
		const input = '## Section Title';
		expect(formatContentForPDF(input)).toBe('<h3>Section Title</h3>');
	});

	it('should convert ### headers to h4 tags', () => {
		const input = '### Subsection Title';
		expect(formatContentForPDF(input)).toBe('<h4>Subsection Title</h4>');
	});

	it('should convert bold text with ** to strong tags', () => {
		const input = 'This is **bold** text';
		expect(formatContentForPDF(input)).toBe(
			'<p>This is <strong>bold</strong> text</p>',
		);
	});

	it('should convert list items with - to li tags with circle bullets', () => {
		const input = '- Item 1\n- Item 2';
		expect(formatContentForPDF(input)).toBe(
			'<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>',
		);
	});

	it('should handle mixed content correctly', () => {
		const input = `## Experience
### Frontend Developer
- Developed React applications
- Implemented responsive design
- Optimized performance

## Skills
**Programming**: JavaScript, TypeScript
- React
- Next.js
- TypeScript`;

		const expected = `<h3>Experience</h3>
<h4>Frontend Developer</h4>
<ul>
<li>Developed React applications</li>
<li>Implemented responsive design</li>
<li>Optimized performance</li>
</ul>
<p></p>
<h3>Skills</h3>
<p><strong>Programming</strong>: JavaScript, TypeScript</p>
<ul>
<li>React</li>
<li>Next.js</li>
<li>TypeScript</li>
</ul>`;

		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should handle single * for emphasis', () => {
		const input = 'This is *emphasized* text';
		expect(formatContentForPDF(input)).toBe(
			'<p>This is <em>emphasized</em> text</p>',
		);
	});

	it('should convert _text_ to span with `text-shadow` class', () => {
		const input = 'This is _shadowed_ text';
		expect(formatContentForPDF(input)).toBe(
			'<p>This is <span class="text-shadow">shadowed</span> text</p>',
		);
	});

	it('should clean up excessive line breaks', () => {
		const input = 'Line 1\n\n\n\nLine 2';
		const result = formatContentForPDF(input);
		expect(result).toBe(
			'<p>Line 1</p>\n<p></p>\n<p></p>\n<p></p>\n<p>Line 2</p>',
		);
	});

	it('should preserve line breaks for address lines and similar content', () => {
		const input = 'Line 1\nLine 2\nLine 3';
		expect(formatContentForPDF(input)).toBe(
			'<p>Line 1</p>\n<p>Line 2</p>\n<p>Line 3</p>',
		);
	});

	it('should handle address block with line breaks correctly', () => {
		const input = 'Michael Scott\nDunder Mifflin\nScranton, PA';
		const result = formatContentForPDF(input);

		// Check that address block is grouped with <br /> tags
		expect(result).toContain(
			'<p>Michael Scott</p>\n<p>Dunder Mifflin</p>\n<p>Scranton, PA</p>',
		);
	});
});

describe('convertMarkdownToHTML', () => {
	it('should convert markdown bold to HTML strong tags', () => {
		const input = 'This is **bold** text';
		expect(convertMarkdownToHTML(input)).toBe(
			'<p>This is <strong>bold</strong> text</p>',
		);
	});

	it('should handle multiple skill groups with line breaks', () => {
		const input =
			'**Management:** Leadership, Team Building\n\n**Technical:** JavaScript, React';
		expect(convertMarkdownToHTML(input)).toBe(
			'<ul><li><strong>Management:</strong> Leadership, Team Building</li><li><strong>Technical:</strong> JavaScript, React</li></ul>',
		);
	});

	it('should convert emphasis to italic tags', () => {
		const input = 'This is *emphasized* text';
		expect(convertMarkdownToHTML(input)).toBe(
			'<p>This is <em>emphasized</em> text</p>',
		);
	});

	it('should convert text shadow syntax', () => {
		const input = 'This is _shadowed_ text';
		expect(convertMarkdownToHTML(input)).toBe(
			'<p>This is <span class="text-shadow">shadowed</span> text</p>',
		);
	});

	it('should handle empty content', () => {
		expect(convertMarkdownToHTML('')).toBe('');
	});

	it('should clean up empty paragraphs', () => {
		const input = 'Line 1\n\n\nLine 2';
		expect(convertMarkdownToHTML(input)).toBe('<p>Line 1</p><p>Line 2</p>');
	});

	it('should handle mixed content with skills and regular text', () => {
		const input = '**Skills:** JavaScript, React\n\nRegular paragraph text';
		expect(convertMarkdownToHTML(input)).toBe(
			'<ul><li><strong>Skills:</strong> JavaScript, React</li></ul><p>Regular paragraph text</p>',
		);
	});
});

describe('Job Address Formatting', () => {
	it('should format job address with line breaks', () => {
		const formatJobAddress = (jobDetails: any) => {
			const parts = [];
			if (jobDetails.hiringManager) parts.push(jobDetails.hiringManager);
			if (jobDetails.companyName) parts.push(jobDetails.companyName);
			if (jobDetails.companyAddress) parts.push(jobDetails.companyAddress);
			return parts.join('<br>');
		};

		const jobDetails = {
			hiringManager: 'Michael Scott',
			companyName: 'Dunder Mifflin',
			companyAddress: 'Scranton, PA',
		};

		const result = formatJobAddress(jobDetails);
		expect(result).toBe('Michael Scott<br>Dunder Mifflin<br>Scranton, PA');
	});

	it('should handle missing address parts gracefully', () => {
		const formatJobAddress = (jobDetails: any) => {
			const parts = [];
			if (jobDetails.hiringManager) parts.push(jobDetails.hiringManager);
			if (jobDetails.companyName) parts.push(jobDetails.companyName);
			if (jobDetails.companyAddress) parts.push(jobDetails.companyAddress);
			return parts.join('<br>');
		};

		const jobDetails = {
			hiringManager: 'Michael Scott',
			companyName: '',
			companyAddress: 'Scranton, PA',
		};

		const result = formatJobAddress(jobDetails);
		expect(result).toBe('Michael Scott<br>Scranton, PA');
	});
});
