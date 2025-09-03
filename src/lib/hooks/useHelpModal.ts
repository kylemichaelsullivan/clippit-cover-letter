'use client';

import { useState, useCallback } from 'react';

export function useHelpModal() {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	return {
		isOpen,
		openModal,
		closeModal,
	};
}
