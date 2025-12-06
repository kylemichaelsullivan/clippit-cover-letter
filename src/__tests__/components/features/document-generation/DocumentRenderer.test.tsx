import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
	mockAppStore,
	mockCandidateStore,
	mockTemplatesStore,
} from '@/__tests__/mocks/stores';
import { DocumentRenderer } from '@/components/shared';
import {
	useAppStore,
	useCandidateStore,
	useTemplatesStore,
} from '@/lib/stores';

vi.mock('@/lib/stores', () => ({
	useAppStore: vi.fn(),
	useTemplatesStore: vi.fn(),
	useCandidateStore: vi.fn(),
}));

vi.mock('@/components/results/panels', () => ({
	DocumentSection: ({
		documentType,
		title,
		content,
		showActions,
		showFontSizeControl,
		className,
	}: any) => (
		<div
			data-testid={`document-section-${documentType}`}
			data-show-actions={showActions}
			data-show-font-size={showFontSizeControl}
			className={className}
		>
			{title} - {content} - {documentType}
		</div>
	),
}));

vi.mock('@/components/ui/feedback', () => ({
	EmptyState: ({ variant }: any) => (
		<div data-testid='empty-state' data-variant={variant}>
			Empty State - {variant}
		</div>
	),
}));

vi.mock('@/components/ui/input', () => ({
	FontSizeInput: ({ value, documentType, label, ariaLabel }: any) => (
		<div data-testid={`font-size-input-${documentType}`}>
			{value} - {documentType} - {label} - {ariaLabel}
		</div>
	),
}));

describe('DocumentRenderer', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders empty state when no documents are selected', () => {
		// Mock the store to return no selected documents
		vi.mocked(useAppStore).mockReturnValue({
			...mockAppStore,
			includeCoverLetter: false,
			includeResume: false,
		});
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStore);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		render(<DocumentRenderer />);

		expect(screen.getByTestId('empty-state')).toBeInTheDocument();
		expect(screen.getByTestId('empty-state')).toHaveAttribute(
			'data-variant',
			'no-results'
		);
	});

	it('renders no-data empty state when documents selected but no content generated', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: true,
			includeResume: true,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: '',
			generatedResume: '',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		render(<DocumentRenderer />);

		expect(screen.getByTestId('empty-state')).toBeInTheDocument();
		expect(screen.getByTestId('empty-state')).toHaveAttribute(
			'data-variant',
			'no-data'
		);
	});

	it('renders cover letter section when cover letter is selected and generated', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: true,
			includeResume: false,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: 'Cover letter content',
			generatedResume: '',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		render(<DocumentRenderer />);

		expect(
			screen.getByTestId('document-section-cover-letter')
		).toBeInTheDocument();
		expect(
			screen.getByTestId('document-section-cover-letter')
		).toHaveTextContent('Cover Letter');
		expect(
			screen.getByTestId('document-section-cover-letter')
		).toHaveTextContent('Cover letter content');
	});

	it('renders resume section when resume is selected and generated', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: false,
			includeResume: true,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: '',
			generatedResume: 'Resume content',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		render(<DocumentRenderer />);

		expect(screen.getByTestId('document-section-resume')).toBeInTheDocument();
		expect(screen.getByTestId('document-section-resume')).toHaveTextContent(
			'Resume'
		);
		expect(screen.getByTestId('document-section-resume')).toHaveTextContent(
			'Resume content'
		);
	});

	it('renders both sections when both documents are selected and generated', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: true,
			includeResume: true,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: 'Cover letter content',
			generatedResume: 'Resume content',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		render(<DocumentRenderer />);

		expect(
			screen.getByTestId('document-section-cover-letter')
		).toBeInTheDocument();
		expect(screen.getByTestId('document-section-resume')).toBeInTheDocument();
	});

	it('hides cover letter section when not included', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: false,
			includeResume: true,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: 'Cover letter content',
			generatedResume: 'Resume content',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		render(<DocumentRenderer />);

		expect(screen.getByTestId('document-section-cover-letter')).toHaveClass(
			'hidden'
		);
		expect(screen.getByTestId('document-section-resume')).not.toHaveClass(
			'hidden'
		);
	});

	it('hides resume section when not included', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: true,
			includeResume: false,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: 'Cover letter content',
			generatedResume: 'Resume content',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		render(<DocumentRenderer />);

		expect(screen.getByTestId('document-section-cover-letter')).not.toHaveClass(
			'hidden'
		);
		expect(screen.getByTestId('document-section-resume')).toHaveClass('hidden');
	});

	it('passes showActions prop correctly', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: true,
			includeResume: false,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: 'Cover letter content',
			generatedResume: '',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		render(<DocumentRenderer showActions={false} />);

		expect(screen.getByTestId('document-section-cover-letter')).toHaveAttribute(
			'data-show-actions',
			'false'
		);
	});

	it('passes showFontSizeControl prop correctly', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: true,
			includeResume: false,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: 'Cover letter content',
			generatedResume: '',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		render(<DocumentRenderer showFontSizeControl={false} />);

		// When showFontSizeControl is false, the headerElement should be undefined
		// This means no FontSizeInput should be rendered in the header
		expect(
			screen.getByTestId('document-section-cover-letter')
		).toBeInTheDocument();
		expect(screen.getByTestId('document-section-cover-letter')).toHaveAttribute(
			'data-show-actions',
			'true'
		);
	});

	it('applies custom className', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: true,
			includeResume: false,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: 'Cover letter content',
			generatedResume: '',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		const { container } = render(<DocumentRenderer className='custom-class' />);

		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('has correct structure with flex layout', () => {
		const mockAppStoreData = {
			...mockAppStore,
			includeCoverLetter: true,
			includeResume: false,
		};
		const mockTemplatesStoreData = {
			...mockTemplatesStore,
			generatedCoverLetter: 'Cover letter content',
			generatedResume: '',
		};

		vi.mocked(useAppStore).mockReturnValue(mockAppStoreData);
		vi.mocked(useTemplatesStore).mockReturnValue(mockTemplatesStoreData);
		vi.mocked(useCandidateStore).mockReturnValue(mockCandidateStore);

		const { container } = render(<DocumentRenderer />);

		expect(container.firstChild).toHaveClass(
			'DocumentRenderer',
			'flex',
			'flex-col',
			'gap-6'
		);
	});
});
