import type { CandidateDetails } from '@/types';

export function replaceSignaturePlaceholders(
	content: string,
	candidateDetails: CandidateDetails,
): string {
	if (!content.includes('{{My Signature}}')) {
		return content;
	}

	const signatureValue =
		candidateDetails.signatureUseImage && candidateDetails.signature
			? `<img src="${candidateDetails.signature}" class="signature-image" alt="Signature" />`
			: candidateDetails.fullName || '';

	return content.replace(/\{\{My Signature\}\}/g, signatureValue);
}
