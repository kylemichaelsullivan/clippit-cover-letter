'use client';

import { useEffect, type ReactNode } from 'react';
import { useModalClose } from '@/lib/hooks/useModalClose';

type PopoverProps = {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	triggerElement: HTMLElement | null;
	className?: string;
};

export function Popover({
	children,
	isOpen,
	onClose,
	triggerElement,
	className = '',
}: PopoverProps) {
	const popoverRef = useModalClose({ onClose, isOpen });

	useEffect(() => {
		if (!isOpen || !popoverRef.current || !triggerElement) return;

		const popover = popoverRef.current;
		const rect = triggerElement.getBoundingClientRect();

		popover.style.position = 'fixed';
		popover.style.bottom = `${window.innerHeight - rect.top + 8}px`;
		popover.style.left = `${rect.left + rect.width / 2}px`;
		popover.style.transform = 'translateX(-50%)';
	}, [isOpen, triggerElement, popoverRef]);

	if (!isOpen) return null;

	return (
		<div
			ref={popoverRef}
			className={`border-gray absolute z-50 mb-2 rounded-lg border bg-white shadow-lg ${className}`}
			role='menu'
			aria-orientation='vertical'
		>
			{children}
		</div>
	);
}
