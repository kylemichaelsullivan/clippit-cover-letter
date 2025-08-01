'use client';

import { memo, type ChangeEvent } from 'react';

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
	className = 'border-black placeholder-gray focus:border-blue focus:ring-blue w-12 rounded-lg border bg-white px-3 py-2 text-center text-sm text-black focus:ring-1 focus:outline-none',
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
