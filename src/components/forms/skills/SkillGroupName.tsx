'use client';

import { FormFieldContainer } from '@/components/forms/core';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';
import { Button } from '@/components/ui/buttons';
import { Checkbox } from '@/components/ui/input';
import { PLACEHOLDERS } from '@/config';
import { skillsSchema, validateSchema } from '@/lib/schemas';
import { useSkillsStore } from '@/lib/stores';
import { getOrdinalSuffix } from '@/lib/utils';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from '@tanstack/react-form';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import type { SkillGroup } from '@/types';

type SkillGroupNameProps = {
	form: any; // TanStack Form
	groupIndex: number;
	onRemove?: () => void;
	registerFocusRef?: (
		groupIndex: number,
		inputElement: HTMLInputElement | null
	) => void;
};

const hasDuplicateGroupName = (
	groups: SkillGroup[],
	currentIndex: number,
	newName: string
): boolean => {
	if (!newName.trim()) return false;

	const normalizedNewName = newName.toLowerCase().trim();
	return groups.some(
		(group, index) =>
			index !== currentIndex &&
			group.name.toLowerCase().trim() === normalizedNewName
	);
};

export const SkillGroupName = memo(function SkillGroupName({
	form,
	groupIndex,
	onRemove,
	registerFocusRef,
}: SkillGroupNameProps) {
	const { setSkills } = useSkillsStore();

	const currentGroups = useMemo(() => {
		return (form.getFieldValue('groups') as SkillGroup[]) || [];
	}, [form]);

	const [localInclude, setLocalInclude] = useState(() => {
		const group = currentGroups[groupIndex];
		return group?.include !== undefined ? group.include : true;
	});

	useEffect(() => {
		const group = currentGroups[groupIndex];
		if (group && group.include !== undefined) {
			setLocalInclude(group.include);
		}
	}, [currentGroups, groupIndex]);

	const updateIncludeState = useCallback(
		(checked: boolean) => {
			setLocalInclude(checked);

			const currentSkills = useSkillsStore.getState().skills;
			const updatedSkills = {
				...currentSkills,
				groups: currentSkills.groups.map((group, index) =>
					index === groupIndex ? { ...group, include: checked } : group
				),
			};
			setSkills(updatedSkills);

			form.setFieldValue(`groups.${groupIndex}.include`, checked);
		},
		[groupIndex, setSkills, form]
	);

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
					currentValue
				);

				return (
					<FormFieldContainer className='relative pb-3'>
						<div className='flex items-center gap-2'>
							<Checkbox
								checked={localInclude}
								onChange={(checked) => {
									updateIncludeState(checked);
								}}
								label=''
								title={`Include ${currentValue}?`}
								aria-label={`Include ${currentValue} Skill Group?`}
							/>
							<FormFieldLabel
								htmlFor={`group-name-${groupIndex}`}
								title='Group Name'
								aria-label='Group Name'
								spaced
							>
								Group Name
							</FormFieldLabel>
						</div>
						<input
							id={`group-name-${groupIndex}`}
							type='text'
							value={currentValue}
							onChange={(e) => {
								const value = e.target.value;
								field.handleChange(value);
							}}
							placeholder={PLACEHOLDERS.SKILLS.GROUP_NAME}
							className='text-sm sm:text-base'
							aria-label={`Name for ${groupIndex + 1}${getOrdinalSuffix(groupIndex + 1)} skill group`}
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
								positioned
								onClick={onRemove}
								title={`Remove Skill Group`}
								aria-label={`Remove ${groupIndex + 1}${getOrdinalSuffix(groupIndex + 1)} Skill Group`}
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
});
