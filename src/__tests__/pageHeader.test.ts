import { generatePageHeaderHTML } from '@/lib/utils/pageHeader';
import type { CandidateDetails } from '@/types';
import { describe, it, expect } from 'vitest';

describe('generatePageHeaderHTML', () => {
	it('should generate header HTML with all contact information', () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			phone: '+1-555-123-4567',
			linkedin: 'dwightschrute',
			portfolio: 'schrutefarms.com',
		};

		const result = generatePageHeaderHTML(candidateDetails);

		expect(result).toContain('<div class="page-header">');
		expect(result).toContain(
			'<h1 class="page-header-name">Dwight Schrute</h1>',
		);
		expect(result).toContain('<div class="page-header-contact">');
		expect(result).toContain(
			'dwight.schrute@dundermifflin.com | +1-555-123-4567 | /in/dwightschrute | schrutefarms.com',
		);
	});

	it('should generate header HTML with partial contact information', () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			phone: '',
			linkedin: 'dwightschrute',
			portfolio: '',
		};

		const result = generatePageHeaderHTML(candidateDetails);

		expect(result).toContain(
			'<h1 class="page-header-name">Dwight Schrute</h1>',
		);
		expect(result).toContain(
			'dwight.schrute@dundermifflin.com | /in/dwightschrute',
		);
		expect(result).not.toContain('||');
	});

	it('should generate header HTML with only name and email', () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: 'dwight.schrute@dundermifflin.com',
			phone: '',
			linkedin: '',
			portfolio: '',
		};

		const result = generatePageHeaderHTML(candidateDetails);

		expect(result).toContain(
			'<h1 class="page-header-name">Dwight Schrute</h1>',
		);
		expect(result).toContain('dwight.schrute@dundermifflin.com');
		expect(result).not.toContain('|');
	});

	it('should generate header HTML with only name', () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Dwight Schrute',
			email: '',
			phone: '',
			linkedin: '',
			portfolio: '',
		};

		const result = generatePageHeaderHTML(candidateDetails);

		expect(result).toContain(
			'<h1 class="page-header-name">Dwight Schrute</h1>',
		);
		expect(result).not.toContain('<div class="page-header-contact">');
	});
});
