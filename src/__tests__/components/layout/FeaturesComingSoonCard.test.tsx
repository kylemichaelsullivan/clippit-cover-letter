import { FeaturesComingSoonCard } from '@/components/forms/welcome/FeaturesComingSoonCard';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('FeaturesComingSoonCard', () => {
	it('renders the coming soon heading', () => {
		render(<FeaturesComingSoonCard />);
		expect(screen.getByText('🔮 Coming Soon')).toBeInTheDocument();
	});

	it('renders the coming soon heading with correct styling', () => {
		render(<FeaturesComingSoonCard />);
		const heading = screen.getByText('🔮 Coming Soon');
		expect(heading).toHaveClass('font-medium', 'text-green-800');
	});

	it('renders all upcoming features in a list', () => {
		render(<FeaturesComingSoonCard />);
		expect(screen.getByText(/Job fit score estimate/)).toBeInTheDocument();
		expect(screen.getByText(/Intelligent skill selection/)).toBeInTheDocument();
		expect(screen.getByText(/Cover letter generation/)).toBeInTheDocument();
		expect(screen.getByText(/Resume tailoring/)).toBeInTheDocument();
	});

	it('renders the card with correct styling classes', () => {
		render(<FeaturesComingSoonCard />);
		const card = screen
			.getByText('🔮 Coming Soon')
			.closest('div')?.parentElement;
		expect(card).toHaveClass(
			'rounded-lg',
			'border',
			'border-green-200',
			'bg-green-50',
			'p-4'
		);
	});

	it('renders the emoji icon in the heading', () => {
		render(<FeaturesComingSoonCard />);
		const heading = screen.getByText('🔮 Coming Soon');
		expect(heading.textContent).toContain('🔮');
	});

	it('renders features as list items', () => {
		render(<FeaturesComingSoonCard />);
		const listItems = screen.getAllByRole('listitem');
		expect(listItems).toHaveLength(4);
	});

	it('applies correct styling to the list container', () => {
		render(<FeaturesComingSoonCard />);
		const list = screen.getByRole('list');
		expect(list).toHaveClass('space-y-1', 'text-green-700');
	});

	it('contains the correct future feature descriptions', () => {
		render(<FeaturesComingSoonCard />);
		expect(screen.getByText(/Job fit score estimate/)).toBeInTheDocument();
		expect(screen.getByText(/Intelligent skill selection/)).toBeInTheDocument();
		expect(screen.getByText(/Cover letter generation/)).toBeInTheDocument();
		expect(screen.getByText(/Resume tailoring/)).toBeInTheDocument();
	});
});
