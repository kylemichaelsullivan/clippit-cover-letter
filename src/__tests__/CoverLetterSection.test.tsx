import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CoverLetterSection } from '@/components/forms/letter/CoverLetterSection';

// Mock the form field components
vi.mock('@tanstack/react-form', () => ({
	Field: ({ children, name }: any) => {
		if (name === 'includeCoverLetter') {
			return children({
				state: { value: true },
				handleChange: vi.fn(),
			});
		}
		if (name === 'coverLetterContent') {
			return children({
				state: { value: 'Sample cover letter content' },
				handleChange: vi.fn(),
			});
		}
		return null;
	},
}));

// Mock the FormSection component to render the checkbox
vi.mock('@/components/forms/core', () => ({
	FormSection: ({ children, title, checked, onCheckedChange, id }: any) => (
		<section>
			<div>
				<h3>{title}</h3>
				<input
					type='checkbox'
					checked={checked}
					onChange={(e) => onCheckedChange(e.target.checked)}
					id={id}
				/>
			</div>
			{children}
		</section>
	),
}));

// Mock the TipTapEditor component
vi.mock('@/components/ui/input', () => ({
	TipTapEditor: ({
		value,
		onChange,
		placeholder,
		'aria-label': ariaLabel,
	}: any) => (
		<div>
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				aria-label={ariaLabel}
				role='textbox'
			/>
		</div>
	),
}));

describe('CoverLetterSection', () => {
	const mockForm = {
		// Mock form implementation
	};
	const mockOnFieldChange = vi.fn();

	beforeEach(() => {
		mockOnFieldChange.mockClear();
	});

	it('renders cover letter section with checkbox and editor', () => {
		render(
			<CoverLetterSection form={mockForm} onFieldChange={mockOnFieldChange} />,
		);

		expect(screen.getByText('Cover Letter')).toBeInTheDocument();
		expect(screen.getByRole('checkbox')).toBeInTheDocument();
	});

	it('has correct form section attributes', () => {
		render(
			<CoverLetterSection form={mockForm} onFieldChange={mockOnFieldChange} />,
		);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toHaveAttribute('id', 'includeCoverLetter');
		expect(checkbox).toBeChecked();
	});

	it('renders TipTap editor with correct attributes', () => {
		render(
			<CoverLetterSection form={mockForm} onFieldChange={mockOnFieldChange} />,
		);

		// The TipTap editor should be present
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});
});
