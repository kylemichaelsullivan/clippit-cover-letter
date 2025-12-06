'use client';

import { generateUIStyles } from '@/config/shared-styles';
import { type ReactNode, useEffect } from 'react';

export function StyleProvider({ children }: { children: ReactNode }) {
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
