import type { CandidateDetails } from '@/types';

export function replaceSignaturePlaceholders(
	content: string,
	candidateDetails: CandidateDetails,
	replaceImages = false
): string {
	let result = content;

	// Handle {{My Signature}} placeholders
	if (result.includes('{{My Signature}}')) {
		const signatureValue =
			candidateDetails.signatureUseImage && candidateDetails.signature
				? `<img src="${candidateDetails.signature}" class="signature-image" alt="Signature" />`
				: candidateDetails.fullName || '';

		result = result.replace(/\{\{My Signature\}\}/g, signatureValue);
	}

	// Handle signature images that should be replaced with the candidate's name for plaintext
	if (replaceImages && result.includes('class="signature-image"')) {
		result = result.replace(
			/<img[^>]*class="signature-image"[^>]*>/g,
			candidateDetails.fullName || ''
		);
	}

	return result;
}
