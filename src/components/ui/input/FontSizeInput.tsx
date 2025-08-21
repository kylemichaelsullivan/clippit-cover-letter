'use client';

import { memo } from 'react';
import { FormField } from '@/components/forms/core';

type FontSizeInputProps = {
	value: number;
	onChange: (size: number) => void;
	className?: string;
};

export const FontSizeInput = memo(function FontSizeInput({
	value,
	onChange,
	className = '',
}: FontSizeInputProps) {
	const handleChange = (newValue: string) => {
		const newSize = parseInt(newValue, 10);
		if (!isNaN(newSize)) {
			onChange(newSize);
		}
	};

	const handleBlur = () => {
		const clampedValue = Math.max(8, Math.min(16, value));
		if (clampedValue !== value) {
			onChange(clampedValue);
		}
	};

	return (
		<div className={`FontSizeInput flex items-center gap-2 ${className}`}>
			<label
				className='text-sm font-medium'
				htmlFor='font-size-input'
				title='Base Font Size'
				aria-label='Base font size for resume'
			>
				Base Font
			</label>
			<FormField
				id='font-size-input'
				type='number'
				value={value.toString()}
				onChange={handleChange}
				onBlur={handleBlur}
				min={8}
				max={16}
				className='w-16 text-center'
				aria-label='Resume font size (points)'
				suffix='pt'
			/>
		</div>
	);
});
