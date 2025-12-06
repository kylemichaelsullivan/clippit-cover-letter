import { FeaturesAvailableCard } from '@/components/forms/welcome/FeaturesAvailableCard';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('FeaturesAvailableCard', () => {
	it('renders the features available heading', () => {
		render(<FeaturesAvailableCard />);
		expect(screen.getByText("✨ What's Available Now")).toBeInTheDocument();
	});

	it('renders the features available heading with correct styling', () => {
		render(<FeaturesAvailableCard />);
		const heading = screen.getByText("✨ What's Available Now");
		expect(heading).toHaveClass('font-medium', 'text-blue-800');
	});

	it('renders all available features in a list', () => {
		render(<FeaturesAvailableCard />);
		expect(
			screen.getByText(/Template-based document generation/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Professional cover letter and resume templates/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Skills organization and management/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Export to PDF, Markdown and TXT/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Modern, responsive interface/)
		).toBeInTheDocument();
	});

	it('renders the card with correct styling classes', () => {
		render(<FeaturesAvailableCard />);
		const card = screen
			.getByText("✨ What's Available Now")
			.closest('div')?.parentElement;
		expect(card).toHaveClass(
			'rounded-lg',
			'border',
			'border-blue-200',
			'bg-blue-50',
			'p-4'
		);
	});

	it('renders the mustache placeholder text correctly', () => {
		render(<FeaturesAvailableCard />);
		expect(screen.getByText(/mustache/)).toBeInTheDocument();
		expect(screen.getByText(/{{mustache}}/)).toBeInTheDocument();
	});

	it('renders the emoji icon in the heading', () => {
		render(<FeaturesAvailableCard />);
		const heading = screen.getByText("✨ What's Available Now");
		expect(heading.textContent).toContain('✨');
	});

	it('renders features as list items', () => {
		render(<FeaturesAvailableCard />);
		const listItems = screen.getAllByRole('listitem');
		expect(listItems).toHaveLength(5);
	});

	it('applies correct styling to the list container', () => {
		render(<FeaturesAvailableCard />);
		const list = screen.getByRole('list');
		expect(list).toHaveClass('space-y-1', 'text-blue-700');
	});
});
