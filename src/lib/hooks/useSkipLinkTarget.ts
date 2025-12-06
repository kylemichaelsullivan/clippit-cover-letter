import { useCallback, useRef } from 'react';

export function useSkipLinkTarget() {
	const targetRef = useRef<HTMLDivElement>(null);

	const focusFirstElement = useCallback(() => {
		if (targetRef.current) {
			const focusableElements = targetRef.current.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);

			if (focusableElements.length > 0) {
				const firstElement = focusableElements[0] as HTMLElement;
				firstElement.focus();
			}
		}
	}, []);

	return { targetRef, focusFirstElement };
}
