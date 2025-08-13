'use client';

import { useEffect } from 'react';
import { generateUIStyles } from '@/config/shared-styles';

export function StyleProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const existingStyle = document.getElementById('shared-styles');
		if (existingStyle) {
			return;
		}

		const styleElement = document.createElement('style');
		styleElement.id = 'shared-styles';
		styleElement.textContent = generateUIStyles();
		document.head.appendChild(styleElement);

		return () => {
			const style = document.getElementById('shared-styles');
			if (style) {
				style.remove();
			}
		};
	}, []);

	return <>{children}</>;
}
