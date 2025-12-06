'use client';

import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { Checkbox } from '@/components/ui/input';
import { Field } from '@tanstack/react-form';
import { FormFieldContainer } from './FormFieldContainer';

type FormFieldWithCheckboxProps = {
	label: string;
	checkboxTitle: string;
	checkboxAriaLabel: string;
	fieldPath: string;
	form: any;
	index: number;
	htmlId: string;
	className?: string;
	placeholder?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	registerFocusRef?: (element: HTMLInputElement | null) => void;
};

export function FormFieldWithCheckbox({
	label,
	checkboxTitle,
	checkboxAriaLabel,
	fieldPath,
	form,
	index,
	htmlId,
	className = '',
	placeholder,
	defaultValue = '',
	onChange,
	registerFocusRef,
}: FormFieldWithCheckboxProps) {
	return (
		<FormFieldContainer className={className}>
			<div className='flex items-center gap-2'>
				<Field name={`${fieldPath}.${index}.include`} form={form}>
					{(field) => (
						<Checkbox
							label=''
							checked={Boolean(field.state.value ?? true)}
							title={checkboxTitle}
							aria-label={checkboxAriaLabel}
							onChange={(checked) => {
								field.handleChange(checked);
								onChange?.(checked ? ' ' : '');
							}}
						/>
					)}
				</Field>
				<FormFieldLabel
					htmlFor={htmlId}
					title={label}
					aria-label={label}
					spaced
				>
					{label}
				</FormFieldLabel>
			</div>
			<Field name={`${fieldPath}.${index}.${label.toLowerCase()}`} form={form}>
				{(field) => (
					<input
						type='text'
						className='text-sm sm:text-base'
						value={String(field.state.value || defaultValue)}
						placeholder={placeholder}
						onChange={(e) => {
							field.handleChange(e.target.value);
							onChange?.(e.target.value);
						}}
						ref={registerFocusRef}
						id={htmlId}
					/>
				)}
			</Field>
		</FormFieldContainer>
	);
}
