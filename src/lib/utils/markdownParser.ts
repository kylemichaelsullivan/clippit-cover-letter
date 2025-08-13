/**
 * Converts markdown to HTML for PDF generation
 */
export const formatContentForPDF = (content: string): string => {
	let formatted = content
		.replace(/^#\s+(.+)$/gm, '<h2>$1</h2>')
		.replace(/^##\s+(.+)$/gm, '<h3>$1</h3>')
		.replace(/^###\s+(.+)$/gm, '<h4>$1</h4>')
		.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(/^-\s+(.+)$/gm, '<li>$1</li>');

	const lines = formatted.split('\n');
	const result = [];
	let inList = false;
	let listItems = [];
	let currentParagraph = [];

	for (const line of lines) {
		if (line.trim().startsWith('<li>')) {
			if (currentParagraph.length > 0) {
				result.push('<p>' + currentParagraph.join(' ') + '</p>');
				currentParagraph = [];
			}

			if (!inList) {
				inList = true;
			}
			listItems.push(line);
		} else if (line.trim().startsWith('<h')) {
			if (currentParagraph.length > 0) {
				result.push('<p>' + currentParagraph.join(' ') + '</p>');
				currentParagraph = [];
			}

			if (inList) {
				result.push('<ul>');
				result.push(...listItems);
				result.push('</ul>');
				listItems = [];
				inList = false;
			}
			result.push(line);
		} else if (line.trim() === '') {
			if (currentParagraph.length > 0) {
				result.push('<p>' + currentParagraph.join(' ') + '</p>');
				currentParagraph = [];
			}

			if (inList) {
				result.push('<ul>');
				result.push(...listItems);
				result.push('</ul>');
				listItems = [];
				inList = false;
			}
		} else {
			if (inList) {
				result.push('<ul>');
				result.push(...listItems);
				result.push('</ul>');
				listItems = [];
				inList = false;
			}
			currentParagraph.push(line.trim());
		}
	}

	if (currentParagraph.length > 0) {
		result.push('<p>' + currentParagraph.join(' ') + '</p>');
	}

	if (inList && listItems.length > 0) {
		result.push('<ul>');
		result.push(...listItems);
		result.push('</ul>');
	}

	formatted = result.join('\n');

	return formatted
		.replace(/\n\s*\n\s*\n/g, '\n\n')
		.replace(/>\s*\n\s*</g, '>\n<');
};
