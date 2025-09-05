import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Custom render function that can be extended with providers
export function customRender(
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) {
	return render(ui, {
		...options,
	});
}

// Render with specific test IDs for easier testing
export function renderWithTestIds(ui: ReactElement) {
	return render(ui, {
		// Add any specific configuration for test IDs
	});
}

// Render with accessibility testing in mind
export function renderWithA11y(ui: ReactElement) {
	return render(ui, {
		// Add any specific configuration for accessibility testing
	});
}

// Re-export everything from testing library
export * from '@testing-library/react';
