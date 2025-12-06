import { WelcomeDescription } from '@/components/forms/welcome/WelcomeDescription';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('WelcomeDescription', () => {
	it('renders the description text', () => {
		render(<WelcomeDescription />);
		expect(
			screen.getByText(
				'Clippit helps you create personalized cover letters and resumes using advanced AI technology. Our platform analyzes job requirements and your experience to generate tailored documents that stand out to employers.'
			)
		).toBeInTheDocument();
	});

	it('renders as a paragraph element', () => {
		render(<WelcomeDescription />);
		const paragraph = screen.getByText(
			'Clippit helps you create personalized cover letters and resumes using advanced AI technology. Our platform analyzes job requirements and your experience to generate tailored documents that stand out to employers.'
		);
		expect(paragraph.tagName).toBe('P');
	});

	it('contains the correct content about Clippit', () => {
		render(<WelcomeDescription />);
		expect(screen.getByText(/Clippit helps you create/)).toBeInTheDocument();
		expect(
			screen.getByText(/personalized cover letters and resumes/)
		).toBeInTheDocument();
		expect(screen.getByText(/advanced AI technology/)).toBeInTheDocument();
		expect(screen.getByText(/job requirements/)).toBeInTheDocument();
		expect(screen.getByText(/tailored documents/)).toBeInTheDocument();
		expect(screen.getByText(/stand out to employers/)).toBeInTheDocument();
	});
});
