import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the components
vi.mock('@/components/ui/buttons', () => ({
	Button: ({ children, onClick, disabled, ...props }: any) => (
		<button onClick={onClick} disabled={disabled} {...props}>
			{children}
		</button>
	),
}));

vi.mock('@/components/forms/core', () => ({
	FormFieldContainer: ({ children, className }: any) => (
		<div className={className} data-testid='form-field-container'>
			{children}
		</div>
	),
	FormFieldWithLabel: ({ label, children }: any) => (
		<div data-testid='form-field-with-label'>
			<label>{label}</label>
			{children}
		</div>
	),
	FormItem: ({ children, onRemove }: any) => (
		<div data-testid='form-item'>
			{children}
			{onRemove && (
				<button onClick={onRemove} title='Remove this Education'>
					Remove
				</button>
			)}
		</div>
	),
}));

vi.mock('@/components/ui/input', () => ({
	Checkbox: ({ checked, onChange, title, 'aria-label': ariaLabel }: any) => (
		<input
			type='checkbox'
			checked={checked}
			onChange={(e) => onChange(e.target.checked)}
			title={title}
			aria-label={ariaLabel}
		/>
	),
}));

vi.mock('@/components/ui/FormFieldLabel', () => ({
	FormFieldLabel: ({ children, htmlFor }: any) => (
		<label htmlFor={htmlFor} data-testid='form-field-label'>
			{children}
		</label>
	),
}));

vi.mock('@tanstack/react-form', () => ({
	Field: ({ children }: any) => {
		const mockField = {
			state: { value: '' },
			handleChange: vi.fn(),
		};
		return children(mockField);
	},
}));

// Mock config
vi.mock('@/config', () => ({
	DEFAULTS: {
		INITIAL_STATES: {
			EDUCATION: {
				degree: '',
				graduationYear: '',
				institution: '',
				location: '',
			},
		},
	},
	PLACEHOLDERS: {
		EDUCATION: {
			DEGREE: 'Enter degree...',
			GRADUATION_YEAR: 'Enter graduation year...',
			INSTITUTION: 'Enter institution...',
			LOCATION: 'Enter location...',
		},
	},
}));

vi.mock('@/lib/utils', () => ({
	getOrdinalSuffix: (num: number) => {
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const v = num % 100;
		return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
	},
	parseEducationFromText: vi.fn((text: string) => {
		if (text.includes('Juris Doctor') && text.includes('Bachelor')) {
			return [
				{
					degree: 'Juris Doctor',
					institution:
						'Western Michigan University Thomas M. Cooley Law School',
					location: 'Grand Rapids, MI',
					graduationYear: undefined,
				},
				{
					degree: "Bachelor's Degree",
					institution: 'University of Michigan',
					location: 'Ann Arbor, MI',
					graduationYear: undefined,
				},
			];
		}
		return [];
	}),
}));

import { EducationItem } from '@/components/forms/resume/EducationItem';

describe('EducationItem', () => {
	const mockForm = {};
	const mockHandleFieldChange = vi.fn();
	const mockOnRemove = vi.fn();
	const mockOnPaste = vi.fn();
	const mockRegisterFocusRef = vi.fn();
	const educationIndex = 0;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders all education fields', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		expect(screen.getByLabelText('Degree')).toBeInTheDocument();
		expect(screen.getByLabelText('Graduation Year')).toBeInTheDocument();
		expect(screen.getByLabelText('Institution')).toBeInTheDocument();
		expect(screen.getByLabelText('Location')).toBeInTheDocument();
	});

	it('handles paste events with multiple education entries', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		const degreeInput = screen.getByLabelText('Degree');
		const pasteEvent = {
			clipboardData: {
				getData: () => `### Juris Doctor

**Western Michigan University Thomas M. Cooley Law School** | Grand Rapids, MI

### Bachelor's Degree

**University of Michigan** | Ann Arbor, MI`,
			},
			preventDefault: vi.fn(),
		};

		fireEvent.paste(degreeInput, pasteEvent);

		expect(pasteEvent.preventDefault).toHaveBeenCalled();
		expect(mockOnPaste).toHaveBeenCalledWith([
			{
				degree: 'Juris Doctor',
				institution: 'Western Michigan University Thomas M. Cooley Law School',
				location: 'Grand Rapids, MI',
				graduationYear: undefined,
			},
			{
				degree: "Bachelor's Degree",
				institution: 'University of Michigan',
				location: 'Ann Arbor, MI',
				graduationYear: undefined,
			},
		]);
	});

	it('does not prevent default or call onPaste for single education entry', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		const degreeInput = screen.getByLabelText('Degree');
		const pasteEvent = {
			clipboardData: {
				getData: () => `Bachelor's Degree

University of Michigan | Ann Arbor, MI`,
			},
			preventDefault: vi.fn(),
		};

		fireEvent.paste(degreeInput, pasteEvent);

		expect(pasteEvent.preventDefault).not.toHaveBeenCalled();
		expect(mockOnPaste).not.toHaveBeenCalled();
	});

	it('does not prevent default or call onPaste for invalid text', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		const degreeInput = screen.getByLabelText('Degree');
		const pasteEvent = {
			clipboardData: {
				getData: () => 'Some random text that is not education data',
			},
			preventDefault: vi.fn(),
		};

		fireEvent.paste(degreeInput, pasteEvent);

		expect(pasteEvent.preventDefault).not.toHaveBeenCalled();
		expect(mockOnPaste).not.toHaveBeenCalled();
	});

	it('calls handleFieldChange when degree field changes', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		const degreeInput = screen.getByLabelText('Degree');
		fireEvent.change(degreeInput, { target: { value: 'Bachelor of Science' } });

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'education.0.degree',
			'Bachelor of Science',
		);
	});

	it('calls handleFieldChange when graduation year field changes', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		const graduationYearInput = screen.getByLabelText('Graduation Year');
		fireEvent.change(graduationYearInput, { target: { value: '2020' } });

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'education.0.graduationYear',
			'2020',
		);
	});

	it('calls handleFieldChange when institution field changes', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		const institutionInput = screen.getByLabelText('Institution');
		fireEvent.change(institutionInput, {
			target: { value: 'University of Michigan' },
		});

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'education.0.institution',
			'University of Michigan',
		);
	});

	it('calls handleFieldChange when location field changes', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		const locationInput = screen.getByLabelText('Location');
		fireEvent.change(locationInput, { target: { value: 'Ann Arbor, MI' } });

		expect(mockHandleFieldChange).toHaveBeenCalledWith(
			'education.0.location',
			'Ann Arbor, MI',
		);
	});

	it('calls onRemove when remove button is clicked', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		const removeButton = screen.getByTitle('Remove this Education');
		fireEvent.click(removeButton);

		expect(mockOnRemove).toHaveBeenCalled();
	});

	it('registers focus ref for degree field', () => {
		render(
			<EducationItem
				form={mockForm}
				educationIndex={educationIndex}
				handleFieldChange={mockHandleFieldChange}
				onRemove={mockOnRemove}
				onPaste={mockOnPaste}
				registerFocusRef={mockRegisterFocusRef}
			/>,
		);

		expect(mockRegisterFocusRef).toHaveBeenCalledWith(
			educationIndex,
			expect.any(HTMLInputElement),
		);
	});

	it('works without optional props', () => {
		render(<EducationItem form={mockForm} educationIndex={educationIndex} />);

		expect(screen.getByLabelText('Degree')).toBeInTheDocument();
		expect(screen.getByLabelText('Graduation Year')).toBeInTheDocument();
		expect(screen.getByLabelText('Institution')).toBeInTheDocument();
		expect(screen.getByLabelText('Location')).toBeInTheDocument();
	});
});
