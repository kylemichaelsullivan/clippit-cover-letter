'use client';

import { memo } from 'react';
import { Field } from '@tanstack/react-form';
import { FormField } from '@/components/forms/core';
import { jobDetailsSchema, validateSchema } from '@/lib/schemas';

type JobFormFieldProps = {
	name: string;
	label: string;
	placeholder: string;
	form: any;
	handleFieldChange: (fieldName: string, value: any) => void;
	type?: 'text' | 'textarea';
	className?: string;
	rows?: number;
};

export const JobFormField = memo(function JobFormField({
	name,
	label,
	placeholder,
	form,
	handleFieldChange,
	type = 'text',
	className,
	rows,
}: JobFormFieldProps) {
	return (
		<Field
			name={name}
			form={form}
			validators={{
				onChange: validateSchema(jobDetailsSchema, name),
			}}
		>
			{(field) => (
				<FormField
					type={type}
					className={className}
					label={label}
					field={field}
					fieldName={name}
					placeholder={placeholder}
					schema={jobDetailsSchema}
					rows={rows}
					onChange={(value: string) => handleFieldChange(name, value)}
					id={name}
				/>
			)}
		</Field>
	);
});
