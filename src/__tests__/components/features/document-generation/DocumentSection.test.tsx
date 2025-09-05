import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DocumentSection } from '@/components/results/panels';
import { mockCandidateStore } from '@/__tests__/mocks/stores';

vi.mock('@/lib/stores', () => ({
	useCandidateStore: () => mockCandidateStore,
}));

vi.mock('@/components/results/actions', () => ({
	ActionButtons: ({ text, documentType, filename }: any) => (
		<div data-testid='action-buttons'>
			{text} - {documentType} - {filename}
		</div>
	),
}));

vi.mock('@/components/results/panels/DocumentContent', () => ({
	DocumentContent: ({ title, content, documentType, fontSize }: any) => (
		<div data-testid='document-content'>
			{title} - {content} - {documentType} - {fontSize}
		</div>
	),
}));

describe('DocumentSection', () => {
	const defaultProps = {
		documentType: 'cover-letter' as const,
		title: 'Cover Letter',
		content: 'Test content',
		fontSize: [12, 'pt'] as [number, 'pt'],
	};

	it('renders document content and action buttons when content is provided', () => {
		render(<DocumentSection {...defaultProps} />);

		expect(screen.getByTestId('document-content')).toBeInTheDocument();
		expect(screen.getByTestId('action-buttons')).toBeInTheDocument();
	});

	it('does not render when content is empty', () => {
		render(<DocumentSection {...defaultProps} content='' />);

		expect(screen.queryByTestId('document-content')).not.toBeInTheDocument();
		expect(screen.queryByTestId('action-buttons')).not.toBeInTheDocument();
	});

	it('does not render when content is only whitespace', () => {
		render(<DocumentSection {...defaultProps} content='   ' />);

		expect(screen.queryByTestId('document-content')).not.toBeInTheDocument();
		expect(screen.queryByTestId('action-buttons')).not.toBeInTheDocument();
	});

	it('hides action buttons when showActions is false', () => {
		render(<DocumentSection {...defaultProps} showActions={false} />);

		expect(screen.getByTestId('document-content')).toBeInTheDocument();
		expect(screen.queryByTestId('action-buttons')).not.toBeInTheDocument();
	});

	it('passes correct props to DocumentContent', () => {
		render(<DocumentSection {...defaultProps} />);

		const documentContent = screen.getByTestId('document-content');
		expect(documentContent).toHaveTextContent('Cover Letter');
		expect(documentContent).toHaveTextContent('Test content');
		expect(documentContent).toHaveTextContent('cover-letter');
		expect(documentContent).toHaveTextContent('12pt');
	});

	it('passes correct props to ActionButtons', () => {
		render(<DocumentSection {...defaultProps} />);

		const actionButtons = screen.getByTestId('action-buttons');
		expect(actionButtons).toHaveTextContent('Test content');
		expect(actionButtons).toHaveTextContent('cover-letter');
		expect(actionButtons).toHaveTextContent('cover-letter');
	});

	it('uses resume filename for resume document type', () => {
		render(
			<DocumentSection
				{...defaultProps}
				documentType='resume'
				title='Resume'
			/>,
		);

		const actionButtons = screen.getByTestId('action-buttons');
		expect(actionButtons).toHaveTextContent('resume');
	});

	it('applies custom className', () => {
		const { container } = render(
			<DocumentSection {...defaultProps} className='custom-class' />,
		);

		expect(container.firstChild).toHaveClass('custom-class');
	});
});
