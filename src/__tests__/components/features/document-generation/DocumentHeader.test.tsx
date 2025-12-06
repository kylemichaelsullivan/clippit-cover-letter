import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DocumentHeader } from '@/components/results/panels';

describe('DocumentHeader', () => {
	const defaultProps = {
		title: 'Test Document',
	};

	it('renders document title', () => {
		render(<DocumentHeader {...defaultProps} />);

		expect(screen.getByText('Test Document')).toBeInTheDocument();
		expect(screen.getByText('Test Document').closest('label')).toHaveClass(
			'DocumentContentTitle'
		);
	});

	it('renders fontSizeInput when provided', () => {
		const fontSizeInput = (
			<div data-testid='font-size-input'>Font Size Input</div>
		);

		render(<DocumentHeader {...defaultProps} fontSizeInput={fontSizeInput} />);

		expect(screen.getByTestId('font-size-input')).toBeInTheDocument();
	});

	it('renders headerElement when provided', () => {
		const headerElement = (
			<div data-testid='header-element'>Header Element</div>
		);

		render(<DocumentHeader {...defaultProps} headerElement={headerElement} />);

		expect(screen.getByTestId('header-element')).toBeInTheDocument();
	});

	it('renders both fontSizeInput and headerElement when provided', () => {
		const fontSizeInput = (
			<div data-testid='font-size-input'>Font Size Input</div>
		);
		const headerElement = (
			<div data-testid='header-element'>Header Element</div>
		);

		render(
			<DocumentHeader
				{...defaultProps}
				fontSizeInput={fontSizeInput}
				headerElement={headerElement}
			/>
		);

		expect(screen.getByTestId('font-size-input')).toBeInTheDocument();
		expect(screen.getByTestId('header-element')).toBeInTheDocument();
	});

	it('applies custom className', () => {
		const { container } = render(
			<DocumentHeader {...defaultProps} className='custom-class' />
		);

		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('has correct structure with flex layout', () => {
		const { container } = render(<DocumentHeader {...defaultProps} />);

		const headerElement = container.firstChild as HTMLElement;
		expect(headerElement).toHaveClass(
			'flex',
			'items-center',
			'justify-between'
		);
	});

	it('title has correct styling classes', () => {
		render(<DocumentHeader {...defaultProps} />);

		const titleElement = screen.getByText('Test Document').closest('label');
		expect(titleElement).toHaveClass(
			'DocumentContentTitle',
			'text-lg',
			'font-semibold',
			'text-black'
		);
	});
});
