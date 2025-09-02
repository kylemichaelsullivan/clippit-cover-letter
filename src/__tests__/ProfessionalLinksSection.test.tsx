import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

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
			<label>{label}</label>
		</div>
	),
}));

vi.mock('@/components/ui/input', () => ({
	Checkbox: ({ title }: any) => <div data-testid='checkbox'>{title}</div>,
}));

vi.mock('@/components/ui/FormFieldLabel', () => ({
	FormFieldLabel: ({ children }: any) => <span>{children}</span>,
}));

import { ProfessionalLinksSection } from '@/components/forms/candidate/ProfessionalLinksSection';

const mockForm = {
	handleSubmit: vi.fn(),
};

const mockHandleFieldChange = vi.fn();

describe('ProfessionalLinksSection', () => {
	it('renders professional links section title', () => {
		render(
			<ProfessionalLinksSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>,
		);

		expect(screen.getByText('Professional Links')).toBeInTheDocument();
	});

	it('renders with correct section structure', () => {
		const { container } = render(
			<ProfessionalLinksSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>,
		);

		const section = container.querySelector('section');
		expect(section).toBeInTheDocument();
		expect(section).toHaveTextContent('Professional Links');
	});

	it('renders form section component', () => {
		render(
			<ProfessionalLinksSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>,
		);

		expect(screen.getByTestId('form-section')).toBeInTheDocument();
	});

	it('includes QR code checkbox', () => {
		render(
			<ProfessionalLinksSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>,
		);

		expect(screen.getByTestId('checkbox')).toBeInTheDocument();
		expect(
			screen.getByText('Include QR Code in Documents?'),
		).toBeInTheDocument();
	});
});
