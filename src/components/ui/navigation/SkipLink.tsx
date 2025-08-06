'use client';

import { memo, type MouseEvent } from 'react';

type SkipLinkProps = {
	href: string;
	destination: string;
	tabIndex?: number;
	onClick?: () => void;
};

const targetRegistry = new Map<string, HTMLDivElement>();

export const registerSkipLinkTarget = (id: string, element: HTMLDivElement) => {
	targetRegistry.set(id, element);
};

export const unregisterSkipLinkTarget = (id: string) => {
	targetRegistry.delete(id);
};

export const SkipLink = memo(function SkipLink({
	href,
	destination,
	tabIndex,
	onClick,
}: SkipLinkProps) {
	const handleActivation = () => {
		const targetId = href.replace('#', '');

		let targetElement = targetRegistry.get(targetId);

		if (!targetElement) {
			targetElement = document.getElementById(targetId) as HTMLDivElement;
		}

		if (targetElement) {
			const focusableElements = targetElement.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
			);

			if (focusableElements.length > 0) {
				const firstElement = focusableElements[0] as HTMLElement;
				firstElement.focus();
			}
		}
	};

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (onClick) {
			onClick();
		} else {
			handleActivation();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (onClick) {
				onClick();
			} else {
				handleActivation();
			}
		}
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			tabIndex={tabIndex}
			className='SkipLink bg-blue absolute -top-96 rounded-lg px-4 py-2 text-center text-sm font-medium text-white focus:relative focus:top-0 focus:z-50 focus:outline-none'
		>
			{`Skip to ${destination}`}
		</a>
	);
});
