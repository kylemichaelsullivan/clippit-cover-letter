'use client';

import { forwardRef, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import clsx from 'clsx';

import { CONSTANTS, PLACEHOLDERS } from '@/config';
import { useThrottledField } from '@/lib/hooks';

type MarkdownInputProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	'aria-label'?: string;
	componentName?: string;
	className?: string;
	rows?: number;
	required?: boolean;
	readOnly?: boolean;
	id?: string;
};

export const MarkdownInput = forwardRef<
	HTMLTextAreaElement,
	MarkdownInputProps
>(
	(
		{
			value,
			onChange,
			placeholder = PLACEHOLDERS.GENERAL.MARKDOWN_CONTENT,
			'aria-label': ariaLabel = CONSTANTS.ARIA_LABELS.MARKDOWN_CONTENT,
			componentName,
			className = '',
			rows = 10,
			required,
			readOnly = false,
			id,
		},
		ref,
	) => {
		// Create a mock field object for useThrottledField
		const mockField = {
			state: { value },
			handleChange: onChange,
		};

		const { value: throttledValue, onChange: throttledOnChange } =
			useThrottledField(
				mockField,
				100, // 100ms throttle
			);

		const handleChange = useCallback(
			(e: ChangeEvent<HTMLTextAreaElement>) => {
				throttledOnChange(e.target.value);
			},
			[throttledOnChange],
		);

		return (
			<textarea
				id={id}
				className={clsx(
					componentName || 'MarkdownInput',
					CONSTANTS.CLASS_NAMES.MARKDOWN_INPUT,
					'text-sm sm:text-base',
					className,
				)}
				placeholder={placeholder}
				rows={rows}
				value={throttledValue}
				onChange={handleChange}
				aria-label={ariaLabel}
				ref={ref}
				required={required}
				readOnly={readOnly}
			/>
		);
	},
);

MarkdownInput.displayName = 'MarkdownInput';
