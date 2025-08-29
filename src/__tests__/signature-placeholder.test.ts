import { describe, it, expect } from 'vitest';
import {
	htmlToPlaintextWithSignature,
	cleanPlaintext,
} from '../lib/utils/htmlToPlaintext';
import type { CandidateDetails } from '@/types';

describe('signature placeholder preservation', () => {
	const mockCandidateDetails: CandidateDetails = {
		fullName: 'John Doe',
		email: 'john@example.com',
		phone: '(123) 456-7890',
		location: 'New York, NY',
		linkedin: 'johndoe',
		portfolio: 'https://johndoe.com',
		logo: '',
		logoInclude: true,
		signature: '',
		portfolioQRCode: true,
		signatureUseImage: false,
	};

	it('should preserve {{My Signature}} placeholder in plaintext when no candidate details provided', () => {
		const html =
			'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p>{{My Signature}}</p>';
		const result = cleanPlaintext(htmlToPlaintextWithSignature(html));
		expect(result).toContain('{{My Signature}}');
	});

	it('should replace signature images with full name in plaintext', () => {
		const html =
			'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p><img src="data:image/png;base64,test" class="signature-image" alt="Signature" /></p>';
		const result = cleanPlaintext(
			htmlToPlaintextWithSignature(html, mockCandidateDetails),
		);
		expect(result).toContain('John Doe');
		expect(result).not.toContain('signature-image');
	});

	it('should replace {{My Signature}} with full name when signatureUseImage is false', () => {
		const html =
			'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p>{{My Signature}}</p>';
		const result = cleanPlaintext(
			htmlToPlaintextWithSignature(html, mockCandidateDetails),
		);
		expect(result).toContain('John Doe');
		expect(result).not.toContain('{{My Signature}}');
	});

	it('should replace {{My Signature}} with full name when signatureUseImage is true but no signature image', () => {
		const candidateWithImageFlag = {
			...mockCandidateDetails,
			signatureUseImage: true,
		};
		const html =
			'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p>{{My Signature}}</p>';
		const result = cleanPlaintext(
			htmlToPlaintextWithSignature(html, candidateWithImageFlag),
		);
		expect(result).toContain('John Doe');
		expect(result).not.toContain('{{My Signature}}');
	});

	it('should replace {{My Signature}} with full name when signature image is present but signatureUseImage is false', () => {
		const candidateWithSignature = {
			...mockCandidateDetails,
			signature: 'data:image/png;base64,test',
		};
		const html =
			'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p>{{My Signature}}</p>';
		const result = cleanPlaintext(
			htmlToPlaintextWithSignature(html, candidateWithSignature),
		);
		expect(result).toContain('John Doe');
		expect(result).not.toContain('{{My Signature}}');
	});

	it('should handle multiple {{My Signature}} placeholders', () => {
		const html =
			'<p>Dear Hiring Manager,</p><p>{{My Signature}}</p><p>Sincerely,</p><p>{{My Signature}}</p>';
		const result = cleanPlaintext(
			htmlToPlaintextWithSignature(html, mockCandidateDetails),
		);
		expect(result).toContain('John Doe');
		expect(result).not.toContain('{{My Signature}}');
		// Should have two instances of the name
		const nameCount = (result.match(/John Doe/g) || []).length;
		expect(nameCount).toBe(2);
	});

	it('should handle content without signature placeholders', () => {
		const html =
			'<p>Dear Hiring Manager,</p><p>This is a test letter.</p><p>Sincerely,</p>';
		const result = cleanPlaintext(
			htmlToPlaintextWithSignature(html, mockCandidateDetails),
		);
		expect(result).not.toContain('{{My Signature}}');
		expect(result).not.toContain('John Doe');
		expect(result).toContain('Dear Hiring Manager');
		expect(result).toContain('This is a test letter');
		expect(result).toContain('Sincerely');
	});
});
