'use client';

import type { MouseEvent, ReactNode } from 'react';
import clsx from 'clsx';

import { Button } from '../buttons/Button';

type ConfirmationProps = {
	children: ReactNode;
	onConfirm: (e?: MouseEvent<HTMLButtonElement>) => void;
	onCancel: (e?: MouseEvent<HTMLButtonElement>) => void;
	confirmText?: string;
	cancelText?: string;
	componentName?: string;
	className?: string;
};

export function Confirmation({
	children,
	onConfirm,
	onCancel,
	confirmText = 'Yes',
	cancelText = 'Cancel',
	componentName,
	className,
}: ConfirmationProps) {
	return (
		<div
			className={clsx(
				componentName || 'Confirmation',
				'border-light-gray rounded-md border bg-white p-3',
				className,
			)}
		>
			<p className='pb-2 text-xs text-black sm:text-sm'>{children}</p>
			<div className='flex flex-col gap-2 sm:flex-row'>
				<Button
					color='success'
					size='xs'
					onClick={onConfirm}
					componentName='ConfirmationConfirmButton'
				>
					{confirmText}
				</Button>
				<Button
					color='secondary'
					size='xs'
					onClick={onCancel}
					componentName='ConfirmationCancelButton'
				>
					{cancelText}
				</Button>
			</div>
		</div>
	);
}
