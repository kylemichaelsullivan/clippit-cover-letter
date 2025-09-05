import { vi } from 'vitest';
import { createElement } from 'react';

// Mock TanStack Form
export const mockField = ({ children }: any) => {
	const mockFieldApi = {
		state: { value: '' },
		handleChange: vi.fn(),
	};
	return children(mockFieldApi);
};

// Mock UI Components
export const mockButton = ({ children, onClick, disabled, ...props }: any) =>
	createElement('button', { onClick, disabled, ...props }, children);

export const mockInput = ({ value, onChange, placeholder, ...props }: any) =>
	createElement('input', {
		value,
		onChange: (e: any) => onChange?.(e.target.value),
		placeholder,
		...props,
	});

export const mockTextarea = ({
	value,
	onChange,
	placeholder,
	rows,
	...props
}: any) =>
	createElement('textarea', {
		value,
		onChange: (e: any) => onChange?.(e.target.value),
		placeholder,
		rows,
		...props,
	});

export const mockLabel = ({ children, htmlFor }: any) =>
	createElement('label', { htmlFor }, children);

// Mock FontAwesome
export const mockFontAwesomeIcon = ({ icon, ...props }: any) =>
	createElement(
		'span',
		{ 'data-testid': 'font-awesome-icon', ...props },
		icon?.iconName || 'icon',
	);

// Mock Form Components
export const mockFormFieldContainer = ({ children, className }: any) =>
	createElement(
		'div',
		{ className, 'data-testid': 'form-field-container' },
		children,
	);

export const mockFormFieldLabel = ({ children, labelContent, htmlFor }: any) =>
	createElement(
		'label',
		{ htmlFor, 'data-testid': 'form-field-label' },
		children,
		labelContent,
	);

// Mock Navigation Components
export const mockSkipLinkTarget = ({ children, id }: any) =>
	createElement('div', { 'data-testid': `skip-link-${id}` }, children);

// Mock Feedback Components
export const mockError = ({ children }: any) =>
	createElement('div', { 'data-testid': 'error' }, children);

export const mockEmptyState = ({ variant }: any) =>
	createElement(
		'div',
		{ 'data-testid': 'empty-state', 'data-variant': variant },
		`Empty State - ${variant}`,
	);

// Mock Document Components
export const mockDocumentSection = ({
	documentType,
	title,
	content,
	showActions,
	showFontSizeControl,
	className,
}: any) =>
	createElement(
		'div',
		{
			'data-testid': `document-section-${documentType}`,
			'data-show-actions': showActions,
			'data-show-font-size': showFontSizeControl,
			className,
		},
		`${title} - ${content} - ${documentType}`,
	);

export const mockFontSizeInput = ({
	value,
	documentType,
	label,
	ariaLabel,
}: any) =>
	createElement(
		'div',
		{ 'data-testid': `font-size-input-${documentType}` },
		`${value} - ${documentType} - ${label} - ${ariaLabel}`,
	);
