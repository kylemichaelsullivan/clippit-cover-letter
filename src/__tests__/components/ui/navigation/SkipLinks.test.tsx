import { SkipLink } from '@/components/ui/navigation';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

const mockTargetElements = () => {
	// Mock PhaseSwitcher container
	const phaseSwitcherContainer = document.createElement('div');
	phaseSwitcherContainer.id = 'PhaseSwitcher';
	phaseSwitcherContainer.setAttribute('tabIndex', '-1');

	// Mock nav element
	const nav = document.createElement('nav');
	nav.setAttribute('role', 'tablist');

	// Mock buttons
	const button1 = document.createElement('button');
	button1.textContent = 'Candidate';
	button1.setAttribute('role', 'tab');

	const button2 = document.createElement('button');
	button2.textContent = 'Skills';
	button2.setAttribute('role', 'tab');

	nav.appendChild(button1);
	nav.appendChild(button2);
	phaseSwitcherContainer.appendChild(nav);

	// Mock Body container
	const bodyContainer = document.createElement('main');
	bodyContainer.id = 'Body';
	bodyContainer.setAttribute('tabIndex', '-1');

	// Mock form elements
	const input1 = document.createElement('input');
	input1.type = 'text';
	input1.id = 'fullName';
	input1.placeholder = 'Full Name';

	const input2 = document.createElement('input');
	input2.type = 'email';
	input2.id = 'email';
	input2.placeholder = 'Email';

	bodyContainer.appendChild(input1);
	bodyContainer.appendChild(input2);

	// Add to document
	document.body.appendChild(phaseSwitcherContainer);
	document.body.appendChild(bodyContainer);

	return { phaseSwitcherContainer, bodyContainer, button1, input1 };
};

describe('SkipLinks', () => {
	beforeEach(() => {
		// Clear document body
		document.body.innerHTML = '';
		// Set up mock elements
		mockTargetElements();
	});

	it('should focus the first button when Skip to Navigation is activated', () => {
		render(<SkipLink href='#PhaseSwitcher' destination='Navigation' />);

		const skipLink = screen.getByText('Skip to Navigation');
		fireEvent.click(skipLink);

		// Check that the first button is focused
		const firstButton = document.querySelector('#PhaseSwitcher button');
		expect(firstButton).toHaveFocus();
		expect(firstButton?.textContent).toBe('Candidate');
	});

	it('should focus the first input when Skip to Body is activated', () => {
		render(<SkipLink href='#Body' destination='Body' />);

		const skipLink = screen.getByText('Skip to Body');
		fireEvent.click(skipLink);

		// Check that the first input is focused
		const firstInput = document.querySelector('#Body input');
		expect(firstInput).toHaveFocus();
		expect(firstInput?.id).toBe('fullName');
	});

	it('should prevent default navigation behavior', () => {
		render(<SkipLink href='#PhaseSwitcher' destination='Navigation' />);

		const skipLink = screen.getByText('Skip to Navigation');
		const clickEvent = new MouseEvent('click', { bubbles: true });
		const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

		fireEvent(skipLink, clickEvent);

		expect(preventDefaultSpy).toHaveBeenCalled();
	});

	it('should handle keyboard activation (Enter key)', () => {
		render(<SkipLink href='#Body' destination='Body' />);

		const skipLink = screen.getByText('Skip to Body');
		fireEvent.keyDown(skipLink, { key: 'Enter', code: 'Enter' });

		// Check that the first input is focused
		const firstInput = document.querySelector('#Body input');
		expect(firstInput).toHaveFocus();
	});

	it('should work with different target elements', () => {
		// Test with a different target structure
		const customContainer = document.createElement('div');
		customContainer.id = 'CustomTarget';
		customContainer.setAttribute('tabIndex', '-1');

		const customButton = document.createElement('button');
		customButton.textContent = 'Custom Button';
		customContainer.appendChild(customButton);
		document.body.appendChild(customContainer);

		render(<SkipLink href='#CustomTarget' destination='Custom' />);

		const skipLink = screen.getByText('Skip to Custom');
		fireEvent.click(skipLink);

		expect(customButton).toHaveFocus();
	});

	it('should handle cases where target element does not exist', () => {
		render(<SkipLink href='#NonExistent' destination='NonExistent' />);

		const skipLink = screen.getByText('Skip to NonExistent');

		// Should not throw an error
		expect(() => {
			fireEvent.click(skipLink);
		}).not.toThrow();
	});

	it('should handle cases where no focusable elements exist in target', () => {
		const emptyContainer = document.createElement('div');
		emptyContainer.id = 'EmptyTarget';
		emptyContainer.setAttribute('tabIndex', '-1');
		document.body.appendChild(emptyContainer);

		render(<SkipLink href='#EmptyTarget' destination='Empty' />);

		const skipLink = screen.getByText('Skip to Empty');

		// Should not throw an error
		expect(() => {
			fireEvent.click(skipLink);
		}).not.toThrow();
	});
});
