import { replaceSignaturePlaceholders } from './signatureReplacement';
import type { CandidateDetails } from '@/types';

/**
 * Converts HTML content to plaintext format
 */
export function htmlToPlaintext(html: string): string {
	if (!html) return '';

	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = html;

	const signatureImages = tempDiv.querySelectorAll('img.signature-image');
	signatureImages.forEach((img) => img.remove());

	const images = tempDiv.querySelectorAll('img');
	images.forEach((img) => img.remove());

	const scripts = tempDiv.querySelectorAll('script, style');
	scripts.forEach((script) => script.remove());

	return convertNodeToPlaintext(tempDiv);
}

/**
 * Recursively converts DOM nodes to plaintext
 */
function convertNodeToPlaintext(node: Node): string {
	if (node.nodeType === Node.TEXT_NODE) {
		return node.textContent || '';
	}

	if (node.nodeType === Node.ELEMENT_NODE) {
		const element = node as Element;
		const tagName = element.tagName.toLowerCase();
		const children = Array.from(element.childNodes)
			.map(convertNodeToPlaintext)
			.join('');

		switch (tagName) {
			case 'h1':
			case 'h2':
			case 'h3':
			case 'h4':
			case 'h5':
			case 'h6':
				return `${children}\n\n`;
			case 'p':
				// Handle empty paragraphs
				if (!children.trim()) {
					return '\n';
				}
				return `${children}\n\n`;
			case 'ul':
			case 'ol':
				return `${children}\n`;
			case 'li':
				return `• ${children}\n`;
			case 'br':
				return '\n';
			case 'div':
				return `${children}\n`;
			case 'span':
				return children;
			case 'a':
				const href = element.getAttribute('href');
				if (href && children.trim()) {
					return `${children} (${href})`;
				}
				return children;
			default:
				return children;
		}
	}

	return '';
}

/**
 * Cleans up the final plaintext output
 */
export function cleanPlaintext(plaintext: string): string {
	return (
		plaintext
			// Remove excessive newlines
			.replace(/\n{3,}/g, '\n\n')
			// Remove trailing whitespace
			.replace(/[ \t]+$/gm, '')
			// Remove leading/trailing whitespace
			.trim()
	);
}

/**
 * Converts HTML content to plaintext format with signature replacement
 */
export function htmlToPlaintextWithSignature(
	html: string,
	candidateDetails?: CandidateDetails,
): string {
	if (!html) return '';

	// Always replace signature placeholders with candidate name for Copy/TXT output
	const contentWithSignature = candidateDetails
		? replaceSignaturePlaceholders(html, candidateDetails, true)
		: html;

	return htmlToPlaintext(contentWithSignature);
}
