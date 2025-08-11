export * from './skillsSorting';
export * from './pageHeader';

export const formatContentForPDF = (content: string): string => {
	// First, convert list items to temporary markers
	let formatted = content
		.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
		.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
		.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
		.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(/^-\s+(.+)$/gm, '<li>$1</li>');

	// Group consecutive list items into ul tags
	const lines = formatted.split('\n');
	const result = [];
	let inList = false;
	let listItems = [];

	for (const line of lines) {
		if (line.trim().startsWith('<li>')) {
			if (!inList) {
				inList = true;
			}
			listItems.push(line);
		} else {
			if (inList) {
				// End the list
				result.push('<ul>');
				result.push(...listItems);
				result.push('</ul>');
				listItems = [];
				inList = false;
			}
			result.push(line);
		}
	}

	// Handle any remaining list items
	if (inList && listItems.length > 0) {
		result.push('<ul>');
		result.push(...listItems);
		result.push('</ul>');
	}

	formatted = result.join('\n');

	// Convert line breaks to <br> and clean up
	return (
		formatted
			.replace(/\n/g, '<br>')
			// Clean up excessive line breaks
			.replace(/<br>\s*<br>\s*<br>/g, '<br><br>')
			// Remove extra <br> tags around HTML elements
			.replace(/<br><(h[23]|ul|li|strong|em)>/g, '<$1>')
			.replace(/<\/(h[23]|ul|li|strong|em)><br>/g, '</$1>')
			// Clean up multiple consecutive <br> tags
			.replace(/<br><br><br>/g, '<br><br>')
	);
};
