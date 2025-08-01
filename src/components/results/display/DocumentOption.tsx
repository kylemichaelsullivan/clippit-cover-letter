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
	const textareaId = `document-option-${label.toLowerCase().replace(/\s+/g, '-')}`;

	return (
		<div className='flex flex-col gap-2'>
			<Checkbox checked={checked} onChange={onChange} label={label} />
			<div className={checked ? '' : 'hidden'}>
				<div className='flex flex-col gap-1'>
					<label
						htmlFor={textareaId}
						className='flex items-center justify-between text-sm font-medium text-black'
					>
						<span>Instructions</span>
					</label>
					<textarea
						id={textareaId}
						className='placeholder-gray focus:border-blue focus:ring-blue block min-h-20 w-full rounded-lg border border-black bg-white px-3 py-2 text-sm focus:ring-1 focus:outline-none'
						placeholder={placeholder}
						value={value}
						onChange={(e) => onValueChange(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
});
