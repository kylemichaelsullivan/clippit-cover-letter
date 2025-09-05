import { describe, expect, it, vi, beforeEach } from 'vitest';

import { DocumentGenerationService } from '@/components/features';

// Mock the external dependencies
vi.mock('@/lib/documentGeneration', () => ({
	generateDocuments: vi.fn(),
}));

vi.mock('@/lib/toast', () => ({
	showToast: {
		loading: vi.fn(() => 'mock-toast-id'),
		dismiss: vi.fn(),
		success: vi.fn(),
		error: vi.fn(),
	},
}));

describe('DocumentGenerationService', () => {
	const mockProps = {
		includeCoverLetter: true,
		includeResume: true,
		coverLetterTemplate: 'mock-template',
		candidateDetails: { name: 'John Doe' },
		jobDetails: { title: 'Developer' },
		resumeDetails: { summary: 'mock-summary' },
		skills: ['JavaScript', 'React'],
		includeSkillGroupNames: false,
		onCoverLetterGenerated: vi.fn(),
		onResumeGenerated: vi.fn(),
		onCoverLetterError: vi.fn(),
		onResumeError: vi.fn(),
	};

	let mockGenerateDocuments: ReturnType<typeof vi.fn>;

	beforeEach(async () => {
		vi.clearAllMocks();
		// Get the mocked function from the module
		const { generateDocuments } = await import('@/lib/documentGeneration');
		mockGenerateDocuments = generateDocuments as ReturnType<typeof vi.fn>;

		// Set up default mock return values
		mockGenerateDocuments.mockResolvedValue({
			coverLetter: 'Generated cover letter content',
			resume: 'Generated resume content',
		});
	});

	it('returns an object with generation methods', () => {
		const result = DocumentGenerationService(mockProps);

		expect(result).toHaveProperty('generateDocuments');
		expect(result).toHaveProperty('generateCoverLetter');
		expect(result).toHaveProperty('generateResume');
		expect(typeof result.generateDocuments).toBe('function');
		expect(typeof result.generateCoverLetter).toBe('function');
		expect(typeof result.generateResume).toBe('function');
	});

	it('generateDocuments calls generateDocuments API twice when both documents are included', async () => {
		const result = DocumentGenerationService(mockProps);

		await result.generateDocuments();

		// Should call the API twice - once for cover letter, once for resume
		expect(mockGenerateDocuments).toHaveBeenCalledTimes(2);
	});

	it('generateDocuments calls generateDocuments API once when only cover letter is included', async () => {
		const propsWithoutResume = { ...mockProps, includeResume: false };
		const result = DocumentGenerationService(propsWithoutResume);

		await result.generateDocuments();

		expect(mockGenerateDocuments).toHaveBeenCalledTimes(1);
	});

	it('generateDocuments calls generateDocuments API once when only resume is included', async () => {
		const propsWithoutCoverLetter = { ...mockProps, includeCoverLetter: false };
		const result = DocumentGenerationService(propsWithoutCoverLetter);

		await result.generateDocuments();

		expect(mockGenerateDocuments).toHaveBeenCalledTimes(1);
	});

	it('generateDocuments does nothing when neither document type is included', async () => {
		const propsWithoutDocuments = {
			...mockProps,
			includeCoverLetter: false,
			includeResume: false,
		};
		const result = DocumentGenerationService(propsWithoutDocuments);

		await result.generateDocuments();

		expect(mockGenerateDocuments).not.toHaveBeenCalled();
	});

	it('generateCoverLetter does nothing when includeCoverLetter is false', async () => {
		const propsWithoutCoverLetter = { ...mockProps, includeCoverLetter: false };
		const result = DocumentGenerationService(propsWithoutCoverLetter);

		await result.generateCoverLetter();

		// Should not call any external services or callbacks
		expect(mockProps.onCoverLetterGenerated).not.toHaveBeenCalled();
		expect(mockProps.onCoverLetterError).not.toHaveBeenCalled();
	});

	it('generateResume does nothing when includeResume is false', async () => {
		const propsWithoutResume = { ...mockProps, includeResume: false };
		const result = DocumentGenerationService(propsWithoutResume);

		await result.generateResume();

		// Should not call any external services or callbacks
		expect(mockProps.onResumeGenerated).not.toHaveBeenCalled();
		expect(mockProps.onResumeError).not.toHaveBeenCalled();
	});

	it('generateCoverLetter calls onCoverLetterGenerated with result when successful', async () => {
		const mockResult = { coverLetter: 'Generated cover letter content' };
		mockGenerateDocuments.mockResolvedValue(mockResult);

		const result = DocumentGenerationService(mockProps);

		await result.generateCoverLetter();

		expect(mockProps.onCoverLetterGenerated).toHaveBeenCalledWith(
			mockResult.coverLetter,
		);
	});

	it('generateResume calls onResumeGenerated with result when successful', async () => {
		const mockResult = { resume: 'Generated resume content' };
		mockGenerateDocuments.mockResolvedValue(mockResult);

		const result = DocumentGenerationService(mockProps);

		await result.generateResume();

		expect(mockProps.onResumeGenerated).toHaveBeenCalledWith(mockResult.resume);
	});

	it('generateCoverLetter calls onCoverLetterError when generation fails', async () => {
		mockGenerateDocuments.mockRejectedValue(new Error('Generation failed'));

		const result = DocumentGenerationService(mockProps);

		await result.generateCoverLetter();

		expect(mockProps.onCoverLetterError).toHaveBeenCalledWith(
			'Error generating cover letter. Please try again.',
		);
	});

	it('generateResume calls onResumeError when generation fails', async () => {
		mockGenerateDocuments.mockRejectedValue(new Error('Generation failed'));

		const result = DocumentGenerationService(mockProps);

		await result.generateResume();

		expect(mockProps.onResumeError).toHaveBeenCalledWith(
			'Error generating resume. Please try again.',
		);
	});
});
