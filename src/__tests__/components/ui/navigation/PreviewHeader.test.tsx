import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PreviewHeader } from '@/components/features';

describe('PreviewHeader', () => {
	it('renders the preview title', () => {
		render(<PreviewHeader />);

		expect(screen.getByText('Preview')).toBeInTheDocument();
	});

	it('renders document selection controls', () => {
		render(<PreviewHeader />);

		// The DocumentSelectionControls component should be rendered
		// We can't easily test its internal content without mocking, but we can verify it's rendered
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('has correct layout classes', () => {
		render(<PreviewHeader />);

		const headerContainer = screen
			.getByText('Preview')
			.closest('div')?.parentElement;
		expect(headerContainer).toHaveClass(
			'flex',
			'items-center',
			'justify-between'
		);
	});
});
