import { type RefObject, useEffect, useRef } from 'react';

type UseModalCloseOptions = {
	onClose: () => void;
	isOpen: boolean;
};

export function useModalClose({
	onClose,
	isOpen,
}: UseModalCloseOptions): RefObject<HTMLDivElement | null> {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose, isOpen]);

	return modalRef;
}
