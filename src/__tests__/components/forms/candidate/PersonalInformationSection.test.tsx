import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock the complex form components to focus on section structure
vi.mock('@tanstack/react-form', () => ({
	Field: ({ children }: any) => {
		const mockField = {
			handleChange: vi.fn(),
			state: { value: '' },
		};
		return children(mockField);
	},
}));

vi.mock('@/components/forms/core', () => ({
	FormSection: ({ title, children }: any) => (
		<section data-testid='form-section'>
			<h3>{title}</h3>
			{children}
		</section>
	),
	HydrationSafeFormField: ({ label }: any) => (
		<div data-testid='form-field'>
			<label htmlFor='mock-input'>{label}</label>
			<input id='mock-input' type='text' />
		</div>
	),
}));

import { PersonalInformationSection } from '@/components/forms/candidate/PersonalInformationSection';

const mockForm = {
	handleSubmit: vi.fn(),
};

const mockHandleFieldChange = vi.fn();

describe('PersonalInformationSection', () => {
	it('renders personal information section title', () => {
		render(
			<PersonalInformationSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		expect(screen.getByText('Personal Information')).toBeInTheDocument();
	});

	it('renders with correct section structure', () => {
		const { container } = render(
			<PersonalInformationSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const section = container.querySelector('section');
		expect(section).toBeInTheDocument();
		expect(section).toHaveTextContent('Personal Information');
	});

	it('renders form section component', () => {
		render(
			<PersonalInformationSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		expect(screen.getByTestId('form-section')).toBeInTheDocument();
	});
});
