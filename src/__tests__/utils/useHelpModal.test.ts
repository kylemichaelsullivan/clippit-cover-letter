import { useHelpModal } from '@/lib/hooks/useHelpModal';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('useHelpModal', () => {
	it('initializes with modal closed', () => {
		const { result } = renderHook(() => useHelpModal());

		expect(result.current.isOpen).toBe(false);
	});

	it('opens modal when openModal is called', () => {
		const { result } = renderHook(() => useHelpModal());

		act(() => {
			result.current.openModal();
		});

		expect(result.current.isOpen).toBe(true);
	});

	it('closes modal when closeModal is called', () => {
		const { result } = renderHook(() => useHelpModal());

		act(() => {
			result.current.openModal();
		});

		act(() => {
			result.current.closeModal();
		});

		expect(result.current.isOpen).toBe(false);
	});

	it('maintains separate state instances', () => {
		const { result: result1 } = renderHook(() => useHelpModal());
		const { result: result2 } = renderHook(() => useHelpModal());

		act(() => {
			result1.current.openModal();
		});

		expect(result1.current.isOpen).toBe(true);
		expect(result2.current.isOpen).toBe(false);
	});

	it('returns stable function references', () => {
		const { result, rerender } = renderHook(() => useHelpModal());

		const initialOpenModal = result.current.openModal;
		const initialCloseModal = result.current.closeModal;

		rerender();

		expect(result.current.openModal).toBe(initialOpenModal);
		expect(result.current.closeModal).toBe(initialCloseModal);
	});
});
