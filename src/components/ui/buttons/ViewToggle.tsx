'use client';

import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { memo } from 'react';

import { Button } from '@/components/ui/buttons/Button';

type ViewToggleProps = {
	isTipTapView: boolean;
	onToggle: () => void;
	className?: string;
};

export const ViewToggle = memo(function ViewToggle({
	isTipTapView,
	onToggle,
	className = '',
}: ViewToggleProps) {
	return (
		<div className={clsx('ViewToggle flex items-center gap-2', className)}>
			<Button
				type='button'
				color={isTipTapView ? 'primary' : 'secondary'}
				size='sm'
				title={isTipTapView ? 'Switch to Print View' : 'Switch to Edit View'}
				aria-label={
					isTipTapView ? 'Switch to Print View' : 'Switch to Edit View'
				}
				onClick={onToggle}
			>
				<FontAwesomeIcon
					icon={isTipTapView ? faEdit : faEye}
					className='h-4 w-4'
					aria-hidden='true'
				/>
				<span className='hidden text-sm sm:block'>
					{isTipTapView ? 'Edit' : 'View'}
				</span>
			</Button>
		</div>
	);
});
