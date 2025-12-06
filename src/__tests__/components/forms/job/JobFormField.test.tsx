import { JobFormField } from '@/components/forms/job/JobFormField';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/components/forms/core', () => ({
	FormField: ({
		label,
		placeholder,
		onChange,
		id,
		type,
		rows,
		className,
	}: any) => (
		<div data-testid={`form-field-${id}`}>
			<label htmlFor={id}>{label}</label>
			{type === 'textarea' ? (
				<textarea
					id={id}
					placeholder={placeholder}
					onChange={(e) => onChange(e.target.value)}
					rows={rows}
					className={className}
				/>
			) : (
				<input
					id={id}
					type={type}
					placeholder={placeholder}
					onChange={(e) => onChange(e.target.value)}
				/>
			)}
		</div>
	),
}));

vi.mock('@tanstack/react-form', () => ({
	Field: ({ children }: any) =>
		children({
			handleChange: vi.fn(() => {
				// Mock field change handler
			}),
		}),
}));

describe('JobFormField', () => {
	const mockHandleFieldChange = vi.fn();
	const mockForm = {};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders text input field with correct properties', () => {
		render(
			<JobFormField
				form={mockForm}
				name='companyName'
				label='Company Name'
				placeholder='Test Company'
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		expect(screen.getByTestId('form-field-companyName')).toBeInTheDocument();
		expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Test Company')).toBeInTheDocument();
	});

	it('renders textarea field with correct properties', () => {
		render(
			<JobFormField
				form={mockForm}
				name='jobDescription'
				label='Job Description'
				placeholder='Test description'
				handleFieldChange={mockHandleFieldChange}
				type='textarea'
				rows={10}
				className='custom-class'
			/>
		);

		expect(screen.getByTestId('form-field-jobDescription')).toBeInTheDocument();
		expect(screen.getByLabelText('Job Description')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Test description')).toBeInTheDocument();

		const textarea = screen
			.getByTestId('form-field-jobDescription')
			.querySelector('textarea');
		expect(textarea).toHaveAttribute('rows', '10');
		expect(textarea).toHaveClass('custom-class');
	});

	it('calls handleFieldChange when input value changes', () => {
		render(
			<JobFormField
				form={mockForm}
				name='jobTitle'
				label='Job Title'
				placeholder='Test title'
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const input = screen
			.getByTestId('form-field-jobTitle')
			.querySelector('input');
		fireEvent.change(input!, { target: { value: 'Software Engineer' } });

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'jobTitle',
			'Software Engineer'
		);
	});

	it('calls handleFieldChange when textarea value changes', () => {
		render(
			<JobFormField
				form={mockForm}
				name='jobDescription'
				label='Job Description'
				placeholder='Test description'
				handleFieldChange={mockHandleFieldChange}
				type='textarea'
			/>
		);

		const textarea = screen
			.getByTestId('form-field-jobDescription')
			.querySelector('textarea');
		fireEvent.change(textarea!, { target: { value: 'Test job description' } });

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'jobDescription',
			'Test job description'
		);
	});

	it('defaults to text type when not specified', () => {
		render(
			<JobFormField
				form={mockForm}
				name='companyName'
				label='Company Name'
				placeholder='Test Company'
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const input = screen
			.getByTestId('form-field-companyName')
			.querySelector('input');
		expect(input).toHaveAttribute('type', 'text');
	});

	it('passes through custom className and rows props', () => {
		render(
			<JobFormField
				form={mockForm}
				name='jobDescription'
				label='Job Description'
				placeholder='Test description'
				handleFieldChange={mockHandleFieldChange}
				type='textarea'
				className='min-h-64 sm:min-h-96'
				rows={8}
			/>
		);

		const textarea = screen
			.getByTestId('form-field-jobDescription')
			.querySelector('textarea');
		expect(textarea).toHaveAttribute('rows', '8');
		expect(textarea).toHaveClass('min-h-64 sm:min-h-96');
	});
});
