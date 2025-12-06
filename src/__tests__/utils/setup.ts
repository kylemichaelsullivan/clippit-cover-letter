import '@testing-library/jest-dom';
import { createElement } from 'react';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
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
}));

// Mock Font Awesome
vi.mock('@fortawesome/react-fontawesome', () => ({
	FontAwesomeIcon: ({ icon, ...props }: any) =>
		createElement(
			'span',
			{
				'data-testid': 'font-awesome-icon',
				...props,
			},
			icon?.iconName || 'icon'
		),
}));
