'use client';

import { ClipboardEvent } from 'react';
import { Field } from '@tanstack/react-form';
import { FormFieldWithLabel, FormItem } from '@/components/forms/core';
import { Checkbox } from '@/components/ui/input';
import { FormFieldContainer } from '@/components/forms/core/FormFieldContainer';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { DEFAULTS, PLACEHOLDERS } from '@/config';
import { getOrdinalSuffix, parseEducationFromText } from '@/lib/utils';

type EducationItemProps = {
	form: any; // TanStack Form
	educationIndex: number;
	handleFieldChange?: (fieldName: string, value: any) => void;
	onPaste?: (educationEntries: any[], educationIndex?: number) => void;
	onRemove?: () => void;
	registerFocusRef?: (
		educationIndex: number,
		inputElement: HTMLInputElement | null,
	) => void;
};

export function EducationItem({
	form,
	educationIndex,
	handleFieldChange,
	onPaste,
	onRemove,
	registerFocusRef,
}: EducationItemProps) {
	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		const pastedText = e.clipboardData.getData('text');
		const parsedEducation = parseEducationFromText(pastedText);

		if (parsedEducation.length > 0) {
			e.preventDefault();
			onPaste?.(parsedEducation, educationIndex);
		}
	};

	return (
		<FormItem removeButtonTitle='Remove this Education' onRemove={onRemove}>
			<FormFieldContainer>
				<div className='flex items-center gap-2'>
					<Field name={`education.${educationIndex}.include`} form={form}>
						{(field) => (
							<Checkbox
								label=''
								checked={Boolean(field.state.value ?? true)}
								title='Include this in Resume?'
								aria-label={`Include ${educationIndex + 1}${getOrdinalSuffix(educationIndex + 1)} education entry in Resume`}
								onChange={(checked) => {
									field.handleChange(checked);
									handleFieldChange?.(
										`education.${educationIndex}.degree`,
										checked ? ' ' : '',
									);
								}}
							/>
						)}
					</Field>
					<FormFieldLabel
						htmlFor={`education-degree-${educationIndex}`}
						title='Degree'
						aria-label='Degree'
						spaced
					>
						Degree
					</FormFieldLabel>
				</div>
				<Field name={`education.${educationIndex}.degree`} form={form}>
					{(field) => (
						<input
							type='text'
							className='text-sm sm:text-base'
							value={String(
								field.state.value || DEFAULTS.INITIAL_STATES.EDUCATION.degree,
							)}
							placeholder={PLACEHOLDERS.EDUCATION?.DEGREE}
							onChange={(e) => {
								field.handleChange(e.target.value);
								handleFieldChange?.(
									`education.${educationIndex}.degree`,
									e.target.value,
								);
							}}
							onPaste={handlePaste}
							ref={
								registerFocusRef
									? (element) => registerFocusRef(educationIndex, element)
									: undefined
							}
							id={`education-degree-${educationIndex}`}
						/>
					)}
				</Field>
			</FormFieldContainer>

			<FormFieldWithLabel
				label='Graduation Year'
				form={form}
				fieldPath='education'
				fieldName='graduationYear'
				placeholder={PLACEHOLDERS.EDUCATION?.GRADUATION_YEAR || 'e.g., 2020'}
				defaultValue={DEFAULTS.INITIAL_STATES.EDUCATION.graduationYear}
				index={educationIndex}
				onChange={(value) =>
					handleFieldChange?.(
						`education.${educationIndex}.graduationYear`,
						value,
					)
				}
			/>

			<FormFieldWithLabel
				label='Institution'
				form={form}
				fieldPath='education'
				fieldName='institution'
				index={educationIndex}
				placeholder={
					PLACEHOLDERS.EDUCATION?.INSTITUTION || 'e.g., University of Michigan'
				}
				defaultValue={DEFAULTS.INITIAL_STATES.EDUCATION.institution}
				onChange={(value) =>
					handleFieldChange?.(`education.${educationIndex}.institution`, value)
				}
			/>

			<FormFieldWithLabel
				label='Location'
				form={form}
				fieldPath='education'
				fieldName='location'
				index={educationIndex}
				placeholder={PLACEHOLDERS.EDUCATION?.LOCATION || 'e.g., Ann Arbor, MI'}
				defaultValue={DEFAULTS.INITIAL_STATES.EDUCATION.location}
				onChange={(value) =>
					handleFieldChange?.(`education.${educationIndex}.location`, value)
				}
			/>
		</FormItem>
	);
}
