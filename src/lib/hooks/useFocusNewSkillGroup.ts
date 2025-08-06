'use client';

import { useRef, useCallback } from 'react';

export function useFocusNewSkillGroup() {
	const focusRefs = useRef<Map<number, HTMLInputElement>>(new Map());

	const registerFocusRef = useCallback(
		(groupIndex: number, inputElement: HTMLInputElement | null) => {
			if (inputElement) {
				focusRefs.current.set(groupIndex, inputElement);
			} else {
				focusRefs.current.delete(groupIndex);
			}
		},
		[],
	);

	const focusNewGroup = useCallback((groupIndex: number) => {
		setTimeout(() => {
			const inputElement = focusRefs.current.get(groupIndex);
			if (inputElement) {
				inputElement.focus();
			}
		}, 0);
	}, []);

	return {
		registerFocusRef,
		focusNewGroup,
	};
}
