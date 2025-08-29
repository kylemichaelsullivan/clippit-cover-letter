import { describe, it, expect } from 'vitest';
import {
	generatePageHeaderHTML,
	generatePageFooterHTML,
} from '@/lib/utils/pageHeader';
import type { CandidateDetails } from '@/types';

describe('generatePageHeaderHTML', () => {
	it('should generate header HTML with all contact information', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			phone: '+1-555-123-4567',
			linkedin: 'dwightschrute',
			portfolio: 'schrutefarms.com',
		};

		const result = await generatePageHeaderHTML(candidateDetails);

		expect(result).toContain('<header class="page-header">');
		expect(result).toContain(
			'<h1 class="page-header-name">Dwight Schrute</h1>',
		);
		expect(result).toContain('<div class="page-header-contact">');
		expect(result).toContain(
			'dwight.schrute@dundermifflin.com | +1-555-123-4567 | /in/dwightschrute | schrutefarms.com',
		);
	});

	it('should generate header HTML with partial contact information', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			phone: '',
			linkedin: 'dwightschrute',
			portfolio: '',
		};

		const result = await generatePageHeaderHTML(candidateDetails);

		expect(result).toContain(
			'<h1 class="page-header-name">Dwight Schrute</h1>',
		);
		expect(result).toContain(
			'dwight.schrute@dundermifflin.com | /in/dwightschrute',
		);
		expect(result).not.toContain('||');
	});

	it('should generate header HTML with only name and email', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			phone: '',
			linkedin: '',
			portfolio: '',
		};

		const result = await generatePageHeaderHTML(candidateDetails);

		expect(result).toContain(
			'<h1 class="page-header-name">Dwight Schrute</h1>',
		);
		expect(result).toContain('dwight.schrute@dundermifflin.com');
		expect(result).not.toContain('|');
	});

	it('should generate header HTML with only name', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: '',
			phone: '',
			linkedin: '',
			portfolio: '',
		};

		const result = await generatePageHeaderHTML(candidateDetails);

		expect(result).toContain(
			'<h1 class="page-header-name">Dwight Schrute</h1>',
		);
		expect(result).not.toContain('<div class="page-header-contact">');
	});
});

describe('generatePageFooterHTML', () => {
	it('should include QR code only for cover letters with portfolio', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			phone: '+1-555-123-4567',
			linkedin: 'dwightschrute',
			portfolio: 'schrutefarms.com',
			portfolioQRCode: true,
		};

		const coverLetterResult = await generatePageFooterHTML(
			candidateDetails,
			true,
		);
		const resumeResult = await generatePageFooterHTML(candidateDetails, false);

		expect(coverLetterResult).toContain('page-qr-code');
		expect(resumeResult).not.toContain('page-qr-code');
	});

	it('should include logo when logoInclude is true', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			logo: 'logo.png',
			logoInclude: true,
		};

		const result = await generatePageFooterHTML(candidateDetails, true);

		expect(result).toContain('page-logo');
		expect(result).toContain('page-logo-image');
		expect(result).toContain('src="logo.png"');
	});

	it('should not include logo when logoInclude is false', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			logo: 'logo.png',
			logoInclude: false,
		};

		const result = await generatePageFooterHTML(candidateDetails, true);

		expect(result).not.toContain('page-logo');
		expect(result).not.toContain('page-logo-image');
	});

	it('should not include QR code when portfolio is empty', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			portfolio: '',
			portfolioQRCode: true,
		};

		const result = await generatePageFooterHTML(candidateDetails, true);

		expect(result).not.toContain('page-qr-code');
	});

	it('should not include QR code when portfolioQRCode is false', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			portfolio: 'schrutefarms.com',
			portfolioQRCode: false,
		};

		const result = await generatePageFooterHTML(candidateDetails, true);

		expect(result).not.toContain('page-qr-code');
	});

	it('should wrap footer content in semantic footer element', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			portfolio: 'schrutefarms.com',
			portfolioQRCode: true,
			logo: 'logo.png',
			logoInclude: true,
		};

		const result = await generatePageFooterHTML(candidateDetails, true);

		expect(result).toContain('<footer class="page-footer">');
		expect(result).toContain('</footer>');
		expect(result).toContain('page-qr-code');
		expect(result).toContain('page-logo');
	});

	it('should return empty string when no footer content', async () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			portfolio: '',
			portfolioQRCode: false,
			logoInclude: false,
		};

		const result = await generatePageFooterHTML(candidateDetails, true);

		expect(result).toBe('');
	});
});
