'use client';

import {
	FormFieldWithCheckbox,
	FormFieldWithLabel,
	FormItem,
} from '@/components/forms/core';
import { DEFAULTS, PLACEHOLDERS } from '@/config';
import { getOrdinalSuffix } from '@/lib/utils';

type EducationItemProps = {
	form: any; // TanStack Form
	educationIndex: number;
	handleFieldChange?: (fieldName: string, value: any) => void;
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
	onRemove,
	registerFocusRef,
}: EducationItemProps) {
	return (
		<FormItem removeButtonTitle='Remove this Education' onRemove={onRemove}>
			<FormFieldWithCheckbox
				label='Degree'
				form={form}
				fieldPath='education'
				placeholder={PLACEHOLDERS.EDUCATION?.DEGREE}
				defaultValue={DEFAULTS.INITIAL_STATES.EDUCATION.degree}
				checkboxTitle='Include this in Resume?'
				checkboxAriaLabel={`Include ${educationIndex + 1}${getOrdinalSuffix(educationIndex + 1)} education entry in Resume`}
				index={educationIndex}
				htmlId={`education-degree-${educationIndex}`}
				onChange={(value) =>
					handleFieldChange?.(`education.${educationIndex}.degree`, value)
				}
				registerFocusRef={
					registerFocusRef
						? (element) => registerFocusRef(educationIndex, element)
						: undefined
				}
			/>

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
