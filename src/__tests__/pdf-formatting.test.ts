import { formatContentForPDF } from '@/lib/utils';

describe('formatContentForPDF', () => {
	it('should convert ## headers to h2 tags', () => {
		const input = '## Experience\nSome content';
		const expected = '<h2>Experience</h2><br>Some content';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should convert ### headers to h3 tags', () => {
		const input = '### Skills\nSome content';
		const expected = '<h3>Skills</h3><br>Some content';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should convert bold text with ** to strong tags', () => {
		const input = '**Group Name**: Some skills';
		const expected = '<strong>Group Name</strong>: Some skills';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should convert list items with - to li tags with circle bullets', () => {
		const input = '- Item 1\n- Item 2\n- Item 3';
		const expected =
			'<ul><li>Item 1</li><br><li>Item 2</li><br><li>Item 3</li></ul>';
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

		const expected = `<h2>Experience</h2><br><h3>Frontend Developer</h3><br><strong>Company</strong>: Tech Corp<br><ul><li>Developed React applications</li><br><li>Implemented responsive design</li><br><li>Optimized performance</li></ul><br><h2>Skills</h2><br><strong>Programming</strong>: JavaScript, TypeScript<br><ul><li>React</li><br><li>Next.js</li><br><li>Tailwind CSS</li></ul>`;

		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should handle single * for emphasis', () => {
		const input = 'This is *emphasized* text';
		const expected = 'This is <em>emphasized</em> text';
		expect(formatContentForPDF(input)).toBe(expected);
	});

	it('should clean up excessive line breaks', () => {
		const input = 'Line 1\n\n\nLine 2';
		const expected = 'Line 1<br><br>Line 2';
		expect(formatContentForPDF(input)).toBe(expected);
	});
});
