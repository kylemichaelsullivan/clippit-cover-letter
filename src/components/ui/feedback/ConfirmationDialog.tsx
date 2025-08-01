'use client';

import { memo, useState } from 'react';

import { Button } from '@/components/ui/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faExclamationTriangle,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';

type ConfirmationDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
};

export const ConfirmationDialog = memo(function ConfirmationDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = 'Clear All Data',
	cancelText = 'Cancel',
}: ConfirmationDialogProps) {
	const [isClearing, setIsClearing] = useState(false);

	const handleConfirm = async () => {
		setIsClearing(true);
		try {
			await onConfirm();
		} finally {
			setIsClearing(false);
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className='ConfirmationDialog bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
			<div className='mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-3'>
						<FontAwesomeIcon icon={faExclamationTriangle} aria-hidden='true' />
						<h3 className='text-lg font-semibold text-black'>{title}</h3>
					</div>

					<p className='text-gray'>{message}</p>

					<div className='flex justify-end gap-3'>
						<Button
							onClick={onClose}
							disabled={isClearing}
							className='px-4 py-2'
							title={cancelText}
							componentName='ConfirmationDialogCancelButton'
						>
							{cancelText}
						</Button>

						<Button
							onClick={handleConfirm}
							disabled={isClearing}
							className='bg-red hover:bg-red flex items-center gap-2 px-4 py-2 text-white'
							title={confirmText}
							componentName='ConfirmationDialogConfirmButton'
						>
							{isClearing ? (
								'Clearing...'
							) : (
								<>
									<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
									{confirmText}
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
});
