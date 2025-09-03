import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormFieldWithCheckbox } from '@/components/forms/core/FormFieldWithCheckbox';
import { createMockForm } from '@/lib/test-utils';

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

// Mock the getOrdinalSuffix utility
vi.mock('@/lib/utils', () => ({
	getOrdinalSuffix: vi.fn((num) => {
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const v = num % 100;
		return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
	}),
}));

describe('FormFieldWithCheckbox', () => {
	const mockForm = createMockForm();
	const defaultProps = {
		form: mockForm,
		fieldPath: 'experience',
		index: 0,
		label: 'Title',
		placeholder: 'Enter job title',
		defaultValue: 'Software Engineer',
		htmlId: 'experience-title-0',
		checkboxTitle: 'Include this in Resume?',
		checkboxAriaLabel: 'Include 1st experience entry in Resume',
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders checkbox and input field correctly', () => {
		render(<FormFieldWithCheckbox {...defaultProps} />);

		expect(screen.getByRole('checkbox')).toBeInTheDocument();
		expect(screen.getByText('Title')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Enter job title')).toBeInTheDocument();
	});

	it('renders with correct label text', () => {
		render(<FormFieldWithCheckbox {...defaultProps} />);

		expect(screen.getByText('Title')).toBeInTheDocument();
	});

	it('applies custom className when provided', () => {
		render(
			<FormFieldWithCheckbox {...defaultProps} className='custom-class' />,
		);

		const container = screen.getByText('Title').closest('.FormFieldContainer');
		expect(container).toHaveClass('custom-class');
	});

	it('calls onChange when input value changes', () => {
		const mockOnChange = vi.fn();
		render(<FormFieldWithCheckbox {...defaultProps} onChange={mockOnChange} />);

		const input = screen.getByPlaceholderText('Enter job title');
		fireEvent.change(input, { target: { value: 'New Title' } });

		expect(mockOnChange).toHaveBeenCalledWith('New Title');
	});

	it('calls onChange when checkbox is toggled', () => {
		const mockOnChange = vi.fn();
		render(<FormFieldWithCheckbox {...defaultProps} onChange={mockOnChange} />);

		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);

		expect(mockOnChange).toHaveBeenCalledWith(' ');
	});

	it('registers focus ref when provided', () => {
		const mockRegisterFocusRef = vi.fn();
		render(
			<FormFieldWithCheckbox
				{...defaultProps}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		const input = screen.getByPlaceholderText('Enter job title');
		input.focus();

		expect(mockRegisterFocusRef).toHaveBeenCalledWith(input);
	});

	it('uses default value when field value is empty', () => {
		render(<FormFieldWithCheckbox {...defaultProps} />);

		const input = screen.getByPlaceholderText('Enter job title');
		expect(input).toHaveValue('Software Engineer');
	});

	it('renders checkbox with correct accessibility attributes', () => {
		render(<FormFieldWithCheckbox {...defaultProps} />);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toHaveAttribute('title', 'Include this in Resume?');
		expect(checkbox).toHaveAttribute(
			'aria-label',
			'Include 1st experience entry in Resume',
		);
	});

	it('renders input with correct accessibility attributes', () => {
		render(<FormFieldWithCheckbox {...defaultProps} />);

		const input = screen.getByPlaceholderText('Enter job title');
		expect(input).toHaveAttribute('id', 'experience-title-0');
		expect(input).toHaveAttribute('type', 'text');
	});
});
