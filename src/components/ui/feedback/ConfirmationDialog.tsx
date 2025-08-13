'use client';

import { memo, useState, useMemo, useEffect } from 'react';

import { Button } from '@/components/ui/buttons';
import { Checkbox } from '@/components/ui/input';
import { useModalClose } from '@/lib/hooks/useModalClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faExclamationTriangle,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';

type ConfirmationDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (selectedItems?: string[]) => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	availableItems?: Array<{
		id: string;
		label: string;
		checked: boolean;
	}>;
};

export const ConfirmationDialog = memo(function ConfirmationDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = 'Clear All Data',
	cancelText = 'Cancel',
	availableItems,
}: ConfirmationDialogProps) {
	const [isClearing, setIsClearing] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const modalRef = useModalClose({ onClose, isOpen });

	useEffect(() => {
		if (availableItems) {
			setSelectedItems(availableItems.map((item) => item.id));
		}
	}, [availableItems]);

	const handleItemToggle = (itemId: string, checked: boolean) => {
		if (checked) {
			setSelectedItems((prev) => [...prev, itemId]);
		} else {
			setSelectedItems((prev) => prev.filter((id) => id !== itemId));
		}
	};

	const allItemsSelected = useMemo(() => {
		return (
			availableItems &&
			availableItems.length > 0 &&
			availableItems.every((item) => selectedItems.includes(item.id))
		);
	}, [availableItems, selectedItems]);

	const dynamicConfirmText = useMemo(() => {
		if (!availableItems || availableItems.length === 0) {
			return confirmText;
		}
		return allItemsSelected ? 'Generate All' : 'Generate Selected';
	}, [availableItems, allItemsSelected, confirmText]);

	const handleConfirm = async () => {
		if (availableItems && selectedItems.length === 0) {
			return;
		}

		setIsClearing(true);
		onClose();
		try {
			if (availableItems) {
				await onConfirm(selectedItems);
			} else {
				await onConfirm();
			}
		} finally {
			setIsClearing(false);
		}
	};

	const handleCancel = () => {
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='ConfirmationDialog fixed inset-0 z-50 flex items-center justify-center'>
			<div className='Backdrop absolute inset-0 bg-black/75'></div>
			<div
				className='ModalContent z-10 mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg'
				ref={modalRef}
			>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-3'>
						<FontAwesomeIcon icon={faExclamationTriangle} aria-hidden='true' />
						<h3 className='text-lg font-semibold text-black'>{title}</h3>
					</div>

					<p className='text-gray'>{message}</p>

					{availableItems && (
						<div className='flex flex-col gap-2'>
							{availableItems.map((item) => (
								<Checkbox
									key={item.id}
									checked={selectedItems.includes(item.id)}
									onChange={(checked) => handleItemToggle(item.id, checked)}
									label={item.label}
									className='text-sm'
								/>
							))}
						</div>
					)}

					<div className='flex justify-end gap-3'>
						<Button
							onClick={handleCancel}
							disabled={isClearing}
							className='px-4 py-2'
							title={cancelText}
							componentName='ConfirmationDialogCancelButton'
						>
							{cancelText}
						</Button>

						<Button
							onClick={handleConfirm}
							disabled={
								isClearing || (availableItems && selectedItems.length === 0)
							}
							className='bg-red hover:bg-red flex items-center gap-2 px-4 py-2 text-white'
							title={dynamicConfirmText}
							componentName='ConfirmationDialogConfirmButton'
						>
							{isClearing ? (
								'Clearing...'
							) : (
								<>
									<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
									{dynamicConfirmText}
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
});
