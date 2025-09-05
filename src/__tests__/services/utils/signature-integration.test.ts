import { describe, it, expect } from 'vitest';
import {
	htmlToPlaintextWithSignature,
	cleanPlaintext,
} from '@/lib/utils/htmlToPlaintext';
import { replaceSignaturePlaceholders } from '@/lib/utils/signatureReplacement';
import type { CandidateDetails } from '@/types';

describe('signature integration tests', () => {
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

	describe('TipTap content preservation', () => {
		it('should preserve {{My Signature}} in TipTap editor content', () => {
			const tipTapContent =
				'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p>{{My Signature}}</p>';

			// The TipTap editor should preserve {{My Signature}}
			expect(tipTapContent).toContain('{{My Signature}}');

			// It should be replaced in the preview
			const previewContent = replaceSignaturePlaceholders(
				tipTapContent,
				mockCandidateDetails,
			);
			expect(previewContent).toContain('signature-image');
			expect(previewContent).not.toContain('{{My Signature}}');
		});

		it('should handle generated content with signature images', () => {
			// This simulates generated content that already has signature images
			const generatedContent =
				'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p><img src="data:image/png;base64,test" class="signature-image" alt="Signature" /></p>';

			// The generated content should have signature images
			expect(generatedContent).toContain('signature-image');

			// When converted to plaintext, images should be replaced with name
			const plaintext = cleanPlaintext(
				htmlToPlaintextWithSignature(generatedContent, mockCandidateDetails),
			);
			expect(plaintext).toContain('John Doe');
			expect(plaintext).not.toContain('signature-image');
		});
	});

	describe('Plaintext output scenarios', () => {
		it('should handle template content with placeholders in plaintext', () => {
			const templateContent =
				'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p>{{My Signature}}</p>';

			// When no candidate details provided, preserve placeholder
			const result1 = cleanPlaintext(
				htmlToPlaintextWithSignature(templateContent),
			);
			expect(result1).toContain('{{My Signature}}');

			// When candidate details provided with `signatureUseImage: false`, replace with name
			const candidateNoImage = {
				...mockCandidateDetails,
				signatureUseImage: false,
			};
			const result2 = cleanPlaintext(
				htmlToPlaintextWithSignature(templateContent, candidateNoImage),
			);
			expect(result2).toContain('John Doe');
			expect(result2).not.toContain('{{My Signature}}');
		});

		it('should handle generated content with signature images in plaintext', () => {
			const generatedContent =
				'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p><img src="data:image/png;base64,test" class="signature-image" alt="Signature" /></p>';

			// When no candidate details provided, remove images but don't replace
			const result1 = cleanPlaintext(
				htmlToPlaintextWithSignature(generatedContent),
			);
			expect(result1).not.toContain('signature-image');
			expect(result1).not.toContain('John Doe');

			const result2 = cleanPlaintext(
				htmlToPlaintextWithSignature(generatedContent, mockCandidateDetails),
			);
			expect(result2).toContain('John Doe');
			expect(result2).not.toContain('signature-image');
		});

		it('should handle mixed content with both placeholders and images', () => {
			const mixedContent =
				'<p>Dear Hiring Manager,</p><p>{{My Signature}}</p><p>Sincerely,</p><p><img src="data:image/png;base64,test" class="signature-image" alt="Signature" /></p>';

			// Use candidate with `signatureUseImage: false` so placeholder becomes name, not image
			const candidateNoImage = {
				...mockCandidateDetails,
				signatureUseImage: false,
			};
			const result = cleanPlaintext(
				htmlToPlaintextWithSignature(mixedContent, candidateNoImage),
			);

			// Should have two instances of the name (one from placeholder, one from image)
			const nameCount = (result.match(/John Doe/g) || []).length;
			expect(nameCount).toBe(2);
			expect(result).not.toContain('{{My Signature}}');
			expect(result).not.toContain('signature-image');
		});
	});

	describe('Signature replacement logic', () => {
		it('should handle signatureUseImage flag correctly', () => {
			const templateContent = '<p>{{My Signature}}</p>';

			// When signatureUseImage is true and signature exists
			const candidateWithImage = {
				...mockCandidateDetails,
				signatureUseImage: true,
				signature: 'data:image/png;base64,test',
			};
			const result1 = replaceSignaturePlaceholders(
				templateContent,
				candidateWithImage,
			);
			expect(result1).toContain('signature-image');
			expect(result1).not.toContain('{{My Signature}}');

			// When signatureUseImage is true but no signature
			const candidateNoImage = {
				...mockCandidateDetails,
				signatureUseImage: true,
				signature: '',
			};
			const result2 = replaceSignaturePlaceholders(
				templateContent,
				candidateNoImage,
			);
			expect(result2).toContain('John Doe');
			expect(result2).not.toContain('{{My Signature}}');
			expect(result2).not.toContain('signature-image');

			// When signatureUseImage is false
			const candidateNoImageFlag = {
				...mockCandidateDetails,
				signatureUseImage: false,
				signature: 'data:image/png;base64,test',
			};
			const result3 = replaceSignaturePlaceholders(
				templateContent,
				candidateNoImageFlag,
			);
			expect(result3).toContain('John Doe');
			expect(result3).not.toContain('{{My Signature}}');
			expect(result3).not.toContain('signature-image');
		});
	});
});
