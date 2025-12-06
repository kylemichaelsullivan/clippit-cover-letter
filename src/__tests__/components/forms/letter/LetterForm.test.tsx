import { LetterForm } from '@/components/forms/letter/LetterForm';
import { useHelpModal } from '@/lib/hooks/useHelpModal';
import { useLetterForm } from '@/lib/hooks/useLetterForm';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the hooks
vi.mock('@/lib/hooks/useLetterForm');
vi.mock('@/lib/hooks/useHelpModal');

// Mock the child components
vi.mock('@/components/forms/letter/LetterFormHeader', () => ({
	LetterFormHeader: ({ onOpenHelp }: { onOpenHelp: () => void }) => (
		<div data-testid='letter-form-header'>
			<button onClick={onOpenHelp}>Open Help</button>
		</div>
	),
}));

vi.mock('@/components/forms/letter/CoverLetterSection', () => ({
	CoverLetterSection: ({ onFieldChange }: any) => (
		<div data-testid='cover-letter-section'>
			<input
				type='checkbox'
				onChange={(e) => onFieldChange('includeCoverLetter', e.target.checked)}
			/>
		</div>
	),
}));

describe('LetterForm', () => {
	const mockOnSubmit = vi.fn();
	const mockForm = { handleSubmit: vi.fn() } as any;
	const mockHandleFieldChange = vi.fn();
	const mockOpenModal = vi.fn();
	const mockCloseModal = vi.fn();

	beforeEach(() => {
		vi.mocked(useLetterForm).mockReturnValue({
			form: mockForm,
			handleFieldChange: mockHandleFieldChange,
		});

		vi.mocked(useHelpModal).mockReturnValue({
			isOpen: false,
			openModal: mockOpenModal,
			closeModal: mockCloseModal,
		});

		mockOnSubmit.mockClear();
		mockForm.handleSubmit.mockClear();
		mockHandleFieldChange.mockClear();
		mockOpenModal.mockClear();
		mockCloseModal.mockClear();
	});

	it('renders letter form with header and content', () => {
		render(<LetterForm onSubmit={mockOnSubmit} />);

		expect(screen.getByTestId('letter-form-header')).toBeInTheDocument();
		expect(screen.getByTestId('cover-letter-section')).toBeInTheDocument();
	});

	it('calls form submit when form is submitted', () => {
		render(<LetterForm onSubmit={mockOnSubmit} />);

		const form = screen.getByTestId('cover-letter-section').closest('form');
		expect(form).toBeInTheDocument();
		fireEvent.submit(form!);
		expect(mockForm.handleSubmit).toHaveBeenCalledTimes(1);
	});

	it('opens help modal when header help button is clicked', () => {
		render(<LetterForm onSubmit={mockOnSubmit} />);

		fireEvent.click(screen.getByText('Open Help'));
		expect(mockOpenModal).toHaveBeenCalledTimes(1);
	});

	it('renders with correct CSS classes', () => {
		render(<LetterForm onSubmit={mockOnSubmit} />);

		const container = screen.getByTestId('letter-form-header').parentElement;
		expect(container).toHaveClass('LetterForm', 'flex', 'flex-col', 'gap-6');
	});
});
