import { vi } from 'vitest';
import { createElement } from 'react';

// Mock Next.js router
export const mockNextRouter = {
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	}),
	useSearchParams: () => new URLSearchParams(),
	usePathname: () => '/',
};

// Mock FontAwesome
export const mockFontAwesome = {
	FontAwesomeIcon: ({ icon, ...props }: any) =>
		createElement(
			'span',
			{ 'data-testid': 'font-awesome-icon', ...props },
			icon?.iconName || 'icon',
		),
};

export const mockFontAwesomeIcons = {
	faTimes: { iconName: 'times' },
	faPlus: { iconName: 'plus' },
	faThumbtack: { iconName: 'thumbtack' },
	faEdit: { iconName: 'edit' },
	faTrash: { iconName: 'trash' },
	faCheck: { iconName: 'check' },
	faExclamationTriangle: { iconName: 'exclamation-triangle' },
};

// Mock TanStack Form
export const mockTanStackForm = {
	Field: ({ children }: any) => {
		const mockField = {
			state: { value: '' },
			handleChange: vi.fn(),
		};
		return children(mockField);
	},
	useForm: () => ({
		getFieldValue: vi.fn(),
		setFieldValue: vi.fn(),
		handleSubmit: vi.fn(),
	}),
};

// Mock localStorage
export const mockLocalStorage = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

// Mock fetch
export const mockFetch = vi.fn();

// Mock window.matchMedia
export const mockMatchMedia = (matches: boolean = true) => ({
	matches,
	media: '',
	onchange: null,
	addListener: vi.fn(),
	removeListener: vi.fn(),
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	dispatchEvent: vi.fn(),
});

// Mock IntersectionObserver
export const mockIntersectionObserver = {
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
};

// Mock ResizeObserver
export const mockResizeObserver = {
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
};
