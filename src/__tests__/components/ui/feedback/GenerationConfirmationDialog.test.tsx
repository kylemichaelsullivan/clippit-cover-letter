import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { GenerationConfirmationDialog } from '@/components/features';

describe('GenerationConfirmationDialog', () => {
	const defaultProps = {
		title: 'Test Confirmation',
		message: 'Are you sure you want to proceed?',
		isOpen: true,
		onClose: vi.fn(),
		onConfirm: vi.fn(),
	};

	it('renders with correct title and message', () => {
		render(<GenerationConfirmationDialog {...defaultProps} />);

		expect(screen.getByText('Test Confirmation')).toBeInTheDocument();
		expect(
			screen.getByText('Are you sure you want to proceed?')
		).toBeInTheDocument();
	});

	it('renders with default confirm and cancel text when not provided', () => {
		render(<GenerationConfirmationDialog {...defaultProps} />);

		expect(screen.getByText('Generate New')).toBeInTheDocument();
		expect(screen.getByText('Cancel')).toBeInTheDocument();
	});

	it('renders with custom confirm and cancel text when provided', () => {
		const customProps = {
			...defaultProps,
			confirmText: 'Yes, Proceed',
			cancelText: 'No, Stop',
		};

		render(<GenerationConfirmationDialog {...customProps} />);

		expect(screen.getByText('Yes, Proceed')).toBeInTheDocument();
		expect(screen.getByText('No, Stop')).toBeInTheDocument();
	});

	it('calls onConfirm when confirm button is clicked', () => {
		render(<GenerationConfirmationDialog {...defaultProps} />);

		const confirmButton = screen.getByText('Generate New');
		fireEvent.click(confirmButton);

		expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
	});

	it('calls onClose when cancel button is clicked', () => {
		render(<GenerationConfirmationDialog {...defaultProps} />);

		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);

		expect(defaultProps.onClose).toHaveBeenCalled();
	});

	it('calls onClose when close button is clicked', () => {
		render(<GenerationConfirmationDialog {...defaultProps} />);

		const closeButton = screen.getByRole('button', { name: /close/i });
		fireEvent.click(closeButton);

		expect(defaultProps.onClose).toHaveBeenCalled();
	});

	it('does not render when isOpen is false', () => {
		const closedProps = { ...defaultProps, isOpen: false };

		render(<GenerationConfirmationDialog {...closedProps} />);

		expect(screen.queryByText('Test Confirmation')).not.toBeInTheDocument();
		expect(
			screen.queryByText('Are you sure you want to proceed?')
		).not.toBeInTheDocument();
	});

	it('has correct button types and accessibility', () => {
		render(<GenerationConfirmationDialog {...defaultProps} />);

		const confirmButton = screen.getByText('Generate New');
		const cancelButton = screen.getByText('Cancel');

		expect(confirmButton).toHaveAttribute('type', 'button');
		expect(cancelButton).toHaveAttribute('type', 'button');
	});

	it('handles multiple renders correctly', () => {
		const { rerender } = render(
			<GenerationConfirmationDialog {...defaultProps} />
		);

		// First render
		expect(screen.getByText('Test Confirmation')).toBeInTheDocument();

		// Re-render with different props
		const newProps = {
			...defaultProps,
			title: 'New Confirmation',
			message: 'New message content',
		};

		rerender(<GenerationConfirmationDialog {...newProps} />);

		expect(screen.getByText('New Confirmation')).toBeInTheDocument();
		expect(screen.getByText('New message content')).toBeInTheDocument();
		expect(screen.queryByText('Test Confirmation')).not.toBeInTheDocument();
	});
});
