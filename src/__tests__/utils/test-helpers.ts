import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { expect, vi } from 'vitest';

// Test data factories
export function createMockForm() {
	return {
		getFieldValue: vi.fn(),
		setFieldValue: vi.fn(),
		handleSubmit: vi.fn(),
	};
}

export function createMockField(value: any = '') {
	return {
		state: { value },
		handleChange: vi.fn(),
	};
}

export function createMockStore() {
	return {
		getState: vi.fn(),
		setState: vi.fn(),
		subscribe: vi.fn(),
	};
}

// Mock function factories
export function createMockHandler() {
	return vi.fn();
}

export function createMockAsyncHandler() {
	return vi.fn().mockResolvedValue(undefined);
}

export function createMockErrorHandler() {
	return vi.fn().mockRejectedValue(new Error('Test error'));
}

// Test data generators
export function generateMockSkills(count = 5): string[] {
	const skills = [
		'JavaScript',
		'TypeScript',
		'React',
		'Node.js',
		'Python',
		'SQL',
		'MongoDB',
		'Docker',
		'AWS',
		'Git',
		'HTML',
		'CSS',
		'Vue.js',
		'Angular',
		'Express',
		'Next.js',
		'GraphQL',
		'Redis',
		'PostgreSQL',
		'Kubernetes',
	];
	return skills.slice(0, count);
}

export function generateMockExperience(count = 3) {
	const companies = [
		'Tech Corp',
		'Startup Inc',
		'Big Company',
		'Innovation Labs',
	];
	const titles = [
		'Software Engineer',
		'Senior Developer',
		'Tech Lead',
		'Principal Engineer',
	];

	return Array.from({ length: count }, (_, index) => ({
		id: `exp-${index + 1}`,
		include: true,
		title: titles[index % titles.length],
		company: companies[index % companies.length],
		start: `${2020 + index}-01`,
		end: index === 0 ? 'Present' : `${2021 + index}-12`,
		bullets: [
			`Developed ${titles[index % titles.length].toLowerCase()} solutions`,
			'Collaborated with cross-functional teams',
			'Improved system performance',
		],
	}));
}

export function generateMockEducation(count = 2) {
	const degrees = [
		'Bachelor of Science',
		'Master of Science',
		'Bachelor of Arts',
	];
	const institutions = [
		'University of Technology',
		'State University',
		'Tech Institute',
	];

	return Array.from({ length: count }, (_, index) => ({
		id: `edu-${index + 1}`,
		include: true,
		degree: degrees[index % degrees.length],
		graduationYear: `${2015 + index * 2}`,
		institution: institutions[index % institutions.length],
		location: `City ${index + 1}, State`,
	}));
}

// Test utilities
export function createMockEvent(target: any = {}) {
	return {
		target: {
			value: '',
			...target,
		},
		preventDefault: vi.fn(),
		stopPropagation: vi.fn(),
	};
}

export function createMockClipboardEvent(data: string) {
	return {
		clipboardData: {
			getData: () => data,
		},
		preventDefault: vi.fn(),
	};
}

export function createMockKeyboardEvent(key: string, options: any = {}) {
	return {
		key,
		preventDefault: vi.fn(),
		stopPropagation: vi.fn(),
		...options,
	};
}

// Custom render function with providers
export function renderWithProviders(
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) {
	return render(ui, {
		...options,
	});
}

// Test assertions helpers
export function expectToBeInDocument(element: HTMLElement | null) {
	expect(element).toBeInTheDocument();
}

export function expectToHaveClass(
	element: HTMLElement | null,
	className: string
) {
	expect(element).toHaveClass(className);
}

export function expectToHaveAttribute(
	element: HTMLElement | null,
	attribute: string,
	value?: string
) {
	if (value !== undefined) {
		expect(element).toHaveAttribute(attribute, value);
	} else {
		expect(element).toHaveAttribute(attribute);
	}
}

export function expectToHaveTextContent(
	element: HTMLElement | null,
	text: string
) {
	expect(element).toHaveTextContent(text);
}

// Mock API responses
export function createMockApiResponse(data: any, status = 200) {
	return {
		ok: status >= 200 && status < 300,
		status,
		json: vi.fn().mockResolvedValue(data),
		text: vi.fn().mockResolvedValue(JSON.stringify(data)),
	};
}

export function createMockApiError(message: string, status = 500) {
	return {
		ok: false,
		status,
		statusText: message,
		json: vi.fn().mockResolvedValue({ error: { message } }),
	};
}

// Test cleanup utilities
export function clearAllMocks() {
	vi.clearAllMocks();
}

export function resetAllMocks() {
	vi.resetAllMocks();
}

export function restoreAllMocks() {
	vi.restoreAllMocks();
}
