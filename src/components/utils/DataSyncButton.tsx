'use client';

import { memo } from 'react';

import { Button } from '@/components/ui/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type DataSyncButtonProps = {
	icon: IconDefinition;
	label: string;
	onClick: () => void;
	componentName: string;
};

export const DataSyncButton = memo(function DataSyncButton({
	componentName,
	icon,
	label,
	onClick,
}: DataSyncButtonProps) {
	const getAriaLabel = () => {
		if (label.includes('Import')) {
			return 'Import application data from JSON file';
		}
		if (label.includes('Export')) {
			return 'Export application data to JSON file';
		}
		if (label.includes('Delete')) {
			return 'Delete all application data permanently';
		}
		return label;
	};

	const accessibleLabel = getAriaLabel();

	return (
		<Button
			componentName={componentName}
			color='secondary'
			size='sm'
			title={accessibleLabel}
			aria-label={accessibleLabel}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon} aria-hidden='true' />
			<span className='DataSyncButtonText text-sm font-medium'>{label}</span>
		</Button>
	);
});
