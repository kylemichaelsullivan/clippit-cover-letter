import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useJobForm } from '@/lib/hooks/useJobForm';
import { useJobStore } from '@/lib/stores';

vi.mock('@/lib/stores', () => ({
	useJobStore: vi.fn(),
}));

describe('useJobForm', () => {
	const mockSetJobDetails = vi.fn();
	const mockSetJobField = vi.fn();
	const mockJobDetails = {
		companyName: 'Test Company',
		jobTitle: 'Software Engineer',
		jobDescription: 'Test description',
		hiringManager: 'John Doe',
		companyAddress: '123 Main St',
	};
	const mockUseJobStore = vi.mocked(useJobStore);

	beforeEach(() => {
		vi.clearAllMocks();
		mockUseJobStore.mockReturnValue({
			setJobDetails: mockSetJobDetails,
			setJobField: mockSetJobField,
			jobDetails: mockJobDetails,
		} as any);
	});

	it('returns form and handleFieldChange function', () => {
		const { result } = renderHook(() => useJobForm(vi.fn()));

		expect(result.current.form).toBeDefined();
		expect(result.current.handleFieldChange).toBeDefined();
		expect(typeof result.current.handleFieldChange).toBe('function');
	});

	it('calls setJobField with companyName when fieldName is companyName', () => {
		const { result } = renderHook(() => useJobForm(vi.fn()));

		result.current.handleFieldChange('companyName', 'New Company');

		expect(mockSetJobField).toHaveBeenCalledWith('companyName', 'New Company');
	});

	it('calls setJobField with jobTitle when fieldName is jobTitle', () => {
		const { result } = renderHook(() => useJobForm(vi.fn()));

		result.current.handleFieldChange('jobTitle', 'New Title');

		expect(mockSetJobField).toHaveBeenCalledWith('jobTitle', 'New Title');
	});

	it('calls setJobField with jobDescription when fieldName is jobDescription', () => {
		const { result } = renderHook(() => useJobForm(vi.fn()));

		result.current.handleFieldChange('jobDescription', 'New description');

		expect(mockSetJobField).toHaveBeenCalledWith(
			'jobDescription',
			'New description',
		);
	});

	it('calls setJobField with hiringManager when fieldName is hiringManager', () => {
		const { result } = renderHook(() => useJobForm(vi.fn()));

		result.current.handleFieldChange('hiringManager', 'New Manager');

		expect(mockSetJobField).toHaveBeenCalledWith(
			'hiringManager',
			'New Manager',
		);
	});

	it('calls setJobField with companyAddress when fieldName is companyAddress', () => {
		const { result } = renderHook(() => useJobForm(vi.fn()));

		result.current.handleFieldChange('companyAddress', 'New Address');

		expect(mockSetJobField).toHaveBeenCalledWith(
			'companyAddress',
			'New Address',
		);
	});

	it('handles unknown field names gracefully', () => {
		const { result } = renderHook(() => useJobForm(vi.fn()));

		result.current.handleFieldChange('unknownField', 'test value');

		expect(mockSetJobField).not.toHaveBeenCalled();
	});

	it('memoizes the handleFieldChange function', () => {
		const { result, rerender } = renderHook(() => useJobForm(vi.fn()));

		const firstFunction = result.current.handleFieldChange;
		rerender();
		const secondFunction = result.current.handleFieldChange;

		expect(firstFunction).toBe(secondFunction);
	});

	it('creates form with correct default values', () => {
		const { result } = renderHook(() => useJobForm(vi.fn()));

		expect(result.current.form).toBeDefined();
		expect(result.current.form.state.values).toEqual(mockJobDetails);
	});
});
