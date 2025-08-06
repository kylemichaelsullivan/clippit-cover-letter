'use client';

import { memo, useState } from 'react';

import { CONSTANTS } from '@/config';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { clearAllPersistentData } from '@/lib/stores';
import { showToast } from '@/lib/toast';

export const Copyright = memo(function Copyright() {
	const year = new Date().getFullYear();
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleClick = () => {
		setShowConfirmation(true);
	};

	const handleClose = () => {
		setShowConfirmation(false);
	};

	const handleConfirm = async () => {
		try {
			clearAllPersistentData();
			showToast.success('All data cleared successfully');
		} catch (error) {
			console.error('Failed to clear data:', error);
			showToast.error('Failed to clear data');
		}
	};

	return (
		<>
			<footer
				className='Copyright hover:text-gray cursor-pointer text-sm text-black transition-colors'
				role='button'
				tabIndex={-1}
				onClick={handleClick}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						handleClick();
					}
				}}
				aria-label={`${CONSTANTS.ARIA_LABELS.COPYRIGHT} - Click to clear all data`}
				title='Click to clear all saved data'
			>
				{CONSTANTS.APP_NAME} © {year}
			</footer>

			<ConfirmationDialog
				isOpen={showConfirmation}
				onClose={handleClose}
				onConfirm={handleConfirm}
				title='Clear All Data'
				message='This will permanently delete all your saved candidate information, skills, templates and job details. This action cannot be undone.'
				confirmText='Clear All Data'
				cancelText='Cancel'
			/>
		</>
	);
});
