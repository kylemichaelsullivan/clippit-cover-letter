'use client';

import { memo } from 'react';

import { Checkbox } from '@/components/ui/input';

type DocumentOptionProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
	placeholder: string;
	value: string;
	onValueChange: (value: string) => void;
};

export const DocumentOption = memo(function DocumentOption({
	checked,
	onChange,
	label,
	placeholder,
	value,
	onValueChange,
}: DocumentOptionProps) {
	return (
		<div className='flex flex-col gap-2'>
			<Checkbox checked={checked} onChange={onChange} label={label} />
			<div className={checked ? '' : 'hidden'}>
				<textarea
					className='min-h-20 w-full'
					placeholder={placeholder}
					value={value}
					aria-label={`Instructions for ${label}`}
					onChange={(e) => onValueChange(e.target.value)}
				/>
			</div>
		</div>
	);
});
