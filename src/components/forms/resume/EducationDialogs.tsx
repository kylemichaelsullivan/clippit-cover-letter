'use client';

import { ModalBackdrop } from '@/components/ui/feedback/ModalBackdrop';
import { ModalHeader } from '@/components/ui/feedback/ModalHeader';
import { useModalClose } from '@/lib/hooks/useModalClose';
import type { ParsedEducation } from '@/lib/utils';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConfirmationDialogActions } from './ConfirmationDialogActions';
import { EducationPreview } from './EducationPreview';

type EducationDialogsProps = {
	pendingEducation: ParsedEducation[];
	showImportConfirmation: boolean;
	onConfirmImport: () => void;
	onCancelImport: () => void;
};

export function EducationDialogs({
	pendingEducation,
	showImportConfirmation,
	onConfirmImport,
	onCancelImport,
}: EducationDialogsProps) {
	const modalRef = useModalClose({
		isOpen: showImportConfirmation,
		onClose: onCancelImport,
	});

	const isMultipleEntries = pendingEducation.length > 1;
	const title = isMultipleEntries
		? 'Import Multiple Education Entries'
		: 'Import Education Entry';

	if (!showImportConfirmation) return null;

	return (
		<ModalBackdrop className='ConfirmationDialog' ref={modalRef}>
			<ModalHeader title={title} onClose={onCancelImport} />

			<div className='flex flex-col gap-4'>
				<div className='flex items-start gap-3'>
					<FontAwesomeIcon
						className='pt-1'
						icon={faExclamationTriangle}
						aria-hidden='true'
					/>
					<div className='text-gray font-sans'>
						<EducationPreview education={pendingEducation} />
					</div>
				</div>

				<ConfirmationDialogActions
					onConfirm={onConfirmImport}
					onCancel={onCancelImport}
				/>
			</div>
		</ModalBackdrop>
	);
}
