import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PreviewStateManager } from '@/components/features';

describe('PreviewStateManager', () => {
	const mockChildren = <div data-testid='mock-children'>Mock Content</div>;

	it('shows loading state when isProcessing is true', () => {
		render(
			<PreviewStateManager
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={true}
			>
				{mockChildren}
			</PreviewStateManager>
		);

		expect(screen.getByText('Generating Documents')).toBeInTheDocument();
		expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
	});

	it('shows no-data state when hasData is false', () => {
		render(
			<PreviewStateManager
				hasData={false}
				hasSelectedDocuments={false}
				isProcessing={false}
			>
				{mockChildren}
			</PreviewStateManager>
		);

		expect(screen.getByText('No Data Available')).toBeInTheDocument();
		expect(
			screen.getByText(
				'Please complete the previous steps to see a preview of your documents.'
			)
		).toBeInTheDocument();
		expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
	});

	it('shows no-documents-selected state when hasData is true but hasSelectedDocuments is false', () => {
		render(
			<PreviewStateManager
				hasData={true}
				hasSelectedDocuments={false}
				isProcessing={false}
			>
				{mockChildren}
			</PreviewStateManager>
		);

		expect(screen.getByText('No Documents Selected')).toBeInTheDocument();
		expect(
			screen.getByText('Please select at least one document type to generate.')
		).toBeInTheDocument();
		expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
	});

	it('shows children when both hasData and hasSelectedDocuments are true and not processing', () => {
		render(
			<PreviewStateManager
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={false}
			>
				{mockChildren}
			</PreviewStateManager>
		);

		expect(screen.getByTestId('mock-children')).toBeInTheDocument();
		expect(screen.getByText('Mock Content')).toBeInTheDocument();
	});

	it('applies correct layout classes when showing children', () => {
		render(
			<PreviewStateManager
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={false}
			>
				{mockChildren}
			</PreviewStateManager>
		);

		const childrenContainer = screen.getByTestId('mock-children').parentElement;
		expect(childrenContainer).toHaveClass('flex', 'flex-col', 'gap-8');
	});

	it('handles multiple children correctly', () => {
		const multipleChildren = (
			<>
				<div data-testid='child-1'>Child 1</div>
				<div data-testid='child-2'>Child 2</div>
			</>
		);

		render(
			<PreviewStateManager
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={false}
			>
				{multipleChildren}
			</PreviewStateManager>
		);

		expect(screen.getByTestId('child-1')).toBeInTheDocument();
		expect(screen.getByTestId('child-2')).toBeInTheDocument();
	});

	it('prioritizes loading state over no-data state', () => {
		render(
			<PreviewStateManager
				hasData={false}
				hasSelectedDocuments={false}
				isProcessing={true}
			>
				{mockChildren}
			</PreviewStateManager>
		);

		expect(screen.getByText('Generating Documents')).toBeInTheDocument();
		expect(screen.queryByText('No Data Available')).not.toBeInTheDocument();
		expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
	});

	it('prioritizes loading state over no-documents-selected state', () => {
		render(
			<PreviewStateManager
				hasData={true}
				hasSelectedDocuments={false}
				isProcessing={true}
			>
				{mockChildren}
			</PreviewStateManager>
		);

		expect(screen.getByText('Generating Documents')).toBeInTheDocument();
		expect(screen.queryByText('No Documents Selected')).not.toBeInTheDocument();
		expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
	});
});
