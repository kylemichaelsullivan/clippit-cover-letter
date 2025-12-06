'use client';

import { Field } from '@tanstack/react-form';

import {
	FormFieldWithCheckbox,
	FormFieldWithLabel,
	FormItem,
} from '@/components/forms/core';
import { BulletManager } from '@/components/forms/core';
import { DatePicker } from '@/components/ui/input';
import { DEFAULTS, PLACEHOLDERS } from '@/config';
import { getOrdinalSuffix } from '@/lib/utils';

type ExperienceItemProps = {
	form: any; // TanStack Form
	experienceIndex: number;
	handleFieldChange?: (fieldName: string, value: any) => void;
	onRemove?: () => void;
	registerFocusRef?: (
		experienceIndex: number,
		inputElement: HTMLInputElement | null
	) => void;
};

export function ExperienceItem({
	form,
	experienceIndex,
	handleFieldChange,
	onRemove,
	registerFocusRef,
}: ExperienceItemProps) {
	return (
		<FormItem onRemove={onRemove} removeButtonTitle='Remove this Experience'>
			<FormFieldWithCheckbox
				label='Title'
				form={form}
				fieldPath='experience'
				checkboxTitle='Include this in Resume?'
				checkboxAriaLabel={`Include ${experienceIndex + 1}${getOrdinalSuffix(experienceIndex + 1)} experience entry in Resume`}
				placeholder={PLACEHOLDERS.EXPERIENCE?.TITLE}
				defaultValue={DEFAULTS.INITIAL_STATES.EXPERIENCE.title}
				index={experienceIndex}
				htmlId={`experience-title-${experienceIndex}`}
				onChange={(value) =>
					handleFieldChange?.(`experience.${experienceIndex}.title`, value)
				}
				registerFocusRef={
					registerFocusRef
						? (element) => registerFocusRef(experienceIndex, element)
						: undefined
				}
			/>

			<FormFieldWithLabel
				form={form}
				label='Company'
				fieldPath='experience'
				fieldName='company'
				placeholder={PLACEHOLDERS.EXPERIENCE?.COMPANY}
				defaultValue={DEFAULTS.INITIAL_STATES.EXPERIENCE.company}
				index={experienceIndex}
				onChange={(value) =>
					handleFieldChange?.(`experience.${experienceIndex}.company`, value)
				}
			/>

			<Field name={`experience.${experienceIndex}.start`} form={form}>
				{(field) => (
					<DatePicker
						label='Start'
						value={String(
							field.state.value || DEFAULTS.INITIAL_STATES.EXPERIENCE.start
						)}
						onChange={(value) => {
							field.handleChange(value);
							handleFieldChange?.(`experience.${experienceIndex}.start`, value);
						}}
					/>
				)}
			</Field>

			<Field name={`experience.${experienceIndex}.end`} form={form}>
				{(field) => (
					<DatePicker
						label='End'
						value={String(
							field.state.value || DEFAULTS.INITIAL_STATES.EXPERIENCE.end
						)}
						onChange={(value) => {
							field.handleChange(value);
							handleFieldChange?.(`experience.${experienceIndex}.end`, value);
						}}
						isEndDate={true}
					/>
				)}
			</Field>

			<BulletManager
				className='col-span-full'
				label='Bullets'
				form={form}
				fieldPath={`experience.${experienceIndex}.bullets`}
				placeholder={PLACEHOLDERS.EXPERIENCE?.BULLET}
				onFieldChange={handleFieldChange}
			/>
		</FormItem>
	);
}
