'use client';

import { Field } from '@tanstack/react-form';

import { FormField } from '../core/FormField';
import { Button } from '@/components/ui/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PLACEHOLDERS } from '@/config';
import { skillsSchema, validateSchema } from '@/lib/schemas';
import type { SkillGroup } from '@/types';

type SkillGroupNameProps = {
	form: any; // TanStack Form
	groupIndex: number;
	onRemove?: () => void;
	handleFieldChange?: (fieldName: string, value: any) => void;
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
					<FormField
						id={`group-name-${groupIndex}`}
						label='Group Name'
						type='text'
						value={currentValue}
						onChange={(value: string) => {
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
						schema={skillsSchema}
						fieldName='groups'
						error={
							hasDuplicate && currentValue.trim()
								? 'This group name already exists'
								: undefined
						}
						labelContent={
							onRemove ? (
								<Button
									color='danger'
									size='xs'
									onClick={onRemove}
									title='Remove Group'
									componentName='SkillGroupCardRemoveButton'
								>
									<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
								</Button>
							) : undefined
						}
					/>
				);
			}}
		</Field>
	);
}
