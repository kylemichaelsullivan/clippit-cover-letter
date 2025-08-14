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
		.replace(/_(.*?)_/g, '<span class="text-shadow">$1</span>')
		.replace(/^-\s+(.+)$/gm, '<li>$1</li>');

	const lines = formatted.split('\n');
	const result = [];
	let inList = false;
	let listItems = [];
	let i = 0;

	while (i < lines.length) {
		const line = lines[i];

		if (line.trim().startsWith('<li>')) {
			if (!inList) {
				inList = true;
			}
			listItems.push(line);
		} else if (line.trim().startsWith('<h')) {
			if (inList) {
				result.push('<ul>');
				result.push(...listItems);
				result.push('</ul>');
				listItems = [];
				inList = false;
			}
			result.push(line);
		} else if (line.trim() === '') {
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

			// Check if this line contains a signature marker
			if (line.includes('<!--SIGNATURE-->')) {
				const signatureContent = line.replace('<!--SIGNATURE-->', '').trim();
				if (signatureContent) {
					// Look for the previous non-empty line to combine with
					let prevLine = '';
					for (let j = i - 1; j >= 0; j--) {
						if (
							lines[j].trim() !== '' &&
							!lines[j].trim().startsWith('<h') &&
							!lines[j].trim().startsWith('<li>') &&
							!lines[j].includes('<!--SIGNATURE-->') &&
							!lines[j].includes('<!--ADDRESS_BLOCK-->')
						) {
							prevLine = lines[j].trim();
							break;
						}
					}

					if (prevLine) {
						// Remove the previous line from result and combine
						result.pop(); // Remove the previous paragraph
						result.push(
							'<p>' + prevLine + '<br />' + signatureContent + '</p>',
						);
					} else {
						result.push('<p><br />' + signatureContent + '</p>');
					}
				}
			} else if (line.includes('<!--ADDRESS_BLOCK-->')) {
				// Handle address block - collect consecutive address lines
				const addressContent = line.replace('<!--ADDRESS_BLOCK-->', '').trim();
				if (addressContent) {
					const addressLines = [addressContent];

					// Look ahead for more address block lines
					let nextIndex = i + 1;
					while (
						nextIndex < lines.length &&
						lines[nextIndex].includes('<!--ADDRESS_BLOCK-->')
					) {
						const nextLine = lines[nextIndex]
							.replace('<!--ADDRESS_BLOCK-->', '')
							.trim();
						if (nextLine) {
							addressLines.push(nextLine);
						}
						nextIndex++;
					}

					// Skip the lines we've already processed
					i = nextIndex - 1;

					// Create the address paragraph
					result.push('<p>' + addressLines.join('<br />') + '</p>');
				}
			} else {
				// Regular line, each non-empty line becomes its own paragraph
				result.push('<p>' + line.trim() + '</p>');
			}
		}

		i++;
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
