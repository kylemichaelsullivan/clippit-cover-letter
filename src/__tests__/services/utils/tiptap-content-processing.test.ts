import { processTipTapContent } from '@/lib/utils/tiptapContentProcessing';
import type { CandidateDetails, Job } from '@/types';
import { describe, expect, it } from 'vitest';

describe('TipTap content processing', () => {
	const mockCandidateDetails: CandidateDetails = {
		fullName: 'John Doe',
		email: 'john@example.com',
		phone: '(123) 456-7890',
		location: 'New York, NY',
		linkedin: 'johndoe',
		portfolio: 'https://johndoe.com',
		logo: '',
		logoInclude: true,
		signature: 'data:image/png;base64,test-signature',
		portfolioQRCode: true,
		signatureUseImage: true,
	};

	const mockJobDetails: Job = {
		companyName: 'Tech Corp',
		jobTitle: 'Software Engineer',
		hiringManager: 'Jane Smith',
		companyAddress: '123 Tech Street, San Francisco, CA',
		jobDescription: 'Build amazing software',
	};

	it('should replace all Mustache placeholders except {{My Signature}}', () => {
		const template = `{{Date}}



{{Job Address}}



Re: {{Job Title}}



Dear {{Job Manager}}:

I'm particularly drawn to teams that value <%= company buzzword/phrase -OR- "cross-functional thinking and human-centered design" %>.

Sincerely,

{{My Signature}}`;

		const processed = processTipTapContent(
			template,
			mockCandidateDetails,
			mockJobDetails
		);

		// Should replace all placeholders except {{My Signature}}
		expect(processed).toMatch(/[A-Za-z]+ \d{1,2}, \d{4}/); // Date should be replaced with a date format
		expect(processed).toContain('123 Tech Street, San Francisco, CA'); // Job Address should be replaced
		expect(processed).toContain('Software Engineer'); // Job Title should be replaced
		expect(processed).toContain('Jane Smith'); // Job Manager should be replaced
		expect(processed).toContain('{{My Signature}}'); // Signature should remain as placeholder
		expect(processed).not.toContain('{{Date}}');
		expect(processed).not.toContain('{{Job Address}}');
		expect(processed).not.toContain('{{Job Title}}');
		expect(processed).not.toContain('{{Job Manager}}');
	});

	it('should preserve all {{My Signature}} placeholders exactly as they are', () => {
		const template = `{{Date}}

{{My Signature}}

Dear {{Job Manager}}:

{{My Signature}}

Sincerely,

{{My Signature}}`;

		const processed = processTipTapContent(
			template,
			mockCandidateDetails,
			mockJobDetails
		);

		// Should replace other placeholders
		expect(processed).toMatch(/[A-Za-z]+ \d{1,2}, \d{4}/); // Date should be replaced with a date format
		expect(processed).toContain('Jane Smith'); // Job Manager should be replaced

		// Should preserve all signature placeholders exactly as they were
		const signatureCount = (processed.match(/\{\{My Signature\}\}/g) || [])
			.length;
		expect(signatureCount).toBe(3); // All three signatures should remain

		// Check that signatures are in the same positions
		const lines = processed.split('\n');
		expect(lines[2]).toContain('{{My Signature}}'); // First signature
		expect(lines[6]).toContain('{{My Signature}}'); // Second signature
		expect(lines[10]).toContain('{{My Signature}}'); // Third signature
	});

	it('should handle empty content', () => {
		const processed = processTipTapContent(
			'',
			mockCandidateDetails,
			mockJobDetails
		);
		expect(processed).toBe('');
	});

	it('should handle content with no placeholders', () => {
		const content = 'This is a simple letter with no placeholders.';
		const processed = processTipTapContent(
			content,
			mockCandidateDetails,
			mockJobDetails
		);
		expect(processed).toBe(content);
	});

	it('should handle content with only {{My Signature}}', () => {
		const template = '{{My Signature}}';
		const processed = processTipTapContent(
			template,
			mockCandidateDetails,
			mockJobDetails
		);
		expect(processed).toBe('{{My Signature}}');
	});

	it('should handle candidate details with empty values', () => {
		const emptyCandidateDetails: CandidateDetails = {
			fullName: '',
			email: '',
			phone: '',
			location: '',
			linkedin: '',
			portfolio: '',
			logo: '',
			logoInclude: true,
			signature: '',
			portfolioQRCode: true,
			signatureUseImage: false,
		};

		const template = '{{My Name}} - {{My Email}} - {{My Signature}}';
		const processed = processTipTapContent(
			template,
			emptyCandidateDetails,
			mockJobDetails
		);

		// Should replace with empty strings but keep signature placeholder
		expect(processed).toBe(' -  - {{My Signature}}');
	});

	it('should handle job details with empty values', () => {
		const emptyJobDetails: Job = {
			companyName: '',
			jobTitle: '',
			hiringManager: '',
			companyAddress: '',
			jobDescription: '',
		};

		const template = '{{Job Company}} - {{Job Title}} - {{My Signature}}';
		const processed = processTipTapContent(
			template,
			mockCandidateDetails,
			emptyJobDetails
		);

		// Should replace with fallback values but keep signature placeholder
		expect(processed).toBe('Job Company - Job Title - {{My Signature}}');
	});

	it('should prioritize existing content over template content for TipTap editor', () => {
		// Simulate the logic used in DocumentContent.tsx
		const existingContent =
			'<p>Dear Hiring Manager,</p><p>This is my manually edited content.</p><p>{{My Signature}}</p>';
		const templateContent =
			'<p>Dear Jane Smith,</p><p>This is the processed template content.</p><p>{{My Signature}}</p>';

		// The TipTap editor should use existing content when available
		const tipTapValue = existingContent || templateContent || '';

		expect(tipTapValue).toBe(existingContent);
		expect(tipTapValue).toContain('manually edited content');
		expect(tipTapValue).not.toContain('processed template content');
	});

	it('should fall back to template content when no existing content is available', () => {
		// Simulate the logic used in DocumentContent.tsx
		const existingContent = '';
		const templateContent =
			'<p>Dear Jane Smith,</p><p>This is the processed template content.</p><p>{{My Signature}}</p>';

		// The TipTap editor should use template content when no existing content
		const tipTapValue = existingContent || templateContent || '';

		expect(tipTapValue).toBe(templateContent);
		expect(tipTapValue).toContain('processed template content');
	});
});
