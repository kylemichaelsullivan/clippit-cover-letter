import { generateQRCodeSVG } from './qrCode';
import type { CandidateDetails } from '@/types';

export async function generatePageHeaderHTML(
	candidateDetails: CandidateDetails,
): Promise<string> {
	const { fullName, email, phone, linkedin, portfolio } = candidateDetails;

	const formattedLinkedin = linkedin ? `/in/${linkedin}` : '';
	const contactInfo = [email, phone, formattedLinkedin, portfolio]
		.filter(Boolean)
		.join(' | ');

	const headerHTML = `
		<header class="page-header">
			<h1 class="page-header-name">${fullName}</h1>
			${contactInfo ? `<div class="page-header-contact">${contactInfo}</div>` : ''}
		</header>
	`;

	return headerHTML;
}

export async function generatePageFooterHTML(
	candidateDetails: CandidateDetails,
): Promise<string> {
	const { logo, logoInclude, portfolioQRCode, portfolio } = candidateDetails;

	const logoHTML =
		logoInclude && logo
			? `
		<div class="page-logo">
			<img src="${logo}" class="page-logo-image" alt="Logo" />
		</div>
	`
			: '';

	const shouldShowQRCode =
		portfolioQRCode && portfolio && portfolio.trim() !== '';

	const qrCodeHTML = shouldShowQRCode
		? `
		<div class="page-qr-code">
			${await generateQRCodeSVG(portfolio)}
		</div>
	`
		: '';

	const footerContent = `${qrCodeHTML}${logoHTML}`;

	return footerContent
		? `
		<footer class="page-footer">
			${footerContent}
		</footer>
	`
		: '';
}
