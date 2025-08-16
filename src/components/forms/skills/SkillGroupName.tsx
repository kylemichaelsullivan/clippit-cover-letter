'use client';

import { Field } from '@tanstack/react-form';

import { Button } from '@/components/ui/buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormFieldContainer } from '@/components/forms/core';
import { PLACEHOLDERS } from '@/config';
import { skillsSchema, validateSchema } from '@/lib/schemas';
import type { SkillGroup } from '@/types';

type SkillGroupNameProps = {
	form: any; // TanStack Form
	groupIndex: number;
	onRemove?: () => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
	registerFocusRef?: (
		groupIndex: number,
		inputElement: HTMLInputElement | null,
	) => void;
};

const hasDuplicateGroupName = (
	groups: SkillGroup[],
	currentGroupIndex: number,
	newName: string,
): boolean => {
	const normalizedNewName = newName.toLowerCase().trim();
	return groups.some(
		(group, index) =>
			index !== currentGroupIndex &&
			group.name.toLowerCase().trim() === normalizedNewName,
	);
};

export function SkillGroupName({
	form,
	groupIndex,
	onRemove,
	handleFieldChange,
	registerFocusRef,
}: SkillGroupNameProps) {
	const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];

	return (
		<Field
			name={`groups.${groupIndex}.name`}
			form={form}
			validators={{
				onChange: validateSchema(skillsSchema, 'groups'),
			}}
		>
			{(field) => {
				const currentValue = field.state.value?.toString() || '';
				const hasDuplicate = hasDuplicateGroupName(
					currentGroups,
					groupIndex,
					currentValue,
				);

				return (
					<FormFieldContainer className='relative pb-3'>
						<label
							htmlFor={`group-name-${groupIndex}`}
							className='FormFieldLabel flex items-center justify-between text-base font-medium text-black'
						>
							<span>Group Name</span>
						</label>
						<input
							id={`group-name-${groupIndex}`}
							type='text'
							value={currentValue}
							onChange={(e) => {
								const value = e.target.value;
								field.handleChange(value);
								if (handleFieldChange) {
									const updatedGroups = [...currentGroups];
									updatedGroups[groupIndex] = {
										...updatedGroups[groupIndex],
										name: value,
									};
									handleFieldChange('groups', updatedGroups);
								}
							}}
							placeholder={PLACEHOLDERS.SKILLS.GROUP_NAME}
							className='text-sm sm:text-base'
							ref={(element) => {
								if (registerFocusRef) {
									registerFocusRef(groupIndex, element);
								}
							}}
						/>
						{onRemove && (
							<Button
								color='danger'
								size='sm'
								onClick={onRemove}
								title='Remove Group'
								componentName='SkillGroupCardRemoveButton'
							>
								<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
							</Button>
						)}
						{hasDuplicate && currentValue.trim() && (
							<p className='FormFieldError text-red pt-1 text-sm'>
								This group name already exists
							</p>
						)}
					</FormFieldContainer>
				);
			}}
		</Field>
	);
}
