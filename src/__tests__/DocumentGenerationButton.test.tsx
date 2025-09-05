import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DocumentGenerationButton } from '@/components/features';

describe('DocumentGenerationButton', () => {
	const mockOnClick = vi.fn();

	it('renders with correct button text when not generating', () => {
		render(
			<DocumentGenerationButton isGenerating={false} onClick={mockOnClick} />,
		);

		expect(screen.getByText('Generate Documents')).toBeInTheDocument();
	});

	it('renders with correct button text when generating', () => {
		render(
			<DocumentGenerationButton isGenerating={true} onClick={mockOnClick} />,
		);

		// When generating, should show spinner icon, not text
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('calls onClick when clicked', () => {
		render(
			<DocumentGenerationButton isGenerating={false} onClick={mockOnClick} />,
		);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('is disabled when isGenerating is true', () => {
		render(
			<DocumentGenerationButton isGenerating={true} onClick={mockOnClick} />,
		);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('is disabled when disabled prop is true', () => {
		render(
			<DocumentGenerationButton
				isGenerating={false}
				onClick={mockOnClick}
				disabled={true}
			/>,
		);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('is disabled when both isGenerating and disabled are true', () => {
		render(
			<DocumentGenerationButton
				isGenerating={true}
				onClick={mockOnClick}
				disabled={true}
			/>,
		);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('has correct button size and color', () => {
		render(
			<DocumentGenerationButton isGenerating={false} onClick={mockOnClick} />,
		);

		const button = screen.getByRole('button');
		expect(button).toHaveClass('bg-blue', 'text-white');
	});

	it('has correct container classes', () => {
		render(
			<DocumentGenerationButton isGenerating={false} onClick={mockOnClick} />,
		);

		const container = screen.getByText('Generate Documents').closest('div');
		expect(container).toHaveClass('GenerateButton', 'w-full');
	});
});
