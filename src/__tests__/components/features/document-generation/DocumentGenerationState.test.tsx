import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DocumentGenerationState } from '@/components/results/panels';

vi.mock('@/components/ui/feedback', () => ({
	EmptyState: ({ variant }: any) => (
		<div data-testid='empty-state' data-variant={variant}>
			Empty State - {variant}
		</div>
	),
}));

describe('DocumentGenerationState', () => {
	it('renders no-results empty state when no documents selected', () => {
		render(
			<DocumentGenerationState
				hasSelectedDocuments={false}
				hasContent={false}
			/>
		);

		expect(screen.getByTestId('empty-state')).toBeInTheDocument();
		expect(screen.getByTestId('empty-state')).toHaveAttribute(
			'data-variant',
			'no-results'
		);
	});

	it('renders no-data empty state when documents selected but no content', () => {
		render(
			<DocumentGenerationState hasSelectedDocuments={true} hasContent={false} />
		);

		expect(screen.getByTestId('empty-state')).toBeInTheDocument();
		expect(screen.getByTestId('empty-state')).toHaveAttribute(
			'data-variant',
			'no-data'
		);
	});

	it('renders generating state when isGenerating is true', () => {
		render(
			<DocumentGenerationState
				hasSelectedDocuments={true}
				hasContent={true}
				isGenerating={true}
				title='Cover Letter'
			/>
		);

		expect(screen.getByText('Generating Cover Letter…')).toBeInTheDocument();
		expect(screen.getByText('Generating Cover Letter…')).toHaveClass(
			'ResultsDocumentContentGeneratingText',
			'text-light-gray',
			'flex',
			'min-h-64',
			'w-full',
			'items-center',
			'justify-center',
			'p-8',
			'text-center',
			'font-mono',
			'sm:min-h-96',
			'sm:text-base'
		);
	});

	it('renders nothing when has content and not generating', () => {
		const { container } = render(
			<DocumentGenerationState
				hasSelectedDocuments={true}
				hasContent={true}
				isGenerating={false}
			/>
		);

		expect(container.firstChild).toBeNull();
	});

	it('uses default title when not provided', () => {
		render(
			<DocumentGenerationState
				hasSelectedDocuments={true}
				hasContent={true}
				isGenerating={true}
			/>
		);

		expect(screen.getByText('Generating Document…')).toBeInTheDocument();
	});

	it('uses custom empty state variant', () => {
		render(
			<DocumentGenerationState
				hasSelectedDocuments={false}
				hasContent={false}
				emptyStateVariant='no-data'
			/>
		);

		expect(screen.getByTestId('empty-state')).toHaveAttribute(
			'data-variant',
			'no-data'
		);
	});

	it('applies custom className to generating state', () => {
		const { container } = render(
			<DocumentGenerationState
				hasSelectedDocuments={true}
				hasContent={true}
				isGenerating={true}
				className='custom-class'
			/>
		);

		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('has correct CSS classes for generating state container', () => {
		const { container } = render(
			<DocumentGenerationState
				hasSelectedDocuments={true}
				hasContent={true}
				isGenerating={true}
			/>
		);

		expect(container.firstChild).toHaveClass(
			'ResultsDocumentContentGenerating',
			'print-content',
			'print-document',
			'border-light-gray',
			'force-white-bg',
			'border'
		);
	});

	it('prioritizes generating state over empty states', () => {
		render(
			<DocumentGenerationState
				hasSelectedDocuments={true}
				hasContent={true}
				isGenerating={true}
				title='Resume'
			/>
		);

		expect(screen.getByText('Generating Resume…')).toBeInTheDocument();
		expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
	});
});
