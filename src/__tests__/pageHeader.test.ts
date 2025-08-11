import { generatePageHeaderHTML } from '@/lib/utils/pageHeader';
import type { CandidateDetails } from '@/types';
import { describe, it, expect } from 'vitest';

describe('generatePageHeaderHTML', () => {
	it('should generate header HTML with all contact information', () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'John Doe',
			email: 'john.doe@example.com',
			phone: '+1-555-123-4567',
			linkedin: 'johndoe',
			portfolio: 'johndoe.dev',
		};

		const result = generatePageHeaderHTML(candidateDetails);

		expect(result).toContain('<div class="page-header">');
		expect(result).toContain('<h1 class="page-header-name">John Doe</h1>');
		expect(result).toContain('<div class="page-header-contact">');
		expect(result).toContain(
			'john.doe@example.com | +1-555-123-4567 | /in/johndoe | johndoe.dev',
		);
	});

	it('should generate header HTML with partial contact information', () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Jane Smith',
			email: 'jane.smith@example.com',
			phone: '',
			linkedin: 'janesmith',
			portfolio: '',
		};

		const result = generatePageHeaderHTML(candidateDetails);

		expect(result).toContain('<h1 class="page-header-name">Jane Smith</h1>');
		expect(result).toContain('jane.smith@example.com | /in/janesmith');
		expect(result).not.toContain('||');
	});

	it('should generate header HTML with only name and email', () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Bob Wilson',
			email: 'bob.wilson@example.com',
			phone: '',
			linkedin: '',
			portfolio: '',
		};

		const result = generatePageHeaderHTML(candidateDetails);

		expect(result).toContain('<h1 class="page-header-name">Bob Wilson</h1>');
		expect(result).toContain('bob.wilson@example.com');
		expect(result).not.toContain('|');
	});

	it('should generate header HTML with only name', () => {
		const candidateDetails: CandidateDetails = {
			fullName: 'Alice Brown',
			email: '',
			phone: '',
			linkedin: '',
			portfolio: '',
		};

		const result = generatePageHeaderHTML(candidateDetails);

		expect(result).toContain('<h1 class="page-header-name">Alice Brown</h1>');
		expect(result).not.toContain('<div class="page-header-contact">');
	});
});
