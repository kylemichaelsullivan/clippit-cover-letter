'use client';

import { memo } from 'react';

type CheckboxProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	className?: string;
	title?: string;
	'aria-label'?: string;
	id?: string;
};

export const Checkbox = memo(function Checkbox({
	checked,
	onChange,
	label = '',
	className = '',
	title,
	'aria-label': ariaLabel,
	id,
}: CheckboxProps) {
	title = title || label;
	ariaLabel = ariaLabel || title || label;

	const inputElement = (
		<input
			type='checkbox'
			className='cursor-pointer'
			title={title}
			checked={checked}
			aria-label={ariaLabel}
			onChange={(e) => onChange(e.target.checked)}
			id={id}
		/>
	);

	if (!label) {
		return inputElement;
	}

	return (
		<label className={`flex items-center gap-2 ${className}`}>
			{inputElement}
			<span className='text-sm font-medium text-black'>{label}</span>
		</label>
	);
});
