'use client';

import { type ChangeEvent, memo } from 'react';

type NumberInputProps = {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
	min: number;
	max: number;
	ariaLabel: string;
	className?: string;
};

export const NumberInput = memo(function NumberInput({
	value,
	onChange,
	onBlur,
	min,
	max,
	ariaLabel,
	className = 'w-12 text-center',
}: NumberInputProps) {
	return (
		<input
			type='number'
			min={min}
			max={max}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			className={className}
			aria-label={ariaLabel}
		/>
	);
});
