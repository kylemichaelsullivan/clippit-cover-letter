import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PreviewLayout } from '@/components/features';

describe('PreviewLayout', () => {
	const mockChildren = <div data-testid='mock-children'>Mock Content</div>;

	it('renders with correct main container classes', () => {
		render(
			<PreviewLayout
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={false}
			>
				{mockChildren}
			</PreviewLayout>
		);

		const mainContainer = screen
			.getByText('Mock Content')
			.closest('.PreviewContent');
		expect(mainContainer).toHaveClass(
			'PreviewContent',
			'flex',
			'flex-col',
			'gap-12'
		);
	});

	it('renders PreviewHeader component', () => {
		render(
			<PreviewLayout
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={false}
			>
				{mockChildren}
			</PreviewLayout>
		);

		// Should render the Preview title
		expect(screen.getByText('Preview')).toBeInTheDocument();
	});

	it('renders PreviewStateManager with correct props when not processing', () => {
		render(
			<PreviewLayout
				hasData={false}
				hasSelectedDocuments={false}
				isProcessing={false}
			>
				{mockChildren}
			</PreviewLayout>
		);

		// When hasData is false, children should not be rendered
		expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
		// Should show EmptyState instead
		expect(screen.getByText('No Data Available')).toBeInTheDocument();
	});

	it('renders loading state when processing', () => {
		render(
			<PreviewLayout
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={true}
			>
				{mockChildren}
			</PreviewLayout>
		);

		// When processing, should show loading state
		expect(screen.getByText('Generating Documents')).toBeInTheDocument();
		expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
	});

	it('renders children when both conditions are met and not processing', () => {
		render(
			<PreviewLayout
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={false}
			>
				{mockChildren}
			</PreviewLayout>
		);

		expect(screen.getByTestId('mock-children')).toBeInTheDocument();
		expect(screen.getByText('Mock Content')).toBeInTheDocument();
	});

	it('has correct nested structure', () => {
		render(
			<PreviewLayout
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={false}
			>
				{mockChildren}
			</PreviewLayout>
		);

		const mainContainer = screen
			.getByText('Mock Content')
			.closest('.PreviewContent');
		const contentWrapper = mainContainer?.querySelector('div:last-child');

		expect(contentWrapper).toHaveClass('flex', 'flex-col', 'gap-4');
	});

	it('handles multiple children correctly', () => {
		const multipleChildren = (
			<>
				<div data-testid='child-1'>Child 1</div>
				<div data-testid='child-2'>Child 2</div>
			</>
		);

		render(
			<PreviewLayout
				hasData={true}
				hasSelectedDocuments={true}
				isProcessing={false}
			>
				{multipleChildren}
			</PreviewLayout>
		);

		expect(screen.getByTestId('child-1')).toBeInTheDocument();
		expect(screen.getByTestId('child-2')).toBeInTheDocument();
	});
});
