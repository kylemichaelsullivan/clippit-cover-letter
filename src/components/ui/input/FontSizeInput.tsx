'use client';

import { memo, useState, useEffect } from 'react';
import { FormField } from '@/components/forms/core';
import {
	clampFontSize,
	FONT_SIZE_MIN,
	FONT_SIZE_MAX,
} from '@/lib/utils/fontSize';
import type { DocumentType, FontSize, FontUnit } from '@/types';

type FontSizeInputProps = {
	value: FontSize;
	documentType: DocumentType;
	onChange: (value: FontSize) => void;
	className?: string;
	label?: string;
	ariaLabel?: string;
};

export const FontSizeInput = memo(function FontSizeInput({
	value,
	documentType,
	onChange,
	className = '',
	label = 'Base Font',
	ariaLabel = 'Base font size',
}: FontSizeInputProps) {
	const [size, unit] = value;
	const [localUnit, setLocalUnit] = useState<FontUnit>(unit);

	useEffect(() => {
		if (unit !== localUnit) {
			setLocalUnit(unit);
		}
	}, [unit, localUnit]);

	const handleChange = (newValue: string) => {
		const newNumeric = parseFloat(newValue);
		if (!isNaN(newNumeric)) {
			const newFontSize: FontSize = [newNumeric, localUnit];
			onChange(newFontSize);
		}
	};

	const handleBlur = () => {
		const clampedFontSize = clampFontSize([size, localUnit]);
		if (clampedFontSize[0] !== size || clampedFontSize[1] !== localUnit) {
			onChange(clampedFontSize);
		}
	};

	const toggleUnit = () => {
		const newUnit: FontUnit = localUnit === 'pt' ? 'px' : 'pt';
		setLocalUnit(newUnit);
		onChange([size, newUnit]);
	};

	return (
		<div className={`FontSizeInput flex items-center gap-2 ${className}`}>
			<label
				htmlFor={`font-size-input-${documentType}`}
				className='text-sm font-medium text-black'
				title={`${label} Size`}
				aria-label={`${ariaLabel} for ${documentType}`}
			>
				{label}
			</label>
			<FormField
				type='number'
				className='w-16 text-center'
				value={size.toString()}
				min={FONT_SIZE_MIN}
				max={FONT_SIZE_MAX}
				step={0.5}
				aria-label={`${documentType} font size (${localUnit})`}
				suffix={
					<button
						type='button'
						className='hover:text-light-blue cursor-pointer transition-colors'
						title={`Toggle between pt and px units`}
						aria-label={`Toggle between pt and px units`}
						onClick={toggleUnit}
					>
						{localUnit}
					</button>
				}
				onChange={handleChange}
				onBlur={handleBlur}
				id={`font-size-input-${documentType}`}
			/>
		</div>
	);
});
