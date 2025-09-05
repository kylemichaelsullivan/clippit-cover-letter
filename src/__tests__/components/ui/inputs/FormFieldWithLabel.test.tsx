import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormFieldWithLabel } from '@/components/forms/core/FormFieldWithLabel';
import { createMockForm } from '@/__tests__/utils/test-helpers';

// Mock TanStack Form
vi.mock('@tanstack/react-form', () => ({
	Field: ({ children }: any) => {
		const mockField = {
			state: { value: '' },
			handleChange: vi.fn(),
		};
		return children(mockField);
	},
}));

describe('FormFieldWithLabel', () => {
	const mockForm = createMockForm();
	const defaultProps = {
		form: mockForm,
		label: 'Company',
		fieldName: 'company',
		fieldPath: 'experience',
		index: 0,
		placeholder: 'Enter company name',
		defaultValue: 'Tech Corp',
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders label and input field correctly', () => {
		render(<FormFieldWithLabel {...defaultProps} />);

		expect(screen.getByText('Company')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('Enter company name'),
		).toBeInTheDocument();
	});

	it('renders with correct label text', () => {
		render(<FormFieldWithLabel {...defaultProps} />);

		expect(screen.getByText('Company')).toBeInTheDocument();
	});

	it('applies custom className when provided', () => {
		render(<FormFieldWithLabel {...defaultProps} className='custom-class' />);

		const container = screen
			.getByText('Company')
			.closest('.FormFieldContainer');
		expect(container).toHaveClass('custom-class');
	});

	it('calls onChange when input value changes', () => {
		const mockOnChange = vi.fn();
		render(<FormFieldWithLabel {...defaultProps} onChange={mockOnChange} />);

		const input = screen.getByPlaceholderText('Enter company name');
		fireEvent.change(input, { target: { value: 'New Company' } });

		expect(mockOnChange).toHaveBeenCalledWith('New Company');
	});

	it('uses default value when field value is empty', () => {
		render(<FormFieldWithLabel {...defaultProps} />);

		const input = screen.getByPlaceholderText('Enter company name');
		expect(input).toHaveValue('Tech Corp');
	});

	it('renders input with correct attributes', () => {
		render(<FormFieldWithLabel {...defaultProps} />);

		const input = screen.getByPlaceholderText('Enter company name');
		expect(input).toHaveAttribute('type', 'text');
		expect(input).toHaveAttribute('placeholder', 'Enter company name');
	});

	it('renders label with correct accessibility attributes', () => {
		render(<FormFieldWithLabel {...defaultProps} />);

		const label = screen.getByText('Company').closest('label');
		expect(label).toHaveAttribute('title', 'Company');
		expect(label).toHaveAttribute('aria-label', 'Company');
	});

	it('works without optional props', () => {
		const minimalProps = {
			form: mockForm,
			fieldPath: 'experience',
			index: 0,
			fieldName: 'company',
			label: 'Company',
		};

		render(<FormFieldWithLabel {...minimalProps} />);

		expect(screen.getByText('Company')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('handles empty string default value', () => {
		render(<FormFieldWithLabel {...defaultProps} defaultValue='' />);

		const input = screen.getByPlaceholderText('Enter company name');
		expect(input).toHaveValue('');
	});
});
