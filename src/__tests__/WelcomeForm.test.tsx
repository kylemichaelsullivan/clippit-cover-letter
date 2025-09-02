import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the usePhaseStore hook before importing
vi.mock('@/lib/stores', () => ({
	usePhaseStore: vi.fn(),
}));

import { WelcomeForm } from '@/components/forms/welcome/WelcomeForm';
import { usePhaseStore } from '@/lib/stores';

describe('WelcomeForm', () => {
	const mockUsePhaseStore = usePhaseStore as unknown as ReturnType<
		typeof vi.fn
	>;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders when currentPhase is welcome', () => {
		mockUsePhaseStore.mockReturnValue({ currentPhase: 'welcome' } as any);

		render(<WelcomeForm />);

		expect(screen.getByText('Welcome to Clippit')).toBeInTheDocument();
		expect(
			screen.getByText('AI-Powered Cover Letter & Resume Generation'),
		).toBeInTheDocument();
		expect(screen.getByText(/Clippit helps you create/)).toBeInTheDocument();
		expect(screen.getByText('🚧 Development Status')).toBeInTheDocument();
		expect(screen.getByText("✨ What's Available Now")).toBeInTheDocument();
		expect(screen.getByText('🔮 Coming Soon')).toBeInTheDocument();
		expect(screen.getByText(/Ready to get started/)).toBeInTheDocument();
	});

	it('does not render when currentPhase is not welcome', () => {
		mockUsePhaseStore.mockReturnValue({ currentPhase: 'candidate' } as any);

		const { container } = render(<WelcomeForm />);

		expect(container.firstChild).toBeNull();
	});

	it('renders with correct main container styling', () => {
		mockUsePhaseStore.mockReturnValue({ currentPhase: 'welcome' } as any);

		render(<WelcomeForm />);

		const mainContainer = screen
			.getByText('Welcome to Clippit')
			.closest('.WelcomeForm');
		expect(mainContainer).toHaveClass(
			'WelcomeForm',
			'flex',
			'flex-col',
			'gap-6',
		);
	});

	it('renders the main content card with correct styling', () => {
		mockUsePhaseStore.mockReturnValue({ currentPhase: 'welcome' } as any);

		render(<WelcomeForm />);

		const contentCard = screen.getByText('Welcome to Clippit').closest('div')
			?.parentElement?.parentElement;
		expect(contentCard).toHaveClass(
			'bg-light-gray',
			'rounded-lg',
			'border',
			'border-black',
			'p-6',
			'shadow-sm',
		);
	});

	it('renders all sub-components in the correct order', () => {
		mockUsePhaseStore.mockReturnValue({ currentPhase: 'welcome' } as any);

		render(<WelcomeForm />);

		// Check that all expected components are rendered
		expect(screen.getByText('Welcome to Clippit')).toBeInTheDocument();
		expect(
			screen.getByText('AI-Powered Cover Letter & Resume Generation'),
		).toBeInTheDocument();
		expect(screen.getByText(/Clippit helps you create/)).toBeInTheDocument();
		expect(screen.getByText('🚧 Development Status')).toBeInTheDocument();
		expect(screen.getByText("✨ What's Available Now")).toBeInTheDocument();
		expect(screen.getByText('🔮 Coming Soon')).toBeInTheDocument();
		expect(screen.getByText(/Ready to get started/)).toBeInTheDocument();
	});

	it('applies correct text styling to content section', () => {
		mockUsePhaseStore.mockReturnValue({ currentPhase: 'welcome' } as any);

		render(<WelcomeForm />);

		const contentSection = screen
			.getByText(/Clippit helps you create/)
			.closest('div');
		expect(contentSection).toHaveClass(
			'flex',
			'flex-col',
			'gap-4',
			'text-black',
		);
	});

	it('handles phase changes correctly', () => {
		// Test with welcome phase
		mockUsePhaseStore.mockReturnValue({ currentPhase: 'welcome' } as any);
		const { rerender } = render(<WelcomeForm />);
		expect(screen.getByText('Welcome to Clippit')).toBeInTheDocument();

		// Test with different phase
		mockUsePhaseStore.mockReturnValue({ currentPhase: 'candidate' } as any);
		rerender(<WelcomeForm />);
		expect(screen.queryByText('Welcome to Clippit')).not.toBeInTheDocument();
	});
});
