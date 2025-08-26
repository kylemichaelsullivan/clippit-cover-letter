'use client';

import {
	memo,
	useRef,
	useCallback,
	useMemo,
	useEffect,
	type ChangeEvent,
} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';

import { FormFieldContainer } from '@/components/forms/core';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { Button } from '@/components/ui/buttons/Button';
import { Checkbox } from '@/components/ui/input';
import { isFieldRequired } from '@/lib/schemas';
import { showToast } from '@/lib/toast';
import { useCandidateStore } from '@/lib/stores';

type ImageInputProps = {
	id: string;
	label?: string;
	field?: any; // TanStack Form field
	schema?: any; // Zod schema for required field detection
	fieldName?: string; // Field name in the schema
	placeholder?: string;
	accept?: string;
	className?: string;
	includeField?: any; // TanStack Form field for include checkbox
	includeFieldName?: string;
	aspectRatio?: 'square' | 'wide' | 'tall';
	onChange?: (value: string) => void;
	onIncludeChange?: (value: boolean) => void;
};

type ImagePreviewProps = {
	imageSrc: string;
	onChange: () => void;
	onRemove: () => void;
	aspectRatio?: 'square' | 'wide' | 'tall';
};

const ImagePreview = memo(function ImagePreview({
	imageSrc,
	onChange,
	onRemove,
	aspectRatio = 'square',
}: ImagePreviewProps) {
	const imageClasses = useMemo(() => {
		switch (aspectRatio) {
			case 'wide':
				return 'h-16 w-32 object-contain';
			case 'tall':
				return 'h-32 w-16 object-contain';
			default:
				return 'h-24 w-24 object-cover';
		}
	}, [aspectRatio]);

	return (
		<div className='ImagePreview group border-gray relative flex items-center justify-center rounded-lg border p-2 hover:border-black hover:shadow-sm'>
			<Image
				src={imageSrc}
				className={imageClasses}
				width={aspectRatio === 'wide' ? 128 : aspectRatio === 'tall' ? 64 : 96}
				height={aspectRatio === 'wide' ? 64 : aspectRatio === 'tall' ? 128 : 96}
				alt='Image Preview'
				unoptimized={imageSrc.startsWith('data:')}
			/>

			<Button
				type='button'
				color='secondary'
				size='sm'
				className='absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-se bg-transparent font-bold text-transparent opacity-0 transition-all duration-200 hover:bg-black hover:text-white hover:opacity-100 focus:bg-black focus:text-white focus:opacity-100'
				aria-label='Change Image'
				title='Change Image'
				onClick={onChange}
			>
				<span className='font-medium'>Change Image</span>
			</Button>

			<Button
				type='button'
				color='danger'
				size='sm'
				className='RemoveImageButton border-gray absolute top-px right-px z-20 rounded-full border bg-transparent p-1.5 text-transparent opacity-0 transition-all duration-200 group-focus-within:text-white group-focus-within:opacity-100 group-hover:text-white group-hover:opacity-100 hover:text-white focus:text-white'
				aria-label='Remove Image'
				title='Remove Image'
				onClick={onRemove}
			>
				<FontAwesomeIcon
					icon={faXmark}
					className='h-2.5 w-2.5'
					aria-hidden='true'
				/>
			</Button>
		</div>
	);
});

type UploadButtonProps = {
	placeholder: string;
	onClick: () => void;
	hasError?: boolean;
	className?: string;
};

const UploadButton = memo(function UploadButton({
	placeholder,
	onClick,
	hasError = false,
	className = '',
}: UploadButtonProps) {
	const buttonClasses = useMemo(
		() =>
			clsx(
				'flex min-h-24 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-sm transition-all duration-200',
				'border-light-gray text-gray hover:border-blue hover:bg-light-gray',
				'focus:border-blue focus:bg-light-gray',
				hasError && 'border-red',
				className,
			),
		[hasError, className],
	);

	return (
		<Button type='button' onClick={onClick} className={`${buttonClasses}`}>
			<div className='flex flex-col items-center gap-3'>
				<FontAwesomeIcon
					className='text-gray h-8 w-8'
					icon={faCloudArrowUp}
					aria-hidden='true'
				/>
				<div className='flex flex-col items-center gap-1'>
					<span className='font-medium'>{placeholder}</span>
					<span className='text-gray text-xs'>Click to browse images</span>
				</div>
			</div>
		</Button>
	);
});

export const ImageInput = memo(function ImageInput({
	label,
	className = '',
	field,
	fieldName,
	schema,
	placeholder = 'Upload Image',
	includeField,
	includeFieldName,
	accept = 'image/*',
	aspectRatio = 'square',
	onChange,
	onIncludeChange,
	id,
}: ImageInputProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { candidateDetails, setCandidateField } = useCandidateStore();

	const getCurrentValue = useCallback(() => {
		if (field) return field.state.value;
		if (fieldName && fieldName in candidateDetails) {
			return candidateDetails[
				fieldName as keyof typeof candidateDetails
			] as string;
		}
		return '';
	}, [field, fieldName, candidateDetails]);

	const handleFileChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
				showToast.error(
					'Please select a valid image file (PNG, JPG, GIF, etc.). SVG files are not supported.',
				);
				return;
			}

			const maxSize = 5 * 1024 * 1024; // 5MB
			if (file.size > maxSize) {
				showToast.error(
					'Image file is too large. Please select a file smaller than 5MB.',
				);
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;

				if (field) {
					field.handleChange(result);
				}

				if (fieldName && fieldName in candidateDetails) {
					setCandidateField(fieldName as keyof typeof candidateDetails, result);
				}

				if (onChange) {
					onChange(result);
				}
			};
			reader.onerror = (error) => {
				console.error('Error reading file:', error);
				showToast.error('Failed to read image file. Please try again.');
			};
			reader.readAsDataURL(file);
		},
		[field, fieldName, candidateDetails, setCandidateField, onChange],
	);

	const handleRemoveFile = useCallback(() => {
		if (field) {
			field.handleChange('');
		}

		if (fieldName && fieldName in candidateDetails) {
			setCandidateField(fieldName as keyof typeof candidateDetails, '');
		}

		if (onChange) {
			onChange('');
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, [field, fieldName, candidateDetails, setCandidateField, onChange]);

	const handleClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const inputValue = getCurrentValue();
	const fieldError = field ? field.state.meta.errors?.[0] : undefined;
	const isRequired = useMemo(
		() =>
			schema && fieldName
				? isFieldRequired(schema, fieldName as string)
				: false,
		[schema, fieldName],
	);

	const getIncludeValue = useCallback(() => {
		if (includeField) return includeField.state.value;
		if (includeFieldName && includeFieldName in candidateDetails) {
			return candidateDetails[
				includeFieldName as keyof typeof candidateDetails
			] as boolean;
		}
		return true;
	}, [includeField, includeFieldName, candidateDetails]);

	useEffect(() => {
		if (field && fieldName && fieldName in candidateDetails) {
			const storeValue = candidateDetails[
				fieldName as keyof typeof candidateDetails
			] as string;
			if (storeValue && !field.state.value) {
				field.handleChange(storeValue);
			}
		}
	}, [field, fieldName, candidateDetails]);

	useEffect(() => {
		if (field && fieldName && field.state.value) {
			const currentStoreValue = candidateDetails[
				fieldName as keyof typeof candidateDetails
			] as string;
			if (field.state.value !== currentStoreValue) {
				setCandidateField(
					fieldName as keyof typeof candidateDetails,
					field.state.value,
				);
			}
		}
	}, [field, fieldName, candidateDetails, setCandidateField]);

	return (
		<FormFieldContainer suppressHydrationWarning>
			{label && (
				<div className='flex items-center gap-2 pb-1'>
					{includeField && (
						<Checkbox
							checked={Boolean(getIncludeValue() ?? true)}
							label=''
							title={`Include ${label}?`}
							aria-label={`Include ${label} in document`}
							onChange={(checked) => {
								if (includeField) {
									includeField.handleChange(checked);
								}
								if (includeFieldName && includeFieldName in candidateDetails) {
									setCandidateField(
										includeFieldName as keyof typeof candidateDetails,
										checked,
									);
								}
								if (onIncludeChange) {
									onIncludeChange(checked);
								}
							}}
							id={`${id}-include`}
						/>
					)}
					<FormFieldLabel
						htmlFor={includeField ? `${id}-include` : id}
						title={label}
						aria-label={`${label} field`}
					>
						{label}
					</FormFieldLabel>
				</div>
			)}

			<div className='flex flex-col gap-3'>
				<input
					type='file'
					className='hidden'
					aria-describedby={fieldError ? `${id}-error` : undefined}
					accept={accept}
					required={isRequired}
					onChange={handleFileChange}
					ref={fileInputRef}
				/>

				{inputValue ? (
					<ImagePreview
						imageSrc={inputValue}
						aspectRatio={aspectRatio}
						onChange={handleClick}
						onRemove={handleRemoveFile}
					/>
				) : (
					<UploadButton
						className={className}
						placeholder={placeholder}
						hasError={!!fieldError}
						onClick={handleClick}
					/>
				)}
			</div>

			{fieldError && (
				<p className='FormFieldError text-red pt-1 text-sm' id={`${id}-error`}>
					{fieldError}
				</p>
			)}
		</FormFieldContainer>
	);
});
