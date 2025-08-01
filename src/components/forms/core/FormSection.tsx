'use client';

import { memo, type ReactNode } from 'react';
import clsx from 'clsx';

import { CONSTANTS } from '@/config';

type FormSectionProps = {
	title?: string;
	children?: ReactNode;
	className?: string;
	id?: string;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	value?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	ariaLabel?: string;
};

export const FormSection = memo(function FormSection({
	title,
	children,
	className,
	id,
	checked,
	onCheckedChange,
	value,
	onValueChange,
	placeholder,
	ariaLabel,
}: FormSectionProps) {
	if (
		id &&
		checked !== undefined &&
		onCheckedChange &&
		value !== undefined &&
		onValueChange &&
		placeholder &&
		ariaLabel
	) {
		return (
			<section
				className={clsx(
					'FormSection',
					CONSTANTS.CLASS_NAMES.FORM_SECTION,
					className,
				)}
			>
				<div className='flex items-center gap-3'>
					<input
						type='checkbox'
						className={CONSTANTS.CLASS_NAMES.CHECKBOX}
						checked={checked}
						onChange={(e) => onCheckedChange(e.target.checked)}
						id={id}
					/>
					<label htmlFor={id} className={CONSTANTS.CLASS_NAMES.SECTION_LABEL}>
						{title}
					</label>
				</div>

				{children}
			</section>
		);
	}

	return (
		<section
			className={clsx(
				'FormSection',
				CONSTANTS.CLASS_NAMES.FORM_SECTION,
				className,
			)}
		>
			{title && (
				<div className='FormSectionHeader'>
					<h3 className='text-lg font-semibold text-black'>{title}</h3>
				</div>
			)}
			<div className='FormSectionContent flex flex-col gap-4'>{children}</div>
		</section>
	);
});
