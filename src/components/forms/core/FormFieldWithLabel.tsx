'use client';

import { Field } from '@tanstack/react-form';
import { FormFieldContainer } from './FormFieldContainer';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';

type FormFieldWithLabelProps = {
	label: string;
	fieldPath: string;
	fieldName: string;
	index: number;
	form: any;
	className?: string;
	placeholder?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
};

export function FormFieldWithLabel({
	label,
	fieldPath,
	fieldName,
	index,
	form,
	className = '',
	placeholder,
	defaultValue = '',
	onChange,
}: FormFieldWithLabelProps) {
	return (
		<FormFieldContainer className={className}>
			<FormFieldLabel title={label} aria-label={label}>
				{label}
			</FormFieldLabel>
			<Field name={`${fieldPath}.${index}.${fieldName}`} form={form}>
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
					/>
				)}
			</Field>
		</FormFieldContainer>
	);
}
