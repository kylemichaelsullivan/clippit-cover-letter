'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useConfirmationStack } from '@/lib/hooks/useConfirmationStack';

type ConfirmationContextType = {
	addConfirmation: (onCancel: () => void) => void;
	removeConfirmation: (onCancel: () => void) => void;
};

const ConfirmationContext = createContext<ConfirmationContextType | null>(null);

type ConfirmationProviderProps = {
	children: ReactNode;
};

export function ConfirmationProvider({ children }: ConfirmationProviderProps) {
	const { addConfirmation, removeConfirmation } = useConfirmationStack();

	return (
		<ConfirmationContext.Provider
			value={{ addConfirmation, removeConfirmation }}
		>
			{children}
		</ConfirmationContext.Provider>
	);
}

export function useConfirmationContext() {
	const context = useContext(ConfirmationContext);
	if (!context) {
		throw new Error(
			'useConfirmationContext must be used within a ConfirmationProvider',
		);
	}
	return context;
}
