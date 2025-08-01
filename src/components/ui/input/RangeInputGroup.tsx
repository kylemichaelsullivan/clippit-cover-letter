'use client';

import { memo, type ChangeEvent } from 'react';
import { NumberInput } from './NumberInput';

type RangeInputGroupProps = {
	minValue: string;
	maxValue: string;
	onMinChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onMaxChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onMinBlur: () => void;
	onMaxBlur: () => void;
	min: number;
	max: number;
	minAriaLabel: string;
	maxAriaLabel: string;
};

export const RangeInputGroup = memo(function RangeInputGroup({
	minValue,
	maxValue,
	onMinChange,
	onMaxChange,
	onMinBlur,
	onMaxBlur,
	min,
	max,
	minAriaLabel,
	maxAriaLabel,
}: RangeInputGroupProps) {
	return (
		<div className='flex items-center gap-2'>
			<NumberInput
				value={minValue}
				onChange={onMinChange}
				onBlur={onMinBlur}
				min={min}
				max={max}
				ariaLabel={minAriaLabel}
			/>
			<span className='text-gray text-sm sm:text-base'>–</span>
			<NumberInput
				value={maxValue}
				onChange={onMaxChange}
				onBlur={onMaxBlur}
				min={min}
				max={max}
				ariaLabel={maxAriaLabel}
			/>
		</div>
	);
});
