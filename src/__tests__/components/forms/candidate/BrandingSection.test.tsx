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
}));

vi.mock('@/components/ui/input', () => ({
	Checkbox: ({ title }: any) => <div data-testid='checkbox'>{title}</div>,
	ImageInput: ({ label }: any) => <div data-testid='image-input'>{label}</div>,
	SignatureInput: ({ label }: any) => (
		<div data-testid='signature-input'>{label}</div>
	),
}));

vi.mock('@/components/ui/FormFieldLabel', () => ({
	FormFieldLabel: ({ children }: any) => <span>{children}</span>,
}));

import { BrandingSection } from '@/components/forms/candidate/BrandingSection';

const mockForm = {
	handleSubmit: vi.fn(),
};

const mockHandleFieldChange = vi.fn();

describe('BrandingSection', () => {
	it('renders branding section title', () => {
		render(
			<BrandingSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		expect(screen.getByText('Branding')).toBeInTheDocument();
	});

	it('renders with correct section structure', () => {
		const { container } = render(
			<BrandingSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		const section = container.querySelector('section');
		expect(section).toBeInTheDocument();
		expect(section).toHaveTextContent('Branding');
	});

	it('renders form section component', () => {
		render(
			<BrandingSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		expect(screen.getByTestId('form-section')).toBeInTheDocument();
	});

	it('includes signature image checkbox', () => {
		render(
			<BrandingSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		expect(screen.getByTestId('checkbox')).toBeInTheDocument();
		expect(screen.getByText('Use Signature Image?')).toBeInTheDocument();
	});

	it('renders signature and logo inputs', () => {
		render(
			<BrandingSection
				form={mockForm}
				handleFieldChange={mockHandleFieldChange}
			/>
		);

		expect(screen.getByTestId('signature-input')).toBeInTheDocument();
		expect(screen.getByTestId('image-input')).toBeInTheDocument();
	});
});
