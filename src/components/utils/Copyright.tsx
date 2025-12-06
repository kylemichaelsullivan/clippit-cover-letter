'use client';

import { memo, useRef, useState } from 'react';

import {
	ConfirmationDialog,
	MenuItem,
	Popover,
} from '@/components/ui/feedback';
import { CONSTANTS } from '@/config';
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

import type { KeyboardEvent, MouseEvent } from 'react';

const year = new Date().getFullYear();

export const Copyright = memo(function Copyright() {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(
		null
	);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const openPopover = (element: HTMLElement) => {
		setTriggerElement(element);
		setIsPopoverOpen(true);
	};

	const closePopover = () => {
		setIsPopoverOpen(false);
	};

	const handleClick = (e: MouseEvent<HTMLElement>) => {
		openPopover(e.currentTarget);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (e.currentTarget instanceof HTMLElement) {
				openPopover(e.currentTarget);
			}
		}
	};

	const handleImport = () => {
		fileInputRef.current?.click();
		closePopover();
	};

	const handleExport = () => {
		exportLocalStorageToFile();
		closePopover();
	};

	const handleDelete = () => {
		closePopover();
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
			<footer
				className='Copyright hover:text-gray relative cursor-pointer text-sm text-black transition-colors'
				role='button'
				title='Open data menu'
				aria-label={`${CONSTANTS.ARIA_LABELS.COPYRIGHT} - Click to open data management menu with import, export and delete options`}
				tabIndex={-1}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
			>
				{CONSTANTS.APP_NAME} © {year}
				<Popover
					isOpen={isPopoverOpen}
					onClose={closePopover}
					triggerElement={triggerElement}
					className='min-w-48'
				>
					<div className='flex flex-col p-2'>
						<MenuItem
							icon={faUpload}
							label='Import'
							aria-label='Import data from JSON file'
							onClick={handleImport}
						/>

						<MenuItem
							icon={faDownload}
							label='Export'
							aria-label='Export data to JSON file'
							onClick={handleExport}
						/>

						<MenuItem
							icon={faTrash}
							label='Delete'
							variant='danger'
							aria-label='Delete all data permanently'
							onClick={handleDelete}
						/>
					</div>
				</Popover>
			</footer>

			<input
				type='file'
				className='hidden'
				aria-label='Select JSON file to import application data'
				title='Select JSON file to import'
				accept='.json'
				onChange={handleFileImport}
				ref={fileInputRef}
			/>

			<ConfirmationDialog
				title='Clear All Data'
				message='This will permanently delete all your saved candidate information, skills, templates and job details. This action cannot be undone.'
				confirmText='Clear All Data'
				cancelText='Cancel'
				isOpen={showConfirmation}
				onConfirm={handleConfirmDelete}
				onClose={() => setShowConfirmation(false)}
			/>
		</>
	);
});
