'use client';

import { forwardRef, type ReactNode } from 'react';

type ModalBackdropProps = {
	children: ReactNode;
	className?: string;
};

export const ModalBackdrop = forwardRef<HTMLDivElement, ModalBackdropProps>(
	function ModalBackdrop({ children, className = '' }, ref) {
		return (
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
			>
				<div className='absolute inset-0 bg-black/75'></div>
				<div
					ref={ref}
					className='z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg'
				>
					{children}
				</div>
			</div>
		);
	},
);
