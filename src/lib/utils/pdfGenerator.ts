import type { CandidateDetails } from '@/types';
import { formatContentForPDF } from './pdfFormatter';
import { replaceSignaturePlaceholders } from './signatureReplacement';

type GeneratePDFParams = {
	content: string;
	filename: string;
	candidateDetails: CandidateDetails;
	fontSize?: string;
};

export async function generatePDF({
	content,
	filename,
	candidateDetails,
	fontSize = '11pt',
}: GeneratePDFParams): Promise<Blob> {
	try {
		const formattedContent = formatContentForPDF(content);
		const contentWithSignature = replaceSignaturePlaceholders(
			formattedContent,
			candidateDetails
		);

		const response = await fetch('/api/generate-pdf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				html: contentWithSignature,
				filename,
				candidateDetails,
				fontSize,
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			let errorMessage = `PDF generation failed: ${response.statusText}`;

			try {
				const errorData = JSON.parse(errorText);
				if (errorData.error) {
					errorMessage = errorData.error;
				}
			} catch {
				// If we can't parse the error, use the raw text
				if (errorText) {
					errorMessage = errorText;
				}
			}

			throw new Error(errorMessage);
		}

		return await response.blob();
	} catch (error) {
		console.error('Error generating PDF:', error);

		if (error instanceof Error) {
			if (error.message.includes('Failed to fetch')) {
				throw new Error(
					'Unable to connect to PDF generation service. Please check your internet connection and try again.'
				);
			}
			if (error.message.includes('timeout')) {
				throw new Error('PDF generation timed out. Please try again.');
			}
			throw error;
		}

		throw new Error('Failed to generate PDF');
	}
}
