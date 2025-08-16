import type { CandidateDetails } from '@/types';

/**
 * Converts markdown to HTML for PDF generation
 */
export const formatContentForPDF = (
	content: string,
	_candidateDetails?: CandidateDetails,
): string => {
	if (
		content.includes('<p>') ||
		content.includes('<h') ||
		content.includes('<ul>') ||
		content.includes('<li>') ||
		content.includes('<span>')
	) {
		return content;
	}

	const formatted = content
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
			result.push('<p></p>');
		} else {
			if (inList) {
				result.push('<ul>');
				result.push(...listItems);
				result.push('</ul>');
				listItems = [];
				inList = false;
			}
			result.push(`<p>${line}</p>`);
		}
		i++;
	}

	if (inList) {
		result.push('<ul>');
		result.push(...listItems);
		result.push('</ul>');
	}

	const html = result.join('\n');

	return html;
};

/**
 * Converts markdown to HTML for TipTap editor display
 * Specifically handles skills format with bold group names and proper line breaks
 */
export const convertMarkdownToHTML = (content: string): string => {
	if (!content) return '';

	const html = content
		.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(/_(.*?)_/g, '<span class="text-shadow">$1</span>');

	const lines = html.split('\n');
	const result = [];
	let currentList = [];

	for (const line of lines) {
		if (line.trim() === '') {
			continue;
		}

		if (line.includes('<strong>') && line.includes(':')) {
			currentList.push(`<li>${line.trim()}</li>`);
		} else {
			if (currentList.length > 0) {
				result.push(`<ul>${currentList.join('')}</ul>`);
				currentList = [];
			}
			result.push(`<p>${line.trim()}</p>`);
		}
	}

	if (currentList.length > 0) {
		result.push(`<ul>${currentList.join('')}</ul>`);
	}

	return result.join('');
};
