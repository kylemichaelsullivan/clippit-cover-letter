import { WelcomeHeader } from '@/components/forms/welcome/WelcomeHeader';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('WelcomeHeader', () => {
	it('renders the TabTitle with correct title', () => {
		render(<WelcomeHeader />);
		expect(screen.getByText('Welcome to Clippit')).toBeInTheDocument();
	});

	it('renders the main heading with correct text', () => {
		render(<WelcomeHeader />);
		expect(
			screen.getByText('AI-Powered Cover Letter & Resume Generation')
		).toBeInTheDocument();
	});

	it('renders the main heading with correct styling classes', () => {
		render(<WelcomeHeader />);
		const heading = screen.getByText(
			'AI-Powered Cover Letter & Resume Generation'
		);
		expect(heading).toHaveClass('text-xl', 'font-semibold', 'text-black');
	});

	it('renders both title and heading elements', () => {
		render(<WelcomeHeader />);
		expect(screen.getByText('Welcome to Clippit')).toBeInTheDocument();
		expect(
			screen.getByText('AI-Powered Cover Letter & Resume Generation')
		).toBeInTheDocument();
	});
});
