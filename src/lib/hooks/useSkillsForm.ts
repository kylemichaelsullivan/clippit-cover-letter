'use client';

import { useForm } from '@tanstack/react-form';
import { useEffect, useRef, useState } from 'react';

import { skillsSchema } from '@/lib/schemas';
import { useSkillsStore } from '@/lib/stores';
import { sortSkillGroups } from '@/lib/utils';

import type { SkillGroup, SkillGroupItems, Skills } from '@/types';

export type SkillsFormValues = {
	groups: SkillGroupItems;
	minSkillsToUse: number;
	maxSkillsToUse: number;
};

export function useSkillsForm(onSubmit: (skills: Skills) => void) {
	const { setSkills, skills } = useSkillsStore();
	const [error, setError] = useState<string>('');

	const form = useForm({
		defaultValues: {
			groups: skills.groups?.length
				? skills.groups.map((group) => ({
						...group,
						include: group.include !== undefined ? group.include : true,
					}))
				: [
						{
							id: `group-${Date.now()}`,
							include: true,
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

	const skillsRef = useRef(skills);
	const formRef = useRef(form);

	useEffect(() => {
		skillsRef.current = skills;
	}, [skills]);

	useEffect(() => {
		formRef.current = form;
	}, [form]);

	// Sync form with store on mount
	useEffect(() => {
		const currentSkills = skillsRef.current;
		const currentForm = formRef.current;

		if (currentSkills && currentSkills.groups) {
			const groupsWithInclude = currentSkills.groups.map((group) => ({
				...group,
				include: group.include !== undefined ? group.include : true,
			}));

			currentForm.reset({
				groups: groupsWithInclude,
				minSkillsToUse: currentSkills.minSkillsToUse || 5,
				maxSkillsToUse: currentSkills.maxSkillsToUse || 10,
			});
		}
	}, []);

	const sortGroupsAlphabetically = (groups: SkillGroup[]): SkillGroup[] => {
		return sortSkillGroups(groups);
	};

	const addSkillGroup = () => {
		const currentGroups = skills.groups || [];

		if (currentGroups.length >= 25) {
			setError('Maximum of 25 Skill Groups allowed.');
			return;
		}

		const hasEmptyGroup = currentGroups.some((group) => !group.name.trim());
		if (hasEmptyGroup) {
			setError('Please populate the empty Skill Group before adding another.');
			return;
		}

		setError('');

		const newGroup: SkillGroup = {
			id: `group-${Date.now()}`,
			include: true,
			name: '',
			skills: [],
		};
		const updatedGroups = [...currentGroups, newGroup];

		setSkills({
			...skills,
			groups: updatedGroups,
		});

		form.setFieldValue('groups', updatedGroups);

		return updatedGroups.length - 1;
	};

	const alphabetizeGroups = () => {
		const currentGroups = skills.groups || [];
		if (currentGroups.length > 1) {
			const sortedGroups = sortGroupsAlphabetically(currentGroups);

			setSkills({
				...skills,
				groups: sortedGroups,
			});

			form.setFieldValue('groups', sortedGroups);
		}
	};

	const removeSkillGroup = (groupIndex: number) => {
		const currentGroups = skills.groups || [];
		const groupToRemove = currentGroups[groupIndex];
		if (groupToRemove) {
			const updatedGroups = currentGroups.filter(
				(group: SkillGroup) => group.id !== groupToRemove.id
			);

			if (updatedGroups.length === 0) {
				const defaultGroup: SkillGroup = {
					id: `group-${Date.now()}`,
					include: true,
					name: '',
					skills: [],
				};
				updatedGroups.push(defaultGroup);
			}

			setSkills({
				...skills,
				groups: updatedGroups,
			});

			form.setFieldValue('groups', updatedGroups);
		}
	};

	return {
		form,
		error,
		setError,
		addSkillGroup,
		alphabetizeGroups,
		removeSkillGroup,
	};
}
