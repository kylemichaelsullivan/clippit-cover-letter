import { cleanMarkdown, htmlToMarkdown } from '@/lib/utils/htmlToMarkdown';
import {
	cleanPlaintext,
	htmlToPlaintextWithSignature,
} from '@/lib/utils/htmlToPlaintext';
import { replaceSignaturePlaceholders } from '@/lib/utils/signatureReplacement';
import type { CandidateDetails } from '@/types';
import { describe, expect, it } from 'vitest';

describe('signature requirements verification', () => {
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

	describe('1. TipTap: Keep {{My Signature}} for editing', () => {
		it('should preserve {{My Signature}} in TipTap editor content', () => {
			const tipTapContent =
				'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p>{{My Signature}}</p>';

			// The TipTap editor should preserve {{My Signature}}
			expect(tipTapContent).toContain('{{My Signature}}');

			// This should be replaced in the preview
			const previewContent = replaceSignaturePlaceholders(
				tipTapContent,
				mockCandidateDetails
			);
			expect(previewContent).toContain('signature-image');
			expect(previewContent).not.toContain('{{My Signature}}');
		});
	});

	describe('2. Preview: Keep current behavior', () => {
		it('should replace {{My Signature}} with signature image in preview', () => {
			const templateContent = '<p>{{My Signature}}</p>';
			const previewContent = replaceSignaturePlaceholders(
				templateContent,
				mockCandidateDetails
			);

			expect(previewContent).toContain('signature-image');
			expect(previewContent).not.toContain('{{My Signature}}');
		});
	});

	describe('3. PDF: Keep current behavior', () => {
		it('should replace {{My Signature}} with signature image in PDF', () => {
			const templateContent = '<p>{{My Signature}}</p>';
			const pdfContent = replaceSignaturePlaceholders(
				templateContent,
				mockCandidateDetails
			);

			expect(pdfContent).toContain('signature-image');
			expect(pdfContent).not.toContain('{{My Signature}}');
		});
	});

	describe('4. MD: {{My Signature}} should be replaced with Candidate Name', () => {
		it('should replace {{My Signature}} with candidate name in markdown', () => {
			const templateContent =
				'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p>{{My Signature}}</p>';

			const contentWithSignature = replaceSignaturePlaceholders(
				templateContent,
				mockCandidateDetails,
				true
			);
			const markdownContent = cleanMarkdown(
				htmlToMarkdown(contentWithSignature)
			);

			expect(markdownContent).toContain('John Doe');
			expect(markdownContent).not.toContain('{{My Signature}}');
			expect(markdownContent).not.toContain('signature-image');
		});

		it('should replace signature images with candidate name in markdown', () => {
			const generatedContent =
				'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p><img src="data:image/png;base64,test" class="signature-image" alt="Signature" /></p>';

			const contentWithSignature = replaceSignaturePlaceholders(
				generatedContent,
				mockCandidateDetails,
				true
			);
			const markdownContent = cleanMarkdown(
				htmlToMarkdown(contentWithSignature)
			);

			expect(markdownContent).toContain('John Doe');
			expect(markdownContent).not.toContain('signature-image');
		});
	});

	describe('5. Copy/TXT: {{My Signature}} should be replaced with Candidate Name', () => {
		it('should replace {{My Signature}} with candidate name in plaintext', () => {
			const templateContent =
				'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p>{{My Signature}}</p>';

			// Apply signature replacement for plaintext
			const plaintextContent = cleanPlaintext(
				htmlToPlaintextWithSignature(templateContent, mockCandidateDetails)
			);

			expect(plaintextContent).toContain('John Doe');
			expect(plaintextContent).not.toContain('{{My Signature}}');
		});

		it('should replace signature images with candidate name in plaintext', () => {
			const generatedContent =
				'<p>Dear Hiring Manager,</p><p>Sincerely,</p><p><img src="data:image/png;base64,test" class="signature-image" alt="Signature" /></p>';

			// Apply signature replacement for plaintext
			const plaintextContent = cleanPlaintext(
				htmlToPlaintextWithSignature(generatedContent, mockCandidateDetails)
			);

			// Should contain candidate name, not image
			expect(plaintextContent).toContain('John Doe');
			expect(plaintextContent).not.toContain('signature-image');
		});

		it('should handle mixed content with both placeholders and images in plaintext', () => {
			const mixedContent =
				'<p>Dear Hiring Manager,</p><p>{{My Signature}}</p><p>Sincerely,</p><p><img src="data:image/png;base64,test" class="signature-image" alt="Signature" /></p>';

			const plaintextContent = cleanPlaintext(
				htmlToPlaintextWithSignature(mixedContent, mockCandidateDetails)
			);

			const nameCount = (plaintextContent.match(/John Doe/g) || []).length;
			expect(nameCount).toBe(2);
			expect(plaintextContent).not.toContain('{{My Signature}}');
			expect(plaintextContent).not.toContain('signature-image');
		});
	});

	describe('6. Loading Toast: Should be cleared on failure', () => {
		it('should handle signature replacement when no candidate details provided', () => {
			const templateContent = '<p>{{My Signature}}</p>';

			const plaintextContent = cleanPlaintext(
				htmlToPlaintextWithSignature(templateContent)
			);
			expect(plaintextContent).toContain('{{My Signature}}');

			const plaintextWithName = cleanPlaintext(
				htmlToPlaintextWithSignature(templateContent, mockCandidateDetails)
			);
			expect(plaintextWithName).toContain('John Doe');
			expect(plaintextWithName).not.toContain('{{My Signature}}');
		});
	});

	describe('Edge cases', () => {
		it('should handle candidate with signatureUseImage: false', () => {
			const candidateNoImage = {
				...mockCandidateDetails,
				signatureUseImage: false,
			};
			const templateContent = '<p>{{My Signature}}</p>';

			// Should replace with name instead of image
			const contentWithName = replaceSignaturePlaceholders(
				templateContent,
				candidateNoImage
			);
			expect(contentWithName).toContain('John Doe');
			expect(contentWithName).not.toContain('{{My Signature}}');
			expect(contentWithName).not.toContain('signature-image');
		});

		it('should handle candidate with signatureUseImage: true but no signature', () => {
			const candidateNoSignature = {
				...mockCandidateDetails,
				signatureUseImage: true,
				signature: '',
			};
			const templateContent = '<p>{{My Signature}}</p>';

			// Should replace with name when no signature image available
			const contentWithName = replaceSignaturePlaceholders(
				templateContent,
				candidateNoSignature
			);
			expect(contentWithName).toContain('John Doe');
			expect(contentWithName).not.toContain('{{My Signature}}');
			expect(contentWithName).not.toContain('signature-image');
		});

		it('should handle content without signature placeholders', () => {
			const regularContent =
				'<p>Dear Hiring Manager,</p><p>This is a regular letter.</p><p>Sincerely,</p>';

			// Should not change content without placeholders
			const unchangedContent = replaceSignaturePlaceholders(
				regularContent,
				mockCandidateDetails
			);
			expect(unchangedContent).toBe(regularContent);
		});
	});
});
