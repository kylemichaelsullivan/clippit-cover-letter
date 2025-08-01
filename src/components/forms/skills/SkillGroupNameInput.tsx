'use client';

import { useState } from 'react';
import { FormField } from '../core/FormField';

import type { SkillGroup } from '@/types';

type SkillGroupNameInputProps = {
	form: any; // TanStack Form
	groupIndex: number;
};

const sortGroupsAlphabetically = (groups: SkillGroup[]): SkillGroup[] => {
	return [...groups].sort((a, b) => {
		const nameA = (a.name || '').toLowerCase();
		const nameB = (b.name || '').toLowerCase();
		return nameA.localeCompare(nameB);
	});
};

const areGroupsSorted = (groups: SkillGroup[]): boolean => {
	for (let i = 1; i < groups.length; i++) {
		const prevName = (groups[i - 1].name || '').toLowerCase();
		const currName = (groups[i].name || '').toLowerCase();
		if (prevName.localeCompare(currName) > 0) {
			return false;
		}
	}
	return true;
};

const hasDuplicateGroupName = (
	groups: SkillGroup[],
	currentIndex: number,
	newName: string,
): boolean => {
	const normalizedNewName = newName.toLowerCase().trim();
	return groups.some(
		(group, index) =>
			index !== currentIndex &&
			group.name.toLowerCase().trim() === normalizedNewName,
	);
};

export function SkillGroupNameInput({
	form,
	groupIndex,
}: SkillGroupNameInputProps) {
	const [error, setError] = useState<string>('');

	const handleChange = (value: string) => {
		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];

		setError('');

		if (
			value.trim() &&
			hasDuplicateGroupName(currentGroups, groupIndex, value)
		) {
			setError(
				'A skill group with this name already exists. Please choose a different name.',
			);
			return;
		}

		form.setFieldValue(`groups.${groupIndex}.name`, value);
	};

	const handleBlur = () => {
		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];
		if (currentGroups.length > 1 && !areGroupsSorted(currentGroups)) {
			const sortedGroups = sortGroupsAlphabetically(currentGroups);
			form.setFieldValue('groups', sortedGroups);
			// Force a delay to ensure form state is updated before any re-renders
			setTimeout(() => {
				form.validateAllFields();
			}, 0);
		}
	};

	return (
		<div className='space-y-1'>
			<FormField
				id={`group-${groupIndex}-name`}
				label='Group Name'
				type='text'
				value={form.getFieldValue(`groups.${groupIndex}.name`) || ''}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder='e.g., Management, Design, Development'
				required
			/>
			{error && <p className='text-red text-sm'>{error}</p>}
		</div>
	);
}
