/**
 * Formats content for PDF generation by extracting HTML from TipTap content
 */
export const formatContentForPDF = (content: string): string => {
	if (!content) return '';

	// Handle TipTap JSON
	try {
		const parsed = JSON.parse(content);
		if (parsed.type === 'doc' && parsed.content) {
			return convertTipTapToHTML(parsed);
		}
	} catch {
		// Not JSON, assume it's already HTML or plain text
	}

	return content;
};

/**
 * Converts TipTap JSON to HTML
 */
const convertTipTapToHTML = (doc: any): string => {
	if (!doc.content) return '';

	return doc.content.map((node: any) => convertNodeToHTML(node)).join('');
};

/**
 * Converts a TipTap node to HTML
 */
const convertNodeToHTML = (node: any): string => {
	if (!node.type) return '';

	switch (node.type) {
		case 'paragraph':
			if (!node.content || node.content.length === 0) return '<p></p>';
			return `<p>${node.content.map(convertNodeToHTML).join('')}</p>`;

		case 'heading':
			const level = node.attrs?.level || 1;
			if (!node.content) return `<h${level}></h${level}>`;
			return `<h${level}>${node.content.map(convertNodeToHTML).join('')}</h${level}>`;

		case 'text':
			let text = node.text || '';
			if (node.marks) {
				node.marks.forEach((mark: any) => {
					switch (mark.type) {
						case 'bold':
							text = `<strong>${text}</strong>`;
							break;
						case 'italic':
							text = `<em>${text}</em>`;
							break;
						case 'underline':
							text = `<u>${text}</u>`;
							break;
					}
				});
			}
			return text;

		case 'bulletList':
			if (!node.content) return '<ul></ul>';
			return `<ul>${node.content.map(convertNodeToHTML).join('')}</ul>`;

		case 'orderedList':
			if (!node.content) return '<ol></ol>';
			return `<ol>${node.content.map(convertNodeToHTML).join('')}</ol>`;

		case 'listItem':
			if (!node.content) return '<li></li>';
			return `<li>${node.content.map(convertNodeToHTML).join('')}</li>`;

		case 'hardBreak':
			return '<br>';

		default:
			if (node.content) {
				return node.content.map(convertNodeToHTML).join('');
			}
			return '';
	}
};
