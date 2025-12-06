'use client';

import clsx from 'clsx';
import { type MouseEvent, type ReactNode, useEffect } from 'react';

import { useConfirmationContext } from '@/components/providers/ConfirmationProvider';
import { Button } from '@/components/ui/buttons';

type ConfirmationProps = {
	children: ReactNode;
	onConfirm: (e?: MouseEvent<HTMLButtonElement>) => void;
	onCancel: (e?: MouseEvent<HTMLButtonElement>) => void;
	confirmText?: string;
	cancelText?: string;
	componentName?: string;
	className?: string;
	confirmTabIndex?: number;
	cancelTabIndex?: number;
};

export function Confirmation({
	children,
	onConfirm,
	onCancel,
	confirmText = 'Yes',
	cancelText = 'Cancel',
	componentName,
	className,
	confirmTabIndex,
	cancelTabIndex,
}: ConfirmationProps) {
	const { addConfirmation, removeConfirmation } = useConfirmationContext();

	useEffect(() => {
		addConfirmation(onCancel);
		return () => {
			removeConfirmation(onCancel);
		};
	}, [addConfirmation, removeConfirmation, onCancel]);

	return (
		<div
			className={clsx(
				componentName || 'Confirmation',
				'border-light-gray rounded-md border bg-white p-3',
				className
			)}
		>
			<p className='pb-2 text-xs text-black sm:text-sm'>{children}</p>
			<div className='flex flex-col gap-2 sm:flex-row'>
				<Button
					color='success'
					size='xs'
					onClick={onConfirm}
					componentName='ConfirmationConfirmButton'
					tabIndex={confirmTabIndex}
				>
					{confirmText}
				</Button>
				<Button
					color='secondary'
					size='xs'
					onClick={onCancel}
					componentName='ConfirmationCancelButton'
					tabIndex={cancelTabIndex}
				>
					{cancelText}
				</Button>
			</div>
		</div>
	);
}
