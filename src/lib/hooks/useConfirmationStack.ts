import { useRef, useCallback, useEffect } from 'react';

type ConfirmationHandler = () => void;

export function useConfirmationStack() {
	const confirmationStack = useRef<ConfirmationHandler[]>([]);

	const addConfirmation = useCallback((onCancel: ConfirmationHandler) => {
		confirmationStack.current.push(onCancel);
	}, []);

	const removeConfirmation = useCallback((onCancel: ConfirmationHandler) => {
		const index = confirmationStack.current.indexOf(onCancel);
		if (index > -1) {
			confirmationStack.current.splice(index, 1);
		}
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && confirmationStack.current.length > 0) {
				const lastConfirmation =
					confirmationStack.current[confirmationStack.current.length - 1];
				lastConfirmation();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return { addConfirmation, removeConfirmation };
}
