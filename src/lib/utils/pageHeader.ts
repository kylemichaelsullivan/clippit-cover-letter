import type { CandidateDetails } from '@/types';

export function generatePageHeaderHTML(
	candidateDetails: CandidateDetails,
): string {
	const { fullName, email, phone, linkedin, portfolio } = candidateDetails;

	const formattedLinkedin = linkedin ? `/in/${linkedin}` : '';
	const contactInfo = [email, phone, formattedLinkedin, portfolio]
		.filter(Boolean)
		.join(' | ');

	const headerHTML = `
		<div class="page-header">
			<h1 class="page-header-name">${fullName}</h1>
			${contactInfo ? `<div class="page-header-contact">${contactInfo}</div>` : ''}
		</div>
	`;

	return headerHTML;
}
