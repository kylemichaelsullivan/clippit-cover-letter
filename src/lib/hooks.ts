'use client';

import { useEffect, useState, useRef, RefObject, useCallback } from 'react';

/**
 * Hook for auto-saving form data with debouncing
 */
export function useAutoSave<T>(
	formRef: RefObject<{ state: { values: T } }>,
	formClassName: string,
	saveFunction: (values: T) => void,
	validationSchema?: {
		safeParse: (data: unknown) => { success: boolean; data?: T };
	},
	debounceMs: number = 300,
) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const saveFormValues = () => {
			if (!formRef.current) return;

			const form = formRef.current;
			const formValues = form.state.values;

			if (validationSchema) {
				const result = validationSchema.safeParse(formValues);
				if (result.success) {
					saveFunction(result.data!);
				}
			} else {
				saveFunction(formValues as T);
			}
		};

		const handleFieldChange = () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(saveFormValues, debounceMs);
		};

		const formElement = document.querySelector(`.${formClassName}`);
		if (formElement) {
			formElement.addEventListener('blur', handleFieldChange, true);
			formElement.addEventListener('input', handleFieldChange, true);
		}

		return () => {
			if (formElement) {
				formElement.removeEventListener('blur', handleFieldChange, true);
				formElement.removeEventListener('input', handleFieldChange, true);
			}
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [formRef, formClassName, saveFunction, validationSchema, debounceMs]);
}

/**
 * Hook to safely access browser APIs
 * Returns null during SSR and the actual value on client
 */
export function useBrowserAPI<T>(getValue: () => T): T | null {
	const [value, setValue] = useState<T | null>(null);
	const isClient = useIsClient();

	useEffect(() => {
		if (isClient) {
			try {
				setValue(getValue());
			} catch (error) {
				console.warn('Failed to access browser API:', error);
			}
		}
	}, [isClient, getValue]);

	return value;
}

/**
 * Hook for debouncing values with a configurable delay
 */
export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

/**
 * Hook for throttled field updates in TanStack Form
 * Provides immediate UI updates with throttled form state updates
 */
export function useThrottledField<T>(
	field: { state: { value: T }; handleChange: (value: T) => void },
	throttleMs: number = 100,
) {
	const [localValue, setLocalValue] = useState<T>(field.state.value);
	const lastUpdateRef = useRef<number>(0);
	const pendingValueRef = useRef<T | null>(null);

	useEffect(() => {
		setLocalValue(field.state.value);
	}, [field.state.value]);

	const throttledChange = useCallback(
		(value: T) => {
			const now = Date.now();

			if (now - lastUpdateRef.current >= throttleMs) {
				field.handleChange(value);
				lastUpdateRef.current = now;
				pendingValueRef.current = null;
			} else {
				pendingValueRef.current = value;
			}
		},
		[field, throttleMs],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			if (pendingValueRef.current !== null) {
				field.handleChange(pendingValueRef.current);
				lastUpdateRef.current = Date.now();
				pendingValueRef.current = null;
			}
		}, throttleMs);

		return () => clearInterval(interval);
	}, [field, throttleMs]);

	const handleChange = useCallback(
		(value: T) => {
			setLocalValue(value);
			throttledChange(value);
		},
		[throttledChange],
	);

	return {
		value: localValue,
		onChange: handleChange,
	};
}

/**
 * Hook to detect if component is mounted on client
 * Useful for preventing hydration mismatches
 */
export function useIsClient() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return isClient;
}

/**
 * Hook for localStorage with SSR safety
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(initialValue);
	const isClient = useIsClient();

	useEffect(() => {
		if (isClient) {
			try {
				const item = window.localStorage.getItem(key);
				if (item) {
					setStoredValue(JSON.parse(item));
				}
			} catch (error) {
				console.warn(`Error reading localStorage key "${key}":`, error);
			}
		}
	}, [key, isClient]);

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);

			if (isClient) {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setValue] as const;
}

export { useCandidateForm } from './hooks/useCandidateForm';
export { useConfirmationStack } from './hooks/useConfirmationStack';
export { useCoverLetterGeneration } from './hooks/useCoverLetterGeneration';
export { useDocumentGeneration } from './hooks/useDocumentGeneration';
export { useFocusNewEducation } from './hooks/useFocusNewEducation';
export { useFocusNewSkillGroup } from './hooks/useFocusNewSkillGroup';
export { useGenerationConfirmations } from './hooks/useGenerationConfirmations';
export { useJobForm } from './hooks/useJobForm';
export { useModalClose } from './hooks/useModalClose';
export { useResumeGeneration } from './hooks/useResumeGeneration';
export { useSkipLinkFocus } from './hooks/useSkipLinkFocus';
export { useSkipLinkTarget } from './hooks/useSkipLinkTarget';
export { useSkillsForm } from './hooks/useSkillsForm';
export { useResumeForm } from './hooks/useResumeForm';
export { useSummaryForm } from './hooks/useSummaryForm';
