'use client';

import { memo } from 'react';

type CheckboxProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
	className?: string;
};

export const Checkbox = memo(function Checkbox({
	checked,
	onChange,
	label,
	className = '',
}: CheckboxProps) {
	return (
		<label className={`flex items-center gap-2 ${className}`}>
			<input
				type='checkbox'
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
			/>
			<span className='text-sm font-medium text-black'>{label}</span>
		</label>
	);
});
