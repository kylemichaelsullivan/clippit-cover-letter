import { DevelopmentStatusCard } from '@/components/forms/welcome/DevelopmentStatusCard';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('DevelopmentStatusCard', () => {
	it('renders the development status heading', () => {
		render(<DevelopmentStatusCard />);
		expect(screen.getByText('🚧 Development Status')).toBeInTheDocument();
	});

	it('renders the development status heading with correct styling', () => {
		render(<DevelopmentStatusCard />);
		const heading = screen.getByText('🚧 Development Status');
		expect(heading).toHaveClass('font-medium', 'text-yellow-800');
	});

	it('renders the development status description', () => {
		render(<DevelopmentStatusCard />);
		expect(
			screen.getByText(
				/AI features are currently in development and not yet available/
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/The application is fully functional for template-based document generation/
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/AI-powered enhancements will be added in future updates/
			)
		).toBeInTheDocument();
	});

	it('renders the card with correct styling classes', () => {
		render(<DevelopmentStatusCard />);
		const card = screen
			.getByText('🚧 Development Status')
			.closest('div')?.parentElement;
		expect(card).toHaveClass(
			'rounded-lg',
			'border',
			'border-yellow-200',
			'bg-yellow-50',
			'p-4'
		);
	});

	it('contains the correct warning content', () => {
		render(<DevelopmentStatusCard />);
		expect(screen.getByText(/Note:/)).toBeInTheDocument();
		expect(
			screen.getByText(/AI features are currently in development/)
		).toBeInTheDocument();
		expect(screen.getByText(/not yet available/)).toBeInTheDocument();
		expect(
			screen.getByText(/fully functional for template-based/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/AI-powered enhancements will be added/)
		).toBeInTheDocument();
	});

	it('renders the emoji icon in the heading', () => {
		render(<DevelopmentStatusCard />);
		const heading = screen.getByText('🚧 Development Status');
		expect(heading.textContent).toContain('🚧');
	});
});
