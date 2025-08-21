'use client';

import { memo, type ReactNode } from 'react';

import { Checkbox } from '@/components/ui/input';

type DocumentSelectionControlProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
	placeholder: string;
	value: string;
	onValueChange: (value: string) => void;
	children?: ReactNode;
	title?: string;
	'aria-label'?: string;
};

export const DocumentSelectionControl = memo(function DocumentSelectionControl({
	checked,
	onChange,
	label,
	placeholder,
	value,
	onValueChange,
	children,
	title,
	'aria-label': ariaLabel,
}: DocumentSelectionControlProps) {
	title = title || label;
	ariaLabel = ariaLabel || title || label;
	const textareaId = `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

	return (
		<div className='DocumentSelectionControl flex flex-col gap-2'>
			<div className='flex items-center gap-2'>
				<Checkbox
					checked={checked}
					label=''
					onChange={onChange}
					title={title}
					aria-label={ariaLabel}
				/>
				<label
					htmlFor={textareaId}
					className='cursor-pointer text-base font-medium text-black'
					title={title}
					aria-label={ariaLabel}
				>
					{label}
				</label>
			</div>
			{checked && (
				<>
					<textarea
						id={textareaId}
						className='min-h-20 w-full'
						placeholder={placeholder}
						value={value}
						aria-label={`Instructions for ${label}`}
						onChange={(e) => onValueChange(e.target.value)}
					/>
					{children}
				</>
			)}
		</div>
	);
});
