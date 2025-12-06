import { ConfirmationDialog } from '@/components/ui/feedback/ConfirmationDialog';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('ConfirmationDialog with Selective Generation', () => {
	const mockOnClose = vi.fn();
	const mockOnConfirm = vi.fn();

	const defaultProps = {
		isOpen: true,
		onClose: mockOnClose,
		onConfirm: mockOnConfirm,
		title: 'Test Dialog',
		message: 'Test message',
		availableItems: [
			{ id: 'skills', label: 'Skills Summary', checked: true },
			{ id: 'coverLetter', label: 'Cover Letter', checked: true },
			{ id: 'resume', label: 'Resume', checked: false },
		],
		confirmText: 'Generate Selected',
		cancelText: 'Cancel',
	};

	it('renders dialog when open', () => {
		render(<ConfirmationDialog {...defaultProps} />);

		expect(screen.getByText('Test Dialog')).toBeInTheDocument();
		expect(screen.getByText('Test message')).toBeInTheDocument();
		expect(screen.getByText('Skills Summary')).toBeInTheDocument();
		expect(screen.getByText('Cover Letter')).toBeInTheDocument();
		expect(screen.getByText('Resume')).toBeInTheDocument();
	});

	it('does not render when closed', () => {
		render(<ConfirmationDialog {...defaultProps} isOpen={false} />);

		expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
	});

	it('initializes with checked items selected', () => {
		render(<ConfirmationDialog {...defaultProps} />);

		const skillsCheckbox = screen.getByLabelText(
			'Skills Summary'
		) as HTMLInputElement;
		const coverLetterCheckbox = screen.getByLabelText(
			'Cover Letter'
		) as HTMLInputElement;
		const resumeCheckbox = screen.getByLabelText('Resume') as HTMLInputElement;

		expect(skillsCheckbox.checked).toBe(true);
		expect(coverLetterCheckbox.checked).toBe(true);
		expect(resumeCheckbox.checked).toBe(false);
	});

	it('allows toggling checkboxes', () => {
		render(<ConfirmationDialog {...defaultProps} />);

		const skillsCheckbox = screen.getByLabelText(
			'Skills Summary'
		) as HTMLInputElement;
		const resumeCheckbox = screen.getByLabelText('Resume') as HTMLInputElement;

		fireEvent.click(skillsCheckbox);
		fireEvent.click(resumeCheckbox);

		expect(skillsCheckbox.checked).toBe(false);
		expect(resumeCheckbox.checked).toBe(true);
	});

	it('calls onClose when cancel button is clicked', () => {
		render(<ConfirmationDialog {...defaultProps} />);

		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it('calls onConfirm with selected items when confirm button is clicked', async () => {
		render(<ConfirmationDialog {...defaultProps} />);

		const confirmButton = screen.getByText('Generate Selected');
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(mockOnConfirm).toHaveBeenCalledWith(['skills', 'coverLetter']);
		});
	});

	it('disables confirm button when no items are selected', () => {
		render(<ConfirmationDialog {...defaultProps} />);

		const skillsCheckbox = screen.getByLabelText(
			'Skills Summary'
		) as HTMLInputElement;
		const coverLetterCheckbox = screen.getByLabelText(
			'Cover Letter'
		) as HTMLInputElement;

		fireEvent.click(skillsCheckbox);
		fireEvent.click(coverLetterCheckbox);

		const confirmButton = screen.getByText('Generate Selected');
		expect(confirmButton).toBeDisabled();
	});
});
