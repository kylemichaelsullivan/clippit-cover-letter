'use client';

import { memo, useState } from 'react';
import { Button, TabTitle } from '@/components/ui';
import { ConfirmationDialog } from '@/components/ui/feedback';
import { DEFAULTS } from '@/config';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useJobStore } from '@/lib/stores';

export const JobFormHeader = memo(function JobFormHeader() {
	const { setJobDetails } = useJobStore();
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleClearClick = () => {
		setShowConfirmation(true);
	};

	const handleClose = () => {
		setShowConfirmation(false);
	};

	const handleConfirm = async () => {
		try {
			setJobDetails(DEFAULTS.INITIAL_STATES.JOB_DETAILS);
			localStorage.removeItem('job-store');
			console.log('Job data cleared successfully');
		} catch (error) {
			console.error('Failed to clear job data:', error);
		} finally {
			setShowConfirmation(false);
		}
	};

	return (
		<>
			<TabTitle
				title='Job Details'
				componentName='JobFormTitle'
				actionButton={
					<Button
						componentName='ClearJobButton'
						color='danger'
						size='md'
						title='Clear Job Details'
						aria-label='Clear Job Details'
						onClick={handleClearClick}
					>
						<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
						Clear
					</Button>
				}
			/>

			<ConfirmationDialog
				title='Clear Job Data'
				message='This will permanently delete all your saved job details. This action cannot be undone.'
				isOpen={showConfirmation}
				confirmText='Clear Job Data'
				cancelText='Cancel'
				onConfirm={handleConfirm}
				onClose={handleClose}
			/>
		</>
	);
});
