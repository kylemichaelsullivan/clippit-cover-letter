import { vi } from 'vitest';

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

// Mock TanStack Form components
export const mockField = ({ children }: any) => {
	const mockFieldApi = {
		state: { value: '' },
		handleChange: vi.fn(),
	};
	return children(mockFieldApi);
};
