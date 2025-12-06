import { Button } from '@/components/ui/buttons/Button';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Button', () => {
	it('renders with correct text', () => {
		render(<Button>Click me</Button>);
		expect(
			screen.getByRole('button', { name: 'Click me' })
		).toBeInTheDocument();
	});

	it('handles click events', () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click me</Button>);

		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('applies correct color classes', () => {
		render(<Button color='secondary'>Secondary Button</Button>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass(
			'bg-light-gray',
			'hover:bg-gray',
			'border',
			'text-black'
		);
	});

	it('is disabled when disabled prop is true', () => {
		render(<Button disabled>Disabled Button</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});
});
