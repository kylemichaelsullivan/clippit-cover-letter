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
import { Bullets } from './Bullets';

type ExperienceItemProps = {
	form: any; // TanStack Form
	experienceIndex: number;
	onRemove?: () => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
	registerFocusRef?: (
		experienceIndex: number,
		inputElement: HTMLInputElement | null,
	) => void;
};

export function ExperienceItem({
	form,
	experienceIndex,
	onRemove,
	handleFieldChange,
	registerFocusRef,
}: ExperienceItemProps) {
	return (
		<div className='ExperienceItem flex flex-col gap-3'>
			<div className='relative grid grid-cols-1 gap-3 sm:grid-cols-2'>
				{onRemove && (
					<Button
						componentName='ExperienceItemRemoveButton'
						color='danger'
						size='sm'
						positioned
						onClick={onRemove}
						title='Remove this Experience'
					>
						<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
					</Button>
				)}

				<FormFieldContainer>
					<div className='flex items-center gap-2'>
						<Field name={`experience.${experienceIndex}.include`} form={form}>
							{(field) => (
								<Checkbox
									checked={Boolean(field.state.value ?? true)}
									onChange={(checked) => {
										field.handleChange(checked);
										handleFieldChange?.(
											`experience.${experienceIndex}.include`,
											checked,
										);
									}}
									label=''
									title={`Include this in Resume?`}
									aria-label={`Include ${experienceIndex + 1}${getOrdinalSuffix(experienceIndex + 1)} experience entry in Resume`}
								/>
							)}
						</Field>
						<FormFieldLabel
							htmlFor={`experience-title-${experienceIndex}`}
							title='Job Title'
							aria-label='Job title or position'
							spaced
						>
							Title
						</FormFieldLabel>
					</div>
					<Field name={`experience.${experienceIndex}.title`} form={form}>
						{(field) => (
							<input
								id={`experience-title-${experienceIndex}`}
								type='text'
								value={String(
									field.state.value || DEFAULTS.INITIAL_STATES.EXPERIENCE.title,
								)}
								onChange={(e) => {
									field.handleChange(e.target.value);
									handleFieldChange?.(
										`experience.${experienceIndex}.title`,
										e.target.value,
									);
								}}
								placeholder={PLACEHOLDERS.EXPERIENCE?.TITLE}
								className='text-sm sm:text-base'
								ref={(element) => {
									if (registerFocusRef) {
										registerFocusRef(experienceIndex, element);
									}
								}}
							/>
						)}
					</Field>
				</FormFieldContainer>

				<Field name={`experience.${experienceIndex}.company`} form={form}>
					{(field) => (
						<FormFieldContainer>
							<FormFieldLabel
								title='Company Name'
								aria-label='Name of the company or organization'
							>
								Company
							</FormFieldLabel>
							<input
								type='text'
								value={String(
									field.state.value ||
										DEFAULTS.INITIAL_STATES.EXPERIENCE.company,
								)}
								onChange={(e) => {
									field.handleChange(e.target.value);
									handleFieldChange?.(
										`experience.${experienceIndex}.company`,
										e.target.value,
									);
								}}
								placeholder={PLACEHOLDERS.EXPERIENCE?.COMPANY}
								className='text-sm sm:text-base'
							/>
						</FormFieldContainer>
					)}
				</Field>

				<Field name={`experience.${experienceIndex}.start`} form={form}>
					{(field) => (
						<FormFieldContainer>
							<FormFieldLabel
								title='Start Date'
								aria-label='Start date of employment'
							>
								Start
							</FormFieldLabel>
							<input
								type='text'
								value={String(
									field.state.value || DEFAULTS.INITIAL_STATES.EXPERIENCE.start,
								)}
								onChange={(e) => {
									field.handleChange(e.target.value);
									handleFieldChange?.(
										`experience.${experienceIndex}.start`,
										e.target.value,
									);
								}}
								placeholder={PLACEHOLDERS.EXPERIENCE?.START}
								className='text-sm sm:text-base'
							/>
						</FormFieldContainer>
					)}
				</Field>

				<Field name={`experience.${experienceIndex}.end`} form={form}>
					{(field) => (
						<FormFieldContainer>
							<FormFieldLabel
								title='End Date'
								aria-label='End date of employment or Present'
							>
								End
							</FormFieldLabel>
							<input
								type='text'
								value={String(
									field.state.value || DEFAULTS.INITIAL_STATES.EXPERIENCE.end,
								)}
								onChange={(e) => {
									field.handleChange(e.target.value);
									handleFieldChange?.(
										`experience.${experienceIndex}.end`,
										e.target.value,
									);
								}}
								placeholder={PLACEHOLDERS.EXPERIENCE?.END}
								className='text-sm sm:text-base'
							/>
						</FormFieldContainer>
					)}
				</Field>
			</div>

			<Bullets
				form={form}
				experienceIndex={experienceIndex}
				handleFieldChange={handleFieldChange}
			/>
		</div>
	);
}
