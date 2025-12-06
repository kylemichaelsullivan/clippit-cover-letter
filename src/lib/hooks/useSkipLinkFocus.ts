import { useEffect } from 'react';

export function useSkipLinkFocus(targetId: string) {
	useEffect(() => {
		const handleHashChange = () => {
			if (window.location.hash === `#${targetId}`) {
				const targetElement = document.getElementById(targetId);
				if (targetElement) {
					// Use a small delay to ensure dynamic content is rendered
					setTimeout(() => {
						const focusableElements = targetElement.querySelectorAll(
							'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
						);

						if (focusableElements.length > 0) {
							const firstElement = focusableElements[0] as HTMLElement;
							firstElement.focus();
						}
					}, 50);
				}
			}
		};

		window.addEventListener('hashchange', handleHashChange);

		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	}, [targetId]);
}
