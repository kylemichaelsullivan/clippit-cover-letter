import { JobFormFields } from '@/components/forms/job/JobFormFields';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the JobFormField component
vi.mock('@/components/forms/job/JobFormField', () => ({
	JobFormField: ({
		name,
		label,
		placeholder,
		handleFieldChange,
		type,
		className,
		rows,
	}: any) => (
		<div data-testid={`form-field-${name}`}>
			<label htmlFor={name}>{label}</label>
			{type === 'textarea' ? (
				<textarea
					id={name}
					placeholder={placeholder}
					onChange={(e) => handleFieldChange(name, e.target.value)}
					rows={rows}
					className={className}
				/>
			) : (
				<input
					id={name}
					type={type || 'text'}
					placeholder={placeholder}
					onChange={(e) => handleFieldChange(name, e.target.value)}
				/>
			)}
		</div>
	),
}));

describe('JobFormFields', () => {
	const mockHandleFieldChange = vi.fn();
	const mockForm = {};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders all required form fields', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		expect(screen.getByTestId('form-field-companyName')).toBeInTheDocument();
		expect(screen.getByTestId('form-field-jobTitle')).toBeInTheDocument();
		expect(screen.getByTestId('form-field-hiringManager')).toBeInTheDocument();
		expect(screen.getByTestId('form-field-companyAddress')).toBeInTheDocument();
		expect(screen.getByTestId('form-field-jobDescription')).toBeInTheDocument();
	});

	it('renders company name field with correct label and placeholder', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const companyNameField = screen.getByTestId('form-field-companyName');
		expect(companyNameField).toBeInTheDocument();
		expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('Dunder Mifflin Paper Company')
		).toBeInTheDocument();
	});

	it('renders job title field with correct label and placeholder', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const jobTitleField = screen.getByTestId('form-field-jobTitle');
		expect(jobTitleField).toBeInTheDocument();
		expect(screen.getByLabelText('Job Title')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('Assistant to the Regional Manager')
		).toBeInTheDocument();
	});

	it('renders hiring manager field with correct label and placeholder', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const hiringManagerField = screen.getByTestId('form-field-hiringManager');
		expect(hiringManagerField).toBeInTheDocument();
		expect(screen.getByLabelText('Hiring Manager')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Michael Scott')).toBeInTheDocument();
	});

	it('renders company address field with correct label and placeholder', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const companyAddressField = screen.getByTestId('form-field-companyAddress');
		expect(companyAddressField).toBeInTheDocument();
		expect(screen.getByLabelText('Company Address')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Scranton, PA')).toBeInTheDocument();
	});

	it('renders job description field as textarea with correct properties', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const jobDescriptionField = screen.getByTestId('form-field-jobDescription');
		expect(jobDescriptionField).toBeInTheDocument();
		expect(screen.getByLabelText('Job Description')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(
				/Support the Regional Manager in daily operations/
			)
		).toBeInTheDocument();

		const textarea = screen
			.getByTestId('form-field-jobDescription')
			.querySelector('textarea');
		expect(textarea).toHaveAttribute('rows', '8');
		expect(textarea).toHaveClass('min-h-64 sm:min-h-96');
	});

	it('calls handleFieldChange when company name is updated', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const companyNameInput = screen
			.getByTestId('form-field-companyName')
			.querySelector('input');
		fireEvent.change(companyNameInput!, { target: { value: 'Test Company' } });

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'companyName',
			'Test Company'
		);
	});

	it('calls handleFieldChange when job title is updated', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const jobTitleInput = screen
			.getByTestId('form-field-jobTitle')
			.querySelector('input');
		fireEvent.change(jobTitleInput!, {
			target: { value: 'Software Engineer' },
		});

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'jobTitle',
			'Software Engineer'
		);
	});

	it('calls handleFieldChange when hiring manager is updated', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const hiringManagerInput = screen
			.getByTestId('form-field-hiringManager')
			.querySelector('input');
		fireEvent.change(hiringManagerInput!, { target: { value: 'John Doe' } });

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'hiringManager',
			'John Doe'
		);
	});

	it('calls handleFieldChange when company address is updated', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const companyAddressInput = screen
			.getByTestId('form-field-companyAddress')
			.querySelector('input');
		fireEvent.change(companyAddressInput!, {
			target: { value: '123 Main St' },
		});

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'companyAddress',
			'123 Main St'
		);
	});

	it('calls handleFieldChange when job description is updated', () => {
		render(
			<JobFormFields
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const jobDescriptionTextarea = screen
			.getByTestId('form-field-jobDescription')
			.querySelector('textarea');
		fireEvent.change(jobDescriptionTextarea!, {
			target: { value: 'Test job description' },
		});

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'jobDescription',
			'Test job description'
		);
	});
});
