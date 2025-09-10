'use client';

import { Button } from '@/components/ui/buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ConfirmationDialogActionsProps = {
	onConfirm: () => void;
	onCancel: () => void;
};

export function ConfirmationDialogActions({
	onConfirm,
	onCancel,
}: ConfirmationDialogActionsProps) {
	return (
		<div className='flex justify-end gap-3'>
			<Button
				componentName='ConfirmationDialogCancelButton'
				className='px-4 py-2'
				title='Cancel'
				onClick={onCancel}
			>
				Cancel
			</Button>

			<Button
				componentName='ConfirmationDialogConfirmButton'
				className='bg-red hover:bg-red flex items-center gap-2 px-4 py-2 text-white'
				title='Import'
				onClick={onConfirm}
			>
				<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
				Import
			</Button>
		</div>
	);
}
