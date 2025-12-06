'use client';

import { type ReactNode, memo } from 'react';

type DocumentHeaderProps = {
	title: string;
	className?: string;
	fontSizeInput?: ReactNode;
	headerElement?: ReactNode;
};

export const DocumentHeader = memo(function DocumentHeader({
	title,
	className,
	fontSizeInput,
	headerElement,
}: DocumentHeaderProps) {
	return (
		<div className={`flex items-center justify-between ${className || ''}`}>
			<label className='DocumentContentTitle text-lg font-semibold text-black'>
				<span>{title}</span>
			</label>
			<div className='flex items-center gap-3'>
				{headerElement}
				{fontSizeInput && (
					<div className='flex items-center justify-between'>
						{fontSizeInput}
					</div>
				)}
			</div>
		</div>
	);
});
