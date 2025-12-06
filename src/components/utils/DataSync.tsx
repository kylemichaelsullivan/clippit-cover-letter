'use client';

import { memo, useRef, useState } from 'react';

import { ConfirmationDialog } from '@/components/ui/feedback';
import {
	clearAllPersistentData,
	exportLocalStorageToFile,
	handleFileImport,
} from '@/lib/stores';
import { showToast } from '@/lib/toast';
import {
	faDownload,
	faTrash,
	faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { DataSyncButton } from './DataSyncButton';

export const DataSync = memo(function DataSync() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleImport = () => {
		fileInputRef.current?.click();
	};

	const handleExport = () => {
		exportLocalStorageToFile();
	};

	const handleDelete = () => {
		setShowConfirmation(true);
	};

	const handleConfirmDelete = async () => {
		try {
			clearAllPersistentData();
			showToast.success('All data cleared successfully');
		} catch (error) {
			console.error('Failed to clear data:', error);
			showToast.error('Failed to clear data');
		} finally {
			setShowConfirmation(false);
		}
	};

	return (
		<>
			<div className='DataSync flex flex-col gap-2'>
				<DataSyncButton
					componentName='ImportDataButton'
					icon={faUpload}
					label='Import Data'
					onClick={handleImport}
				/>

				<DataSyncButton
					componentName='ExportDataButton'
					icon={faDownload}
					label='Export Data'
					onClick={handleExport}
				/>

				<DataSyncButton
					componentName='DeleteDataButton'
					icon={faTrash}
					label='Delete All Data'
					onClick={handleDelete}
				/>

				<input
					type='file'
					className='hidden'
					title='Select JSON file to import'
					aria-label='Select JSON file to import application data'
					onChange={handleFileImport}
					accept='.json'
					ref={fileInputRef}
				/>
			</div>

			<ConfirmationDialog
				isOpen={showConfirmation}
				onClose={() => setShowConfirmation(false)}
				onConfirm={handleConfirmDelete}
				title='Clear All Data'
				message='This will permanently delete all your saved candidate information, skills, templates and job details. This action cannot be undone.'
				confirmText='Clear All Data'
				cancelText='Cancel'
			/>
		</>
	);
});
