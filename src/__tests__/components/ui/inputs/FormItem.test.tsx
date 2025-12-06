import { FormItem } from '@/components/forms/core/FormItem';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('FormItem', () => {
	it('renders children correctly', () => {
		render(
			<FormItem>
				<div data-testid='test-child'>Test Content</div>
			</FormItem>
		);

		expect(screen.getByTestId('test-child')).toBeInTheDocument();
		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('renders without remove button when onRemove is not provided', () => {
		render(
			<FormItem>
				<div>Test Content</div>
			</FormItem>
		);

		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('renders remove button when onRemove is provided', () => {
		const mockOnRemove = vi.fn();
		render(
			<FormItem onRemove={mockOnRemove}>
				<div>Test Content</div>
			</FormItem>
		);

		const removeButton = screen.getByRole('button');
		expect(removeButton).toBeInTheDocument();
		expect(removeButton).toHaveAttribute('title', 'Remove this item');
	});

	it('calls onRemove when remove button is clicked', () => {
		const mockOnRemove = vi.fn();
		render(
			<FormItem onRemove={mockOnRemove}>
				<div>Test Content</div>
			</FormItem>
		);

		const removeButton = screen.getByRole('button');
		fireEvent.click(removeButton);

		expect(mockOnRemove).toHaveBeenCalledTimes(1);
	});

	it('uses custom remove button title when provided', () => {
		const mockOnRemove = vi.fn();
		render(
			<FormItem onRemove={mockOnRemove} removeButtonTitle='Custom Remove Text'>
				<div>Test Content</div>
			</FormItem>
		);

		const removeButton = screen.getByRole('button');
		expect(removeButton).toHaveAttribute('title', 'Custom Remove Text');
	});

	it('applies custom className when provided', () => {
		render(
			<FormItem className='custom-class'>
				<div>Test Content</div>
			</FormItem>
		);

		const formItem = screen.getByText('Test Content').closest('.FormItem');
		expect(formItem).toHaveClass('custom-class');
	});

	it('has correct default structure and classes', () => {
		render(
			<FormItem>
				<div>Test Content</div>
			</FormItem>
		);

		const formItem = screen.getByText('Test Content').closest('.FormItem');
		expect(formItem).toHaveClass('FormItem', 'flex', 'flex-col', 'gap-3');
	});
});
