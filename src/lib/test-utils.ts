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

// Mock store data
export const mockCandidateStore = {
	candidateDetails: {
		fullName: 'John Doe',
		email: 'john@example.com',
		phone: '555-1234',
		linkedin: 'johndoe',
		portfolio: 'https://portfolio.com',
	},
};

export const mockAppStore = {
	includeCoverLetter: true,
	includeResume: true,
	coverLetterFontSize: [12, 'pt'] as const,
	resumeFontSize: [11, 'pt'] as const,
	setCoverLetterFontSize: vi.fn(),
	setResumeFontSize: vi.fn(),
};

export const mockTemplatesStore = {
	generatedCoverLetter: 'Generated cover letter content',
	generatedResume: 'Generated resume content',
};
