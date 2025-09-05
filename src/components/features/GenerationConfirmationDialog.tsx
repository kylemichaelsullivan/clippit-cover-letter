'use client';

import { memo } from 'react';

import { ConfirmationDialog } from '@/components/ui/feedback';

type GenerationConfirmationDialogProps = {
	title: string;
	message: string;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	confirmText?: string;
	cancelText?: string;
};

export const GenerationConfirmationDialog = memo(function GenerationConfirmationDialog({
	title,
	message,
	isOpen,
	onClose,
	onConfirm,
	confirmText = 'Generate New',
	cancelText = 'Cancel',
}: GenerationConfirmationDialogProps) {
	return (
		<ConfirmationDialog
			title={title}
			message={message}
			isOpen={isOpen}
			confirmText={confirmText}
			cancelText={cancelText}
			onClose={onClose}
			onConfirm={onConfirm}
		/>
	);
});

