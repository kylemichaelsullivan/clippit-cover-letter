'use client';

import { Field } from '@tanstack/react-form';

import { Checkbox } from '@/components/ui/input';
import { FormFieldContainer } from '@/components/forms/core';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PLACEHOLDERS, DEFAULTS } from '@/config';
import { Button } from '@/components/ui/buttons';
import { getOrdinalSuffix } from '@/lib/utils';

type EducationItemProps = {
	form: any; // TanStack Form
	educationIndex: number;
	onRemove?: () => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
	registerFocusRef?: (
		educationIndex: number,
		inputElement: HTMLInputElement | null,
	) => void;
};

export function EducationItem({
	form,
	educationIndex,
	onRemove,
	handleFieldChange,
	registerFocusRef,
}: EducationItemProps) {
	return (
		<div className='EducationItem flex flex-col gap-3'>
			<div className='relative grid grid-cols-1 gap-3 sm:grid-cols-2'>
				{onRemove && (
					<Button
						componentName='EducationItemRemoveButton'
						color='danger'
						size='sm'
						positioned
						onClick={onRemove}
						title='Remove this Education'
					>
						<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
					</Button>
				)}

				<FormFieldContainer>
					<div className='flex items-center gap-2'>
						<Field name={`education.${educationIndex}.include`} form={form}>
							{(field) => (
								<Checkbox
									checked={Boolean(field.state.value ?? true)}
									onChange={(checked) => {
										field.handleChange(checked);
										handleFieldChange?.(
											`education.${educationIndex}.include`,
											checked,
										);
									}}
									label=''
									title={`Include this in Resume?`}
									aria-label={`Include ${educationIndex + 1}${getOrdinalSuffix(educationIndex + 1)} education entry in Resume`}
								/>
							)}
						</Field>
						<FormFieldLabel
							htmlFor={`education-degree-${educationIndex}`}
							title='Degree or Qualification'
							aria-label='Degree or qualification earned'
							spaced
						>
							Degree
						</FormFieldLabel>
					</div>
					<Field name={`education.${educationIndex}.degree`} form={form}>
						{(field) => (
							<input
								id={`education-degree-${educationIndex}`}
								type='text'
								value={String(
									field.state.value || DEFAULTS.INITIAL_STATES.EDUCATION.degree,
								)}
								onChange={(e) => {
									field.handleChange(e.target.value);
									handleFieldChange?.(
										`education.${educationIndex}.degree`,
										e.target.value,
									);
								}}
								placeholder={PLACEHOLDERS.EDUCATION?.DEGREE}
								className='text-sm sm:text-base'
								ref={(element) => {
									if (registerFocusRef) {
										registerFocusRef(educationIndex, element);
									}
								}}
							/>
						)}
					</Field>
				</FormFieldContainer>

				<Field name={`education.${educationIndex}.graduationYear`} form={form}>
					{(field) => (
						<FormFieldContainer>
							<FormFieldLabel
								title='Year of Graduation'
								aria-label='Year of graduation or completion'
								spaced
							>
								Graduation Year
							</FormFieldLabel>
							<input
								type='text'
								value={String(
									field.state.value ||
										DEFAULTS.INITIAL_STATES.EDUCATION.graduationYear,
								)}
								onChange={(e) => {
									field.handleChange(e.target.value);
									handleFieldChange?.(
										`education.${educationIndex}.graduationYear`,
										e.target.value,
									);
								}}
								placeholder={
									PLACEHOLDERS.EDUCATION?.GRADUATION_YEAR || 'e.g., 2020'
								}
								className='text-sm sm:text-base'
							/>
						</FormFieldContainer>
					)}
				</Field>

				<Field name={`education.${educationIndex}.institution`} form={form}>
					{(field) => (
						<FormFieldContainer>
							<FormFieldLabel
								title='Educational Institution'
								aria-label='Name of educational institution or school'
								spaced
							>
								Institution
							</FormFieldLabel>
							<input
								type='text'
								value={String(
									field.state.value ||
										DEFAULTS.INITIAL_STATES.EDUCATION.institution,
								)}
								onChange={(e) => {
									field.handleChange(e.target.value);
									handleFieldChange?.(
										`education.${educationIndex}.institution`,
										e.target.value,
									);
								}}
								placeholder={
									PLACEHOLDERS.EDUCATION?.INSTITUTION ||
									'e.g., University of Michigan'
								}
								className='text-sm sm:text-base'
							/>
						</FormFieldContainer>
					)}
				</Field>

				<Field name={`education.${educationIndex}.location`} form={form}>
					{(field) => (
						<FormFieldContainer>
							<FormFieldLabel
								title='Institution Location'
								aria-label='City and state or country of institution'
								spaced
							>
								Location
							</FormFieldLabel>
							<input
								type='text'
								value={String(
									field.state.value ||
										DEFAULTS.INITIAL_STATES.EDUCATION.location,
								)}
								onChange={(e) => {
									field.handleChange(e.target.value);
									handleFieldChange?.(
										`education.${educationIndex}.location`,
										e.target.value,
									);
								}}
								placeholder={
									PLACEHOLDERS.EDUCATION?.LOCATION || 'e.g., Ann Arbor, MI'
								}
								className='text-sm sm:text-base'
							/>
						</FormFieldContainer>
					)}
				</Field>
			</div>
		</div>
	);
}
