'use client';

import { useCallback, useRef } from 'react';

export function useFocusNewExperience() {
	const focusRefs = useRef<Map<number, HTMLInputElement>>(new Map());

	const registerFocusRef = useCallback(
		(experienceIndex: number, inputElement: HTMLInputElement | null) => {
			if (inputElement) {
				focusRefs.current.set(experienceIndex, inputElement);
			} else {
				focusRefs.current.delete(experienceIndex);
			}
		},
		[]
	);

	const focusNewExperience = useCallback((experienceIndex: number) => {
		const inputElement = focusRefs.current.get(experienceIndex);
		if (inputElement) {
			setTimeout(() => {
				inputElement.focus();
				inputElement.select();
			}, 0);
		}
	}, []);

	return {
		registerFocusRef,
		focusNewExperience,
	};
}
