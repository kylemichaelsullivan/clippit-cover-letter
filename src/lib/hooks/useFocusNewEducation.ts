'use client';

import { useCallback, useRef } from 'react';

export function useFocusNewEducation() {
	const focusRefs = useRef<Map<number, HTMLInputElement>>(new Map());

	const registerFocusRef = useCallback(
		(educationIndex: number, inputElement: HTMLInputElement | null) => {
			if (inputElement) {
				focusRefs.current.set(educationIndex, inputElement);
			} else {
				focusRefs.current.delete(educationIndex);
			}
		},
		[],
	);

	const focusNewEducation = useCallback((educationIndex: number) => {
		const inputElement = focusRefs.current.get(educationIndex);
		if (inputElement) {
			setTimeout(() => {
				inputElement.focus();
				inputElement.select();
			}, 0);
		}
	}, []);

	return {
		registerFocusRef,
		focusNewEducation,
	};
}
