/**
 * Converts HTML content to Markdown format
 */
export function htmlToMarkdown(html: string): string {
	if (!html) return '';

	// Create a temporary div to parse HTML
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = html;

	// Remove signature images and other non-text content
	const signatureImages = tempDiv.querySelectorAll('img.signature-image');
	signatureImages.forEach((img) => img.remove());

	// Remove any remaining images
	const images = tempDiv.querySelectorAll('img');
	images.forEach((img) => img.remove());

	// Remove any script or style tags
	const scripts = tempDiv.querySelectorAll('script, style');
	scripts.forEach((script) => script.remove());

	// Convert HTML to Markdown
	return convertNodeToMarkdown(tempDiv);
}

/**
 * Recursively converts DOM nodes to Markdown
 */
function convertNodeToMarkdown(node: Node): string {
	if (node.nodeType === Node.TEXT_NODE) {
		return node.textContent || '';
	}

	if (node.nodeType === Node.ELEMENT_NODE) {
		const element = node as Element;
		const tagName = element.tagName.toLowerCase();
		const children = Array.from(element.childNodes)
			.map(convertNodeToMarkdown)
			.join('');

		switch (tagName) {
			case 'h1':
				return `# ${children}\n\n`;
			case 'h2':
				return `## ${children}\n\n`;
			case 'h3':
				return `### ${children}\n\n`;
			case 'h4':
				return `#### ${children}\n\n`;
			case 'h5':
				return `##### ${children}\n\n`;
			case 'h6':
				return `###### ${children}\n\n`;
			case 'p':
				// Handle empty paragraphs
				if (!children.trim()) {
					return '\n';
				}
				return `${children}\n\n`;
			case 'strong':
			case 'b':
				return `**${children}**`;
			case 'em':
			case 'i':
				return `*${children}*`;
			case 'u':
				return `__${children}__`;
			case 'ul':
				return `${children}\n`;
			case 'ol':
				return `${children}\n`;
			case 'li':
				const parent = element.parentElement;
				if (parent?.tagName.toLowerCase() === 'ol') {
					// For ordered lists, we'd need to track the number
					// For simplicity, using bullet points for now
					return `- ${children}\n`;
				}
				return `- ${children}\n`;
			case 'br':
				return '\n';
			case 'div':
				return `${children}\n`;
			case 'span':
				// Check for specific classes that might need special handling
				const className = element.getAttribute('class');
				if (className?.includes('text-shadow')) {
					return `**${children}**`;
				}
				return children;
			case 'a':
				const href = element.getAttribute('href');
				if (href) {
					return `[${children}](${href})`;
				}
				return children;
			default:
				return children;
		}
	}

	return '';
}

/**
 * Cleans up the final markdown output
 */
export function cleanMarkdown(markdown: string): string {
	return (
		markdown
			// Remove excessive newlines
			.replace(/\n{3,}/g, '\n\n')
			// Remove trailing whitespace
			.replace(/[ \t]+$/gm, '')
			// Remove leading/trailing whitespace
			.trim()
	);
}
