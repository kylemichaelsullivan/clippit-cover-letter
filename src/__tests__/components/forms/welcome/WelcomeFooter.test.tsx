import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WelcomeFooter } from '@/components/forms/welcome/WelcomeFooter';

describe('WelcomeFooter', () => {
	it('renders the call to action text', () => {
		render(<WelcomeFooter />);
		expect(
			screen.getByText(
				'Ready to get started? Click "Next" to begin entering your information.',
			),
		).toBeInTheDocument();
	});

	it('renders as a paragraph element', () => {
		render(<WelcomeFooter />);
		const paragraph = screen.getByText(
			'Ready to get started? Click "Next" to begin entering your information.',
		);
		expect(paragraph.tagName).toBe('P');
	});

	it('applies correct styling classes', () => {
		render(<WelcomeFooter />);
		const paragraph = screen.getByText(
			'Ready to get started? Click "Next" to begin entering your information.',
		);
		expect(paragraph).toHaveClass('text-gray', 'text-sm');
	});

	it('contains the correct call to action content', () => {
		render(<WelcomeFooter />);
		expect(screen.getByText(/Ready to get started/)).toBeInTheDocument();
		expect(screen.getByText(/Click "Next"/)).toBeInTheDocument();
		expect(
			screen.getByText(/begin entering your information/),
		).toBeInTheDocument();
	});

	it('renders the Next button text in quotes', () => {
		render(<WelcomeFooter />);
		expect(screen.getByText(/"Next"/)).toBeInTheDocument();
	});
});
