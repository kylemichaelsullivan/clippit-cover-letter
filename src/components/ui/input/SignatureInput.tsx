'use client';

import { memo, useRef, useCallback, useMemo } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FormFieldContainer } from '@/components/forms/core';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { isFieldRequired } from '@/lib/schemas';
import { showToast } from '@/lib/toast';
import { useCandidateStore } from '@/lib/stores';

type SignatureInputProps = {
	id: string;
	label?: string;
	placeholder?: string;
	field?: any;
	schema?: any;
	fieldName?: string;
	onChange?: (value: string) => void;
	className?: string;
};

export const SignatureInput = memo(function SignatureInput({
	id,
	label,
	placeholder = 'Draw your signature',
	field,
	schema,
	fieldName,
	onChange,
	className = '',
}: SignatureInputProps) {
	const signatureRef = useRef<SignatureCanvas>(null);
	const { candidateDetails, setCandidateField } = useCandidateStore();

	const isRequired = useMemo(() => {
		if (!schema || !fieldName) return false;
		return isFieldRequired(schema, fieldName);
	}, [schema, fieldName]);

	const getCurrentValue = useCallback(() => {
		if (field) return field.state.value;
		if (fieldName && fieldName in candidateDetails) {
			return candidateDetails[
				fieldName as keyof typeof candidateDetails
			] as string;
		}
		return '';
	}, [field, fieldName, candidateDetails]);

	const handleSave = useCallback(() => {
		if (signatureRef.current) {
			if (signatureRef.current.isEmpty()) {
				showToast.error('Please draw a signature before saving.');
				return;
			}

			const dataUrl = signatureRef.current
				.getTrimmedCanvas()
				.toDataURL('image/png');

			if (field) {
				field.handleChange(dataUrl);
			}

			if (fieldName && fieldName in candidateDetails) {
				setCandidateField(fieldName as keyof typeof candidateDetails, dataUrl);
			}

			if (onChange) {
				onChange(dataUrl);
			}

			showToast.success('Signature saved successfully!');
		}
	}, [field, fieldName, candidateDetails, setCandidateField, onChange]);

	const handleClear = useCallback(() => {
		if (signatureRef.current) {
			signatureRef.current.clear();
		}
	}, []);

	const handleRemove = useCallback(() => {
		if (field) {
			field.handleChange('');
		}

		if (fieldName && fieldName in candidateDetails) {
			setCandidateField(fieldName as keyof typeof candidateDetails, '');
		}

		if (onChange) {
			onChange('');
		}

		if (signatureRef.current) {
			signatureRef.current.clear();
		}
	}, [field, fieldName, candidateDetails, setCandidateField, onChange]);

	const currentValue = getCurrentValue();

	return (
		<FormFieldContainer className={className}>
			{label && (
				<FormFieldLabel
					htmlFor={id}
					title={label}
					aria-label={`${label} field`}
					labelContent={isRequired && <span className='text-red'>*</span>}
				>
					{label}
				</FormFieldLabel>
			)}
			<div className='SignatureInput flex flex-col gap-4'>
				{currentValue ? (
					<div className='SignaturePreview border-gray force-bg-white relative flex flex-col items-center justify-center rounded-lg border p-4'>
						<Image
							src={currentValue}
							className='h-16 w-auto max-w-full object-contain'
							width={200}
							height={64}
							unoptimized={currentValue.startsWith('data:')}
							alt='Signature Preview'
						/>
						<div className='mt-3 flex gap-2'>
							<button
								type='button'
								className='bg-red hover:bg-red focus:ring-red flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none'
								onClick={handleRemove}
							>
								<FontAwesomeIcon icon={faTrash} className='h-3 w-3' />
								Remove
							</button>
						</div>
					</div>
				) : (
					<div className='SignatureCanvas border-gray rounded-lg border p-4'>
						<div className='text-gray mb-3 text-center text-sm'>
							{placeholder}
						</div>
						<div className='border-gray force-white-bg rounded border'>
							<SignatureCanvas
								ref={signatureRef}
								canvasProps={{
									className: 'w-full h-32 cursor-crosshair',
								}}
								backgroundColor='white'
								penColor='#3b82f6'
							/>
						</div>
						<div className='mt-3 flex gap-2'>
							<button
								type='button'
								onClick={handleSave}
								className='bg-blue hover:bg-blue focus:ring-blue flex-1 rounded px-3 py-1.5 text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none'
							>
								Save Signature
							</button>
							<button
								type='button'
								onClick={handleClear}
								className='bg-gray hover:bg-gray focus:ring-gray rounded px-3 py-1.5 text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none'
							>
								<FontAwesomeIcon icon={faEraser} className='h-3 w-3' />
							</button>
						</div>
					</div>
				)}
			</div>
		</FormFieldContainer>
	);
});
