import { CONSTANTS } from '@/config';
import { cleanMarkdown, htmlToMarkdown } from './htmlToMarkdown';
import { cleanPlaintext, htmlToPlaintext } from './htmlToPlaintext';
import { showToast } from '../toast';

function downloadFile(
	blob: Blob,
	filename: string,
	extension: string,
	successMessage: string,
	errorMessage: string,
	appendToBody = false,
): void {
	try {
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${filename}.${extension}`;

		if (appendToBody) {
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else {
			a.click();
		}

		URL.revokeObjectURL(url);
		showToast.success(successMessage);
	} catch {
		showToast.error(errorMessage);
	}
}

export function downloadMD(
	content: string,
	filename: string,
	documentType?: string,
): void {
	const markdownContent = cleanMarkdown(htmlToMarkdown(content));
	const blob = new Blob([markdownContent], { type: 'text/markdown' });
	const successMessage = documentType
		? `${documentType} MD Downloaded Successfully`
		: CONSTANTS.MESSAGES.DOWNLOAD.SUCCESS.MARKDOWN;
	const errorMessage = documentType
		? `Failed to download ${documentType} MD`
		: CONSTANTS.MESSAGES.DOWNLOAD.ERROR.MARKDOWN;
	downloadFile(blob, filename, 'md', successMessage, errorMessage);
}

export function downloadPDF(
	blob: Blob,
	filename: string,
	documentType?: string,
): void {
	const successMessage = documentType
		? `${documentType} PDF Downloaded Successfully`
		: CONSTANTS.MESSAGES.DOWNLOAD.SUCCESS.PDF;
	const errorMessage = documentType
		? `Failed to download ${documentType} PDF`
		: CONSTANTS.MESSAGES.DOWNLOAD.ERROR.PDF;
	downloadFile(blob, filename, 'pdf', successMessage, errorMessage, true);
}

export function downloadTXT(
	content: string,
	filename: string,
	documentType?: string,
): void {
	const plaintextContent = cleanPlaintext(htmlToPlaintext(content));
	const blob = new Blob([plaintextContent], { type: 'text/plain' });
	const successMessage = documentType
		? `${documentType} TXT Downloaded Successfully`
		: CONSTANTS.MESSAGES.DOWNLOAD.SUCCESS.TEXT;
	const errorMessage = documentType
		? `Failed to download ${documentType} TXT`
		: CONSTANTS.MESSAGES.DOWNLOAD.ERROR.TEXT;
	downloadFile(blob, filename, 'txt', successMessage, errorMessage);
}
