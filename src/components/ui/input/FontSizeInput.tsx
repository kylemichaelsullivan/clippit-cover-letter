'use client';

import { memo, type ChangeEvent, useRef } from 'react';

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
	const inputRef = useRef<HTMLInputElement>(null);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newSize = parseInt(e.target.value, 10);
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
				title='Base Font Size'
				aria-label='Base font size for resume'
			>
				Base Font:
			</label>
			<div className='FormField flex'>
				<input
					type='number'
					min={8}
					max={16}
					value={value.toString()}
					onChange={handleChange}
					onBlur={handleBlur}
					className='w-16 rounded-r-none border-r-0 text-center'
					aria-label='Resume font size (points)'
					ref={inputRef}
				/>
				<span className='input-suffix text-gray flex items-center rounded-r-md border border-l-0 border-black bg-white px-3 text-sm'>
					pt
				</span>
			</div>
		</div>
	);
});
