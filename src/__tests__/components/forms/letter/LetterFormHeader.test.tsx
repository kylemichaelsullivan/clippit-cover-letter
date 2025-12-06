import { LetterFormHeader } from '@/components/forms/letter/LetterFormHeader';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('LetterFormHeader', () => {
	const mockOnOpenHelp = vi.fn();

	beforeEach(() => {
		mockOnOpenHelp.mockClear();
	});

	it('renders title and help button', () => {
		render(<LetterFormHeader onOpenHelp={mockOnOpenHelp} />);

		expect(screen.getByText('Cover Letter Template')).toBeInTheDocument();
		expect(screen.getByTitle('Template Variables Help')).toBeInTheDocument();
	});

	it('calls onOpenHelp when help button is clicked', () => {
		render(<LetterFormHeader onOpenHelp={mockOnOpenHelp} />);

		fireEvent.click(screen.getByTitle('Template Variables Help'));
		expect(mockOnOpenHelp).toHaveBeenCalledTimes(1);
	});

	it('has correct button styling and attributes', () => {
		render(<LetterFormHeader onOpenHelp={mockOnOpenHelp} />);

		const helpButton = screen.getByTitle('Template Variables Help');
		expect(helpButton).toHaveClass('h-10', 'px-4', 'py-2'); // size="md" classes
		expect(helpButton).toHaveClass('bg-blue', 'border-blue'); // color="primary" classes
	});

	it('has correct title component attributes', () => {
		render(<LetterFormHeader onOpenHelp={mockOnOpenHelp} />);

		const title = screen.getByText('Cover Letter Template');
		expect(title).toBeInTheDocument();
	});
});
