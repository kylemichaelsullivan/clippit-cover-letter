'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from '@tanstack/react-form';

import { useSkillsStore } from '@/lib/stores';
import { skillsSchema } from '@/lib/schemas';

import type { Skills, SkillGroup } from '@/types';

export type SkillsFormValues = {
	groups: Array<{
		id: string;
		name: string;
		skills: string[];
	}>;
	minSkillsToUse: number;
	maxSkillsToUse: number;
};

export function useSkillsForm(onSubmit: (skills: Skills) => void) {
	const { setSkills, skills } = useSkillsStore();
	const lastValuesRef = useRef(skills);
	const [error, setError] = useState<string>('');

	const handleFieldChange = useCallback(
		(fieldName: string, value: any) => {
			const currentSkills = { ...skills };

			switch (fieldName) {
				case 'groups':
					currentSkills.groups = value;
					break;
				case 'minSkillsToUse':
					currentSkills.minSkillsToUse = value;
					break;
				case 'maxSkillsToUse':
					currentSkills.maxSkillsToUse = value;
					break;
			}

			setSkills(currentSkills);
		},
		[skills, setSkills],
	);

	// Form management
	const form = useForm({
		defaultValues: {
			groups: skills.groups?.length
				? skills.groups
				: [
						{
							id: `group-${Date.now()}`,
							name: '',
							skills: [],
						},
					],
			minSkillsToUse: skills.minSkillsToUse || 5,
			maxSkillsToUse: skills.maxSkillsToUse || 10,
		},
		onSubmit: async ({ value }) => {
			const result = skillsSchema.safeParse(value);
			if (!result.success) {
				console.error('Validation errors:', result.error.issues);
				return;
			}
			onSubmit(result.data);
		},
	});

	// Initialize form with store data on mount
	useEffect(() => {
		if (skills && skills.groups) {
			form.reset({
				groups: skills.groups,
				minSkillsToUse: skills.minSkillsToUse || 5,
				maxSkillsToUse: skills.maxSkillsToUse || 10,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Only run on mount - form is stable and skills are from store

	// Sync store with form when form changes (like candidate and job forms)
	useEffect(() => {
		const values = form.state.values;
		const valuesString = JSON.stringify(values);
		const lastValuesString = JSON.stringify(lastValuesRef.current);

		if (valuesString !== lastValuesString) {
			lastValuesRef.current = values;
			const result = skillsSchema.safeParse(values);
			if (result.success) {
				setSkills(result.data);
			}
		}
	}, [form.state.values, setSkills]);

	// Business logic functions
	const sortGroupsAlphabetically = (groups: SkillGroup[]): SkillGroup[] => {
		return [...groups].sort((a, b) => {
			const nameA = (a.name || '').toLowerCase();
			const nameB = (b.name || '').toLowerCase();
			return nameA.localeCompare(nameB);
		});
	};

	const addSkillGroup = () => {
		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];

		const hasEmptyGroup = currentGroups.some((group) => !group.name.trim());
		if (hasEmptyGroup) {
			setError('Please populate the empty Skill Group before adding another.');
			return;
		}

		setError('');

		const newGroup: SkillGroup = {
			id: `group-${Date.now()}`,
			name: '',
			skills: [],
		};
		const updatedGroups = [...currentGroups, newGroup];
		form.setFieldValue('groups', updatedGroups);
		handleFieldChange('groups', updatedGroups);
	};

	const alphabetizeGroups = () => {
		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];
		if (currentGroups.length > 1) {
			const sortedGroups = sortGroupsAlphabetically(currentGroups);
			form.setFieldValue('groups', sortedGroups);
			handleFieldChange('groups', sortedGroups);
		}
	};

	const removeSkillGroup = (groupIndex: number) => {
		const currentGroups = (form.getFieldValue('groups') as SkillGroup[]) || [];
		const groupToRemove = currentGroups[groupIndex];
		if (groupToRemove) {
			const updatedGroups = currentGroups.filter(
				(group: SkillGroup) => group.id !== groupToRemove.id,
			);
			form.setFieldValue('groups', updatedGroups);
			handleFieldChange('groups', updatedGroups);
		}
	};

	return {
		form,
		error,
		setError,
		handleFieldChange,
		addSkillGroup,
		alphabetizeGroups,
		removeSkillGroup,
	};
}
