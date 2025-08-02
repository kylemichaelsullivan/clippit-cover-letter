'use client';

import { memo, useRef, type ChangeEvent } from 'react';
import clsx from 'clsx';

import { isFieldRequired } from '@/lib/schemas';
import { FormFieldContainer } from './FormFieldContainer';

import type {
	InputHTMLAttributes,
	ReactNode,
	TextareaHTMLAttributes,
	SelectHTMLAttributes,
	ClipboardEvent,
} from 'react';

type FormFieldType =
	| 'text'
	| 'email'
	| 'tel'
	| 'url'
	| 'password'
	| 'select'
	| 'textarea';

type BaseFormFieldProps = {
	id: string;
	type?: FormFieldType;
	label?: string;
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
	onPaste?: (e: ClipboardEvent<HTMLInputElement>) => void;
	error?: string;
	helpText?: string;
	labelContent?: ReactNode;
	options?: { value: string; label: string }[];
	field?: any; // TanStack Form field
	schema?: any; // Zod schema for required field detection
	fieldName?: string; // Field name in the schema
	prefix?: ReactNode;
	suffix?: ReactNode;
};

type FormFieldProps = BaseFormFieldProps &
	Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseFormFieldProps>;

export const FormField = memo(function FormField({
	id,
	type = 'text',
	label,
	placeholder,
	value = '',
	onChange,
	onPaste,
	error,
	helpText,
	labelContent,
	options = [],
	field,
	className,
	schema,
	fieldName,
	prefix,
	suffix,
	...props
}: FormFieldProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const newValue = e.target.value;

		// Handle TanStack Form field if provided
		if (field) {
			field.handleChange(newValue);
		}

		// Handle direct onChange if provided
		if (onChange) {
			onChange(newValue);
		}
	};

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		if (onPaste) {
			onPaste(e);
		}
	};

	const handlePrefixClick = () => {
		inputRef.current?.focus();
	};

	const handleSuffixClick = () => {
		inputRef.current?.focus();
	};

	// Use field value if available, otherwise use direct value
	const inputValue = field ? field.state.value : value;
	const fieldError = field ? field.state.meta.errors?.[0] : error;

	// Determine if field is required based on schema
	const isRequired =
		schema && fieldName ? isFieldRequired(schema, fieldName as string) : false;

	const inputClasses = clsx(
		'FormField w-full',
		fieldError && 'border-red focus:border-red focus:ring-red',
		prefix && 'rounded-l-none',
		suffix && 'rounded-r-none',
		prefix && suffix && 'rounded-none',
		className,
	);

	const renderInput = () => {
		if (type === 'textarea') {
			return (
				<textarea
					id={id}
					className={inputClasses}
					placeholder={placeholder}
					value={inputValue || ''}
					onChange={handleChange}
					required={isRequired}
					{...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
				/>
			);
		}

		if (type === 'select') {
			return (
				<select
					id={id}
					className={inputClasses}
					value={inputValue || ''}
					onChange={handleChange}
					required={isRequired}
					{...(props as SelectHTMLAttributes<HTMLSelectElement>)}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			);
		}

		const inputElement = (
			<input
				type={type}
				id={id}
				className={inputClasses}
				placeholder={placeholder}
				value={inputValue || ''}
				onChange={handleChange}
				onPaste={handlePaste}
				required={isRequired}
				ref={inputRef}
				{...props}
			/>
		);

		if (prefix || suffix) {
			return (
				<div className='FormField flex'>
					{prefix && (
						<div
							className='bg-gray border-light-gray input-prefix flex cursor-pointer items-center rounded-l-lg border-t border-b border-l px-3 py-2 text-white shadow-sm'
							onClick={handlePrefixClick}
						>
							{prefix}
						</div>
					)}
					{inputElement}
					{suffix && (
						<div
							className='bg-gray border-light-gray input-suffix flex cursor-pointer items-center rounded-r-lg border-t border-r border-b px-3 py-2 text-white shadow-sm'
							onClick={handleSuffixClick}
						>
							{suffix}
						</div>
					)}
				</div>
			);
		}

		return inputElement;
	};

	return (
		<FormFieldContainer>
			{label && (
				<label
					htmlFor={id}
					className='FormFieldLabel flex items-center justify-between pb-1 text-sm font-medium text-black'
				>
					<span>{label}</span>
					{labelContent}
				</label>
			)}
			{renderInput()}
			{fieldError && (
				<p className='FormFieldError text-red pt-1 text-sm'>{fieldError}</p>
			)}
			{helpText && !fieldError && (
				<p className='FormFieldHelp text-gray pt-1 text-sm'>{helpText}</p>
			)}
		</FormFieldContainer>
	);
});
