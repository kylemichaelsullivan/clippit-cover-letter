'use client';

import { Button } from '@/components/ui/buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactNode } from 'react';

type FormItemProps = {
	children: ReactNode;
	className?: string;
	removeButtonTitle?: string;
	onRemove?: () => void;
};

export function FormItem({
	children,
	className = '',
	removeButtonTitle = 'Remove this item',
	onRemove,
}: FormItemProps) {
	return (
		<div className={`FormItem flex flex-col gap-3 ${className}`}>
			<div className='relative grid grid-cols-1 gap-3 sm:grid-cols-2'>
				{onRemove && (
					<Button
						componentName='FormItemRemoveButton'
						color='danger'
						size='sm'
						title={removeButtonTitle}
						positioned
						onClick={onRemove}
					>
						<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
					</Button>
				)}
				{children}
			</div>
		</div>
	);
}
