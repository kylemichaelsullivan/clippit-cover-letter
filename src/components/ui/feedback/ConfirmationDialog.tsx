'use client';

import { memo, useState, useMemo, useEffect } from 'react';

import { Button } from '@/components/ui/buttons';
import { Checkbox } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalBackdrop } from './ModalBackdrop';
import { ModalHeader } from './ModalHeader';
import {
	faExclamationTriangle,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useModalClose } from '@/lib/hooks/useModalClose';
import type { SelectableItems } from '@/types';

type ConfirmationDialogProps = {
	title: string;
	message: string;
	isOpen: boolean;
	onConfirm: (selectedItems?: string[]) => void;
	onClose: () => void;
	availableItems?: SelectableItems;
	confirmText?: string;
	cancelText?: string;
};

export const ConfirmationDialog = memo(function ConfirmationDialog({
	title,
	message,
	isOpen,
	availableItems,
	confirmText = 'Clear All Data',
	cancelText = 'Cancel',
	onConfirm,
	onClose,
}: ConfirmationDialogProps) {
	const [isClearing, setIsClearing] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const modalRef = useModalClose({ onClose, isOpen });

	useEffect(() => {
		if (availableItems) {
			const initiallySelected = availableItems
				.filter((item) => item.checked)
				.map((item) => item.id);
			setSelectedItems(initiallySelected);
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
		<ModalBackdrop ref={modalRef} className='ConfirmationDialog'>
			<ModalHeader title={title} onClose={onClose} />

			<div className='flex flex-col gap-4'>
				<div className='flex items-center gap-3'>
					<FontAwesomeIcon icon={faExclamationTriangle} aria-hidden='true' />
					<p className='text-gray'>{message}</p>
				</div>

				{availableItems && (
					<div className='flex flex-col gap-2'>
						{availableItems.map((item) => (
							<Checkbox
								className='text-sm'
								label={item.label}
								checked={selectedItems.includes(item.id)}
								onChange={(checked) => handleItemToggle(item.id, checked)}
								key={item.id}
							/>
						))}
					</div>
				)}

				<div className='flex justify-end gap-3'>
					<Button
						componentName='ConfirmationDialogCancelButton'
						className='px-4 py-2'
						title={cancelText}
						disabled={isClearing}
						onClick={handleCancel}
					>
						{cancelText}
					</Button>

					<Button
						componentName='ConfirmationDialogConfirmButton'
						className='bg-red hover:bg-red flex items-center gap-2 px-4 py-2 text-white'
						title={dynamicConfirmText}
						disabled={
							isClearing || (availableItems && selectedItems.length === 0)
						}
						onClick={handleConfirm}
					>
						{isClearing ? (
							'Clearing…'
						) : (
							<>
								<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
								{dynamicConfirmText}
							</>
						)}
					</Button>
				</div>
			</div>
		</ModalBackdrop>
	);
});
